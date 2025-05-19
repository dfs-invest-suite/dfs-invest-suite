// RUTA: libs/infrastructure/infrapersistence/src/index.ts
export * from './lib/infrapersistence.module'; // Módulo NestJS
export * from './lib/services/tenant-prisma.service'; // El PrismaClient dinámico por tenant
// Repositorios específicos (ejemplos)
export * from './lib/repositories/prisma-lead.repository.adapter';
export * from './lib/repositories/prisma-whatsapp-account.repository.adapter';
// ... exportaciones de otros adaptadores de repositorio Prisma para entidades de tenant
// ... exportaciones de mappers Prisma específicos de entidades de tenant
