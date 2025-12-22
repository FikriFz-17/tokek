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
    credentials: "include",
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Gagal menyimpan tiket");
  }
  return res.json();
}

export async function getTickets(skip = 0, limit = 100) {
  // Tambahkan parameter kedua fetch: { credentials: "include" }
  const res = await fetch(`${API_BASE}/tickets?skip=${skip}&limit=${limit}`, {
    credentials: "include" // WAJIB ADA agar Backend tahu siapa user yang login
  });
  
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
    credentials: "include",
  });
  if (!res.ok) throw new Error("Gagal update status");
  return res.json();
}

export async function loginUser(identifier: string, password: string) {
  // Backend mengharapkan field "identifier" (bukan username)
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
    credentials: "include", // PENTING: Izinkan set-cookie dari backend
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Gagal login");
  }
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include", // Kirim cookie saat logout agar backend bisa menghapusnya
  });
  if (!res.ok) throw new Error("Gagal logout");
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/users/me`, {
    method: "GET",
    credentials: "include", // Kirim cookie untuk validasi session
  });
  if (!res.ok) return null; // Jika 401 Unauthorized, anggap belum login
  return res.json();
}