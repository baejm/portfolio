export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      fill="none"
      {...props}
    >
      <rect width="120" height="40" rx="6" fill="currentColor" />
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fontSize="16"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fill="#fff"
      >
        BJM
      </text>
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" rx="6" fill="${color}" /><text x="60" y="26" text-anchor="middle" font-size="16" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fill="#fff">BJM</text></svg>`;
}
