interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  return (
    <span className={className}>
      {prefix}
      {Math.floor(value).toLocaleString()}
      {suffix}
    </span>
  );
}
