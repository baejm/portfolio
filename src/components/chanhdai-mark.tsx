export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 112 32"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="
          M0 0h8v32H0V0z
          M8 0h16v8H8V0z
          M8 12h16v8H8v-8z
          M8 24h16v8H8v-8z
          M24 8h8v8h-8V8z
          M24 16h8v8h-8v-8z

          M48 0h24v8H48V0z
          M64 8h8v16h-8V8z
          M48 24h16v8H48v-8z

          M88 0h8v32h-8V0z
          M104 0h8v32h-8V0z
          M96 8h8v8h-8V8z
          M96 16h8v8h-8v-8z
        "
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M96 128H32V96h64v32ZM224 32h-64v64h64v32h-96V0h96v32ZM32 96H0V32h32v64ZM256 96h-32V32h32v64ZM96 32H32V0h64v32Z"/></svg>`;
}
