import { Icon } from "@ui/icons/Icon";

import { BrandLogo } from "@/components/brand/brand-logo";
import { GithubMark } from "@/components/brand/github-mark";

const REPOSITORY = "https://github.com/ferforastieri/faang";

/**
 * The footer: who we are, where to go, and the two files agents read. The
 * `llms.txt` and `docs.md` links are real links on purpose — besides being
 * useful to a person, they are what makes both files discoverable to a
 * crawler (the `<link rel="alternate">` tags in the root layout do the rest).
 */
export function SiteFooter() {
  return (
    <footer className="tp-footer">
      <div className="tp-shell tp-footer__bar">
        <div className="tp-footer__brand">
          <a href="/" className="tp-brand" aria-label="Faang, início">
            <BrandLogo height={20} />
          </a>
          <p className="tp-footer__note">MIT · feito com o próprio kit</p>
        </div>

        <div className="tp-footer__groups">
          <nav className="tp-footer__group" aria-label="Site">
            <span className="tp-footer__label">Site</span>
            <a href="/components">Componentes</a>
            <a href="/docs">Docs</a>
            <a href="/docs/color">Tokens</a>
          </nav>

          <nav className="tp-footer__group" aria-label="Projeto">
            <span className="tp-footer__label">Projeto</span>
            <a href={REPOSITORY} target="_blank" rel="noreferrer">
              <GithubMark size={14} />
              GitHub
            </a>
            <a href={`${REPOSITORY}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
              Licença
            </a>
          </nav>

          <nav className="tp-footer__group tp-footer__group--agents" aria-label="Para agentes">
            <span className="tp-footer__label">Para agentes</span>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noreferrer"
              type="text/plain"
              title="Índice da biblioteca para agentes"
            >
              <Icon name="code" size={14} />
              llms.txt
            </a>
            <a
              href="/docs.md"
              target="_blank"
              rel="noreferrer"
              type="text/markdown"
              title="A documentação em markdown"
            >
              <Icon name="document" size={14} />
              docs.md
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
