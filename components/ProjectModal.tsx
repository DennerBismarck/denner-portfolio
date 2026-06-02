'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import { useLang } from '@/lib/i18n'
import type { Project } from '@/lib/data/projects'
import { Pill } from '@/components/ui/Pill'

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { t, lang } = useLang()

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (project) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label={project.name}
        >
          <motion.div
            className="relative my-auto w-full max-w-2xl rounded-2xl border border-borderc bg-surface p-6 sm:p-8"
            initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label={t('projects.close')} className="absolute right-4 top-4 rounded-full p-1.5 text-muted-2 hover:bg-surface-2 hover:text-text"><X size={20} /></button>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-soft">{project.category[lang]}</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold text-text">{project.name}</h3>
            <p className="mt-1 text-muted">{project.tagline[lang]}</p>

            <Block title={t('projects.context')}>{project.context[lang]}</Block>
            <Block title={t('projects.role')}>{project.role[lang]}</Block>
            <Block title={t('projects.architecture')}>{project.architecture[lang]}</Block>

            <h4 className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-muted-2">{t('projects.highlights')}</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {project.highlights[lang].map((h) => <li key={h}>{h}</li>)}
            </ul>

            <h4 className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-muted-2">{t('projects.stack')}</h4>
            <div className="mt-2 flex flex-wrap gap-2">{project.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>

            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-bright">
                <GithubIcon size={16} /> {t('projects.viewGithub')}
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h4 className="font-display text-sm font-bold uppercase tracking-wide text-muted-2">{title}</h4>
      <p className="mt-2 leading-relaxed text-muted">{children}</p>
    </div>
  )
}
