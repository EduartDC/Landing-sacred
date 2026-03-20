# Skill: Protocolo de Pruebas de Integración Web (SOP)

> **ID:** SKILL-INT-TEST-001
> **Tipo:** Procedimiento Operativo Estándar (Arquitectura)
> **Estado:** Borrador (Esperando Descubrimiento)

## 1. Objetivo
Garantizar que las interfaces web y los flujos de usuario críticos funcionen según lo esperado en un entorno similar al de producción, utilizando automatización determinista.

## 2. Herramientas Autorizadas
- **Browser Subagent** (Nativo): Para emulación de usuario final, navegación y verificación visual/DOM.
- **Python `unittest` + `requests`** (Tools/): Para verificación de códigos de estado HTTP y APIs (si aplica).

## 3. Flujo de Ejecución (Pipeline)

### Paso 1: Verificación de Entorno (Sanity Check)
Antes de lanzar pruebas complejas:
1.  Verificar que el servidor local/staging esté activo (Ping / Healthcheck).
2.  Validar credenciales de prueba en `.env`.

### Paso 2: Definición de Casos de Prueba (Test Cases)
*Los casos deben definirse en `gemini.md` bajo "Test Schemas".*

**Estructura de un Caso de Prueba:**
-   **ID**: `TC-00X`
-   **Nombre**: Descripción corta.
-   **Pre-condición**: Estado inicial (ej. usuario deslogueado).
-   **Pasos**: Acciones secuenciales (Click, Type, Navigate).
-   **Expectativa**: Resultado verificable (Selector visible, URL cambia, Texto presente).

### Paso 3: Ejecución (Manual o Automática)
El agente ejecutará las pruebas siguiendo este pseudo-código operativo:

```python
def run_integration_session(url):
    # 1. Iniciar Navegador
    browser = start_browser_subagent()
    
    # 2. Navegar al Target
    browser.navigate(url)
    
    # 3. Ejecutar Pasos del Caso
    # ... (Lógica específica definida en steps)
    
    # 4. Validar Expectativas
    if condition_met:
        log_success()
    else:
        log_failure()
        self_heal_or_report() # Auto-reparación o reporte
```

## 4. Estrategia de Auto-Reparación (Self-Annealing)
Si una prueba falla:
1.  **Captura**: Tomar screenshot/dump del DOM.
2.  **Análisis**: Comparar con la "Fuente de la Verdad" (Selectores esperados).
3.  **Diagnóstico**: ¿Cambió el UI? ¿Error de red? ¿Bug lógico?
4.  **Acción**:
    -   Si cambió el UI -> Actualizar selectores en la definición del Test.
    -   Si es Bug -> Reportar en `findings.md` y proponer fix.

## 5. Requisitos Pendientes (Input del Usuario)
Para instanciar esta Skill, necesitamos definir en la Fase de Descubrimiento:
-   **Target URL**: (Localhost puerto? Staging?)
-   **Flujos Críticos**: (¿Login? ¿Formulario de Contacto? ¿Checkout?)
