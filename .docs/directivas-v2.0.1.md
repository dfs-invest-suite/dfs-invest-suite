[
  {
    'id': 'dfs-meta-001-p1',
    'category': 'governance',
    'title': 'fuente unica de verdad para directivas de desarrollo',
    'objective': 'asegurar consistencia normativa y claridad mediante un repositorio centralizado y autoritativo de reglas y protocolos.',
    'description': 'un banco de directivas centralizado debe ser establecido como la fuente unica de verdad para todas las reglas y protocolos que rigen el proceso de desarrollo y la colaboracion.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-fnd-001-p1',
    'category': 'governance',
    'title': 'resolucion jerarquica de conflictos entre directivas',
    'objective': 'garantizar coherencia y previsibilidad en la aplicacion de reglas mediante un mecanismo determinista de resolucion de conflictos.',
    'description': 'se debe establecer una jerarquia estricta para resolver conflictos entre directivas, basada en nivel de prioridad y categoria. los conflictos irresolubles deben escalarse.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-gov-001-p2',
    'category': 'governance',
    'title': 'proceso y formato estandar para creacion/propuesta de directivas',
    'objective': 'estandarizar la introduccion de nuevas reglas, asegurando que sean completas, consistentes, justificadas y formalmente validas.',
    'description': 'toda nueva directiva debe ser propuesta con una justificacion clara. debe seguir un esquema json con los campos: \'id\' (ej. \'dfs-cat-001-p1\'), \'category\' (ej. \'code_quality\'), \'title\' (titulo conciso), \'objective\' (proposito de la directiva), \'description\' (regla clara y directa), \'importance\' (\'alta\'|\'media\'|\'baja\'), y \'applicability\' (\'global\'|\'frontend\'|\'backend\'|\'database\'|\'security\'|\'performance\'). todo el contenido debe estar en minusculas, sin tildes ni caracteres especiales innecesarios, usando comillas simples. el json debe ser valido y legible.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-fnd-002-p1',
    'category': 'process',
    'title': 'prohibicion de asuncion de contexto o informacion no explicita',
    'objective': 'evitar errores basados en suposiciones incorrectas, asegurando que el desarrollo se base en informacion verificada y actualizada.',
    'description': 'la ia y los desarrolladores no deben asumir informacion, requisitos o estado del proyecto que no este explicitamente proporcionado o verificable. ante cualquier ambiguedad o falta de detalles, se debe solicitar clarificacion antes de proceder.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-fnd-003-p1',
    'category': 'process',
    'title': 'aplicacion sistematica y obligatoria de directivas',
    'objective': 'integrar el cumplimiento normativo en el flujo de trabajo para asegurar calidad, alineamiento y trazabilidad.',
    'description': 'antes de iniciar o revisar cualquier tarea significativa, se deben identificar, priorizar, sintetizar y aplicar todas las directivas relevantes. las decisiones basadas en directivas clave deben ser justificadas.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-002-p1',
    'category': 'ai_collaboration',
    'title': 'protocolo de entrega estandar para artefactos generados por ia',
    'objective': 'garantizar que cada entrega de la ia sea accionable, comprensible, contextualizada y fomente la mejora continua.',
    'description': 'cada entrega de la ia debe incluir: ruta relativa del artefacto, comandos de ejecucion/verificacion (o indicacion de no aplicabilidad), contenido completo del artefacto, explicacion tecnica (logica, directivas aplicadas), sugerencias proactivas y proximos pasos, y un reporte de auto-auditoria final.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-019-p1',
    'category': 'ai_collaboration',
    'title': 'entrega de codigo ia: completitud, explicitud y limpieza absolutas',
    'objective': 'asegurar que los artefactos entregados por la ia sean impecables, listos para aplicacion directa y sin ambiguedades.',
    'description': 'la ia debe entregar siempre el contenido integro y final del archivo afectado, con su ruta relativa explicita. se prohiben entregas parciales, referenciales u omisiones. el codigo entregado debe estar limpio de comentarios internos, excepto marcadores de ruta especificos si el estandar de entrega lo requiere.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-cod-001-p1',
    'category': 'code_quality',
    'title': 'completitud y funcionalidad del codigo entregado',
    'objective': 'asegurar que el codigo generado sea directamente aplicable, verificable y funcionalmente correcto.',
    'description': 'el codigo fuente entregado debe ser completo para la tarea solicitada, sintacticamente correcto, compilable/interpretable sin errores, e implementar la logica requerida de forma coherente. se prohiben fragmentos aislados, pseudocodigo (salvo para diseño) o stubs vacios.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-cod-002-p1',
    'category': 'code_quality',
    'title': 'soluciones definitivas y robustas (anti-parches)',
    'objective': 'eliminar proactivamente la introduccion de deuda tecnica y fomentar estandares de alta calidad y mantenibilidad.',
    'description': 'se deben proponer e implementar soluciones que aborden la causa raiz de los problemas de manera completa, robusta y mantenible. se prohiben soluciones temporales sin un plan de refactorizacion documentado, codigo comentado innecesariamente o violaciones de principios de diseño limpio sin justificacion.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-017-p1',
    'category': 'code_quality',
    'title': 'prohibicion absoluta de debilitar estandares de calidad para acomodar codigo',
    'objective': 'garantizar que los estandares de calidad sean un requisito fijo y no negociable, previniendo la degradacion de la calidad del codigo.',
    'description': 'esta estrictamente prohibido debilitar o relajar los estandares de calidad (linting, tipado, tests) con el proposito de hacer que un codigo especifico pase las verificaciones. el codigo debe ser corregido para cumplir con los estandares existentes.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-code-001-p2',
    'category': 'code_quality',
    'title': 'adherencia estricta a configuracion de linting y formateo',
    'objective': 'garantizar un nivel base absoluto de calidad, legibilidad y consistencia en toda la base de codigo.',
    'description': 'todo codigo fuente y artefactos textuales relevantes deben cumplir al 100% con las reglas de linting y formateo definidas. la ejecucion de los comandos de verificacion debe pasar sin errores ni advertencias.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-code-006-p1',
    'category': 'code_quality',
    'title': 'mantenimiento de estandares de tipado estricto',
    'objective': 'preservar la maxima seguridad de tipos y robustez del codigo, previniendo errores sutiles y deuda tecnica.',
    'description': 'prohibido modificar la configuracion de tipado estricto (ej. en typescript) para permitir codigo que viola las reglas. el codigo debe ser corregido para cumplir con el tipado; las reglas no deben ser debilitadas.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-arc-002-p1',
    'category': 'architecture',
    'title': 'comprension funcional y sistemica obligatoria en generacion/modificacion de codigo',
    'objective': 'asegurar que la ia opere con una vision holistica, generando soluciones tecnicamente correctas, funcionalmente solidas y alineadas con la estrategia del proyecto.',
    'description': 'antes de entregar cualquier artefacto de codigo, la ia debe demostrar una comprension profunda de su proposito, rol en el sistema, justificacion funcional y alineamiento con la arquitectura y el blueprint del proyecto, ademas de realizar un analisis de impacto riguroso.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-aut-007-p1',
    'category': 'ai_collaboration',
    'title': 'resolucion proactiva de errores y entrega de artefactos corregidos por ia',
    'objective': 'fomentar que la ia actue como una desarrolladora proactiva y solucionadora de problemas, minimizando la carga humana y la deuda tecnica pasiva.',
    'description': 'al identificar un error o desviacion de calidad, la ia debe analizar la causa raiz y, si puede conceptualizar una solucion alineada con las directivas, debe proponer y generar inmediatamente los artefactos corregidos. no debe registrar deuda tecnica por problemas que puede resolver, a menos que sea un workaround inevitable autorizado.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-aut-005-p1',
    'category': 'ai_collaboration',
    'title': 'proactividad obligatoria ia en ejecucion y propuesta de pasos',
    'objective': 'asegurar que la ia opere un paso adelante, facilitando el flujo de trabajo y minimizando la micro-gestion humana.',
    'description': 'la ia debe anticipar y ejecutar/proporcionar pasos preliminares necesarios para que sus propuestas sean directamente aplicables. cada respuesta relevante debe concluir proponiendo el siguiente paso logico y accionable. debe resolver dependencias conocidas y corregir errores propios proactivamente.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-aut-006-p1',
    'category': 'ai_collaboration',
    'title': 'ejecucion inmediata del siguiente paso accionable propuesto por ia',
    'objective': 'maximizar la eficiencia del ciclo de desarrollo y la autonomia de la ia.',
    'description': 'tras proponer un plan o identificar un siguiente paso accionable (y con direccion general humana confirmada o si es una correccion evidente), la ia debe proceder inmediatamente a generar y entregar los artefactos del primer paso, sin esperar confirmacion adicional para ese paso especifico.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-cmd-001-p1',
    'category': 'ai_collaboration',
    'title': 'entrega de secuencias de comandos en bloque unico y limpio',
    'objective': 'garantizar que las secuencias de comandos entregadas por la ia sean inmediatamente ejecutables y libres de errores por formato.',
    'description': 'todos los comandos de una secuencia logica deben entregarse dentro de un unico bloque de codigo, un comando por linea, sin comentarios internos, texto explicativo ni prompts de consola. las explicaciones deben ir fuera del bloque.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-022-p1',
    'category': 'ai_collaboration',
    'title': 'provision obligatoria de comandos para ejecucion humana en formato estricto',
    'objective': 'asegurar que cualquier instruccion de ejecucion de comandos para el desarrollador sea inequivoca y directamente accionable.',
    'description': 'cuando la ia requiera que el desarrollador ejecute comandos en terminal, debe proporcionar los comandos exactos en un bloque de codigo siguiendo el formato estricto (un comando por linea o secuencia en bloque unico, sin ruido).',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-012-p1',
    'category': 'ai_collaboration',
    'title': 'auditoria rigurosa pre-entrega ia y reporte obligatorio',
    'objective': 'prevenir errores recurrentes y asegurar la maxima calidad y cumplimiento normativo en cada entrega de la ia.',
    'description': 'antes de entregar cualquier artefacto, la ia debe realizar una auto-auditoria final detallada verificando errores comunes y directivas criticas (sintaxis, completitud, formato, protocolo de entrega, etc.). debe reportar el resultado de esta auditoria al final de cada respuesta relevante. la ia no debe entregar si un punto de la auditoria falla, sino auto-corregirse o escalar.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-env-002-p1',
    'category': 'devops',
    'title': 'uso exclusivo de un unico gestor de paquetes y ejecutor de scripts designado',
    'objective': 'garantizar consistencia en el entorno y simplificar comandos.',
    'description': 'se debe utilizar exclusivamente el gestor de paquetes y ejecutor de scripts designado (ej. bun, pnpm) para todas las operaciones de gestion de dependencias y ejecucion de scripts. se prohibe el uso de otros gestores (npm, yarn) a menos que sea absolutamente inevitable y aprobado.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-tst-010-p1',
    'category': 'testing',
    'title': 'tests unitarios exhaustivos antes de implementacion de logica core',
    'objective': 'garantizar que la logica de negocio critica se desarrolle estrictamente segun requisitos y sea validada desde el principio.',
    'description': 'antes de implementar logica de negocio significativa en el core, se debe definir su contrato y escribir primero tests unitarios que cubran exhaustivamente todos los requisitos, casos de uso y condiciones de borde. la implementacion se escribe para hacer pasar estos tests predefinidos. prohibido ajustar tests para acomodar una implementacion.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-014-p1',
    'category': 'process',
    'title': 'verificacion obligatoria de prerrequisitos de comandos externos/generadores',
    'objective': 'prevenir errores por proponer comandos que fallaran debido a herramientas no instaladas, opciones invalidas o archivos faltantes.',
    'description': 'antes de proponer cualquier comando que invoque una herramienta externa o generador, se debe verificar en el contexto actual: la disponibilidad de la herramienta/plugin, la validez de todas las opciones/flags usadas, y la existencia de archivos de entrada requeridos.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-git-004-p2',
    'category': 'devops',
    'title': 'generacion obligatoria de comando `git commit` formateado por ia',
    'objective': 'automatizar la generacion de mensajes de commit consistentes y agilizar el flujo de trabajo del desarrollador.',
    'description': 'al finalizar tareas que resulten en cambios listos para comitear, la ia debe proponer el comando `git commit` completo, con un mensaje que siga estrictamente la especificacion conventional commits y refleje con precision los cambios.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-dom-001-p3',
    'category': 'architecture',
    'title': 'uso de puertos (interfaces) y tokens de inyeccion para dependencias del dominio',
    'objective': 'garantizar el desacoplamiento entre la logica de negocio y los detalles de infraestructura, facilitando la testeabilidad y flexibilidad.',
    'description': 'toda dependencia externa requerida por el core (dominio, aplicacion) debe ser definida como un puerto (interfaz). el core interactuara exclusivamente con estos puertos. cada puerto debe tener un token de inyeccion asociado.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-021-p1',
    'category': 'process',
    'title': 'solicitud y procesamiento obligatorio del estado de salud del proyecto (esp)',
    'objective': 'prevenir regresiones y trabajo sobre supuestos incorrectos, asegurando que la ia opere con conocimiento actualizado del estado funcional del proyecto.',
    'description': 'al iniciar/reanudar tareas o antes de proponer soluciones a problemas complejos, la ia debe solicitar la ejecucion y resultados de un conjunto definido de comandos de "estado de salud del proyecto" y procesar esta informacion antes de proceder.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-style-001-p1',
    'category': 'code_quality',
    'title': 'principios de estilo de codificacion para claridad y robustez',
    'objective': 'minimizar errores por configuraciones implicitas o interacciones ambiguas, mejorando la predictibilidad y mantenibilidad.',
    'description': 'preferir configuracion explicita sobre implicita. distinguir claramente tipo/valor en imports. aislar dependencias en tests unitarios. usar alias de forma consistente. priorizar soluciones de configuracion estandar antes de workarounds drasticos.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-doc-002-p3',
    'category': 'documentation',
    'title': 'documentacion del modelo de colaboracion humano-ia',
    'objective': 'asegurar claridad y entendimiento compartido sobre roles, responsabilidades y flujo de trabajo en la colaboracion.',
    'description': 'mantener un documento formal que describa los roles, responsabilidades, protocolos de comunicacion y flujo de trabajo general entre desarrolladores humanos y la ia.',
    'importance': 'baja',
    'applicability': 'global'
  },
  {
    'id': 'dfs-design-002-p2',
    'category': 'architecture',
    'title': 'diseño orientado a la testeabilidad para componentes de software',
    'objective': 'reducir la complejidad de los tests y facilitar pruebas fiables y aisladas de la logica de negocio e interaccion con sistemas externos.',
    'description': 'los componentes de software (adaptadores, entidades, servicios) deben diseñarse priorizando su facilidad de prueba, mediante inyeccion de dependencias clara, configurabilidad para tests y metodos de fabricacion/reconstitucion claros para entidades complejas.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-015-p1',
    'category': 'governance',
    'title': 'estandares fundamentales de desarrollo, calidad y colaboracion',
    'objective': 'garantizar la maxima calidad, consistencia, mantenibilidad, seguridad y eficiencia en todo el ciclo de vida del desarrollo.',
    'description': 'establece los estandares obligatorios y no negociables para todo el desarrollo de codigo, configuracion, testing, documentacion y colaboracion, consolidando y reforzando aspectos criticos de otras directivas.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-tst-008-p2',
    'category': 'testing',
    'title': 'cobertura obligatoria de caminos logicos en tests unitarios criticos',
    'objective': 'garantizar una cobertura de pruebas unitarias profunda y significativa para la logica de negocio critica, mas alla de la simple cobertura de lineas.',
    'description': 'los tests unitarios para servicios considerados criticos deben incluir casos de prueba que verifiquen explicitamente cada camino logico distinto que pueda resultar en un retorno o una decision final diferente dentro del codigo bajo prueba.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-016-p1',
    'category': 'ai_collaboration',
    'title': 'entrega con comentarios de ruta inicio/fin en bloques de codigo por ia',
    'objective': 'eliminar cualquier ambiguedad sobre a que archivo pertenece un bloque de codigo entregado por la ia.',
    'description': 'al entregar cualquier bloque de codigo, la ia debe incluir un comentario en la primera y ultima linea dentro del bloque, indicando la ruta relativa completa del archivo (ej. `// ./libs/feature/file.ext`). excepcion: archivos json.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-tst-011-p1',
    'category': 'testing',
    'title': 'separacion estricta de codigo de implementacion y test',
    'objective': 'garantizar la claridad, mantenibilidad y correcta ejecucion del codigo y los tests, previniendo errores por mezcla de contextos.',
    'description': 'se debe mantener una separacion estricta entre el codigo de implementacion y el codigo de los tests unitarios/integracion. se prohibe incluir constructos especificos de frameworks de testing o mocks/stubs de testing dentro de archivos que no sigan el patron de nomenclatura de tests.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-020-p1',
    'category': 'process',
    'title': 'protocolo de gestion para bloqueos causados por herramientas externas o entorno',
    'objective': 'garantizar la continuidad del desarrollo y la mantenibilidad de los estandares de calidad ante bloqueos externos.',
    'description': 'establece el protocolo a seguir cuando un bloqueo funcional o de calidad es causado por una incompatibilidad, bug o limitacion en una herramienta externa o entorno, y cuya solucion inmediata no es viable. incluye diagnostico, busqueda de soluciones, evaluacion de workarounds, documentacion como deuda tecnica y planificacion de resolucion definitiva.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-019-p3',
    'category': 'ai_collaboration',
    'title': 'estructura para propuestas proactivas y pasos siguientes en entregas ia',
    'objective': 'estandarizar la forma en que la ia comunica proactivamente informacion relevante mas alla de la tarea inmediata, facilitando la toma de decisiones del desarrollador.',
    'description': 'define la estructura y contenido esperado para la seccion \'sugerencias proactivas/proximos pasos\' dentro del protocolo de entrega ia, incluyendo proximos pasos del roadmap, deuda tecnica relacionada, propuestas de mejora y riesgos potenciales.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-dep-001-p2',
    'category': 'devops',
    'title': 'gestion rigurosa de version exacta de gestor de paquetes',
    'objective': 'garantizar que todos los desarrolladores y entornos usen exactamente la misma version del gestor de paquetes, eliminando errores de reproducibilidad.',
    'description': 'el archivo de definicion de dependencias (ej. `package.json`) debe especificar la version exacta del gestor de paquetes (ej. bun) verificada para el proyecto, usualmente en un campo como `packagemanager`. prohibe rangos o ausencia de este campo.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-dep-002-p2',
    'category': 'devops',
    'title': 'obligatoriedad de lockfile congelado en gestion de paquetes',
    'objective': 'garantizar maxima reproducibilidad de dependencias (directas y transitivas) en todos los entornos.',
    'description': 'la opcion de instalacion con lockfile congelado (ej. `frozenlockfile = true`) debe estar siempre configurada o utilizada por defecto en la instalacion de dependencias, especialmente en ci/produccion. excepcion: se permite desactivarlo temporalmente solo durante la adicion/actualizacion interactiva de paquetes, debiendo revertirse antes de comitear.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-sec-001-p2',
    'category': 'security',
    'title': 'anonimizacion obligatoria de datos sensibles en artefactos no productivos',
    'objective': 'proteger la confidencialidad de la informacion del cliente y sus operaciones en artefactos con visibilidad amplia o menor control de acceso.',
    'description': 'exige la sustitucion obligatoria de cualquier dato potencialmente sensible o privado por el placeholder `<reserved>` o un equivalente generico en todos los artefactos generados que no sean codigo fuente operativo o configuracion segura de secretos. incluye documentacion, logs, mensajes de error expuestos, ejemplos y nombres de archivo/directorio si revelan info sensible.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-cfg-003-p2',
    'category': 'security',
    'title': 'gestion segura de tokens de servicios en la nube via variables de entorno',
    'objective': 'prevenir exposicion accidental de tokens sensibles de servicios en la nube.',
    'description': 'prohibe estrictamente comitear tokens de acceso de servicios en la nube (ej. tokens de api de terceros). estos tokens deben gestionarse exclusivamente a traves de variables de entorno tanto en entornos locales como en ci/cd.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-code-004-p3',
    'category': 'code_quality',
    'title': 'gestion proactiva de reglas de linting deshabilitadas o con advertencias',
    'objective': 'evitar la acumulacion permanente de excepciones a las reglas de calidad estatica y fomentar la mejora continua.',
    'description': 'requiere un proceso de revision periodica de las reglas de linting configuradas explicitamente como \'off\' o \'warn\'. el objetivo es evaluar si la justificacion original sigue siendo valida o si es posible/deseable promover la regla a \'error\'. la decision debe documentarse.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-code-005-p2',
    'category': 'code_quality',
    'title': 'uso obligatorio de configuracion de linting base estricta y reconocida',
    'objective': 'imponer un estandar de codificacion de alta calidad, estricto, consistente y basado en buenas practicas reconocidas.',
    'description': 'la configuracion base para linting debe implementar reglas equivalentes a estandares reconocidos (ej. airbnb-typescript) y añadir plugins especializados (ej. import, security, sonarjs, perfectionist, prettier). las reglas base solo pueden desactivarse/modificarse siguiendo un proceso de justificacion y aprobacion.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-err-001-p1',
    'category': 'process',
    'title': 'entrega de correcciones ia como archivo completo',
    'objective': 'garantizar la aplicacion precisa y sin errores de las correcciones por parte del desarrollador.',
    'description': 'al proporcionar una correccion para un error identificado en un archivo existente, la ia debe entregar siempre el contenido completo y actualizado del archivo afectado. prohibido entregar solo el fragmento modificado, un diff, o instrucciones textuales sobre como modificarlo.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-err-003-p1',
    'category': 'process',
    'title': 'prioridad absoluta a correccion de errores bloqueantes',
    'objective': 'mantener una base de codigo estable, funcional y desplegable.',
    'description': 'cualquier error que impida la compilacion/build exitoso, la ejecucion exitosa de la suite de tests principal en ci, o el funcionamiento de una funcionalidad critica en produccion, debe ser resuelto con prioridad absoluta sobre cualquier desarrollo de nuevas funcionalidades.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-err-005-p2',
    'category': 'process',
    'title': 'preservacion rigurosa de funcionalidad en correcciones (anti-regresion)',
    'objective': 'prevenir activamente la introduccion de regresiones funcionales al corregir errores.',
    'description': 'al implementar una correccion para un bug especifico, es obligatorio asegurar (mediante analisis de impacto y ejecucion de tests relevantes) que la funcionalidad existente no directamente relacionada con el bug permanece intacta y funcionando correctamente. si la correccion requiere un cambio en otra funcionalidad, debe documentarse explicitamente.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-ana-001-p1',
    'category': 'architecture',
    'title': 'analisis de impacto holistico previo a modificacion de codigo',
    'objective': 'prevenir regresiones funcionales y no funcionales, y tomar decisiones de modificacion informadas.',
    'description': 'antes de proponer o generar cualquier modificacion a codigo existente, se debe realizar y presentar un resumen conciso del analisis de impacto potencial. este analisis debe considerar como minimo: consumidores, dependencias, contratos (apis, interfaces, schemas), tests afectados, y posibles efectos colaterales (performance, seguridad, ui, logica de negocio).',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-com-002-p1',
    'category': 'documentation',
    'title': 'comunicacion directa y enfocada (sin ruido)',
    'objective': 'maximizar la eficiencia de la comunicacion asincrona y optimizar el tiempo de lectura y procesamiento del desarrollador.',
    'description': 'la comunicacion textual, especialmente la generada por la ia, debe ser directa al punto, concisa y enfocada estrictamente en la tarea tecnica o el analisis solicitado. se deben evitar saludos/despedidas (excepto formalidad inicial), frases de cortesia innecesarias, disculpas genericas y cualquier otro texto de relleno.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-com-003-p1',
    'category': 'documentation',
    'title': 'idioma principal: texto en idioma acordado, codigo/logs/errores en ingles',
    'objective': 'asegurar la maxima claridad en la comunicacion estrategica y explicativa, y mantener el estandar global para la base de codigo.',
    'description': 'toda la comunicacion textual entre ia y desarrollador (explicaciones, analisis, etc.) debe realizarse exclusivamente en el idioma acordado claro y preciso. todo el codigo fuente (nombres de variables/funciones, comentarios tecnicos, mensajes de log, mensajes de error) y los terminos tecnicos deben estar exclusivamente en ingles.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-com-006-p2',
    'category': 'documentation',
    'title': 'instrucciones de ejecucion precisas, compatibles y con ruta raiz',
    'objective': 'eliminar cualquier ambiguedad sobre donde/como ejecutar un comando o localizar un archivo dentro del proyecto.',
    'description': 'cualquier comando shell o ruta a un archivo/directorio mencionado debe presentarse siempre con la ruta relativa completa desde la raiz del proyecto, ser sintacticamente correcto y compatible con el entorno de ejecucion primario definido, y estar listo para copiar/pegar directamente en la terminal.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-com-007-p1',
    'category': 'documentation',
    'title': 'validacion rigurosa de sintaxis y escapado en comandos para el shell de referencia',
    'objective': 'eliminar errores de ejecucion triviales en el shell de referencia (ej. powershell) causados por sintaxis/quoting/escapado incorrecto.',
    'description': 'al generar cualquier comando o snippet para el shell de referencia, se debe aplicar rigurosamente la sintaxis correcta, prestando atencion critica a quoting (preferir simples para evitar expansion), escapado (ej. backticks en powershell), interpretacion de caracteres especiales, y metodo seguro de invocacion externa.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-git-002-p2',
    'category': 'devops',
    'title': 'uso obligatorio de conventional commits',
    'objective': 'habilitar generacion automatica de changelogs, facilitar versionado semantico, mejorar legibilidad del historial git y permitir automatizacion en ci/cd.',
    'description': 'todos los mensajes de commit deben seguir estrictamente la especificacion conventional commits (ej. `<tipo>(<scope>): <subject>`). esto incluye el uso de tipos estandar, un scope opcional (idealmente de un enum definido), un subject conciso, y opcionalmente un body y/o footer para `breaking change` o referencias a issues.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-code-007-p2',
    'category': 'code_quality',
    'title': 'proceso controlado para ajustes justificados de reglas de linting base',
    'objective': 'permitir ajustes necesarios a las reglas base de linting de forma controlada, documentada y justificada, sin violar la prohibicion de debilitar estandares.',
    'description': 'define el proceso para desactivar (`off`) o modificar la severidad de reglas especificas heredadas en la configuracion de linting. cualquier cambio debe ser granular, incluir un comentario en la configuracion con una razon tecnica breve, y si la justificacion es compleja, permanente o una desviacion significativa, debe documentarse en un registro de decisiones arquitectonicas (adr) y ser aprobado explicitamente.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-013-p1',
    'category': 'governance',
    'title': 'auditoria interna rigurosa pre-generacion json contra schema',
    'objective': 'prevenir la generacion de json (ej. para directivas) que viole restricciones definidas en su schema, asegurando consistencia formal.',
    'description': 'es obligatorio para la ia realizar una validacion interna exhaustiva contra el schema json aplicable antes de generar el json final. esta validacion debe verificar sintaxis, claves, patrones en strings, valores enum (sensible a mayusculas), que cada elemento en arrays con restricciones cumpla dichas restricciones, y la presencia de todos los campos requeridos.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-001-p1',
    'category': 'process',
    'title': 'confirmacion humana simple para continuar workflow',
    'objective': 'agilizar la interaccion ia-desarrollador para validaciones simples, definiendo una señal minima de "luz verde".',
    'description': 'en flujos de trabajo donde la ia completa una entrega y espera validacion/instruccion para continuar, el desarrollador puede usar \'ok\' (o señal simple equivalente) como confirmacion minima para que la ia proceda. excepcion: invalida si la salida previa de la ia contenia preguntas o solicitudes de clarificacion.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-003-p1',
    'category': 'ai_collaboration',
    'title': 'formato estricto para entrega de codigo ia',
    'objective': 'garantizar la maxima claridad, precision y facilidad de aplicacion para el desarrollador, eliminando ambiguedad sobre el artefacto entregado.',
    'description': 'la ia debe entregar siempre el contenido completo y autocontenido del archivo, incluir la ruta relativa completa antes y despues del bloque de codigo. excepcion: no incluir comentarios de ruta en archivos json. no incluir encabezados de copyright a menos que se indique explicitamente.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-004-p1',
    'category': 'process',
    'title': 'manejo obligatorio de confirmaciones humanas ambiguas',
    'objective': 'prevenir acciones incorrectas basadas en la interpretacion ambigua de una confirmacion humana simple.',
    'description': 'si la respuesta humana a una salida de la ia es una confirmacion simple como \'ok\', pero la salida previa de la ia contenia preguntas explicitas, solicitudes de clarificacion o propuestas alternativas, la ia debe detenerse y solicitar explicitamente a que se refiere el \'ok\' antes de proceder.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-005-p1',
    'category': 'process',
    'title': 'modificacion quirurgica y preservacion de contexto en archivos existentes',
    'objective': 'prevenir perdida accidental de informacion/logica y garantizar cambios minimos, especificos y faciles de verificar.',
    'description': 'al modificar un archivo existente, operar exclusivamente sobre el contenido completo del archivo del ultimo contexto confirmado, identificar las lineas/bloques minimos a alterar, asegurar que todo el resto del archivo permanezca identico, y no introducir cambios colaterales no solicitados. entregar el contenido completo del archivo modificado.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-006-p1',
    'category': 'governance',
    'title': 'proceso estandar para propuesta de nuevas directivas por ia',
    'objective': 'estandarizar como la ia contribuye al marco normativo, asegurando propuestas completas, estructuradas, justificadas y formalmente validas.',
    'description': 'la ia, al proponer una nueva directiva, debe: identificar la necesidad, redactar un borrador json completo conforme al formato estandar, validar internamente contra el schema de directivas, justificar la propuesta, y presentar el json valido y la justificacion en la seccion designada de su respuesta, solicitando revision humana.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-012-p1',
    'category': 'process',
    'title': 'verificacion rigurosa humana pre-commit/aceptacion (control calidad final)',
    'objective': 'actuar como punto de control de calidad final y compuerta de integracion, previniendo errores o deuda tecnica/normativa.',
    'description': 'antes de cualquier `git commit` de artefactos generados/modificados por ia, o antes de aceptar una base generada, el desarrollador tiene la responsabilidad obligatoria de realizar una verificacion exhaustiva. esta incluye como minimo: analisis estatico ide, ejecucion de formateador, ejecucion de linter, ejecucion de build del proyecto afectado, ejecucion de tests relevantes y revision manual de logica/funcionalidad vs requisitos/directivas.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-ctx-011-p1',
    'category': 'process',
    'title': 'uso obligatorio de snapshots de codigo actualizados como contexto ia',
    'objective': 'garantizar que la ia opere sobre la base de codigo real y actual ("ground truth"), evitando errores por desincronizacion.',
    'description': 'la ia debe basar todo su analisis, generacion de codigo y propuestas de refactoring exclusivamente en el ultimo snapshot completo del codigo fuente proporcionado y confirmado explicitamente por el desarrollador. prohibido operar sobre memoria interna desactualizada o asumir estado del codigo no presente en el snapshot actual.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-ctx-012-p2',
    'category': 'process',
    'title': 'solicitud proactiva de snapshot por ia ante incertidumbre o bloqueo',
    'objective': 'dotar a la ia de un mecanismo formal para resolver incertidumbres y bloqueos tecnicos solicitando la vision directa del estado actual.',
    'description': 'la ia debe solicitar proactivamente al desarrollador un snapshot actualizado (completo o parcial) si tiene dudas razonables sobre el estado actual del codigo, sospecha de errores externos que requieren verificacion de codigo real, o enfrenta un bloqueo tecnico que necesita analisis de codigo interconectado real.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-008-p1',
    'category': 'ai_collaboration',
    'title': 'verificacion proactiva de integridad en entregas multi-respuesta ia',
    'objective': 'garantizar que la ia opere sobre artefactos que considera completos/validos antes de pedir accion humana, minimizando carga al desarrollador.',
    'description': 'cuando la ia entrega un artefacto en multiples partes (debido a limites de longitud de respuesta), es obligatorio que, antes de pedir accion humana sobre el artefacto completo, intente una consolidacion y verificacion interna de la integridad del artefacto consolidado (sintaxis, schema, completitud). debe comunicar el resultado de esta verificacion (exito, o fallo/imposibilidad de verificar) antes de solicitar la consolidacion o validacion manual por parte del desarrollador. nunca debe asumir la consolidacion humana por defecto sin haber intentado una verificacion interna.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-013-p1',
    'category': 'ai_collaboration',
    'title': 'comando de ejecucion/verificacion explicito post-entrega de artefacto por ia',
    'objective': 'garantizar usabilidad/verificabilidad inmediata de cualquier artefacto textual entregado por la ia.',
    'description': 'inmediatamente despues de entregar cualquier artefacto textual (codigo, script, config, schema, directiva), la ia debe proporcionar una seccion separada, usualmente titulada `### comandos a ejecutar` (si el artefacto es directamente ejecutable) o `### comandos de verificacion` (si el artefacto es validable, como un json contra un schema, o codigo contra un linter). estos comandos deben ser exactos, completos, ejecutables desde la raiz del proyecto, y respetar la sintaxis del entorno de referencia. si no aplica ejecucion ni verificacion directa, se debe indicar explicitamente (ej. `no aplica ejecucion/verificacion.`).',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-015-p1',
    'category': 'process',
    'title': 'checklist mental obligatorio de directivas fundamentales pre-entrega/commit',
    'objective': 'integrar la aplicacion consciente de las directivas mas criticas en puntos clave del workflow, previniendo errores por omision normativa.',
    'description': 'establece como obligatorio para todos (desarrollador e ia) realizar un "checklist mental" (o explicito si es necesario) verificando la adherencia a las directivas de prioridad p1/p2 relevantes antes de considerar una tarea completada, realizar un `git commit`, o aprobar/mergear un pull request. el checklist minimo debe cubrir: aplicacion general de directivas, calidad del artefacto, testing minimo, consideraciones de seguridad, cumplimiento del workflow de entrega (para ia), y formato del mensaje de commit.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-meta-009-p2',
    'category': 'ai_collaboration',
    'title': 'proceso optimizado de generacion ia (analisis predictivo y checklist interno)',
    'objective': 'optimizar la eficiencia y calidad de la generacion de artefactos por la ia, reduciendo correcciones por errores previsibles y haciendo a la ia mas "consciente" del entorno y buenas practicas.',
    'description': 'establece un proceso interno obligatorio para la ia al generar artefactos, emulando un desarrollo planificado: 1) analisis de requisitos y directivas. 2) diseño conceptual del artefacto. 3) analisis predictivo del entorno (especialmente para scripts, considerando quoting, escaping, ejecucion externa, manejo de errores, paths). 4) generacion estructurada del artefacto. 5) auto-auditoria pre-entrega detallada (sintaxis, completitud, robustez, formato, seguridad, tests minimos, comandos). 6) entrega conforme al protocolo establecido.',
    'importance': 'media',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-016-p1',
    'category': 'ai_collaboration',
    'title': 'entrega completa, ejecutable y verificable para todo artefacto textual por ia',
    'objective': 'eliminar cualquier carga cognitiva o manual para el desarrollador sobre como usar, verificar o ejecutar los artefactos entregados por la ia.',
    'description': 'actua como una directiva de maxima prioridad. cualquier artefacto textual entregado por la ia (codigo, script, configuracion, documentacion) debe ser inmediatamente verificable y/o ejecutable. esto significa que nunca se deben omitir secciones del protocolo de entrega estandar (dfs-wf-002-p1). especificamente, el contenido del archivo debe ser 100% completo y autocontenido (incluyendo imports/exports), la ruta relativa debe ser clara y presente antes y despues del bloque (excepto json), y deben incluirse comandos explicitos de ejecucion (si es ejecutable) o comandos de verificacion (si es validable, como json vs schema), o una indicacion explicita de que no aplica ejecucion/verificacion.',
    'importance': 'alta',
    'applicability': 'global'
  },
  {
    'id': 'dfs-wf-017-p1',
    'category': 'process',
    'title': 'sobrescritura obligatoria de archivos existentes (anti-versionado de nombres en commits)',
    'objective': 'evitar proliferacion de archivos con nombres versionados en el repositorio, asegurar que se trabaje sobre la ultima version canonica y simplificar el workflow de aplicacion de cambios.',
    'description': 'al entregar una version corregida o actualizada de un artefacto textual existente (codigo, script, configuracion, documento), la ia (o el desarrollador) debe entregar/modificar el contenido para sobrescribir el archivo original, utilizando la misma ruta relativa. se prohibe crear archivos con nombres versionados (ej. `script-v2.ps1`, `config_old.json`) como forma de mantener historial dentro del sistema de archivos, para eso esta el control de versiones (git). la unica excepcion es si el prompt o tarea pide explicitamente crear un archivo *nuevo* con un nombre distinto.',
    'importance': 'alta',
    'applicability': 'global'
  }
]