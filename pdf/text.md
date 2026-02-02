Prioridad alta — correcciones funcionales

Corregir rutas y redirecciones inconsistentes (unificar a /create-task, /dashboard, /profile, etc.). Archivos: src/router/Router.js, src/main.js, src/auth/.js, src/views/.js.
Usar sessionManager en vez de acceder directo a localStorage (crear/leer/borrar sesión centralizado). Archivos: src/state/sessionManager.js, src/router/Router.js, authService.js.
Arreglar flujo post-register/post-login (auto-login o redirección clara). Archivos: src/services/authService.js, src/auth/Register.js, src/auth/Login.js.
Eliminar/refactorizar código legacy/duplicado en CreateTask (bloques que usan funciones no definidas). Archivo: src/views/CreateTask.js.
Manejo de errores y estados de carga en llamadas API (mostrar loader, notificaciones de fallo). Archivos: src/services/.js, src/views/.js.
Seguridad y robustez

Sanitizar/escape al inyectar HTML (usar helpers.sanitizeHTML o similar) para nombres, descripciones, fullName. Archivos: src/utils/helpers.js, src/views/*.js.
Validaciones de formularios en cliente (validators.js) y mensajes claros inline. Archivos: src/utils/validators.js, src/auth/*.js, src/views/CreateTask.js.
Evitar exponer contraseñas en cleartext (no almacenar en localStorage sin razonamiento; en producción usar backend seguro). Archivos: authService.js, sessionManager.js.
Calidad del código y arquitectura

Centralizar constantes (RUTAS, API_BASE_URL) en un archivo de config y usarlo en todo el proyecto. Archivos: src/services/api.js, src/router/Router.js, src/main.js.
Modularizar servicios y separar lógica de UI (taskService, authService ya existen: mover lógica compleja fuera de vistas). Archivos: src/services/.js, src/views/.js.
Evitar duplicación en renderizado (create helpers de templates reutilizables y renderers). Archivos: src/views/.js, src/components/.js.
Añadir manejo defensivo para campos opcionales (usar || '') en filtros y comparaciones. Archivo: src/services/taskService.js.
UX / accesibilidad / rendimiento

Añadir debounce en inputs de búsqueda para mejorar rendimiento. Archivo: src/utils/helpers.js, src/views/Dashboard.js.
Mejorar navegación: usar event delegation y data-route en NavBar/Menu para evitar errores al clicar elementos internos. Archivos: src/components/NavBar.js, src/components/Menu.js.
Añadir aria-live para notificaciones/toasts y roles en botones/links para accesibilidad. Archivo: src/utils/helpers.js, src/components/*.
Indicadores visuales (botones disabled durante petición, loaders, estados vacíos) en Dashboard/Task/CreateTask/Profile. Archivos: src/views/*.js, styles.css.
Tests, scripts y CI

Añadir tests unitarios para authService y taskService (Jest / Vitest). Actualizar package.json scripts: test, test:watch. Archivo: package.json, new tests in tests.
Añadir script para iniciar json-server y frontend (ya existe, revisar). Archivo: package.json.
Añadir CI simple (GitHub Actions) para lint y tests. Archivo: .github/workflows/ci.yml.
Calidad del repo y documentación

Actualizar README con pasos de ejecución, endpoints json-server, rutas y credenciales de prueba. Archivo: README.md.
Añadir .editorconfig, .eslintrc y configuración de Prettier para consistencia de estilo.
Añadir ejemplos de datos en state/db.json y documentar en README.
Mejoras opcionales / escalado

Implementar paginación o virtualización para listas largas.
Soportar cancelación de fetch (AbortController) en búsquedas/requests puestos rápidos.
Internacionalización mínima (strings centralizados) si se espera crecimiento.
