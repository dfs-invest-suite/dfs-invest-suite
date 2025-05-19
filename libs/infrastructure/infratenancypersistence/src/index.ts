// RUTA: libs/infrastructure/infratenancypersistence/src/index.ts
export * from './lib/infratenancypersistence.module'; // Módulo NestJS
export * from './lib/repositories/prisma-tenant.repository.adapter';
export * from './lib/repositories/secure-tenant-config.repository.adapter';
export * from './lib/mappers/tenant.prisma-mapper'; // Ejemplo de mapper
// export * from './lib/services/platform-prisma.service'; // Si el PrismaClient para la DB de plataforma se provee aquí
