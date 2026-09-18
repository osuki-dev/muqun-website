import type { UserGuide } from './types';

export const ko: UserGuide = {
  metaTitle: 'Muqun 사용자 가이드 및 레퍼런스',
  metaDescription:
    'Gateway 설치, 스마트폰 페어링, 워크스페이스, 터미널 키 바, OpenCode 자율 에이전트, 테마 커스텀 및 연결 문제 해결 가이드.',
  hero: {
    badge: '사용자 가이드 · 레퍼런스 매뉴얼',
    heading: '손끝에서 언제든 내 컴퓨터와 연결됩니다.',
    lead: 'Muqun은 스마트폰을 개인 컴퓨터나 서버에 직접 연결합니다. Gateway 설치 및 구성, 터미널 워크스페이스 탐색, OpenCode 자율 에이전트 구동, 테마 설정 및 연결 문제 해결 방법을 안내합니다.',
    startCta: '시작하기 ↓',
    diagnosticsCta: '진단 및 문제 해결 ↓',
    issueCta: '이슈 등록',
  },
  contentsLabel: '목차',
  contents: [
    {
      id: 'get-started',
      label: '시작하기',
      nav: '시작',
      meta: '설치 절차 · 약 5분',
      desc: 'Gateway 설치, 실행 모드 선택, QR 페어링 및 tailnet 설정.',
    },
    {
      id: 'terminal',
      label: '터미널',
      nav: '터미널',
      meta: 'tmux · herdr',
      desc: '워크스페이스, 그룹, 패널, 모바일 전용 키 바 및 개발 도구.',
    },
    {
      id: 'opencode',
      label: 'OpenCode 에이전트',
      nav: 'AI도우미',
      meta: '자율 에이전트',
      desc: '로컬 Agent 서비스, 모델 선택, 인라인 Diff 도구 호출 및 권한 승인.',
    },
    {
      id: 'gateway',
      label: 'Gateway 설정',
      nav: '설정',
      meta: 'config.json 레퍼런스',
      desc: '설정 키 목록, 포트 바인딩, 백그라운드 서비스 모드 및 관리자 단축키.',
    },
    {
      id: 'themes',
      label: '테마',
      nav: '테마',
      meta: '기본 내장 24팩',
      desc: '비주얼 테마, .muqun-theme 패키지 포맷, 불투명도 조절 및 테마 제작.',
    },
    {
      id: 'troubleshooting',
      label: '문제 해결',
      nav: '문제해결',
      meta: '연결 진단 및 점검',
      desc: '빠른 점검 항목, 페어링 오류, 인증 코드 만료 및 일반적인 해결 방법.',
    },
    {
      id: 'contact',
      label: '지원 및 문의',
      nav: '문의',
      meta: 'github · issues',
      desc: '이슈 리포트 체크리스트, 안전한 보고 가이드 및 개인정보 보호정책.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Gateway를 설치하고 스마트폰을 페어링하세요.',
    lead: 'Muqun은 컴퓨터에서 실행되는 단 하나의 프로그램, Gateway와 통신합니다. 컴퓨터에 설치하고 실행한 뒤 스마트폰과 한 번만 페어링하면 됩니다. 계정을 만들 필요가 없으며 사용자 데이터가 우리 서버를 경유하지 않습니다.',
    steps: [
      {
        title: '컴퓨터에서 설치 스크립트 실행',
        body: '단일 바이너리를 ~/.local/bin/muqun-gateway 에 설치하고 기본 설정을 마친 뒤 첫 실행 시 페어링 화면을 엽니다. macOS 및 Linux 지원 (Windows는 아직 지원되지 않습니다).',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: '두 가지 방법 중 하나로 실행',
        body: '직접 실행하거나 시스템 서비스로 등록하여 자동으로 유지할 수 있습니다. 두 방식 모두 Gateway가 정상 작동하지만, 재부팅 시 동작이 다릅니다.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              '백그라운드에서 실행되며 터미널을 닫아도 재부팅 전까지 계속 유지됩니다. muqun-gateway stop 으로 종료합니다.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              '현재 사용자의 초기화 시스템(Linux의 systemd 유저 유닛, macOS의 LaunchAgent)에 등록합니다. 로그인 시 자동 시작되고 충돌이나 재부팅 후에도 복구됩니다. muqun-gateway service uninstall 로 페어링을 유지한 채 서비스를 해제할 수 있습니다.',
          },
        ],
        note: '둘 중 하나만 선택하세요. 서비스가 설치된 상태에서 stop을 실행하면 감시 프로세스가 즉시 다시 시작합니다.',
      },
      {
        title: '페어링 관리자 열기',
        body: '어떤 방식으로 실행하든 다음 단계는 동일합니다. 관리자는 터미널 내 전체 화면 패널로 QR 코드, 실행 상태, 현재 인증 토큰을 보유한 모든 기기를 보여줍니다. 첫 설치 시 자동으로 열리며, 언제든 이 명령어로 다시 열 수 있습니다.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: 'QR 스캔 후 확인 코드 입력',
        body: 'Muqun 앱에서 QR 코드를 스캔하세요. 컴퓨터 화면에 XXXX-XXXX 형식의 짧은 코드가 표시되며, 이를 앱에 입력하면 페어링이 완료됩니다. 스캔만으로는 완료되지 않으며, 코드를 입력해야 해당 기기를 들고 있는 사람이 본인임을 입증할 수 있습니다.',
      },
    ],
    requirements: [
      '직접 관리하는 macOS 또는 Linux 컴퓨터 (Windows는 아직 지원되지 않음).',
      'tmux 또는 Herdr 0.7.5 이상이 설치되어 있어야 함 (Gateway는 이를 대체하지 않고 제어함).',
      '두 기기가 동일한 개인 네트워크에 있어야 함. Tailscale 사용을 권장합니다 (Tailscale Serve 사용, Funnel은 사용하지 마세요).',
      '계정 생성 없음, 구독료 없음, 외부 릴레이 서버 없음.',
    ],
    pairingNote:
      '카메라 스캔이 안 되나요? 앱에서 Gateway 주소를 직접 입력(관리자 화면에 게시된 주소가 표시됨)한 뒤 동일한 확인 코드를 입력하세요.',
    codeNote:
      '확인 코드는 5분간 유효하며 8회 오입력 시 폐기됩니다. 관리자에서 p 키를 누르면 새로운 QR 코드와 확인 코드가 생성됩니다.',
    networkBadge: '권장 개인 네트워크',
    networkHeading: '두 기기 모두에서 Tailscale을 사용하세요.',
    networkBody:
      '스마트폰과 Gateway 컴퓨터를 동일한 Tailscale tailnet에 연결하는 것을 강력히 권장합니다. 공유기 포트포워딩이 필요 없으며 Gateway를 공용 인터넷에 노출하지 않습니다. Tailscale Serve를 통해 비공개 HTTPS 주소를 추가할 수 있습니다 (Muqun에 Tailscale Funnel은 사용하지 마세요).',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Gateway 구성.',
    lead: '대부분의 사용자는 설정을 수동으로 열 필요가 없습니다. 다른 포트를 사용하거나, 재부팅 후에도 유지되도록 하거나, OpenCode가 특수한 경로에 있는 경우에만 수정합니다.',
    configHeading: '설정 파일 안내',
    configBody:
      '설정은 JSON 형식이며 설치 시 자동 생성됩니다. 아래 키를 변경해야 할 때만 수동으로 편집하고 완료 후 Gateway를 재시작하세요 (시작 시에만 읽히므로 실행 중인 변경사항은 감지되지 않습니다). macOS에서는 ~/Library/Application Support/muqun-gateway/ 아래에 저장됩니다. 같은 위치에 pairing.json이 있으며, 페어링된 기기, 푸시 토큰 및 로그는 ~/.local/share/muqun-gateway/ 에 위치합니다.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: '앱에서 이 컴퓨터에 표시할 이름.' },
      {
        term: 'listen',
        detail:
          '바인딩할 소켓(호스트 및 포트). 기본값은 0.0.0.0:23847 이며, 루프백 주소 게시 시 127.0.0.1로 바인딩됩니다.',
      },
      {
        term: 'public_url',
        detail:
          '페어링 QR에 인코딩되는 연결 주소. 수동 편집보다는 관리자 화면에서 u 키로 변경하는 것이 좋습니다.',
      },
      {
        term: 'transport_encryption',
        detail:
          '전송 암호화 설정. 기본값은 안전한 required 입니다. 기기마다 페어링 당시의 암호화 모드를 유지하므로, 변경 시 이후 새로 페어링되는 기기에만 적용됩니다.',
      },
      {
        term: 'sessions',
        detail:
          'Gateway가 마운트하는 터미널 백엔드 (tmux, Herdr 또는 둘 다). muqun-gateway backend 로 관리합니다.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Gateway 시작 시 함께 실행할 백엔드 목록. 의도치 않은 실행을 방지하기 위해 기본값은 비어 있습니다.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          '기본값은 끔. 켜면 에이전트 질문과 선택지가 푸시 본문에 포함됩니다 (터미널 텍스트가 잠금 화면 및 푸시 서버를 거치므로 기본적으로 꺼져 있습니다).',
      },
      {
        term: 'opencode.autostart',
        detail:
          '기본값은 켬. 실행 중인 OpenCode 서비스를 찾지 못하면 Gateway가 직접 시작합니다. "opencode": { "autostart": false } 로 자동 시작을 끌 수 있습니다.',
      },
      {
        term: 'opencode.binary',
        detail:
          '실행할 OpenCode 바이너리 경로. 생략 시 ~/.opencode/bin 또는 시스템 PATH에서 찾습니다. 서비스가 로그인 셸의 PATH를 가져오지 못할 때 고정 경로를 지정합니다.',
      },
    ],
    portsHeading: '포트 및 네트워크',
    portsRows: [
      { term: '기본 포트', detail: '단일 TCP 포트, 23847.' },
      { term: '포트 변경', detail: 'muqun-gateway setup --port N 실행 후 재시작.' },
      {
        term: '바인딩 주소',
        detail:
          '루프백 주소 게시 시 127.0.0.1, 그 외에는 0.0.0.0.',
      },
      {
        term: 'tailnet 환경',
        detail: '공유기에서 포트포워딩할 필요가 없으므로 사용을 적극 권장합니다.',
      },
    ],
    modesHeading: '두 가지 백그라운드 유지 방식',
    modes: [
      {
        title: '직접 백그라운드 시작',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: '시작 시점', detail: '명령어를 실행했을 때.' },
          { term: '종료 시점', detail: 'muqun-gateway stop 실행 시, 또는 컴퓨터 재부팅 시.' },
          { term: '재부팅 후 자동 복구', detail: '아니오.' },
          { term: '해제 방법', detail: '해제 불필요, stop으로 종료.' },
        ],
      },
      {
        title: '시스템 서비스로 등록',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: '시작 시점', detail: '로그인 시 자동 시작, 충돌 후 자동 복구.' },
          { term: '종료 시점', detail: 'service uninstall 실행 시에만 종료.' },
          { term: '재부팅 후 자동 복구', detail: '예.' },
          { term: '해제 방법', detail: 'service uninstall (페어링 정보 유지됨).' },
        ],
      },
    ],
    modesNote:
      'Linux에서는 systemd 유저 유닛, macOS에서는 LaunchAgent를 사용합니다. root 권한은 전혀 필요하지 않으며 홈 디렉터리 외부에 설치되지 않습니다.',
    autostartHeading: 'OpenCode 자동 시작 방식',
    autostartSteps: [
      '~/.local/state/opencode/service.json 을 확인하여 이미 건강하게 실행 중인 OpenCode 서비스가 있는지 조회합니다.',
      '발견되면 해당 서비스에 즉시 연결하여 실행 중인 opencode serve 세션을 그대로 유지합니다.',
      '발견되지 않으면 Gateway가 직접 opencode serve --service 를 시작하고 모니터링합니다. 새 포트에서 재시작되더라도 자동으로 감지합니다.',
    ],
    autostartNote:
      '컴퓨터에 OpenCode가 없더라도 에이전트 화면에만 오프라인으로 표시되며 터미널 기능은 완벽하게 작동합니다.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: '페어링 관리자',
    managerBody:
      'muqun-gateway manage 로 실행합니다. 실행 상태와 승인된 모든 기기 목록이 표시되며 다음 단축키를 지원합니다.',
    managerKeys: [
      { term: 'p', detail: '새 기기 등록을 위한 페어링 QR 코드 다시 표시.' },
      { term: 'x', detail: '선택한 기기의 접근 권한 취소.' },
      { term: 'u', detail: 'QR에 인코딩된 접속 주소 수정 (a 키로 자동 재감지).' },
      { term: 's / t', detail: '관리자 화면을 닫지 않고 Gateway 시작 또는 중지.' },
      { term: 'm / h', detail: 'tmux 또는 Herdr 백엔드 추가 (f로 기본 지정, d로 삭제).' },
      { term: 'e', detail: '향후 페어링할 기기의 전송 암호화 설정 변경.' },
      { term: 'q', detail: '관리자 종료 (터미널 세션은 중단되지 않습니다).' },
    ],
    capabilitiesHeading: '이전 버전 Gateway 호환성',
    capabilitiesBody:
      'Muqun 앱은 버전 번호만으로 추측하지 않고 Gateway에 지원 기능을 직접 조회하며, 지원되지 않는 기능은 오류를 내는 대신 숨깁니다. 따라서 이전 버전의 Gateway도 안정적인 터미널로 정상 작동합니다. 에이전트 협업 기능만 별도의 요구사항(Herdr 0.9.0 이상)이 필요하며, 누락 시 업데이트할 대상을 구체적으로 안내합니다.',
    upgradeHeading: '업그레이드',
    upgradeBody:
      '설치 명령어를 다시 실행하면 됩니다. 바이너리만 교체되며 서버 식별자, 주소, 설정 및 페어링 정보는 모두 유지됩니다. 서비스를 사용 중이었다면 업그레이드 후 service install 을 한 번 더 실행하여 자식 프로세스 수명 규칙을 갱신하세요.',
    logsHeading: '로그 확인',
    logsBody:
      '직접 실행 모드 및 macOS LaunchAgent 로그는 ~/.local/share/muqun-gateway/gateway.log 에 기록됩니다. Linux systemd 환경에서는 journalctl 로 확인합니다. 상세 로그가 필요한 경우 MUQUN_LOG=debug (또는 RUST_LOG=debug) 를 설정하세요. 기본값은 info 입니다.',
    logsCommandLabel: 'linux · 서비스 모드',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: '실제 터미널 환경 그대로.',
    lead: '단순 화면 캡처나 로그 출력이 아닌 컴퓨터에서 작동 중인 실제 터미널입니다. Gateway가 tmux 또는 Herdr를 구동하고 앱이 이를 렌더링합니다. 컴퓨터 앞에 두고 온 작업을 스마트폰에서 그대로 이어받아 작업하세요.',
    shotAlt:
      'TypeScript 파일이 열려 있는 nvim 창, 하단 탭과 입력창 상단의 터미널 전용 키 바.',
    entries: [
      {
        term: '워크스페이스, 그룹, 터미널',
        detail:
          '3단계 계층 구조로 워크스페이스 · 그룹.패널 형태로 관리됩니다. 워크스페이스는 작업 디렉터리, 그룹은 터미널 묶음, 터미널은 단일 셸입니다. 스마트폰의 화면 분할은 가독성이 떨어지므로 항상 한 번에 하나의 터미널에 집중하도록 표시합니다.',
      },
      {
        term: '화면 및 계층 전환',
        detail:
          '상단 제목을 좌우로 스와이프하여 워크스페이스를 전환합니다. 입력창 위의 칩을 눌러 같은 그룹 내 터미널을 전환할 수 있으며, 다른 그룹이나 워크스페이스는 패널 목록에서 바로 선택할 수 있습니다.',
      },
      {
        term: '프로세스 및 패널 목록',
        detail:
          '패널 서랍에서 모든 워크스페이스, 그룹, 터미널 목록을 확인하고 새 터미널을 추가할 수 있습니다. 행을 길게 누르면 닫기 등 작업 메뉴가 열리며 실수로 터미널을 종료하는 일이 없습니다.',
      },
      {
        term: '터미널 전용 키 바',
        detail:
          '입력창 상단 스트립은 모바일 키보드에 없는 Esc, Tab, ⌃C, 방향키 등을 제공하며, 실행 중인 프로그램에 따라 동적으로 변경됩니다 (Claude Code에서는 ⇧TAB과 ⌃O, nvim에서는 :w와 gg 등). 설정 → 터미널에서 끌 수 있습니다.',
      },
      {
        term: '전용 입력창 (Composer)',
        detail:
          '고정폭 폰트와 다중 줄 입력을 지원하며 엔터 키는 줄바꿈으로 동작합니다. 오입력을 방지하기 위해 전송은 전용 버튼으로 수행됩니다. 입력창 상단 문구는 현재 창 상태를 반영합니다.',
      },
      {
        term: '이전 출력 확인',
        detail:
          '터미널 상단을 아래로 당기면 더 많은 스크롤백 기록을 불러옵니다. 실시간 출력 지점을 벗어나면 최신 캡슐이 나타나 한 번에 복귀할 수 있습니다. 읽고 있는 도중에 새 출력이 화면을 강제로 끌어당기지 않습니다.',
      },
      {
        term: '변경사항 (Changes)',
        detail:
          '패널이 위치한 디렉터리의 Git 상태를 보여줍니다. 변경된 파일 수, 스테이징 여부 필터 및 실제 Diff를 확인합니다. Git 체크아웃 내부이고 Gateway가 기능을 지원할 때만 나타납니다.',
      },
      {
        term: '파일 탐색기 (Files)',
        detail:
          '세션에서 생성된 이미지, 코드, 문서를 검색하고 앱을 벗어나지 않고 바로 열람할 수 있습니다.',
      },
      {
        term: '브라우저에서 열기',
        detail:
          '개발 서버 포트 번호를 입력하면 기존 연결을 통해 브라우저에서 안전하게 미리 볼 수 있습니다. 인터넷에 공개되지 않습니다.',
      },
      {
        term: '빠른 동작 (Quick actions)',
        detail:
          '자주 사용하는 명령어, 프롬프트, 단축키를 저장해 두고 한 번에 실행할 수 있습니다. 자유롭게 추가하고 편집할 수 있습니다.',
      },
    ],
    note: 'Muqun은 항상 안전한 관찰자로 동작합니다. 세션을 열어도 창 배치가 흐트러지지 않으며 앱을 닫아도 백그라운드 작업이 종료되지 않습니다.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'OpenCode 자율 에이전트.',
    lead: '터미널 안에 갇힌 에이전트가 아닌 OpenCode만을 위해 설계된 전용 화면입니다. 다중 세션 전환, 인라인 Diff가 포함된 도구 호출 카드, 탭 한 번으로 응답할 수 있는 질문 양식을 제공합니다.',
    noSignInBadge: '로컬 런타임 · 계정 불필요',
    noSignInHeading: '컴퓨터가 모델 제공자와 직접 통신합니다.',
    noSignIn:
      '로그인이 필요 없습니다. Muqun은 계정을 요구하지도, API 키를 묻지도 않습니다. 모델 제공자와 통신하는 주체는 앱이 아니라 컴퓨터의 OpenCode이기 때문입니다. Gateway는 자격 증명을 전혀 전달받지 않습니다.',
    prerequisitesHeading: '준비 사항',
    prerequisites: [
      'Gateway와 동일한 컴퓨터에 OpenCode 2.0.1 이상 설치.',
      'OpenCode 내에 최소 하나의 모델 제공자 구성 (무료 전용 필터 지원).',
      'OpenCode 서비스 실행 (Gateway가 자동 시작하거나 기존 서비스에 자동 연결).',
      '에이전트 화면을 지원하는 최신 Gateway (지원하지 않는 경우 버튼이 숨겨지며 터미널만 작동).',
    ],
    entries: [
      {
        term: '세션 및 서브 에이전트',
        detail:
          '각 세션은 독립된 컨텍스트를 가지며 워크스페이스별 또는 전체 목록으로 정렬됩니다. 하위 에이전트가 생성되면 부모 세션 아래 들여쓰기되어 복잡한 작업 흐름도 쉽게 파악할 수 있습니다.',
      },
      {
        term: '워크스페이스 전환',
        detail:
          '에이전트가 작업할 디렉터리를 변경하거나 새 경로를 지정합니다. 워크스페이스를 선택하면 새로 시작하지 않고 가장 최근 세션을 바로 복원합니다.',
      },
      {
        term: '모델 및 에이전트 선택',
        detail:
          '제공자별로 실제 제공되는 모델 목록과 컨텍스트 크기를 보여주며 무료 모델에는 Free 칩이 표시됩니다. Build, Plan, Explore 및 사용자 지정 에이전트를 손쉽게 전환할 수 있습니다.',
      },
      {
        term: '슬래시 명령어와 스킬',
        detail:
          '입력창에 / 를 입력하면 메뉴가 열립니다. /new, /models, /compact, /undo, /export 등은 앱이 직접 처리하며 나머지는 컴퓨터의 OpenCode에서 실행됩니다. 등록된 스킬도 목록에 함께 표시됩니다.',
      },
      {
        term: '첨부 파일 및 @ 멘션',
        detail:
          '사진이나 파일을 전송할 수 있습니다. 이미지는 전송 시 재인코딩되어 EXIF 정보가 제거됩니다. @ 를 입력하면 워크스페이스 내 파일을 손쉽게 참조할 수 있습니다.',
      },
      {
        term: '권한 승인 및 질문 응답',
        detail:
          '에이전트가 명령어를 실행하거나 파일을 수정하려 할 때 승인 카드가 나타나며 허용, 항상 허용, 거부 중 선택할 수 있습니다. 잠금 화면 알림에서도 원터치로 응답 가능합니다.',
      },
      {
        term: '백그라운드 작업 및 대기열',
        detail:
          '시간이 오래 걸리는 도구 호출은 백그라운드로 분리하여 트레이에서 진행 상태를 확인할 수 있습니다. 작업 중 입력한 내용은 즉시 반영하거나 대기열에 넣어 순차적으로 실행할 수 있습니다.',
      },
      {
        term: '컨텍스트 사용량 및 자동 압축',
        detail:
          '모델의 컨텍스트 창 사용률, 소모된 토큰 수, 예상 비용을 실시간으로 확인합니다. 기록이 길어지면 자동 압축이 수행되며 타임라인에 명확히 표시됩니다.',
      },
      {
        term: '작업 취소 (Undo)',
        detail:
          '/undo 를 입력하면 이전 메시지 전송 전 상태로 워크스페이스를 되돌립니다. /redo 로 복구할 수도 있습니다. 실수 방지를 위해 버튼이 아닌 명령어로 작동합니다.',
      },
    ],
    note: '도구 호출은 카드로 도착하며, 파일 편집 내용은 Changes 뷰와 동일한 Unified Diff 형태로 표시됩니다.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: '테마.',
    lead: '앱 인터페이스와 터미널 색상을 한 번에 변경합니다. 모든 테마 팩은 라이트 모드와 다크 모드 구성을 갖추고 있습니다. 기본 24팩이 제공되며 커뮤니티 카탈로그에서 추가할 수 있습니다.',
    entries: [
      {
        term: '기본 탑재 24팩',
        detail:
          '설정 → 화면 → 테마에서 Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night, Everforest 등을 선택할 수 있습니다. 색상 모드(시스템, 라이트, 다크)에 따라 밝은 버전과 어두운 버전이 적용됩니다.',
      },
      {
        term: '카탈로그 둘러보기',
        detail:
          'muqun.dev 에 공개된 온라인 카탈로그를 탐색할 수 있습니다. 항목을 열기 전까지는 다운로드되지 않으며 패키지 크기가 사전에 표시됩니다.',
      },
      {
        term: '테마 파일 구조',
        detail:
          '.muqun-theme 은 theme.json 과 이미지 assets 폴더로 구성된 zip 파일입니다. .muqun-theme.json 은 이미지가 없는 순수 색상 테마용 단일 파일입니다.',
      },
      {
        term: '지원하는 커스텀 범위',
        detail:
          '모드별 17개 인터페이스 색상, 터미널 배경·전경·커서·링크·선택 색상, 16개 ANSI 슬롯, 11개 화면의 배경 아트워크, 3개 커스텀 아이콘, 초기 불투명도 등을 지원합니다. 폰트, SVG, 애니메이션은 지원하지 않습니다.',
      },
      {
        term: '용량 제한',
        detail:
          '매니페스트는 최대 256 KiB, 이미지는 장당 최대 8 MiB (최대 32장), 압축된 전체 패키지는 최대 25 MiB까지 허용됩니다.',
      },
      {
        term: '파일에서 설치',
        detail:
          '파일 앱, AirDrop 또는 공유 기능을 통해 .muqun-theme 파일을 열거나 테마 설정에서 파일 가져오기를 사용합니다. 올바르지 않은 파일은 안전하게 거부됩니다.',
      },
      {
        term: '링크에서 설치',
        detail:
          '공개 URL이나 GitHub 저장소 주소를 입력하여 테마를 가져옵니다. 다운로드 전에 이미지가 호스팅된 도메인이 검토 카드에 명시됩니다.',
      },
      {
        term: '터미널 출력에서 설치',
        detail:
          '터미널 출력에 표시된 .muqun-theme 파일 경로를 탭하면 미리보기 카드가 나타나며 적용 여부를 결정할 수 있습니다.',
      },
      {
        term: '적용 전 실시간 미리보기',
        detail:
          '어떤 경로로 설치하든 테마를 다운로드하고 압축을 풀면 앱 전체에 임시 적용되어 둘러볼 수 있습니다. 테마 적용을 누르기 전까지는 기존 테마가 유지됩니다.',
      },
      {
        term: '배경 불투명도 조절',
        detail:
          '커스텀 테마는 인터페이스 배경 불투명도와 터미널 배경 불투명도 조절 슬라이더를 제공합니다. 가독성 권장치 미만으로 낮추면 경고가 표시됩니다.',
      },
      {
        term: '테마 직접 만들기',
        detail:
          '앱 내에 별도의 색상 편집기가 없으며 파일로 작성합니다. 전용 Agent 스킬이 포함되어 있어 원하는 분위기를 설명하기만 하면 매니페스트와 아트워크를 자동으로 생성해 줍니다.',
      },
      {
        term: '카탈로그에 배포',
        detail:
          '카탈로그는 GitHub 저장소를 통해 PR을 받습니다. 병합되면 CI가 패키징하여 몇 분 안에 muqun.dev 에 등록됩니다.',
      },
      {
        term: '테마 삭제',
        detail:
          '테마 목록에서 행을 밀어 확인하면 기기에서 삭제됩니다. 설정 → 저장공간에서 미사용 테마를 일괄 정리할 수도 있습니다.',
      },
    ],
    galleryLink: '테마 카탈로그 둘러보기',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: '문제 해결.',
    lead: '대부분의 연결 문제는 Gateway 미실행, 주소 접근 불가, 페어링 만료, OpenCode 미실행 중 하나에 해당합니다.',
    checksHeading: '빠른 점검 항목',
    checks: [
      {
        term: '컴퓨터 페어링',
        detail:
          '컴퓨터에 Gateway를 설치(tmux 또는 Herdr 지원)하고 관리자 패널을 연 뒤 Muqun 앱에서 QR을 스캔하고 화면에 뜬 확인 코드를 입력하세요.',
      },
      {
        term: '연결 점검',
        detail:
          'tmux 또는 Herdr 0.7.5 이상과 최신 Gateway가 실행 중인지 확인하세요. 스마트폰과 컴퓨터가 동일한 비공개 주소에 연결될 수 있는지 확인 후 서버를 다시 엽니다.',
      },
      {
        term: '기기 등록 해제',
        detail:
          'Muqun 홈 화면에서 서버를 삭제하면 Gateway에서 기기 권한이 해제됩니다. 컴퓨터의 Gateway 관리자에서도 언제든 등록을 취소할 수 있습니다.',
      },
      {
        term: '알림 권한 재등록',
        detail:
          '스마트폰 설정과 Muqun 설정에서 알림을 허용하세요. 페어링된 서버를 다시 열면 새 푸시 토큰이 Gateway에 다시 등록됩니다.',
      },
    ],
    entries: [
      {
        term: '페어링할 수 없음',
        detail:
          'Could not reach the gateway 메시지는 QR의 주소에 스마트폰이 접근하지 못했음을 뜻합니다. 컴퓨터에서 muqun-gateway status 를 확인하고 동일한 Wi-Fi나 Tailscale tailnet에 연결되어 있는지 확인하세요. 루프백(127.0.0.1)에 바인딩된 경우 외부에서 접근할 수 없으므로 관리자에서 u 키로 실제 IP를 게시하거나 SSH 터널을 통해 페어링하세요.',
      },
      {
        term: '코드가 거부되거나 만료됨',
        detail:
          '확인 코드는 8자리이며 5분간 유효합니다. 8회 오입력 시 파기됩니다. 관리자에서 p 키를 눌러 새 QR과 코드를 발급받으세요. 혼동 방지를 위해 0, 1, I, L, O는 포함되지 않습니다.',
      },
      {
        term: '상태 표시 점의 의미',
        detail:
          '채워진 점은 응답을 확인했음을 뜻합니다 (초록색 ONLINE, 회색 OFFLINE). 비어 있는 원과 NOT CONNECTED 문구는 아직 확인을 시도하지 않은 상태이며, 서버를 탭해 열면 즉시 연결됩니다.',
      },
      {
        term: '다시 페어링하라는 메시지가 뜸',
        detail:
          'Gateway에서 해당 기기 토큰이 삭제되었거나 상태가 재설정된 경우입니다. 서버를 다시 페어링하면 되며 스마트폰의 다른 데이터는 영향을 받지 않습니다.',
      },
      {
        term: 'OpenCode를 찾을 수 없음',
        detail:
          '에이전트 화면에 OpenCode service offline 이 표시되면 컴퓨터에서 opencode serve --service 를 실행하고 다시 확인을 누르세요. 이미 실행 중이라면 config.json의 opencode.binary 에 전체 경로를 명시하고 Gateway를 재시작하세요.',
      },
      {
        term: '모델이 비활성화되었거나 무료 모델이 없음',
        detail:
          '컴퓨터에서 설정 필요 메시지가 뜨면 OpenCode에서 해당 제공자를 구성하세요. 무료 모델 없음은 필터에 걸린 것이므로 필터를 해제하면 전체 모델이 나타납니다. Muqun 자체는 모델 이용료를 부과하지 않습니다.',
      },
      {
        term: '에이전트가 워크스페이스 외부 접근을 요청함',
        detail:
          '외부 파일 읽기/쓰기 요청 카드에 대상 경로가 표시됩니다. 허용, 항상 허용, 거부 중 선택하세요. 보안을 위해 경로를 신중히 확인한 후 승인하세요.',
      },
      {
        term: 'Changes 버튼이 나타나지 않음',
        detail:
          '터미널이 Git 저장소 내부이고 Gateway가 Diff 기능을 지원할 때만 표시됩니다. 설치 명령어를 다시 실행하여 Gateway를 업데이트하세요.',
      },
      {
        term: '최신 Gateway가 필요하다는 안내가 뜸',
        detail:
          '이전 버전 Gateway도 터미널 기능은 완벽히 지원하지만 최신 기능은 제한될 수 있습니다. 에이전트 협업 기능은 Herdr 0.9.0 이상이 필요하며 안내에 따라 해당 구성요소를 업데이트하세요.',
      },
      {
        term: '컴퓨터가 프록시 환경에 있음',
        detail:
          '모델 제공자와 통신하는 주체는 사용자 컴퓨터입니다. 인터넷 접근에 프록시가 필요한 경우 컴퓨터의 OpenCode에 프록시 설정을 완료하세요. Muqun은 트래픽을 프록시하지 않습니다.',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: '문제가 해결되지 않나요?',
    lead: 'GitHub Issues에 등록해 주세요. 모든 피드백을 확인하여 개선하고 있습니다.',
    reportHint:
      '앱 버전, Gateway 버전, 문제가 발생하기 직전의 동작을 함께 적어주세요.',
    issueCta: 'GitHub에서 이슈 등록하기',
    safetyHeading: '개인정보 보호 및 안전한 보고',
    safetyBody:
      '기술 지원 시 액세스 토큰, 터미널 전체 출력, 비공개 소스코드, 페어링 QR은 절대 요구하지 않습니다. 스크린샷이나 로그 첨부 시 민감한 비밀 정보를 반드시 삭제하세요.',
    safetyLink: '개인정보 처리방침 읽기',
  },
};
