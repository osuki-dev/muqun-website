import type { UserGuide } from './types';

export const es: UserGuide = {
  metaTitle: 'Guía de usuario y referencia de Muqun',
  metaDescription:
    'Guía completa para instalar el Gateway, emparejar tu teléfono, espacios de trabajo, barra de teclas del terminal, agente OpenCode, temas y resolución de problemas.',
  hero: {
    badge: 'GUÍA DE USUARIO · MANUAL DE REFERENCIA',
    heading: 'Todo lo que necesitas para tener tu máquina siempre a mano.',
    lead: 'Muqun conecta tu teléfono directamente a tu propio ordenador o servidor. Aprende a instalar y configurar el Gateway, navegar por tus terminales, dirigir el agente autónomo OpenCode, instalar temas y resolver problemas de conexión.',
    startCta: 'Empezar ↓',
    diagnosticsCta: 'Diagnóstico ↓',
    issueCta: 'Abrir una incidencia',
  },
  contentsLabel: 'En esta página',
  contents: [
    {
      id: 'get-started',
      label: 'Primeros pasos',
      nav: 'Inicio',
      meta: 'Procedimiento · ~5 min',
      desc: 'Instalar el Gateway, elegir modo de inicio, emparejamiento QR y tailnet.',
    },
    {
      id: 'terminal',
      label: 'El terminal',
      nav: 'Terminal',
      meta: 'tmux · herdr',
      desc: 'Espacios de trabajo, grupos, paneles, barra de teclas móviles y herramientas.',
    },
    {
      id: 'opencode',
      label: 'El agente OpenCode',
      nav: 'Agente',
      meta: 'Agente autónomo',
      desc: 'Servicio de agente local, modelos, llamadas a herramientas con diff y permisos.',
    },
    {
      id: 'gateway',
      label: 'Configurar el Gateway',
      nav: 'Pasarela',
      meta: 'Referencia config.json',
      desc: 'Claves de configuración, puertos, modos de servicio, autoarranque y atajos.',
    },
    {
      id: 'themes',
      label: 'Temas',
      nav: 'Temas',
      meta: '24 paquetes incluidos',
      desc: 'Temas visuales, formato .muqun-theme, controles de opacidad y creación.',
    },
    {
      id: 'troubleshooting',
      label: 'Resolución de problemas',
      nav: 'Depuración',
      meta: 'Diagnóstico y comprobaciones',
      desc: 'Verificaciones rápidas, errores de emparejamiento, códigos caducados y soluciones.',
    },
    {
      id: 'contact',
      label: 'Contacto',
      nav: 'Contacto',
      meta: 'github · issues',
      desc: 'Lista para informes de errores, pautas de privacidad y seguridad.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Instala el Gateway y empareja tu teléfono.',
    lead: 'Muqun se comunica con un único programa en tu propio ordenador: el Gateway. Lo instalas allí, lo inicias y vinculas el teléfono una sola vez. No se requiere cuenta y nada tuyo pasa por nuestros servidores.',
    steps: [
      {
        title: 'Ejecuta el instalador en tu ordenador',
        body: 'Coloca un binario único en ~/.local/bin/muqun-gateway, lo configura y abre la pantalla de emparejamiento en la primera ejecución. Compatible con macOS y Linux (Windows aún no está soportado).',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: 'Inícialo de una de estas dos formas',
        body: 'Puedes iniciarlo tú mismo o dejar que el sistema lo mantenga activo en segundo plano. Ambas opciones dejan el Gateway en funcionamiento; difieren en cómo responden al reiniciar el equipo.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              'Se ejecuta en segundo plano y continúa activo tras cerrar el terminal, hasta que el ordenador se reinicie. muqun-gateway stop lo detiene.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              'Lo registra en el sistema de inicio de tu usuario (systemd en Linux, LaunchAgent en macOS). Arranca al iniciar sesión y se recupera tras reinicios o caídas. muqun-gateway service uninstall elimina el servicio conservando los emparejamientos.',
          },
        ],
        note: 'Elige solo una: si el servicio está instalado, detenerlo con stop será revertido de inmediato por el supervisor.',
      },
      {
        title: 'Abre el administrador de emparejamiento',
        body: 'Sin importar el modo de inicio, este es el siguiente paso. El administrador es un panel a pantalla completa en el terminal que muestra el código QR, los procesos y los dispositivos con token activo.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: 'Escanea e introduce el código',
        body: 'Escanea el código QR desde Muqun. El ordenador mostrará un código corto en formato XXXX-XXXX; introducirlo en la app completa el emparejamiento. Escanear no basta por sí solo: el código confirma tu identidad.',
      },
    ],
    requirements: [
      'macOS o Linux en un ordenador propio (Windows no está soportado todavía).',
      'tmux o Herdr 0.7.5 o superior ya instalado (el Gateway los maneja, no los sustituye).',
      'Ambos dispositivos en la misma red privada. Tailscale es la opción recomendada (usa Tailscale Serve, nunca Funnel).',
      'Sin cuentas, sin suscripciones y sin servidores intermediarios nuestros.',
    ],
    pairingNote:
      '¿No puedes escanear? Escribe la dirección del Gateway manualmente en la app (el administrador muestra la dirección pública) e introduce el mismo código corto.',
    codeNote:
      'El código es válido durante 5 minutos y se anula tras 8 intentos fallidos. Pulsa p en el administrador para generar un nuevo QR y código.',
    networkBadge: 'RED PRIVADA RECOMENDADA',
    networkHeading: 'Usa Tailscale en ambos dispositivos.',
    networkBody:
      'Recomendamos encarecidamente conectar el teléfono y el ordenador del Gateway a la misma tailnet de Tailscale. Evita abrir puertos en el router y protege el Gateway de la red pública. Tailscale Serve puede añadir una dirección HTTPS privada (no utilices Tailscale Funnel con Muqun).',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Configurar el Gateway.',
    lead: 'La mayoría de usuarios no necesitan abrir la configuración. Está disponible para casos concretos: cambiar de puerto, mantener el Gateway tras un reinicio o usar una ruta no estándar para OpenCode.',
    configHeading: 'El archivo de configuración',
    configBody:
      'Es un archivo JSON generado durante la instalación. Modifícalo manualmente solo cuando necesites ajustar las claves indicadas y reinicia el Gateway después. En macOS se ubica en ~/Library/Application Support/muqun-gateway/. Los dispositivos vinculados y registros se guardan en ~/.local/share/muqun-gateway/.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'El nombre que la aplicación muestra para este ordenador.' },
      {
        term: 'listen',
        detail:
          'El socket al que se vincula (host y puerto). Por defecto 0.0.0.0:23847 (o 127.0.0.1 si la dirección publicada es local).',
      },
      {
        term: 'public_url',
        detail:
          'La dirección codificada en el QR de emparejamiento. Es preferible modificarla pulsando u en el administrador.',
      },
      {
        term: 'transport_encryption',
        detail:
          'Cifrado de transporte, por defecto required. Se aplica a los dispositivos vinculados en el futuro sin alterar los existentes.',
      },
      {
        term: 'sessions',
        detail:
          'Los motores de terminal que este Gateway monta (tmux, Herdr o ambos). Se gestiona con muqun-gateway backend.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Cuáles de ellos inician con el Gateway. Vacío por defecto para evitar lanzamientos involuntarios.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          'Desactivado por defecto. Si se activa, las preguntas del agente se insertan en el cuerpo de la notificación (mostrando texto del terminal en la pantalla de bloqueo).',
      },
      {
        term: 'opencode.autostart',
        detail:
          'Activado por defecto: el Gateway inicia OpenCode si no detecta ninguno en ejecución. Desactívalo con "opencode": { "autostart": false }.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Ruta al binario de OpenCode. Si se omite, se busca en ~/.opencode/bin o en tu PATH.',
      },
    ],
    portsHeading: 'Puertos y enlaces',
    portsRows: [
      { term: 'Por defecto', detail: 'Un único puerto TCP: 23847.' },
      { term: 'Cambiarlo', detail: 'Ejecuta muqun-gateway setup --port N y reinicia.' },
      {
        term: 'Dónde escucha',
        detail:
          '127.0.0.1 si la dirección es loopback, 0.0.0.0 en los demás casos.',
      },
      {
        term: 'En una tailnet',
        detail: 'No requiere abrir puertos en el router, por eso lo recomendamos.',
      },
    ],
    modesHeading: 'Dos formas de mantenerlo activo',
    modes: [
      {
        title: 'Inicio manual directo',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: 'Inicio', detail: 'Cuando ejecutas el comando.' },
          { term: 'Parada', detail: 'muqun-gateway stop o al reiniciar el equipo.' },
          { term: 'Sobrevive al reinicio', detail: 'No.' },
          { term: 'Desinstalación', detail: 'Nada que hacer, solo detener con stop.' },
        ],
      },
      {
        title: 'Como servicio del sistema',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: 'Inicio', detail: 'Al iniciar sesión y tras caídas inesperadas.' },
          { term: 'Parada', detail: 'Únicamente con service uninstall.' },
          { term: 'Sobrevive al reinicio', detail: 'Sí.' },
          { term: 'Desinstalación', detail: 'service uninstall (se conservan emparejamientos).' },
        ],
      },
    ],
    modesNote:
      'Unidad de usuario de systemd en Linux, LaunchAgent en macOS. Nunca requiere permisos de root ni sale de tu directorio de usuario.',
    autostartHeading: 'Cómo arranca OpenCode',
    autostartSteps: [
      'Comprueba si ya hay un servicio OpenCode sano en ejecución leyendo la dirección en ~/.local/state/opencode/service.json.',
      'Si lo encuentra, se conecta directamente a él y tus sesiones abiertas se mantienen intactas.',
      'En caso contrario, ejecuta opencode serve --service y supervisa el proceso detectando automáticamente cualquier cambio de puerto.',
    ],
    autostartNote:
      '¿No tienes OpenCode instalado? El sistema no conecta nada y solo la pantalla del agente mostrará desconexión; el terminal no se ve afectado.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: 'Panel de emparejamiento',
    managerBody:
      'Se abre con muqun-gateway manage. Muestra procesos y dispositivos autorizados y admite estas teclas:',
    managerKeys: [
      { term: 'p', detail: 'Mostrar de nuevo el QR para vincular otro dispositivo.' },
      { term: 'x', detail: 'Revocar el acceso a un dispositivo seleccionado.' },
      { term: 'u', detail: 'Editar la dirección codificada en el QR (a para volver a detectarla).' },
      { term: 's / t', detail: 'Iniciar o detener el Gateway sin salir del administrador.' },
      { term: 'm / h', detail: 'Añadir backend tmux o Herdr (f elige el predeterminado, d elimina).' },
      { term: 'e', detail: 'Cambiar el modo de cifrado para emparejamientos futuros.' },
      { term: 'q', detail: 'Cerrar el administrador (nunca interrumpe tus sesiones de terminal).' },
    ],
    capabilitiesHeading: 'Compatibilidad con versiones anteriores',
    capabilitiesBody:
      'La app consulta directamente al Gateway qué funciones soporta en lugar de adivinar por su versión, ocultando lo no disponible sin dar fallos. Un Gateway más antiguo sigue siendo un terminal perfecto. Solo la colaboración de agentes requiere Herdr 0.9.0 o más reciente.',
    upgradeHeading: 'Actualizaciones',
    upgradeBody:
      'Vuelve a ejecutar el comando de instalación original. Reemplaza el binario respetando tu identidad, claves, configuración y vinculaciones. Si tenías el servicio activo, vuelve a ejecutar service install tras la actualización.',
    logsHeading: 'Registros',
    logsBody:
      'En modo directo y con LaunchAgent en macOS, los registros van a ~/.local/share/muqun-gateway/gateway.log. En Linux con systemd, se consultan con journalctl. Para mayor nivel de detalle define MUQUN_LOG=debug (o RUST_LOG=debug) antes de iniciar.',
    logsCommandLabel: 'linux · modo servicio',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: 'Tu terminal de verdad.',
    lead: 'Es tu terminal real y no una simple captura o transcripción. El Gateway maneja tmux o Herdr en tu equipo y la aplicación dibuja su contenido en pantalla con total fidelidad.',
    shotAlt:
      'Un panel de nvim con un archivo TypeScript abierto, pestañas para Claude Code, nvim y zsh, y la barra de teclas sobre la entrada.',
    entries: [
      {
        term: 'Espacios, grupos y terminales',
        detail:
          'Tres niveles: espacio · grupo.panel. Un espacio es tu directorio de trabajo, un grupo reúne terminales y un terminal es una shell. Muqun muestra un terminal a la vez a pantalla completa para garantizar una lectura óptima.',
      },
      {
        term: 'Moverte entre vistas',
        detail:
          'Desliza la barra superior de título para cambiar de espacio. Las etiquetas sobre el campo de texto cambian de terminal dentro del mismo grupo.',
      },
      {
        term: 'Procesos y panel lateral',
        detail:
          'El panel lateral enumera todos los espacios, grupos y terminales de la máquina. Una pulsación prolongada abre opciones para cerrar de forma segura.',
      },
      {
        term: 'Barra de teclas del terminal',
        detail:
          'La barra sobre la entrada de texto incluye teclas esenciales que faltan en el teclado móvil: Esc, Tab, ⌃C, flechas, y teclas contextuales que cambian según el programa en ejecución (⇧TAB y ⌃O en Claude Code, :w y gg en nvim). Se puede desactivar en Ajustes → Terminal.',
      },
      {
        term: 'Editor de comandos (Composer)',
        detail:
          'Fuente monoespaciada, soporte multilínea y la tecla Intro añade saltos de línea: el envío se realiza mediante un botón para evitar pulsar comandos no deseados.',
      },
      {
        term: 'Historial de salida',
        detail:
          'Tira hacia abajo desde la parte superior del terminal para cargar el historial anterior. Si dejas el extremo en vivo, un botón flotante te devuelve al final al instante.',
      },
      {
        term: 'Cambios (Changes)',
        detail:
          'Estado de Git para el directorio del panel actual: archivos modificados, filtros de Staged/Unstaged y diffs completos. Solo visible en repositorios Git compatibles.',
      },
      {
        term: 'Archivos (Files)',
        detail:
          'Accede a los archivos creados durante tus sesiones (imágenes, código y documentos), legibles sin salir de la app.',
      },
      {
        term: 'Abrir en el navegador',
        detail:
          'Introduce el puerto de tu servidor de desarrollo y Muqun lo abrirá mediante la conexión segura existente sin exponerlo a Internet.',
      },
      {
        term: 'Acciones rápidas',
        detail:
          'Comandos guardados, prompts habituales y atajos de teclado, ordenados por frecuencia de uso. Personalizables en cualquier momento.',
      },
    ],
    note: 'Muqun actúa siempre como un observador seguro: abrir una sesión no altera tus ventanas y cerrar la app no interrumpe ninguna tarea.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'El agente OpenCode.',
    lead: 'Una interfaz creada específicamente para OpenCode en vez de un simple chatbot en consola: cambia de sesión con rapidez, visualiza diffs reales en tarjetas y responde a preguntas con un solo toque.',
    noSignInBadge: 'EJECUCIÓN LOCAL · SIN CUENTA',
    noSignInHeading: 'Tu ordenador habla directamente con tus proveedores de IA.',
    noSignIn:
      'No requiere iniciar sesión. Muqun no maneja cuentas ni solicita claves API. Quien se comunica con los modelos es OpenCode en tu propio ordenador. El Gateway no almacena ni reenvía tus credenciales.',
    prerequisitesHeading: 'Requisitos',
    prerequisites: [
      'OpenCode 2.0.1 o superior instalado en el mismo ordenador que el Gateway.',
      'Al menos un proveedor configurado en OpenCode (con opción para filtrar solo modelos gratuitos).',
      'El servicio OpenCode en ejecución (el Gateway lo inicia o conecta automáticamente).',
      'Un Gateway reciente que admita la interfaz del agente.',
    ],
    entries: [
      {
        term: 'Sesiones y subagentes',
        detail:
          'Cada sesión tiene su propio contexto. Si una tarea delega en subagentes, estos se muestran indentados debajo de la sesión principal para una lectura cómoda.',
      },
      {
        term: 'Espacios de trabajo',
        detail:
          'Cambia el directorio de trabajo del agente al instante. Al elegir un espacio se reanuda automáticamente su última sesión activa.',
      },
      {
        term: 'Modelos y agentes',
        detail:
          'Consulta los modelos disponibles según tus proveedores configurados, con tamaño de ventana de contexto e indicador Free. Alterna entre perfiles Build, Plan, Explore o agentes propios.',
      },
      {
        term: 'Comandos / y habilidades',
        detail:
          'Escribe / en la entrada de texto. Comandos como /new, /models o /undo son resueltos directamente por la app; el resto se ejecutan en el ordenador anfitrión.',
      },
      {
        term: 'Adjuntos y menciones con @',
        detail:
          'Envía fotos o archivos. Las imágenes se recodifican para eliminar metadatos EXIF. Escribe @ para vincular rápidamente archivos del proyecto.',
      },
      {
        term: 'Permisos y preguntas',
        detail:
          'Cuando el agente desea ejecutar comandos o modificar ficheros, una tarjeta te permite elegir entre Permitir, Permitir siempre o Denegar (también desde las notificaciones).',
      },
      {
        term: 'Tareas en segundo plano y cola',
        detail:
          'Envía herramientas lentas a segundo plano y supervisa el progreso desde la bandeja superior. Tus mensajes nuevos pueden intervenir de inmediato o esperar su turno en la cola.',
      },
      {
        term: 'Contexto y compactación',
        detail:
          'Supervisa la ocupación del contexto del modelo, los tokens consumidos y el coste estimado. Las compactaciones automáticas se marcan con claridad en la línea de tiempo.',
      },
      {
        term: 'Deshacer (Undo)',
        detail:
          '/undo revierte el espacio de trabajo al estado previo a tu último mensaje; /redo lo restaura. Diseñado como comando para prevenir pulsaciones involuntarias.',
      },
    ],
    note: 'Las llamadas a herramientas aparecen como tarjetas interactivas: las ediciones muestran su diff unificado en línea, igual que en el visor de Cambios.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Temas.',
    lead: 'Un tema transforma tanto la interfaz de la aplicación como los colores del terminal. Cada pack incluye versión clara y oscura. Incluye 24 packs y acceso al catálogo comunitario.',
    entries: [
      {
        term: '24 paquetes incluidos',
        detail:
          'En Ajustes → Apariencia → Tema encontrarás opciones como Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night y Everforest.',
      },
      {
        term: 'Explorar el catálogo',
        detail:
          'Explora los temas publicados en muqun.dev. La descarga no comienza hasta que abres un tema, mostrándote el tamaño del paquete de antemano.',
      },
      {
        term: 'Estructura de un tema',
        detail:
          'Un archivo .muqun-theme es un zip con un theme.json y una carpeta assets de imágenes. .muqun-theme.json es la versión solo de colores sin imágenes.',
      },
      {
        term: 'Alcance de personalización',
        detail:
          '17 colores de interfaz por modo, colores de terminal (cursor, enlaces, 16 ranuras ANSI), ilustraciones para 11 pantallas e iconos personalizados.',
      },
      {
        term: 'Límites de tamaño',
        detail:
          'Manifiesto de hasta 256 KiB, hasta 32 imágenes de máximo 8 MiB cada una y 25 MiB para el archivo comprimido final.',
      },
      {
        term: 'Instalar desde archivo',
        detail:
          'Abre un .muqun-theme desde Archivos, AirDrop o compartir, o usa «Importar archivo» en la pantalla de temas de la app.',
      },
      {
        term: 'Instalar desde enlace',
        detail:
          'Introduce una URL pública o un repositorio de GitHub. Se verifica la procedencia de las imágenes antes de descargar nada.',
      },
      {
        term: 'Instalar desde el terminal',
        detail:
          'Toca en una ruta .muqun-theme que aparezca en la salida de consola para ver una tarjeta de previsualización al instante.',
      },
      {
        term: 'Vista previa antes de aplicar',
        detail:
          'El tema se aplica temporalmente a toda la app para que puedas inspeccionarlo con total libertad antes de pulsar «Aplicar tema».',
      },
      {
        term: 'Opacidad del fondo',
        detail:
          'Ajusta de forma independiente la opacidad del fondo de la app y del terminal para lograr transparencias agradables.',
      },
      {
        term: 'Crear tu propio tema',
        detail:
          'Los temas se escriben en archivos. Puedes pedirle a tu agente de IA mediante la habilidad integrada que cree la apariencia que deseas.',
      },
      {
        term: 'Publicar en el catálogo',
        detail:
          'El catálogo es un repositorio público de GitHub. Envía un Pull Request con tu carpeta para aparecer en muqun.dev en pocos minutos.',
      },
      {
        term: 'Eliminar temas',
        detail:
          'Desliza sobre un tema en la lista para desinstalarlo. En Ajustes → Almacenamiento puedes limpiar los temas en desuso.',
      },
    ],
    galleryLink: 'Explorar el catálogo de temas',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: 'Resolución de problemas.',
    lead: 'La inmensa mayoría de incidencias se reducen a cuatro causas: el Gateway no está corriendo, la dirección no es accesible, se perdió el emparejamiento o OpenCode no está activo.',
    checksHeading: 'Comprobaciones rápidas',
    checks: [
      {
        term: 'Emparejar ordenador',
        detail:
          'Instala el Gateway (compatible con tmux o Herdr), abre el panel de control, escanea el QR con Muqun e introduce el código que aparece en pantalla.',
      },
      {
        term: 'Corregir conexión',
        detail:
          'Verifica que tmux o Herdr 0.7.5+ y el Gateway están en ejecución y que ambos dispositivos pueden comunicarse en la misma red privada.',
      },
      {
        term: 'Eliminar dispositivo',
        detail:
          'Borra el servidor en la pantalla de inicio de Muqun para retirar el acceso. También puedes revocarlo desde el administrador del Gateway.',
      },
      {
        term: 'Restablecer notificaciones',
        detail:
          'Activa los permisos de notificación en los ajustes del sistema y en Muqun. Vuelve a abrir el servidor para actualizar el token en el Gateway.',
      },
    ],
    entries: [
      {
        term: 'No se puede emparejar',
        detail:
          'El error «Could not reach the gateway» significa que el teléfono no llega a la IP indicada en el QR. Comprueba muqun-gateway status y asegúrate de compartir la misma red Wi-Fi o tailnet de Tailscale. Si el Gateway está vinculado a 127.0.0.1 será inaccesible desde el exterior; cámbialo con u en el administrador.',
      },
      {
        term: 'Código rechazado o caducado',
        detail:
          'El código de 8 caracteres caduca a los 5 minutos o tras 8 intentos incorrectos. Pulsa p en el administrador para generar un nuevo QR y código. Se omiten caracteres confusos como 0, 1, I, L y O.',
      },
      {
        term: 'Significado del punto de estado',
        detail:
          'Un punto relleno indica respuesta comprobada (verde para ONLINE, gris para OFFLINE). Un círculo vacío con NOT CONNECTED indica que aún no se ha comprobado la conexión; pulsa en el servidor para conectar.',
      },
      {
        term: 'Pide volver a emparejar',
        detail:
          'El token del dispositivo se ha eliminado en el Gateway o su estado se ha reiniciado. Vuelve a escanear el QR; los demás ajustes de la app se mantendrán.',
      },
      {
        term: 'No se encuentra OpenCode',
        detail:
          'Si la pantalla del agente muestra OpenCode service offline, ejecuta opencode serve --service en el ordenador y pulsa Reintentar. Si ya está corriendo, define la ruta completa en config.json bajo opencode.binary.',
      },
      {
        term: 'Modelos atenuados o sin gratuitos',
        detail:
          '«Configurar en el host» indica que falta parametrizar ese proveedor en OpenCode. Si no ves modelos gratuitos, apaga el filtro de «Solo gratuitos» para ver toda la lista disponible.',
      },
      {
        term: 'El agente solicita salir del workspace',
        detail:
          'Las tarjetas de solicitud muestran la ruta exacta involucrada para leer o escribir fuera del espacio de trabajo. Revisa la ruta con atención antes de conceder permiso.',
      },
      {
        term: 'Falta el botón de Cambios',
        detail:
          'Solo aparece si el terminal se encuentra dentro de un repositorio Git y el Gateway admite la función de Diff. Actualiza el Gateway si es necesario.',
      },
      {
        term: 'Requiere un Gateway más reciente',
        detail:
          'Las versiones anteriores conservan su utilidad como terminal. La colaboración entre agentes requiere Herdr 0.9.0 o superior en esa sesión.',
      },
      {
        term: 'El host está tras un proxy',
        detail:
          'Tu ordenador es el que conecta con los proveedores de IA. Si necesitas proxy para acceder a la red, configúralo en OpenCode dentro de esa máquina.',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: '¿Sigues con dudas?',
    lead: 'Abre una incidencia en GitHub. Es el canal principal para recibir sugerencias y corregir incidencias.',
    reportHint:
      'Incluye la versión de la app, la del Gateway y la acción realizada justo antes del problema.',
    issueCta: 'Abrir una incidencia en GitHub',
    safetyHeading: 'Privacidad e informes seguros',
    safetyBody:
      'El equipo de soporte nunca te solicitará tokens de acceso, transcripciones completas de terminal, código fuente confidencial ni códigos QR. Elimina cualquier dato sensible antes de adjuntar capturas o registros.',
    safetyLink: 'Leer la política de privacidad',
  },
};
