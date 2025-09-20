import { useState, useEffect } from 'react';
import type { Lead } from '../types';
import leadsData from '../data/leads.json';

export function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  // 1. Novo estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeads(leadsData as Lead[]);
      // 2. Desativamos o loading quando os dados chegam
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 3. Renderização condicional: se está carregando, mostra uma mensagem
  if (isLoading) {
    return <div className="p-8">Carregando leads...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* Container da Tabela com sombra e bordas arredondadas */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="px-5 py-3 border-b-2 border-gray-200">Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Company</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-5 py-4">
                  <p className="text-gray-900 whitespace-no-wrap">{lead.name}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-gray-900 whitespace-no-wrap">{lead.company}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-gray-900 whitespace-no-wrap">{lead.email}</p>
                </td>
                <td className="px-5 py-4">
                  {/* Estilização condicional simples para o Status */}
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">{lead.status}</span>
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <p className="text-gray-900 whitespace-no-wrap">{lead.score}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}