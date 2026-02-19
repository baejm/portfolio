"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Vec = { x: number; y: number };

type Bullet = Vec & { id: number; speed: number };
type EnemyBullet = Vec & { id: number; dx: number; dy: number; speed: number };
type Star = Vec & { speed: number; size: number };
type Explosion = Vec & { id: number; life: number; radius: number };
type HitSpark = Vec & { id: number; life: number; size: number };

type EnemyType = "grunt" | "zig" | "tank";
type BossType = "hornet" | "golem" | "phantom";

type Enemy = Vec & {
  id: number;
  speed: number;
  hp: number;
  type: EnemyType;
  baseX: number;
  age: number;
  amplitude: number;
  frequency: number;
};

type Boss = Vec & {
  id: number;
  hp: number;
  maxHp: number;
  type: BossType;
  phase: number;
  lastAttack: number;
  lastTeleport: number;
};

const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 640;

const PLAYER_SPEED = 3.6;
const BULLET_SPEED = 6.8;
const ENEMY_SPEED_MIN = 1.2;
const ENEMY_SPEED_MAX = 2.6;
const FIRE_COOLDOWN = 130;
const INVINCIBLE_TIME = 1200;

const WAVE_KILLS_BASE = 12;
const WAVES_PER_STAGE = 3;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createStars(count: number): Star[] {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * CANVAS_WIDTH,
    y: Math.random() * CANVAS_HEIGHT,
    speed: 0.4 + Math.random() * 1.6,
    size: 1 + Math.random() * 2,
  }));
}

function getBossTypeByStage(stage: number): BossType {
  const types: BossType[] = ["hornet", "golem", "phantom"];
  return types[(stage - 1) % types.length];
}

