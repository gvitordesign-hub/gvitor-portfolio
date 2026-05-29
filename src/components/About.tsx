import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Video, Zap, MapPin, Award } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

export const About: React.FC = () => {
  const cards = [
    {
      icon: <Layers className="w-8 h-8 text-electricCyan" />,
      title: "Key Visual & Campanhas de Eventos",
      desc: "Desenvolvimento de identidades visuais de marca estáticas de altíssimo impacto, cronogramas estratégicos de anúncios de turnês, agendas completas de shows e criativos focados em impulsionar vendas rápidas de ingressos."
    },
    {
      icon: <Video className="w-8 h-8 text-magneticViolet" />,
      title: "Rollout & Lançamentos Musicais",
      desc: "Direção artística completa de capas de álbuns e singles de alto padrão, identidades visuais estáticas exclusivas e motion designs sincronizados com o BPM para campanhas de turnês e otimização para plataformas de streaming."
    },
    {
      icon: <Zap className="w-8 h-8 text-neonGreen" />,
      title: "Motion Graphics & Stage Visuals",
      desc: "Teasers cinematográficos de altíssima retenção otimizados para Reels/TikTok, aberturas monumentais e line-ups para festivais de grande porte e loops e backdrops hipnóticos para palcos físicos em telas de LED."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-darkCard/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Lado Esquerdo: Foto de Perfil Premium */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Efeitos de Glow Neon por trás da foto */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-electricCyan to-magneticViolet rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0B0B0B] aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] shadow-neonGlow">
              <img 
                src={profileImg} 
                alt="Gonçalo Vitor" 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Badge flutuante */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/5 flex items-center justify-between z-10">
                <div>
                  <h4 className="text-white font-extrabold text-sm tracking-wide">Gonçalo Vitor</h4>
                  <p className="text-[11px] text-electricCyan font-semibold">Diretor de Arte & Designer</p>
                </div>
                <div className="px-3 py-1 bg-electricCyan/15 border border-electricCyan/20 rounded-full text-[9px] text-electricCyan font-bold uppercase tracking-wider">
                  10+ Anos Exp
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Biografia/Apresentação */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">SOBRE O CRIATIVO</span>
            <h2 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              O Designer por trás dos <span className="bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent">Grandes Palcos</span>.
            </h2>
            
            <p className="text-gray-200 text-lg leading-relaxed font-normal">
              Me chamo <strong>Gonçalo Vitor</strong>, tenho 31 anos, sou natural de <strong>Livramento de Nossa Senhora, Bahia</strong>, e atuo como designer gráfico no mercado de artistas e eventos há mais de uma década.
            </p>
            
            <p className="text-gray-400 text-base leading-relaxed">
              O showbusiness não aceita o genérico. Numa indústria movida a impacto, energia e desejo, cada pixel precisa vibrar no ritmo do som. Crio identidades visuais imponentes, campanhas de lançamentos de singles e peças conceituais exclusivas que fazem sua marca lotar arenas e dominar playlists.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-electricCyan shrink-0" />
                <span>Livramento de Nossa Senhora - BA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Award className="w-5 h-5 text-magneticViolet shrink-0" />
                <span>10+ Anos de Estrada no Nicho</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Grade de Cartões de Serviços */}
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

