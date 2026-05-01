(() => {
  const KEY = "tank_site_lang_v1";
  const PAGE = document.body?.dataset?.page || "";
  const LANGS = [
    { code: "zh-CN", short: "中" },
    { code: "en", short: "EN" },
    { code: "ja", short: "日" },
    { code: "ko", short: "한" }
  ];

  const TEXT = {
    home: {
      "zh-CN": {
        title: "经典坦克大战平衡版",
        subtitle: "浏览器双人动作防守游戏",
        navPlay: "开始游戏",
        navUpdates: "版本更新",
        navVersions: "历史版本",
        navRecords: "完整记录",
        eyebrow: "正式发布入口",
        lead: "围绕单人 / 双人协作、Boss 关压力、地图轮换与操作反馈持续打磨的坦克防守版本。当前正式入口指向 <strong>{version}</strong>，这一版重点补强了无敌反馈、草丛潜伏可读性、Boss 奖励选择和基地砖成长表现。",
        start: "立即开始",
        updates: "查看更新",
        versions: "历史版本",
        openFile: "直接打开版本文件",
        shotTitle: "主菜单与规则入口",
        shotDesc: "主菜单、游玩入口、更新摘要和完整记录已经拆分整理，这一版也把对外展示内容同步到了最新平衡状态。",
        overviewTitle: "当前版本概览",
        overviewDesc: "把默认入口、玩法规模和当前重点放在一处，进站后就能很快看清这版的核心变化和主打体验。",
        focusTitle: "玩法重点",
        focusDesc: "这版已经不只是原始坦克对射，而是逐步发展成一套带成长、预警、潜伏对抗和节奏补给的防守玩法。",
        controlsTitle: "操作与模式",
        controlsDesc: "页面入口之外，最重要的是让新玩家一进来就能马上玩。这里把常用按键直接摆在首页。",
        recentTitle: "最近版本变化",
        recentDesc: "正式发布页只放最近一段的核心变化，完整调整过程继续保留在完整记录里。",
        historyTitle: "历史版本",
        historyDesc: "当前正式入口默认进入最新版，上一版稳定版本仍保留可访问入口，方便回看和对比。",
        footerLeft: "当前站点已提供正式入口、更新页、历史版本页与完整记录页",
        footerRight: "完整调整记录可在完整记录页继续查看",
        pills: [
          "最新发布： {date}",
          "当前版本： {version}",
          "支持单人 / 双人"
        ],
        overviewCards: [
          {
            label: "当前正式版本",
            title: "{version}",
            desc: "首页、游玩入口和历史版本页当前都围绕这一版组织，玩家默认进入的也是这个版本。"
          },
          {
            label: "支持模式",
            title: "单人 / 双人",
            desc: "两套默认键位都已接入主菜单、规则说明和正式游玩入口。"
          },
          {
            label: "地图轮换",
            title: "4 张地图",
            desc: "场景会按轮换周期切换，草丛、墙体和基地周边结构也会一起改变战斗节奏。"
          },
          {
            label: "Boss 设计",
            title: "3 类路线",
            desc: "当前版本已经把追击、弹幕和干扰型 Boss 玩法区分得比较明确，并把奖励选择扩展到了更直观的 4 选 1。"
          }
        ],
        focusCards: [
          {
            title: "战斗节奏",
            desc: "普通关与 Boss 关交替推进，单人模式已加入独立平衡补偿，双人模式保留协作火力与互相分担压力的优势。"
          },
          {
            title: "成长系统",
            desc: "Boss 通关后会提供更直观的多选强化，内容覆盖命数、弹药、暴击、冲刺、基地防守与后续奖励收益。"
          },
          {
            title: "场地交互",
            desc: "地图含草地、砖墙、钢墙、高血量墙和基地防守结构；草丛里的敌人会潜伏隐藏，并在关键动作时短暂显形。"
          }
        ],
        controlCards: [
          {
            title: "玩家 1 默认键位",
            items: ["`W/A/S/D`：移动", "`Space`：开火", "`Shift`：冲刺"]
          },
          {
            title: "玩家 2 默认键位",
            items: ["`8/4/5/6`：移动", "`9`：开火", "`3`：冲刺"]
          }
        ],
        historyCards: {
          currentTitle: "当前正式版本",
          currentDesc: "`{version}` 作为默认游玩入口，面向当前对外发布，并汇总了无敌反馈、草丛潜伏和基地砖成长这轮调整。",
          historyTitle: "历史版本",
          historyDesc: "`{version}` 作为可查找的历史版本保留，适合回看之前的手感与表现。",
          open: "打开 {version}"
        }
      },
      "en": {
        title: "Classic Tank Battle: Balance Edition",
        subtitle: "Browser co-op defense action game",
        navPlay: "Play",
        navUpdates: "Updates",
        navVersions: "Versions",
        navRecords: "Full log",
        eyebrow: "Release entry",
        lead: "A tank defense build refined around solo / co-op play, boss pressure, rotating maps and sharper controls. The current public entry points to <strong>{version}</strong>, with this build focusing on invulnerability feedback, grass stealth readability, boss reward choice and stronger base-brick progression.",
        start: "Play now",
        updates: "See updates",
        versions: "Version history",
        openFile: "Open version file",
        shotTitle: "Main menu and rules entry",
        shotDesc: "The homepage, play page, update page and full record page are now separated, and this build keeps the public-facing summary aligned with the latest balance changes.",
        overviewTitle: "Current version overview",
        overviewDesc: "This section keeps the default entry, gameplay scope and current priorities in one place, so visitors can understand the build at a glance.",
        focusTitle: "Gameplay focus",
        focusDesc: "This build is no longer just basic tank shooting. It has grown into a defense loop with progression, telegraphs, stealth pressure and paced supplies.",
        controlsTitle: "Controls and modes",
        controlsDesc: "Beyond the landing flow, the most important thing is getting a new player into a run immediately. The default controls stay visible here.",
        recentTitle: "Recent changes",
        recentDesc: "The release page keeps only the latest highlights, while the full adjustment trail remains in the full record page.",
        historyTitle: "Version history",
        historyDesc: "The public entry always points to the newest build, while the previous stable build stays available for comparison and fallback.",
        footerLeft: "This site already includes the release entry, update page, version history and full record page",
        footerRight: "You can continue reading the full adjustment log from the full record page",
        pills: [
          "Latest release: {date}",
          "Current build: {version}",
          "Solo / co-op supported"
        ],
        overviewCards: [
          {
            label: "Current release",
            title: "{version}",
            desc: "The homepage, play entry and version history page all point around this build, and it is the default version players enter."
          },
          {
            label: "Modes",
            title: "Solo / Co-op",
            desc: "Both default control layouts are already wired into the menu, rules page and release play entry."
          },
          {
            label: "Map rotation",
            title: "4 maps",
            desc: "Stages rotate on a cycle, and the terrain mix keeps grass, walls and base-side pressure from feeling the same every run."
          },
          {
            label: "Boss design",
            title: "3 routes",
            desc: "The current build clearly separates chase, bullet-pattern and disruption style bosses, and their rewards are now presented through a cleaner 4-choice pick."
          }
        ],
        focusCards: [
          {
            title: "Combat flow",
            desc: "Normal stages and boss stages alternate. Solo mode now has its own balance compensation, while co-op keeps the advantages of split pressure and shared firepower."
          },
          {
            title: "Progression",
            desc: "Boss clears now offer a clearer multi-choice upgrade set covering lives, ammo, crits, dash power, base defense and future reward economy."
          },
          {
            title: "Map interaction",
            desc: "Maps include grass, brick walls, steel walls, high-HP walls and base defenses, while enemies hiding in grass reveal themselves briefly during key actions."
          }
        ],
        controlCards: [
          {
            title: "Player 1 default controls",
            items: ["`W/A/S/D`: Move", "`Space`: Fire", "`Shift`: Dash"]
          },
          {
            title: "Player 2 default controls",
            items: ["`8/4/5/6`: Move", "`9`: Fire", "`3`: Dash"]
          }
        ],
        historyCards: {
          currentTitle: "Current release",
          currentDesc: "`{version}` is the default public play entry and currently rolls up the latest invulnerability, grass-stealth and base-growth adjustments.",
          historyTitle: "Older build",
          historyDesc: "`{version}` remains available as a visible historical build for feel and balance comparison.",
          open: "Open {version}"
        }
      },
      "ja": {
        title: "クラシックタンク大戦 バランス版",
        subtitle: "ブラウザ協力防衛アクションゲーム",
        navPlay: "ゲーム開始",
        navUpdates: "更新履歴",
        navVersions: "旧バージョン",
        navRecords: "完全記録",
        eyebrow: "正式公開入口",
        lead: "この防衛版は、1人 / 2人協力、Boss戦の圧力、マップ循環、操作感を中心に磨き続けています。現在の正式入口は <strong>{version}</strong> を指しており、今回は無敵表示、草むら潜伏の見やすさ、Boss報酬選択、基地レンガ成長を重点的に整えています。",
        start: "今すぐ開始",
        updates: "更新を見る",
        versions: "履歴版",
        openFile: "版ファイルを開く",
        shotTitle: "メインメニューとルール入口",
        shotDesc: "トップ、プレイページ、更新ページ、完全記録ページを分けているため、公開内容も今回の調整に合わせて追いやすくなっています。",
        overviewTitle: "現在版の概要",
        overviewDesc: "入口、遊び方、今回の重点を一か所にまとめ、初見でも把握しやすくしています。",
        focusTitle: "ゲームの重点",
        focusDesc: "この版は単なる戦車対戦ではなく、成長、予告、潜伏対抗、補給テンポを持つ防衛プレイへ広がっています。",
        controlsTitle: "操作とモード",
        controlsDesc: "公開導線以上に大切なのは、新しいプレイヤーがすぐ遊べることです。よく使う操作はここにまとめています。",
        recentTitle: "最近の変更",
        recentDesc: "公開ページには直近の要点のみを残し、詳細な調整記録は完全記録ページにまとめています。",
        historyTitle: "旧バージョン",
        historyDesc: "正式入口は常に最新版を指しつつ、直前の安定版も比較用に残しています。",
        footerLeft: "このサイトには正式入口、更新ページ、旧版ページ、完全記録ページが揃っています",
        footerRight: "詳細な調整履歴は完全記録ページで引き続き確認できます",
        pills: [
          "最新公開: {date}",
          "現在版: {version}",
          "1人 / 2人対応"
        ],
        overviewCards: [
          {
            label: "現在の正式版",
            title: "{version}",
            desc: "トップページ、プレイ入口、旧版ページはいずれもこの版を中心に整理され、プレイヤーもこの版へ入ります。"
          },
          {
            label: "対応モード",
            title: "1人 / 2人",
            desc: "2種類の初期操作設定が、メニュー、ルール説明、正式プレイ入口に組み込まれています。"
          },
          {
            label: "マップ循環",
            title: "4マップ",
            desc: "マップは周期で切り替わり、草むらや壁、基地周辺の圧力も毎回少しずつ変わります。"
          },
          {
            label: "Boss設計",
            title: "3系統",
            desc: "追撃、弾幕、妨害系Bossの違いが現行版ではかなり明確で、報酬選択も4択で見やすくなっています。"
          }
        ],
        focusCards: [
          {
            title: "戦闘テンポ",
            desc: "通常ステージとBossステージが交互に進み、1人用には専用の補正が入り、2人用は協力火力と負担分散の強みを残しています。"
          },
          {
            title: "成長要素",
            desc: "Boss撃破後には見やすい多択報酬が入り、残機、弾薬、クリティカル、ダッシュ、基地防衛、次の報酬効率まで広くカバーします。"
          },
          {
            title: "地形との相互作用",
            desc: "草地、レンガ壁、鋼壁、高耐久壁、基地防衛構造があり、草むらの敵は重要な行動時だけ短く姿を見せます。"
          }
        ],
        controlCards: [
          {
            title: "プレイヤー1 初期操作",
            items: ["`W/A/S/D`：移動", "`Space`：射撃", "`Shift`：ダッシュ"]
          },
          {
            title: "プレイヤー2 初期操作",
            items: ["`8/4/5/6`：移動", "`9`：射撃", "`3`：ダッシュ"]
          }
        ],
        historyCards: {
          currentTitle: "現在の正式版",
          currentDesc: "`{version}` は現在の対外公開向けプレイ入口で、今回の無敵表示や草むら潜伏、基地レンガ成長調整をまとめています。",
          historyTitle: "旧バージョン",
          historyDesc: "`{version}` は比較や振り返り用の履歴版として残しています。",
          open: "{version} を開く"
        }
      },
      "ko": {
        title: "클래식 탱크 대전 밸런스판",
        subtitle: "브라우저 협동 디펜스 액션 게임",
        navPlay: "게임 시작",
        navUpdates: "업데이트",
        navVersions: "이전 버전",
        navRecords: "전체 기록",
        eyebrow: "정식 배포 입구",
        lead: "이 방어형 탱크 빌드는 싱글 / 2인 협력, Boss 압박, 맵 순환, 조작 반응을 중심으로 계속 다듬어졌습니다. 현재 정식 입구는 <strong>{version}</strong> 을 가리키며, 이번에는 무적 표시, 풀숲 잠복 가독성, Boss 보상 선택, 기지 벽돌 성장 쪽을 특히 손봤습니다.",
        start: "바로 시작",
        updates: "업데이트 보기",
        versions: "버전 기록",
        openFile: "버전 파일 열기",
        shotTitle: "메인 메뉴와 규칙 입구",
        shotDesc: "메인 페이지, 플레이 페이지, 업데이트 페이지, 전체 기록 페이지를 나눠 두어서 이번 조정 내용도 공개 쪽에서 더 쉽게 따라갈 수 있습니다.",
        overviewTitle: "현재 버전 개요",
        overviewDesc: "진입점, 플레이 범위, 이번 핵심 조정을 한곳에 모아 처음 보는 사람도 바로 이해할 수 있게 정리했습니다.",
        focusTitle: "플레이 핵심",
        focusDesc: "이 버전은 단순한 탱크 사격을 넘어 성장, 예고, 잠복 압박, 보급 템포가 들어간 방어형 플레이로 확장되었습니다.",
        controlsTitle: "조작과 모드",
        controlsDesc: "랜딩보다 더 중요한 건 새 플레이어가 바로 플레이할 수 있는 점입니다. 자주 쓰는 기본 조작을 여기서 바로 확인할 수 있습니다.",
        recentTitle: "최근 변경점",
        recentDesc: "정식 공개 페이지에는 최근 핵심 변화만 남기고, 세부 조정 과정은 전체 기록 페이지에 유지합니다.",
        historyTitle: "이전 버전",
        historyDesc: "정식 입구는 항상 최신 버전으로 연결되며, 직전 안정판도 비교용으로 남겨 둡니다.",
        footerLeft: "이 사이트에는 정식 입구, 업데이트 페이지, 이전 버전 페이지, 전체 기록 페이지가 준비되어 있습니다",
        footerRight: "전체 조정 기록은 전체 기록 페이지에서 계속 확인할 수 있습니다",
        pills: [
          "최신 배포: {date}",
          "현재 버전: {version}",
          "싱글 / 2인 지원"
        ],
        overviewCards: [
          {
            label: "현재 정식 버전",
            title: "{version}",
            desc: "홈페이지, 플레이 입구, 버전 기록 페이지 모두 이 버전을 중심으로 정리되어 있고, 플레이어도 기본적으로 이 버전으로 들어갑니다."
          },
          {
            label: "지원 모드",
            title: "싱글 / 2인",
            desc: "두 가지 기본 조작 구성이 메뉴, 규칙 설명, 정식 플레이 입구까지 연결되어 있습니다."
          },
          {
            label: "맵 순환",
            title: "맵 4종",
            desc: "맵은 주기에 따라 교체되며, 풀숲과 벽, 기지 주변 압박도 함께 달라져 반복감이 줄어듭니다."
          },
          {
            label: "Boss 설계",
            title: "3가지 계열",
            desc: "추격형, 탄막형, 방해형 Boss의 성격 구분이 현재 버전에서 더 분명해졌고, 보상 선택도 4지선다로 더 직관적입니다."
          }
        ],
        focusCards: [
          {
            title: "전투 흐름",
            desc: "일반 스테이지와 Boss 스테이지가 번갈아 진행되며, 싱글에는 별도 보정이 들어가고 2인은 협력 화력과 부담 분산의 장점을 유지합니다."
          },
          {
            title: "성장 시스템",
            desc: "Boss 클리어 후에는 보기 쉬운 다중 선택 보상이 주어지며, 목숨, 탄약, 치명타, 돌진, 기지 방어, 이후 보상 효율까지 폭넓게 다룹니다."
          },
          {
            title: "지형 상호작용",
            desc: "풀숲, 벽돌벽, 강철벽, 고내구 벽, 기지 방어 구조가 있으며, 풀숲의 적은 중요한 행동을 할 때만 잠깐 모습을 드러냅니다."
          }
        ],
        controlCards: [
          {
            title: "플레이어 1 기본 키",
            items: ["`W/A/S/D`: 이동", "`Space`: 발사", "`Shift`: 돌진"]
          },
          {
            title: "플레이어 2 기본 키",
            items: ["`8/4/5/6`: 이동", "`9`: 발사", "`3`: 돌진"]
          }
        ],
        historyCards: {
          currentTitle: "현재 정식 버전",
          currentDesc: "`{version}` 은 현재 대외 공개용 기본 플레이 입구로, 이번 무적 표시와 풀숲 잠복, 기지 벽돌 성장 조정을 함께 담고 있습니다.",
          historyTitle: "이전 버전",
          historyDesc: "`{version}` 은 비교와 회고용으로 남겨 둔 기록 버전입니다.",
          open: "{version} 열기"
        }
      }
    },
    play: {
      "zh-CN": {
        title: "进入游戏",
        desc: "当前正式入口已指向 <strong>{version}</strong>。如果浏览器未自动跳转，请使用下面的按钮继续进入。",
        button: "打开最新版本"
      },
      "en": {
        title: "Entering game",
        desc: "The current public entry now points to <strong>{version}</strong>. If your browser does not redirect automatically, use the button below to continue.",
        button: "Open latest build"
      },
      "ja": {
        title: "ゲームへ移動中",
        desc: "現在の正式入口は <strong>{version}</strong> を指しています。自動で移動しない場合は、下のボタンから続行してください。",
        button: "最新版を開く"
      },
      "ko": {
        title: "게임으로 이동 중",
        desc: "현재 정식 입구는 <strong>{version}</strong> 을 가리키고 있습니다. 자동 이동이 되지 않으면 아래 버튼으로 계속해 주세요.",
        button: "최신 버전 열기"
      }
    },
    updates: {
      "zh-CN": {
        title: "版本更新",
        intro: "这里保留正式发布入口需要展示的近期更新摘要。更细的数值与调整细节，继续维护在根目录的完整版本说明里，适合后续持续追加。",
        navHome: "返回首页",
        navVersions: "历史版本",
        navRecords: "完整记录",
        play: "进入游戏",
        versions: "历史版本",
        records: "打开完整记录"
      },
      "en": {
        title: "Release updates",
        intro: "This page keeps the recent release highlights shown from the public entry. Deeper balance details and adjustment notes remain in the full record source.",
        navHome: "Back home",
        navVersions: "Versions",
        navRecords: "Full log",
        play: "Play now",
        versions: "Version history",
        records: "Open full log"
      },
      "ja": {
        title: "更新履歴",
        intro: "ここでは正式公開入口に必要な最近の更新要点だけをまとめています。より細かな数値調整は完全記録側で管理しています。",
        navHome: "トップへ戻る",
        navVersions: "旧バージョン",
        navRecords: "完全記録",
        play: "ゲーム開始",
        versions: "履歴版",
        records: "完全記録を開く"
      },
      "ko": {
        title: "업데이트",
        intro: "이 페이지에는 정식 공개 입구에서 보여 줄 최근 핵심 변경만 남기고, 더 자세한 수치 조정 기록은 전체 기록 쪽에 유지합니다.",
        navHome: "홈으로",
        navVersions: "이전 버전",
        navRecords: "전체 기록",
        play: "게임 시작",
        versions: "버전 기록",
        records: "전체 기록 열기"
      }
    },
    versions: {
      "zh-CN": {
        title: "历史版本",
        intro: "这里保留正式发布入口以外仍可访问的历史版本。默认推荐游玩最新版，历史版本主要用于回看、对比和备份。",
        navHome: "返回首页",
        navUpdates: "查看更新",
        currentMeta: "当前正式版本",
        historyMeta: "历史版本",
        open: "打开 {version}"
      },
      "en": {
        title: "Version history",
        intro: "This page keeps older accessible builds outside the main public entry. The latest build is still recommended by default, while older ones stay available for review, comparison and fallback.",
        navHome: "Back home",
        navUpdates: "View updates",
        currentMeta: "Current release",
        historyMeta: "Older build",
        open: "Open {version}"
      },
      "ja": {
        title: "旧バージョン",
        intro: "ここには正式公開入口以外からもアクセスできる履歴版を残しています。基本は最新版推奨ですが、比較や振り返り用に旧版も開けます。",
        navHome: "トップへ戻る",
        navUpdates: "更新を見る",
        currentMeta: "現在の正式版",
        historyMeta: "旧バージョン",
        open: "{version} を開く"
      },
      "ko": {
        title: "이전 버전",
        intro: "이곳에는 정식 공개 입구 밖에서도 접근할 수 있는 이전 빌드를 남겨 둡니다. 기본 권장은 최신 버전이지만 비교와 회고용으로 이전판도 열 수 있습니다.",
        navHome: "홈으로",
        navUpdates: "업데이트 보기",
        currentMeta: "현재 정식 버전",
        historyMeta: "이전 버전",
        open: "{version} 열기"
      }
    },
    records: {
      "zh-CN": {
        pageTitle: "完整记录 · 经典坦克大战平衡版",
        subtitle: "完整版本记录页",
        navHome: "首页",
        navPlay: "开始游戏",
        navUpdates: "版本更新",
        navVersions: "历史版本",
        eyebrow: "完整记录",
        heroTitle: "完整版本记录",
        heroDesc: "这里以更适合阅读的排版展示版本说明内容。记录源仍然是根目录的版本说明 Markdown 文件，现有记录已经按版本从新到旧整理，后续新版本也会继续写在最上方。",
        loading: "正在读取版本记录...",
        navTitle: "版本导航",
        navLoading: "正在生成导航...",
        orderChip: "按版本号倒序显示",
        loadFailed: "完整记录加载失败"
      },
      "en": {
        pageTitle: "Full log · Classic Tank Battle: Balance Edition",
        subtitle: "Full version record page",
        navHome: "Home",
        navPlay: "Play",
        navUpdates: "Updates",
        navVersions: "Versions",
        eyebrow: "Full log",
        heroTitle: "Full version record",
        heroDesc: "This page presents the version notes in a more readable layout. The source of truth is still the root Markdown record, and newer versions stay pinned above older ones.",
        loading: "Loading version notes...",
        navTitle: "Version navigation",
        navLoading: "Building navigation...",
        orderChip: "Newest version first",
        loadFailed: "Failed to load full record"
      },
      "ja": {
        pageTitle: "完全記録 · クラシックタンク大戦 バランス版",
        subtitle: "完全版記録ページ",
        navHome: "ホーム",
        navPlay: "ゲーム開始",
        navUpdates: "更新履歴",
        navVersions: "旧バージョン",
        eyebrow: "完全記録",
        heroTitle: "完全版記録",
        heroDesc: "ここでは版本説明をより読みやすいレイアウトで表示します。記録の元データはルートの Markdown で、今後も新しい版が上に追加されます。",
        loading: "版記録を読み込み中...",
        navTitle: "版ナビゲーション",
        navLoading: "ナビゲーションを生成中...",
        orderChip: "新しい版を上に表示",
        loadFailed: "完全記録の読み込みに失敗しました"
      },
      "ko": {
        pageTitle: "전체 기록 · 클래식 탱크 대전 밸런스판",
        subtitle: "전체 버전 기록 페이지",
        navHome: "홈",
        navPlay: "게임 시작",
        navUpdates: "업데이트",
        navVersions: "이전 버전",
        eyebrow: "전체 기록",
        heroTitle: "전체 버전 기록",
        heroDesc: "이 페이지는 버전 설명을 더 읽기 쉬운 레이아웃으로 보여 줍니다. 원본 기록은 루트 Markdown 파일을 기준으로 유지하며, 새 버전은 계속 위쪽에 쌓입니다.",
        loading: "버전 기록을 불러오는 중...",
        navTitle: "버전 탐색",
        navLoading: "탐색을 만드는 중...",
        orderChip: "최신 버전이 위에 표시됨",
        loadFailed: "전체 기록을 불러오지 못했습니다"
      }
    }
  };

  function normalizeLanguage(value) {
    return LANGS.some(item => item.code === value) ? value : "zh-CN";
  }

  function getLanguage() {
    try {
      return normalizeLanguage(localStorage.getItem(KEY));
    } catch {
      return "zh-CN";
    }
  }

  function setLanguage(code) {
    const lang = normalizeLanguage(code);
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
    return lang;
  }

  function format(template, values = {}) {
    return String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  }

  function getStrings(page = PAGE, lang = getLanguage()) {
    return TEXT[page]?.[lang] || TEXT[page]?.["zh-CN"] || null;
  }

  function renderSwitcher(current, onChange) {
    document.querySelectorAll("[data-language-switch]").forEach((host) => {
      host.innerHTML = "";
      LANGS.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = item.short;
        if (item.code === current) button.classList.add("active");
        button.addEventListener("click", () => onChange(item.code));
        host.appendChild(button);
      });
    });
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function getVersionFromHref(href) {
    return String(href || "").match(/v\d+(?:\.\d+)+/i)?.[0] || "v3.8";
  }

  function applyHome(strings) {
    const leadStrong = document.querySelector("#homeLead strong");
    const version = (leadStrong?.textContent || "v3.8").trim();
    const heroPills = Array.from(document.querySelectorAll(".hero-meta .pill"));
    const latestDate = heroPills[0]?.textContent.match(/\d{4}-\d{2}-\d{2}/)?.[0] || "2026-04-30";
    setText("homeBrandSubtitle", strings.subtitle);
    setText("navPlay", strings.navPlay);
    setText("navUpdates", strings.navUpdates);
    setText("navVersions", strings.navVersions);
    setText("navRecords", strings.navRecords);
    setText("homeEyebrow", strings.eyebrow);
    setText("homeTitle", strings.title);
    setHtml("homeLead", format(strings.lead, { version }));
    if (heroPills[0]) heroPills[0].textContent = format(strings.pills[0], { date: latestDate });
    if (heroPills[1]) heroPills[1].textContent = format(strings.pills[1], { version });
    if (heroPills[2]) heroPills[2].textContent = strings.pills[2];
    setText("homeStartButton", strings.start);
    setText("homeUpdatesButton", strings.updates);
    setText("homeVersionsButton", strings.versions);
    setText("homeFileButton", strings.openFile);
    setText("homeShotTitle", strings.shotTitle);
    setText("homeShotDesc", strings.shotDesc);
    setText("homeOverviewTitle", strings.overviewTitle);
    setText("homeOverviewDesc", strings.overviewDesc);
    setText("homeFocusTitle", strings.focusTitle);
    setText("homeFocusDesc", strings.focusDesc);
    setText("homeControlsTitle", strings.controlsTitle);
    setText("homeControlsDesc", strings.controlsDesc);
    setText("homeRecentTitle", strings.recentTitle);
    setText("homeRecentDesc", strings.recentDesc);
    setText("homeHistoryTitle", strings.historyTitle);
    setText("homeHistoryDesc", strings.historyDesc);
    setText("homeFooterLeft", strings.footerLeft);
    setText("homeFooterRight", strings.footerRight);

    const overviewPanels = document.querySelectorAll(".status .panel");
    strings.overviewCards.forEach((card, index) => {
      const panel = overviewPanels[index];
      if (!panel) return;
      const label = panel.querySelector(index === 0 ? ".overview-kicker" : "span");
      const title = panel.querySelector("strong");
      const desc = panel.querySelector("p");
      if (label) label.textContent = card.label;
      if (title) title.textContent = format(card.title, { version });
      if (desc) desc.textContent = card.desc;
    });

    const focusCards = document.getElementById("homeFocusTitle")?.closest(".section")?.querySelectorAll(".grid-3 .panel") || [];
    strings.focusCards.forEach((card, index) => {
      const panel = focusCards[index];
      if (!panel) return;
      const title = panel.querySelector("h3");
      const desc = panel.querySelector("p");
      if (title) title.textContent = card.title;
      if (desc) desc.textContent = card.desc;
    });

    const controlCards = document.getElementById("homeControlsTitle")?.closest(".section")?.querySelectorAll(".grid-2 .panel") || [];
    strings.controlCards.forEach((card, index) => {
      const panel = controlCards[index];
      if (!panel) return;
      const title = panel.querySelector("h3");
      const items = panel.querySelectorAll("li");
      if (title) title.textContent = card.title;
      card.items.forEach((item, itemIndex) => {
        if (items[itemIndex]) items[itemIndex].textContent = item;
      });
    });

    const historyCards = document.getElementById("homeHistoryTitle")?.closest(".section")?.querySelectorAll(".grid-2 .panel") || [];
    const currentPanel = historyCards[0];
    const historyPanel = historyCards[1];
    if (currentPanel) {
      const currentVersion = getVersionFromHref(currentPanel.querySelector("a")?.getAttribute("href"));
      const title = currentPanel.querySelector("h3");
      const paragraphs = currentPanel.querySelectorAll("p");
      const link = currentPanel.querySelector("a");
      if (title) title.textContent = strings.historyCards.currentTitle;
      if (paragraphs[0]) paragraphs[0].textContent = format(strings.historyCards.currentDesc, { version: currentVersion });
      if (link) link.textContent = format(strings.historyCards.open, { version: currentVersion });
    }
    if (historyPanel) {
      const historyVersion = getVersionFromHref(historyPanel.querySelector("a")?.getAttribute("href"));
      const title = historyPanel.querySelector("h3");
      const paragraphs = historyPanel.querySelectorAll("p");
      const link = historyPanel.querySelector("a");
      if (title) title.textContent = strings.historyCards.historyTitle;
      if (paragraphs[0]) paragraphs[0].textContent = format(strings.historyCards.historyDesc, { version: historyVersion });
      if (link) link.textContent = format(strings.historyCards.open, { version: historyVersion });
    }

    document.title = strings.title;
  }

  function applyPlay(strings) {
    const version = (document.querySelector("#playDesc strong")?.textContent || "v3.8").trim();
    setText("playTitle", strings.title);
    setHtml("playDesc", format(strings.desc, { version }));
    setText("playButton", strings.button);
    document.title = `${strings.title} · ${document.body?.dataset?.gameTitle || "经典坦克大战平衡版"}`;
  }

  function applyUpdates(strings) {
    setText("updateNavHome", strings.navHome);
    setText("updateNavVersions", strings.navVersions);
    setText("updateNavRecords", strings.navRecords);
    setText("updateTitle", strings.title);
    setText("updateIntro", strings.intro);
    setText("updatePlayButton", strings.play);
    setText("updateVersionsButton", strings.versions);
    setText("updateRecordsButton", strings.records);
    document.title = `${strings.title} · ${document.body?.dataset?.gameTitle || "经典坦克大战平衡版"}`;
  }

  function applyVersions(strings) {
    setText("versionNavHome", strings.navHome);
    setText("versionNavUpdates", strings.navUpdates);
    setText("versionTitle", strings.title);
    setText("versionIntro", strings.intro);
    document.querySelectorAll(".entry").forEach((entry) => {
      const meta = entry.querySelector(".meta");
      const button = entry.querySelector(".button");
      const version = entry.querySelector("h2")?.textContent?.trim() || getVersionFromHref(button?.getAttribute("href"));
      if (meta) {
        meta.textContent = button?.classList.contains("primary") ? strings.currentMeta : strings.historyMeta;
      }
      if (button) {
        button.textContent = format(strings.open, { version });
      }
    });
    document.title = `${strings.title} · ${document.body?.dataset?.gameTitle || "经典坦克大战平衡版"}`;
  }

  function applyRecords(strings) {
    setText("recordBrandSubtitle", strings.subtitle);
    setText("recordNavHome", strings.navHome);
    setText("recordNavPlay", strings.navPlay);
    setText("recordNavUpdates", strings.navUpdates);
    setText("recordNavVersions", strings.navVersions);
    setText("recordEyebrow", strings.eyebrow);
    setText("recordHeroTitle", strings.heroTitle);
    setText("recordHeroDesc", strings.heroDesc);
    const loading = document.getElementById("recordLoadingStatus");
    if (loading) loading.textContent = strings.loading;
    const navTitle = document.getElementById("recordTocTitle");
    if (navTitle) navTitle.textContent = strings.navTitle;
    const navLoading = document.getElementById("recordNavLoadingStatus");
    if (navLoading) navLoading.textContent = strings.navLoading;
    document.title = strings.pageTitle;
  }

  function apply() {
    const lang = getLanguage();
    document.documentElement.lang = lang;
    renderSwitcher(lang, (next) => {
      const updated = setLanguage(next);
      apply();
      window.dispatchEvent(new CustomEvent("tank-language-change", {
        detail: { language: updated }
      }));
    });
    const strings = getStrings(PAGE, lang);
    if (!strings) return;
    if (PAGE === "home") applyHome(strings);
    if (PAGE === "play") applyPlay(strings);
    if (PAGE === "updates") applyUpdates(strings);
    if (PAGE === "versions") applyVersions(strings);
    if (PAGE === "records") applyRecords(strings);
  }

  window.tankSiteLanguage = {
    getLanguage,
    setLanguage,
    getStrings,
    format
  };

  apply();
})();
