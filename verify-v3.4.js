const fs = require("fs");
const vm = require("vm");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function getScript(html) {
  const match = html.match(/<script>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error("未找到脚本内容");
  return match[1];
}

function sliceBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  if (startIndex < 0) throw new Error(`未找到片段起点: ${start}`);
  const endIndex = source.indexOf(end, startIndex);
  if (endIndex < 0) throw new Error(`未找到片段终点: ${end}`);
  return source.slice(startIndex, endIndex);
}

function loadInputHelpers(script) {
  const snippet = sliceBetween(script, "const keys = Object.create(null);", "const COLORS = {");
  const context = vm.createContext({});
  const exported = new vm.Script(`
    ${snippet}
    const state = { keyBindings: createDefaultKeyBindings() };
    this.exports = {
      keys,
      clearInputState,
      applyDirectionalKeydown,
      applyDirectionalKeyup,
      getActiveHeldDirection: typeof getActiveHeldDirection === "function" ? getActiveHeldDirection : null
    };
  `);
  exported.runInContext(context);
  return context.exports;
}

function loadBulletClass(script) {
  const snippet = sliceBetween(script, "class Bullet {", "class Tank {");
  const context = vm.createContext({
    GAME_W: 832,
    BASE_H: 832,
    TILE: 32,
    BRICK: 1,
    HARD: 5,
    STEEL: 2,
    OIL: 6,
    map: [[0]],
    brickArmorHP: [[0]],
    hardWallHP: [[0]],
    eagle: { alive: false, row: 0, col: 0 },
    enemies: [],
    players: [],
    bullets: [],
    hitEffects: [],
    explosions: [],
    floatTexts: [],
    BULLET_CLASH_BUCKET: 32,
    state: { shake: 0, score: 0, bestScore: 0, stage: 1 },
    COLORS: {
      hard: "#7c3aed",
      crit: "#ff66c4",
      enemyBullet: "#ff2d2d",
      bullet: "#ffffff",
      shield: "#67e8f9"
    },
    rectsOverlap(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x &&
             a.y < b.y + b.h && a.y + a.h > b.y;
    },
    makeBucketKey(x, y) {
      return `${x},${y}`;
    },
    triggerBarrelExplosion() {},
    applyPlayerCritRelic() {},
    handleEnemyDefeat() {},
    HitEffect: function HitEffect() {},
    CritEffect: function CritEffect() {},
    FloatText: function FloatText() {},
    Explosion: function Explosion() {},
    onPlayerDead() {},
    getStageConfig() {
      return { isBossStage: false };
    },
    spawnPowerup() {}
  });
  const exported = new vm.Script(`
    ${snippet}
    this.ExportedBullet = Bullet;
    this.ExportedResolveBulletClashes = typeof resolveBulletClashes === "function" ? resolveBulletClashes : null;
  `);
  exported.runInContext(context);
  return { Bullet: context.ExportedBullet, resolveBulletClashes: context.ExportedResolveBulletClashes, context };
}

function getActiveP1Direction(keys) {
  if (keys["w"] || keys["W"] || keys["KeyW"]) return "up";
  if (keys["s"] || keys["S"] || keys["KeyS"]) return "down";
  if (keys["a"] || keys["A"] || keys["KeyA"]) return "left";
  if (keys["d"] || keys["D"] || keys["KeyD"]) return "right";
  return "";
}

function testHeldDirectionFallback(script) {
  const { keys, clearInputState, applyDirectionalKeydown, applyDirectionalKeyup, getActiveHeldDirection } = loadInputHelpers(script);
  clearInputState();
  applyDirectionalKeydown({ key: "w", code: "KeyW" });
  applyDirectionalKeydown({ key: "d", code: "KeyD" });
  applyDirectionalKeyup({ key: "d", code: "KeyD" });
  const activeDir = typeof getActiveHeldDirection === "function"
    ? getActiveHeldDirection(1)
    : getActiveP1Direction(keys);
  assert(
    activeDir === "up",
    "按住W后再按D，松开D时应恢复到W方向"
  );
}

function testCritBulletBlocksExtraShot(script) {
  const { Bullet, resolveBulletClashes, context } = loadBulletClass(script);
  const critBullet = new Bullet(100, 100, 0, 0, { isPlayer: true }, 2);
  const enemyBullet = new Bullet(100, 100, 0, 0, { isPlayer: false }, 1);
  context.bullets.push(critBullet, enemyBullet);
  critBullet.update();
  if (typeof resolveBulletClashes === "function") {
    resolveBulletClashes();
  }
  assert(critBullet.alive, "暴击子弹应能额外抵消一次敌方子弹");
  assert(!enemyBullet.alive, "与暴击子弹碰撞的敌方子弹应被抵消");
}

