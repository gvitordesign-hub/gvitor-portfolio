import type { Project } from './projects';

/** Rótulos em português para os identificadores técnicos de categoria. */
export const CATEGORY_LABELS: Record<Project['category'], string> = {
  'event-campaigns': 'Campanhas de Eventos',
  'music-releases': 'Lançamentos Musicais',
  'motion-visuals': 'Motion & Visuals',
};

export const categoryLabel = (category: string): string =>
  CATEGORY_LABELS[category as Project['category']] ?? category.replace(/-/g, ' ');
