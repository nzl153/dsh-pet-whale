// 小猫宠物私有的样式：部件外观 + 各状态动画。
// 与鲸鱼那张表同一套约定（见 pets/types.ts）：
//   - 只有本表被挂上时才会生效，所以选择器不需要宠物前缀；
//   - @keyframes 一律用 cat- 前缀（BASE_CSS 里的 pw-* 是鲸鱼和公共特效的，别重名）；
//   - 上色只用 --pw-* 变量，7 套色板自动生效。
// 几何基准：viewBox 0 0 26 19，眼线 y=5.95，中轴 x=13。
export const CAT_PET_CSS = `
/* ===== 泡泡（庆祝 + 点击）：HTML span，绝对定位在 .pet-official 上 ===== */
[data-dsh-whale] .bubble {
  position: absolute;
  left: 50%;
  bottom: 5px;
  width: 7px;
  height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: rgba(232,217,188,.9);
  border: 1px solid rgba(46,42,36,.15);
  opacity: 0;
  pointer-events: none;
}
[data-dsh-whale] .bubble::after {
  content: "";
  position: absolute;
  left: 1.4px;
  top: 1.4px;
  width: 2.2px;
  height: 2.2px;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
}
[data-dsh-whale] .bubble.show { animation: cat-rise 0.9s ease-out forwards; }

/* 深潜蓝泡 */
[data-dsh-whale] .bubble-blue {
  position: absolute;
  left: 50%;
  bottom: 4.5px;
  width: 6px;
  height: 6px;
  margin-left: -3.2px;
  border-radius: 50%;
  background: rgba(168,200,232,.78);
  border: 1px solid rgba(96,138,190,.4);
  opacity: 0;
  pointer-events: none;
}
[data-dsh-whale] .bubble-blue::after {
  content: "";
  position: absolute;
  left: 1.4px;
  top: 1.4px;
  width: 1.8px;
  height: 1.8px;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
}

/* ===== 待机 ===== */
[data-dsh-whale] .pet-official .body { animation: cat-breathe 3.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official .tail { animation: cat-tailSway 3.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official .eye-group { animation: cat-blink 4.6s ease-in-out infinite; transform-origin: 13px 5.95px; }

/* ===== 思考：蹲低 + 盯屏幕，蓝泡上浮 ===== */
[data-dsh-whale] .pet-official.think { animation: cat-crouch 3.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.think .bubble-blue { animation: cat-riseBlue 3.2s ease-out infinite; }
[data-dsh-whale] .pet-official.think .bubble-blue.bb2 { animation-delay: 0.9s; }
[data-dsh-whale] .pet-official.think .bubble-blue.bb3 { animation-delay: 1.8s; }
[data-dsh-whale] .pet-official.think .pupil-highlight { animation: cat-pupilGaze 2s ease-in-out infinite alternate; }

/* 游动（自主巡游） */
[data-dsh-whale] .pet-official.swim-dive,
[data-dsh-whale] .pet-official.swimming-dive { animation: cat-crouch 1.6s ease-in-out; filter: drop-shadow(0 6px 14px rgba(53, 80, 201, 0.28)); }
[data-dsh-whale] .pet-official.swim-dive .bubble-blue,
[data-dsh-whale] .pet-official.swimming-dive .bubble-blue { display: block; animation: cat-riseBlue 1.2s ease-out infinite; }
[data-dsh-whale] .pet-official.swimming .body { animation: cat-swimBody 0.85s ease-in-out infinite alternate; }

/* ===== 工作：敲键盘 + 代码粒子 ===== */
[data-dsh-whale] .pet-official.working { animation: cat-workWiggle 0.9s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .body { animation: none; }
[data-dsh-whale] .pet-official.working .keyboard-unit { display: block !important; }
[data-dsh-whale] .pet-official.working .code-particle { display: block !important; }

/* ===== 报错：炸毛 + 叉叉眼 ===== */
[data-dsh-whale] .pet-official.error { animation: cat-shake 0.5s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .angry { display: block; animation: cat-angryJitter 0.5s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .eye-group .eye,
[data-dsh-whale] .pet-official.error .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.error .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 13px 5.95px;
  animation: cat-dizzyShake 0.4s ease-in-out infinite alternate;
}

/* ===== 休眠：月牙眼 ===== */
[data-dsh-whale].sleeping .eye-group .eye,
[data-dsh-whale].sleeping .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].sleeping .eye-group .sleep-eyes { display: inline !important; }

/* ===== 开心 ===== */
[data-dsh-whale] .pet-official.joy { animation: cat-joyHop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) !important; }
[data-dsh-whale] .pet-official.joy .eye-group .eye,
[data-dsh-whale] .pet-official.joy .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.joy .eye-group .sleep-eyes { display: inline !important; }

/* ===== 戳晕 ===== */
[data-dsh-whale] .pet-official.dizzy { animation: cat-dizzyWobble 0.8s ease-in-out !important; }
[data-dsh-whale] .pet-official.dizzy .eye-group .eye,
[data-dsh-whale] .pet-official.dizzy .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.dizzy .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 13px 5.95px;
  animation: cat-dizzyShake 0.35s ease-in-out infinite alternate;
}

/* ===== 甩晕 ===== */
[data-dsh-whale] .pet-official.shaken .eye-group .eye,
[data-dsh-whale] .pet-official.shaken .eye-group .pupil-highlight { opacity: 0 !important; }
/* 正晕着比被抓住更该被看见，所以压过拖拽的勾勾眼 */
[data-dsh-whale].dragging .pet-official.shaken .eye-group .caught-eyes { display: none !important; }
[data-dsh-whale] .pet-official.shaken .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 13px 5.95px;
  animation: cat-dizzyShake 0.22s ease-in-out infinite alternate;
}
/* 松手后才摇身体：拖拽态给 .pet-official 上了 !important 的 transform，动画压不过 */
[data-dsh-whale]:not(.dragging) .pet-official.shaken { animation: cat-dizzyWobble 0.7s ease-in-out 2 !important; }

/* ===== 翻肚皮（双击的专属反应） ===== */
[data-dsh-whale] .pet-official.belly-up { animation: cat-bellyUp 2s cubic-bezier(0.34, 1.4, 0.64, 1) !important; }
[data-dsh-whale] .pet-official.belly-up .eye-group .eye,
[data-dsh-whale] .pet-official.belly-up .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.belly-up .eye-group .sleep-eyes { display: inline !important; }

/* ===== 贴边挤扁 ===== */
[data-dsh-whale].edge-left .pet-official .body,
[data-dsh-whale].edge-right .pet-official .body,
[data-dsh-whale].dragging.edge-left .pet-official .body,
[data-dsh-whale].dragging.edge-right .pet-official .body {
  transform-origin: 50% 50%;
  animation: cat-squeeze 0.35s ease-out forwards !important;
}

/* 拖着不动又不耐烦 */
[data-dsh-whale].dragging .pet-official.impatient .body { animation: cat-impatientSway 0.9s ease-in-out infinite !important; }

/* 连戳中段：侧身躲 */
[data-dsh-whale] .pet-official.annoyed { animation: cat-annoyedDodge 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) !important; }

/* 连戳过头：扭头吊眉 */
[data-dsh-whale] .pet-official.sulking { animation: cat-sulkTurn 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) forwards !important; }
[data-dsh-whale] .pet-official.sulking .eye-group .angry-eyes { display: inline !important; }

/* ===== 欢迎态 / 庆祝 ===== */
[data-dsh-whale] .pet-official.welcome { animation: cat-leap 1.2s ease-in-out !important; }
[data-dsh-whale] .pet-official.welcome .stars { display: block !important; }
[data-dsh-whale] .pet-official.welcome .spout-group {
  display: inline !important;
  transform-origin: 13px 1.6px;
  animation: cat-puff 1.1s cubic-bezier(0.2, 0.8, 0.35, 1);
}
[data-dsh-whale] .pet-official.celebrate { animation: cat-leap 1.4s ease-in-out infinite; }
/* 星星在 SVG 里是内联 display:none，这里必须 !important 才压得住（鲸鱼那张表漏了它） */
[data-dsh-whale] .pet-official.celebrate .stars { display: block !important; }
[data-dsh-whale] .pet-official.celebrate .starL { animation: cat-starSpin 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .starR { animation: cat-starSpin 1.2s ease-in-out 0.3s infinite; }
[data-dsh-whale] .pet-official.celebrate .bubble { animation: cat-rise 1.2s ease-out 0.3s infinite; }
[data-dsh-whale] .pet-official.celebrate .bubble.b2 { animation-delay: 0.7s; }
[data-dsh-whale] .pet-official.celebrate .bubble.b3 { animation-delay: 1.05s; }
[data-dsh-whale] .pet-official.celebrate .spout-group,
[data-dsh-whale] .pet-official.spouting .spout-group {
  display: inline !important;
  transform-origin: 13px 1.6px;
  animation: cat-puff 1.3s cubic-bezier(0.2, 0.8, 0.35, 1) infinite;
}

/* ===== 等待输入 / 失落 ===== */
[data-dsh-whale] .pet-official.wait { animation: cat-wait 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.wait .bubble-blue { display: block; animation: cat-riseBlue 1.2s ease-out infinite; }
[data-dsh-whale] .pet-official.disappointed { animation: cat-disappointed 2.6s ease-in-out infinite; }

/* 双击翻滚特技 */
[data-dsh-whale] .pet-official.rolling { animation: cat-rollTrick 0.65s cubic-bezier(0.34, 1.4, 0.64, 1) !important; }

/* 点击挤压回弹：作用在 SVG 上，不干扰位置 */
[data-dsh-whale] .pet-official.squish svg { animation: cat-squish 0.42s cubic-bezier(0.25, 1.4, 0.5, 1); }

/* ===== 拖拽中：暂停状态动画 + 斜拉变形 ===== */
[data-dsh-whale].dragging .pet-official {
  animation: none !important;
  transform: scaleX(1) rotate(-5deg) scale(1.04, 0.96) !important;
}
[data-dsh-whale].dragging[data-facing="right"] .pet-official {
  transform: scaleX(-1) rotate(5deg) scale(1.04, 0.96) !important;
}
[data-dsh-whale].dragging .pet-official .body { animation: none !important; }

/* 被抓/拖拽：勾勾眼（>_<） */
[data-dsh-whale].dragging .eye-group .eye,
[data-dsh-whale].dragging .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes { display: inline !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes path { stroke: var(--pw-eye, #2E2A24) !important; stroke-width: 0.34 !important; }

/* 打瞌睡：耳朵趴下、身体起伏 */
[data-dsh-whale].sleeping .pet-official .body { animation: cat-sleepBob 4s ease-in-out infinite !important; }
[data-dsh-whale].sleeping .pet-official .tail { animation: none !important; }
[data-dsh-whale].sleeping .pet-official .eye-group { transform: scaleY(0.08) !important; }
[data-dsh-whale].sleeping .pet-official .pupil-highlight { opacity: 0 !important; }

/* 悬停：腮红加深 */
[data-dsh-whale] .pet-official:hover .cat-blush { opacity: .72; }

/* 键盘与代码粒子 */
[data-dsh-whale] .tap-k1 { animation: cat-keyTap1 0.16s ease-in-out infinite alternate; }
[data-dsh-whale] .tap-k2 { animation: cat-keyTap2 0.18s ease-in-out 0.08s infinite alternate; }
[data-dsh-whale] .code-fx1 { animation: cat-codeFloat1 1.2s ease-out infinite; }
[data-dsh-whale] .code-fx2 { animation: cat-codeFloat2 1.2s ease-out 0.6s infinite; }

/* ===== keyframes（cat- 前缀） ===== */
@keyframes cat-breathe {
  0%,100% { transform: translateY(0) scale(1, 1); }
  50%     { transform: translateY(-1.4px) scale(1.012, .988); }
}
@keyframes cat-tailSway {
  0%,100% { transform: rotate(0deg); }
  50%     { transform: rotate(11deg); }
}
@keyframes cat-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95%, 97%      { transform: scaleY(0.12); }
}
@keyframes cat-crouch {
  0%,100% { transform: translateY(0) rotate(0deg) scale(1, 1); opacity: 1; }
  35%     { transform: translateY(2.2px) rotate(-2deg) scale(1.02, .97); opacity: .92; }
  65%     { transform: translateY(1.2px) rotate(1.4deg) scale(.99, 1.02); opacity: .96; }
}
@keyframes cat-workWiggle {
  0%,100% { transform: translateX(0) rotate(0deg); }
  25%     { transform: translateX(-1.2px) rotate(-1.2deg); }
  75%     { transform: translateX(1.2px) rotate(1.2deg); }
}
@keyframes cat-swimBody {
  0%   { transform: translateY(0) rotate(-2deg); }
  100% { transform: translateY(-2px) rotate(2deg); }
}
@keyframes cat-pupilGaze {
  0%   { transform: translate(-0.25px, -0.25px); }
  100% { transform: translate(0.35px, -0.45px); }
}
@keyframes cat-shake {
  0%,100% { transform: translateX(0) rotate(0deg); }
  25%     { transform: translateX(-1.1px) rotate(-1.6deg); }
  75%     { transform: translateX(1.1px) rotate(1.6deg); }
}
@keyframes cat-angryJitter {
  0%,100% { transform: translate(0, 0); }
  50%     { transform: translate(0.5px, -0.4px); }
}
@keyframes cat-dizzyShake {
  0%   { transform: rotate(-6deg) scale(1); }
  100% { transform: rotate(6deg) scale(1.06); }
}
@keyframes cat-dizzyWobble {
  0%   { transform: rotate(0deg); }
  20%  { transform: rotate(-7deg); }
  45%  { transform: rotate(6deg); }
  70%  { transform: rotate(-4deg); }
  100% { transform: rotate(0deg); }
}
@keyframes cat-joyHop {
  0%,100% { transform: translateY(0) scale(1, 1); }
  25%     { transform: translateY(-7px) scale(.98, 1.05); }
  55%     { transform: translateY(1px) scale(1.05, .95); }
  75%     { transform: translateY(-2.5px) scale(.995, 1.01); }
}
@keyframes cat-bellyUp {
  0%   { transform: rotate(0deg) translateY(0); }
  30%  { transform: rotate(-90deg) translateY(-5px); }
  55%  { transform: rotate(-160deg) translateY(3px); }
  75%  { transform: rotate(-160deg) translateY(3px); }
  100% { transform: rotate(-360deg) translateY(0); }
}
@keyframes cat-squeeze {
  0%   { transform: scaleX(1) scaleY(1); }
  40%  { transform: scaleX(.62) scaleY(1.08); }
  100% { transform: scaleX(.68) scaleY(1.06); }
}
@keyframes cat-impatientSway {
  0%,100% { transform: rotate(-2.5deg); }
  50%     { transform: rotate(2.5deg); }
}
@keyframes cat-annoyedDodge {
  0%,100% { transform: translateX(0) rotate(0deg); }
  35%     { transform: translateX(4px) rotate(4deg); }
  70%     { transform: translateX(-1.5px) rotate(-2deg); }
}
@keyframes cat-sulkTurn {
  0%   { transform: translateX(0) rotate(0deg); }
  100% { transform: translateX(1.5px) rotate(7deg); }
}
@keyframes cat-leap {
  0%,100% { transform: translateY(0) rotate(0deg) scale(1, 1); }
  14%     { transform: translateY(-16px) rotate(-5deg) scale(.97, 1.05); }
  36%     { transform: translateY(1px) rotate(3deg) scale(1.07, .9); }
  58%     { transform: translateY(-7px) rotate(-2deg) scale(.99, 1.02); }
  78%     { transform: translateY(0) rotate(1deg) scale(1.02, .98); }
}
@keyframes cat-puff {
  0%   { transform: translateY(3px) scale(.55); opacity: 0; }
  30%  { transform: translateY(0) scale(1); opacity: .95; }
  100% { transform: translateY(-7px) scale(1.15); opacity: 0; }
}
@keyframes cat-starSpin {
  0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50%     { transform: scale(1.3) rotate(20deg); opacity: .6; }
}
@keyframes cat-rise {
  0%   { transform: translateY(0) scale(.55); opacity: 0; }
  25%  { opacity: .95; }
  100% { transform: translateY(-34px) scale(1); opacity: 0; }
}
@keyframes cat-riseBlue {
  0%   { transform: translateY(0) scale(.55); opacity: 0; }
  25%  { opacity: .9; }
  100% { transform: translateY(-30px) scale(1); opacity: 0; }
}
@keyframes cat-wait {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50%     { transform: translateY(-1.5px) rotate(-1.5deg); }
}
@keyframes cat-disappointed {
  0%,100% { transform: translateY(0) scale(1, 1); }
  35%     { transform: translateY(1.8px) scale(1.03, .96); }
  70%     { transform: translateY(1.2px) scale(1.02, .975); }
}
@keyframes cat-rollTrick {
  0%   { transform: translateY(0) rotate(0deg) scale(1, 1); }
  30%  { transform: translateY(-12px) rotate(-120deg) scale(1.06, .94); }
  70%  { transform: translateY(-7px) rotate(-260deg) scale(.96, 1.04); }
  100% { transform: translateY(0) rotate(-360deg) scale(1, 1); }
}
@keyframes cat-squish {
  0%   { transform: scale(1, 1); }
  35%  { transform: scale(1.11, .86); }
  70%  { transform: scale(.96, 1.05); }
  100% { transform: scale(1, 1); }
}
@keyframes cat-sleepBob {
  0%,100% { transform: translateY(0) scale(1, 1); }
  50%     { transform: translateY(1.6px) scale(1.02, .975); }
}
@keyframes cat-keyTap1 {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(0.42px); }
}
@keyframes cat-keyTap2 {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(0.42px); }
}
@keyframes cat-codeFloat1 {
  0%   { transform: translateY(0) scale(0.5); opacity: 0; }
  30%  { opacity: 0.95; }
  100% { transform: translateY(-13px) translateX(-4px) scale(1); opacity: 0; }
}
@keyframes cat-codeFloat2 {
  0%   { transform: translateY(0) scale(0.5); opacity: 0; }
  30%  { opacity: 0.95; }
  100% { transform: translateY(-14px) translateX(3px) scale(1.05); opacity: 0; }
}
`
