
import { useEffect, useMemo, useState } from "react";
import leadsData from "../data/leads.json";
import { simulateLatency } from "../utils/simulate";
import { type Lead, type Opportunity, type LeadStatus } from "../types";

const STORAGE_KEY = "msc_state_v1";

interface UpdateResult {
  success: boolean;
  message?: string;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")?.search || "";
    } catch {
      return "";
    }
  });

  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")?.filterStatus ||
        "all"
      );
    } catch {
      return "all";
    }
  });

  const [sortDesc, setSortDesc] = useState<boolean>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")?.sortDesc ?? true
      );
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const toSave = { search, filterStatus, sortDesc };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [search, filterStatus, sortDesc]);

  // expand leads para teste (até 100)
  function expandLeads(base: Lead[], target = 100): Lead[] {
    const out: Lead[] = [...base];
    let idx = 1;
    while (out.length < target) {
      const baseLead = base[(idx - 1) % base.length];
      out.push({
        ...baseLead,
        id: `lead-${idx + base.length}`,
        name: `${baseLead.name} ${idx}`,
        email: baseLead.email.replace("@", `+${idx}@`),
        score: Math.max(10, (baseLead.score + idx) % 100),
      });
      idx++;
    }
    return out;
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    simulateLatency(leadsData, 600)
      .then((data) => {
        const expanded = expandLeads(data as Lead[], 100);
        setLeads(expanded);
      })
      .catch((err: Error) => setError(err.message || "Erro ao carregar"))
      .finally(() => setLoading(false));
  }, []);

  const visibleLeads = useMemo(() => {
    let out = leads.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") {
      out = out.filter((l) => l.status === filterStatus);
    }
    out.sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));
    return out;
  }, [leads, search, filterStatus, sortDesc]);

  async function updateLeadOptimistic(
    id: string,
    patch: Partial<Lead>
  ): Promise<UpdateResult> {
    setError(null);
    const prevLeads = leads.slice();
    setLeads((pl) => pl.map((l) => (l.id === id ? { ...l, ...patch } : l)));

    try {
      await simulateLatency({ ok: true }, 600, 0.18);
      return { success: true };
    } catch (err: any) {
      setLeads(prevLeads);
      setError("Falha ao salvar alterações. Alterações revertidas.");
      return { success: false, message: err.message };
    }
  }

  function convertLeadToOpportunity(
    leadId: string,
    amount: number | null = null
  ): Opportunity | null {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return null;

    const opp: Opportunity = {
      id: `opp-${Date.now()}`,
      name: lead.name,
      stage: "Prospecting",
      amount,
      accountName: lead.company,
    };

    setLeads((pl) =>
      pl.map((l) => (l.id === leadId ? { ...l, status: "converted" } : l))
    );
    setOpportunities((prev) => [opp, ...prev]);

    return opp;
  }

  return {
    leads,
    visibleLeads,
    opportunities,
    loading,
    error,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    sortDesc,
    setSortDesc,
    updateLeadOptimistic,
    convertLeadToOpportunity,
  };
}
