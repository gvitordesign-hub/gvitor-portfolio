import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Firebase simulado: sem rede, com controle total sobre login e Firestore.
const m = vi.hoisted(() => ({
  authCb: null as null | ((u: { email: string } | null) => void),
  signIn: vi.fn(),
  signOut: vi.fn(),
  addDoc: vi.fn(),
}));

vi.mock('../config/firebase', () => ({
  db: {},
  auth: {},
  storage: {},
  isFirebaseConfigured: () => true,
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (_auth: unknown, cb: (u: { email: string } | null) => void) => {
    m.authCb = cb;
    queueMicrotask(() => cb(null)); // sessão restaurada: ninguém logado
    return () => {};
  },
  signInWithEmailAndPassword: m.signIn,
  signOut: m.signOut,
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
  addDoc: m.addDoc,
  // Coleção vazia, como num projeto recém-criado
  onSnapshot: (_q: unknown, onNext: (s: { forEach: () => void }) => void) => {
    queueMicrotask(() => onNext({ forEach: () => {} }));
    return () => {};
  },
}));

import { AdminPanel } from '../components/admin/AdminPanel';
import { ProjectProvider } from '../context/ProjectContext';

const renderAdmin = () =>
  render(
    <ProjectProvider>
      <AdminPanel onBackToPortfolio={() => {}} />
    </ProjectProvider>,
  );

const fillAndSubmit = async (email: string, password: string) => {
  fireEvent.change(await screen.findByLabelText('E-mail'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Senha'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
};

describe('Login do admin com Firebase Auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    m.addDoc.mockResolvedValue({});
  });

  it('não aceita a senha antiga fixa e mostra erro para credenciais inválidas', async () => {
    m.signIn.mockRejectedValue({ code: 'auth/invalid-credential' });
    renderAdmin();

    await fillAndSubmit('dono@exemplo.com', 'admin123');

    expect(await screen.findByRole('alert')).toHaveTextContent('E-mail ou senha incorretos.');
    expect(screen.queryByText(/Conectado como/)).not.toBeInTheDocument();
    expect(m.signIn).toHaveBeenCalledWith(expect.anything(), 'dono@exemplo.com', 'admin123');
    // Visitante/não autenticado nunca escreve no Firestore
    expect(m.addDoc).not.toHaveBeenCalled();
  });

  it('entra com credenciais válidas, mostra o e-mail e semeia o Firestore vazio uma única vez', async () => {
    m.signIn.mockImplementation(async () => {
      act(() => m.authCb?.({ email: 'dono@exemplo.com' }));
    });
    renderAdmin();

    await fillAndSubmit('dono@exemplo.com', 'senha-forte');

    expect(await screen.findByText('Conectado como dono@exemplo.com')).toBeInTheDocument();
    await waitFor(() => expect(m.addDoc).toHaveBeenCalledTimes(14));
  });

  it('sair chama o signOut do Firebase', async () => {
    m.signIn.mockImplementation(async () => {
      act(() => m.authCb?.({ email: 'dono@exemplo.com' }));
    });
    m.signOut.mockResolvedValue(undefined);
    renderAdmin();
    await fillAndSubmit('dono@exemplo.com', 'senha-forte');

    fireEvent.click(await screen.findByRole('button', { name: /sair/i }));
    expect(m.signOut).toHaveBeenCalled();
  });
});
