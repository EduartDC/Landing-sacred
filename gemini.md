# Constitución del Proyecto (Gemini)

> **Regla de Oro:** Este archivo es la ÚNICA fuente de verdad para esquemas de datos y reglas de negocio.
> **Estado:** Fase 1 (Descubrimiento).

## Directriz Principal
- **Objetivo:** Integrar la funcionalidad de envío de correos en el formulario de reservaciones/contacto de una landing page para una empresa de tours.
- **Destinatario Principal:** `eduart_mx@hotmail.com`

## 1. Esquemas de Datos (Data Schemas)
*(Definidos según el componente Contact.ts)*

### Input Schema (Valores introducidos por el usuario)
```json
{
  "name": "string (Requerido)",
  "email": "string (Requerido, formato email)",
  "phone": "string (Opcional, 10 dígitos)",
  "message": "string (Requerido, 10-200 palabras)",
  "tour_id": "string (Opcional, presente si es reserva)",
  "subject": "string (Opcional, presente si es reserva)",
  "date": "string (Opcional, presente si es reserva - YYYY-MM-DD)",
  "passengers": "number (Opcional, presente si es reserva - entre 1 y 20)"
}
```

### Output Schema (Carga Útil / Payload para envío de correo)
```json
{
  "to_email": "eduart_mx@hotmail.com",
  "from_name": "<input.name>",
  "reply_to": "<input.email>",
  "phone": "<input.phone>",
  "message": "<input.message>",
  "tour_details": "Reserva para {date}, {passengers} pasajeros (ID: {tour_id}) - o null si es contacto general"
}
```

## 2. Reglas de Comportamiento
- Priorizar fiabilidad sobre velocidad.
- Código determinista (sin alucinaciones).
- No modificar `tools/` sin aprobación en Fase 1.

## 3. Invariantes Arquitectónicas
- `tools/` scripts deben ser atómicos.
- Variables de entorno en `.env`.
- Archivos intermedios en `.tmp/`.
