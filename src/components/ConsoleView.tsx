import { useState, useEffect, useMemo } from 'react';
import type { Lead, LeadStatus, Opportunity } from '../types';
import leadsData from '../data/leads.json';
import { LeadDetailPanel } from './LeadDetailPanel';

export function ConsoleView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Simula o carregamento inicial dos dados
    const timer = setTimeout(() => {
      setLeads(leadsData as Lead[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedLeads = useMemo(() => {
    let result = leads;

    // 1. Lógica de Busca
    if (searchTerm) {
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Lógica de Filtro por Status
    if (statusFilter !== 'All') {
      result = result.filter((lead) => lead.status === statusFilter);
    }
    
    // 3. Lógica de Ordenação
    if (sortOrder) {
      result = [...result].sort((a, b) => {
        return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
      });
    }

    return result;
  }, [leads, searchTerm, statusFilter, sortOrder]);

  const handleSaveLead = (updatedLead: Lead) => {
    setTimeout(() => {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === updatedLead.id ? updatedLead : lead
        )
      );
      setSelectedLead(updatedLead);
    }, 500);
  };

  const handleConvertToOpportunity = (leadToConvert: Lead) => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      name: `${leadToConvert.name}'s Opportunity`,
      accountName: leadToConvert.company,
      stage: 'Prospecting',
    };
    setOpportunities((prev) => [...prev, newOpportunity]);
    setLeads((prev) => prev.filter((lead) => lead.id !== leadToConvert.id));
    setSelectedLead(null);
  };

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
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Opportunities</h2>
        {opportunities.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="px-5 py-3 border-b-2 border-gray-200">Opportunity Name</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Account Name</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200">Stage</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="border-b border-gray-200">
                    <td className="px-5 py-4"><p className="text-gray-900">{opp.name}</p></td>
                    <td className="px-5 py-4"><p className="text-gray-900">{opp.accountName}</p></td>
                    <td className="px-5 py-4"><p className="text-gray-900">{opp.stage}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma oportunidade criada ainda.</p>
        )}
      </div>

      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleSaveLead}
        onConvert={handleConvertToOpportunity}
      />
    </div>
  );
}