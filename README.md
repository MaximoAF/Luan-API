# Luan Essence — monorepo

Todo el proyecto en un solo repo: backend (NestJS + Prisma + PostgreSQL) y
frontend (React + Vite), ambos en TypeScript.

```
luan-essence/
├── apps/
│   ├── api/    → backend. Ver apps/api/LEEME.md
│   └── web/    → frontend. Ver apps/web/LEEME.md
└── package.json → scripts raíz (build unificado)
```

## Para desarrollo local (dos procesos)

```bash
# Terminal 1
npm --prefix apps/api install
cp apps/api/.env.example apps/api/.env   # completar con tus valores
npm run dev:api

# Terminal 2
npm --prefix apps/web install
cp apps/web/.env.example apps/web/.env.local
npm run dev:web
```

Backend en `http://localhost:3000/api`, front en `http://localhost:5173`.

## Para producción (un solo servicio — Fase 4 del plan)

Esto todavía no está armado: falta agregar `ServeStaticModule` en
`apps/api/src/app.module.ts` para que Nest sirva el build de React desde
`apps/api/public`. El script raíz `npm run build` ya deja el build ahí
copiado — el paso que falta es que Nest lo sirva. Lo vemos en el próximo paso.

Cada app tiene su propio `LEEME.md` con el detalle de instalación, variables
de entorno y cómo probar que funciona.
