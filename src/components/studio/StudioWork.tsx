import React, { useState } from 'react';
import { GalleryHorizontal, List } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import type { Project } from '../../data/projects';
import { CATEGORY_LABELS } from '../../data/categories';
import { ProjectRow } from './ProjectRow';
import { ProjectIndex } from './ProjectIndex';
import type { SelectProject } from './types';

type View = 'carousel' | 'index';

interface StudioWorkProps {
  onProjectSelect: SelectProject;
}

const pad = (value: number) => String(value).padStart(2, '0');

const VIEWS = [
  { id: 'carousel', label: 'Carrossel', Icon: GalleryHorizontal },
  { id: 'index', label: 'Índice', Icon: List },
] as const;

export const StudioWork: React.FC<StudioWorkProps> = ({ onProjectSelect }) => {
  const { projects } = useProjects();
  const [view, setView] = useState<View>('carousel');

  // Uma fileira por categoria (só as que têm projetos), como um catálogo.
  const rows = (Object.keys(CATEGORY_LABELS) as Project['category'][])
    .map((id) => ({ id, title: CATEGORY_LABELS[id], projects: projects.filter((p) => p.category === id) }))
    .filter((row) => row.projects.length > 0);

  return (
    <section id="portfolio" className="relative pt-20 sm:pt-32 pb-12 sm:pb-24">
      <header className="px-5 sm:px-10 mb-6 sm:mb-10 flex flex-col gap-8 sm:gap-10">
        <div>
          <p className="mono-label text-electricCyan mb-4">(01) Trabalhos selecionados</p>
          <h2 className="font-title font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-[clamp(2rem,8.6vw,10rem)]">
            Trabalhos<span className="sr-only"> ({pad(projects.length)} projetos)</span>
            <sup aria-hidden="true" className="ml-2 align-top font-mono text-[0.16em] tracking-widest text-electricCyan">
              {pad(projects.length)}
            </sup>
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-sm text-gray-400">
            {view === 'carousel'
              ? 'Deslize cada fileira e clique em um cartão para entrar no projeto.'
              : 'Passe o mouse sobre um título para ver a capa e clique para entrar no projeto.'}
          </p>

          <div role="group" aria-label="Modo de visualização" className="inline-flex rounded-full border border-white/15 p-1">
            {VIEWS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                aria-pressed={view === id}
                className={`mono-label inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 transition-colors ${
                  view === id ? 'bg-white font-bold text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="px-5 sm:px-10 py-24 text-center text-gray-500">Nenhum projeto cadastrado ainda.</p>
      ) : view === 'carousel' ? (
        <div className="space-y-2 sm:space-y-6">
          {rows.map((row) => (
            <ProjectRow key={row.id} title={row.title} projects={row.projects} onSelect={onProjectSelect} />
          ))}
        </div>
      ) : (
        <ProjectIndex projects={projects} onSelect={onProjectSelect} />
      )}
    </section>
  );
};
