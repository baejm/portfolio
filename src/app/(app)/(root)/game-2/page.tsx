"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Cell = string | null;

type Piece = {
  shape: number[][];
  color: string;
  x: number;
  y: number;
};

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;
const BOARD_CELL_PX = 26;
const BOARD_GAP_PX = 2;

const COLORS = [
  "#E6DAFF",
  "#D5C2FF",
  "#C8B0FF",
  "#F6C8FF",
  "#D9EDFF",
  "#FFD9F2",
  "#D6F1FF",
];

const SHAPES: number[][][] = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
];

const SCORES = [0, 100, 300, 500, 800];

function createBoard(): Cell[][] {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

function rotate(shape: number[][]) {
  const size = shape.length;
  const next = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      next[x][size - 1 - y] = shape[y][x];
    }
  }
  return next;
}

function cloneShape(shape: number[][]) {
  return shape.map((row) => row.slice());
}

function createPieceFrom(shape: number[][], color: string): Piece {
  const size = shape.length;
  return {
    shape: cloneShape(shape),
    color,
    x: Math.floor((BOARD_WIDTH - size) / 2),
    y: -1,
  };
}

function getShapeBounds(shape: number[][]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) return;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });
  if (minX === Infinity) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }
  return { minX, minY, maxX, maxY };
}

function randomPiece(): Piece {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return createPieceFrom(shape, color);
}

function isValid(
  board: Cell[][],
  piece: Piece,
  offsetX = 0,
  offsetY = 0,
  shapeOverride?: number[][]
) {
  const shape = shapeOverride ?? piece.shape;
  for (let y = 0; y < shape.length; y += 1) {
    for (let x = 0; x < shape[y].length; x += 1) {
      if (!shape[y][x]) continue;
      const nextX = piece.x + x + offsetX;
      const nextY = piece.y + y + offsetY;
      if (nextX < 0 || nextX >= BOARD_WIDTH) return false;
      if (nextY >= BOARD_HEIGHT) return false;
      if (nextY >= 0 && board[nextY][nextX]) return false;
    }
  }
  return true;
}

function merge(board: Cell[][], piece: Piece): Cell[][] {
  const next = board.map((row) => row.slice());
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) return;
      const targetY = piece.y + y;
      const targetX = piece.x + x;
      if (targetY >= 0 && targetY < BOARD_HEIGHT) {
        next[targetY][targetX] = piece.color;
      }
    });
  });
  return next;
}

