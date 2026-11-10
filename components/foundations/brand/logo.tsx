import Image from "next/image";
import { cx } from "@/utils/cx";

/** Faang mark. Renders the brand icon at a fixed pixel size (24 / 32 / 40).
 *  `mono` swaps between the light and dark black-and-white assets through the
 *  shared theme class on the document root. */
export function Logo({
  size = 32,
  mono = false,
  className,
}: {
  size?: number;
  mono?: boolean;
  className?: string;
}) {
  if (mono) {
    return (
      <>
        <Image
          src="/brand/faang_logo_blackandwhite.png"
          alt="Faang"
          width={size}
          height={size}
          className={cx("theme-logo-light shrink-0", className)}
          priority
        />
        <Image
          src="/brand/faang_logo_blackandwhite_dark.png"
          alt="Faang"
          width={size}
          height={size}
          className={cx("theme-logo-dark shrink-0", className)}
          priority
        />
      </>
    );
  }

  return (
    <Image
      src="/brand/faang_logo.png"
      alt="Faang"
      width={size}
      height={size}
      className={cx("shrink-0", className)}
      priority
    />
  );
}

/** Theme-aware metallic Faang Pro mark. */
export function ProLogo({
  size = 36,
  className,
  decorative = false,
  priority = false,
}: {
  size?: number;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  const alt = decorative ? "" : "Faang Pro";

  return (
    <>
      <Image
        src="/brand/faang_pro.png"
        alt={alt}
        width={size}
        height={size}
        className={cx("theme-logo-light shrink-0 object-contain", className)}
        priority={priority}
      />
      <Image
        src="/brand/faang_pro_dark.png"
        alt={alt}
        width={size}
        height={size}
        className={cx("theme-logo-dark shrink-0 object-contain", className)}
        priority={priority}
      />
    </>
  );
}
