import { useState, useEffect } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Navigation, ThemeToggle } from '@/components'
import { cn } from '@/lib'
import { useTranslation } from 'react-i18next'
import { useCommandPalette } from './CommandPalette'
import Footer from './Footer'
import { 
  MagnifyingGlassIcon,
  DocumentTextIcon,
  CubeIcon,
  CodeBracketIcon,
  ClockIcon,
  HomeIcon,
} from '@/components'

interface LayoutProps {
  children: React.ReactNode
}

const SITE_URL = 'https://faang.vira.ia.br'

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Valk UI - React UI Component Library',
    description: 'Modern React UI components for forms, feedback, layout, charts, documentation, and visual design systems.',
  },
  '/docs': {
    title: 'Documentation - Valk UI',
    description: 'Install Valk UI, learn how the React component library works, and copy components into your project.',
  },
  '/components': {
    title: 'Components - Valk UI',
    description: 'Explore Valk UI components for forms, feedback, layout, navigation, charts, and design systems.',
  },
  '/playground': {
    title: 'Playground - Valk UI',
    description: 'Preview Valk UI React components, themes, colors, and examples in an interactive playground.',
  },
  '/changelog': {
    title: 'Changelog - Valk UI',
    description: 'See Valk UI releases, updates, fixes, and component library changes.',
  },
}

const getRouteMeta = (pathname: string) => {
  if (pathname.startsWith('/components/') && pathname !== '/components') {
    const componentName = pathname
      .replace('/components/', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())

    return {
      title: `${componentName} Component - Valk UI`,
      description: `Documentation, usage examples, and installation details for the ${componentName} component in Valk UI.`,
    }
  }

  return routeMeta[pathname] || routeMeta['/']
}

const setMetaTag = (selector: string, attribute: 'content' | 'href', value: string) => {
  const element = document.head.querySelector(selector)

  if (element) {
    element.setAttribute(attribute, value)
  }
}

function LayoutContent({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<{ y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ y: number } | null>(null)
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { setOpen: setCommandOpen } = useCommandPalette()
  
  const language = (i18n.language || 'pt') as 'pt' | 'en' | 'es'
  const setLanguage = (lang: 'pt' | 'en' | 'es') => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceY = touchStart.y - touchEnd.y
    const isUpSwipe = distanceY < -minSwipeDistance

    if (isUpSwipe) {
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const meta = getRouteMeta(location.pathname)
    const canonicalUrl = `${SITE_URL}${location.pathname === '/' ? '/' : location.pathname}`

    document.title = meta.title
    setMetaTag('meta[name="description"]', 'content', meta.description)
    setMetaTag('link[rel="canonical"]', 'href', canonicalUrl)
    setMetaTag('meta[property="og:title"]', 'content', meta.title)
    setMetaTag('meta[property="og:description"]', 'content', meta.description)
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl)
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title)
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description)
  }, [location.pathname])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navigationItems = [
    { 
      name: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    { 
      name: t('nav.docs'), 
      href: '/docs',
      icon: DocumentTextIcon,
    },
    { 
      name: t('nav.components'), 
      href: '/components',
      icon: CubeIcon,
    },
    { 
      name: t('nav.playground'), 
      href: '/playground',
      icon: CodeBracketIcon,
    },
    { 
      name: t('nav.changelog'), 
      href: '/changelog',
      icon: ClockIcon,
    },
  ]

  const languages = [
    { code: 'pt' as const, name: 'PT', flag: '🇧🇷' },
    { code: 'en' as const, name: 'EN', flag: '🇺🇸' },
    { code: 'es' as const, name: 'ES', flag: '🇪🇸' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  const logo = (
    <RouterLink to="/" className="flex items-center gap-2 min-w-0" onClick={() => setMobileMenuOpen(false)}>
      <img src="/logo.png" alt="Valk UI" className="h-11 w-11 flex-shrink-0" />
      <span className="font-brand text-2xl font-bold text-foreground whitespace-nowrap">Valk UI</span>
    </RouterLink>
  )

  const rightContent = (
    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink-0">
      <div className="hidden xl:flex items-center">
        <button
          onClick={() => setCommandOpen(true)}
          className="relative w-64 h-9 rounded-md border border-border bg-background text-sm text-muted-foreground flex items-center hover:bg-muted transition-colors"
        >
          <div className="absolute left-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </div>
          <span className="pl-9 pr-2 flex-1 text-left truncate">{t('nav.search')}</span>
          <kbd className="hidden 2xl:flex mr-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
      <div className="hidden md:flex items-center">
        <button
          onClick={() => setCommandOpen(true)}
          className="relative w-10 h-9 rounded-md border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors xl:hidden"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="flex items-center justify-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors"
          aria-label="Select language"
        >
          <span className="text-base flex-shrink-0">{currentLanguage.flag}</span>
          <span className="text-sm font-medium text-foreground hidden sm:inline">{currentLanguage.name}</span>
        </button>
        {showLanguageMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLanguageMenu(false)}
            />
            <div className="absolute right-0 mt-1.5 w-36 bg-popover border border-border rounded-md shadow-md z-20 overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2.5 ${
                    language === lang.code 
                      ? 'bg-accent text-accent-foreground font-medium' 
                      : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <ThemeToggle
        theme={isDark ? 'dark' : 'light'}
        onToggle={toggleTheme}
        variant="ghost"
        size="md"
      />
    </div>
  )

  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden w-full">
      <Navigation
        items={navigationItems}
        logo={logo}
        rightContent={rightContent}
        currentPath={location.pathname}
        LinkComponent={RouterLink}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        mobileMenuFooter={
          <>
            <button
              onClick={() => {
                setCommandOpen(true)
                setMobileMenuOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl border border-border bg-background hover:bg-muted hover:text-foreground transition-all"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>{t('nav.search')}</span>
              <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-xl border border-border bg-background hover:bg-muted transition-colors"
                  aria-label="Select language"
                >
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="text-foreground">{currentLanguage.name}</span>
                </button>
                {showLanguageMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowLanguageMenu(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-2 w-full bg-popover border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setShowLanguageMenu(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3 ${
                            language === lang.code 
                              ? 'bg-accent text-accent-foreground font-medium' 
                              : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {language === lang.code && (
                            <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <ThemeToggle
                theme={isDark ? 'dark' : 'light'}
                onToggle={toggleTheme}
                variant="ghost"
                size="md"
                className="border border-border rounded-xl"
              />
            </div>
          </>
        }
      />

      <main className={cn(
        "flex-1 w-full overflow-x-hidden",
        isHome
          ? "block"
          : "mx-auto max-w-6xl px-4 sm:px-6 py-8 md:px-8 md:py-10 lg:px-10"
      )}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  return <LayoutContent>{children}</LayoutContent>
}
