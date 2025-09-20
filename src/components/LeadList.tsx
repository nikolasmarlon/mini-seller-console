import { useState, useEffect, useMemo } from 'react';
import type { Lead, LeadStatus } from '../types';
import leadsData from '../data/leads.json';
import { LeadDetailPanel } from './LeadDetailPanel'; // Importamos o painel

export function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Estados para os controles de filtro e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | null>(null);

  // Estado para controlar qual lead está selecionado para o painel
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Lembre-se de corrigir seu JSON para ter os status com letra maiúscula
      // Ex: "New", "Contacted", etc.
      setLeads(leadsData as Lead[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Lógica para filtrar e ordenar os leads
  const filteredAndSortedLeads = useMemo(() => {
    let result = leads;

    if (searchTerm) {
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter((lead) => lead.status === statusFilter);
    }
    
    if (sortOrder) {
      result = [...result].sort((a, b) => {
        return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
      });
    }

    return result;
  }, [leads, searchTerm, statusFilter, sortOrder]);

  if (isLoading) {
    return <div className="p-8">Carregando leads...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou empresa..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'All')}
        >
          <option value="All">Todos os Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Unqualified">Unqualified</option>
        </select>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          Ordenar por Score {sortOrder === 'desc' ? '↓' : '↑'}
        </button>
      </div>

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
            {filteredAndSortedLeads.map((lead) => (
              <tr 
                key={lead.id} 
                className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="px-5 py-4"><p className="text-gray-900 whitespace-no-wrap">{lead.name}</p></td>
                <td className="px-5 py-4"><p className="text-gray-900 whitespace-no-wrap">{lead.company}</p></td>
                <td className="px-5 py-4"><p className="text-gray-900 whitespace-no-wrap">{lead.email}</p></td>
                <td className="px-5 py-4">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{lead.status}</span>
                  </span>
                </td>
                <td className="px-5 py-4 text-right"><p className="text-gray-900 whitespace-no-wrap">{lead.score}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeadDetailPanel 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}