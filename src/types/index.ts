// Define os valores possíveis para o status de um Lead
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified';

// Define a estrutura de um objeto Lead
export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
};

export type Opportunity = {
  id: string;
  name: string; // Vem do lead.name
  accountName: string; // Vem do lead.company
  stage: 'Prospecting' | 'Qualification' | 'Closed Won' | 'Closed Lost';
  amount?: number; 
};