# Luan Essence — Front (React + Vite + TypeScript) — Fase 3

## 1. Instalar dependencias

```bash
cd apps/web   # o donde hayas puesto esta carpeta
npm install
```

## 2. Configurar el entorno

```bash
cp .env.example .env.local
```

Por defecto apunta a `http://localhost:3000/api`, que es donde debería estar
corriendo el backend de la Fase 1 (`npm run start:dev` en la carpeta de la API).

## 3. Levantarlo

```bash
npm run dev
```

Abre `http://localhost:5173`.

- **Catálogo del cliente**: `http://localhost:5173/`
- **Panel admin**: `http://localhost:5173/admin` — pide la contraseña que
  pusiste en `ADMIN_PASSWORD` del backend.

## Qué tenés que tener corriendo en paralelo

1. PostgreSQL (Render) con las tablas creadas y sembradas (Fase 1).
2. La API de Nest en `http://localhost:3000` (`npm run start:dev`).
3. Este front en `http://localhost:5173` (`npm run dev`).

Si al abrir `/` ves "No pudimos cargar el catálogo", casi seguro es:
- La API no está corriendo, o
- `VITE_API_URL` en `.env.local` no coincide con el puerto real de la API, o
- Falta CORS — ya está habilitado en el backend (`app.enableCors()`), pero
  si lo restringiste a un dominio específico, agregá `http://localhost:5173`.

## Qué cambia respecto a la maqueta HTML

- El catálogo, las ofertas y el stock ahora vienen de la base de datos real,
  no de un array fijo en el código.
- El admin necesita loguearse (JWT) para editar — ya no hay un botón que
  simplemente "cambia de vista".
- Se agregó la sección/panel de **Próximos ingresos**, que en la maqueta
  original no existía.

## Próximo paso (Fase 4 del plan)

Unificar todo en un solo servicio: buildear este front y servirlo desde el
mismo proceso de Nest, para que el deploy en Railway sea un solo servicio.
Cuando quieras, seguimos con eso.
