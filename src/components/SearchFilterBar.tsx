import { type LeadStatus } from "../types";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  filterStatus: LeadStatus | "all";
  setFilterStatus: (val: LeadStatus | "all") => void;
  sortDesc: boolean;
  setSortDesc: (val: boolean) => void;
}

export default function SearchFilterBar({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  sortDesc,
  setSortDesc,
}: Props) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar por nome ou empresa"
        className="flex-1 p-2 border rounded"
      />
      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value as LeadStatus | "all")
        }
        className="p-2 border rounded"
      >
        <option value="all">Todos</option>
        <option value="new">Novo</option>
        <option value="contacted">Contatado</option>
        <option value="qualified">Qualificado</option>
        <option value="converted">Convertido</option>
      </select>
      <button
        onClick={() => setSortDesc(!sortDesc)}
        className="p-2 border rounded"
      >
        Score {sortDesc ? "↓" : "↑"}
      </button>
    </div>
  );
}
