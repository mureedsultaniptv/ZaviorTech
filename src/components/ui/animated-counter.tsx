interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration: _duration = 1100,
}: AnimatedCounterProps) {
  void _duration;

  return (
    <span className={className} aria-label={`${prefix}${value.toLocaleString("en-US")}${suffix}`}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
