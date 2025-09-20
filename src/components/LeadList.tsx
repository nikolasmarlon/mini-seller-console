import { useState, useEffect } from 'react';
import type { Lead } from '../types'; // Importando nosso tipo!
import leadsData from '../data/leads.json'; // Importando os dados

export function LeadsList() {
  // Estado para armazenar a lista de leads
  const [leads, setLeads] = useState<Lead[]>([]);

  // useEffect para carregar os dados quando o componente montar
  useEffect(() => {
    // Simulando uma chamada de API com 2 segundos de atraso
    const timer = setTimeout(() => {
      setLeads(leadsData as Lead[]);
    }, 2000);

    // Função de limpeza para evitar memory leaks
    return () => clearTimeout(timer);
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>{lead.name}</li>
        ))}
      </ul>
    </div>
  );
}