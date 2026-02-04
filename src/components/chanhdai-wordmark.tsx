export function ChanhDaiWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 320 64"
      {...props}
    >
      <text
        x="0"
        y="44"
        fontSize="36"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fill="currentColor"
      >
        BAEJUNGMIN
      </text>
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64"><text x="0" y="44" font-size="36" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fill="${color}">BAEJUNGMIN</text></svg>`;
}
