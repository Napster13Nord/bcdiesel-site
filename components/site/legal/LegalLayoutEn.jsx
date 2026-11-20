'use client'
// GERADO por scripts/port-app.mjs a partir de _gerador/tpl/LegalLayoutEn.jsx — não editar à mão.
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useSite } from '../SiteContext'

// As páginas legais em inglês (PLANO-EUA.md §A5). O inglês só existe na versão
// B, e o menu e o rodapé de A são portugueses: por isso esta moldura é própria,
// com a marca no topo, o regresso ao início e um rodapé curto.
export default function LegalLayoutEn({ title, updated, children }) {
  const { BRAND, LogoIcon, basePath } = useSite()
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-deep text-white pt-16 pb-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <Link href={basePath || '/'} className="inline-flex items-center gap-2 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <LogoIcon className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-display font-bold text-lg">{BRAND.name}</span>
          </Link>
          <h1 className="mt-12 font-display text-4xl sm:text-5xl font-bold tracking-tighter">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            Last updated {updated}
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 sm:px-10 py-16 space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mb-2 [&_a]:text-primary-dark [&_a]:underline [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        {children}
      </article>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-16">
        <Link
          href={basePath || '/'}
          className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-full font-semibold"
        >
          Back to home <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <footer className="bg-deep text-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href={`${basePath}/privacidade`} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 hover:text-primary-light">
              Privacy
            </Link>
            <Link href={`${basePath}/termos`} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 hover:text-primary-light">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
