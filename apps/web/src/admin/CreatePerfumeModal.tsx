import { useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { FAMILIES } from "./families";
import type { Perfume } from "../types";

interface CreatePerfumeModalProps {
  onClose: () => void;
  onCreated: () => void;
  /** Precarga desde un próximo ingreso, si aplica */
  prefill?: { name?: string; fam?: string; description?: string };
  /** Se ejecuta después de crear el perfume, antes de onCreated (ej: borrar el ingreso) */
  afterCreate?: (perfume: Perfume) => Promise<void>;
}

export default function CreatePerfumeModal({
  onClose,
  onCreated,
  prefill,
  afterCreate,
}: CreatePerfumeModalProps) {
  const { token } = useAuth();
  const prefillIdx = prefill?.fam
    ? FAMILIES.findIndex((f) => f.fam === prefill.fam)
    : -1;

  const [sku, setSku] = useState("");
  const [name, setName] = useState(prefill?.name ?? "");
  const [familyIdx, setFamilyIdx] = useState(prefillIdx >= 0 ? prefillIdx : 0);
  const [topNotes, setTopNotes] = useState("");
  const [heartNotes, setHeartNotes] = useState("");
  const [baseNotes, setBaseNotes] = useState("");
  const [description, setDescription] = useState(prefill?.description ?? "");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [maxStock, setMaxStock] = useState<number | "">("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageWarning, setImageWarning] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setImageWarning(null);
    setSaving(true);
    const { family, fam } = FAMILIES[familyIdx];
    try {
      const created = await api.createPerfume(
        {
          sku,
          name,
          family,
          fam,
          topNotes,
          heartNotes,
          baseNotes,
          description,
          price: Number(price),
          stock: Number(stock),
          maxStock: Number(maxStock),
        },
        token,
      );

      // El perfume ya quedó creado en este punto. Si la imagen falla,
      // no lo tratamos como error fatal: solo avisamos que se puede
      // subir después desde Inventario → Editar.
      let imageFailed = false;
      if (selectedFile) {
        try {
          await api.uploadPerfumeImage(created.id, selectedFile, token);
        } catch (imgErr) {
          imageFailed = true;
          setImageWarning(
            imgErr instanceof Error
              ? `El perfume se creó, pero la imagen no se pudo subir: ${imgErr.message}`
              : "El perfume se creó, pero la imagen no se pudo subir.",
          );
        }
      }

      if (afterCreate) await afterCreate(created);
      onCreated();

      // Solo cerramos solo si no hubo drama con la imagen —
      // si falló, dejamos el modal abierto para que se vea el aviso.
      if (!imageFailed) {
        onClose();
      }

      if (afterCreate) await afterCreate(created);
      onCreated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo crear el perfume",
      );
    } finally {
      setSaving(false);
    }
  }

    return (
    <div className="modal-backdrop active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Nuevo perfume</h3>
          <span className="sku">Completá los datos del catálogo</span>
        </div>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-modal-body">
            <span className="form-section-label">Identificación</span>
            <div className="row">
              <div className="field">
                <label>SKU</label>
                <input className="mono" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="FR-011" required />
              </div>
              <div className="field">
                <label>FAMILIA</label>
                <select value={familyIdx} onChange={(e) => setFamilyIdx(Number(e.target.value))}>
                  {FAMILIES.map((f, idx) => (
                    <option key={f.fam} value={idx}>{f.family}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label>NOMBRE</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Vainilla Bourbon" required />
            </div>

            <span className="form-section-label">Pirámide olfativa</span>
            <div className="row">
              <div className="field">
                <label>NOTAS DE SALIDA</label>
                <input value={topNotes} onChange={(e) => setTopNotes(e.target.value)} placeholder="Bergamota, pera" required />
              </div>
              <div className="field">
                <label>NOTAS DE CORAZÓN</label>
                <input value={heartNotes} onChange={(e) => setHeartNotes(e.target.value)} placeholder="Jazmín, azahar" required />
              </div>
            </div>
            <div className="field">
              <label>NOTAS DE FONDO</label>
              <input value={baseNotes} onChange={(e) => setBaseNotes(e.target.value)} placeholder="Almizcle, cedro" required />
            </div>
            <div className="field">
              <label>DESCRIPCIÓN</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Una o dos líneas" required />
            </div>

            <span className="form-section-label">Precio y stock</span>
            <div className="row">
              <div className="field">
                <label>PRECIO ($)</label>
                <input
                  type="number" className="mono" value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  required
                />
              </div>
              <div className="field">
                <label>STOCK INICIAL</label>
                <input
                  type="number" className="mono" value={stock}
                  onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label>STOCK MÁXIMO</label>
              <input
                type="number" className="mono" value={maxStock}
                onChange={(e) => setMaxStock(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
            </div>

            <span className="form-section-label">Imagen (opcional)</span>
            <div className="field">
              {preview && <img src={preview} alt="Vista previa" className="edit-image-preview" />}
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
            </div>

            {imageWarning && <p className="login-error">{imageWarning}</p>}
            {error && <p className="login-error">{error}</p>}
          </div>

          <div className="edit-modal-footer">
            {imageWarning ? (
              <button type="button" className="btn-primary" onClick={onClose}>Cerrar</button>
            ) : (
              <>
                <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>Cancelar</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Creando…" : "Crear perfume"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
