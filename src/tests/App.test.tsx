import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { ProjectProvider } from '../context/ProjectContext';

describe('Integração Completa do App', () => {
  it('deve permitir abrir e navegar no modal ao clicar nos itens do portfolio', () => {
    render(
      <ProjectProvider>
        <App />
      </ProjectProvider>
    );
    
    // O modal deve estar fechado inicialmente
    expect(screen.queryByText('O DESAFIO (BRIEFING)')).not.toBeInTheDocument();
    
    // Clicar no projeto para abrir o modal
    const projectCard = screen.getByText('Hyper Nexus Festival 2026');
    fireEvent.click(projectCard);
    
    // O modal deve abrir com as informações corretas
    expect(screen.getByText('O DESAFIO (BRIEFING)')).toBeInTheDocument();
    expect(screen.getAllByText('Hyper Nexus Festival 2026').length).toBe(2);
  });
});
