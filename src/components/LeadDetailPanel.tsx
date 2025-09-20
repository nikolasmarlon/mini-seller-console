import type { Lead } from '../types';

// Definindo as propriedades que o componente receberá
interface LeadDetailPanelProps {
  lead: Lead | null; // O lead selecionado (ou null se nenhum estiver)
  onClose: () => void; // Função para fechar o painel
}

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  // Se nenhum lead estiver selecionado, não renderiza nada
  if (!lead) {
    return null;
  }

  return (
    // Fundo semi-transparente que cobre a tela inteira
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40" 
      onClick={onClose}
    >
      {/* O painel em si */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 p-6 transform transition-transform duration-300 ease-in-out"
        // Impede que o clique dentro do painel feche o painel
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Cabeçalho do Painel */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold">{lead.name}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times; {/* Isso é um 'X' para fechar */}
          </button>
        </div>

        {/* Corpo com os detalhes */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="text-lg">{lead.company}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg">{lead.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Source</p>
            <p className="text-lg">{lead.source}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-lg">{lead.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-semibold">{lead.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}