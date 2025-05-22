// RUTA: libs/shared/shtypes/src/lib/core/enhanced-brand.type.ts
export interface BrandMetadata {
  readonly description?: string;
  readonly example?: string;
  readonly since?: string;
  readonly deprecated?: boolean;
  readonly deprecationMessage?: string;
}

export type EnhancedBrand<
  K,
  T extends string,
  M extends BrandMetadata = BrandMetadata
> = K & {
  readonly __brand: T;
  readonly __metadata?: Readonly<M>;
};

export function createBrandedType<
  K,
  T extends string,
  M extends BrandMetadata = BrandMetadata
>(
  value: K,
  _brandName: T,

  _metadata?: M // Prefijar con _ si no se usa en runtime
): EnhancedBrand<K, T, M> {
  return value as EnhancedBrand<K, T, M>;
}
// ... (isBrandedType y validateBrandedType como estaban) ...
export function isBrandedType<
  K,
  T extends string,
  M extends BrandMetadata = BrandMetadata
>(
  value: unknown,

  _brandName: T
): value is EnhancedBrand<K, T, M> {
  return value !== null && value !== undefined;
}

export function validateBrandedType<
  K,
  T extends string,
  M extends BrandMetadata = BrandMetadata
>(value: unknown, brandName: T): value is EnhancedBrand<K, T, M> {
  console.warn(
    `validateBrandedType para "${brandName}" es un placeholder. Usar schemas Zod.`
  );
  return isBrandedType<K, T, M>(value, brandName);
}
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/core/enhanced-brand.type.ts
