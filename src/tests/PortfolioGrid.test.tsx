import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { ProjectProvider } from '../context/ProjectContext';

const renderGrid = () =>
  render(
    <ProjectProvider>
      <PortfolioGrid onProjectSelect={() => {}} />
    </ProjectProvider>,
  );

describe('Componente PortfolioGrid', () => {
  it('deve renderizar todos os projetos inicialmente e aplicar filtros corretamente', () => {
    renderGrid();

    expect(screen.getByText('Arraiá do Boteco Teaser 3D')).toBeInTheDocument();
    expect(screen.getByText('Pagode Day')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /lançamentos musicais/i }));

    expect(screen.getByText('Raneychas - Volume 6.0')).toBeInTheDocument();
    expect(screen.queryByText('Pagode Day')).not.toBeInTheDocument();
  });

  it('deve mostrar a categoria em português no painel aberto', () => {
    renderGrid();
    // Primeiro projeto (motion-visuals) começa aberto
    const painel = screen.getByRole('button', { name: 'Projeto: Arraiá do Boteco Teaser 3D' });
    expect(within(painel).getByText('Motion & Visuals')).toBeInTheDocument();
    expect(within(painel).queryByText(/motion visuals/i)).not.toBeInTheDocument();
  });

  it('deve abrir o primeiro projeto do filtro ativo e permitir trocar o painel aberto', () => {
    renderGrid();
    fireEvent.click(screen.getByRole('button', { name: /campanhas de eventos/i }));

    // Primeiro painel do filtro fica aberto
    const fest = screen.getByRole('button', { name: 'Projeto: Fest Verão Guanambi' });
    expect(fest).toHaveAttribute('aria-expanded', 'true');

    // Clicar em outro painel o abre (e não volta sozinho para o primeiro)
    const mari = screen.getByRole('button', { name: 'Projeto: Mari Select' });
    fireEvent.click(mari);
    expect(mari).toHaveAttribute('aria-expanded', 'true');
    expect(fest).toHaveAttribute('aria-expanded', 'false');
  });
});
