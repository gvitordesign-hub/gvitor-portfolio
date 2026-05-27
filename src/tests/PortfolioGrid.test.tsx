import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { ProjectProvider } from '../context/ProjectContext';

describe('Componente PortfolioGrid', () => {
  it('deve renderizar todos os projetos inicialmente e aplicar filtros corretamente', () => {
    render(
      <ProjectProvider>
        <PortfolioGrid onProjectSelect={() => {}} />
      </ProjectProvider>
    );
    
    // Todos os projetos devem estar na tela
    expect(screen.getByText('Hyper Nexus Festival 2026')).toBeInTheDocument();
    expect(screen.getByText('Vortex Spotify Canvas & Campaign')).toBeInTheDocument();
    
    // Clicar no filtro de Campanhas de Eventos
    const filterBtn = screen.getByRole('button', { name: /campanhas de eventos/i });
    fireEvent.click(filterBtn);
    
    // Deve exibir o de Campanhas de Eventos mas esconder o de Lançamentos Musicais
    expect(screen.getByText('Hyper Nexus Festival 2026')).toBeInTheDocument();
    expect(screen.queryByText('Vortex Spotify Canvas & Campaign')).not.toBeInTheDocument();
  });
});
