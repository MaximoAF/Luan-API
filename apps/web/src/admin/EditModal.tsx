import { ChangeEvent, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import type { Perfume } from "../types";
import { imageSrc } from "../api";

interface EditModalProps {
  perfume: Perfume;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditModal({
  perfume,
  onClose,
  onSaved,
}: EditModalProps) {
  const { token } = useAuth();
  const [price, setPrice] = useState(perfume.price);
  const [stock, setStock] = useState(perfume.stock);
  const [offerPrice, setOfferPrice] = useState<number | "">(
    perfume.offerPrice ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    imageSrc(perfume.imageUrl),
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleUploadImage() {
    if (!selectedFile) return;
    setUploadingImage(true);
    setError(null);
    try {
      await api.uploadPerfumeImage(perfume.id, selectedFile, token);
      onSaved();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo subir la imagen",
      );
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleRemoveImage() {
    setUploadingImage(true);
    try {
      await api.removePerfumeImage(perfume.id, token);
      onSaved();
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await api.updatePerfume(
        perfume.id,
        {
          price: Number(price),
          stock: Number(stock),
          offerPrice: offerPrice === "" ? null : Number(offerPrice),
        },
        token,
      );
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Editar producto</h3>
          <span className="sku">{perfume.sku} · {perfume.name}</span>
        </div>

        <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="edit-modal-body">
            <span className="form-section-label">Precio y stock</span>
            <div className="row">
              <div className="field">
                <label>PRECIO DE LISTA ($)</label>
                <input
                  type="number" className="mono" value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="field">
                <label>STOCK (UNIDADES)</label>
                <input
                  type="number" className="mono" value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="field">
              <label>PRECIO CON OFERTA ($ — vacío = sin oferta)</label>
              <input
                type="number" className="mono" placeholder="0"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>

            <span className="form-section-label">Imagen</span>
            <div className="field">
              {preview && <img src={preview} alt={perfume.name} className="edit-image-preview" />}
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
              <div className="edit-image-actions">
                <button
                  type="button" className="btn-ghost"
                  onClick={handleUploadImage}
                  disabled={!selectedFile || uploadingImage}
                >
                  {uploadingImage ? "Subiendo…" : "Subir imagen"}
                </button>
                {perfume.imageUrl && (
                  <button
                    type="button" className="remove-offer"
                    onClick={handleRemoveImage} disabled={uploadingImage}
                  >
                    Quitar imagen
                  </button>
                )}
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}
          </div>

          <div className="edit-modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
