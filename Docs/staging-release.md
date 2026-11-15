# Validación de staging: Nova Assist

Este procedimiento requiere autorización y acceso al entorno de staging. No es
evidencia de que se haya desplegado o probado el release actual. No usar datos
de clientes reales, secretos, tokens ni capturas con datos personales como
evidencia. La aceptación del proveedor de correo no garantiza entrega al buzón.

## Preparación

1. Identificar y registrar el commit candidato y la última versión funcional
   de `novamind-web-staging` para rollback. Confirmar que el entorno, el
   dominio y la cuenta de Cloudflare sean los previstos.
2. En el entorno GitHub `staging`, configurar la variable
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` del widget real autorizado para
   `staging.novamindglobalcr.com`, y los secretos `TURNSTILE_SECRET_KEY` y
   `CLOUDFLARE_API_TOKEN` mediante el almacén seguro. No compartirlos por chat
   ni mostrarlos en logs. La clave pública se incorpora al compilar; su
   correspondiente secreto se proporciona al Worker al desplegar.
3. Las claves ficticias oficiales y `TURNSTILE_TEST_BYPASS` son exclusivamente
   para pruebas aisladas: no configurarlas en staging ni producción. Confirmar
   por separado la configuración real de producción cuando corresponda.
   Verificar también los bindings de correo, remitente, destino y rate limits
   de `cloudflare.config.ts`; staging usa el mismo destino de correo configurado,
   por lo que se requiere autorización para los mensajes de prueba.
4. Confirmar los gates de calidad del commit, revisión legal y comercial y
   disponibilidad de una persona que pueda confirmar la recepción. No desplegar
   producción como parte de esta prueba.

## Despliegue autorizado y smoke

1. Ejecutar manualmente el workflow `Deploy Cloudflare` seleccionando
   `staging` y el commit candidato. Confirmar su resultado y el identificador de
   versión desplegada. Si GitHub Actions no puede ejecutar jobs, resolver ese
   bloqueo o usar el procedimiento alternativo aprobado por el operador; no
   asumir que el despliegue ocurrió.
2. En PowerShell comprobar rutas sin redirecciones inesperadas:

   ```powershell
   $base = 'https://staging.novamindglobalcr.com'
   $routes = @('/nova-assist', '/nova-assist/plan-familia',
     '/nova-assist/total-home', '/nova-assist/solicitar',
     '/nova-assist/empresas', '/nova-assist/empresas/business-pro',
     '/nova-assist/empresas/comparar', '/nova-assist/empresas/health-check')
   foreach ($route in $routes) {
     $response = Invoke-WebRequest "$base$route" -MaximumRedirection 0
     if ($response.StatusCode -ne 200) { throw "HTTP inesperado: $route" }
   }
   $ready = Invoke-RestMethod "$base/api/health?check=ready"
   foreach ($name in @('email_delivery', 'contact_routing', 'rate_limiting', 'turnstile')) {
     if ($ready.checks.$name -ne $true) { throw "Readiness incompleto: $name" }
   }
   if ($ready.status -ne 'ready') { throw 'Worker no está listo' }
   ```

3. En navegador de escritorio y móvil, realizar una solicitud Home y una
   Business con datos de prueba autorizados. Completar el Health Check,
   revisar y editar el resumen y confirmar que solo se envía al confirmar el
   formulario. Registrar los identificadores de solicitud, no los datos.
4. Completar el widget real, comprobar la respuesta y solicitar al destinatario
   autorizado que confirme la llegada de cada mensaje. Repetir con un token
   ausente o inválido y verificar rechazo sin entrega. En una prueba controlada
   comprobar que la reutilización del mismo token se rechaza; nunca guardar
   ni publicar el token. También verificar el comportamiento ante expiración y
   la recuperación tras un error. No enviar solicitudes de prueba a terceros.
5. Con cookies rechazadas, comprobar que no se cargan analytics ni se envían
   eventos; aceptar y luego revocar, y comprobar el comportamiento de nuevo.
   Si se habilita una propiedad de pruebas, inspeccionar los eventos sin
   nombre, correo, texto libre ni respuestas del Health Check. No habilitar la
   propiedad productiva para datos de prueba sin aprobación.
6. Revisar logs del Worker por `requestId`, sin registrar tokens ni información
   personal. Confirmar que no haya errores de Siteverify o entrega. Provocar un
   error controlado con token inválido, verificar respuesta segura y ausencia
   de correo. No alterar bindings ni interrumpir servicios reales para simular
   una caída.

## Rollback y decisión

Si un gate falla, detener la promoción y restaurar mediante Cloudflare la
versión previa identificada de `novamind-web-staging`, según el procedimiento
aprobado para la cuenta. Confirmar dominio, versión, rutas y readiness después
del rollback; restaurar código no revierte automáticamente configuración ni
datos externos. Registrar resultados y responsables sin secretos ni PII.
Producción requiere aprobación separada, evidencia real de staging y cierre
legal/comercial; este runbook no autoriza el despliegue productivo.