function clearLines(board: Cell[][]) {
  const remaining = board.filter((row) => row.some((cell) => cell === null));
  const cleared = BOARD_HEIGHT - remaining.length;
  const filled = Array.from({ length: cleared }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
  return { board: [...filled, ...remaining], cleared };
}

function getFullRows(board: Cell[][]) {
  const rows: number[] = [];
  board.forEach((row, index) => {
    if (row.every((cell) => cell !== null)) {
      rows.push(index);
    }
  });
  return rows;
}

export default function TetrisCutePage() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard());
  const [piece, setPiece] = useState<Piece>(() => ({
    shape: SHAPES[0],
    color: COLORS[0],
    x: 3,
    y: -1,
  }));
  const [nextPiece, setNextPiece] = useState<Piece>(() => ({
    shape: SHAPES[1],
    color: COLORS[1],
    x: 3,
    y: -1,
  }));
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("게임 스타트를 눌러주세요.");
  const [speed, setSpeed] = useState(700);
  const [gameOver, setGameOver] = useState(false);
  const [clearingRows, setClearingRows] = useState<number[]>([]);
  const [isClearing, setIsClearing] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);

  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const displayBoard = useMemo(() => {
    const merged = board.map((row) => row.slice());
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!value) return;
        const targetY = piece.y + y;
        const targetX = piece.x + x;
        if (targetY >= 0 && targetY < BOARD_HEIGHT) {
          merged[targetY][targetX] = piece.color;
        }
      });
    });
    return merged;
  }, [board, piece]);

  const hardDrop = useCallback(() => {
    if (isClearing) return;
    let nextY = piece.y;
    while (isValid(board, piece, 0, nextY - piece.y + 1)) {
      nextY += 1;
    }
    setPiece((prev) => ({ ...prev, y: nextY }));
  }, [board, piece, isClearing]);

  const drop = useCallback(() => {
    if (isClearing) return;
    if (isValid(board, piece, 0, 1)) {
      setPiece((prev) => ({ ...prev, y: prev.y + 1 }));
      return;
    }

    const merged = merge(board, piece);
    const fullRows = getFullRows(merged);

    if (fullRows.length > 0) {
      setIsClearing(true);
      setClearingRows(fullRows);
      setBoard(merged);
      setMessage(`라인 ${fullRows.length}줄 삭제!`);
      setIsRunning(false);
      setTimeout(() => {
        const result = clearLines(merged);
        setScore((prev) => prev + SCORES[result.cleared] * level);
        setLines((prev) => prev + result.cleared);
        if ((lines + result.cleared) % 10 === 0) {
          setLevel((prev) => prev + 1);
          setSpeed((prev) => Math.max(220, prev - 60));
        }
        setBoard(result.board);
        setPiece(createPieceFrom(nextPiece.shape, nextPiece.color));
        setNextPiece(randomPiece());
        setClearingRows([]);
        setIsClearing(false);
        if (!isValid(result.board, nextPiece, 0, 0)) {
          setIsRunning(false);
          setGameOver(true);
          setMessage("게임 오버! 다시 시작해볼까요?");
          return;
        }
        setIsRunning(true);
      }, 220);
      return;
    }

    setMessage("귀여운 블록 쌓기 진행 중!");
    setBoard(merged);
    setPiece(createPieceFrom(nextPiece.shape, nextPiece.color));
    setNextPiece(randomPiece());

    if (!isValid(merged, nextPiece, 0, 0)) {
      setIsRunning(false);
      setGameOver(true);
      setMessage("게임 오버! 다시 시작해볼까요?");
    }
  }, [board, piece, nextPiece, level, lines, isClearing]);

  const startGame = () => {
    setBoard(createBoard());
    setPiece(randomPiece());
    setNextPiece(randomPiece());
    setScore(0);
    setLines(0);
    setLevel(1);
    setSpeed(700);
    setMessage("블록을 움직여보세요!");
    setIsRunning(true);
    setHasStarted(true);
    setGameOver(false);
  };

  const togglePause = () => {
    setIsRunning((prev) => !prev);
  };

  const move = (dx: number, dy: number) => {
    if (!isRunning) return;
    if (isValid(board, piece, dx, dy)) {
      setPiece((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const rotatePiece = () => {
    if (!isRunning) return;
    const nextShape = rotate(piece.shape);
    if (isValid(board, piece, 0, 0, nextShape)) {
      setPiece((prev) => ({ ...prev, shape: nextShape }));
    }
  };

  useEffect(() => {
    const syncViewport = () => {
      setViewportWidth(window.innerWidth);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const boardCellSize = useMemo(() => {
    if (viewportWidth < 640) return 20;
    if (viewportWidth < 1024) return 22;
    if (viewportWidth < 1280) return 24;
    return BOARD_CELL_PX;
  }, [viewportWidth]);

  useEffect(() => {
    if (!isRunning) {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
      return;
    }

    tickRef.current = setInterval(() => {
      drop();
    }, speedRef.current);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [isRunning, drop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isRunning) return;
      if (event.code === "ArrowLeft") move(-1, 0);
      if (event.code === "ArrowRight") move(1, 0);
      if (event.code === "ArrowDown") move(0, 1);
      if (event.code === "ArrowUp" || event.code === "Enter") rotatePiece();
      if (event.code === "Space") hardDrop();
      if (
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp" ||
        event.code === "Enter" ||
        event.code === "Space"
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="bg-[#f7f2ff] text-[#2a2d3e]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,196,255,0.45),transparent_48%),radial-gradient(circle_at_80%_30%,rgba(173,156,255,0.35),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(240,182,255,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[length:100%_100%,32px_32px,32px_32px] bg-[position:0_0,0_0,0_0] opacity-70 [background:linear-gradient(0deg,rgba(255,255,255,0.7),rgba(255,255,255,0.7)),linear-gradient(90deg,rgba(212,212,212,0.35)_1px,transparent_1px),linear-gradient(0deg,rgba(212,212,212,0.35)_1px,transparent_1px)]" />
          <div className="absolute top-[12%] left-[10%] h-20 w-20 rotate-12 rounded-3xl border-4 border-[#d7c6ff]/70" />
          <div className="absolute top-[18%] right-[12%] h-12 w-12 rotate-6 rounded-full border-4 border-[#bfa7ff]/70" />
          <div className="absolute bottom-[18%] left-[14%] h-16 w-16 rotate-12 border-4 border-[#f0b6ff]/70" />
          <div className="absolute right-[20%] bottom-[12%] h-8 w-20 rotate-[-6deg] rounded-full border-4 border-[#a988ff]/70" />
          <div className="absolute top-[35%] left-[8%] h-10 w-10 rounded-full border-4 border-[#c8b0ff]/60" />
          <div className="absolute top-[45%] right-[10%] h-8 w-12 rounded-full border-4 border-[#f6c8ff]/60" />
          <div className="absolute bottom-[10%] left-[20%] h-9 w-9 rounded-full border-4 border-[#d9edff]/60" />
          <div className="absolute right-[28%] bottom-[8%] h-6 w-10 rounded-full border-4 border-[#ffd9f2]/60" />
        </div>

        <div className="mx-auto flex w-full max-w-none flex-col gap-2 px-2 pt-2 pb-10 md:pb-14">
          <div className="grid content-start gap-1.5">
            <header className="flex flex-wrap items-center justify-between gap-2">
              <Link
                className="rounded-full border border-[#2a2d3e]/20 bg-white/70 px-3 py-1.5 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                href="/"
              >
                돌아가기
              </Link>
              <div className="flex flex-1 items-center justify-center gap-2">
                {[
                  { label: "점수", value: score.toLocaleString() },
                  { label: "라인", value: lines.toString() },
                  { label: "레벨", value: level.toString() },
                  { label: "속도", value: `${speed}ms` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1 rounded-full border border-[#2a2d3e]/10 bg-white/70 px-2 py-1 text-[10px] text-[#2a2d3e]/70"
                  >
                    <span className="text-[9px] tracking-[0.2em] text-[#2a2d3e]/50 uppercase">
                      {item.label}
                    </span>
                    <span className="font-semibold text-[#2a2d3e]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] tracking-[0.2em] text-[#2a2d3e]/70 uppercase">
                Cute Tetris
              </span>
            </header>

            <main className="mt-2 flex min-h-0 flex-col items-center gap-3 xl:mt-3 xl:flex-row xl:items-start xl:justify-center xl:gap-4">
              <section className="min-h-0 w-fit self-center rounded-[24px] border border-[#2a2d3e]/10 bg-white/80 px-3 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:px-4 xl:self-start xl:px-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs tracking-[0.3em] text-[#2a2d3e]/60 uppercase">
                    게임 보드
                  </p>
                  <div className="flex items-center gap-2">
                    {!hasStarted ? (
                      <button
                        className="rounded-full bg-[#bfa7ff] px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_10px_30px_rgba(191,167,255,0.45)]"
                        onClick={startGame}
                      >
                        게임 스타트
                      </button>
                    ) : isRunning ? (
                      <button
                        className="rounded-full bg-[#bfa7ff] px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_10px_30px_rgba(191,167,255,0.45)]"
                        onClick={togglePause}
                      >
                        일시정지
                      </button>
                    ) : (
                      <button
                        className="rounded-full bg-[#bfa7ff] px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_10px_30px_rgba(191,167,255,0.45)]"
                        onClick={togglePause}
                      >
                        재개
                      </button>
                    )}
                    <span className="text-[11px] text-[#2a2d3e]/60">
                      {message}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mx-auto w-fit">
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${boardCellSize}px)`,
                        gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${boardCellSize}px)`,
                        gap: `${BOARD_GAP_PX}px`,
                      }}
                    >
                      {displayBoard.map((row, y) =>
                        row.map((cell, x) => (
                          <div
                            key={`${x}-${y}`}
                            className={`rounded-[10px] border border-[#2a2d3e]/10 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] ${
                              clearingRows.includes(y)
                                ? "animate-[line-flash_220ms_ease-in-out]"
                                : ""
                            }`}
                            style={{
                              backgroundColor: cell ?? "#fff",
                              boxShadow: cell
                                ? "inset 0 2px 6px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.08)"
                                : "0 2px 6px rgba(0,0,0,0.08)",
                            }}
                          >
                            {cell ? (
                              <div className="pointer-events-none relative h-full w-full">
                                <span className="absolute top-[32%] left-[24%] h-[5px] w-[5px] rounded-full bg-white/80" />
                                <span className="absolute top-[32%] right-[24%] h-[5px] w-[5px] rounded-full bg-white/80" />
                                <span className="absolute bottom-[24%] left-[40%] h-[4px] w-[10px] rounded-full bg-white/70" />
                              </div>
                            ) : null}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <aside className="flex w-full max-w-[320px] shrink-0 flex-col gap-2 self-center xl:w-[220px] xl:self-start">
                <section className="rounded-[18px] border border-[#2a2d3e]/10 bg-gradient-to-r from-white/90 to-[#f2e9ff] px-3 py-2 shadow-[0_10px_25px_rgba(169,136,255,0.2)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 items-center rounded-full bg-[#a988ff] px-3 text-[10px] font-semibold tracking-[0.3em] text-white uppercase">
                        Next
                      </span>
                      <span className="text-[11px] font-semibold text-[#2a2d3e]">
                        다음 블록
                      </span>
                    </div>
                    <span className="text-[10px] text-[#2a2d3e]/60">
                      미리보기
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-center">
                    {(() => {
                      const bounds = getShapeBounds(nextPiece.shape);
                      const rows = bounds.maxY - bounds.minY + 1;
                      const cols = bounds.maxX - bounds.minX + 1;
                      const cells = Array.from({ length: rows }).map((_, row) =>
                        Array.from({ length: cols }).map((__, col) => {
                          const y = bounds.minY + row;
                          const x = bounds.minX + col;
                          return Boolean(nextPiece.shape[y]?.[x]);
                        })
                      );
                      return (
                        <div
                          className="grid gap-1 rounded-[12px] border border-[#a988ff]/40 bg-white/80 p-2"
                          style={{
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                          }}
                        >
                          {cells.map((row, y) =>
                            row.map((filled, x) => (
                              <div
                                key={`${x}-${y}`}
                                className={`relative flex h-6 w-6 items-center justify-center rounded-[8px] ${
                                  filled
                                    ? "border border-[#2a2d3e]/10 shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
                                    : ""
                                }`}
                                style={{
                                  backgroundColor: filled
                                    ? nextPiece.color
                                    : "transparent",
                                }}
                              >
                                {filled ? (
                                  <span className="absolute bottom-0.5 left-0.5 text-[7px] text-white/80">
                                    • •
                                  </span>
                                ) : null}
                              </div>
                            ))
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </section>

                <section className="rounded-[18px] border border-[#2a2d3e]/10 bg-white/85 p-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                  <p className="text-xs tracking-[0.3em] text-[#2a2d3e]/60 uppercase">
                    컨트롤
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-[#2a2d3e]">
                    <button
                      className="rounded-2xl bg-white py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                      onClick={() => move(-1, 0)}
                    >
                      LEFT
                    </button>
                    <button
                      className="rounded-2xl bg-white py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                      onClick={() => move(1, 0)}
                    >
                      RIGHT
                    </button>
                    <button
                      className="rounded-2xl bg-white py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                      onClick={rotatePiece}
                    >
                      ROTATE
                    </button>
                    <button
                      className="rounded-2xl bg-white py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                      onClick={() => move(0, 1)}
                    >
                      DOWN
                    </button>
                    <button
                      className="col-span-2 rounded-2xl bg-[#a988ff] py-1.5 text-white shadow-[0_8px_18px_rgba(169,136,255,0.5)]"
                      onClick={drop}
                    >
                      DROP
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] text-[#2a2d3e]/60">
                    키보드: 방향키, 스페이스(드롭)
                  </p>
                </section>
              </aside>
            </main>
            {gameOver ? (
              <div className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center bg-[#2a2d3e]/40 px-4">
                <div className="w-full max-w-sm rounded-[24px] border border-[#2a2d3e]/10 bg-white/95 p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                  <p className="text-sm font-semibold text-[#a988ff]">
                    GAME OVER
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#2a2d3e]">
                    아쉽지만 끝!
                  </h2>
                  <p className="mt-2 text-sm text-[#2a2d3e]/70">
                    점수 {score.toLocaleString()} · 라인 {lines} · 레벨 {level}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      className="rounded-full bg-[#bfa7ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(191,167,255,0.45)]"
                      onClick={startGame}
                    >
                      다시 시작
                    </button>
                    <button
                      className="rounded-full border border-[#2a2d3e]/15 bg-white/70 px-5 py-2 text-sm text-[#2a2d3e]/70"
                      onClick={() => setGameOver(false)}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
