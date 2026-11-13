import { BrandLogo } from "@/components/brand/brand-logo";
import { GithubMark } from "@/components/brand/github-mark";

const REPOSITORY = "https://github.com/ferforastieri/faang";

export function SiteFooter() {
  return (
    <footer className="tp-footer">
      <div className="tp-shell tp-footer__bar">
        <a href="/" className="tp-brand" aria-label="Faang, início">
          <BrandLogo height={20} />
        </a>

        <p className="tp-footer__note">MIT · feito com o próprio kit</p>

        <nav className="tp-footer__links" aria-label="Links do rodapé">
          <a href="/components">Componentes</a>
          <a href="/docs">Docs</a>
          <a href="/docs/color">Tokens</a>
          <a href={REPOSITORY} target="_blank" rel="noreferrer">
            <GithubMark size={14} />
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
