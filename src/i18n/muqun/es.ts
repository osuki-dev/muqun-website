import type { MuqunCopy } from './types';

/**
 * Spanish (es) translation of Muqun's page copy. Mirrors the keys in en.ts,
 * which stays the source of truth.
 */
export const copy: MuqunCopy = {
  meta: {
    title: 'Muqun — Tus agentes, donde estés',
    description:
      'Tu agente de programación se detiene a pedir permiso mientras tú no estás en el escritorio. Muqun pone esa respuesta en tu teléfono: el terminal de verdad, los permisos desde la pantalla de bloqueo y una tarea nueva empezada desde el bolsillo, directo a tu propio Mac o máquina Linux.',
  },
  hero: {
    paneLabel: 'muqun',
    paneState: 'agente esperando',
    eyebrow: 'panel 2 · claude code · bloqueado 00:14',
    heading: 'Tu agente espera una sola tecla.',
    sub: 'Un comando, un escaneo: a partir de ahí cada agente de tu ordenador te da parte en el teléfono.',
    appStore: 'Descargar Muqun',
    googlePlay: 'Disponible en Google Play',
    installLabel: 'Después, en tu propia máquina:',
    copyLabel: 'Copiar el comando de instalación',
    copiedLabel: 'Copiado',
    terminalAlt:
      'Un panel de terminal donde un agente de programación se ha detenido para pedir permiso para editar un archivo, con la primera opción seleccionada y el cursor esperando.',
    deviceAlt:
      'La pantalla de inicio de Muqun: un servidor EN LÍNEA, sus agentes listados a lo largo de un hilo coral, cada uno marcado como Trabajando, Bloqueado o Inactivo.',
    videoPlayLabel: 'Reproducir el vídeo de presentación de 21 segundos',
    videoLength: '0:21',
    promptLegend: 'Las tres respuestas del agente',
    promptHint: 'Pulsa 1, 2 o 3 — o responde desde la pantalla de bloqueo.',
    promptCaption:
      'Un panel de terminal detenido en una petición de permiso: un agente de programación pide editar src/theme.ts y espera una de las tres respuestas.',
  },
  pillars: {
    paneLabel: 'para qué sirve',
    items: [
      {
        pane: 'aprobar',
        state: 'espera',
        title: 'Respóndele antes de que se enfríe el café',
        line: 'La petición de permiso llega como notificación y la respondes desde la pantalla de bloqueo: Aprobar, aprobar siempre, Denegar.',
        alt: 'Una ilustración de la notificación que envía Muqun cuando un agente pide permiso, con sus tres botones de respuesta.',
      },
      {
        pane: 'ver',
        state: 'directo',
        title: 'Mira cómo va cualquier agente, desde donde estés',
        line: 'La rejilla real del terminal, en directo, con los colores del propio agente. Mantén pulsado para seleccionar y copiar los bytes exactos, o tira hacia abajo para ver la salida anterior.',
        alt: 'La salida de un agente de programación en Muqun: un diff a color, una tabla con bordes y una línea verde de prueba superada.',
      },
      {
        pane: 'enviar',
        state: 'listo',
        title: 'Dale una imagen al agente',
        line: 'Adjunta una imagen o un archivo desde el teléfono: el mockup, el fallo, la pizarra. Escríbelo o díctalo.',
        alt: 'La zona de escritura de Muqun con una foto adjunta al mensaje que está a punto de salir hacia el agente.',
      },
      {
        pane: 'lanzar',
        state: 'listo',
        title: 'Empieza el siguiente desde el bolsillo',
        line: 'Elige el agente, elige un directorio que la sesión ya conoce, escribe el prompt. Aparece en un panel nuevo.',
        alt: 'Una ilustración del panel «Nueva tarea» de Muqun: un agente, un directorio de trabajo y un campo de prompt.',
      },
      {
        pane: 'away',
        state: '15m',
        title: 'Vuelve a una frase, no a un registro',
        line: 'Reabre una máquina que dejaste hace quince minutos y Muqun empieza por lo que se movió: qué agentes terminaron, cuáles siguen preguntando y cuántas veces se detuvieron mientras nadie miraba.',
        alt: 'Una ilustración de la tarjeta «Mientras no estabas» de Muqun: tres agentes, dónde acabó cada uno y cuántas veces se detuvo a preguntar.',
      },
      {
        pane: 'serve',
        state: 'port',
        title: 'Abre el servidor de desarrollo en tu bolsillo',
        line: 'Escribe un puerto y Muqun lo abre en el navegador del teléfono, por la misma dirección privada que ya usa la terminal. Sin túneles y sin publicar nada en internet.',
        alt: 'Una ilustración de la hoja «Abrir un servicio web» de Muqun: puertos recientes, un campo de puerto y un botón Abrir.',
      },
    ],
    dispatchAgent: 'agente',
    dispatchFolder: 'directorio',
    dispatchPrompt: 'prompt',
    dispatchSend: 'Iniciar',
  },
  craft: {
    paneLabel: 'cómo se siente en la mano',
    paneNote: 'gestos y teclas',
    heading: 'Un terminal que puedes manejar con dos pulgares.',
    lead: 'Un teléfono no es un teclado, y fingir que lo es es la razón por la que cualquier otro cliente de terminal se siente mal. Estos son los gestos a los que Muqun responde, y por qué cada uno tiene la forma que tiene.',
    items: [
      {
        gesture: 'dos dedos',
        line: 'Desliza en horizontal por cualquier punto de un panel para moverte entre las pestañas de ese espacio de trabajo. Muqun distingue el deslizamiento del pellizco antes de moverte, así que hacer zoom nunca te deja en otra pestaña.',
      },
      {
        gesture: 'pellizcar',
        line: 'Amplía la cuadrícula hasta el tamaño que tus ojos quieren. Cada panel recuerda el suyo, porque el editor y el agente no se leen a la misma distancia.',
      },
      {
        gesture: 'tirar hacia abajo',
        line: 'Vuelve a la salida que ya pasó de largo. Un toque en la marca te devuelve a la última línea.',
      },
      {
        gesture: 'mantener pulsado',
        line: 'Selecciona la salida, arrastra para ampliar la selección y copia los bytes exactos: los caracteres que el programa imprimió de verdad, no una foto de ellos.',
      },
      {
        gesture: 'cada tecla',
        line: 'La fila en pantalla está dispuesta como un teclado y envía en el momento en que la pulsas. Esa es toda la razón por la que nvim, less y los REPL se comportan aquí.',
      },
      {
        gesture: 'la fila de vim',
        line: 'Los paneles de editor reciben la fila que vim espera, con las combinaciones leader de LazyVim incluidas, y siguen el modo en el que nvim está de verdad, no el que elegiste la última vez.',
      },
      {
        gesture: '@',
        line: 'Menciona un archivo en lugar de escribir su ruta. Las fotos y los documentos se adjuntan desde la misma zona de escritura, y los comandos de barra del propio agente también se lanzan desde ahí.',
      },
      {
        gesture: 'tocar un archivo',
        line: 'Lee lo que ha escrito la sesión sin salir de la app: resaltado de sintaxis, diffs en color y vistas previas de imágenes.',
      },
    ],
  },
  setup: {
    paneLabel: 'instalación',
    paneNote: 'más o menos un minuto',
    heading: 'Un comando. Un escaneo.',
    lead: 'Muqun habla con un Gateway en tu propio ordenador, no con un servidor nuestro. Instalarlo es una línea, y él hace el resto.',
    steps: [
      {
        title: 'Ejecuta esto en tu ordenador',
        body: 'Descarga un programa ya compilado —ni Rust ni compilador—, lo configura, lo inicia y abre el panel de vinculación.',
      },
      {
        title: 'El QR ya está en pantalla',
        body: 'En la primera instalación, el Gateway abre su propio panel justo al lado de los demás, con el código ya dentro.',
      },
      {
        title: 'Escanéalo y ya estás dentro',
        body: 'Apunta la cámara de Muqun al panel y escribe el código corto que muestra tu ordenador. El servidor se pone verde y sus paneles están en tu teléfono.',
      },
    ],
    inspectLead: '¿Prefieres leerlo antes? Descárgalo, lee ese archivo y ejecuta ese mismo archivo:',
    panelFallbackLabel: '¿No aparece el panel?',
    panelFallbackBody: 'Ábrelo tú mismo, desde cualquier terminal:',
    panelFallbackAfter: 'Cuando ya hay un dispositivo vinculado, el panel muestra su gestor en vez del QR: pulsa p ahí para volver a mostrar uno.',
    panelCopyLabel: 'Copiar el comando que abre el panel',
    inspectCopyLabel: 'Copiar los tres comandos',
    onlineLabel: 'en línea',
    qrPanelAlt:
      'Una ilustración del panel del Gateway dentro de una sesión de terminal, con un código QR de vinculación y las teclas p, x y u.',
    onlinePanelAlt:
      'Una ilustración de la tarjeta del servidor en Muqun tras la vinculación, que muestra CONECTADO en verde.',
    pairPhoneAlt:
      'Muqun en un teléfono, sin nada vinculado todavía: una lista de servidores vacía y un solo botón, Vincular un servidor.',
    panelsPhoneAlt:
      'Muqun en un teléfono una vez hecha la vinculación: uno de los paneles de la máquina abierto — un editor con src/theme.ts — y el resto en una tira abajo, Claude Code, nvim, zsh.',
    requirements: [
      'tmux, o Herdr 0.7.5 o posterior, en macOS o Linux. Windows todavía no es compatible.',
      'Sin cuenta, sin suscripción, sin compras dentro de la app.',
      'La misma red Wi-Fi funciona; Tailscale es mejor.',
    ],
    tailscaleBefore: 'Recomendamos poner ambos dispositivos en Tailscale y usar',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      'para tener una dirección HTTPS privada: sin abrir puertos y sin nada tuyo en la internet pública. Usa Serve, no Funnel.',
    updatingLabel: 'Actualizar después:',
    updatingBody:
      'ejecuta el mismo comando otra vez. Actualiza el Gateway y lo reinicia, y tus teléfonos vinculados siguen vinculados.',
    openSourceBefore: 'El Gateway es de código abierto —',
    openSourceLink: 'lee el código y la guía completa de instalación',
  },
  review: {
    status: 'En revisión con Apple',
    note: 'Muqun está en revisión con Apple. Aquí aparecerá el enlace a la App Store.',
  },
  delight: {
    paneLabel: 'hazlo tuyo',
    paneNote: 'elige el tuyo · claro y oscuro',
    heading: 'Elige un tema. El terminal cambia con él.',
    line: 'Cada paquete repinta la app y el terminal a la vez, y cada uno tiene una mitad clara y otra oscura. Vienen treinta y dos; aquí van cinco, en la misma sesión:',
    themeAlt: 'La misma sesión de Muqun en el paquete {pack}.',
  },
  promise: {
    paneLabel: 'el trato',
    lines: [
      'Tu teléfono se vincula directamente con tu propia máquina.',
      'Sin cuenta de Muqun y sin ningún relay nuestro en medio.',
      'Sin anuncios, sin analíticas, sin SDK de rastreo de terceros.',
      'Una sola compra; todas las actualizaciones posteriores son gratuitas.',
      'Pide una función o cuenta qué se rompió: de ahí sale la siguiente versión.',
    ],
    link: 'Lee la política de privacidad',
    feedbackLink: 'Pedir una función o informar de un fallo',
  },
  footer: {
    heading: 'Tus agentes, donde estés.',
    appStore: 'Descargar Muqun',
    googlePlay: 'Google Play',
    installLabel: 'Instala el Gateway',
    support: 'Soporte',
  },
  support: {
    metaTitle: 'Soporte de Muqun',
    metaDescription:
      'Ayuda para instalar el Gateway, vincular Muqun, conexiones seguras con Tailscale, notificaciones y acceso de dispositivos.',
    eyebrow: 'Muqun · Soporte',
    heading: 'Ten tu propia máquina siempre a mano.',
    lead: 'Empieza por las comprobaciones de abajo. Si Muqun sigue sin conectar, envíanos el modelo del dispositivo, la versión de iOS o Android, tu backend (tmux o Herdr) y su versión, la versión del Gateway y el mensaje exacto que muestra la app. Nunca envíes un token del Gateway ni el QR de vinculación.',
    emailCta: 'Escribir al soporte de Muqun',
    issueCta: 'Abrir un issue',
    contactBefore: 'Correo:',
    contactAfter: 'Tiempo de respuesta habitual: dos días hábiles como máximo.',
    networkEyebrow: 'Red recomendada',
    networkHeading: 'Usa Tailscale en ambos dispositivos.',
    networkBadge: 'teléfono → tailnet → ordenador',
    networkBody:
      'Recomendamos mucho poner tu teléfono y el ordenador del Gateway en la misma tailnet de Tailscale. Evita abrir puertos en el router y mantiene el Gateway fuera de la internet pública. Tailscale Serve puede añadir una dirección HTTPS privada; no uses Tailscale Funnel para Muqun.',
    networkLink: 'Lee la guía de Tailscale Serve',
    checksHeading: 'Comprobaciones rápidas',
    topics: [
      {
        title: 'Vincular un ordenador',
        body: 'Instala el Gateway en un ordenador que sea tuyo —funciona con tmux o Herdr—, abre su panel de gestión y escanea el QR de vinculación en Muqun. El código de confirmación que aparece en el ordenador completa la vinculación.',
      },
      {
        title: 'Arreglar una conexión',
        body: 'Comprueba que estén corriendo tmux, o Herdr 0.7.5 o posterior, y el Gateway más reciente. Confirma que el teléfono y el ordenador pueden alcanzar la misma dirección privada, y vuelve a abrir el servidor en Muqun.',
      },
      {
        title: 'Quitar un dispositivo',
        body: 'Elimina un servidor desde la pantalla de inicio de Muqun para revocar este teléfono en ese Gateway. También puedes revocar cualquier dispositivo vinculado desde el panel de gestión del Gateway.',
      },
      {
        title: 'Recuperar las notificaciones',
        body: 'Activa las notificaciones de Muqun en los ajustes del sistema de tu teléfono y en los ajustes de Muqun. Vuelve a abrir el servidor vinculado para que Muqun registre el token actual del dispositivo en tu Gateway.',
      },
    ],
    safetyHeading: 'Privacidad y reportes seguros',
    safetyBody:
      'El soporte nunca necesita tu token de acceso, la salida completa de la terminal, tu código fuente ni el QR de vinculación. Quita los secretos antes de adjuntar capturas o registros.',
    safetyLink: 'Lee la política de privacidad',
  },
};
