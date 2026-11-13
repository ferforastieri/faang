import { LogoMark } from "@ui/components/Logo";

const REPOSITORY = "https://github.com/ferforastieri/faang";

export function SiteFooter() {
  return (
    <footer className="tp-footer">
      <div className="tp-shell tp-footer__bar">
        <a href="/" className="tp-brand" aria-label="Faang, início">
          <LogoMark size={22} />
          <span className="tp-brand__name" aria-hidden="true">
            <b>Faang</b> <span>UI</span>
          </span>
        </a>

        <p className="tp-footer__note">MIT · feito com o próprio kit</p>

        <nav className="tp-footer__links" aria-label="Links do rodapé">
          <a href="/components">Componentes</a>
          <a href="/docs">Docs</a>
          <a href="/docs/color">Tokens</a>
          <a href={REPOSITORY} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`${REPOSITORY}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
            Licença
          </a>
        </nav>
      </div>
    </footer>
  );
}
