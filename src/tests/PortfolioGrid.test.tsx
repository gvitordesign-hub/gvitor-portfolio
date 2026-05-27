import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PortfolioGrid } from '../components/PortfolioGrid';

describe('Componente PortfolioGrid', () => {
  it('deve renderizar todos os projetos inicialmente e aplicar filtros corretamente', () => {
    render(<PortfolioGrid onProjectSelect={() => {}} />);
    
    // Todos os projetos devem estar na tela
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
    expect(screen.getByText('Neon Waves Music Video Motion')).toBeInTheDocument();
    
    // Clicar no filtro de Social Media
    const filterBtn = screen.getByRole('button', { name: /social media/i });
    fireEvent.click(filterBtn);
    
    // Deve exibir o de Social Media mas esconder o de Motion Design
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
    expect(screen.queryByText('Neon Waves Music Video Motion')).not.toBeInTheDocument();
  });
});
