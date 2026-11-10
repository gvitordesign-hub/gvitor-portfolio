import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { ProjectProvider } from '../context/ProjectContext';

const renderApp = () =>
  render(
    <ProjectProvider>
      <App />
    </ProjectProvider>,
  );

describe('Integração Completa do App', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('deve mostrar o título principal e as seções do site', () => {
    renderApp();

    expect(screen.getByRole('heading', { level: 1, name: /direção de arte e motion/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /trabalhos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /grandes palcos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /vamos criar/i })).toBeInTheDocument();
  });

  it('deve abrir o modal ao clicar num projeto da mesa e atualizar a URL', () => {
    renderApp();

    expect(screen.queryByText('O DESAFIO (BRIEFING)')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Abrir projeto: Arraiá do Boteco Teaser 3D' }));

    expect(screen.getByText('O DESAFIO (BRIEFING)')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(window.location.hash).toBe('#projeto/arraia-do-boteco');
  });

  it('deve abrir direto o projeto indicado no link (#projeto/<id>) e fechar com ESC', () => {
    window.history.replaceState(null, '', '/#projeto/pagode-day');
    renderApp();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { level: 2, name: 'Pagode Day' })).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('deve navegar para o próximo projeto com a seta direita', () => {
    window.history.replaceState(null, '', '/#projeto/arraia-do-boteco');
    renderApp();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('heading', { level: 2, name: 'Raneychas - Volume 6.0' })).toBeInTheDocument();
    expect(window.location.hash).toBe('#projeto/raneychas-6.0');
  });

  it('não deve mostrar nenhum botão de admin no site público', () => {
    renderApp();
    expect(screen.queryByText(/área admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Acesso Restrito')).not.toBeInTheDocument();
  });

  it('deve abrir a área admin em /acessoadmin (com ou sem barra final) e marcá-la como noindex', async () => {
    window.history.replaceState(null, '', '/acessoadmin/');
    renderApp();

    expect(await screen.findByText('Acesso Restrito')).toBeInTheDocument();
    // Sem .env do Firebase preenchido, o login fica desativado e avisa por quê (sem senha embutida no código)
    expect(screen.getByRole('alert')).toHaveTextContent(/Firebase não está configurado/);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
    expect(screen.queryByRole('heading', { level: 2, name: /trabalhos/i })).not.toBeInTheDocument();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
  });

  it('deve voltar ao portfólio pela URL raiz a partir do admin', async () => {
    window.history.replaceState(null, '', '/acessoadmin');
    renderApp();

    fireEvent.click(await screen.findByRole('button', { name: /voltar ao portfólio/i }));

    expect(window.location.pathname).toBe('/');
    expect(screen.getByRole('heading', { level: 2, name: /trabalhos/i })).toBeInTheDocument();
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });
});
