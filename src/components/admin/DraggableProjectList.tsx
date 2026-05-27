import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { GripVertical, Trash2 } from 'lucide-react';

export const DraggableProjectList: React.FC = () => {
  const { projects, reorderProjects, deleteProject } = useProjects();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    // Configura o efeito visual do drag
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    reorderProjects(draggedIndex, targetIndex);
    
    // Resetar estados de arraste
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/5 flex flex-col gap-6 text-left">
      <div>
        <h3 className="font-title text-2xl font-bold text-white">Casos Ativos e Ordenação</h3>
        <p className="text-xs text-gray-500 mt-1">
          Arraste os itens pelas alças laterais para reorganizar a ordem visual do portfólio.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="py-12 text-center text-gray-500 text-sm border border-dashed border-white/5 rounded-2xl">
          Nenhum projeto cadastrado no momento.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project, index) => {
            const isDragging = draggedIndex === index;
            const isOver = dragOverIndex === index;

            return (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 cursor-move ${
                  isDragging
                    ? 'opacity-40 bg-white/[0.05] border-white/20'
                    : isOver
                    ? 'border-electricCyan bg-electricCyan/5 shadow-neonCyan translate-y-1'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-600 hover:text-gray-300 cursor-grab p-1">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-14 h-10 object-cover rounded-lg bg-black/40 border border-white/5"
                  />

                  <div>
                    <h4 className="font-bold text-sm text-gray-200 leading-tight">{project.title}</h4>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block mt-1">
                      {project.client} • {project.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Tem certeza que deseja excluir "${project.title}"?`)) {
                      deleteProject(project.id);
                    }
                  }}
                  className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500 hover:text-red-400 border border-red-500/10 hover:border-red-500/20 transition-all cursor-pointer"
                  title="Remover Projeto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