function getBossMeta(type: BossType) {
  if (type === "hornet") {
    return { name: "호넷", color: "#ffb703", hp: 120, cooldown: 900 };
  }
  if (type === "golem") {
    return { name: "골렘", color: "#8ecae6", hp: 160, cooldown: 1200 };
  }
  return { name: "팬텀", color: "#b5179e", hp: 140, cooldown: 700 };
}

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFireRef = useRef(0);
  const lastHitRef = useRef(0);
  const enemyIdRef = useRef(1);
  const bulletIdRef = useRef(1);
  const enemyBulletIdRef = useRef(1);
  const explosionIdRef = useRef(1);

  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [stage, setStage] = useState(1);
  const [wave, setWave] = useState(1);
  const [bossInfo, setBossInfo] = useState<{
    name: string;
    hp: number;
    maxHp: number;
    color: string;
  } | null>(null);
  const [message, setMessage] = useState("시작 버튼을 눌러주세요.");

  const stageRef = useRef(1);
  const waveRef = useRef(1);
  const waveKillsRef = useRef(0);
  const waveTargetRef = useRef(WAVE_KILLS_BASE);
  const nextSpawnRef = useRef(0);
  const bossRef = useRef<Boss | null>(null);

  const playerRef = useRef<Vec>({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 80 });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemyBulletsRef = useRef<EnemyBullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const explosionsRef = useRef<Explosion[]>([]);
  const hitSparksRef = useRef<HitSpark[]>([]);
  const starsRef = useRef<Star[]>([]);
  const keysRef = useRef<{
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    fire: boolean;
  }>({
    left: false,
    right: false,
    up: false,
    down: false,
    fire: false,
  });

  useEffect(() => {
    starsRef.current = createStars(36);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA")
        keysRef.current.left = true;
      if (event.code === "ArrowRight" || event.code === "KeyD")
        keysRef.current.right = true;
      if (event.code === "ArrowUp" || event.code === "KeyW")
        keysRef.current.up = true;
      if (event.code === "ArrowDown" || event.code === "KeyS")
        keysRef.current.down = true;
      if (
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowUp" ||
        event.code === "ArrowDown" ||
        event.code === "Space"
      ) {
        event.preventDefault();
      }
      if (event.code === "Space") keysRef.current.fire = true;
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA")
        keysRef.current.left = false;
      if (event.code === "ArrowRight" || event.code === "KeyD")
        keysRef.current.right = false;
      if (event.code === "ArrowUp" || event.code === "KeyW")
        keysRef.current.up = false;
      if (event.code === "ArrowDown" || event.code === "KeyS")
        keysRef.current.down = false;
      if (
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowUp" ||
        event.code === "ArrowDown" ||
        event.code === "Space"
      ) {
        event.preventDefault();
      }
      if (event.code === "Space") keysRef.current.fire = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      updateGame(delta, time);
      drawGame(ctx, time);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const updateGame = (delta: number, now: number) => {
    const player = playerRef.current;

    const dx = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0);
    const dy = (keysRef.current.down ? 1 : 0) - (keysRef.current.up ? 1 : 0);

    player.x = clamp(player.x + dx * PLAYER_SPEED, 24, CANVAS_WIDTH - 24);
    player.y = clamp(player.y + dy * PLAYER_SPEED, 60, CANVAS_HEIGHT - 40);

    if (keysRef.current.fire && now - lastFireRef.current > FIRE_COOLDOWN) {
      bulletsRef.current.push({
        id: bulletIdRef.current++,
        x: player.x,
        y: player.y - 18,
        speed: BULLET_SPEED,
      });
      lastFireRef.current = now;
    }

    bulletsRef.current = bulletsRef.current
      .map((bullet) => ({ ...bullet, y: bullet.y - bullet.speed }))
      .filter((bullet) => bullet.y > -30);

    enemyBulletsRef.current = enemyBulletsRef.current
      .map((bullet) => ({
        ...bullet,
        x: bullet.x + bullet.dx * bullet.speed,
        y: bullet.y + bullet.dy * bullet.speed,
      }))
      .filter(
        (bullet) =>
          bullet.y < CANVAS_HEIGHT + 40 &&
          bullet.y > -40 &&
          bullet.x > -40 &&
          bullet.x < CANVAS_WIDTH + 40
      );

    enemiesRef.current = enemiesRef.current
      .map((enemy) => {
        const next = { ...enemy, age: enemy.age + delta };
        if (enemy.type === "zig") {
          next.x =
            enemy.baseX +
            Math.sin((enemy.age / 1000) * enemy.frequency) * enemy.amplitude;
        }
        next.y += next.speed;
        return next;
      })
      .filter((enemy) => enemy.y < CANVAS_HEIGHT + 60);

    updateWaveProgress(now);
    updateBoss(now);
    spawnEnemies(now);

    starsRef.current = starsRef.current.map((star) => {
      let nextY = star.y + star.speed * (1 + delta / 16);
      if (nextY > CANVAS_HEIGHT) {
        nextY = -10;
        return { ...star, y: nextY, x: randomBetween(0, CANVAS_WIDTH) };
      }
      return { ...star, y: nextY };
    });

    explosionsRef.current = explosionsRef.current
      .map((explosion) => ({ ...explosion, life: explosion.life - delta }))
      .filter((explosion) => explosion.life > 0);
    hitSparksRef.current = hitSparksRef.current
      .map((spark) => ({ ...spark, life: spark.life - delta }))
      .filter((spark) => spark.life > 0);

    handleCollisions(now);
  };

  const spawnEnemies = (now: number) => {
    if (bossRef.current) return;
    if (now < nextSpawnRef.current) return;

    const baseInterval = Math.max(420, 900 - stageRef.current * 40);
    nextSpawnRef.current = now + baseInterval + randomBetween(-120, 180);

    const patternRoll = randomBetween(0, 1);
    if (patternRoll < 0.25) {
      spawnFormation();
      return;
    }

    const typeRoll = randomBetween(0, 1);
    const type: EnemyType =
      typeRoll < 0.6 ? "grunt" : typeRoll < 0.85 ? "zig" : "tank";

    enemiesRef.current.push(createEnemy(type));
  };

  const spawnFormation = () => {
    const startX = randomBetween(60, CANVAS_WIDTH - 60);
    for (let i = 0; i < 3; i += 1) {
      enemiesRef.current.push(
        createEnemy("grunt", startX + (i - 1) * 40, -30 - i * 20)
      );
    }
  };

  const createEnemy = (type: EnemyType, x?: number, y?: number): Enemy => {
    const baseX = x ?? randomBetween(40, CANVAS_WIDTH - 40);
    return {
      id: enemyIdRef.current++,
      x: baseX,
      y: y ?? -20,
      speed: randomBetween(ENEMY_SPEED_MIN, ENEMY_SPEED_MAX),
      hp: type === "tank" ? 2 : 1,
      type,
      baseX,
      age: 0,
      amplitude: type === "zig" ? randomBetween(30, 60) : 0,
      frequency: type === "zig" ? randomBetween(2.2, 3.4) : 0,
    };
  };

  const updateWaveProgress = (now: number) => {
    if (bossRef.current) return;
    if (waveKillsRef.current < waveTargetRef.current) return;

    if (waveRef.current < WAVES_PER_STAGE) {
      waveRef.current += 1;
      waveKillsRef.current = 0;
      waveTargetRef.current =
        WAVE_KILLS_BASE + stageRef.current * 4 + waveRef.current * 2;
      setWave(waveRef.current);
      setMessage(`웨이브 ${waveRef.current} 시작!`);
      return;
    }

    spawnBoss(now);
  };

  const updateBoss = (now: number) => {
    const boss = bossRef.current;
    if (!boss) return;

    boss.phase += 1;

    if (boss.type === "hornet") {
      boss.x =
        CANVAS_WIDTH / 2 + Math.sin(boss.phase * 0.03) * (CANVAS_WIDTH * 0.25);
      boss.y = 90 + Math.sin(boss.phase * 0.015) * 30;
      if (now - boss.lastAttack > getBossMeta(boss.type).cooldown) {
        fireBossSpread(boss);
        boss.lastAttack = now;
      }
    }

    if (boss.type === "golem") {
      boss.x =
        CANVAS_WIDTH / 2 + Math.cos(boss.phase * 0.02) * (CANVAS_WIDTH * 0.18);
      boss.y = 80;
      if (now - boss.lastAttack > getBossMeta(boss.type).cooldown) {
        fireBossRing(boss);
        boss.lastAttack = now;
      }
    }

    if (boss.type === "phantom") {
      boss.y = 70 + Math.sin(boss.phase * 0.02) * 20;
      if (now - boss.lastTeleport > 1400) {
        boss.x = randomBetween(80, CANVAS_WIDTH - 80);
        boss.lastTeleport = now;
      }
      if (now - boss.lastAttack > getBossMeta(boss.type).cooldown) {
        fireBossAim(boss);
        boss.lastAttack = now;
      }
    }
  };

  const spawnBoss = (now: number) => {
    const type = getBossTypeByStage(stageRef.current);
    const meta = getBossMeta(type);
    enemiesRef.current = [];
    enemyBulletsRef.current = [];
    bossRef.current = {
      id: enemyIdRef.current++,
      x: CANVAS_WIDTH / 2,
      y: 70,
      hp: meta.hp + stageRef.current * 6,
      maxHp: meta.hp + stageRef.current * 6,
      type,
      phase: 0,
      lastAttack: now,
      lastTeleport: now,
    };
    setBossInfo({
      name: meta.name,
      hp: meta.hp + stageRef.current * 6,
      maxHp: meta.hp + stageRef.current * 6,
      color: meta.color,
    });
    setMessage(`${meta.name} 등장! 집중 사격!`);
  };

  const fireBossSpread = (boss: Boss) => {
    const spreads = [-0.5, 0, 0.5];
    spreads.forEach((dx) => {
      enemyBulletsRef.current.push({
        id: enemyBulletIdRef.current++,
        x: boss.x,
        y: boss.y + 20,
        dx,
        dy: 1,
        speed: 3.2,
      });
    });
  };

  const fireBossRing = (boss: Boss) => {
    const count = 7;
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count;
      enemyBulletsRef.current.push({
        id: enemyBulletIdRef.current++,
        x: boss.x,
        y: boss.y + 10,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        speed: 2.6,
      });
    }
  };

  const fireBossAim = (boss: Boss) => {
    const player = playerRef.current;
    const dx = player.x - boss.x;
    const dy = player.y - boss.y;
    const dist = Math.max(1, Math.hypot(dx, dy));
    enemyBulletsRef.current.push({
      id: enemyBulletIdRef.current++,
      x: boss.x,
      y: boss.y + 12,
      dx: dx / dist,
      dy: dy / dist,
      speed: 3.4,
    });
  };

  const handleCollisions = (now: number) => {
    const player = playerRef.current;
    const enemies = enemiesRef.current;
    const bullets = bulletsRef.current;
    const boss = bossRef.current;
    const invincible = now - lastHitRef.current < INVINCIBLE_TIME;

    for (let i = enemies.length - 1; i >= 0; i -= 1) {
      const enemy = enemies[i];
      const hitPlayer = Math.hypot(enemy.x - player.x, enemy.y - player.y) < 22;
      if (hitPlayer && !invincible) {
        enemies.splice(i, 1);
        handlePlayerHit(now);
        continue;
      }

      for (let j = bullets.length - 1; j >= 0; j -= 1) {
        const bullet = bullets[j];
        const hitEnemy =
          Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < 18;
        if (hitEnemy) {
          bullets.splice(j, 1);
          enemy.hp -= 1;
          spawnHitSpark(enemy.x, enemy.y, 14);
          if (enemy.hp <= 0) {
            enemies.splice(i, 1);
            spawnExplosion(enemy.x, enemy.y, 30);
            waveKillsRef.current += 1;
            setScore((prev) => prev + 10);
            setMessage("적기 격추!");
          }
          break;
        }
      }
    }

    if (boss) {
      for (let j = bullets.length - 1; j >= 0; j -= 1) {
        const bullet = bullets[j];
        const hitBoss = Math.hypot(boss.x - bullet.x, boss.y - bullet.y) < 36;
        if (hitBoss) {
          bullets.splice(j, 1);
          boss.hp -= 1;
          spawnHitSpark(boss.x, boss.y, 18);
          setBossInfo((prev) =>
            prev ? { ...prev, hp: Math.max(0, boss.hp) } : prev
          );
          if (boss.hp <= 0) {
            spawnExplosion(boss.x, boss.y, 80);
            bossRef.current = null;
            setBossInfo(null);
            setScore((prev) => prev + 200);
            setMessage("보스 격파!");
            advanceStage();
          }
        }
      }
    }

    for (let i = enemyBulletsRef.current.length - 1; i >= 0; i -= 1) {
      const bullet = enemyBulletsRef.current[i];
      const hitPlayer =
        Math.hypot(bullet.x - player.x, bullet.y - player.y) < 18;
      if (hitPlayer && !invincible) {
        enemyBulletsRef.current.splice(i, 1);
        handlePlayerHit(now);
      }
    }
  };

  const handlePlayerHit = (now: number) => {
    lastHitRef.current = now;
    spawnExplosion(playerRef.current.x, playerRef.current.y, 40);
    setLives((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setIsRunning(false);
        setMessage("게임 오버! 다시 시작해보세요.");
      } else {
        setMessage("피격! 조심하세요.");
      }
      return next;
    });
  };

  const spawnExplosion = (x: number, y: number, radius: number) => {
    explosionsRef.current.push({
      id: explosionIdRef.current++,
      x,
      y,
      life: 520,
      radius,
    });
  };

  const spawnHitSpark = (x: number, y: number, size: number) => {
    hitSparksRef.current.push({
      id: explosionIdRef.current++,
      x,
      y,
      life: 220,
      size,
    });
  };

  const advanceStage = () => {
    stageRef.current += 1;
    waveRef.current = 1;
    waveKillsRef.current = 0;
    waveTargetRef.current =
      WAVE_KILLS_BASE + stageRef.current * 4 + waveRef.current * 2;
    setStage(stageRef.current);
    setWave(waveRef.current);
    setMessage(`스테이지 ${stageRef.current} 시작!`);
  };

  const drawGame = (ctx: CanvasRenderingContext2D, now: number) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, "#0b1d3a");
    gradient.addColorStop(1, "#050812");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    starsRef.current.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    const player = playerRef.current;
    const invincible = now - lastHitRef.current < INVINCIBLE_TIME;
    if (!invincible || Math.floor(now / 120) % 2 === 0) {
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.moveTo(player.x, player.y - 18);
      ctx.lineTo(player.x - 15, player.y + 20);
      ctx.lineTo(player.x, player.y + 10);
      ctx.lineTo(player.x + 15, player.y + 20);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(player.x - 5, player.y + 8, 10, 12);
    }

    ctx.fillStyle = "#a0c4ff";
    bulletsRef.current.forEach((bullet) => {
      ctx.fillRect(bullet.x - 2, bullet.y - 10, 4, 12);
    });

    ctx.fillStyle = "#fca311";
    enemyBulletsRef.current.forEach((bullet) => {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    enemiesRef.current.forEach((enemy) => {
      ctx.fillStyle = enemy.type === "tank" ? "#ff9aa2" : "#ffd166";
      ctx.beginPath();
      ctx.ellipse(enemy.x, enemy.y, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = enemy.type === "tank" ? "#ffb3c1" : "#ffe8a3";
      ctx.beginPath();
      ctx.ellipse(enemy.x, enemy.y + 6, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#3f3d56";
      ctx.beginPath();
      ctx.arc(enemy.x - 5, enemy.y - 2, 2, 0, Math.PI * 2);
      ctx.arc(enemy.x + 5, enemy.y - 2, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ff6b6b";
      ctx.beginPath();
      ctx.arc(enemy.x - 7, enemy.y + 4, 1.6, 0, Math.PI * 2);
      ctx.arc(enemy.x + 7, enemy.y + 4, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (bossRef.current) {
      const boss = bossRef.current;
      const meta = getBossMeta(boss.type);
      ctx.fillStyle = meta.color;
      ctx.beginPath();
      ctx.ellipse(boss.x, boss.y, 44, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.ellipse(boss.x, boss.y + 10, 26, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#2f2d4a";
      ctx.beginPath();
      ctx.arc(boss.x - 12, boss.y - 4, 4, 0, Math.PI * 2);
      ctx.arc(boss.x + 12, boss.y - 4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(boss.x - 13, boss.y - 6, 1.6, 0, Math.PI * 2);
      ctx.arc(boss.x + 13, boss.y - 6, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    hitSparksRef.current.forEach((spark) => {
      const progress = spark.life / 220;
      ctx.fillStyle = `rgba(255, 240, 160, ${progress})`;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size * (1 - progress), 0, Math.PI * 2);
      ctx.fill();
    });

    explosionsRef.current.forEach((explosion) => {
      const progress = explosion.life / 520;
      ctx.fillStyle = `rgba(255, 160, 64, ${progress})`;
      ctx.beginPath();
      ctx.arc(
        explosion.x,
        explosion.y,
        explosion.radius * (1 - progress),
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    drawHud(ctx);
  };

  const drawHud = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "12px sans-serif";
    ctx.fillText(`STAGE ${stageRef.current}  WAVE ${waveRef.current}`, 12, 22);
    ctx.fillText(
      `KILLS ${waveKillsRef.current}/${waveTargetRef.current}`,
      12,
      40
    );

    if (bossRef.current && bossInfo) {
      const barWidth = 160;
      const ratio = bossInfo.hp / bossInfo.maxHp;
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(CANVAS_WIDTH - barWidth - 12, 14, barWidth, 10);
      ctx.fillStyle = bossInfo.color;
      ctx.fillRect(CANVAS_WIDTH - barWidth - 12, 14, barWidth * ratio, 10);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText(`BOSS ${bossInfo.name}`, CANVAS_WIDTH - barWidth - 12, 40);
    }
  };

  const startGame = () => {
    playerRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 80 };
    bulletsRef.current = [];
    enemyBulletsRef.current = [];
    enemiesRef.current = [];
    explosionsRef.current = [];
    hitSparksRef.current = [];
    bossRef.current = null;
    setBossInfo(null);
    setScore(0);
    setLives(3);
    stageRef.current = 1;
    waveRef.current = 1;
    waveKillsRef.current = 0;
    waveTargetRef.current =
      WAVE_KILLS_BASE + stageRef.current * 4 + waveRef.current * 2;
    nextSpawnRef.current = 0;
    setStage(1);
    setWave(1);
    setMessage("출격! 스페이스로 발사하세요.");
    setHasStarted(true);
    setIsRunning(true);
  };

  const togglePause = () => {
    setIsRunning((prev) => !prev);
  };

  const pressFire = (isPressed: boolean) => {
    keysRef.current.fire = isPressed;
  };

  const pressDirection = (
    direction: "left" | "right" | "up" | "down",
    isPressed: boolean
  ) => {
    keysRef.current[direction] = isPressed;
  };

  return (
    <div className="min-h-screen bg-slate-950 px-3 py-6 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <header className="flex items-center justify-between text-sm font-semibold">
          <Link className="rounded-full bg-white/10 px-3 py-1" href="/">
            돌아가기
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1">
            비행기 전투
          </span>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-white/60">SCORE</p>
              <p className="text-2xl font-semibold">{score}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">LIVES</p>
              <p className="text-2xl font-semibold">{lives}</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-white/70">{message}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
            <span>STAGE {stage}</span>
            <span>·</span>
            <span>WAVE {wave}</span>
          </div>
          {bossInfo ? (
            <div className="mt-3 rounded-full bg-white/10 p-1">
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span>BOSS {bossInfo.name}</span>
                <span>
                  {bossInfo.hp}/{bossInfo.maxHp}
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white/20">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{
                    width: `${(bossInfo.hp / bossInfo.maxHp) * 100}%`,
                    background: bossInfo.color,
                  }}
                />
              </div>
            </div>
          ) : null}
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-3">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="mx-auto block w-full rounded-2xl border border-white/10 bg-slate-900"
          />
        </section>

        <section className="grid grid-cols-2 gap-3">
          {!hasStarted ? (
            <button
              className="col-span-2 rounded-full bg-emerald-400 py-3 text-base font-semibold text-slate-900"
              onClick={startGame}
            >
              게임 시작
            </button>
          ) : lives <= 0 ? (
            <button
              className="col-span-2 rounded-full bg-emerald-400 py-3 text-base font-semibold text-slate-900"
              onClick={startGame}
            >
              다시 시작
            </button>
          ) : (
            <button
              className="col-span-2 rounded-full bg-rose-400 py-3 text-base font-semibold text-slate-900"
              onClick={togglePause}
            >
              {isRunning ? "일시정지" : "재개"}
            </button>
          )}
        </section>

        <section className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-900">
          <button
            className="rounded-2xl bg-white/90 py-3"
            onTouchStart={() => pressDirection("left", true)}
            onTouchEnd={() => pressDirection("left", false)}
            onMouseDown={() => pressDirection("left", true)}
            onMouseUp={() => pressDirection("left", false)}
          >
            LEFT
          </button>
          <button
            className="rounded-2xl bg-white/90 py-3"
            onTouchStart={() => pressDirection("up", true)}
            onTouchEnd={() => pressDirection("up", false)}
            onMouseDown={() => pressDirection("up", true)}
            onMouseUp={() => pressDirection("up", false)}
          >
            UP
          </button>
          <button
            className="rounded-2xl bg-white/90 py-3"
            onTouchStart={() => pressDirection("right", true)}
            onTouchEnd={() => pressDirection("right", false)}
            onMouseDown={() => pressDirection("right", true)}
            onMouseUp={() => pressDirection("right", false)}
          >
            RIGHT
          </button>
          <button
            className="rounded-2xl bg-white/90 py-3"
            onTouchStart={() => pressDirection("down", true)}
            onTouchEnd={() => pressDirection("down", false)}
            onMouseDown={() => pressDirection("down", true)}
            onMouseUp={() => pressDirection("down", false)}
          >
            DOWN
          </button>
          <button
            className="col-span-2 rounded-2xl bg-amber-300 py-3"
            onTouchStart={() => pressFire(true)}
            onTouchEnd={() => pressFire(false)}
            onMouseDown={() => pressFire(true)}
            onMouseUp={() => pressFire(false)}
          >
            FIRE
          </button>
        </section>

        <p className="text-center text-xs text-white/50">
          키보드 조작: 화살표/WSAD + 스페이스
        </p>
      </div>
    </div>
  );
}
