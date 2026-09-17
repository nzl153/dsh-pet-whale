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
/* 重要：SVG 子元素默认 transform-box:view-box，即以**整个画布中心**为旋转轴心。
   所以凡是对 .body 做的旋转/缩放，都必须把轴心显式放到脚下，否则人会绕着画面中心转
   （御剑前倾时脚会离开剑，看着就是"歪了"）。 */
[data-dsh-whale] .pet-official .body { transform-origin: 13px 46.5px; animation: linger-breathe 3.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official .skirt { animation: linger-skirtSway 3.8s ease-in-out infinite; }
[data-dsh-whale] .pet-official .sash { animation: linger-sashFloat 3.0s ease-in-out infinite; }
[data-dsh-whale] .pet-official .sash + .sash { animation-delay: -1.1s; }
[data-dsh-whale] .pet-official .ribbon { animation: linger-ribbonFlutter 2.4s ease-in-out infinite; transform-origin: 13px 3.4px; }
[data-dsh-whale] .pet-official .hair-front { animation: linger-hairSway 3.8s ease-in-out infinite; }
[data-dsh-whale] .pet-official .hair-front + .hair-front { animation-delay: -1.5s; }
[data-dsh-whale] .pet-official .eye-group { animation: linger-blink 4.8s ease-in-out infinite; transform-origin: 13px 9.15px; }
/* 手：待机时轻轻前后摆（宽度 ±0.35 单位，看得见但不夸张） */
[data-dsh-whale] .pet-official .arm { animation: linger-armSwayL 4.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official .arm + .arm { animation: linger-armSwayR 4.4s ease-in-out infinite; }
/* 空闲姿态 = 双手交叠于腹前（只折 42°）。原来是"抱臂"（-122/+96），但手肘是刚体、
   前臂仅 6 单位，折多了手只能落在胸口中线、必然压住另一只袖子 —— 看着就是"手和袖口重叠"。
   折 42° 时手落在腰带两侧、红飘带从两手之间露出来，干净且仍然端正。 */
[data-dsh-whale] .pet-official .forearm { animation: linger-forearmHugL 4.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official .arm + .arm .forearm { animation: linger-forearmHugR 4.4s ease-in-out infinite; }
/* 头部上移 1.2（原来写在 SVG 的 transform 属性上；改成 CSS 才能和"远眺/整衣襟"等 CSS 动画共存）。
   轴心必须显式给：SVG 子元素默认以 viewBox 中心为轴（transform-box:view-box），
   不写的话"点头/抬头"会变成绕腰部的平移。14.4 = 脖子根在**局部坐标**里的位置
   （局部比渲染位置低 1.2，因为位移是这一层的 transform 做的）。 */
[data-dsh-whale] .pet-official .head { transform-origin: 13px 14.4px; transform: translateY(-1.2px); }

/* ===== idle 原地动作（micro-*）：关闭御剑时她就靠这些"活着" =====
   约定（见 pets/types.ts）：插件给 .pet-official 加临时 class，2.4s 后移除；
   动画必须一次性、≤2.2s，且 0% / 100% 都回到**中性姿态**（否则移除时硬切会跳）。
   中性姿态＝待机那一套：.body = translateY(0) scale(1,1)｜左前臂 -42°｜右前臂 +42°｜
   .head = translateY(-1.2px)（轴心在脖子）｜.skirt = rotate(-1.4deg) scaleX(1)｜.hair(后发) 无动画。

   只留 4 个（用户 2026-09-17 拍板）：转圈(spin) / 放法术(spell) / 扇扇子(fan) / 远眺(gaze) ——
   前三个"看得出来"，远眺安静。原先的拂袖/整衣襟/掐指/裙摆轻摆幅度太小，已删。 */
/* 原地转圈：绕**竖轴**转身（.body 做 scaleX 翻转），不是在画面里翻滚 */
[data-dsh-whale] .pet-official.micro-spin .body { animation: linger-microSpin 1.9s ease-in-out; }
/* 转身＝换图（只做正⇄背两张图；侧身那张画不好，用户 2026-09-17 决定去掉）：
   换面时身体轻微收窄(0.8)+位移，配合衣摆/丝带的拖尾把"转过去"交代出来。
   正面专属部件（脸/刘海/肩前发/背后长发/脖子）在背面相位隐藏；背面图自带头发与腰结。 */
[data-dsh-whale] .pet-official.micro-spin .face-front,
[data-dsh-whale] .pet-official.micro-spin .hair-front,
[data-dsh-whale] .pet-official.micro-spin .hair,
[data-dsh-whale] .pet-official.micro-spin .neck { animation: linger-microSpinFace 1.9s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spin .back-view { display: block !important; animation: linger-microSpinBack 1.9s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spin .back-view { display: block !important; animation: linger-microSpinBack 1.9s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spin .skirt { animation: linger-microSpinFlare 1.9s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spin .ribbon { animation: linger-microSpinRibbon 1.9s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spin .sash { animation: linger-microSpinSash 1.9s ease-in-out; }
/* 放法术：双臂抬起结印 + 脚下法阵亮起 + 花瓣升起 + 指尖灵光 */
[data-dsh-whale] .pet-official.micro-spell .forearm { animation: linger-microSpellL 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spell .arm + .arm .forearm { animation: linger-microSpellR 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spell .hand-seal { display: block !important; animation: linger-microSealGlow 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spell .keyboard-unit { display: block !important; animation: linger-microFormation 2.2s ease-out; }
[data-dsh-whale] .pet-official.micro-spell .spout-group { display: block !important; animation: linger-microSpout 2.2s ease-out; }
[data-dsh-whale] .pet-official.micro-spell .head { animation: linger-microHeadGaze 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-spell .skirt { animation: linger-microSkirtPulse 2.2s ease-in-out; }
/* 扇扇子：右手折扇展开并挥动（扇子挂在右前臂里，随手臂走） */
[data-dsh-whale] .pet-official.micro-fan .arm + .arm .forearm { animation: linger-microFanArm 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-fan .fan { display: block !important; animation: linger-microFanWave 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-fan .ribbon { animation: linger-microFanRibbon 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-fan .head { animation: linger-microHeadTiltRight 2.2s ease-in-out; }
/* 远眺：抬头 + 长发与裙摆被风带起 */
[data-dsh-whale] .pet-official.micro-gaze .head { animation: linger-microGazeUp 2.2s ease-in-out; }
[data-dsh-whale] .pet-official.micro-gaze .hair { animation: linger-microHairTrail 2.2s ease-in-out; transform-origin: 13px 7px; }
[data-dsh-whale] .pet-official.micro-gaze .skirt { animation: linger-microSkirtTrail 2.2s ease-in-out; }

/* ===== 思考：凝神掐诀（抬手 + 灵光），与 idle 明显区分 ===== */
[data-dsh-whale] .pet-official.think { animation: linger-meditate 3.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.think .arm + .arm .forearm { animation: linger-forearmChin 3.6s ease-in-out infinite; }
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
/* 御剑：手臂向后掠 */
[data-dsh-whale] .pet-official.swimming .forearm { animation: linger-forearmTrailL 1.1s ease-in-out infinite; }
[data-dsh-whale] .pet-official.swimming .arm + .arm .forearm { animation: linger-forearmTrailR 1.1s ease-in-out infinite; }
/* 腾空：收起地面阴影，否则看着像站在地上 */
[data-dsh-whale].swimming .dsh-whale-shadow { opacity: 0; }
/* 腾空时脚下的光晕更亮一点，强调"离地" */
[data-dsh-whale].swimming .dsh-whale-wake { opacity: 1; }

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
/* 长发向后飘（头为轴心） */
[data-dsh-whale] .pet-official.swimming .hair { animation: linger-hairTrail 1.1s ease-in-out infinite; transform-origin: 13px 7px; }
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
[data-dsh-whale] .pet-official.working .forearm { animation: linger-forearmCastL 1.3s ease-in-out infinite; }
[data-dsh-whale] .pet-official.working .arm + .arm .forearm { animation: linger-forearmCastR 1.3s ease-in-out -0.65s infinite; }

/* 报错：双手护在身前发抖 */
[data-dsh-whale] .pet-official.error .forearm { animation: linger-forearmTrembleL 0.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.error .arm + .arm .forearm { animation: linger-forearmTrembleR 0.4s ease-in-out infinite; }

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
[data-dsh-whale] .pet-official.joy .arm { animation: linger-armRaiseL 0.9s ease-in-out infinite; }
[data-dsh-whale] .pet-official.joy .forearm { animation: linger-forearmWave 0.9s ease-in-out infinite; }
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
[data-dsh-whale] .pet-official.celebrate .arm { animation: linger-armRaiseL 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .arm + .arm { animation: linger-armRaiseR 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .forearm { animation: linger-forearmCheerL 1.4s ease-in-out infinite; }
[data-dsh-whale] .pet-official.celebrate .arm + .arm .forearm { animation: linger-forearmCheerR 1.4s ease-in-out infinite; }
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
[data-dsh-whale] .pet-official.wait .forearm { animation: linger-forearmMeetL 2.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.wait .arm + .arm .forearm { animation: linger-forearmMeetR 2.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.wait .bubble-blue { display: block; animation: linger-riseBlue 1.2s ease-out infinite; }
[data-dsh-whale] .pet-official.disappointed { animation: linger-disappointed 2.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.disappointed .forearm { animation: linger-forearmDroopL 2.6s ease-in-out infinite; }
[data-dsh-whale] .pet-official.disappointed .arm + .arm .forearm { animation: linger-forearmDroopR 2.6s ease-in-out infinite; }

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
/* 被拎起来时手臂垂下（收起来的抱臂不合物理） */
[data-dsh-whale].dragging .pet-official .forearm { animation: linger-forearmDroopL 1.6s ease-in-out infinite; }
[data-dsh-whale].dragging .pet-official .arm + .arm .forearm { animation: linger-forearmDroopR 1.6s ease-in-out infinite; }
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
[data-dsh-whale] .pet-official:hover .blush { opacity: .55; }

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
/* ---- idle 原地动作（micro-*）的关键帧 ----
   规矩：一次性、≤2.2s、**首尾回中性姿态**（待机那套数值），class 被移除时看不出跳变。
   中性值速查：.body = translateY(0) scale(1,1)｜.skirt = rotate(-1.4deg) scaleX(1)｜
   .sash = rotate(-2.5deg)｜.head = translateY(-1.2px)｜左前臂 = rotate(-42deg)｜右前臂 = rotate(42deg)｜
   .hair(后发) 无动画｜.fan 有独立轴心（扇钉）。
   几何限制：手肘刚体、前臂 6 单位，手够不到头/脸；扇子画成"局部朝下"，
   这样右前臂折起约 110° 时扇面正好朝上，像在胸前扇风。 */
/* 转圈：绕竖轴转一整圈（1 → 侧 → 背 → 侧 → 1），不是画面内翻滚 */
/* 转圈：绕竖轴转身。要点：
   - 最小宽度只压到 0.34（原来 0.16，太薄就成了纸片），始终保留体积
   - 加左右位移（±2px）与 ±3° 微转，暗示"质量绕着中轴甩过去"
   - 头发/裙摆/腰带**滞后一拍**（各自再做一个反向 scaleX/rotate），形成拖尾 */
/* 身体：只在换面那一下轻微收窄 + 位移（正面留 ~23%，背面留 ~47%） */
@keyframes linger-microSpin {
  0%   { transform: translate(0, 0) scale(1, 1); }
  20%  { transform: translate(-1.2px, -0.6px) scale(0.8, 1.01); }
  27%  { transform: translate(-0.8px, -1.3px) scale(1, 1); }
  70%  { transform: translate(0.8px, -1.3px) scale(1, 1); }
  77%  { transform: translate(1.2px, -0.6px) scale(0.8, 1.01); }
  100% { transform: translate(0, 0) scale(1, 1); }
}
/* 正面专属部件：23%~72% 藏起来（那段看背面图） */
@keyframes linger-microSpinFace {
  0%,23%     { opacity: 1; }
  23.1%,72%  { opacity: 0; }
  72.1%,100% { opacity: 1; }
}
/* 背面视图：23%~72% 显示 */
@keyframes linger-microSpinBack {
  0%,23%     { opacity: 0; }
  23.1%,72%  { opacity: 1; }
  72.1%,100% { opacity: 0; }
}
@keyframes linger-microSpinFlare {
  0%,100% { transform: rotate(-1.4deg) scaleX(1); }
  28%     { transform: rotate(3deg) scaleX(1.11); }
  56%     { transform: rotate(-1deg) scaleX(0.74); }
  80%     { transform: rotate(2deg) scaleX(1.06); }
}
@keyframes linger-microSpinRibbon {
  0%,100% { transform: rotate(0deg) scaleX(1); }
  30%     { transform: rotate(16deg) scaleX(1.2); }
  58%     { transform: rotate(-8deg) scaleX(0.82); }
  82%     { transform: rotate(9deg) scaleX(1.06); }
}
@keyframes linger-microSpinSash {
  0%,100% { transform: rotate(-2.5deg) scaleX(1); }
  30%     { transform: rotate(12deg) scaleX(1.16); }
  58%     { transform: rotate(-6deg) scaleX(0.84); }
  82%     { transform: rotate(7deg) scaleX(1.04); }
}
/* 放法术：双臂上举结印 + 法阵 + 花瓣 */
@keyframes linger-microSpellL {
  0%,100% { transform: rotate(-42deg); }
  30%     { transform: rotate(-158deg); }
  70%     { transform: rotate(-150deg); }
}
@keyframes linger-microSpellR {
  0%,100% { transform: rotate(42deg); }
  30%     { transform: rotate(132deg); }
  70%     { transform: rotate(124deg); }
}
@keyframes linger-microFormation {
  0%      { opacity: 0; transform: scale(.6) rotate(0deg); }
  25%     { opacity: 1; }
  75%     { opacity: .95; }
  100%    { opacity: 0; transform: scale(1.25) rotate(80deg); }
}
@keyframes linger-microSpout {
  0%      { opacity: 0; transform: translateY(2px); }
  35%     { opacity: 1; transform: translateY(-1px); }
  100%    { opacity: 0; transform: translateY(-5px); }
}
@keyframes linger-microSealGlow {
  0%,12%,100% { opacity: 0; }
  34%         { opacity: 1; }
  68%         { opacity: .5; }
}
@keyframes linger-microHeadGaze {
  0%,100% { transform: translateY(-1.2px) rotate(0deg); }
  32%     { transform: translateY(-1.9px) rotate(-3deg); }
  72%     { transform: translateY(-1.6px) rotate(-2deg); }
}
@keyframes linger-microSkirtPulse {
  0%,100% { transform: rotate(-1.4deg) scaleX(1); }
  40%     { transform: rotate(0deg) scaleX(1.08); }
}
/* 扇扇子：抬手到胸前 + 扇面来回挥（-16°/+10°/-14°/+8°） */
@keyframes linger-microFanArm {
  0%,100% { transform: rotate(42deg); }
  22%     { transform: rotate(124deg); }
  78%     { transform: rotate(120deg); }
}
@keyframes linger-microFanWave {
  0%,100% { transform: rotate(0deg); }
  20%     { transform: rotate(-16deg); }
  40%     { transform: rotate(10deg); }
  60%     { transform: rotate(-14deg); }
  80%     { transform: rotate(8deg); }
}
@keyframes linger-microFanRibbon {
  0%,100% { transform: rotate(0deg); }
  40%     { transform: rotate(12deg); }
}
/* 远眺：抬头 + 长发/裙摆被风带起 */
@keyframes linger-microGazeUp {
  0%,100% { transform: translateY(-1.2px) rotate(0deg); }
  30%     { transform: translateY(-2.1px) rotate(-6.5deg); }
  70%     { transform: translateY(-1.7px) rotate(-3.5deg); }
}
@keyframes linger-microHeadTiltRight {
  0%,100% { transform: translateY(-1.2px) rotate(0deg); }
  32%     { transform: translateY(-1.2px) rotate(3.2deg); }
  66%     { transform: translateY(-1.2px) rotate(2.2deg); }
}
@keyframes linger-microHairTrail {
  0%,100% { transform: rotate(0deg); }
  34%     { transform: rotate(13deg); }
  74%     { transform: rotate(7deg); }
}
@keyframes linger-microSkirtTrail {
  0%,100% { transform: rotate(-1.4deg) scaleX(1); }
  34%     { transform: rotate(-12deg) scaleX(1.12); }
  74%     { transform: rotate(-6deg) scaleX(1.05); }
}/* 手：待机轻摆 / 施法抬手画诀 / 开心上扬 */
/* 手臂：绕肩摆动 / 掐指（抬起并收袖）/ 施法 / 上扬。左右分开写，因为"抬起"要朝身体内侧。
   注：手臂是刚体（没有肘），"抬到胸前"用 translate + scale 收短袖子，而不是硬转一个大角度。 */
/* 手臂关键帧。几何：肘在 y20.6，前臂约 6 单位（手在胯侧 y26.6），肘下另有一截袖尾。
   角度（前臂从自然下垂起算，顺时针为正）：抱臂 右+98°/左-120°、拱手 左-76°/右+76°、
   掐指（右手）+144°、腰前画符 ±30~42°、上举 ±150~168°、挥袖 +120~140°、护身 ±112~120° */
@keyframes linger-armSwayL {
  0%,100% { transform: rotate(0deg); }
  50%     { transform: rotate(-1.5deg); }
}
@keyframes linger-armSwayR {
  0%,100% { transform: rotate(0deg); }
  50%     { transform: rotate(1.5deg); }
}
/* 空闲：抱臂（左前臂横压在上，右前臂垫在内） */
@keyframes linger-forearmHugL {
  0%,100% { transform: rotate(-42deg); }
  50%     { transform: rotate(-37deg); }
}
@keyframes linger-forearmHugR {
  0%,100% { transform: rotate(42deg); }
  50%     { transform: rotate(47deg); }
}
/* 等待：拱手于腹前（双手在身前合拢，位置比抱臂低） */
@keyframes linger-forearmMeetL {
  0%,100% { transform: rotate(-74deg); }
  50%     { transform: rotate(-80deg); }
}
@keyframes linger-forearmMeetR {
  0%,100% { transform: rotate(74deg); }
  50%     { transform: rotate(80deg); }
}
/* 思考：只有右手抬到颔下掐指（左手保持抱臂） */
@keyframes linger-forearmChin {
  0%,100% { transform: rotate(138deg); }
  50%     { transform: rotate(148deg); }
}
/* 施法：双手在腰前执诀画符，左右不同相位 */
@keyframes linger-forearmCastL {
  0%,100% { transform: rotate(-30deg); }
  50%     { transform: rotate(-44deg); }
}
@keyframes linger-forearmCastR {
  0%,100% { transform: rotate(30deg); }
  50%     { transform: rotate(44deg); }
}
/* 上臂外抬（庆祝/挥手用；光折前臂够不到头顶） */
@keyframes linger-armRaiseL {
  0%,100% { transform: rotate(20deg); }
  50%     { transform: rotate(32deg); }
}
@keyframes linger-armRaiseR {
  0%,100% { transform: rotate(-20deg); }
  50%     { transform: rotate(-32deg); }
}
/* 开心：单手挥袖（上臂已抬） */
@keyframes linger-forearmWave {
  0%,100% { transform: rotate(96deg); }
  50%     { transform: rotate(122deg); }
}
/* 庆祝：双臂上举 */
@keyframes linger-forearmCheerL {
  0%,100% { transform: rotate(-156deg); }
  50%     { transform: rotate(-172deg); }
}
@keyframes linger-forearmCheerR {
  0%,100% { transform: rotate(156deg); }
  50%     { transform: rotate(172deg); }
}
/* 报错：双手护在身前发抖 */
@keyframes linger-forearmTrembleL {
  0%,100% { transform: rotate(-112deg); }
  50%     { transform: rotate(-120deg); }
}
@keyframes linger-forearmTrembleR {
  0%,100% { transform: rotate(112deg); }
  50%     { transform: rotate(120deg); }
}
/* 失落 / 拖拽：手自然垂（略前倾） */
@keyframes linger-forearmDroopL {
  0%,100% { transform: rotate(-10deg); }
  50%     { transform: rotate(-17deg); }
}
@keyframes linger-forearmDroopR {
  0%,100% { transform: rotate(10deg); }
  50%     { transform: rotate(17deg); }
}
/* 御剑：左手向后掠、右手前伸掐诀（导向），不对称才像在飞 */
@keyframes linger-forearmTrailL {
  0%,100% { transform: rotate(-36deg); }
  50%     { transform: rotate(-46deg); }
}
@keyframes linger-forearmTrailR {
  0%,100% { transform: rotate(50deg); }
  50%     { transform: rotate(60deg); }
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
/* 御剑飞行：整体**升空**（人抬高 5~7 单位）+ 前倾 15° + 起伏。
   剑在同一个坐标系里也抬同样高度，两者才不会脱开。 */
@keyframes linger-fly {
  0%,100% { transform: translateY(-5px) rotate(-15deg); }
  50%     { transform: translateY(-7px) rotate(-12deg); }
}
/* 长发与裙摆被风向后带 */
@keyframes linger-hairTrail {
  0%,100% { transform: rotate(5deg); }
  50%     { transform: rotate(11deg); }
}
@keyframes linger-flyDive {
  0%   { transform: translateY(0) rotate(0deg); }
  35%  { transform: translateY(4px) rotate(-10deg) scale(1.02, .97); }
  70%  { transform: translateY(1px) rotate(-4deg) scale(1, 1); }
  100% { transform: translateY(0) rotate(0deg); }
}
/* 剑现在在 .body 里面，升空与前倾由身体带；这里只保留"剑头微抬 + 轻微浮动" */
@keyframes linger-bladeFloat {
  0%,100% { transform: translateY(0) rotate(9deg); }
  50%     { transform: translateY(-1.5px) rotate(6deg); }
}
@keyframes linger-skirtTrail {
  0%,100% { transform: rotate(-8deg) scaleX(1.07); }
  50%     { transform: rotate(-14deg) scaleX(1.11); }
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
