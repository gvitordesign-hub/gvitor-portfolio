import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock global do framer-motion para remover atrasos de transições nos testes
vi.mock('framer-motion', () => {
  const dummyComponent = ({ children, ...props }: any) => {
    // Filtra props específicas do Framer Motion para não poluir ou dar erro nas tags do React
    const {
      layout,
      layoutId,
      variants,
      initial,
      animate,
      exit,
      transition,
      ...cleanProps
    } = props;
    return React.createElement('div', cleanProps, children);
  };

  return {
    motion: {
      div: dummyComponent,
      button: dummyComponent,
      h1: dummyComponent,
      p: dummyComponent,
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  };
});
