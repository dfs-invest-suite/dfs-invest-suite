// RUTA: libs/infrastructure/infrasecurity/src/index.ts
export * from './lib/services/aes-encryption.service'; // Implementación de IEncryptionServicePort
export * from './lib/passport/jwt-tenant.strategy';
// export * from './lib/passport/jwt-platform-admin.strategy';
// export * from './lib/guards/roles.guard'; // Si los guards son genéricos y se exportan
// export * from './lib/services/password-hasher.service'; // (bcrypt/argon2 wrapper)
