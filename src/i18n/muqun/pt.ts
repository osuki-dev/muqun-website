import type { MuqunCopy } from './types';

/**
 * Portuguese (pt-PT) translation of Muqun's page copy.
 * Keys, structure and array order must match ./en.ts exactly.
 */
export const copy: MuqunCopy = {
  meta: {
    title: 'Muqun — Os teus agentes, em qualquer lado',
    description:
      'O teu agente de programação para e pede permissão enquanto estás longe da secretária. O Muqun põe essa resposta no teu telemóvel: o terminal a sério, as permissões a partir do ecrã bloqueado e uma tarefa nova começada do bolso — direto para o teu próprio Mac ou máquina Linux.',
  },
  hero: {
    paneLabel: 'muqun',
    paneState: 'agente à espera',
    eyebrow: 'painel 2 · claude code · bloqueado 00:14',
    heading: 'O teu agente está à espera de uma única tecla.',
    sub: 'Um comando, uma leitura — daí em diante cada agente da tua máquina dá-te conta no telemóvel.',
    appStore: 'Obter o Muqun',
    googlePlay: 'Disponível no Google Play',
    installLabel: 'Depois, na tua própria máquina:',
    copyLabel: 'Copiar o comando de instalação',
    copiedLabel: 'Copiado',
    terminalAlt:
      'Um painel de terminal onde um agente de programação parou para pedir permissão para editar um ficheiro, com a primeira opção selecionada e o cursor à espera.',
    deviceAlt:
      'O ecrã principal do Muqun: um servidor ONLINE, os seus agentes listados ao longo de um fio coral, cada um marcado como A trabalhar, Bloqueado ou Inativo.',
    videoPlayLabel: 'Reproduzir o vídeo de apresentação de 21 segundos',
    videoLength: '0:21',
    promptLegend: 'As três respostas do agente',
    promptHint: 'Carrega em 1, 2 ou 3 — ou responde a partir do ecrã bloqueado.',
    promptCaption:
      'Um painel de terminal parado num pedido de permissão: um agente de programação pede para editar o src/theme.ts e espera por uma das três respostas.',
  },
  pillars: {
    paneLabel: 'para que serve',
    items: [
      {
        pane: 'aprovar',
        state: 'à espera',
        title: 'Responde antes de o café arrefecer',
        line: 'O pedido de permissão chega como notificação e respondes a partir do ecrã bloqueado: Aprovar, aprovar sempre, Recusar.',
        alt: 'Uma ilustração da notificação que o Muqun envia quando um agente pede permissão, com os seus três botões de resposta.',
      },
      {
        pane: 'seguir',
        state: 'direto',
        title: 'Vê como vai qualquer agente, estejas onde estiveres',
        line: 'A grelha real do terminal, em direto, com as cores do próprio agente. Mantém premido para selecionar e copiar os bytes exatos, ou puxa para baixo para ver a saída mais antiga.',
        alt: 'A saída de um agente de programação no Muqun: um diff a cores, uma tabela com moldura e uma linha verde de teste passado.',
      },
      {
        pane: 'enviar',
        state: 'pronto',
        title: 'Dá uma imagem ao agente',
        line: 'Anexa uma imagem ou um ficheiro a partir do telemóvel: o mockup, o bug, o quadro branco. Escreve a mensagem ou dita-a.',
        alt: 'A zona de escrita do Muqun com uma fotografia anexada à mensagem prestes a seguir para o agente.',
      },
      {
        pane: 'lançar',
        state: 'pronto',
        title: 'Começa o próximo a partir do bolso',
        line: 'Escolhe o agente, escolhe um diretório que a sessão já conhece, escreve o prompt. Aparece num painel novo.',
        alt: 'Uma ilustração do painel «Nova tarefa» do Muqun: um agente, um diretório de trabalho e um campo de prompt.',
      },
      {
        pane: 'away',
        state: '15m',
        title: 'Volta a uma frase, não a um registo',
        line: 'Reabre uma máquina que deixaste há quinze minutos e o Muqun começa pelo que mexeu: que agentes acabaram, quais ainda estão a perguntar, e quantas vezes pararam enquanto ninguém estava a ver.',
        alt: 'Uma ilustração do cartão «Enquanto estiveste fora» do Muqun: três agentes, onde cada um ficou, e quantas vezes parou para perguntar.',
      },
      {
        pane: 'serve',
        state: 'port',
        title: 'Abre o servidor de desenvolvimento no bolso',
        line: 'Escreve uma porta e o Muqun abre-a no browser do telemóvel, pelo mesmo endereço privado que o terminal já usa. Sem túneis e sem pôr nada na internet pública.',
        alt: 'Uma ilustração do painel «Abrir um serviço web» do Muqun: portas recentes, um campo de porta e um botão Abrir.',
      },
    ],
    dispatchAgent: 'agente',
    dispatchFolder: 'diretório',
    dispatchPrompt: 'prompt',
    dispatchSend: 'Iniciar',
  },
  craft: {
    paneLabel: 'como se sente na mão',
    paneNote: 'gestos e teclas',
    heading: 'Um terminal que dá para conduzir com dois polegares.',
    lead: 'Um telemóvel não é um teclado, e fingir que é foi sempre a razão pela qual qualquer outro cliente de terminal soa a falso. Estes são os gestos a que o Muqun responde, e porque é que cada um tem a forma que tem.',
    items: [
      {
        gesture: 'dois dedos',
        line: 'Desliza na horizontal em qualquer ponto de um painel para percorrer os separadores desse espaço de trabalho. O Muqun distingue o deslize do gesto de zoom antes de te mover, por isso ampliar nunca te deixa noutro separador.',
      },
      {
        gesture: 'juntar os dedos',
        line: 'Ajusta a grelha até a letra ter o tamanho que os teus olhos pedem. Cada painel guarda o seu, porque o editor e o agente não se leem à mesma distância.',
      },
      {
        gesture: 'puxar para baixo',
        line: 'Volta atrás à saída que já passou. Um toque na marca leva-te de volta à linha mais recente.',
      },
      {
        gesture: 'toque longo',
        line: 'Seleciona a saída, arrasta para alargar a seleção e copia os bytes exatos — os caracteres que o programa realmente imprimiu, não uma imagem deles.',
      },
      {
        gesture: 'cada tecla',
        line: 'A fila no ecrã está disposta como um teclado e envia no momento em que a carregas. É essa a razão inteira por que o nvim, o less e os REPL funcionam bem aqui.',
      },
      {
        gesture: 'a fila do vim',
        line: 'Os painéis de editor recebem a fila que o vim espera, com as combinações leader do LazyVim incluídas, e seguem o modo em que o nvim está mesmo, não o que escolheste da última vez.',
      },
      {
        gesture: '@',
        line: 'Menciona um ficheiro em vez de escreveres o caminho. Fotografias e documentos anexam-se da mesma área de escrita, e os comandos de barra do próprio agente também correm a partir dali.',
      },
      {
        gesture: 'tocar num ficheiro',
        line: 'Lê o que a sessão escreveu sem sair da aplicação: realce de sintaxe, diffs a cores e pré-visualização de imagens.',
      },
    ],
  },
  setup: {
    paneLabel: 'instalação',
    paneNote: 'cerca de um minuto',
    heading: 'Um comando. Uma leitura.',
    lead: 'O Muqun fala com um Gateway no teu próprio computador, não com um servidor nosso. Instalá-lo é uma linha, e ele trata do resto sozinho.',
    steps: [
      {
        title: 'Corre isto no teu computador',
        body: 'Descarrega um programa já compilado — sem Rust, sem compilador — depois configura-o, inicia-o e abre o painel de emparelhamento.',
      },
      {
        title: 'O QR já está no ecrã',
        body: 'Logo na primeira instalação, o Gateway abre o seu próprio painel, mesmo ao lado dos outros, já com o código lá dentro.',
      },
      {
        title: 'Lê-o e estás dentro',
        body: 'Aponta a câmara do Muqun ao painel e escreve o código curto que o computador mostra. O servidor fica verde e os painéis dele estão no teu telemóvel.',
      },
    ],
    inspectLead: 'Preferes lê-lo primeiro? Transfere-o, lê esse ficheiro e executa esse mesmo ficheiro:',
    panelFallbackLabel: 'O painel não apareceu?',
    panelFallbackBody: 'Abre-o tu mesmo, de qualquer terminal:',
    panelFallbackAfter: 'Depois de um dispositivo estar emparelhado, o painel mostra o gestor dele em vez do QR — carrega em p nele para trazer um QR de volta.',
    panelCopyLabel: 'Copiar o comando que abre o painel',
    inspectCopyLabel: 'Copiar os três comandos',
    onlineLabel: 'online',
    qrPanelAlt:
      'Uma ilustração do painel do Gateway dentro de uma sessão de terminal, com um código QR de emparelhamento e as teclas p, x e u.',
    onlinePanelAlt:
      'Uma ilustração do cartão do servidor no Muqun depois do emparelhamento, a mostrar LIGADO a verde.',
    pairPhoneAlt:
      'O Muqun num telemóvel, ainda sem nada emparelhado: uma lista de servidores vazia e um único botão, Emparelhar um servidor.',
    panelsPhoneAlt:
      'O Muqun num telemóvel depois do emparelhamento: um dos painéis da máquina aberto — um editor com o src/theme.ts — e os restantes numa faixa em baixo, Claude Code, nvim, zsh.',
    requirements: [
      'tmux, ou Herdr 0.7.5 ou posterior, em macOS ou Linux. O Windows ainda não é suportado.',
      'Sem conta, sem subscrição, sem compras dentro da app.',
      'A mesma rede Wi-Fi chega; o Tailscale é melhor.',
    ],
    tailscaleBefore: 'Recomendamos pôr os dois dispositivos no Tailscale e usar o',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      'para teres um endereço HTTPS privado — sem redirecionamento de portas e sem nada de teu na internet pública. Usa o Serve, não o Funnel.',
    updatingLabel: 'Atualizar mais tarde:',
    updatingBody:
      'corre o mesmo comando outra vez. Atualiza o Gateway e reinicia-o, e os telemóveis emparelhados continuam emparelhados.',
    openSourceBefore: 'O Gateway é de código aberto —',
    openSourceLink: 'lê o código e o guia de instalação completo',
  },
  review: {
    status: 'Em revisão na Apple',
    note: 'O Muqun está em revisão na Apple. É aqui que vai aparecer a ligação para a App Store.',
  },
  delight: {
    paneLabel: 'à tua maneira',
    paneNote: 'escolhe à vontade · claro e escuro',
    heading: 'Escolhe um tema. O terminal muda com ele.',
    line: 'Cada pacote repinta a app e o terminal ao mesmo tempo, e cada um tem uma metade clara e uma escura. Vêm trinta e dois; aqui ficam cinco, na mesma sessão:',
    themeAlt: 'A mesma sessão do Muqun no pacote {pack}.',
  },
  promise: {
    paneLabel: 'o acordo',
    lines: [
      'O teu telemóvel emparelha diretamente com a tua própria máquina.',
      'Sem conta Muqun e sem nenhum relay nosso pelo meio.',
      'Sem anúncios, sem analytics, sem SDKs de rastreio de terceiros.',
      'Uma só compra; todas as atualizações seguintes são gratuitas.',
      'Peça uma funcionalidade ou reporte o que falhou: é daí que sai a versão seguinte.',
    ],
    link: 'Ler a política de privacidade',
    feedbackLink: 'Sugerir uma funcionalidade ou reportar um erro',
  },
  footer: {
    heading: 'Os teus agentes, em qualquer lado.',
    appStore: 'Obter o Muqun',
    googlePlay: 'Google Play',
    installLabel: 'Instalar o Gateway',
    support: 'Suporte',
  },
  support: {
    metaTitle: 'Suporte do Muqun',
    metaDescription:
      'Ajuda com a instalação do Gateway, o emparelhamento do Muqun, ligações seguras por Tailscale, notificações e acesso de dispositivos.',
    eyebrow: 'Muqun · Suporte',
    heading: 'Mantém a tua própria máquina ao alcance.',
    lead: 'Começa pelas verificações abaixo. Se o Muqun continuar sem conseguir ligar, envia-nos o modelo do dispositivo, a versão de iOS ou Android, o teu backend (tmux ou Herdr) e a respetiva versão, a versão do Gateway e a mensagem exata mostrada na app. Nunca envies um token do Gateway nem o QR de emparelhamento.',
    emailCta: 'Enviar email ao suporte do Muqun',
    issueCta: 'Abrir uma issue',
    contactBefore: 'Email:',
    contactAfter: 'Tempo de resposta habitual: até dois dias úteis.',
    networkEyebrow: 'Rede recomendada',
    networkHeading: 'Usa o Tailscale nos dois dispositivos.',
    networkBadge: 'telemóvel → tailnet → computador',
    networkBody:
      'Recomendamos vivamente pôr o telemóvel e o computador do Gateway na mesma tailnet do Tailscale. Evita o redirecionamento de portas no router e mantém o Gateway fora da internet pública. O Tailscale Serve pode acrescentar um endereço HTTPS privado; não uses o Tailscale Funnel para o Muqun.',
    networkLink: 'Ler o guia do Tailscale Serve',
    checksHeading: 'Verificações rápidas',
    topics: [
      {
        title: 'Emparelhar um computador',
        body: 'Instala o Gateway num computador teu — funciona com tmux ou Herdr —, abre o respetivo painel de gestão e lê o QR de emparelhamento no Muqun. O código de confirmação mostrado no computador conclui o emparelhamento.',
      },
      {
        title: 'Resolver uma ligação',
        body: 'Verifica se estão a correr o tmux, ou o Herdr 0.7.5 ou posterior, e o Gateway mais recente. Confirma que o telemóvel e o computador conseguem alcançar o mesmo endereço privado e depois reabre o servidor no Muqun.',
      },
      {
        title: 'Remover um dispositivo',
        body: 'Apaga um servidor no ecrã inicial do Muqun para revogar este telemóvel nesse Gateway. Também podes revogar qualquer dispositivo emparelhado a partir do painel de gestão do Gateway.',
      },
      {
        title: 'Repor as notificações',
        body: 'Ativa as notificações do Muqun nas definições de sistema do telemóvel e nas Definições do Muqun. Reabre o servidor emparelhado para o Muqun poder registar o token atual do dispositivo no teu Gateway.',
      },
    ],
    safetyHeading: 'Privacidade e reporte seguro',
    safetyBody:
      'O suporte nunca precisa do teu token de acesso, do output completo do terminal, do código-fonte nem do QR de emparelhamento. Remove segredos antes de anexar capturas de ecrã ou registos.',
    safetyLink: 'Ler a política de privacidade',
  },
};
