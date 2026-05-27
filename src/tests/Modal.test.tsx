import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from '../components/Modal';
import type { Project } from '../data/projects';

// Mock do subcomponente MediaViewer para isolar os testes do modal base
vi.mock('./MediaViewer', () => ({
  MediaViewer: () => <div data-testid="media-viewer-mock">Media Viewer Mock</div>
}));

const mockProject: Project = {
  id: 'cyberpunk-ad',
  title: 'Cyberpunk E-sports Campaign',
  category: 'event-campaigns',
  client: 'Apex Arena',
  year: '2026',
  challenge: 'Briefing desafio',
  solution: 'Solução legal',
  heroImage: 'image.jpg',
  media: [{ type: 'image', url: 'image.jpg', caption: 'Art work' }]
};

describe('Componente Modal Base', () => {
  it('deve disparar o fechamento ao clicar no botão de fechar', () => {
    const handleClose = vi.fn();
    render(<Modal project={mockProject} onClose={handleClose} onNext={() => {}} onPrev={() => {}} />);
    
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
    
    const closeBtn = screen.getByLabelText('Fechar modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
