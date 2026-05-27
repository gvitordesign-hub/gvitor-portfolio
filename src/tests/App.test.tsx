import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Integração Completa do App', () => {
  it('deve permitir abrir e navegar no modal ao clicar nos itens do portfolio', () => {
    render(<App />);
    
    // O modal deve estar fechado inicialmente
    expect(screen.queryByText('O DESAFIO (BRIEFING)')).not.toBeInTheDocument();
    
    // Clicar no projeto para abrir o modal
    const projectCard = screen.getByText('Cyberpunk E-sports Campaign');
    fireEvent.click(projectCard);
    
    // O modal deve abrir com as informações corretas
    expect(screen.getByText('O DESAFIO (BRIEFING)')).toBeInTheDocument();
    expect(screen.getAllByText('Cyberpunk E-sports Campaign').length).toBe(2);
  });
});
