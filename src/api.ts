// src/api.ts
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function classifyText(text: string) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Gagal memanggil /predict");
  return res.json();
}

export async function createTicket(ticket: any) {
  const res = await fetch(`${API_BASE}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Gagal menyimpan tiket");
  }
  return res.json();
}

export async function getTickets(skip = 0, limit = 100) {
  const res = await fetch(`${API_BASE}/tickets?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error("Gagal mengambil tickets");
  return res.json();
}

export async function updateTicketCategory(id: number, category: string) {
  const res = await fetch(`${API_BASE}/tickets/${id}/category`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  });
  if (!res.ok) throw new Error("Gagal update kategori");
  return res.json();
}

export async function updateTicketStatus(id: number, status: string) {
  const res = await fetch(`${API_BASE}/tickets/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Gagal update status");
  return res.json();
}
