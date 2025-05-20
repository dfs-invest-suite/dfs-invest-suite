// RUTA: libs/infrastructure/infrasecurity/src/lib/guards/roles.guard.ts
// TODO: [LIA Legacy - Implementar RolesGuard (Genérico)]
// Propósito: NestJS Guard para verificar si un usuario autenticado tiene los roles requeridos.
// Se usaría con un decorador @Roles('TENANT_ADMIN', 'PLATFORM_ADMIN') en resolvers/controladores.
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// export const ROLES_KEY = 'roles';
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) return true;
//     const { user } = context.switchToHttp().getRequest(); // O context.switchToRpc().getData() o context.switchToWs().getData()
//                                                       // Para GraphQL, se obtiene del GqlExecutionContext.create(context).getContext().req.user
//     return requiredRoles.some((role) => user?.roles?.includes(role)); // Asume que user.roles es un array
//   }
// }
