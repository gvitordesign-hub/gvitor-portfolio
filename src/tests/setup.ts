import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock global do framer-motion para remover atrasos de transições nos testes.
// Qualquer tag (motion.div, motion.span, motion.button...) vira o elemento HTML comum.
vi.mock('framer-motion', () => {
  const MOTION_ONLY_PROPS = new Set([
    'layout',
    'layoutId',
    'variants',
    'initial',
    'animate',
    'exit',
    'transition',
    'whileHover',
    'whileTap',
    'whileInView',
    'viewport',
  ]);

  const createMock = (tag: string) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(function MotionMock({ children, ...props }, ref) {
      const cleanProps = Object.fromEntries(Object.entries(props).filter(([key]) => !MOTION_ONLY_PROPS.has(key)));
      return React.createElement(tag, { ...cleanProps, ref }, children as React.ReactNode);
    });

  const cache: Record<string, ReturnType<typeof createMock>> = {};
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => (cache[tag] ??= createMock(tag)),
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});
