/** One install line, the way the terminal would show it. */
export function InstallCommand({ command }: { command: string }) {
  return (
    <code className="tp-install">
      <span className="tp-install__prompt" aria-hidden="true">
        $
      </span>
      <span className="tp-install__text">{command}</span>
    </code>
  );
}
