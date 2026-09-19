import type { UserGuide } from './types';

export const pt: UserGuide = {
  metaTitle: 'Guia do Utilizador & Referência Muqun',
  metaDescription:
    'Guia completo para instalar o Gateway, emparelhar o telemóvel, espaços de trabalho, barra de teclas do terminal, agente OpenCode, temas e resolução de problemas.',
  hero: {
    badge: 'GUIA DO UTILIZADOR · MANUAL DE REFERÊNCIA',
    heading: 'Tudo o que precisas para manter a tua máquina sempre à mão.',
    lead: 'O Muqun liga o teu telemóvel diretamente ao teu próprio computador ou servidor. Descobre como instalar e configurar o Gateway, navegar por terminais, guiar o agente autónomo OpenCode, instalar temas e resolver falhas de ligação.',
    startCta: 'Começar ↓',
    diagnosticsCta: 'Diagnóstico ↓',
    issueCta: 'Abrir um problema',
  },
  contentsLabel: 'Nesta página',
  contents: [
    {
      id: 'get-started',
      label: 'Primeiros passos',
      nav: 'Início',
      meta: 'Procedimento · ~5 min',
      desc: 'Instalar o Gateway, escolher o modo de início, emparelhamento QR e tailnet.',
    },
    {
      id: 'terminal',
      label: 'O terminal',
      nav: 'Terminal',
      meta: 'tmux · herdr',
      desc: 'Espaços de trabalho, grupos, painéis, barra de teclas e ferramentas móveis.',
    },
    {
      id: 'opencode',
      label: 'O agente OpenCode',
      nav: 'Agente',
      meta: 'Agente autónomo',
      desc: 'Serviço de agente local, modelos, chamadas a ferramentas com diffs e permissões.',
    },
    {
      id: 'gateway',
      label: 'Configurar o Gateway',
      nav: 'Gateway',
      meta: 'Referência config.json',
      desc: 'Chaves de configuração, portas, modos de serviço, arranque automático e atalhos.',
    },
    {
      id: 'themes',
      label: 'Temas',
      nav: 'Temas',
      meta: '24 pacotes incluídos',
      desc: 'Temas visuais, formato .muqun-theme, controlos de opacidade e criação.',
    },
    {
      id: 'troubleshooting',
      label: 'Resolução de problemas',
      nav: 'Depuração',
      meta: 'Diagnóstico e verificações',
      desc: 'Verificações rápidas, erros de emparelhamento, códigos expirados e correções.',
    },
    {
      id: 'contact',
      label: 'Contacto',
      nav: 'Contacto',
      meta: 'github · issues',
      desc: 'Lista para envio de relatórios, normas de privacidade e segurança.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Instala o Gateway e emparelha o teu telemóvel.',
    lead: 'O Muqun comunica com um único programa no teu próprio computador: o Gateway. Instala-o lá, inicia-o e emparelha o telemóvel uma única vez. Não é preciso criar conta e nada passa pelos nossos servidores.',
    steps: [
      {
        title: 'Executa o instalador no teu computador',
        body: 'Coloca um binário único em ~/.local/bin/muqun-gateway, configura-o e abre o ecrã de emparelhamento na primeira execução. Suporta macOS e Linux (Windows ainda não é suportado).',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: 'Inicia-o de uma de duas formas',
        body: 'Podes iniciá-lo manualmente ou entregá-lo ao sistema para o manter sempre ativo. Ambos deixam o Gateway operacional; a diferença é o comportamento após reiniciar a máquina.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              'Corre em segundo plano e continua ativo após fechares o terminal, até o computador reiniciar. muqun-gateway stop encerra-o.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              'Regista-o no sistema de inicialização do teu utilizador (systemd no Linux, LaunchAgent no macOS). Inicia com a sessão e recupera de falhas. muqun-gateway service uninstall remove o serviço mantendo os emparelhamentos.',
          },
        ],
        note: 'Escolhe apenas um: com o serviço instalado, pará-lo com stop será desfeito pelo supervisor.',
      },
      {
        title: 'Abre o gestor de emparelhamento',
        body: 'Independentemente do modo de início, este é o passo seguinte. O gestor é um painel em ecrã inteiro no terminal que mostra o código QR, processos e dispositivos autorizados.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: 'Lê o código QR e digita o código',
        body: 'Lê o código QR com o Muqun. O computador apresentará um código curto no formato XXXX-XXXX; introduzi-lo na aplicação conclui o processo. Ler o QR não basta por si só: o código confirma a tua presença física.',
      },
    ],
    requirements: [
      'macOS ou Linux num computador teu (Windows ainda não é suportado).',
      'tmux ou Herdr 0.7.5 ou mais recente instalado (o Gateway controla-os, não os substitui).',
      'Ambos os dispositivos na mesma rede privada. Recomendamos o Tailscale (usa o Tailscale Serve, nunca Funnel).',
      'Sem contas, sem assinaturas e sem intermediários nossos.',
    ],
    pairingNote:
      'Não consegues ler o QR? Escreve o endereço do Gateway na aplicação à mão (indicado no gestor) e introduz o mesmo código curto.',
    codeNote:
      'O código é válido durante 5 minutos e expira após 8 tentativas erradas. Prime p no gestor para gerar um novo QR e código.',
    networkBadge: 'REDE PRIVADA RECOMENDADA',
    networkHeading: 'Usa o Tailscale nos dois dispositivos.',
    networkBody:
      'Recomendamos vivamente colocar o telemóvel e o computador do Gateway na mesma tailnet do Tailscale. Evita o reencaminhamento de portas no router e mantém o Gateway fora da Internet pública. O Tailscale Serve permite adicionar um endereço HTTPS privado (não uses o Tailscale Funnel para o Muqun).',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Configurar o Gateway.',
    lead: 'A maioria dos utilizadores nunca precisa de editar esta configuração. Está disponível para casos específicos: mudar de porta, sobreviver a reinícios ou definir caminhos invulgares para o OpenCode.',
    configHeading: 'O ficheiro de configuração',
    configBody:
      'Em formato JSON, é criado automaticamente durante a instalação. Edita-o apenas se precisares de alterar as chaves abaixo e reinicia o Gateway depois. No macOS fica em ~/Library/Application Support/muqun-gateway/. Os dispositivos emparelhados e os registos ficam em ~/.local/share/muqun-gateway/.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'O nome que a aplicação apresenta para este computador.' },
      {
        term: 'listen',
        detail:
          'O socket a que se associa (anfitrião e porta). Padrão 0.0.0.0:23847 (ou 127.0.0.1 se for endereço local).',
      },
      {
        term: 'public_url',
        detail:
          'O endereço codificado no QR de emparelhamento. É preferível alterá-lo com a tecla u no gestor.',
      },
      {
        term: 'transport_encryption',
        detail:
          'Cifragem de transporte, por defeito required. Afeta os próximos dispositivos a emparelhar, mantendo os atuais.',
      },
      {
        term: 'sessions',
        detail:
          'Motores de terminal suportados por este Gateway (tmux, Herdr ou ambos). Gerido via muqun-gateway backend.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Quais destes iniciam com o Gateway. Vazio por defeito para evitar arranques automáticos imprevistos.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          'Desativado por defeito. Se ativo, as perguntas do agente vão no texto da notificação, expondo o terminal no ecrã de bloqueio.',
      },
      {
        term: 'opencode.autostart',
        detail:
          'Ativado por defeito: o Gateway inicia o OpenCode caso não encontre nenhum a correr. Podes desativar com "opencode": { "autostart": false }.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Caminho do binário do OpenCode a executar. Se omitido, procura em ~/.opencode/bin ou no PATH.',
      },
    ],
    portsHeading: 'Portas e escuta',
    portsRows: [
      { term: 'Padrão', detail: 'Uma única porta TCP: 23847.' },
      { term: 'Alterar', detail: 'Executa muqun-gateway setup --port N e reinicia.' },
      {
        term: 'Associação',
        detail:
          '127.0.0.1 se o endereço for loopback, 0.0.0.0 nos restantes casos.',
      },
      {
        term: 'Numa tailnet',
        detail: 'Não requer abrir portas no router, daí a nossa recomendação.',
      },
    ],
    modesHeading: 'Duas formas de manter em execução',
    modes: [
      {
        title: 'Início manual direto',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: 'Inicia', detail: 'Quando executas o comando.' },
          { term: 'Para', detail: 'muqun-gateway stop ou quando o sistema reinicia.' },
          { term: 'Sobrevive a reinício', detail: 'Não.' },
          { term: 'Reversão', detail: 'Basta executar stop.' },
        ],
      },
      {
        title: 'Como serviço do sistema',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: 'Inicia', detail: 'Ao iniciar sessão e recupera de falhas.' },
          { term: 'Para', detail: 'Apenas através de service uninstall.' },
          { term: 'Sobrevive a reinício', detail: 'Sim.' },
          { term: 'Reversão', detail: 'service uninstall (emparelhamentos guardados).' },
        ],
      },
    ],
    modesNote:
      'Unidade de utilizador systemd no Linux, LaunchAgent no macOS. Nunca utiliza privilégios de root nem sai da tua pasta de utilizador.',
    autostartHeading: 'Como o OpenCode é iniciado',
    autostartSteps: [
      'Procura um serviço OpenCode saudável em execução lendo ~/.local/state/opencode/service.json.',
      'Se encontrar, liga-se diretamente a ele e mantém as sessões existentes ativas.',
      'Caso contrário, inicia opencode serve --service e monitoriza o processo adaptando-se a novas portas.',
    ],
    autostartNote:
      'Sem OpenCode no computador? Nada se liga e apenas a vista do agente mostra o estado offline; o terminal não é afetado.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: 'Gestor de emparelhamento',
    managerBody:
      'Aberto com muqun-gateway manage. Mostra processos e dispositivos autorizados com os seguintes atalhos:',
    managerKeys: [
      { term: 'p', detail: 'Apresentar novamente o QR code para associar outro telemóvel.' },
      { term: 'x', detail: 'Revogar o acesso de um dispositivo selecionado.' },
      { term: 'u', detail: 'Editar o endereço do QR (a para voltar a detetar automaticamente).' },
      { term: 's / t', detail: 'Iniciar ou parar o Gateway sem sair do gestor.' },
      { term: 'm / h', detail: 'Adicionar backend tmux ou Herdr (f seleciona padrão, d remove).' },
      { term: 'e', detail: 'Alterar a política de cifragem de transporte para futuros emparelhamentos.' },
      { term: 'q', detail: 'Fechar o gestor (nunca interrompe as tuas sessões de terminal).' },
    ],
    capabilitiesHeading: 'Compatibilidade com versões antigas',
    capabilitiesBody:
      'A aplicação pergunta ao Gateway que funcionalidades suporta em vez de adivinhar pela versão, ocultando suavemente o que não existir. Gateways mais antigos continuam a ser excelentes terminais. Apenas a colaboração de agentes exige Herdr 0.9.0 ou mais recente na sessão.',
    upgradeHeading: 'Atualização',
    upgradeBody:
      'Basta executar o mesmo comando de instalação original. Substitui o binário sem mexer nas tuas chaves, configuração e dispositivos emparelhados. Se tinhas o serviço instalado, volta a executar service install.',
    logsHeading: 'Registos e diagnósticos',
    logsBody:
      'Em modo direto e com LaunchAgent no macOS, os registos são gravados em ~/.local/share/muqun-gateway/gateway.log. No Linux com systemd, consulta o journalctl. Para mais detalhe usa MUQUN_LOG=debug (ou RUST_LOG=debug).',
    logsCommandLabel: 'linux · modo serviço',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: 'O teu terminal real.',
    lead: 'É o teu terminal verdadeiro, e não uma transcrição estática. O Gateway gere o tmux ou Herdr no teu computador e a app desenha o conteúdo em direto — o trabalho que deixaste na secretária continua na tua mão.',
    shotAlt:
      'Um painel nvim com um ficheiro TypeScript aberto, abas Claude Code, nvim e zsh, e barra de teclas sobre o compositor.',
    entries: [
      {
        term: 'Espaços, grupos e terminais',
        detail:
          'Três níveis: espaço · grupo.painel. Um espaço é a tua pasta de trabalho, um grupo reúne terminais e um terminal é uma shell. O Muqun exibe um terminal de cada vez em ecrã inteiro para assegurar máxima legibilidade.',
      },
      {
        term: 'Alternar entre vistas',
        detail:
          'Desliza a barra superior para mudar de espaço de trabalho. Os botões acima do campo de escrita alternam entre os terminais do mesmo grupo.',
      },
      {
        term: 'Processos e painel lateral',
        detail:
          'O painel lateral lista todos os espaços, grupos e terminais na máquina. Pressionar demoradamente permite fechar janelas com segurança.',
      },
      {
        term: 'Barra de teclas do terminal',
        detail:
          'A faixa acima da escrita disponibiliza teclas essenciais em falta nos telemóveis: Esc, Tab, ⌃C, setas e teclas contextuais (atalhos de shell, ⇧TAB e ⌃O no Claude Code, :w e gg no nvim). Pode ser desativada em Definições → Terminal.',
      },
      {
        term: 'Compositor de texto (Composer)',
        detail:
          'Fonte monoespaçada, suporte para várias linhas e a tecla Enter insere quebras de linha: o envio é acionado por botão para evitar execuções acidentais.',
      },
      {
        term: 'Histórico de visualização',
        detail:
          'Puxa para baixo no topo do terminal para carregar o histórico anterior. Se saíres do fim da emissão ao vivo, surge um botão para voltar instantaneamente.',
      },
      {
        term: 'Alterações Git (Changes)',
        detail:
          'Estado do Git para a pasta do painel: contagem de ficheiros modificados, filtros de Staged/Unstaged e diffs completos.',
      },
      {
        term: 'Ficheiros (Files)',
        detail:
          'Explora ficheiros gerados na sessão (imagens, código e documentos) sem precisares de sair da aplicação.',
      },
      {
        term: 'Abrir no navegador',
        detail:
          'Digita a porta do teu servidor de desenvolvimento e o Muqun abre-o através do túnel existente sem o expor à Internet.',
      },
      {
        term: 'Ações rápidas',
        detail:
          'Comandos guardados, prompts frequentes e combinações de teclas, ordenados por relevância e editáveis a qualquer momento.',
      },
    ],
    note: 'O Muqun é sempre um observador: abrir uma sessão não mexe no layout e fechar a app não encerra nenhum processo em segundo plano.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'O agente OpenCode.',
    lead: 'Uma interface criada especificamente para o OpenCode em vez de um simples chatbot em terminal: alterna entre sessões, visualiza diffs em cartões e responde a pedidos com um toque.',
    noSignInBadge: 'EXECUÇÃO LOCAL · SEM CONTA',
    noSignInHeading: 'O teu computador comunica diretamente com os teus modelos.',
    noSignIn:
      'Sem início de sessão. O Muqun não gere contas nem pede chaves de API. Quem conversa com os fornecedores é o OpenCode no teu computador. O Gateway não armazena credenciais.',
    prerequisitesHeading: 'Requisitos',
    prerequisites: [
      'OpenCode 2.0.1 ou superior no mesmo computador que o Gateway.',
      'Pelo menos um fornecedor configurado no OpenCode (com filtro para modelos gratuitos).',
      'Serviço OpenCode ativo (o Gateway inicia ou liga-se automaticamente).',
      'Gateway recente compatível com o ecrã de agente.',
    ],
    entries: [
      {
        term: 'Sessões e subagentes',
        detail:
          'Cada sessão tem o seu contexto independente. Quando uma tarefa cria subagentes, estes aparecem indentados sob a sessão principal para fácil leitura.',
      },
      {
        term: 'Projetos',
        detail:
          'Muda a pasta de trabalho do agente com facilidade. Escolher um projeto reabre a sua última sessão ativa de imediato.',
      },
      {
        term: 'Modelos e agentes',
        detail:
          'Consulta os modelos disponíveis nos teus fornecedores com indicação da janela de contexto e selo Free. Alterna entre perfis Build, Plan, Explore ou agentes personalizados.',
      },
      {
        term: 'Comandos / e habilidades',
        detail:
          'Digita / no campo de escrita. Comandos como /new, /models ou /undo são resolvidos diretamente pela app; os restantes correm no anfitrião.',
      },
      {
        term: 'Anexos e menções com @',
        detail:
          'Envia fotografias ou ficheiros. As imagens são recodificadas para eliminar metadados EXIF. Usa @ para referenciar ficheiros do projeto.',
      },
      {
        term: 'Permissões e perguntas',
        detail:
          'Quando o agente precisa de executar comandos ou alterar ficheiros, surge um cartão com opções: Permitir, Permitir sempre ou Negar (também a partir do ecrã de bloqueio).',
      },
      {
        term: 'Tarefas em segundo plano e fila',
        detail:
          'Separa ferramentas longas para segundo plano. As tuas novas mensagens podem intervir no momento ou aguardar na fila.',
      },
      {
        term: 'Contexto e compactação',
        detail:
          'Acompanha a ocupação da janela de contexto, os tokens gastos e o custo estimado. A compactação automática do histórico é indicada na cronologia.',
      },
      {
        term: 'Anular (Undo)',
        detail:
          '/undo repõe o projeto no estado anterior à tua última mensagem; /redo cancela o recuo. Pensado como comando para evitar toques acidentais.',
      },
    ],
    note: 'As chamadas a ferramentas surgem como cartões: as edições mostram o seu diff unificado, exatamente como na vista Alterações.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Temas.',
    lead: 'Um tema transforma em simultâneo o aspeto da app e as cores do terminal. Cada pacote inclui uma versão clara e uma escura. Inclui 24 pacotes e acesso ao catálogo da comunidade.',
    entries: [
      {
        term: '24 pacotes incluídos',
        detail:
          'Em Definições → Aspeto → Tema encontrarás opções consagradas como Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night e Everforest.',
      },
      {
        term: 'Explorar o catálogo',
        detail:
          'Consulta o catálogo oficial em muqun.dev. As transferências só começam quando abres um item, com o tamanho do ficheiro indicado previamente.',
      },
      {
        term: 'Estrutura de um tema',
        detail:
          'Um ficheiro .muqun-theme é um zip com theme.json e uma pasta assets de imagens. .muqun-theme.json é a variante sem imagens.',
      },
      {
        term: 'Personalizações suportadas',
        detail:
          '17 cores de interface por modo, cores do terminal (cursor, links, 16 slots ANSI), ilustrações para 11 ecrãs e ícones personalizados.',
      },
      {
        term: 'Limites de tamanho',
        detail:
          'Manifesto até 256 KiB, até 32 imagens com máximo de 8 MiB cada e 25 MiB para o pacote final.',
      },
      {
        term: 'Instalar a partir de ficheiro',
        detail:
          'Abre um .muqun-theme a partir dos Ficheiros, AirDrop ou partilha, ou usa «Importar ficheiro» nas definições de tema.',
      },
      {
        term: 'Instalar a partir de ligação',
        detail:
          'Insere um URL público ou repositório do GitHub. O domínio de origem das imagens é validado antes da transferência.',
      },
      {
        term: 'Instalar a partir do terminal',
        detail:
          'Toca num caminho .muqun-theme na saída do terminal para abrir um cartão de pré-visualização imediata.',
      },
      {
        term: 'Pré-visualização antes de aplicar',
        detail:
          'O tema é aplicado temporariamente a toda a aplicação para que possas navegar à vontade antes de tocar em «Aplicar tema».',
      },
      {
        term: 'Opacidade do fundo',
        detail:
          'Ajusta de forma independente a opacidade do fundo da interface e do terminal para criar efeitos de transparência agradáveis.',
      },
      {
        term: 'Cria o teu próprio tema',
        detail:
          'Os temas são ficheiros de configuração. Podes pedir ao teu agente através da habilidade incluída que crie o estilo que pretendes.',
      },
      {
        term: 'Publicar no catálogo',
        detail:
          'O catálogo é um repositório público no GitHub. Envia um Pull Request para apareceres em muqun.dev em poucos minutos.',
      },
      {
        term: 'Remover temas',
        detail:
          'Desliza sobre um tema na lista para o remover. Em Definições → Armazenamento podes limpar todos os temas não utilizados.',
      },
    ],
    galleryLink: 'Explorar o catálogo de temas',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: 'Resolução de problemas.',
    lead: 'A grande maioria das falhas de ligação deve-se a uma de quatro razões: o Gateway não está a correr, o endereço está inacessível, o emparelhamento foi perdido ou o OpenCode está em baixo.',
    checksHeading: 'Verificações rápidas',
    checks: [
      {
        term: 'Emparelhar computador',
        detail:
          'Instala o Gateway (compatível com tmux ou Herdr), abre o gestor, lê o QR no Muqun e introduz o código exibido no computador.',
      },
      {
        term: 'Corrigir ligação',
        detail:
          'Verifica se o tmux ou Herdr 0.7.5+ e o Gateway estão ativos e se ambos os aparelhos se alcançam no mesmo endereço privado.',
      },
      {
        term: 'Remover dispositivo',
        detail:
          'Apaga o servidor no ecrã inicial do Muqun para retirar a autorização. Também o podes fazer no gestor do Gateway.',
      },
      {
        term: 'Restabelecer notificações',
        detail:
          'Ativa as permissões de notificação no telemóvel e no Muqun. Abre novamente o servidor para registar o novo token.',
      },
    ],
    entries: [
      {
        term: 'Não consegue emparelhar',
        detail:
          'O erro «Could not reach the gateway» significa que o telemóvel não alcança o IP do QR. Verifica o comando muqun-gateway status e certifica-te de estar no mesmo Wi-Fi ou na mesma tailnet do Tailscale. Se o Gateway estiver associado a 127.0.0.1 não receberá ligações externas; corrige com u no gestor.',
      },
      {
        term: 'Código recusado ou expirado',
        detail:
          'O código de 8 caracteres expira ao fim de 5 minutos ou 8 tentativas erradas. Prime p no gestor para gerar um novo código. Os caracteres dúbios (0, 1, I, L, O) foram omitidos.',
      },
      {
        term: 'Significado da luz de estado',
        detail:
          'Ponto preenchido significa resposta confirmada (verde: ONLINE, cinzento: OFFLINE). Círculo vazio com NOT CONNECTED indica que ainda não foi efetuado o teste; basta tocar para abrir.',
      },
      {
        term: 'Pede novo emparelhamento',
        detail:
          'O token deste aparelho foi revogado ou perdido numa limpeza do Gateway. Basta ler o código QR novamente.',
      },
      {
        term: 'OpenCode não encontrado',
        detail:
          'Se o ecrã do agente indicar OpenCode service offline, corre opencode serve --service no computador e toca em Tentar de novo. Se já estiver a correr, especifica o caminho absoluto em config.json sob opencode.binary.',
      },
      {
        term: 'Modelos a cinzento ou sem opções grátis',
        detail:
          '«Configurar no anfitrião» indica que o fornecedor não está configurado no OpenCode. Se não vires modelos grátis, desliga o filtro «Apenas grátis». O Muqun não cobra nada pelo uso dos modelos.',
      },
      {
        term: 'O agente quer sair do projeto',
        detail:
          'Os pedidos de leitura ou escrita fora do projeto exibem o caminho exato. Avalia o caminho antes de conceder permissão.',
      },
      {
        term: 'Falta o botão Alterações',
        detail:
          'Apenas aparece se o terminal estiver dentro de um repositório Git e o Gateway suportar diffs. Atualiza o Gateway se necessário.',
      },
      {
        term: 'Requer um Gateway mais recente',
        detail:
          'Versões antigas mantêm as funções de terminal. A colaboração de agentes requer Herdr 0.9.0 ou mais recente na sessão.',
      },
      {
        term: 'O computador está atrás de proxy',
        detail:
          'É o teu computador que comunica com os fornecedores de IA. Se precisares de proxy, configura-o no OpenCode na própria máquina.',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: 'Ainda com dúvidas?',
    lead: 'Abre um problema no GitHub. É o canal principal para recolha de sugestões e resolução de falhas.',
    reportHint:
      'Indica a versão da app, a versão do Gateway e a ação efetuada imediatamente antes do problema.',
    issueCta: 'Abrir um problema no GitHub',
    safetyHeading: 'Privacidade e segurança nos relatórios',
    safetyBody:
      'O suporte nunca te pedirá tokens de acesso, saídas completas de terminal, código confidencial ou códigos QR. Remove qualquer dado sensível antes de anexar imagens ou registos.',
    safetyLink: 'Ler a política de privacidade',
  },
};
