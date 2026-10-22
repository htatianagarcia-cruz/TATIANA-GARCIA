import React, { useState, useMemo } from 'react';
import { SENA_RIGHTS_DUTIES } from '../data/senaData';
import { RightOrDuty } from '../types/induction';
import { Search, Sparkles } from 'lucide-react';

export const RightsDutiesExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredItems = useMemo(() => {
    return SENA_RIGHTS_DUTIES.filter((item: RightOrDuty) => {
      const matchType = selectedType === 'todos' || item.type === selectedType;
      const matchCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const query = searchTerm.toLowerCase();
      const matchSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.example.toLowerCase().includes(query) ||
        item.legalBasis.toLowerCase().includes(query);

      return matchType && matchCategory && matchSearch;
    });
  }, [searchTerm, selectedType, selectedCategory]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'derecho':
        return 'Derecho del Aprendiz';
      case 'deber':
        return 'Deber Institucional';
      case 'prohibicion':
        return 'Prohibición Expresa';
      case 'medida':
        return 'Medida / Sanción';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wide uppercase">
            Catálogo Normativo Interactivo
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Explorador de Derechos, Deberes y Prohibiciones
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Consulta los 24 derechos fundamentales del aprendiz, tus obligaciones de formación, prohibiciones taxativas y el régimen formativo del Acuerdo 009 de 2024 con ejemplos aplicados a la vida real en el SENA.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por concepto: 'acoso', 'evaluación', 'inasistencia', 'plagio', 'carné', 'etapa productiva'..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            {/* Type selector (Interactive button filters) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setSelectedType('todos')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  selectedType === 'todos'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todos ({SENA_RIGHTS_DUTIES.length})
              </button>
              <button
                onClick={() => setSelectedType('derecho')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  selectedType === 'derecho'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Derechos (24)
              </button>
              <button
                onClick={() => setSelectedType('deber')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  selectedType === 'deber'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Deberes
              </button>
              <button
                onClick={() => setSelectedType('prohibicion')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  selectedType === 'prohibicion'
                    ? 'bg-white dark:bg-slate-700 text-rose-800 dark:text-rose-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Prohibiciones
              </button>
              <button
                onClick={() => setSelectedType('medida')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  selectedType === 'medida'
                    ? 'bg-white dark:bg-slate-700 text-amber-800 dark:text-amber-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Medidas y Sanciones
              </button>
            </div>

            {/* Category dropdown / selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">Ámbito:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              >
                <option value="todos">Todos los ámbitos</option>
                <option value="Academico">Académico</option>
                <option value="Disciplinario">Disciplinario</option>
                <option value="Bienestar">Bienestar al Aprendiz</option>
                <option value="Convivencia">Convivencia y Equidad</option>
                <option value="Tecnologico">Tecnológico y Ambientes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Rights & Duties Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-300"
            >
              <div className="space-y-3">
                {/* Zero-pill metadata line */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{getTypeLabel(item.type)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.category}</span>
                  {item.number && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-emerald-700 dark:text-emerald-400">Art. #{item.number}</span>
                    </>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Practical Example Box */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-750 text-xs space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    En la vida real del SENA:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "{item.example}"
                  </p>
                </div>
              </div>

              {/* Legal Reference footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-mono flex items-center justify-between">
                <span className="truncate">{item.legalBasis}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3 transition-colors duration-300">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No se encontraron elementos con el criterio de búsqueda "{searchTerm}"
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Prueba buscando con palabras como "acoso", "inasistencia", "planes", "plagio" o reinicia los filtros.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('todos');
              setSelectedCategory('todos');
            }}
            className="px-4 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
};
