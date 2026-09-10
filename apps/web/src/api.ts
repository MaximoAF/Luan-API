import type {
  Perfume,
  ProximoIngreso,
  UpdatePerfumeDto,
  CreateIngresoDto,
  CreatePerfumeDto,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const API_ORIGIN = BASE_URL.replace(/\/api\/?$/, "");

export function imageSrc(path: string | null): string | null {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_ORIGIN}${path}`;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
}

async function request<T>(
  path: string,
  { method = "GET", body, token }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      /* respuesta sin body JSON */
    }
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

export const api = {
  // Público
  getPerfumes: () => request<Perfume[]>("/perfumes"),
  getPerfume: (id: number) => request<Perfume>(`/perfumes/${id}`),
  getIngresos: () => request<ProximoIngreso[]>("/ingresos"),

  // Auth
  login: (password: string) =>
    request<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: { password },
    }),

  // Admin (requieren token)
  createPerfume: (dto: CreatePerfumeDto, token: string | null) =>
  request<Perfume>("/perfumes", { method: "POST", body: dto, token }),
  updatePerfume: (id: number, dto: UpdatePerfumeDto, token: string | null) =>
    request<Perfume>(`/perfumes/${id}`, { method: "PATCH", body: dto, token }),
  createIngreso: (dto: CreateIngresoDto, token: string | null) =>
    request<ProximoIngreso>("/ingresos", { method: "POST", body: dto, token }),
  deleteIngreso: (id: number, token: string | null) =>
    request<null>(`/ingresos/${id}`, { method: "DELETE", token }),

  // Imagenes perfume
  uploadPerfumeImage: async (
    id: number,
    file: File,
    token: string | null,
  ): Promise<Perfume> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${BASE_URL}/perfumes/${id}/image`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData, // OJO: no seteamos Content-Type a mano, el browser pone el boundary solo
    });
    if (!res.ok) {
      let message = `Error ${res.status}`;
      try {
        const data = await res.json();
        message = data.message || message;
      } catch {}
      throw new Error(Array.isArray(message) ? message.join(", ") : message);
    }
    return res.json();
  },

  removePerfumeImage: (id: number, token: string | null) =>
    request<Perfume>(`/perfumes/${id}/image`, { method: "DELETE", token }),
};