function testFeatureHooks(script) {
  const requiredSnippets = [
    "drawSettingsScreen",
    "drawInvulnGauge",
    "drawAmmoStatus",
    "if (concealedInGrass) return;"
  ];
  for (const snippet of requiredSnippets) {
    assert(script.includes(snippet), `缺少功能代码片段: ${snippet}`);
  }
}

function loadGameplayHelpers(script) {
  const stateMatch = script.match(/const state = \{[\s\S]*?\n  \};/);
  if (!stateMatch) throw new Error("未找到 state 定义");
  const helperStart = script.indexOf("function addLives(");
  if (helperStart < 0) throw new Error("未找到 addLives");
  const helperEnd = script.indexOf("function normalizeLeaderboard(", helperStart);
  if (helperEnd < 0) throw new Error("未找到辅助函数片段终点");
  const eliteStart = script.indexOf("function getEliteSpawnChance(");
  if (eliteStart < 0) throw new Error("未找到 getEliteSpawnChance");
  const rewardStart = script.indexOf("function buildRelicChoices(");
  if (rewardStart < 0) throw new Error("未找到 buildRelicChoices");
  const rewardEnd = script.indexOf("function setStageIntro(", rewardStart);
  if (rewardEnd < 0) throw new Error("未找到奖励函数片段终点");

  const context = vm.createContext({
    Math,
    Date,
    console,
    SAVE_KEY: "test",
    LANGUAGE_STORAGE_KEY: "lang",
    localStorage: {
      getItem() { return null; },
      setItem() {}
    },
    createDefaultKeyBindings() { return {}; },
    normalizeKeyBindings(v) { return v || {}; },
    normalizeLanguage(v) { return v || "zh-CN"; },
    getStoredLanguage() { return "zh-CN"; },
    applyLanguage() {},
    t(key) { return key; },
    clamp(v, a, b) { return Math.max(a, Math.min(b, v)); },
    getDifficultyMode() { return "normal"; },
    getCurrentModeValue() { return 2; },
    isSinglePlayerMode() { return false; },
    players: [],
    buildStage() {},
    state: null
  });

  const exported = new vm.Script(`
    ${stateMatch[0]}
    ${script.slice(helperStart, helperEnd)}
    ${script.slice(rewardStart, rewardEnd)}
    this.exports = {
      state,
      getEliteSpawnChance,
      buildRelicChoices,
      applyRelicChoice,
      getRewardCardCount
    };
  `);
  exported.runInContext(context);
  context.state = context.exports.state;
  return { context, ...context.exports };
}

function testEliteSpawnChance(script) {
  const { getEliteSpawnChance } = loadGameplayHelpers(script);
  assert(getEliteSpawnChance(1) === 0, "第1关不应生成精英敌人");
  assert(getEliteSpawnChance(5) > 0, "第5关应开始生成精英敌人");
  assert(getEliteSpawnChance(13) > getEliteSpawnChance(9), "后期精英概率应高于中期");
}

function testRelicChoicesSkipOwned(script) {
  const { state, buildRelicChoices } = loadGameplayHelpers(script);
  state.ownedRelics = ["ammoEcho", "grassTracker"];
  state.relicChoices = [];
  buildRelicChoices();
  const ids = state.relicChoices.map(item => item.id);
  assert(!ids.includes("ammoEcho"), "已拥有的遗物不应再次进入候选");
  assert(!ids.includes("grassTracker"), "已拥有的遗物不应再次进入候选");
}

function testReviveStateFieldsExist(script) {
  const requiredSnippets = [
    "downedTimer",
    "reviveProgress",
    "drawReviveStatus",
    "attemptReviveTeammate"
  ];
  for (const snippet of requiredSnippets) {
    assert(script.includes(snippet), `缺少倒地救援相关代码片段: ${snippet}`);
  }
}

function main() {
  const file = process.argv[2];
  if (!file) throw new Error("请传入待验证的 HTML 文件路径");
  const html = fs.readFileSync(file, "utf8");
  const script = getScript(html);
  testHeldDirectionFallback(script);
  testCritBulletBlocksExtraShot(script);
  testEliteSpawnChance(script);
  testRelicChoicesSkipOwned(script);
  testReviveStateFieldsExist(script);
  testFeatureHooks(script);
  console.log(`验证通过: ${file}`);
}

main();
