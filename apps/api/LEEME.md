# Luan Essence API — Fase 1

Este proyecto ya viene completo (`package.json`, `tsconfig.json`,
`nest-cli.json` incluidos) — no hace falta correr `nest new`.

## 1. Instalar dependencias

```bash
cd apps/api
npm install
```

## 2. Configurar el .env

```bash
cp .env.example .env
```

Completá `DATABASE_URL` con el que copiaste de Railway/Render, y `JWT_SECRET` /
`ADMIN_PASSWORD` con valores propios (`openssl rand -hex 32` para el secret).

## 3. Crear las tablas y cargar los datos de ejemplo

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

(`prisma db seed` ya sabe qué correr porque está declarado en el `package.json`.)

## 4. Levantar el servidor

```bash
npm run start:dev
```

Deberías ver `Luan Essence API corriendo en http://localhost:3000/api`.

## 5. Probar que funciona

```bash
# Catálogo público
curl http://localhost:3000/api/perfumes

# Login de admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"la-que-pusiste-en-ADMIN_PASSWORD"}'

# Con el token que te devuelve, editar un perfume
curl -X PATCH http://localhost:3000/api/perfumes/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{"stock": 20, "offerPrice": 14900}'
```

## Si `npm install` tira errores de versiones

Los rangos de versión (`^10.4.4`, etc.) son los vigentes al momento de armar
esto. Si npm resuelve alguna incompatibilidad rara, corré
`npm install <paquete>@latest` para ese paquete puntual y probá de nuevo.

## Qué falta (próximas fases del plan)

- Fase 4: servir el build de React desde este mismo Nest (`ServeStaticModule`),
  ya con `apps/api/public` listo para recibirlo.
- Fase 5: deploy en Railway.
