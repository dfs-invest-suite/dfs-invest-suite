// RUTA: libs/core/domain/codoanalyticscore/src/index.ts

// Value Objects (Definiciones de Métricas y KPIs)
export * from './lib/value-objects/kpi-definition.vo'; // (name, description, calculation_logic_ref)
export * from './lib/value-objects/metric-definition.vo';
export * from './lib/value-objects/time-period.vo'; // (DAILY, WEEKLY, MONTHLY)
export * from './lib/value-objects/data-segment.vo'; // (ej. por consultor, por campaña)
export * from './lib/value-objects/calculated-kpi-value.vo';

// Ports (Si las definiciones de KPI son configurables o si se leen datos pre-agregados)
// export * from './lib/ports/kpi-definition.repository.port';
// export * from './lib/ports/aggregated-data.repository.port'; // Para leer datos para calcular KPIs

// Domain Services
// export * from './lib/services/kpi-calculation.service'; // Lógica para calcular KPIs a partir de datos
