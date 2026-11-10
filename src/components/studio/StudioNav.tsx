import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { whatsappLink } from '../../config/contact';

const LINKS = [
  { id: 'portfolio', num: '01', label: 'Trabalhos' },
  { id: 'about', num: '02', label: 'Sobre' },
  { id: 'contact', num: '03', label: 'Contato' },
];

export const StudioNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  // Fundo só depois de rolar um pouco
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca o link da seção que está no meio da tela
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ESC fecha o menu e a rolagem do fundo é travada enquanto ele está aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-darkBg/80 backdrop-blur-xl border-b border-white/10' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Principal" className="h-16 sm:h-20 px-5 sm:px-10 flex items-center justify-between">
        <a href="#top" onClick={() => setOpen(false)} className="relative z-10 flex items-center" aria-label="GVITOR Design — início">
          <img src={logoImg} alt="GVITOR DESIGN" className="h-7 sm:h-9 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`group mono-label flex items-baseline gap-2 transition-colors ${
                  active === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className={active === link.id ? 'text-electricCyan' : 'text-gray-600 group-hover:text-electricCyan'}>
                  {link.num}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink('Olá, gostaria de um orçamento')}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white text-black font-bold hover:bg-electricCyan transition-colors"
          >
            Orçamento <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-white"
          >
            {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>

    {/* Fora do <header>: o backdrop-blur dele prenderia o "fixed" ao tamanho do cabeçalho. */}
      {open && (
        <div id="menu-mobile" className="md:hidden fixed inset-0 z-40 bg-darkBg px-5 pt-24 pb-8 flex flex-col justify-between">
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 py-3 border-b border-white/10 font-title text-[clamp(1.6rem,7vw,3.2rem)] font-extrabold uppercase"
                >
                  <span className="mono-label text-electricCyan">{link.num}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mono-label text-gray-500">Direção de arte · Motion · Showbusiness</p>
        </div>
      )}
    </>
  );
};
