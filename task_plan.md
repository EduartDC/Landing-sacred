# Plan de Tarea - Sistema Maestro E.T.A.P.A.

> **Objetivo:** Automatización determinista y autorreparable.

- [ ] **Fase 0: Inicialización**
    - [x] Crear `task_plan.md`
    - [x] Crear `gemini.md` (Constitución)
    - [x] Crear `findings.md`
    - [x] Crear `progress.md`
- [ ] **Fase 1: Estrategia (Strategy)**
    - [x] **Descubrimiento**
        - [x] Obtener Directriz Principal (Integrar email form)
        - [x] Identificar Integraciones (EmailJS / SendGrid)
        - [x] Definir Fuente de la Verdad (gemini.md)
        - [x] Definir Carga Útil (Payload)
        - [x] Establecer Reglas de Comportamiento
    - [ ] **Definición de Datos**
        - [ ] Definir Esquema JSON (Input/Output) en `gemini.md`
    - [ ] **Diseño de Capacidades (Skills)**
        - [x] Definir SOP de Pruebas de Integración WEB (`architecture/skill_web_integration_testing.md`)
- [x] **Fase 2: Tests (Connectivity)**
    - [x] Instalación de librearías EmailJS
- [x] **Fase 3: Arquitectura (Architecture)**
    - [x] Reemplazar POST de Netlify con API directas en `Contact.ts`
- [x] **Fase 4: Pulido (Polishing)**
    - [x] Pruebas automatizadas (Browser Subagent) de envío a `eduart_mx@hotmail.com`
    - [x] Corrección de Bug UX/UI (Ocultamiento del formulario en `Contact.ts`)
- [x] **Fase 5: Automatización (Automation)**
    - [x] Flujo de EmailJS verificado localmente. Listo para pase a producción.
