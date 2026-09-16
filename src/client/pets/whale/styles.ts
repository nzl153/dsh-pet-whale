// 鲸鱼宠物私有的样式：内联 SVG 的部件外观 + 各状态下的动画。
// 这部分原先写在 styles.ts 里，与公共样式一起注入；多宠物改造后按宠物分表，
// 只有当前宠物这一张表会被挂上，因此这里的 .pet-official.<state> / 部件选择器不需要加宠物前缀。
// 用到的 @keyframes pw-* 全部定义在 styles.ts（BASE_CSS）里，本表只管选择器。
//
// 上色一律走 CSS 变量 --pw-body / --pw-body-light / --pw-body-dark / --pw-blush / --pw-eye / --pw-pupil，
// 这样 palettes.ts 里的 7 套色板对任何宠物都自动生效。
export const WHALE_PET_CSS = `
/* 泡泡（庆祝 + 点击） */
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
[data-dsh-whale] .bubble.show { animation: pw-rise 0.9s ease-out forwards; }

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

/* ===== 状态动画 ===== */
[data-dsh-whale] .pet-official .body { animation: pw-qbob 3.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official .eye-group { animation: pw-blink 4.5s ease-in-out infinite; transform-origin: 5.55px 5.7px; }

[data-dsh-whale] .pet-official.think { animation: pw-dive2 3.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.think .bubble-blue { animation: pw-riseBlue 3.2s ease-out infinite; }
[data-dsh-whale] .pet-official.think .bubble-blue.bb2 { animation-delay: 0.9s; }
[data-dsh-whale] .pet-official.think .bubble-blue.bb3 { animation-delay: 1.8s; }

  [data-dsh-whale] .pet-official.swim-dive,
  [data-dsh-whale] .pet-official.swimming-dive { animation: pw-dive2 1.6s ease-in-out; filter: drop-shadow(0 6px 14px rgba(53, 80, 201, 0.28)); }
  [data-dsh-whale] .pet-official.swim-dive .bubble-blue,
  [data-dsh-whale] .pet-official.swimming-dive .bubble-blue { display: block; animation: pw-riseBlue 1.2s ease-out infinite; }
  [data-dsh-whale] .pet-official.swimming .body { animation: pw-swimBody 0.85s ease-in-out infinite alternate; }


[data-dsh-whale] .pet-official.working { animation: pw-swim 1.1s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .body { animation: none; }
[data-dsh-whale] .pet-official.working .keyboard-unit { display: block !important; }
[data-dsh-whale] .pet-official.working .code-particle { display: block !important; }

/* 思考：眼珠右上凝视 + 灵动高光微呼吸 */
[data-dsh-whale] .pet-official.think .pupil-highlight {
  animation: pw-pupilGaze 2s ease-in-out infinite alternate;
}

/* 报错：晕眩叉叉眼 */
[data-dsh-whale] .pet-official.error { animation: pw-shake 0.5s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .angry { display: block; animation: pw-angryJitter 0.5s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .eye-group .eye,
[data-dsh-whale] .pet-official.error .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.error .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 5.55px 5.7px;
  animation: pw-dizzyShake 0.4s ease-in-out infinite alternate;
}

/* 休眠：安详月牙眼 */
[data-dsh-whale].sleeping .eye-group .eye,
[data-dsh-whale].sleeping .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].sleeping .eye-group .sleep-eyes { display: inline !important; }

/* 开心态 */
[data-dsh-whale] .pet-official.joy {
  animation: pw-joyHop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
[data-dsh-whale] .pet-official.joy .eye-group .eye,
[data-dsh-whale] .pet-official.joy .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.joy .eye-group .sleep-eyes { display: inline !important; }

/* 戳晕态 */
[data-dsh-whale] .pet-official.dizzy {
  animation: pw-dizzyWobble 0.8s ease-in-out !important;
}
[data-dsh-whale] .pet-official.dizzy .eye-group .eye,
[data-dsh-whale] .pet-official.dizzy .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.dizzy .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 5.55px 5.7px;
  animation: pw-dizzyShake 0.35s ease-in-out infinite alternate;
}

/* 甩晕态：抓着左右猛甩的结果 */
[data-dsh-whale] .pet-official.shaken .eye-group .eye,
[data-dsh-whale] .pet-official.shaken .eye-group .pupil-highlight { opacity: 0 !important; }
/* 正晕着比被抓住更该被看见，所以压过拖拽的眯眼 */
[data-dsh-whale].dragging .pet-official.shaken .eye-group .caught-eyes { display: none !important; }
[data-dsh-whale] .pet-official.shaken .eye-group .dizzy-eyes {
  display: inline !important;
  transform-origin: 5.55px 5.7px;
  animation: pw-dizzyShake 0.22s ease-in-out infinite alternate;
}
/* 身体只在松手后才摇：还攥在手里的时候它本来也动不了，
   而且拖拽态给 .pet-official 上了 !important 的 transform，动画压不过 */
[data-dsh-whale]:not(.dragging) .pet-official.shaken {
  animation: pw-dizzyWobble 0.7s ease-in-out 2 !important;
}

/* 翻肚皮：双击的专属反应 */
[data-dsh-whale] .pet-official.belly-up {
  animation: pw-bellyUp 2s cubic-bezier(0.34, 1.4, 0.64, 1) !important;
}
[data-dsh-whale] .pet-official.belly-up .eye-group .eye,
[data-dsh-whale] .pet-official.belly-up .eye-group .pupil-highlight { opacity: 0 !important; }
/* 借用弯月眼——翻着肚皮眯眼笑正是它该有的样子 */
[data-dsh-whale] .pet-official.belly-up .eye-group .sleep-eyes { display: inline !important; }

/* 贴边挤扁：横向压扁，方向由贴的是哪边决定 */
/* 后两条是为了压过拖拽态的 animation:none——特异性相同则后定义者胜，
   而那条规则写在本段之后，只靠前两条会被它盖掉 */
[data-dsh-whale].edge-left .pet-official .body,
[data-dsh-whale].edge-right .pet-official .body,
[data-dsh-whale].dragging.edge-left .pet-official .body,
[data-dsh-whale].dragging.edge-right .pet-official .body {
  transform-origin: 50% 50%;
  animation: pw-squeeze 0.35s ease-out forwards !important;
}

/* 拖着不放又不动：晃着腰表示不耐烦 */
[data-dsh-whale].dragging .pet-official.impatient .body {
  animation: pw-impatientSway 0.9s ease-in-out infinite !important;
}

/* 连戳中段：不耐烦，侧身躲一下 */
[data-dsh-whale] .pet-official.annoyed {
  animation: pw-annoyedDodge 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) !important;
}

/* 连戳过头：闹脾气，扭头 + 吊眉怒眼 */
[data-dsh-whale] .pet-official.sulking {
  animation: pw-sulkTurn 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) forwards !important;
}
/* 生气不闭眼：眼睛留着瞪人，只加一道吊眉 */
[data-dsh-whale] .pet-official.sulking .eye-group .angry-eyes { display: inline !important; }

/* 欢迎态 */
[data-dsh-whale] .pet-official.welcome {
  animation: pw-leap2 1.2s ease-in-out !important;
}
[data-dsh-whale] .pet-official.welcome .stars { display: block !important; }
[data-dsh-whale] .pet-official.welcome .spout-group {
  display: inline !important;
  transform-origin: 8.6px 1.2px;
  animation: pw-spoutSpray 1.1s cubic-bezier(0.2, 0.8, 0.35, 1);
}

/* 庆祝与喷水柱 */
[data-dsh-whale] .pet-official.celebrate { animation: pw-leap2 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .stars { display: block; }
[data-dsh-whale] .pet-official.celebrate .starL { animation: pw-starSpin 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .starR { animation: pw-starSpin 1.2s ease-in-out 0.3s infinite; }
[data-dsh-whale] .pet-official.celebrate .bubble { animation: pw-rise 1.2s ease-out 0.3s infinite; }
[data-dsh-whale] .pet-official.celebrate .bubble.b2 { animation-delay: 0.7s; }
[data-dsh-whale] .pet-official.celebrate .bubble.b3 { animation-delay: 1.05s; }
[data-dsh-whale] .pet-official.celebrate .spout-group,
[data-dsh-whale] .pet-official.spouting .spout-group {
  display: inline !important;
  transform-origin: 8.6px 1.2px;
  animation: pw-spoutSpray 1.3s cubic-bezier(0.2, 0.8, 0.35, 1) infinite;
}

/* 背部粼粼波光折射 */
[data-dsh-whale] .caustic-shimmer {
  animation: pw-causticDrift 4.2s ease-in-out infinite alternate;
}

[data-dsh-whale] .pet-official.wait { animation: pw-wait 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.wait .bubble-blue { display: block; animation: pw-riseBlue 1.2s ease-out infinite; }
[data-dsh-whale] .pet-official.disappointed { animation: pw-disappointed 2.6s ease-in-out infinite; }


/* 双击翻滚特技 */
[data-dsh-whale] .pet-official.rolling { animation: pw-rollTrick 0.65s cubic-bezier(0.34, 1.4, 0.64, 1) !important; }

/* 点击挤压回弹：作用在 SVG 上，不干扰位置 */
[data-dsh-whale] .pet-official.squish svg { animation: pw-squish 0.42s cubic-bezier(0.25, 1.4, 0.5, 1); }

/* 拖拽中：暂停状态动画 + 斜拉变形 */
[data-dsh-whale].dragging .pet-official {
  animation: none !important;
  transform: scaleX(1) rotate(-5deg) scale(1.04, 0.96) !important;
}
[data-dsh-whale].dragging[data-facing="right"] .pet-official {
  transform: scaleX(-1) rotate(5deg) scale(1.04, 0.96) !important;
}
[data-dsh-whale].dragging .pet-official .body { animation: none !important; }

/* 被抓/拖拽：动漫勾勾眼（>_<），替换正常眼睛 */
[data-dsh-whale].dragging .eye-group .eye,
[data-dsh-whale].dragging .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes { display: inline !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes path { stroke: var(--pw-eye, #2E2A24) !important; stroke-width: 0.9 !important; }

[data-dsh-whale].sleeping .pet-official .body { animation: pw-sleepBob 4s ease-in-out infinite !important; }
[data-dsh-whale].sleeping .pet-official .eye-group { transform: scaleY(0.08) !important; }
[data-dsh-whale].sleeping .pet-official .pupil-highlight { opacity: 0 !important; }
/* 悬停腮红加深 */
[data-dsh-whale] .pet-official:hover .eye-group {
  filter: drop-shadow(0 0 1px rgba(217, 142, 106, 0.8));
}
[data-dsh-whale] .tap-k1 { animation: pw-keyTap1 0.16s ease-in-out infinite alternate; }
[data-dsh-whale] .tap-k2 { animation: pw-keyTap2 0.18s ease-in-out 0.08s infinite alternate; }
[data-dsh-whale] .code-fx1 { animation: pw-codeFloat1 1.2s ease-out infinite; }
[data-dsh-whale] .code-fx2 { animation: pw-codeFloat2 1.2s ease-out 0.6s infinite; }
`
