import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ProjectViewer } from '../components/studio/ProjectViewer';
import { projectsData } from '../data/projects';

const multi = projectsData.find((p) => p.media.length >= 4)!;
const single = projectsData.find((p) => p.media.length === 1)!;
const after = (p: (typeof projectsData)[number]) => projectsData[(projectsData.indexOf(p) + 1) % projectsData.length];

const setup = (overrides: Partial<React.ComponentProps<typeof ProjectViewer>> = {}) => {
  const project = overrides.project ?? multi;
  const props = {
    project,
    nextProject: after(project),
    index: projectsData.indexOf(project) + 1,
    total: projectsData.length,
    originRect: null,
    onClose: vi.fn(),
    onNext: vi.fn(),
    onPrev: vi.fn(),
    ...overrides,
  };
  render(<ProjectViewer {...props} />);
  return props;
};

const counter = () => screen.getByTestId('piece-counter');
const pad = (n: number) => String(n).padStart(2, '0');

describe('Visualizador imersivo do projeto', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('é um diálogo modal rotulado pelo título do projeto', () => {
    setup();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { level: 2, name: multi.title })).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-labelledby', `viewer-title-${multi.id}`);
  });

  it('mostra o briefing e a solução sem precisar rolar (painel de informações)', () => {
    setup();
    expect(screen.getByText('O DESAFIO (BRIEFING)')).toBeInTheDocument();
    expect(screen.getByText('A SOLUÇÃO CRIATIVA')).toBeInTheDocument();
    expect(screen.getByText(multi.challenge)).toBeInTheDocument();
    expect(screen.getByText(multi.solution)).toBeInTheDocument();
  });

  it('mostra todas as peças do projeto em miniaturas, com a primeira ativa', () => {
    setup();
    const thumbs = screen.getAllByRole('button', { name: /^Ver peça/ });
    expect(thumbs).toHaveLength(multi.media.length);
    expect(thumbs[0]).toHaveAttribute('aria-current', 'true');
    expect(thumbs[1]).not.toHaveAttribute('aria-current');
    expect(counter()).toHaveTextContent(new RegExp(`01\\s*/\\s*${pad(multi.media.length)}`));
  });

  it('clicar em uma miniatura troca a peça principal', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: new RegExp(`^Ver peça 3 de ${multi.media.length}`) }));

    expect(counter()).toHaveTextContent(new RegExp(`03\\s*/\\s*${pad(multi.media.length)}`));
    expect(screen.getAllByRole('button', { name: /^Ver peça/ })[2]).toHaveAttribute('aria-current', 'true');
    if (multi.media[2].caption) expect(screen.getByText(multi.media[2].caption)).toBeInTheDocument();
  });

  it('as setas da peça avançam e voltam, e a primeira fica sem "anterior"', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Peça anterior' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Próxima peça' }));
    expect(counter()).toHaveTextContent(/02/);
    expect(screen.getByRole('button', { name: 'Peça anterior' })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: 'Peça anterior' }));
    expect(counter()).toHaveTextContent(/01/);
  });

  it('as setas do teclado trocam de peça e, nas pontas, seguem para o projeto vizinho', () => {
    const { onNext, onPrev } = setup();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(counter()).toHaveTextContent(/02/);
    expect(onNext).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(counter()).toHaveTextContent(/01/);
    expect(onPrev).not.toHaveBeenCalled();

    // Primeira peça + seta esquerda = projeto anterior
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onPrev).toHaveBeenCalledTimes(1);

    // Última peça + seta direita = próximo projeto
    fireEvent.click(screen.getAllByRole('button', { name: /^Ver peça/ })[multi.media.length - 1]);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('projeto com uma única peça não mostra miniaturas e as setas trocam de projeto', () => {
    const { onNext, onPrev } = setup({ project: single });
    expect(screen.queryByRole('button', { name: /^Ver peça/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Próxima peça' })).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('ao trocar de projeto volta para a primeira peça', () => {
    const other = projectsData.find((p) => p !== multi && p.media.length >= 3)!;
    const props = {
      total: projectsData.length,
      originRect: null,
      onClose: vi.fn(),
      onNext: vi.fn(),
      onPrev: vi.fn(),
    };
    const { rerender } = render(<ProjectViewer {...props} project={multi} nextProject={after(multi)} index={1} />);

    fireEvent.click(screen.getByRole('button', { name: 'Próxima peça' }));
    expect(counter()).toHaveTextContent(/02/);

    rerender(<ProjectViewer {...props} project={other} nextProject={after(other)} index={2} />);
    expect(counter()).toHaveTextContent(/01/);
  });

  it('trava a rolagem da página enquanto está aberto', () => {
    setup();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('fecha pelo botão', () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar projeto' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('fecha com ESC', () => {
    const { onClose } = setup();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('troca de projeto pelos botões da barra superior', () => {
    const { onNext, onPrev } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Próximo projeto' }));
    fireEvent.click(screen.getByRole('button', { name: 'Projeto anterior' }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('mostra o próximo projeto no painel e leva até ele ao clicar', () => {
    const { onNext } = setup();
    fireEvent.click(screen.getByRole('button', { name: `Próximo projeto: ${after(multi).title}` }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('não oferece "próximo projeto" no painel quando só existe um', () => {
    setup({ nextProject: multi, total: 1 });
    expect(screen.queryByRole('button', { name: /^Próximo projeto: / })).not.toBeInTheDocument();
  });

  it('o convite de contato leva ao WhatsApp citando o projeto', () => {
    setup();
    const cta = screen.getByRole('link', { name: /quero um projeto assim/i });
    expect(cta.getAttribute('href')).toContain('https://wa.me/');
    expect(decodeURIComponent(cta.getAttribute('href') ?? '')).toContain(multi.title);
  });
});
