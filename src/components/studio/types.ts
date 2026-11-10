/** Retângulo (em px, relativo à janela) de onde a animação de abertura do projeto parte. */
export interface OriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Abre um projeto; `origin` (opcional) é o cartão/ponto clicado, usado na transição. */
export type SelectProject = (project: import('../../data/projects').Project, origin?: OriginRect) => void;
