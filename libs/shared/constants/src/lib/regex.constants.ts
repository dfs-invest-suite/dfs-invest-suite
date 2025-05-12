// libs/shared/constants/src/lib/regex.constants.ts

/**
 * Expresión regular simple para validar formato de email.
 * NOTA: Para validación robusta de email, especialmente en producción,
 * considerar librerías especializadas o validaciones más exhaustivas.
 * Esta es una aproximación general.
 */
export const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Expresión regular para validar formato de UUID v4.
 */
export const UUID_V4_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
