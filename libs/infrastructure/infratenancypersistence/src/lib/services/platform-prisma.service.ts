// RUTA: libs/infrastructure/infratenancypersistence/src/lib/services/platform-prisma.service.ts
// TODO: [LIA Legacy - Implementar PlatformPrismaService]
// Propósito: Servicio NestJS que gestiona y provee la instancia de PrismaClient conectada
// a la base de datos de plataforma centralizada.
// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/platform-client'; // Asumiendo que el cliente generado se llama así
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class PlatformPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//   constructor(configService: ConfigService) {
//     super({ datasources: { db: { url: configService.getOrThrow<string>('PLATFORM_DATABASE_URL') } } });
//   }
//   async onModuleInit() { await this.$connect(); }
//   async onModuleDestroy() { await this.$disconnect(); }
// }
