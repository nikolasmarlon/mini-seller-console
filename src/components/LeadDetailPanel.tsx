import { useState, useEffect } from 'react';
import type { Lead, LeadStatus } from '../types';

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
  onConvert: (lead: Lead) => void;
}

export function LeadDetailPanel({ lead, onClose, onSave, onConvert }: LeadDetailPanelProps) {
  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({ email: '', status: 'New' as LeadStatus });
  // Estado para a mensagem de erro
  const [error, setError] = useState('');

  // Sincroniza o estado do formulário quando um novo lead é selecionado
  useEffect(() => {
    if (lead) {
      setFormData({ email: lead.email, status: lead.status });
      setIsEditing(false); // Reseta para o modo de visualização
      setError(''); // Limpa erros
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = () => {
    // 1. Validação de Email
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // 2. Se for válido, chama a função onSave do pai
    onSave({ ...lead, ...formData });
    setError('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reseta o formulário para os dados originais e sai do modo de edição
    if (lead) {
      setFormData({ email: lead.email, status: lead.status });
    }
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold">{lead.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="text-lg">{lead.company}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-lg border border-gray-300 rounded-md w-full p-2"
                />
              ) : (
                <p className="text-lg">{lead.email}</p>
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Status</p>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                  className="text-lg border border-gray-300 rounded-md w-full p-2"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unqualified">Unqualified</option>
                </select>
              ) : (
                <p className="text-lg">{lead.status}</p>
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Source</p>
              <p className="text-lg">{lead.source}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-lg font-semibold">{lead.score}</p>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        <div className="flex-shrink-0 mt-8 border-t pt-6 flex justify-between items-center">
          <div>
            {!isEditing && (
              <button
                onClick={() => onConvert(lead)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Converter em Oportunidade
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            {isEditing ? (
              <>
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancelar</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Editar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}