// RUTA: libs/core/application/coapbilling/src/index.ts

// --- Application Services / Facades ---
// (CostCalculationService del dominio podría ser usado directamente o envuelto por un servicio de app)
export * from './lib/services/tenant-billing.service'; // Orquesta el cálculo y registro

// --- Commands & Use Cases ---
export * from './lib/use-cases/record-billed-usage.use-case'; // Llamado por listeners de status de WhatsApp
export * from './lib/commands/record-usage.command';

// export * from './lib/use-cases/generate-tenant-billing-report.use-case'; // Similar a GetTenantCostReportUseCase
// export * from './lib/use-cases/process-platform-payment.use-case'; // Futuro: Para la suscripción a DFS-Invest-Suite

// --- Queries & Handlers ---
export * from './lib/queries/get-tenant-cost-report.query'; // Renombrado de GetTenantCostReportUseCase
export * from './lib/queries/get-tenant-cost-report.query-handler';
// export * from './lib/queries/get-whatsapp-pricing-rates.query'; // Para mostrar tarifas

// --- DTOs ---
export * from './lib/dtos/billed-usage.dto';
export * from './lib/dtos/cost-report.dto';
export * from './lib/dtos/pricing-rate.dto';

// --- Listeners ---
export * from './lib/listeners/whatsapp-message-billed.listener'; // Escucha eventos de pricing de WhatsApp
