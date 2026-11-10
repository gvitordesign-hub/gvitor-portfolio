import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectProvider } from '../context/ProjectContext';
import { StudioWork } from '../components/studio/StudioWork';
import { projectsData } from '../data/projects';
import { CATEGORY_LABELS } from '../data/categories';

const setup = () => {
  const onSelect = vi.fn();
  render(
    <ProjectProvider>
      <StudioWork onProjectSelect={onSelect} />
    </ProjectProvider>,
  );
  return onSelect;
};

const projectButtons = () => screen.getAllByRole('button', { name: /^Abrir projeto:/ });

describe('Seção de trabalhos (carrossel e índice)', () => {
  it('cria uma fileira por categoria, com a quantidade de projetos de cada uma', () => {
    setup();
    for (const [id, label] of Object.entries(CATEGORY_LABELS)) {
      const count = projectsData.filter((p) => p.category === id).length;
      if (count === 0) continue;
      const row = screen.getByRole('region', { name: new RegExp(label) });
      expect(within(row).getAllByRole('button', { name: /^Abrir projeto:/ })).toHaveLength(count);
    }
  });

  it('mostra cada projeto uma única vez nas fileiras', () => {
    setup();
    expect(projectButtons()).toHaveLength(projectsData.length);
  });

  it('abre o projeto ao clicar no cartão, informando de onde ele partiu', () => {
    const onSelect = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir projeto: Pagode Day' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    const [project, origin] = onSelect.mock.calls[0];
    expect(project.id).toBe('pagode-day');
    expect(origin).toEqual(expect.objectContaining({ top: expect.any(Number), left: expect.any(Number), width: expect.any(Number) }));
  });

  it('marca cada cartão com o id do projeto (usado para a animação de volta ao fechar)', () => {
    setup();
    const card = screen.getByRole('button', { name: 'Abrir projeto: Pagode Day' });
    expect(card).toHaveAttribute('data-project-card', 'pagode-day');
  });

  it('alterna para o Índice e abre o projeto pela lista', () => {
    const onSelect = setup();

    fireEvent.click(screen.getByRole('button', { name: /Índice/ }));

    expect(screen.queryByRole('region', { name: /Lançamentos Musicais/ })).not.toBeInTheDocument();
    expect(screen.getByRole('list', { name: /lista de projetos/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Abrir projeto: Raneychas - Volume 6.0' }), { clientX: 400, clientY: 300 });
    expect(onSelect.mock.calls[0][0].id).toBe('raneychas-6.0');
    expect(onSelect.mock.calls[0][1]).toEqual(expect.objectContaining({ width: 160, height: 200 }));
  });

  it('o botão do modo atual fica marcado como pressionado', () => {
    setup();
    expect(screen.getByRole('button', { name: /Carrossel/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Índice/ }));
    expect(screen.getByRole('button', { name: /Índice/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /Carrossel/ })).toHaveAttribute('aria-pressed', 'false');
  });
});
