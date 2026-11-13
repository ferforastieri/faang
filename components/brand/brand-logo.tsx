/** The official Faang mark, red: one asset for the header, the rails, the footer and auth. */
export function BrandLogo({ height = 24, className }: { height?: number; className?: string }) {
  return (
    <img
      src="/brand/faang-logo.png"
      alt="Faang"
      height={height}
      className={className ? `tp-brand__logo ${className}` : "tp-brand__logo"}
      style={{ height, width: "auto" }}
    />
  );
}
