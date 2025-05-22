// RUTA: libs/shared/shtypes/src/lib/core/type-registry.ts
// Interface Placeholder para el Type Registry. La implementación completa es Post-24h-Sprint.

// Comentado para evitar errores de no uso en este sprint
// interface TypeMetadata<T = unknown> {
//   readonly typeName: string;
// }

export interface ITypeRegistry {
  placeholder(): void;
}

export class TypeRegistryImpl implements ITypeRegistry {
  private static instance: TypeRegistryImpl;

  private constructor() {}
  public static getInstance(): TypeRegistryImpl {
    if (!TypeRegistryImpl.instance) {
      TypeRegistryImpl.instance = new TypeRegistryImpl();
    }
    return TypeRegistryImpl.instance;
  }
  public placeholder(): void {
    console.log('TypeRegistry placeholder');
  }
}
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/core/type-registry.ts
