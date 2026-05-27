import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Video, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const cards = [
    {
      icon: <Layers className="w-8 h-8 text-electricCyan" />,
      title: "Festivais & Arenas",
      desc: "Line-ups magnéticos de alto contraste, campanhas digitais para esgotar ingressos e pacotes de backdrops para palcos LED."
    },
    {
      icon: <Video className="w-8 h-8 text-magneticViolet" />,
      title: "Lançamentos Musicais",
      desc: "Spotify Canvas loops hipnóticos, teasers promocionais de singles e trailers cinematográficos de álbuns projetados para o topo."
    },
    {
      icon: <Zap className="w-8 h-8 text-neonGreen" />,
      title: "Motion & Direção 3D",
      desc: "Renders 3D autorais, efeitos estroboscópicos cirúrgicos e direção criativa premium para destacar artistas na velocidade do som."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-darkCard/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center mb-16">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">DIREÇÃO CRIATIVA DE IMPACTO</span>
            <h2 className="font-title text-4xl md:text-6xl font-bold mt-2 leading-tight">
              Traduzindo Som em Experiência <span className="bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent">Visual</span>.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-gray-400 text-lg leading-relaxed">
              O showbusiness não aceita o genérico. Numa indústria movida a impacto e retenção, cada pixel precisa vibrar na frequência da música. Unindo direção de arte premium, modelagem 3D, motion design de alto impacto e sincronia audiovisual cirúrgica, crio a identidade que destaca artistas no topo dos streamings e esgota ingressos de turnês inteiras antes mesmo da abertura dos portões.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors rounded-bl-full pointer-events-none" />
              <div className="mb-6">{card.icon}</div>
              <h3 className="font-title text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
