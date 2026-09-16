// 灵儿的宠物样式表：契约部件的外观 + 各状态动画 + 御剑飞行的粒子改造。
// 约定与鲸鱼/猫一致（见 pets/types.ts）：只有本表挂上时生效，选择器不需要宠物前缀，
// @keyframes 一律用 linger- 前缀（BASE_CSS 里的 pw-* 是鲸鱼与公共特效的）。
// 几何基准：viewBox 0 0 26 35，眼线 y=8.05，腰线 y=18.4，肩线 y=14.6，中轴 x=13。
export const LINGER_PET_CSS = `
/* ===== 灵儿专属变量：她那身白袍要保持"白"，只有蓝/红的部件跟着色板走 ===== */
[data-dsh-whale] {
  --pw-robe: #F7F9FC;        /* 白袍主色 */
  --pw-robe-shade: #E4EAF2;  /* 白袍暗部 */
}

/* ===== 容器是竖盒子（index.ts 里 size: 104×140），这几处跟着改 ===== */
[data-dsh-whale][data-pet="linger"] .dsh-whale-shadow {
  bottom: calc(-4px * var(--pw-scale));
  width: calc(52px * var(--pw-scale));
  height: calc(10px * var(--pw-scale));
  margin-left: calc(-26px * var(--pw-scale));
}
[data-dsh-whale] .dsh-whale-zzz { left: 60%; top: 22px; }
/* 巡游时的光晕换成剑气青光 */
[data-dsh-whale] .dsh-whale-wake {
  width: calc(120px * var(--pw-scale));
  height: calc(120px * var(--pw-scale));
  margin-left: calc(-60px * var(--pw-scale));
  margin-top: calc(-60px * var(--pw-scale));
  background: radial-gradient(ellipse at center, rgba(168, 236, 255, 0.30) 0%, rgba(96, 190, 220, 0.10) 50%, transparent 72%);
}

/* ===== 泡泡（庆祝 + 点击）===== */
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
[data-dsh-whale] .bubble.show { animation: linger-rise 0.9s ease-out forwards; }
[data-dsh-whale] .bubble-blue {
  position: absolute;
  left: 50%;
  bottom: 4.5px;
  width: 6px;
  height: 6px;
  margin-left: -3.2px;
  border-radius: 50%;
  background: rgba(190,235,245,.8);
  border: 1px solid rgba(96,180,200,.45);
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

/* ===== 待机：呼吸 + 裙摆与披帛飘 + 长发微动 + 手轻摆 ===== */
[data-dsh-whale] .pet-official .body { animation: linger-breathe 3.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official .skirt { animation: linger-skirtSway 3.8s ease-in-out infinite; }
[data-dsh-whale] .pet-official .sash { animation: linger-sashFloat 3.0s ease-in-out infinite; }
[data-dsh-whale] .pet-official .sash + .sash { animation-delay: -1.1s; }
[data-dsh-whale] .pet-official .ribbon { animation: linger-ribbonFlutter 2.4s ease-in-out infinite; transform-origin: 13px 3.4px; }
[data-dsh-whale] .pet-official .hair-front { animation: linger-hairSway 3.8s ease-in-out infinite; }
[data-dsh-whale] .pet-official .hair-front + .hair-front { animation-delay: -1.5s; }
[data-dsh-whale] .pet-official .eye-group { animation: linger-blink 4.8s ease-in-out infinite; transform-origin: 13px 9.15px; }
/* 手：待机时轻轻前后摆（宽度 ±0.35 单位，看得见但不夸张） */
[data-dsh-whale] .pet-official .arm { animation: linger-armSway 3.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official .arm + .arm { animation-delay: -1.7s; }

/* ===== 思考：凝神掐诀（抬手 + 灵光），与 idle 明显区分 ===== */
[data-dsh-whale] .pet-official.think { animation: linger-meditate 3.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.think .arm { animation: linger-armThinkL 3.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.think .arm + .arm { animation: linger-armThinkR 3.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.think .hand-seal { display: block !important; }
[data-dsh-whale] .pet-official.think .hand-seal circle { animation: linger-sealGlow 1.6s ease-in-out infinite; transform-origin: 13px 21.2px; }
[data-dsh-whale] .pet-official.think .bubble-blue { animation: linger-riseBlue 3.2s ease-out infinite; }
[data-dsh-whale] .pet-official.think .bubble-blue.bb2 { animation-delay: 0.9s; }
[data-dsh-whale] .pet-official.think .bubble-blue.bb3 { animation-delay: 1.8s; }
[data-dsh-whale] .pet-official.think .pupil-highlight { animation: linger-pupilGaze 2.2s ease-in-out infinite alternate; }

/* ===== 御剑飞行（自主巡游）===== */
[data-dsh-whale] .pet-official.swimming .body,
[data-dsh-whale] .pet-official.swimming-dive .body { animation: linger-fly 1.1s ease-in-out infinite; }
[data-dsh-whale] .pet-official.swim-dive .body,
[data-dsh-whale] .pet-official.swimming-dive .body { animation: linger-flyDive 1.6s ease-in-out; }
[data-dsh-whale] .pet-official.swimming .sword,
[data-dsh-whale] .pet-official.swim-dive .sword,
[data-dsh-whale] .pet-official.swimming-dive .sword {
  /* !important 必需：SVG 上写了行内 display:none，普通声明压不过它（这里踩过坑） */
  display: block !important;
  animation: linger-bladeFloat 1.1s ease-in-out infinite;
  transform-origin: 13px 47px;
}
[data-dsh-whale] .pet-official.swimming .skirt { animation: linger-skirtTrail 1.1s ease-in-out infinite; }
[data-dsh-whale] .pet-official.swimming .sash { animation: linger-sashTrail 0.9s ease-in-out infinite; }
[data-dsh-whale] .pet-official.swim-dive .bubble-blue,
[data-dsh-whale] .pet-official.swimming-dive .bubble-blue { display: block; animation: linger-riseBlue 1.2s ease-out infinite; }

/* ===== 工作：脚下起法阵，符文浮动 ===== */
[data-dsh-whale] .pet-official.working { animation: linger-cast 1.0s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .body { animation: none; }
[data-dsh-whale] .pet-official.working .keyboard-unit { display: block !important; }
[data-dsh-whale] .pet-official.working .code-particle { display: block !important; }
[data-dsh-whale] .pet-official.working .skirt { animation: linger-skirtSway 1.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .sash { animation: linger-sashFloat 1.4s ease-in-out infinite; }
/* 施法时双手抬起画诀 */
[data-dsh-whale] .pet-official.working .arm { animation: linger-armCastL 1.0s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .arm + .arm { animation: linger-armCastR 1.0s ease-in-out infinite; }

/* ===== 报错：施法失败，符光乱窜 ===== */
[data-dsh-whale] .pet-official.error { animation: linger-shake 0.5s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .angry { display: block !important; animation: linger-angryJitter 0.5s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .eye-group .eye,
[data-dsh-whale] .pet-official.error .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.error .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 13px 9.15px;
  animation: linger-dizzyShake 0.4s ease-in-out infinite alternate;
}

/* ===== 打坐入定 ===== */
[data-dsh-whale].sleeping .eye-group .eye,
[data-dsh-whale].sleeping .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].sleeping .eye-group .sleep-eyes { display: inline !important; }

/* ===== 开心：轻跃（手也跟着扬起来） ===== */
[data-dsh-whale] .pet-official.joy { animation: linger-joyHop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) !important; }
[data-dsh-whale] .pet-official.joy .arm { animation: linger-armUpL 0.9s ease-in-out infinite; }
[data-dsh-whale] .pet-official.joy .arm + .arm { animation: linger-armUpR 0.9s ease-in-out infinite; }
[data-dsh-whale] .pet-official.joy .eye-group .eye,
[data-dsh-whale] .pet-official.joy .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.joy .eye-group .sleep-eyes { display: inline !important; }

/* ===== 戳晕 ===== */
[data-dsh-whale] .pet-official.dizzy { animation: linger-dizzyWobble 0.8s ease-in-out !important; }
[data-dsh-whale] .pet-official.dizzy .eye-group .eye,
[data-dsh-whale] .pet-official.dizzy .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.dizzy .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 13px 9.15px;
  animation: linger-dizzyShake 0.35s ease-in-out infinite alternate;
}

/* ===== 甩晕：发髻散乱 ===== */
[data-dsh-whale] .pet-official.shaken .eye-group .eye,
[data-dsh-whale] .pet-official.shaken .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].dragging .pet-official.shaken .eye-group .caught-eyes { display: none !important; }
[data-dsh-whale] .pet-official.shaken .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 13px 9.15px;
  animation: linger-dizzyShake 0.22s ease-in-out infinite alternate;
}
[data-dsh-whale]:not(.dragging) .pet-official.shaken { animation: linger-dizzyWobble 0.7s ease-in-out 2 !important; }

/* ===== 双击：旋身行礼（替代鲸鱼的翻肚皮）===== */
[data-dsh-whale] .pet-official.belly-up { animation: linger-spinBow 1.9s cubic-bezier(0.34, 1.3, 0.64, 1) !important; }
[data-dsh-whale] .pet-official.belly-up .eye-group .eye,
[data-dsh-whale] .pet-official.belly-up .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.belly-up .eye-group .sleep-eyes { display: inline !important; }
[data-dsh-whale] .pet-official.belly-up .sash { animation: linger-sashSpin 1.9s ease-in-out; }

/* ===== 贴边挤扁 ===== */
[data-dsh-whale].edge-left .pet-official .body,
[data-dsh-whale].edge-right .pet-official .body,
[data-dsh-whale].dragging.edge-left .pet-official .body,
[data-dsh-whale].dragging.edge-right .pet-official .body {
  transform-origin: 50% 50%;
  animation: linger-squeeze 0.35s ease-out forwards !important;
}

/* 拖着不动又不耐烦 */
[data-dsh-whale].dragging .pet-official.impatient .body { animation: linger-impatientSway 0.9s ease-in-out infinite !important; }
/* 连戳中段：侧身躲 */
[data-dsh-whale] .pet-official.annoyed { animation: linger-annoyedDodge 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) !important; }
/* 连戳过头：扭头吊眉 */
[data-dsh-whale] .pet-official.sulking { animation: linger-sulkTurn 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) forwards !important; }
[data-dsh-whale] .pet-official.sulking .eye-group .angry-eyes { display: inline !important; }

/* ===== 欢迎 / 庆祝：跃起 + 灵光花瓣 ===== */
[data-dsh-whale] .pet-official.welcome { animation: linger-leap 1.2s ease-in-out !important; }
[data-dsh-whale] .pet-official.welcome .stars { display: block !important; }
[data-dsh-whale] .pet-official.welcome .spout-group {
  display: inline !important;
  transform-origin: 13px 3.0px;
  animation: linger-petal 1.2s cubic-bezier(0.2, 0.8, 0.35, 1);
}
[data-dsh-whale] .pet-official.celebrate { animation: linger-leap 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .arm { animation: linger-armUpL 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .arm + .arm { animation: linger-armUpR 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .stars { display: block !important; }
[data-dsh-whale] .pet-official.celebrate .starL { animation: linger-starSpin 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .starR { animation: linger-starSpin 1.2s ease-in-out 0.3s infinite; }
[data-dsh-whale] .pet-official.celebrate .bubble { animation: linger-rise 1.2s ease-out 0.3s infinite; }
[data-dsh-whale] .pet-official.celebrate .bubble.b2 { animation-delay: 0.7s; }
[data-dsh-whale] .pet-official.celebrate .bubble.b3 { animation-delay: 1.05s; }
[data-dsh-whale] .pet-official.celebrate .spout-group,
[data-dsh-whale] .pet-official.spouting .spout-group {
  display: inline !important;
  transform-origin: 13px 3.0px;
  animation: linger-petal 1.3s cubic-bezier(0.2, 0.8, 0.35, 1) infinite;
}

/* ===== 等待输入 / 失落 ===== */
[data-dsh-whale] .pet-official.wait { animation: linger-wait 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.wait .bubble-blue { display: block; animation: linger-riseBlue 1.2s ease-out infinite; }
[data-dsh-whale] .pet-official.disappointed { animation: linger-disappointed 2.6s ease-in-out infinite; }

/* 双击翻滚特技（摸头/翻跟头按钮） */
[data-dsh-whale] .pet-official.rolling { animation: linger-spinBow 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) !important; }
/* 点击挤压回弹 */
[data-dsh-whale] .pet-official.squish svg { animation: linger-squish 0.42s cubic-bezier(0.25, 1.4, 0.5, 1); }

/* ===== 拖拽中 ===== */
[data-dsh-whale].dragging .pet-official {
  animation: none !important;
  transform: scaleX(1) rotate(-5deg) scale(1.04, 0.96) !important;
}
[data-dsh-whale].dragging[data-facing="right"] .pet-official {
  transform: scaleX(-1) rotate(5deg) scale(1.04, 0.96) !important;
}
[data-dsh-whale].dragging .pet-official .body { animation: none !important; }
[data-dsh-whale].dragging .eye-group .eye,
[data-dsh-whale].dragging .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes { display: inline !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes path { stroke: var(--pw-eye, #2E2A24) !important; stroke-width: 0.34 !important; }

/* 打坐入定：身体起伏、裙摆收拢 */
[data-dsh-whale].sleeping .pet-official .body { animation: linger-sleepBob 4s ease-in-out infinite !important; }
[data-dsh-whale].sleeping .pet-official .skirt { animation: linger-skirtSway 6s ease-in-out infinite; }
[data-dsh-whale].sleeping .pet-official .sash { animation: none !important; }
[data-dsh-whale].sleeping .pet-official .eye-group { transform: scaleY(0.08) !important; }
[data-dsh-whale].sleeping .pet-official .pupil-highlight { opacity: 0 !important; }

/* 悬停：腮红加深 */
[data-dsh-whale] .pet-official:hover .blush { opacity: .78; }

/* 符文与法阵的动画 */
[data-dsh-whale] .tap-k1 { animation: linger-formation 6s linear infinite; transform-origin: 13px 44px; }
[data-dsh-whale] .tap-k2 { animation: linger-runePulse 1.4s ease-in-out infinite; transform-origin: 13px 44px; }
[data-dsh-whale] .code-fx1 { animation: linger-runeFloat1 1.6s ease-out infinite; }
[data-dsh-whale] .code-fx2 { animation: linger-runeFloat2 1.6s ease-out 0.7s infinite; }

/* ===== 御剑飞行：把公共的水花粒子改造成剑气与云气 =====
   粒子由 swim.ts 生成、挂在 body 下的共享层 [data-dsh-whale-particles]，
   所以要用属性选择器而不是 [data-dsh-whale]（层不在宠物容器里）。 */
[data-dsh-whale-particles] .pw-water-ripple {
  border: 1.2px solid rgba(186, 240, 255, 0.75);
  background: radial-gradient(ellipse at center, rgba(186, 240, 255, 0.24) 0%, rgba(96, 200, 225, 0.06) 55%, transparent 75%);
  box-shadow: 0 0 10px rgba(150, 230, 255, 0.5);
}
[data-dsh-whale-particles] .pw-stream-bubble {
  background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, rgba(206, 244, 255, 0.8) 55%, rgba(120, 205, 230, 0.35) 100%);
  border: 0.8px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 7px rgba(170, 235, 255, 0.6);
}
[data-dsh-whale-particles] .pw-splash-drop {
  background: linear-gradient(120deg, #FFFFFF 0%, rgba(196, 244, 255, 0.95) 60%, rgba(120, 205, 230, 0.6) 100%);
  box-shadow: 0 0 6px rgba(180, 240, 255, 0.75);
  border-radius: 60% 15% 60% 15%;
}
[data-dsh-whale-particles] .pw-drag-drip {
  background: radial-gradient(circle at 35% 30%, #FFFFFF 0%, rgba(206, 244, 255, 0.85) 60%, rgba(120, 205, 230, 0.4) 100%);
  box-shadow: 0 0 6px rgba(180, 240, 255, 0.55);
}
[data-dsh-whale-particles] .pw-confetti {
  background: var(--pw-blush, #F0A0A0);
  border-radius: 62% 12% 62% 12%;
}

/* ===== keyframes（linger- 前缀）===== */
@keyframes linger-breathe {
  0%,100% { transform: translateY(0) scale(1, 1); }
  50%     { transform: translateY(-1.1px) scale(1.008, .992); }
}
@keyframes linger-skirtSway {
  0%,100% { transform: rotate(-1.4deg) scaleX(1); }
  50%     { transform: rotate(1.6deg) scaleX(1.03); }
}
@keyframes linger-sashFloat {
  0%,100% { transform: rotate(-2.5deg) translateY(0); }
  50%     { transform: rotate(3.5deg) translateY(-0.6px); }
}
@keyframes linger-ribbonFlutter {
  0%,100% { transform: rotate(-2deg); }
  50%     { transform: rotate(2.5deg); }
}
@keyframes linger-hairSway {
  0%,100% { transform: rotate(-1.2deg); }
  50%     { transform: rotate(1.6deg); }
}
/* 手：待机轻摆 / 施法抬手画诀 / 开心上扬 */
/* 手臂：绕肩摆动 / 掐指（抬起并收袖）/ 施法 / 上扬。左右分开写，因为"抬起"要朝身体内侧。
   注：手臂是刚体（没有肘），"抬到胸前"用 translate + scale 收短袖子，而不是硬转一个大角度。 */
@keyframes linger-armSway {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50%     { transform: translateY(-0.5px) rotate(2.4deg); }
}
@keyframes linger-armThinkL {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(1.4px, -8.2px) scale(0.86); }
}
@keyframes linger-armThinkR {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(-1.4px, -8.2px) scale(0.86); }
}
@keyframes linger-armCastL {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(0.9px, -2.8px) scale(0.95) rotate(-4deg); }
}
@keyframes linger-armCastR {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(-0.9px, -2.8px) scale(0.95) rotate(4deg); }
}
@keyframes linger-armUpL {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(0.6px, -5.6px) scale(0.9) rotate(-7deg); }
}
@keyframes linger-armUpR {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(-0.6px, -5.6px) scale(0.9) rotate(7deg); }
}
@keyframes linger-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95%, 97%      { transform: scaleY(0.12); }
}
@keyframes linger-meditate {
  0%,100% { transform: translateY(0) rotate(0deg); }
  35%     { transform: translateY(-1.6px) rotate(-1.2deg); }
  70%     { transform: translateY(-0.8px) rotate(1deg); }
}
@keyframes linger-cast {
  0%,100% { transform: translateY(0) rotate(0deg); }
  30%     { transform: translateY(-1.2px) rotate(-0.8deg); }
  70%     { transform: translateY(0.4px) rotate(0.8deg); }
}
@keyframes linger-fly {
  0%,100% { transform: translateY(0) rotate(-1.5deg); }
  50%     { transform: translateY(-1.6px) rotate(1.5deg); }
}
@keyframes linger-flyDive {
  0%   { transform: translateY(0) rotate(0deg); }
  35%  { transform: translateY(4px) rotate(-10deg) scale(1.02, .97); }
  70%  { transform: translateY(1px) rotate(-4deg) scale(1, 1); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes linger-bladeFloat {
  0%,100% { transform: translateY(0) rotate(-3deg); }
  50%     { transform: translateY(-1.8px) rotate(3deg); }
}
@keyframes linger-skirtTrail {
  0%,100% { transform: rotate(-3deg) scaleX(1.05); }
  50%     { transform: rotate(2deg) scaleX(1.08); }
}
@keyframes linger-sashTrail {
  0%,100% { transform: rotate(-8deg) translateX(-0.6px); }
  50%     { transform: rotate(-14deg) translateX(-1.4px); }
}
@keyframes linger-pupilGaze {
  0%   { transform: translate(-0.22px, -0.22px); }
  100% { transform: translate(0.32px, -0.4px); }
}
@keyframes linger-shake {
  0%,100% { transform: translateX(0) rotate(0deg); }
  25%     { transform: translateX(-1px) rotate(-1.4deg); }
  75%     { transform: translateX(1px) rotate(1.4deg); }
}
@keyframes linger-angryJitter {
  0%,100% { transform: translate(0, 0); }
  50%     { transform: translate(0.5px, -0.4px); }
}
@keyframes linger-dizzyShake {
  0%   { transform: rotate(-6deg) scale(1); }
  100% { transform: rotate(6deg) scale(1.06); }
}
@keyframes linger-dizzyWobble {
  0%   { transform: rotate(0deg); }
  20%  { transform: rotate(-6deg); }
  45%  { transform: rotate(5deg); }
  70%  { transform: rotate(-3.5deg); }
  100% { transform: rotate(0deg); }
}
@keyframes linger-joyHop {
  0%,100% { transform: translateY(0) scale(1, 1); }
  25%     { transform: translateY(-6px) scale(.985, 1.03); }
  55%     { transform: translateY(1px) scale(1.03, .97); }
  75%     { transform: translateY(-2px) scale(.995, 1.01); }
}
@keyframes linger-spinBow {
  0%   { transform: rotate(0deg) translateY(0) scale(1, 1); }
  30%  { transform: rotate(-140deg) translateY(-5px) scale(.98, 1.03); }
  60%  { transform: rotate(-330deg) translateY(0) scale(1.02, .98); }
  80%  { transform: rotate(-360deg) translateY(0) scale(1.03, .96); }
  100% { transform: rotate(-360deg) translateY(0) scale(1, 1); }
}
@keyframes linger-sashSpin {
  0%,100% { transform: rotate(0deg); }
  45%     { transform: rotate(-24deg); }
  70%     { transform: rotate(18deg); }
}
@keyframes linger-squeeze {
  0%   { transform: scaleX(1) scaleY(1); }
  40%  { transform: scaleX(.64) scaleY(1.07); }
  100% { transform: scaleX(.7) scaleY(1.05); }
}
@keyframes linger-impatientSway {
  0%,100% { transform: rotate(-2.4deg); }
  50%     { transform: rotate(2.4deg); }
}
@keyframes linger-annoyedDodge {
  0%,100% { transform: translateX(0) rotate(0deg); }
  35%     { transform: translateX(3.5px) rotate(3.5deg); }
  70%     { transform: translateX(-1.4px) rotate(-2deg); }
}
@keyframes linger-sulkTurn {
  0%   { transform: translateX(0) rotate(0deg); }
  100% { transform: translateX(1.2px) rotate(6deg); }
}
@keyframes linger-leap {
  0%,100% { transform: translateY(0) rotate(0deg) scale(1, 1); }
  14%     { transform: translateY(-14px) rotate(-4deg) scale(.98, 1.05); }
  36%     { transform: translateY(1px) rotate(3deg) scale(1.05, .93); }
  58%     { transform: translateY(-6px) rotate(-2deg) scale(.99, 1.02); }
  78%     { transform: translateY(0) rotate(1deg) scale(1.02, .98); }
}
@keyframes linger-petal {
  0%   { transform: translateY(3px) scale(.6); opacity: 0; }
  30%  { transform: translateY(0) scale(1); opacity: .95; }
  100% { transform: translateY(-8px) scale(1.15) rotate(14deg); opacity: 0; }
}
@keyframes linger-starSpin {
  0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50%     { transform: scale(1.35) rotate(22deg); opacity: .6; }
}
@keyframes linger-rise {
  0%   { transform: translateY(0) scale(.55); opacity: 0; }
  25%  { opacity: .95; }
  100% { transform: translateY(-40px) scale(1); opacity: 0; }
}
@keyframes linger-riseBlue {
  0%   { transform: translateY(0) scale(.55); opacity: 0; }
  25%  { opacity: .9; }
  100% { transform: translateY(-34px) scale(1); opacity: 0; }
}
@keyframes linger-wait {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50%     { transform: translateY(-1.4px) rotate(-1.2deg); }
}
@keyframes linger-disappointed {
  0%,100% { transform: translateY(0) scale(1, 1); }
  35%     { transform: translateY(1.6px) scale(1.025, .965); }
  70%     { transform: translateY(1px) scale(1.015, .98); }
}
@keyframes linger-squish {
  0%   { transform: scale(1, 1); }
  35%  { transform: scale(1.1, .87); }
  70%  { transform: scale(.965, 1.045); }
  100% { transform: scale(1, 1); }
}
@keyframes linger-sleepBob {
  0%,100% { transform: translateY(0) scale(1, 1); }
  50%     { transform: translateY(1.4px) scale(1.015, .98); }
}
@keyframes linger-formation {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes linger-sealGlow {
  0%,100% { transform: scale(.8); opacity: .5; }
  50%     { transform: scale(1.5); opacity: 1; }
}
@keyframes linger-runePulse {
  0%,100% { transform: scale(1); opacity: .5; }
  50%     { transform: scale(1.08); opacity: .85; }
}
@keyframes linger-runeFloat1 {
  0%   { transform: translateY(0) scale(.5); opacity: 0; }
  30%  { opacity: .95; }
  100% { transform: translateY(-12px) translateX(-3.5px) scale(1.05); opacity: 0; }
}
@keyframes linger-runeFloat2 {
  0%   { transform: translateY(0) scale(.5); opacity: 0; }
  30%  { opacity: .95; }
  100% { transform: translateY(-13px) translateX(3px) scale(1.05); opacity: 0; }
}
`
