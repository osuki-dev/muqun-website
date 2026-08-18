import type { MuqunCopy } from './types';

/**
 * Korean copy for the Muqun page. Translated from the English source of truth
 * in en.ts; keys and structure must stay identical.
 *
 * The app keeps the name Muqun here. Herdr, tmux, Tailscale, Gateway, Osuki,
 * Claude Code, nvim, the shell commands and the theme pack names are
 * never translated.
 */
export const copy: MuqunCopy = {
  meta: {
    title: 'Muqun — 어디서나, 내 에이전트와 함께',
    description:
      '자리를 비운 사이 코딩 에이전트가 멈춰 서서 권한을 묻습니다. Muqun은 그 답을 휴대폰에 올려 둡니다. 진짜 터미널, 잠금 화면에서 하는 승인, 그리고 주머니에서 시작하는 새 작업까지. 내 Mac 또는 Linux 머신으로 곧장 연결됩니다.',
  },
  hero: {
    paneLabel: 'muqun',
    paneState: '에이전트 응답 대기',
    eyebrow: '패널 2 · claude code · 응답 대기 00:14',
    heading: '에이전트가 키 하나를 기다리고 있습니다.',
    sub: '명령 한 줄, 스캔 한 번. 그다음부터는 내 머신의 모든 에이전트가 휴대폰으로 상황을 알립니다.',
    appStore: 'Muqun 받기',
    googlePlay: 'Google Play에서 받기',
    installLabel: '그다음, 내 컴퓨터에서:',
    copyLabel: '설치 명령 복사',
    copiedLabel: '복사됨',
    terminalAlt:
      '코딩 에이전트가 파일 편집 권한을 물으며 멈춰 선 터미널 패널. 첫 번째 선택지가 선택되어 있고 커서가 기다리고 있습니다.',
    deviceAlt:
      'Muqun 홈 화면. 서버 하나가 온라인으로 표시되고, 그 에이전트들이 산호색 선을 따라 작업 중, 응답 대기, 대기로 표시되어 있습니다.',
    videoPlayLabel: '21초 소개 영상 재생',
    videoLength: '0:21',
    promptLegend: '에이전트의 세 가지 답',
    promptHint: '1, 2, 3 중 하나를 누르세요. 잠금 화면에서 답해도 됩니다.',
    promptCaption:
      '권한 요청에서 멈춘 터미널 패널. 코딩 에이전트가 src/theme.ts 편집을 요청하고 세 가지 답 중 하나를 기다리고 있습니다.',
  },
  pillars: {
    paneLabel: '무엇에 쓰는 것인가',
    items: [
      {
        pane: '승인',
        state: '대기',
        title: '커피가 식기 전에 답하기',
        line: '권한 요청이 푸시 알림으로 도착하고, 잠금 화면에서 바로 답할 수 있습니다. 승인, 승인하고 다시 묻지 않기, 거부.',
        alt: '에이전트가 권한을 물을 때 Muqun이 보내는 알림 일러스트레이션. 답변 버튼 세 개가 있습니다.',
      },
      {
        pane: '지켜보기',
        state: '스트리밍',
        title: '어느 에이전트의 진행이든, 어디서나',
        line: '진짜 터미널 화면이 에이전트가 쓴 색 그대로 실시간으로 옵니다. 길게 눌러 원하는 부분을 선택해 복사하고, 아래로 당기면 이전 출력을 봅니다.',
        alt: 'Muqun에 표시된 코딩 에이전트의 출력. 색이 들어간 diff와 테두리가 있는 표, 초록색 통과 줄.',
      },
      {
        pane: '보내기',
        state: '준비됨',
        title: '에이전트에게 사진 한 장 건네기',
        line: '목업이든 버그 화면이든 화이트보드든, 휴대폰에서 이미지나 파일을 바로 첨부합니다. 직접 입력하거나 키보드의 받아쓰기 키를 씁니다.',
        alt: 'Muqun 입력창. 에이전트에게 보낼 메시지에 사진이 첨부되어 있습니다.',
      },
      {
        pane: '새 작업',
        state: '준비됨',
        title: '다음 작업을 주머니에서 시작하기',
        line: '에이전트를 고르고, 세션이 이미 아는 디렉터리를 고르고, 프롬프트를 입력합니다. 새 패널에 그대로 도착합니다.',
        alt: 'Muqun 새 작업 화면 일러스트레이션. 에이전트와 작업 디렉터리, 프롬프트 입력란이 있습니다.',
      },
      {
        pane: 'away',
        state: '15m',
        title: '로그가 아니라 한 문장으로 돌아오기',
        line: '십오 분 만에 컴퓨터를 다시 열면 Muqun이 움직인 것부터 말해 줍니다. 어떤 에이전트가 끝났고, 어떤 것이 아직 묻고 있으며, 아무도 보지 않는 동안 몇 번이나 멈췄는지.',
        alt: 'Muqun의 "자리를 비운 사이" 카드 일러스트레이션. 에이전트 세 개와 각각의 마지막 상태, 그리고 물으려고 멈춘 횟수.',
      },
      {
        pane: 'serve',
        state: 'port',
        title: '개발 서버를 주머니 속에서 열기',
        line: '포트를 입력하면 Muqun이 그것을 휴대폰 브라우저에서 엽니다. 터미널이 이미 쓰고 있는 것과 같은 비공개 주소를 지나가므로, 터널을 세울 일도 인터넷에 무언가를 올릴 일도 없습니다.',
        alt: 'Muqun의 "웹 서비스 열기" 시트 일러스트레이션. 최근 포트와 포트 입력란, 그리고 열기 버튼.',
      },
    ],
    dispatchAgent: '에이전트',
    dispatchFolder: '디렉터리',
    dispatchPrompt: '프롬프트',
    dispatchSend: '시작',
  },
  craft: {
    paneLabel: '손에 쥐었을 때',
    paneNote: '제스처와 키',
    heading: '엄지 두 개로 다룰 수 있는 터미널.',
    lead: '휴대폰은 키보드가 아닙니다. 키보드인 척하는 것이야말로 다른 터미널 앱들이 하나같이 어색한 이유입니다. Muqun이 알아듣는 제스처와, 각각이 왜 이런 모양인지를 적었습니다.',
    items: [
      {
        gesture: '두 손가락',
        line: '패널 어디서든 옆으로 쓸면 그 워크스페이스의 탭 사이를 오갑니다. Muqun은 화면을 옮기기 전에 쓸기와 핀치를 먼저 구분하므로, 확대하려다 다른 탭에 도착하는 일이 없습니다.',
      },
      {
        gesture: '핀치',
        line: '글자를 눈이 원하는 크기로 키우고 줄입니다. 패널마다 자기 배율을 기억합니다. 에디터와 에이전트는 애초에 같은 거리에서 읽는 것이 아니니까요.',
      },
      {
        gesture: '아래로 당기기',
        line: '이미 지나간 출력까지 거슬러 올라갑니다. 표시를 한 번 누르면 가장 최근 줄로 돌아옵니다.',
      },
      {
        gesture: '길게 누르기',
        line: '출력을 선택하고, 끌어서 범위를 넓히고, 정확한 바이트를 복사합니다. 프로그램이 실제로 찍은 문자 그 자체이지, 그것을 찍은 사진이 아닙니다.',
      },
      {
        gesture: '모든 키',
        line: '화면의 키 줄은 키보드처럼 배열되고 누르는 순간 그 키가 전송됩니다. nvim과 less와 REPL이 여기서 제대로 동작하는 이유가 바로 이것입니다.',
      },
      {
        gesture: 'vim의 키 줄',
        line: '에디터 패널에는 vim이 기대하는 키 줄이 놓이고 LazyVim 리더 조합도 함께 들어갑니다. 게다가 마지막에 고른 모드가 아니라 nvim이 지금 실제로 있는 모드를 따라갑니다.',
      },
      {
        gesture: '@',
        line: '경로를 입력하는 대신 @로 파일을 언급합니다. 사진과 문서도 같은 입력창에서 첨부하고, 에이전트 자신의 슬래시 명령도 여기서 실행합니다.',
      },
      {
        gesture: '파일 누르기',
        line: '앱을 벗어나지 않고 그 세션이 쓴 것을 읽습니다. 구문 강조, 색이 들어간 diff, 이미지 미리 보기와 함께.',
      },
    ],
  },
  setup: {
    paneLabel: '설치',
    paneNote: '약 1분',
    heading: '명령 한 줄. 스캔 한 번.',
    lead: 'Muqun은 저희 서버가 아니라 내 컴퓨터에서 도는 Gateway와 통신합니다. 설치는 한 줄이고, 나머지는 스스로 합니다.',
    steps: [
      {
        title: '내 컴퓨터에서 이 줄을 실행합니다',
        body: '미리 빌드된 프로그램을 내려받습니다. Rust도 컴파일러도 필요 없습니다. 이어서 설정과 실행까지 마치고 페어링 패널을 엽니다.',
      },
      {
        title: 'QR은 이미 화면에 떠 있습니다',
        body: '처음 설치하면 Gateway가 자체 패널을 엽니다. 다른 패널 바로 옆에, 코드도 이미 그 안에 있는 채로요.',
      },
      {
        title: '스캔하면, 들어간 것입니다',
        body: 'Muqun 카메라를 그 패널에 비추고, 컴퓨터에 뜬 짧은 코드를 입력합니다. 서버가 초록색으로 바뀌고, 그 패널들이 휴대폰에 놓입니다.',
      },
    ],
    inspectLead: '먼저 읽어 보시겠어요? 내려받아 그 파일을 읽고, 같은 파일을 실행하세요:',
    panelFallbackLabel: '패널이 안 보이나요?',
    panelFallbackBody: '어느 터미널에서든 직접 열 수 있습니다:',
    panelFallbackAfter: '기기가 페어링된 뒤에는 패널이 QR 대신 관리 화면을 보여 줍니다. 그 안에서 p를 누르면 QR이 다시 나옵니다.',
    panelCopyLabel: '패널을 여는 명령 복사',
    inspectCopyLabel: '명령 세 줄 모두 복사',
    onlineLabel: '온라인',
    qrPanelAlt:
      '터미널 세션 안에 있는 Gateway 패널 일러스트레이션. 페어링 QR 코드와 p, x, u 키가 보입니다.',
    onlinePanelAlt:
      '페어링이 끝난 뒤 Muqun의 서버 카드 일러스트레이션. 초록색으로 "온라인"이라고 적혀 있습니다.',
    pairPhoneAlt:
      '아직 아무것도 페어링하지 않은 휴대폰 속 Muqun. 서버 목록은 비어 있고 버튼은 "서버 페어링" 하나뿐입니다.',
    panelsPhoneAlt:
      '페어링이 끝난 뒤 휴대폰 속 Muqun. 컴퓨터의 페인 하나가 열려 있고 — src/theme.ts를 띄운 편집기 — 나머지 페인은 아래쪽 띠에 놓여 있습니다. Claude Code, nvim, zsh.',
    requirements: [
      'macOS 또는 Linux에서 tmux, 또는 Herdr 0.7.5 이상. Windows는 아직 지원하지 않습니다.',
      '계정도, 구독도, 인앱 결제도 없습니다.',
      '같은 Wi-Fi여도 됩니다. Tailscale이 더 낫습니다.',
    ],
    tailscaleBefore: '두 기기 모두 Tailscale에 두고, 비공개 HTTPS 주소를 위해',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      '사용을 권장합니다. 포트 포워딩이 필요 없고, 내 것이 공개 인터넷에 나가지도 않습니다. Funnel이 아니라 Serve를 쓰세요.',
    updatingLabel: '나중에 업데이트하려면:',
    updatingBody:
      '같은 명령을 다시 실행하면 됩니다. Gateway가 업데이트되고 다시 시작되며, 페어링된 휴대폰은 그대로 유지됩니다.',
    openSourceBefore: 'Gateway는 오픈소스입니다 —',
    openSourceLink: '코드와 전체 설치 가이드 보기',
  },
  review: {
    status: 'Apple 심사 중',
    note: 'Muqun은 지금 Apple 심사 중입니다. App Store 링크는 여기에 표시됩니다.',
  },
  delight: {
    paneLabel: '내 취향대로',
    paneNote: '마음껏 고르기 · 라이트와 다크',
    heading: '테마를 고르면 터미널도 함께 바뀝니다.',
    line: '모든 팩이 Muqun과 터미널의 색을 함께 바꾸고, 팩마다 라이트와 다크가 있습니다. 모두 서른두 가지이고, 같은 세션에 그중 다섯 가지:',
    themeAlt: '{pack} 팩으로 본 같은 Muqun 세션.',
  },
  promise: {
    paneLabel: '약속',
    lines: [
      '휴대폰은 내 머신과 직접 페어링합니다.',
      'Muqun 계정도 없고, 사이에 저희 중계 서버도 없습니다.',
      '광고도, 분석 도구도, 서드파티 추적 SDK도 없습니다.',
      '한 번 구매하면 이후 업데이트는 모두 무료입니다.',
      '필요한 기능이나 문제를 남겨 주세요. 다음 버전은 거기에서 시작됩니다.',
    ],
    link: '개인정보 처리방침 보기',
    feedbackLink: '기능 제안 · 버그 신고',
  },
  footer: {
    heading: '어디서나, 내 에이전트와 함께.',
    appStore: 'Muqun 받기',
    googlePlay: 'Google Play',
    installLabel: 'Gateway 설치',
    support: '지원',
  },
  support: {
    metaTitle: 'Muqun 지원',
    metaDescription:
      'Gateway 설치, Muqun 페어링, 안전한 Tailscale 연결, 알림, 기기 접근에 관한 도움말입니다.',
    eyebrow: 'Muqun · 지원',
    heading: '내 머신을 언제나 손 닿는 곳에.',
    lead: '먼저 아래 항목을 확인해 보세요. 그래도 Muqun이 연결되지 않으면 기기 모델, iOS 또는 Android 버전, 사용 중인 백엔드(tmux 또는 Herdr)와 그 버전, Gateway 버전, 그리고 앱에 표시된 메시지를 그대로 보내 주세요. Gateway 토큰이나 페어링 QR은 절대 보내지 마세요.',
    emailCta: 'Muqun 지원팀에 메일 보내기',
    issueCta: '이슈 등록하기',
    contactBefore: '이메일:',
    contactAfter: '보통 영업일 기준 2일 이내에 답장드립니다.',
    networkEyebrow: '권장 네트워크',
    networkHeading: '두 기기 모두에서 Tailscale을 사용하세요.',
    networkBadge: '휴대폰 → tailnet → 컴퓨터',
    networkBody:
      '휴대폰과 Gateway가 도는 컴퓨터를 같은 Tailscale tailnet에 두기를 강력히 권장합니다. 공유기 포트 포워딩이 필요 없고 Gateway를 공개 인터넷에서 떼어 놓을 수 있습니다. Tailscale Serve로 비공개 HTTPS 주소를 추가할 수 있으며, Muqun에는 Tailscale Funnel을 사용하지 마세요.',
    networkLink: 'Tailscale Serve 가이드 보기',
    checksHeading: '빠른 점검',
    topics: [
      {
        title: '컴퓨터 페어링하기',
        body: '본인 소유의 컴퓨터에 Gateway를 설치합니다(tmux와 Herdr 모두 지원). 관리자 패널을 연 다음, Muqun에서 페어링 QR을 스캔합니다. 컴퓨터에 표시된 확인 코드를 입력하면 페어링이 완료됩니다.',
      },
      {
        title: '연결 문제 해결하기',
        body: 'tmux, 또는 Herdr 0.7.5 이상과 최신 Gateway가 실행 중인지 확인하세요. 휴대폰과 컴퓨터가 같은 비공개 주소에 도달할 수 있는지 확인한 뒤, Muqun에서 서버를 다시 엽니다.',
      },
      {
        title: '기기 삭제하기',
        body: 'Muqun 홈 화면에서 서버를 삭제하면 해당 Gateway에서 이 휴대폰의 권한이 해지됩니다. Gateway 관리자 패널에서 페어링된 기기를 해지할 수도 있습니다.',
      },
      {
        title: '알림 복구하기',
        body: '휴대폰 시스템 설정과 Muqun 설정에서 Muqun 알림을 켜 주세요. 그런 다음 페어링된 서버를 다시 열면 Muqun이 현재 기기 토큰을 Gateway에 등록합니다.',
      },
    ],
    safetyHeading: '프라이버시와 안전한 제보',
    safetyBody:
      '지원팀은 접근 토큰이나 터미널 출력 전체, 소스 코드, 페어링 QR을 필요로 하지 않습니다. 스크린숏이나 로그를 첨부하기 전에 민감한 정보를 지워 주세요.',
    safetyLink: '개인정보 처리방침 보기',
  },
};
