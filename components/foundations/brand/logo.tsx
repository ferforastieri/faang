import Image from "next/image";
import { cx } from "@/utils/cx";

/**
 * Both marks ship unoptimized. Next's image optimizer resamples with a Lanczos
 * kernel, and on a red-on-transparent matte its negative lobes overshoot the
 * red channel — a one-pixel pale rim that only shows against a dark surface.
 * The sources are small lossless PNGs, so the browser's own scaling is cleaner
 * here and costs nothing extra.
 */

/** Faang's brand mark: the red rounded square with the white cut-out F, taken
 *  from the approved logo. Square, so it seats cleanly in avatars, rails and
 *  headers. The artwork carries its own transparent corners, so it keeps the
 *  mark's squircle on any surface rather than being clipped to a circle. */
export function Logo({
  size = 32,
  className,
  priority = false,
}: {
  /** Rendered edge, in pixels. The source is 256px square. */
  size?: number;
  className?: string;
  /** Set on marks that paint above the fold. */
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/faang-icon.png"
      alt="Faang"
      width={size}
      height={size}
      className={cx("shrink-0", className)}
      priority={priority}
      unoptimized
    />
  );
}

/** The horizontal lockup — mark plus "Faang" wordmark — for the places where
 *  the name has room: auth cards, footers, artwork. `height` drives the whole
 *  thing and the width follows the artwork's 588×204 ratio. */
export function LogoLockup({
  height = 32,
  className,
  priority = false,
}: {
  /** Rendered height, in pixels. Width follows proportionally. */
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/faang-logo.png"
      alt="Faang"
      width={588}
      height={204}
      className={cx("shrink-0", className)}
      style={{ height, width: "auto" }}
      priority={priority}
      unoptimized
    />
  );
}
