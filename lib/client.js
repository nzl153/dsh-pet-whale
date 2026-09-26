window.__ModuleLoader__.load({
	id: "pet-whale",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region src/client/whale.ts
		const WHALE_HTML = `<svg viewBox="-2 -1 26 19" aria-hidden="true">
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--pw-body-light,#8FB5FF)"/>
              <stop offset="0.55" style="stop-color:var(--pw-body,#4D6BFE)"/>
              <stop offset="1" style="stop-color:var(--pw-body-dark,#3550C9)"/>
            </linearGradient>
            <clipPath id="whaleClip">
              <path d="M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746L11.1749 14.4736ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z"/>
            </clipPath>
          </defs>

          <g class="body">
            <!-- 官方单一路径身体，去掉了原版的小眼睛孔 -->
            <path d="M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746L11.1749 14.4736ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z" fill="url(#bodyGrad)" stroke="#3550C9" stroke-width="0.3" stroke-linejoin="round"/>

            <!-- 肚皮 -->
            <ellipse cx="11.2" cy="12.6" rx="8" ry="3.3" fill="#F7F2E6" clip-path="url(#whaleClip)"/>
            <!-- 背部高光 -->
            <ellipse cx="9.6" cy="3.5" rx="6.8" ry="1.55" fill="#FBF8F0" opacity=".3" clip-path="url(#whaleClip)" transform="rotate(-8 9.6 3.5)"/>
            <!-- 背部水面焦散折射波光 -->
            <path class="caustic-shimmer" d="M4 2.8 Q9.5 1.5 15 3.8 T21.5 2" fill="none" stroke="#FFFFFF" stroke-width="1.1" stroke-linecap="round" opacity="0.18" clip-path="url(#whaleClip)"/>

            <!-- 纯正官方经典大眼：整组协调眨眼与闭眼，眼白绝不分离残留 -->
            <g class="eye-group">
              <circle class="eye" cx="5.55" cy="5.7" r="1.25" style="fill:var(--pw-eye,#2E2A24)"/>
              <circle class="pupil-highlight" cx="5.92" cy="5.35" r="0.42" style="fill:var(--pw-pupil,#FBF8F0)"/>
              <!-- 被抓/拖拽时的动漫勾勾眼（>_< 侧面单眼紧闭） -->
              <g class="caught-eyes" style="display:none" fill="none" stroke="var(--pw-eye,#2E2A24)" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.3 4.6 L4.8 5.7 L6.3 6.8"/>
              </g>
              <!-- 睡着时的安详弯月眼（⌒ ⌒） -->
              <g class="sleep-eyes" style="display:none" fill="none" stroke="var(--pw-eye,#2E2A24)" stroke-width="0.8" stroke-linecap="round">
                <path d="M4.6 6.1 Q5.6 4.9 6.6 6.1"/>
              </g>
              <!-- 闹脾气：不闭眼，靠一道吊眉表达怒气。眉朝鼻尖（左）压低。
                   这么小的尺寸里闭眼画什么都糊成一团，睁眼 + 眉才读得出来。 -->
              <g class="angry-eyes" style="display:none" fill="none" stroke="var(--pw-eye,#2E2A24)" stroke-linecap="round">
                <path d="M4.15 4.35 L6.75 3.35" stroke-width="0.42"/>
              </g>
              <!-- 报错晕眩叉叉眼（×_×） -->
              <g class="dizzy-eyes" style="display:none" fill="none" stroke="var(--pw-eye,#2E2A24)" stroke-width="0.75" stroke-linecap="round">
                <path d="M4.7 4.8 L6.4 6.5 M6.4 4.8 L4.7 6.5"/>
              </g>
              <!-- 庆祝：笑成 ^ 的眼睛，跟睡觉、翻肚皮的弯月眼区分开 -->
              <g class="happy-eyes" style="display:none" fill="none" stroke="var(--pw-eye,#2E2A24)" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4.5 6.3 L5.55 5.05 L6.6 6.3"/>
              </g>
              <!-- 失落：眼睛照常睁着，靠一道八字眉（朝鼻尖那头抬高）和一滴眼泪 -->
              <g class="sad-eyes" style="display:none" fill="none" stroke="var(--pw-eye,#2E2A24)" stroke-linecap="round">
                <path d="M4.1 3.45 Q5.3 3.55 6.6 4.3" stroke-width="0.4"/>
              </g>
            </g>
            <path class="tear" style="display:none" d="M6.35 6.75 Q6.85 7.55 6.85 7.85 A0.5 0.5 0 0 1 5.85 7.85 Q5.85 7.55 6.35 6.75 Z" fill="#9FD3FF" stroke="#6FB6F2" stroke-width="0.12"/>

            <!-- 气孔微喷泉（胜利/翻滚/觉醒时喷出） -->
            <g class="spout-group" style="display:none">
              <path class="spout-stream" d="M8.2 1.2 Q7.0 -2.0 5.2 -3.2" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="0.38" stroke-linecap="round"/>
              <path class="spout-stream" d="M8.6 1.1 Q8.7 -2.6 8.8 -3.8" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="0.45" stroke-linecap="round"/>
              <path class="spout-stream" d="M9.0 1.2 Q10.2 -2.0 12.0 -3.2" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="0.38" stroke-linecap="round"/>
              <circle class="spout-drop" cx="5.2" cy="-3.2" r="0.28" fill="#FFFFFF"/>
              <circle class="spout-drop" cx="8.8" cy="-3.8" r="0.32" fill="#FFFFFF"/>
              <circle class="spout-drop" cx="12.0" cy="-3.2" r="0.28" fill="#FFFFFF"/>
            </g>

            <!-- 软萌自然腮红 -->
            <ellipse class="blush" cx="6.6" cy="7.2" rx="0.75" ry="0.48" style="fill:var(--pw-blush,#F0A0A0)" opacity="0.5"/>

            <!-- 尴尬黑线 -->
            <g class="angry" style="display:none" stroke="var(--pw-eye,#2E2A24)" stroke-width="0.3" stroke-linecap="round">
              <line x1="5.7" y1="2.6" x2="5.15" y2="1.0"/>
              <line x1="7.0" y1="2.9" x2="7.0" y2="0.9"/>
              <line x1="8.3" y1="2.6" x2="8.85" y2="1.0"/>
            </g>
            <!-- 星星 -->
            <g class="stars" style="display:none">
              <path class="starL" d="M2.9 2.1 L 3.25 2.85 L 4.05 2.95 L 3.5 3.5 L 3.62 4.3 L 2.9 3.92 L 2.18 4.3 L 2.3 3.5 L 1.75 2.95 L 2.55 2.85 Z" fill="#E8C56B" style="transform-origin: 2.9px 3.2px"/>
              <path class="starR" d="M9.9 1.4 L 10.25 2.15 L 11.05 2.25 L 10.5 2.8 L 10.62 3.6 L 9.9 3.22 L 9.18 3.6 L 9.3 2.8 L 8.75 2.25 L 9.55 2.15 Z" fill="#E8C56B" style="transform-origin: 9.9px 2.5px"/>
            </g>
          </g>

          <!-- ⌨️ 代码粒子 -->
          <g class="code-particle" style="display:none">
            <text x="0.8" y="13.0" font-size="1.6" style="fill:var(--pw-body,#4D6BFE)" font-weight="bold" font-family="monospace" class="code-fx1">&lt;/&gt;</text>
            <text x="3.2" y="12.4" font-size="1.4" fill="#4D88FF" font-weight="bold" font-family="monospace" class="code-fx2">{;}</text>
          </g>

          <!-- ⌨️ 机械小键盘 -->
          <g class="keyboard-unit" style="display:none">
            <ellipse cx="3.8" cy="16.7" rx="4.8" ry="1.2" fill="rgba(46,42,36,0.18)"/>
            <path d="M-0.6 14.6 L7.4 13.8 L8.8 16.4 L0.2 17.0 Z" fill="#2E2A24" stroke="#5F2E15" stroke-width="0.22" stroke-linejoin="round"/>
            <path d="M-0.4 14.5 L7.2 13.7 L8.5 16.1 L0.4 16.7 Z" fill="#484139"/>
            <g class="tap-k1">
              <rect x="0.2" y="14.2" width="0.95" height="0.65" rx="0.15" fill="#F7F2E6"/>
              <rect x="1.4" y="14.1" width="0.95" height="0.65" rx="0.15" fill="#F7F2E6"/>
              <rect x="2.6" y="14.0" width="0.95" height="0.65" rx="0.15" fill="#F7F2E6"/>
              <rect x="3.8" y="13.9" width="0.95" height="0.65" rx="0.15" fill="#F7F2E6"/>
              <rect x="5.0" y="13.8" width="0.95" height="0.65" rx="0.15" fill="#F7F2E6"/>
              <rect x="6.2" y="13.7" width="1.1" height="0.65" rx="0.15" style="fill:var(--pw-body-light,#8FB5FF)"/>
            </g>
            <g class="tap-k2">
              <rect x="0.5" y="15.0" width="1.0" height="0.7" rx="0.15" fill="#F7F2E6"/>
              <rect x="1.75" y="14.9" width="1.0" height="0.7" rx="0.15" fill="#E8D9BC"/>
              <rect x="3.0" y="14.8" width="1.0" height="0.7" rx="0.15" fill="#F7F2E6"/>
              <rect x="4.25" y="14.7" width="1.0" height="0.7" rx="0.15" fill="#F7F2E6"/>
              <rect x="5.5" y="14.6" width="1.0" height="0.7" rx="0.15" fill="#E8D9BC"/>
              <rect x="6.75" y="14.5" width="1.2" height="0.7" rx="0.15" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>
            <g class="tap-k1">
              <rect x="0.8" y="15.85" width="1.4" height="0.75" rx="0.18" style="fill:var(--pw-body-light,#8FB5FF)"/>
              <rect x="2.5" y="15.75" width="3.4" height="0.75" rx="0.18" fill="#FBF8F0"/>
              <rect x="6.2" y="15.6" width="1.8" height="0.75" rx="0.18" style="fill:var(--pw-body,#4D6BFE)"/>
            </g>
          </g>
        </svg>
        <span class="bubble"></span>
        <span class="bubble b2"></span>
        <span class="bubble b3"></span>
        <span class="bubble-blue"></span>
        <span class="bubble-blue bb2"></span>
        <span class="bubble-blue bb3"></span>
        <span class="pat-heart">♥</span>`;
		const WHALE_CSS = `
[data-dsh-whale] {
  --pw-ink: #2E2A24;
  --pw-body-light: #8FB5FF;
  --pw-body: #4D6BFE;
  --pw-body-dark: #3550C9;
  --pw-blush: #F0A0A0;
  --pw-eye: #2E2A24;
  --pw-pupil: #FBF8F0;
  /* 尺寸总闸：只改这一个变量，下面所有几何都跟着走 */
  --pw-scale: 1;
  position: fixed;
  z-index: 900;
  width: calc(137px * var(--pw-scale));
  height: calc(101px * var(--pw-scale));
  pointer-events: none;
  user-select: none;
  font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* 隐藏模式：整只收起来，只留右下角小按钮 */
[data-dsh-whale].hidden { display: none !important; }

/* 右下角召回小按钮（挂在 body 上，独立于鲸鱼本体） */
[data-dsh-whale-mini] {
  position: fixed;
  right: 14px;
  bottom: 14px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.22);
  background: linear-gradient(160deg, #4D6BFE, #2E3F9E);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0,0,0,.28);
  z-index: 901;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: transform .18s ease, box-shadow .18s ease;
}
[data-dsh-whale-mini]:hover {
  transform: translateY(-2px) scale(1.07);
  box-shadow: 0 10px 24px rgba(0,0,0,.36);
}
[data-dsh-whale-mini]:active { transform: scale(.94); }

/* 小按钮随 agent 状态变色呼吸：idle 蓝 / think 深蓝 / working 橙 / celebrate 绿 / error 红 */
[data-dsh-whale-mini] { animation: pw-mini-breathe 3.2s ease-in-out infinite; }
[data-dsh-whale-mini][data-state="think"] { background: linear-gradient(160deg, #6E8BFF, #3D55D6); animation: pw-mini-think 1.6s ease-in-out infinite; }
[data-dsh-whale-mini][data-state="working"] { background: linear-gradient(160deg, #F5A623, #C97B0B); animation: pw-mini-work 0.8s ease-in-out infinite; }
[data-dsh-whale-mini][data-state="celebrate"] { background: linear-gradient(160deg, #3BC46D, #1E8A4A); animation: pw-mini-celebrate 0.9s ease-in-out infinite; }
[data-dsh-whale-mini][data-state="error"] { background: linear-gradient(160deg, #E5484D, #A61B20); animation: pw-mini-error 0.5s ease-in-out infinite; }
[data-dsh-whale-mini].dragging { cursor: move; animation: none !important; transition: none; }

/* 思考内容滚动条：think 时悬在桌宠正上方，内容向左缓慢滚动 */
[data-dsh-whale-think] {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, -100%);
  display: none;
  align-items: center;
  gap: 8px;
  width: auto;
  max-width: 360px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(30, 34, 46, .82);
  color: #CFE0FF;
  font: 12px/1.4 ui-monospace, Consolas, "Courier New", monospace;
  border: 1px solid rgba(139,160,255,.25);
  box-shadow: 0 6px 20px rgba(0,0,0,.25);
  pointer-events: none;
  z-index: 899;
  white-space: nowrap;
  overflow: hidden;
}
[data-dsh-whale-think].show { display: flex; }
[data-dsh-whale-think] .dsh-whale-think-label { flex: none; opacity: .85; }
[data-dsh-whale-think] .dsh-whale-think-scroll { flex: 1; overflow: hidden; }
[data-dsh-whale-think] .dsh-whale-think-text {
  display: inline-block;
  will-change: transform;
  max-width: none;
}

[data-dsh-whale] .pet-official {
  width: calc(137px * var(--pw-scale));
  height: calc(101px * var(--pw-scale));
  position: relative;
  cursor: grab;
  pointer-events: auto;
}
[data-dsh-whale] .pet-official:active { cursor: grabbing; }
[data-dsh-whale] .pet-official svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
  transform-origin: 50% 85%;
}

/* 地面阴影：独立兄弟元素，钉在地面，鲸鱼的任何动画（翻滚/跃起/深潜）都不带动它 */
[data-dsh-whale] .dsh-whale-shadow {
  position: absolute;
  left: 50%;
  bottom: calc(-12px * var(--pw-scale));
  width: calc(79px * var(--pw-scale));
  height: calc(12px * var(--pw-scale));
  margin-left: calc(-40px * var(--pw-scale));
  background: radial-gradient(ellipse, rgba(46,42,36,.24), transparent 65%);
  border-radius: 50%;
  animation: pw-shadowBob 3.2s ease-in-out infinite;
  pointer-events: none;
}

/* 游动时的水流尾波光晕 */
[data-dsh-whale] .dsh-whale-wake {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(146px * var(--pw-scale));
  height: calc(96px * var(--pw-scale));
  margin-left: calc(-73px * var(--pw-scale));
  margin-top: calc(-48px * var(--pw-scale));
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(143, 181, 255, 0.28) 0%, rgba(77, 107, 254, 0.08) 50%, transparent 72%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
  filter: blur(4px);
  z-index: 1;
}
[data-dsh-whale].swimming .dsh-whale-wake {
  opacity: 1;
  animation: pw-wakePulse 1.6s ease-in-out infinite alternate;
}

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
[data-dsh-whale] .pet-official.error .angry { display: block !important; animation: pw-angryJitter 0.5s ease-in-out infinite; }
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
/* 上下压扁：锚在被压的那条边上，看着才像真被按住 */
[data-dsh-whale].edge-top .pet-official .body,
[data-dsh-whale].dragging.edge-top .pet-official .body {
  transform-origin: 50% 0%;
  animation: pw-squash 0.35s ease-out forwards !important;
}
[data-dsh-whale].edge-bottom .pet-official .body,
[data-dsh-whale].dragging.edge-bottom .pet-official .body {
  transform-origin: 50% 100%;
  animation: pw-squash 0.35s ease-out forwards !important;
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
/* 笑眼只在没有别的表情抢眼睛时出现：庆祝中被戳、甩晕、翻肚皮，各用各的眼睛 */
[data-dsh-whale]:not(.dragging) .pet-official.celebrate:not(.joy):not(.dizzy):not(.shaken):not(.belly-up):not(.petting) .eye-group .eye,
[data-dsh-whale]:not(.dragging) .pet-official.celebrate:not(.joy):not(.dizzy):not(.shaken):not(.belly-up):not(.petting) .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale]:not(.dragging) .pet-official.celebrate:not(.joy):not(.dizzy):not(.shaken):not(.belly-up):not(.petting) .eye-group .happy-eyes { display: inline !important; }
/* 笑眯着的眼睛不眨：一眨就压成一条横线，看着像睡着了 */
[data-dsh-whale] .pet-official.celebrate .eye-group { animation: none; }
[data-dsh-whale] .pet-official.celebrate .stars { display: block !important; }
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

/* 摸头：你的鼠标在它头顶来回蹭。眯眼、腮红变深，每蹭一下头顶被按下去一点 */
[data-dsh-whale].patting .pet-official { cursor: ${`url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text x='16' y='24' font-size='22' text-anchor='middle'>🤚</text></svg>")}") 16 16, pointer`}; }
[data-dsh-whale] .pet-official.petting .eye-group { animation: none; }
[data-dsh-whale] .pet-official.petting .eye-group .eye,
[data-dsh-whale] .pet-official.petting .eye-group .pupil-highlight { opacity: 0 !important; }
[data-dsh-whale] .pet-official.petting .eye-group .sleep-eyes { display: inline !important; }
[data-dsh-whale] .pet-official .blush { transition: opacity 0.3s ease; }
[data-dsh-whale] .pet-official.petting .blush { opacity: 0.9; }
[data-dsh-whale] .pet-official.pat-press .body {
  transform-origin: 50% 100%;
  animation: pw-patPress 0.3s ease-out !important;
}
[data-dsh-whale] .pat-heart {
  position: absolute;
  left: 26%;
  top: 0;
  color: #F07A8E;
  font-size: calc(15px * var(--pw-scale));
  line-height: 1;
  opacity: 0;
  pointer-events: none;
}
[data-dsh-whale] .pat-heart.show { animation: pw-heartFloat 1.1s ease-out forwards; }

/* 背部粼粼波光折射 */
[data-dsh-whale] .caustic-shimmer {
  animation: pw-causticDrift 4.2s ease-in-out infinite alternate;
}

[data-dsh-whale] .pet-official.wait { animation: pw-wait 1.2s ease-in-out infinite; }
[data-dsh-whale] .pet-official.wait .bubble-blue { display: block; animation: pw-riseBlue 1.2s ease-out infinite; }
[data-dsh-whale] .pet-official.disappointed { animation: pw-disappointed 2.6s ease-in-out infinite; }
/* 失落：眼珠往下垂、高光缩小，配八字眉和一滴往下掉的眼泪 */
[data-dsh-whale] .pet-official.disappointed .eye-group .eye { transform: translateY(0.25px); }
[data-dsh-whale] .pet-official.disappointed .eye-group .pupil-highlight { transform: translate(-0.12px, 0.45px) scale(0.7); transform-origin: 5.92px 5.35px; }
[data-dsh-whale] .pet-official.disappointed .eye-group .sad-eyes { display: inline !important; }
[data-dsh-whale] .pet-official.disappointed .tear {
  display: inline !important;
  animation: pw-tearDrop 1.3s ease-in infinite;
}


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
[data-dsh-whale].dragging .pet-official .eye-group .happy-eyes,
[data-dsh-whale].dragging .pet-official .eye-group .sad-eyes,
[data-dsh-whale].dragging .pet-official .tear { display: none !important; }
[data-dsh-whale].dragging .eye-group .caught-eyes path { stroke: var(--pw-eye, #2E2A24) !important; stroke-width: 0.9 !important; }

/* ===== 台词气泡 ===== */
[data-dsh-whale] .dsh-whale-dialog {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  background: #FFFFFF;
  color: var(--pw-ink);
  border: 1px solid rgba(46,42,36,.15);
  border-radius: 12px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 14px rgba(46,42,36,.08);
  pointer-events: none;
  opacity: 0;
  transform-origin: 50% 100%;
  transition: opacity .25s ease, transform .25s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 20;
}
[data-dsh-whale] .dsh-whale-dialog.show { opacity: 1; transform: translateX(-50%) scale(1); }
[data-dsh-whale] .dsh-whale-dialog::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: #FFFFFF transparent transparent;
}

/* ===== 投喂小鱼干 ===== */
[data-dsh-whale] .dsh-whale-snack {
  position: absolute;
  top: -7px;
  left: 14px;
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  z-index: 15;
}
[data-dsh-whale] .dsh-whale-snack.drop { animation: pw-dropSnack 0.7s ease-in forwards; }
[data-dsh-whale][data-facing="right"] .dsh-whale-snack { left: auto; right: 14px; }

/* ===== 角标：别的会话里正在跑的个数 =====
 * 挂在鲸鱼头前上方（朝右时镜像过去），做成一颗小气泡：实色渐变 + 左上高光 + 内阴影。
 * 三种动效各占一个独立变换属性，互不覆盖：
 *   translate — JS 每帧跟着鲸鱼身体的起伏走（index.ts 的 followBody）
 *   rotate    — 轻微左右摆
 *   scale     — 数字变化时弹一下 */
[data-dsh-whale] .dsh-whale-badge {
  position: absolute;
  top: calc(4px * var(--pw-scale));
  left: calc(-6px * var(--pw-scale));
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  box-sizing: border-box;
  border-radius: 12px;
  /* 底色要够深，白字才看得清；亮面只交给 ::before 那一小块高光 */
  background: radial-gradient(circle at 35% 30%, var(--pw-body) 0%, var(--pw-body-dark) 85%);
  border: 1.5px solid rgba(255, 255, 255, 0.92);
  box-shadow:
    0 3px 8px rgba(53, 80, 201, 0.32),
    inset 0 -2px 3px rgba(20, 30, 90, 0.22),
    inset 0 1px 2px rgba(255, 255, 255, 0.55);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 800;
  line-height: 21px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(20, 30, 90, 0.55);
  pointer-events: auto;
  cursor: default;
  z-index: 16;
  transform-origin: 50% 90%;
  animation: pw-badgeSway 2.8s ease-in-out infinite;
}
/* 气泡左上角的高光（右下角别再加小反光点，真机上看着像数字后面跟了个句号） */
[data-dsh-whale] .dsh-whale-badge::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 4px;
  width: 7px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  transform: rotate(-28deg);
  pointer-events: none;
}
[data-dsh-whale] .dsh-whale-badge.pop {
  animation: pw-badgeSway 2.8s ease-in-out infinite, pw-badgePop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1);
}
[data-dsh-whale][data-facing="right"] .dsh-whale-badge { left: auto; right: calc(-6px * var(--pw-scale)); }
@keyframes pw-badgeSway {
  0%, 100% { rotate: -6deg; }
  50% { rotate: 6deg; }
}
@keyframes pw-badgePop {
  0% { scale: 0.3; }
  60% { scale: 1.18 0.9; }
  80% { scale: 0.95 1.05; }
  100% { scale: 1; }
}
/* 以后给角标加 display 时，hidden 属性会被压过（青筋/星星踩过的坑），先钉死 */
[data-dsh-whale] .dsh-whale-badge[hidden] { display: none !important; }


/* ===== 打瞌睡 ===== */
[data-dsh-whale] .dsh-whale-zzz {
  position: absolute;
  left: 58%;
  top: 19px;
  font-size: 10px;
  font-weight: bold;
  color: #8F4427;
  opacity: 0;
  pointer-events: none;
}
[data-dsh-whale].sleeping .dsh-whale-zzz { animation: pw-zzzFloat 2.8s ease-in-out infinite; }
[data-dsh-whale].sleeping .pet-official .body { animation: pw-sleepBob 4s ease-in-out infinite !important; }
[data-dsh-whale].sleeping .pet-official .eye-group { transform: scaleY(0.08) !important; }
[data-dsh-whale].sleeping .pet-official .pupil-highlight { opacity: 0 !important; }

/* ===== 右键菜单 ===== */
[data-dsh-whale] .dsh-whale-menu {
  position: absolute;
  min-width: 132px;
  padding: 4px;
  border-radius: 10px;
  background: var(--dsw-hovercard-bg, #2C2C2E);
  color: var(--dsw-alias-text-1, #eee);
  box-shadow: var(--dsw-shadow-lv3, 0 8px 24px rgba(0,0,0,.25));
  pointer-events: auto;
  z-index: 30;
  display: none;
  font-size: 13px;
}
[data-dsh-whale] .dsh-whale-menu.open { display: block; }
[data-dsh-whale] .dsh-whale-menu button {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  color: inherit;
  padding: 6px 10px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
}
[data-dsh-whale] .dsh-whale-menu button:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,.1)); }
[data-dsh-whale] .dsh-whale-menu .pw-swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: -2px;
  border: 1px solid rgba(255,255,255,.35);
}

  [data-dsh-whale] .dsh-whale-menu {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    min-width: 168px;
  }
  [data-dsh-whale] .dsh-whale-menu .pw-panel-title {
    padding: 8px 10px 4px;
    font-weight: 600;
    font-size: 13px;
    opacity: .92;
    border-bottom: 1px solid rgba(255,255,255,.08);
    margin-bottom: 4px;
  }
  [data-dsh-whale] .dsh-whale-menu .pw-panel-section {
    padding: 4px 6px;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }
  [data-dsh-whale] .dsh-whale-menu .pw-panel-section:last-of-type {
    border-bottom: none;
  }
  [data-dsh-whale] .dsh-whale-menu .pw-panel-section-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .4px;
    opacity: .65;
    padding: 6px 4px 2px;
  }
  [data-dsh-whale] .dsh-whale-menu .pw-palette-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    width: auto;
    min-width: 86px;
    margin: 2px;
    padding: 5px 8px;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 8px;
    background: rgba(255,255,255,.04);
  }
  [data-dsh-whale] .dsh-whale-menu .pw-palette-btn:hover {
    background: rgba(255,255,255,.12);
  }
  [data-dsh-whale] .dsh-whale-menu .pw-back {
    margin-top: 4px;
    opacity: .75;
  }


/* 悬停腮红加深 */
[data-dsh-whale] .pet-official:hover .eye-group {
  filter: drop-shadow(0 0 1px rgba(217, 142, 106, 0.8));
}

/* ===== keyframes（pw- 前缀） ===== */
@keyframes pw-qbob {
  0%,100% { transform: translateY(0) scale(1, 1); }
  22%     { transform: translateY(-7px) scale(.985, 1.035); }
  50%     { transform: translateY(2px) scale(1.02, .965); }
  72%     { transform: translateY(-3px) scale(.995, 1.012); }
}
@keyframes pw-dive2 {
  0%, 10%  { transform: translateY(0) rotate(0) scale(1, 1); opacity: 1; }
  24%      { transform: translateY(9px) rotate(-7deg) scale(1.03, .95); opacity: .78; }
  38%, 70% { transform: translateY(33px) rotate(3deg) scale(.95, 1.05); opacity: .42; }
  84%      { transform: translateY(6px) rotate(-5deg) scale(1.03, .96); opacity: .85; }
  94%,100% { transform: translateY(0) rotate(0) scale(1, 1); opacity: 1; }
}
@keyframes pw-leap2 {
  0%, 100%  { transform: translateY(0) rotate(0) scale(1, 1); }
  14%       { transform: translateY(-27px) rotate(-10deg) scale(.97, 1.06); }
  36%       { transform: translateY(2px) rotate(5deg) scale(1.09, .88); }
  52%       { transform: translateY(-13px) rotate(-4deg) scale(.98, 1.04); }
  72%       { transform: translateY(-3px) rotate(2deg) scale(1.03, .94); }
}
@keyframes pw-shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-3.5px); }
  50%      { transform: translateX(2.5px); }
  75%      { transform: translateX(-2px); }
}
@keyframes pw-wait {
  0%, 100% { transform: translateY(0) rotate(0) scale(1, 1); }
  30%      { transform: translateY(-4px) rotate(-2deg) scale(1.01, .99); }
  60%      { transform: translateY(2px) rotate(2deg) scale(.99, 1.01); }
}
@keyframes pw-disappointed {
  0%, 100% { transform: translateY(0) rotate(0) scale(1, 1); opacity: 1; }
  40%      { transform: translateY(1px) rotate(-1.5deg) scale(0.99, 1.01); opacity: .88; }
  70%      { transform: translateY(0) rotate(1deg) scale(1, 0.99); opacity: .94; }
}


@keyframes pw-swim {
  0%,100% { transform: translateX(-3.5px) translateY(0) rotate(-1.5deg); }
  50%     { transform: translateX(3.5px) translateY(-2px) rotate(1.5deg); }
}
@keyframes pw-swimBody {
  0%   { transform: translateY(0) rotate(-1.2deg) scale(1, 1); }
  100% { transform: translateY(-1.8px) rotate(1.2deg) scale(0.99, 1.015); }
}
@keyframes pw-blink {
  0%, 91%, 100% { transform: scaleY(1); }
  94%           { transform: scaleY(0.08); }
  97%           { transform: scaleY(1); }
}
@keyframes pw-rise {
  0%   { transform: translateY(0) scale(.6); opacity: 0; }
  20%  { opacity: .9; }
  100% { transform: translateY(-50px) scale(1.1); opacity: 0; }
}
@keyframes pw-riseBlue {
  0%   { transform: translate(5px, 22px) scale(.5); opacity: 0; }
  25%  { opacity: .85; }
  100% { transform: translate(-7px, -33px) scale(1.15); opacity: 0; }
}
@keyframes pw-squish {
  0%   { transform: scale(1, 1); }
  25%  { transform: scale(1.15, 0.82); }
  55%  { transform: scale(0.93, 1.09); }
  78%  { transform: scale(1.03, 0.98); }
  100% { transform: scale(1, 1); }
}
@keyframes pw-rollTrick {
  0%   { transform: translateY(0) rotate(0deg) scale(1, 1); }
  30%  { transform: translateY(-22px) rotate(-120deg) scale(1.08, 0.92); }
  70%  { transform: translateY(-14px) rotate(-260deg) scale(0.95, 1.05); }
  100% { transform: translateY(0) rotate(-360deg) scale(1, 1); }
}
@keyframes pw-shadowBob {
  0%,100% { transform: scale(1); opacity: .9; }
  50%     { transform: scale(.78); opacity: .5; }
}
@keyframes pw-keyTap1 {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(0.4px); }
}
@keyframes pw-keyTap2 {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(0.4px); }
}
[data-dsh-whale] .tap-k1 { animation: pw-keyTap1 0.16s ease-in-out infinite alternate; }
[data-dsh-whale] .tap-k2 { animation: pw-keyTap2 0.18s ease-in-out 0.08s infinite alternate; }
@keyframes pw-codeFloat1 {
  0%   { transform: translateY(0) scale(0.5); opacity: 0; }
  30%  { opacity: 0.95; }
  100% { transform: translateY(-16px) translateX(-5px) scale(1); opacity: 0; }
}
@keyframes pw-codeFloat2 {
  0%   { transform: translateY(0) scale(0.5); opacity: 0; }
  30%  { opacity: 0.95; }
  100% { transform: translateY(-17px) translateX(4px) scale(1.05); opacity: 0; }
}
[data-dsh-whale] .code-fx1 { animation: pw-codeFloat1 1.2s ease-out infinite; }
[data-dsh-whale] .code-fx2 { animation: pw-codeFloat2 1.2s ease-out 0.6s infinite; }
@keyframes pw-starSpin {
  0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50%     { transform: scale(1.3) rotate(22deg); opacity: .65; }
}
@keyframes pw-angryJitter {
  0%,100% { transform: translateX(0); }
  50%     { transform: translateX(-1.2px); }
}
@keyframes pw-sleepBob {
  0%,100% { transform: translateY(0) scale(1, 1); }
  50%     { transform: translateY(3px) scale(1.02, 0.97); }
}
@keyframes pw-zzzFloat {
  0%   { transform: translate(0, 0) scale(0.6); opacity: 0; }
  30%  { opacity: 0.9; }
  100% { transform: translate(10px, -17px) scale(1.15); opacity: 0; }
}
@keyframes pw-dropSnack {
  0%   { transform: translateY(0) rotate(0); opacity: 1; }
  80%  { transform: translateY(79px) rotate(45deg); opacity: 1; }
  100% { transform: translateY(90px) scale(0.5); opacity: 0; }
}

@keyframes pw-mini-breathe {
  0%,100% { box-shadow: 0 8px 20px rgba(0,0,0,.28); }
  50%     { box-shadow: 0 8px 24px rgba(77,107,254,.55); }
}
@keyframes pw-mini-think {
  0%,100% { box-shadow: 0 8px 20px rgba(61,85,214,.35); }
  50%     { box-shadow: 0 8px 26px rgba(110,139,255,.75); }
}
@keyframes pw-mini-work {
  0%,100% { opacity: 1; }
  50%     { opacity: .62; }
}
@keyframes pw-mini-celebrate {
  0%,100% { box-shadow: 0 8px 20px rgba(27,138,74,.35); }
  50%     { box-shadow: 0 10px 28px rgba(59,196,109,.85); }
}
@keyframes pw-mini-error {
  0%,100% { box-shadow: 0 8px 20px rgba(166,27,32,.35); }
  50%     { box-shadow: 0 8px 26px rgba(229,72,77,.85); }
}

/* ===== 全屏独立固定粒子层 ===== */
.pw-particle-layer {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 898;
  overflow: hidden;
}

/* ===== 水纹与水泡特效 ===== */
.pw-water-ripple {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  border: 1.5px solid rgba(143, 181, 255, 0.65);
  background: radial-gradient(ellipse at center, rgba(143, 181, 255, 0.22) 0%, rgba(77, 107, 254, 0.05) 55%, transparent 75%);
  transform: translate(-50%, -50%) scale(0.2);
  animation: pw-rippleFade 1s cubic-bezier(0.12, 0.8, 0.32, 1) forwards;
  z-index: 898;
  box-shadow: 0 0 8px rgba(143, 181, 255, 0.35);
}
@keyframes pw-rippleFade {
  0% {
    transform: translate(-50%, -50%) scale(0.2);
    opacity: 0.85;
  }
  60% {
    opacity: 0.45;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.65);
    opacity: 0;
  }
}

.pw-stream-bubble {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, rgba(180, 215, 255, 0.85) 55%, rgba(77, 107, 254, 0.45) 100%);
  border: 0.8px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 4px rgba(143, 181, 255, 0.5), inset -1px -1px 2px rgba(53, 80, 201, 0.3);
  animation: pw-bubbleFloat var(--pw-b-dur, 1.1s) cubic-bezier(0.2, 0.7, 0.4, 1) forwards;
  z-index: 899;
}
@keyframes pw-bubbleFloat {
  0% {
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  20% {
    opacity: 0.95;
  }
  80% {
    opacity: 0.75;
    transform: translate(var(--pw-b-dx, -10px), var(--pw-b-dy, -20px)) scale(1.05);
  }
  100% {
    transform: translate(calc(var(--pw-b-dx, -10px) * 1.3), calc(var(--pw-b-dy, -20px) - 16px)) scale(0.2);
    opacity: 0;
  }
}

@keyframes pw-wakePulse {
  0%   { transform: scale(0.9, 0.82) rotate(-2.5deg); opacity: 0.45; }
  100% { transform: scale(1.18, 1.08) rotate(2.5deg); opacity: 0.85; }
}

@keyframes pw-spoutSpray {
  0%   { transform: scale(0.2) translateY(2px); opacity: 0; }
  25%  { transform: scale(1) translateY(0); opacity: 0.95; }
  70%  { transform: scale(1.08) translateY(-1.5px); opacity: 0.75; }
  100% { transform: scale(1.15) translateY(-3px); opacity: 0; }
}

@keyframes pw-pupilGaze {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(0.35px, -0.42px); }
}

@keyframes pw-annoyedDodge {
  0%   { transform: translateX(0) rotate(0deg); }
  35%  { transform: translateX(-9px) rotate(-7deg); }
  65%  { transform: translateX(4px) rotate(3deg); }
  100% { transform: translateX(0) rotate(0deg); }
}
/* 背过身：横向翻面到一半停住，读作"扭头不看你" */
@keyframes pw-sulkTurn {
  0%   { transform: rotate(0deg) scale(1, 1); }
  45%  { transform: rotate(-10deg) scale(0.94, 1.05); }
  100% { transform: rotate(-6deg) scale(0.97, 1.02); }
}
@keyframes pw-dizzyShake {
  0%   { transform: rotate(-12deg) scale(0.95); }
  100% { transform: rotate(12deg) scale(1.05); }
}

@keyframes pw-dizzyWobble {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25%      { transform: rotate(-7deg) scale(0.96); }
  75%      { transform: rotate(7deg) scale(0.96); }
}

@keyframes pw-bellyUp {
  0%   { transform: rotate(0deg) translateY(0); }
  20%  { transform: rotate(160deg) translateY(-18px); }
  35%  { transform: rotate(180deg) translateY(-6px); }
  75%  { transform: rotate(180deg) translateY(-6px); }
  100% { transform: rotate(360deg) translateY(0); }
}

@keyframes pw-squeeze {
  0%   { transform: scaleX(1) scaleY(1); }
  100% { transform: scaleX(0.82) scaleY(1.1); }
}

@keyframes pw-patPress {
  0%   { transform: scale(1, 1); }
  35%  { transform: scale(1.05, 0.9); }
  100% { transform: scale(1, 1); }
}
@keyframes pw-heartFloat {
  0%   { transform: translateY(4px) scale(0.5); opacity: 0; }
  25%  { transform: translateY(0) scale(1.1); opacity: 1; }
  100% { transform: translateY(-22px) scale(0.9); opacity: 0; }
}

@keyframes pw-tearDrop {
  0%   { transform: translateY(-0.4px) scale(0.4); opacity: 0; }
  25%  { transform: translateY(0) scale(1); opacity: 1; }
  70%  { transform: translateY(1.6px) scale(1); opacity: 1; }
  100% { transform: translateY(2.6px) scale(0.9); opacity: 0; }
}

@keyframes pw-squash {
  0%   { transform: scaleX(1) scaleY(1); }
  100% { transform: scaleX(1.12) scaleY(0.8); }
}

@keyframes pw-impatientSway {
  0%, 100% { transform: rotate(0deg); }
  30%      { transform: rotate(-5deg); }
  70%      { transform: rotate(5deg); }
}

@keyframes pw-joyHop {
  0%, 100% { transform: translateY(0) scale(1); }
  35%      { transform: translateY(-16px) scale(1.08, 0.94); }
  65%      { transform: translateY(-4px) scale(0.96, 1.04); }
}

@keyframes pw-causticDrift {
  0%   { transform: translate(-0.6px, 0.3px); opacity: 0.12; stroke-width: 0.9; }
  50%  { opacity: 0.28; stroke-width: 1.25; }
  100% { transform: translate(0.6px, -0.3px); opacity: 0.14; stroke-width: 1.0; }
}

/* 破浪跃水与着陆飞溅水滴 */
.pw-splash-drop {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, rgba(180, 215, 255, 0.9) 60%, rgba(77, 107, 254, 0.5) 100%);
  box-shadow: 0 0 3px rgba(143, 181, 255, 0.6);
  animation: pw-splashFall var(--pw-sp-dur, 0.65s) cubic-bezier(0.25, 0.9, 0.4, 1) forwards;
  z-index: 899;
}
@keyframes pw-splashFall {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.95;
  }
  60% {
    opacity: 0.85;
  }
  100% {
    transform: translate(var(--pw-sp-dx, 12px), var(--pw-sp-dy, 35px)) scale(0.2);
    opacity: 0;
  }
}

/* 悬空拖拽滴水 */
.pw-drag-drip {
  position: absolute;
  pointer-events: none;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: radial-gradient(circle at 35% 30%, #FFFFFF 0%, rgba(160, 205, 255, 0.85) 60%, rgba(77, 107, 254, 0.4) 100%);
  box-shadow: 0 0 3px rgba(143, 181, 255, 0.4);
  animation: pw-dripFall 0.52s cubic-bezier(0.45, 0.05, 0.85, 0.6) forwards;
  z-index: 897;
}
@keyframes pw-dripFall {
  0% {
    transform: translate(0, 0) scale(0.6);
    opacity: 0.9;
  }
  50% {
    transform: translate(0, 14px) scale(0.9, 1.25);
    opacity: 0.85;
  }
  100% {
    transform: translate(0, 46px) scale(0.3, 0.1);
    opacity: 0;
  }
}

/* 庆祝彩屑粒子 */
.pw-confetti {
  position: absolute;
  pointer-events: none;
  width: var(--pw-cf-w, 7px);
  height: var(--pw-cf-h, 10px);
  background: var(--pw-cf-bg, #4D6BFE);
  border-radius: var(--pw-cf-r, 2px);
  opacity: 0.95;
  animation: pw-confettiFall var(--pw-cf-dur, 1.1s) cubic-bezier(0.22, 0.8, 0.36, 1) forwards;
  z-index: 899;
}
@keyframes pw-confettiFall {
  0% {
    transform: translate(0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    opacity: 1;
  }
  60% {
    opacity: 0.85;
  }
  100% {
    transform: translate(var(--pw-cf-dx, 35px), var(--pw-cf-dy, 100px)) rotateX(540deg) rotateY(360deg) rotateZ(270deg);
    opacity: 0;
  }
}

/* 陪伴统计项目 */
[data-dsh-whale] .dsh-whale-menu .pw-stats-item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  font-size: 12px;
  padding: 6px 10px;
  margin-bottom: 4px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.95;
}
[data-dsh-whale][data-theme="dark"] .dsh-whale-menu .pw-stats-item {
  background: rgba(255, 255, 255, 0.08);
  color: #F2F2F0;
}

/* 后台省电：页面不可见时暂停一切动画 */
[data-dsh-whale].paused,
[data-dsh-whale].paused * { animation-play-state: paused !important; transition: none !important; }
[data-dsh-whale-mini].paused { animation: none !important; }

/* 主题联动：DSH 暗色主题下的 UI 皮肤 */
[data-dsh-whale][data-theme="dark"] .dsh-whale-dialog {
  background: #2C2C2E;
  color: #F2F2F0;
  border-color: rgba(255,255,255,.12);
}
[data-dsh-whale][data-theme="dark"] .dsh-whale-dialog::after {
  border-color: #2C2C2E transparent transparent;
}
[data-dsh-whale][data-theme="dark"] .dsh-whale-shadow {
  background: radial-gradient(ellipse, rgba(0,0,0,.5), transparent 65%);
}
[data-dsh-whale][data-theme="dark"] .dsh-whale-wake {
  background: radial-gradient(ellipse at center, rgba(110, 145, 255, 0.22) 0%, rgba(53, 80, 201, 0.06) 50%, transparent 72%);
}

/* 减少动态效果：全关动画 */
@media (prefers-reduced-motion: reduce) {
  [data-dsh-whale] *,
  [data-dsh-whale] { animation: none !important; transition: none !important; }
  .pw-water-ripple, .pw-stream-bubble, .pw-splash-drop, .pw-drag-drip, .pw-confetti { display: none !important; }
}
`;
		//#endregion
		//#region src/client/sounds.ts
		const VOLUME_LEVELS = [
			"low",
			"mid",
			"high"
		];
		const VOLUME_GAIN = {
			low: .4,
			mid: 1,
			high: 1.6
		};
		const MUTE_KEY = "pet-whale:muted";
		const VOLUME_KEY = "pet-whale:volume";
		var WhaleSounds = class {
			ctx = null;
			/** 所有音效都接到这个总音量上，换档只改它的 gain */
			master = null;
			muted;
			level;
			constructor() {
				let muted = false;
				let level = "mid";
				try {
					muted = localStorage.getItem(MUTE_KEY) === "1";
					const raw = localStorage.getItem(VOLUME_KEY);
					if (VOLUME_LEVELS.includes(raw ?? "")) level = raw;
				} catch {}
				this.muted = muted;
				this.level = level;
			}
			get isMuted() {
				return this.muted;
			}
			get volume() {
				return this.level;
			}
			setVolume(level) {
				this.level = level;
				if (this.master !== null) this.master.gain.value = VOLUME_GAIN[level];
				try {
					localStorage.setItem(VOLUME_KEY, level);
				} catch {}
			}
			setMuted(muted) {
				this.muted = muted;
				try {
					localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
				} catch {}
			}
			/** 浏览器自动播放策略：AudioContext 需在用户手势后 resume，挂一次全局 pointerdown 解锁。 */
			installGestureUnlock() {
				document.addEventListener("pointerdown", this.unlock, {
					capture: true,
					passive: true
				});
			}
			unlock = () => {
				const ctx = this.acquire();
				if (ctx !== null && ctx.state === "suspended") ctx.resume();
			};
			/** 卸载时收干净：热重载一次留一个 AudioContext 和一个全局监听，攒多了会出怪事 */
			dispose() {
				document.removeEventListener("pointerdown", this.unlock, { capture: true });
				if (this.ctx !== null) this.ctx.close().catch(() => {});
				this.ctx = null;
				this.master = null;
			}
			acquire() {
				if (this.ctx === null) {
					const Ctor = window.AudioContext ?? window.webkitAudioContext;
					if (Ctor === void 0) return null;
					this.ctx = new Ctor();
					this.master = this.ctx.createGain();
					this.master.gain.value = VOLUME_GAIN[this.level];
					this.master.connect(this.ctx.destination);
				}
				if (this.ctx.state === "suspended") this.ctx.resume();
				return this.ctx;
			}
			play(type) {
				if (this.muted) return;
				try {
					const ctx = this.acquire();
					if (ctx === null) return;
					const out = this.master ?? ctx.destination;
					const now = ctx.currentTime;
					if (type === "bubble") {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						osc.type = "sine";
						osc.frequency.setValueAtTime(420, now);
						osc.frequency.exponentialRampToValueAtTime(840, now + .12);
						gain.gain.setValueAtTime(.3, now);
						gain.gain.exponentialRampToValueAtTime(.01, now + .14);
						osc.connect(gain);
						gain.connect(out);
						osc.start(now);
						osc.stop(now + .15);
					} else if (type === "work") {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						osc.type = "triangle";
						osc.frequency.setValueAtTime(720, now);
						gain.gain.setValueAtTime(.18, now);
						gain.gain.exponentialRampToValueAtTime(.01, now + .06);
						osc.connect(gain);
						gain.connect(out);
						osc.start(now);
						osc.stop(now + .07);
					} else if (type === "celebrate") [
						523.25,
						659.25,
						783.99,
						1046.5
					].forEach((freq, i) => {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						osc.type = "sine";
						osc.frequency.setValueAtTime(freq, now + i * .08);
						gain.gain.setValueAtTime(.2, now + i * .08);
						gain.gain.exponentialRampToValueAtTime(.01, now + i * .08 + .22);
						osc.connect(gain);
						gain.connect(out);
						osc.start(now + i * .08);
						osc.stop(now + i * .08 + .23);
					});
					else if (type === "error") {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						osc.type = "sawtooth";
						osc.frequency.setValueAtTime(320, now);
						osc.frequency.exponentialRampToValueAtTime(140, now + .25);
						gain.gain.setValueAtTime(.15, now);
						gain.gain.exponentialRampToValueAtTime(.01, now + .26);
						osc.connect(gain);
						gain.connect(out);
						osc.start(now);
						osc.stop(now + .27);
					} else if (type === "snack") {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						osc.type = "sine";
						osc.frequency.setValueAtTime(880, now);
						osc.frequency.exponentialRampToValueAtTime(580, now + .1);
						gain.gain.setValueAtTime(.25, now);
						gain.gain.exponentialRampToValueAtTime(.01, now + .12);
						osc.connect(gain);
						gain.connect(out);
						osc.start(now);
						osc.stop(now + .13);
					} else if (type === "trick") {
						const osc = ctx.createOscillator();
						const gain = ctx.createGain();
						osc.type = "sine";
						osc.frequency.setValueAtTime(350, now);
						osc.frequency.exponentialRampToValueAtTime(1050, now + .35);
						gain.gain.setValueAtTime(.28, now);
						gain.gain.exponentialRampToValueAtTime(.01, now + .4);
						osc.connect(gain);
						gain.connect(out);
						osc.start(now);
						osc.stop(now + .42);
					}
				} catch {}
			}
		};
		//#endregion
		//#region src/client/state.ts
		const ERROR_MS = 4e3;
		const DISAPPOINTED_MS = 2600;
		const CELEBRATE_MS = 2500;
		/** working 粘滞时长：工具调用结束后继续保持"敲代码"的时间 */
		const WORK_STICKY_MS = 2500;
		/** 快照 → 持续状态。 */
		function deriveContinuous(snap, stickyUntil, now) {
			if (!snap.running) return "idle";
			if (hasToolActivity(snap)) return "working";
			if (stickyUntil !== null && now < stickyUntil) return "working";
			return "think";
		}
		/** 有工具在飞：legacy.runningCalls 非空，或者流式消息里已经出现了 tool-call 块。 */
		function hasToolActivity(snap) {
			return (snap.runningCalls?.length ?? 0) > 0 || snap.partialToolCall === true;
		}
		/** 状态驱动：吃快照序列，吐状态序列。 */
		var WhaleDriver = class {
			prevRunning = null;
			prevTurnEnds = 0;
			prevError = null;
			transient = null;
			stickyUntil = null;
			current = "idle";
			/** 首帧初始化基线（不触发任何瞬态）。 */
			prime(snap) {
				this.prevRunning = snap.running;
				this.prevTurnEnds = snap.turnEnds?.size ?? 0;
				this.prevError = errorKey(snap);
				this.stickyUntil = null;
				this.current = (snap.pending?.length ?? 0) > 0 ? "wait" : deriveContinuous(snap, this.stickyUntil, 0);
			}
			step(snap, now) {
				if (this.prevRunning === null) {
					this.prime(snap);
					return {
						state: this.current,
						changed: false
					};
				}
				const err = errorKey(snap);
				if (err !== null && err !== this.prevError) this.transient = {
					state: "error",
					until: now + ERROR_MS
				};
				this.prevError = err;
				if (this.prevRunning === true && snap.running === false) {
					const ends = snap.turnEnds?.size;
					const turns = ends !== void 0 && ends > this.prevTurnEnds ? ends : this.prevTurnEnds + 1;
					if (turns > this.prevTurnEnds && err === null) this.transient = {
						state: "celebrate",
						until: now + CELEBRATE_MS
					};
					this.prevTurnEnds = turns;
				} else if (snap.turnEnds !== void 0 && snap.turnEnds.size > this.prevTurnEnds) this.prevTurnEnds = snap.turnEnds.size;
				this.prevRunning = snap.running;
				if (snap.running && hasToolActivity(snap)) this.stickyUntil = now + WORK_STICKY_MS;
				if (!snap.running) this.stickyUntil = null;
				const waiting = (snap.pending?.length ?? 0) > 0;
				let next;
				if (waiting) next = "wait";
				else if (this.transient !== null) if (now < this.transient.until) next = this.transient.state;
				else if (this.transient.state === "error") {
					this.transient = {
						state: "disappointed",
						until: now + DISAPPOINTED_MS
					};
					next = "disappointed";
				} else {
					this.transient = null;
					next = deriveContinuous(snap, this.stickyUntil, now);
				}
				else next = deriveContinuous(snap, this.stickyUntil, now);
				const changed = next !== this.current;
				this.current = next;
				return {
					state: next,
					changed
				};
			}
			/**
			* 安抚：失落时被戳，提前结束这段自愈。
			* 只对 disappointed 生效——error 正在报的时候不该被一戳抹掉，
			* celebrate 也没有提前结束的道理。返回是否真的安抚到了。
			*/
			soothe() {
				if (this.transient === null || this.transient.state !== "disappointed") return false;
				this.transient = null;
				return true;
			}
			/**
			* 换了当前会话：下一帧当首帧重新起算基线。
			* 不重置的话，旧会话 running=true、新会话 running=false 会被 step 当成"回合跑完"误庆祝。
			*/
			reset() {
				this.prevRunning = null;
				this.stickyUntil = null;
			}
			/**
			* 别的会话跑完了：当前会话的快照里看不到这个边沿，由调用方直接递进来。
			* 正在报错 / 失落时不抢戏。下一次 step() 才会把状态真正切过去。
			*/
			celebrateOther(now) {
				if (this.transient !== null && this.transient.state !== "celebrate" && now < this.transient.until) return;
				this.transient = {
					state: "celebrate",
					until: now + CELEBRATE_MS
				};
			}
			get state() {
				return this.current;
			}
			/**
			* 下一个「不需要新快照、时间到了状态自己就该变」的时刻（ms，与 step 的 now 同基准）。
			* null = 没有待到期的东西。
			*
			* 为什么需要它：step() 只在快照更新时被调用，而 celebrate / error / disappointed 是
			* 到点回落的瞬态、working 粘滞也是到点回落。回合结束后快照往往就不再更新了，
			* 没人再调 step ⇒ 瞬态永远不结束。实测：celebrate 卡住 18.5 秒，直到下一条消息
			* 把它顶掉（用户看到的就是"庆祝停不下来"）。调用方拿这个时刻挂一个定时器即可。
			*/
			nextDeadline(now) {
				const candidates = [];
				if (this.transient !== null) candidates.push(Math.max(now, this.transient.until));
				if (this.stickyUntil !== null) candidates.push(Math.max(now, this.stickyUntil));
				if (candidates.length === 0) return null;
				return Math.min(...candidates);
			}
		};
		function errorKey(snap) {
			if (snap.lastAgentError != null) return snap.lastAgentError;
			if (snap.openError != null) return "open-error";
			return null;
		}
		//#endregion
		//#region src/client/palettes.ts
		const PALETTES = [
			{
				id: "terracotta",
				name: "陶土",
				light: "#BC6238",
				main: "#A3502C",
				dark: "#88431F",
				blush: "#D98E6A"
			},
			{
				id: "ocean",
				name: "深海蓝",
				light: "#7FA8DC",
				main: "#4A7FBE",
				dark: "#2E5A8C",
				blush: "#E8A2B0"
			},
			{
				id: "matcha",
				name: "抹茶绿",
				light: "#A8CC8F",
				main: "#6F9E5E",
				dark: "#43683A",
				blush: "#E8B08A"
			},
			{
				id: "sakura",
				name: "樱粉",
				light: "#F2A7C0",
				main: "#E0779B",
				dark: "#B04E72",
				blush: "#F5B9CD"
			},
			{
				id: "ink",
				name: "墨灰",
				light: "#B8B8B8",
				main: "#787878",
				dark: "#4C4C4C",
				blush: "#C89B9B"
			},
			{
				id: "night",
				name: "夜黑",
				light: "#4A4A4A",
				main: "#262626",
				dark: "#121212",
				blush: "#7A5C5C",
				eye: "#F7F2E6",
				pupil: "#2E2A24"
			},
			{
				id: "theme-blue",
				name: "主题蓝",
				light: "#8FB5FF",
				main: "#4D6BFE",
				dark: "#3550C9",
				blush: "#F0A0A0"
			}
		];
		const DEFAULT_PALETTE = PALETTES.find((p) => p.id === "theme-blue") ?? PALETTES[0];
		const PALETTE_KEY = "pet-whale:palette";
		function loadPaletteId() {
			try {
				const raw = localStorage.getItem(PALETTE_KEY);
				if (raw !== null && PALETTES.some((p) => p.id === raw)) return raw;
			} catch {}
			return DEFAULT_PALETTE.id;
		}
		function savePaletteId(id) {
			try {
				localStorage.setItem(PALETTE_KEY, id);
			} catch {}
		}
		function paletteOf(id) {
			return PALETTES.find((p) => p.id === id) ?? DEFAULT_PALETTE;
		}
		/** 把色板写到根元素 CSS 变量上（SVG 里的 fill/stop-color 引这些变量）。 */
		function applyPalette(root, palette) {
			root.style.setProperty("--pw-body-light", palette.light);
			root.style.setProperty("--pw-body", palette.main);
			root.style.setProperty("--pw-body-dark", palette.dark);
			root.style.setProperty("--pw-blush", palette.blush);
			root.style.setProperty("--pw-eye", palette.eye ?? "#2E2A24");
			root.style.setProperty("--pw-pupil", palette.pupil ?? "#FBF8F0");
		}
		//#endregion
		//#region src/client/i18n.ts
		const zh = {
			status: {
				idle: [
					"小鲸鱼待命中~ 点击我可以戳戳哦 🐳",
					"今天有什么新的代码任务呢？✨",
					"摇摇尾巴，随时准备出发！"
				],
				think: [
					"正在深潜检索知识库... 🌊",
					"认真思考架构逻辑中...",
					"咕噜噜... 正在探索深海答案"
				],
				working: [
					"认真敲代码中！⚡",
					"噼里啪啦码字中，很快就好~ ⌨️",
					"正在调用 Agent 工具执行任务！"
				],
				celebrate: [
					"太棒啦！任务圆满搞定~ 🎉",
					"代码测试全绿，完美交付！✨",
					"冒泡庆祝中，请主人查收~"
				],
				error: [
					"哎呀出错了，正在发抖求救 🥺",
					"捕获到一个异常，正在尝试自愈...",
					"呜呜呜，遇到阻碍了 >_<"
				],
				wait: [
					"主人，这里需要你确认一下 🙋",
					"等你拍板呢，我先把进度停在这里~",
					"需要你看一眼再继续哦 ✋"
				],
				disappointed: [
					"呜呜... 刚刚没发挥好，有点小失落 🥺",
					"失败是成功之母，我再缓缓~",
					"下次一定会更好的..."
				]
			},
			bond: {
				tierName: [
					"初识",
					"熟络",
					"形影不离"
				],
				levelUp: [
					"",
					"好像... 跟你熟起来了呢 🐋✨",
					"已经离不开你啦，别丢下我哦 (´∀｀)♡"
				],
				poke: [
					[
						"咕噜。",
						"……（歪着头看你）",
						"唔，痒。",
						"（往旁边挪了挪）"
					],
					[
						"咕噜咕噜~ 戳到软软的肚皮啦！",
						"好痒呀~ 哈哈哈 (≧▽≦)",
						"鲸鱼活力 +10！继续加油~",
						"小尾巴拍拍水，心情超棒 ✨"
					],
					[
						"又戳我~ 就知道你闲不住 (´∀｀)",
						"嘿嘿，今天也来找我玩啦 ♡",
						"再多戳一会儿嘛，我不介意的 🐳",
						"（主动把肚皮翻过来给你）"
					]
				],
				welcome: [
					"你好，我是这儿的鲸鱼 🐋",
					"欢迎回来，今天也一起加油吧！🐳✨",
					"你来啦！我一直在等你 🐳✨"
				],
				chatter: [
					"欸嘿，我在这儿哦 🐳",
					"（悄悄看了你一眼）",
					"今天也一起呢，真好 ✨",
					"（用尾巴轻轻戳了戳你）",
					"不打扰你，就是想冒个泡 🫧"
				]
			},
			menu: {
				feed: "🐟 投喂小鱼干",
				headpat: "✨ 摸摸头",
				soundOn: "🔊 音效: 开",
				soundOff: "🔇 音效: 关",
				hide: "🙈 隐藏到右下角",
				more: "⚙ 更多设置…",
				copyError: "📋 复制错误信息"
			},
			panel: {
				title: "更多设置",
				appearance: "外观",
				behavior: "行为",
				stats: "陪伴记录",
				statsCompleted: (n) => `🏆 已完成回合：${n}`,
				statsInteractions: (n) => `💬 亲密互动：${n} 次`,
				statsErrors: (n) => `🛠 遇到异常：${n} 次`,
				statsDays: (n) => `📅 共同陪伴：${n} 天`,
				statsBond: (name, pct) => pct < 0 ? `💞 关系：${name}（满）` : `💞 关系：${name}（下一档 ${pct}%）`,
				size: (name) => `📐 大小：${name}`,
				sizeNames: [
					"小",
					"标准",
					"大",
					"特大"
				],
				rest: "休息",
				pretend: "💼 假装工作",
				thinkTicker: "🧠 思考链",
				swim: "🏊 游泳",
				volume: (name) => `🔊 音量：${name}`,
				volumeOff: "静音",
				volumeNames: [
					"小",
					"中",
					"大"
				],
				followAll: "🫧 跟随所有会话",
				notify: "🔔 完成提醒",
				sysNotify: "📢 系统通知",
				sedentary: (min) => min === 0 ? "⏰ 久坐提醒：关" : `⏰ 久坐提醒：${min} 分钟`,
				schedule: "🕐 定时隐藏",
				in1h: "1 小时后隐藏",
				daily: "每晚 22:00 隐藏",
				cancelSchedule: "取消定时隐藏",
				hide: "🙈 隐藏到右下角",
				close: "⏹ 关闭桌宠",
				back: "← 返回"
			},
			palette: {
				terracotta: "陶土",
				ocean: "深海蓝",
				matcha: "抹茶绿",
				sakura: "樱粉",
				ink: "墨灰",
				night: "夜黑",
				"theme-blue": "主题蓝"
			},
			feedback: {
				squish: "戳一戳，心情 +1 ✨",
				roll: "翻个 360° 跟头给你看！(≧∇≦)ﾉ ✨",
				feed: "嚼嚼嚼... 获得小鱼干能量！美味~ 🐟",
				patted: [
					"被摸摸头啦~ 暖洋洋的超开心 🥰",
					"呼噜呼噜... 再摸一下嘛 (´▽`)",
					"头顶暖暖的，眼睛都睁不开了~ 💤",
					"嘿嘿，被摸得好舒服 💖"
				],
				patTooFast: [
					"再摸就秃头了！😤",
					"头顶都要搓冒烟了，不给摸了！🔥",
					"哼，手这么重，我游远点 😤"
				],
				paletteApplied: (name) => `换上新皮肤「${name}」~ 🎨`,
				pretendOn: "进入假装工作模式，开始表演敲代码 ⌨️💼",
				pretendOff: "下班！恢复真实状态~",
				tickerOn: "思考链已开启：思考时会在我头顶滚动 🧠",
				tickerOff: "思考链已关闭~",
				hidden: "我先藏到右下角啦，想我随时点 🐳",
				shown: "回来啦！想我了没~ 🐳",
				schedule1h: "好~ 1 小时后我会自己藏到右下角 🐳",
				scheduleDaily: "记下啦：每天 22:00 自动藏到右下角 🌙",
				scheduleCancel: "定时隐藏已取消~",
				errorCopied: "错误信息已复制到剪贴板，快去找主人帮忙 📋",
				wake: "醒啦！随时准备开工~ ✨",
				sleep: "呼噜噜... 正在做深海美梦 (Zzz) 💤",
				avoid: "让一让~ 这里交给你啦 ✨",
				swim: [
					"游一游，活动一下~ 🐳",
					"换个角度看主人 ✨",
					"咕噜噜... 巡视领地中 🌊",
					"深潜探索一下海底世界~ 🫧",
					"摇摇尾巴，优雅地划水中 🐋"
				],
				swimOn: "游泳模式已开启，我会自己到处游啦 🐳🌊",
				swimOff: "游泳模式已关闭，我乖乖待命~",
				followAllOn: "别的会话有动静我也会告诉你~",
				followAllOff: "好，我只盯着眼前这个会话~",
				joy: [
					"嘻嘻，最喜欢主人啦~ 🥰",
					"好开心！能量充满啦~ ✨",
					"冒个爱心泡泡送给你 💖",
					"摇摇尾巴，心情极佳 🐋"
				],
				pokeDizzy: [
					"哎呀，轻轻戳嘛，有点小晕乎 @-@",
					"晕头转向了... 别戳太用力呀 🥺",
					"晃晃脑袋，差点被戳倒啦 ~"
				],
				pokeAnnoyed: [
					"喂喂喂，戳上瘾啦？(￣▽￣)\"",
					"再戳我就要游走咯 ~",
					"好啦好啦，知道你在了 🐳",
					"肚皮都要被戳凹了啦 >_<"
				],
				pokeSulk: [
					"哼，不理你了 (￣ε(#￣)",
					"鲸鱼罢工中，请稍后再试 💤",
					"生气了！要哄哄才理你 (｀へ´)"
				],
				comfort: [
					"呜... 谢谢你还在 (´;ω;`)",
					"被摸了摸头，好像又有力气了 ✨",
					"有你在就没关系啦，再来一次！🐋"
				],
				shaken: [
					"呜哇——太晕了！别甩啦 @_@",
					"天旋地转... 我要吐泡泡了 🫧",
					"停停停！海水都被你搅浑啦 >_<",
					"眼冒金星... 让我缓缓 (@_@;)"
				],
				bellyUp: [
					"翻个肚皮给你看~ 只对你哦 ♡",
					"哗啦——肚皮朝天，最舒服的姿势 (´∀｀)",
					"晒肚皮时间！别戳痒痒肉 🐳",
					"完全放松状态，可以随便摸 ✨"
				],
				dragIdle: [
					"举着不动... 手不酸吗 (・_・)",
					"要放我下来了吗，还是继续举着 ~",
					"悬在半空有点没安全感呀 🥺",
					"喂——还在吗？我还挂着呢 🐋"
				],
				squeezed: [
					"挤挤挤... 贴在墙上啦 >_<",
					"这边到头咯，再推就扁了 🫠",
					"呜，脸被压平了 (＞﹏＜)"
				],
				squashedTop: ["咚！撞到天花板了 >_<", "头顶被压扁啦，再按就成饼了 🫠"],
				squashedBottom: ["被按在海底了... 扁扁的 (＞﹏＜)", "压、压成鲸鱼饼了 🫓"],
				sizeSet: (name) => `变成${name}号啦~ 合适吗 🐳`,
				notifyOn: "好耶！你不在的时候我会在标签页上喊你 🔔",
				notifyOff: "不喊你了，安安静静的 🤫",
				sysNotifyOn: "系统通知已开启，跑到别的窗口也能收到 📢",
				sysNotifyOff: "系统通知已关闭 🔕",
				sysNotifyDenied: "浏览器不让我发通知，去地址栏左边的锁里放行一下 🥺",
				sedentarySet: (min) => `好，坐满 ${min} 分钟我就浮上来提醒你 ⏰`,
				sedentaryOff: "久坐提醒关掉啦，你随意 ~",
				restNudge: [
					"坐好久啦，起来动动肩膀吧 🐳",
					"喝口水？我陪你歇一会儿 ☕",
					"眼睛也要休息的，看看远处吧 ✨",
					"深海也需要浮上来换气呀，你也是 🫧"
				]
			},
			multi: {
				badge: (n) => `另外 ${n} 个会话正在跑`,
				doneOther: (title) => title === "" ? "另一个会话跑完啦 ✅" : `「${title}」那边跑完啦 ✅`,
				waitingOther: (title) => title === "" ? "另一个会话在等你确认 👀" : `「${title}」在等你确认 👀`,
				parallel: (n) => [`${n} 个会话一起跑，全速并发推进中！🌊`, `左鳍一个右鳍一个，${n} 路并发开工~ 💨`],
				overtime: (n) => [`${n} 个会话同时开工……这就是加班吗 😵`, `${n} 路并发？！以后再也不想加班了 😭`],
				allDone: ["好累啊……终于全部搞定了 🫠", "呼——全部收工！让我瘫一会儿 💦"]
			},
			notify: {
				titleDone: "完成了",
				bodyDone: "这一轮跑完啦，回来看看吧"
			},
			aria: {
				pet: "桌宠小鲸鱼",
				mini: "显示桌宠小鲸鱼",
				miniTitle: (state) => `桌宠小鲸鱼（${state}）· 点我召回，可拖拽移动`
			}
		};
		const en = {
			status: {
				idle: [
					"Whale on standby~ Click me for a poke! 🐳",
					"Any new code tasks today? ✨",
					"Wagging my tail, ready to go!"
				],
				think: [
					"Diving deep into the knowledge base... 🌊",
					"Thinking through the architecture...",
					"Blub blub... exploring the deep sea of answers"
				],
				working: [
					"Typing code seriously! ⚡",
					"Clack clack, almost done~ ⌨️",
					"Calling agent tools to get things done!"
				],
				celebrate: [
					"Yay! Task completed~ 🎉",
					"All tests green, perfect delivery! ✨",
					"Bubbling with joy, check it out~"
				],
				error: [
					"Oops, something went wrong 🥺",
					"Caught an exception, trying to self-heal...",
					"Wahh, I hit a snag >_<"
				],
				wait: [
					"Hey, I need your confirmation here 🙋",
					"Waiting for your call—I will hold right here~",
					"Please take a look before I continue ✋"
				],
				disappointed: [
					"Aww... that did not go well, feeling a bit down 🥺",
					"Failure is the mother of success, give me a moment~",
					"I will do better next time..."
				]
			},
			bond: {
				tierName: [
					"Acquainted",
					"Close",
					"Inseparable"
				],
				levelUp: [
					"",
					"I think... we are getting close 🐋✨",
					"I cannot do without you now. Do not leave me (´∀｀)♡"
				],
				poke: [
					[
						"Bloop.",
						"...(tilts head at you)",
						"Mm. That tickles.",
						"(shuffles aside a little)"
					],
					[
						"Glub glub~ You poked my soft belly!",
						"That tickles~ haha (≧▽≦)",
						"Whale energy +10! Keep it up~",
						"Splashing my tail, feeling great ✨"
					],
					[
						"Poking me again~ I knew you could not sit still (´∀｀)",
						"Hehe, you came to play with me today too ♡",
						"Keep going, I really do not mind 🐳",
						"(rolls over to offer you the belly)"
					]
				],
				welcome: [
					"Hello. I am the whale who lives here 🐋",
					"Welcome back! Let us do our best today! 🐳✨",
					"You are here! I have been waiting 🐳✨"
				],
				chatter: [
					"Heh, I am right here 🐳",
					"(sneaks a glance at you)",
					"Together again today. Nice ✨",
					"(pokes you gently with the tail)",
					"Not interrupting, just saying hi 🫧"
				]
			},
			menu: {
				feed: "🐟 Feed fish snack",
				headpat: "✨ Headpat",
				soundOn: "🔊 Sound: On",
				soundOff: "🔇 Sound: Off",
				hide: "🙈 Hide to corner",
				more: "⚙ More settings…",
				copyError: "📋 Copy error"
			},
			panel: {
				title: "More Settings",
				appearance: "Appearance",
				behavior: "Behavior",
				stats: "Companion Stats",
				statsCompleted: (n) => `🏆 Completed Turns: ${n}`,
				statsInteractions: (n) => `💬 Interactions: ${n}`,
				statsErrors: (n) => `🛠 Errors Encountered: ${n}`,
				statsDays: (n) => `📅 Days Together: ${n} d`,
				statsBond: (name, pct) => pct < 0 ? `💞 Bond: ${name} (max)` : `💞 Bond: ${name} (next ${pct}%)`,
				size: (name) => `📐 Size: ${name}`,
				sizeNames: [
					"Small",
					"Standard",
					"Large",
					"Huge"
				],
				rest: "Rest",
				pretend: "💼 Pretend to work",
				thinkTicker: "🧠 Think ticker",
				swim: "🏊 Swimming",
				volume: (name) => `🔊 Volume: ${name}`,
				volumeOff: "Muted",
				volumeNames: [
					"Low",
					"Medium",
					"High"
				],
				followAll: "🫧 Follow all sessions",
				notify: "🔔 Finish alert",
				sysNotify: "📢 System notification",
				sedentary: (min) => min === 0 ? "⏰ Break reminder: off" : `⏰ Break reminder: ${min} min`,
				schedule: "🕐 Auto-hide",
				in1h: "Hide in 1 hour",
				daily: "Hide every day at 22:00",
				cancelSchedule: "Cancel auto-hide",
				hide: "🙈 Hide to corner",
				close: "⏹ Close pet",
				back: "← Back"
			},
			palette: {
				terracotta: "Terracotta",
				ocean: "Ocean Blue",
				matcha: "Matcha Green",
				sakura: "Sakura Pink",
				ink: "Ink Gray",
				night: "Night Black",
				"theme-blue": "Theme Blue"
			},
			feedback: {
				squish: "Poke! Mood +1 ✨",
				roll: "A 360° flip just for you! (≧∇≦)ﾉ ✨",
				feed: "Munch munch... fish snack energy! Yummy~ 🐟",
				patted: [
					"Headpat received~ warm and happy 🥰",
					"Mmm... one more pat, please (´▽`)",
					"So cozy up here, my eyes are closing~ 💤",
					"Hehe, that feels so nice 💖"
				],
				patTooFast: [
					"Any more and I go bald! 😤",
					"My head is about to smoke. No more pats! 🔥",
					"Hmph, too rough. I am swimming away 😤"
				],
				paletteApplied: (name) => `New skin applied: ${name}~ 🎨`,
				pretendOn: "Entering pretend-work mode, time to type ⌨️💼",
				pretendOff: "Off duty! Back to real state~",
				tickerOn: "Think ticker enabled: thoughts will scroll above me 🧠",
				tickerOff: "Think ticker disabled~",
				hidden: "I will hide in the corner. Call me anytime 🐳",
				shown: "Back again! Missed me~ 🐳",
				schedule1h: "Okay~ I will hide in the corner in 1 hour 🐳",
				scheduleDaily: "Got it: I will auto-hide at 22:00 every day 🌙",
				scheduleCancel: "Auto-hide cancelled~",
				errorCopied: "Error copied to clipboard, go ask for help 📋",
				wake: "Awake! Ready to work~ ✨",
				sleep: "Zzz... dreaming in the deep sea (Zzz) 💤",
				avoid: "Let me make room for you~ ✨",
				swim: [
					"Swimming around a bit~ 🐳",
					"Looking at you from another angle ✨",
					"Blub blub... patrolling my territory 🌊",
					"Diving deep to explore the seabed~ 🫧",
					"Wagging my tail, gliding smoothly 🐋"
				],
				swimOn: "Swimming mode on: I will roam around by myself 🐳🌊",
				swimOff: "Swimming mode off: I will stay put~",
				followAllOn: "I will keep an eye on your other sessions too~",
				followAllOff: "Got it, just this session~",
				joy: [
					"Hehe, love you the most! 🥰",
					"So happy! Energy fully restored~ ✨",
					"A heart bubble just for you 💖",
					"Wagging my tail with joy 🐋"
				],
				pokeDizzy: [
					"Woah, gentle please! Feeling a bit dizzy @-@",
					"Spinning around... don't poke too hard 🥺",
					"Shaking my head, almost fell over~"
				],
				pokeAnnoyed: [
					"Hey, hooked on poking me? (￣▽￣)\"",
					"Poke again and I am swimming away~",
					"Alright alright, I know you are there 🐳",
					"My belly is getting dented >_<"
				],
				pokeSulk: [
					"Hmph. Not talking to you (￣ε(#￣)",
					"Whale on strike. Try again later 💤",
					"Now I am upset! Cheer me up first (｀へ´)"
				],
				comfort: [
					"Sniff... thanks for staying (´;ω;`)",
					"That head pat helped. I feel better ✨",
					"With you here it is fine. Let us try again! 🐋"
				],
				shaken: [
					"Whoaa - too dizzy! Stop shaking me @_@",
					"The room is spinning... I might blow bubbles 🫧",
					"Stop stop stop! You stirred up the whole sea >_<",
					"Seeing stars... give me a second (@_@;)"
				],
				bellyUp: [
					"Belly up, just for you ♡",
					"Whoosh - belly to the sky, the comfiest pose (´∀｀)",
					"Belly sunbathing time! Mind the ticklish spot 🐳",
					"Fully relaxed. Pet away ✨"
				],
				dragIdle: [
					"Still holding me up... arm not tired? (・_・)",
					"Are you putting me down, or is this the new normal~",
					"Dangling in midair feels a bit unsafe 🥺",
					"Helloo - still there? I am still hanging here 🐋"
				],
				squeezed: [
					"Squish... pressed against the wall >_<",
					"That is the edge. Push more and I go flat 🫠",
					"Ow, my face is flattened (＞﹏＜)"
				],
				squashedTop: ["Bonk! Hit the ceiling >_<", "My head got flattened. Any more and I am a pancake 🫠"],
				squashedBottom: ["Pinned to the seabed... so flat (＞﹏＜)", "Squashed into a whale pancake 🫓"],
				sizeSet: (name) => `Now I am ${name} size~ Does it fit? 🐳`,
				notifyOn: "Got it! I will shout from the tab title while you are away 🔔",
				notifyOff: "Staying quiet now 🤫",
				sysNotifyOn: "System notifications on — you will hear me from any window 📢",
				sysNotifyOff: "System notifications off 🔕",
				sysNotifyDenied: "The browser blocked notifications. Allow them from the lock icon 🥺",
				sedentarySet: (min) => `Alright, I will surface after ${min} minutes of sitting ⏰`,
				sedentaryOff: "Break reminder off. Do your thing~",
				restNudge: [
					"You have been sitting a while. Roll those shoulders 🐳",
					"Water break? I will rest with you ☕",
					"Eyes need rest too — look at something far away ✨",
					"Even the deep sea surfaces to breathe. So should you 🫧"
				]
			},
			multi: {
				badge: (n) => `${n} other session${n === 1 ? "" : "s"} running`,
				doneOther: (title) => title === "" ? "Another session just finished ✅" : `"${title}" just finished ✅`,
				waitingOther: (title) => title === "" ? "Another session needs your confirmation 👀" : `"${title}" needs your confirmation 👀`,
				parallel: (n) => [`${n} sessions at once — full-speed parallel push! 🌊`, `One per fin: ${n} running in parallel~ 💨`],
				overtime: (n) => [`${n} sessions at once... is this what overtime feels like 😵`, `${n} in parallel?! No more overtime, ever 😭`],
				allDone: ["So tired... finally got every last one done 🫠", "Phew — all wrapped up! Let me flop for a bit 💦"]
			},
			notify: {
				titleDone: "Done",
				bodyDone: "This round finished. Come take a look"
			},
			aria: {
				pet: "Desktop pet whale",
				mini: "Show desktop pet whale",
				miniTitle: (state) => `Desktop whale (${state}) · Click to recall, draggable`
			}
		};
		/** 根据浏览器语言返回支持的语言，未命中默认 zh。 */
		function detectBrowserLocale() {
			if (typeof navigator === "undefined") return "zh";
			for (const tag of [...navigator.languages ?? [], navigator.language]) {
				const primary = String(tag ?? "").toLowerCase().split("-")[0];
				if (primary === "en") return "en";
				if (primary === "zh") return "zh";
			}
			return "zh";
		}
		function getStrings(locale) {
			return locale === "en" ? en : zh;
		}
		function paletteName(locale, id, fallback) {
			return getStrings(locale).palette[id] ?? fallback;
		}
		//#endregion
		//#region src/client/swim.ts
		const SWIM_STORAGE_KEY = "pet-whale:swim";
		const pick$1 = (list) => list[Math.floor(Math.random() * list.length)];
		const MAX_PARTICLES = 40;
		/** 获取或创建独立的全屏固定粒子层（挂在 body 下，避免随鲸鱼 root 位移） */
		function getOrCreateParticleLayer() {
			if (typeof document === "undefined") return null;
			let layer = document.querySelector("[data-dsh-whale-particles]");
			if (!layer) {
				layer = document.createElement("div");
				layer.setAttribute("data-dsh-whale-particles", "");
				layer.className = "pw-particle-layer";
				document.body.appendChild(layer);
			}
			return layer;
		}
		var WhaleSwimmer = class {
			ctx;
			enabled = false;
			rafId = 0;
			timerId;
			isSwimming = false;
			facing = "left";
			currentPos = {
				x: 0,
				y: 0
			};
			startPos = {
				x: 0,
				y: 0
			};
			targetPos = {
				x: 0,
				y: 0
			};
			cp1 = {
				x: 0,
				y: 0
			};
			cp2 = {
				x: 0,
				y: 0
			};
			startTime = 0;
			duration = 2400;
			currentMode = "cruise";
			particles = [];
			lastBubbleTime = 0;
			lastRippleTime = 0;
			lastStreamBubbleTime = 0;
			hasSplashedThisSession = false;
			constructor(ctx) {
				this.ctx = ctx;
				this.ctx.root.dataset.facing = this.facing;
				this.loadState();
			}
			get isEnabled() {
				return this.enabled;
			}
			setEnabled(value) {
				if (this.enabled === value) return;
				this.enabled = value;
				this.saveState();
				if (this.enabled) this.scheduleNext(1200);
				else this.stop();
			}
			toggle() {
				this.setEnabled(!this.enabled);
				return this.enabled;
			}
			get currentFacing() {
				return this.facing;
			}
			setFacing(f) {
				this.facing = f;
				this.ctx.root.dataset.facing = f;
				this.ctx.pet.style.transform = `scaleX(${f === "left" ? 1 : -1}) rotate(0deg)`;
			}
			loadState() {
				try {
					this.enabled = localStorage.getItem(SWIM_STORAGE_KEY) === "1";
				} catch {
					this.enabled = false;
				}
			}
			saveState() {
				try {
					localStorage.setItem(SWIM_STORAGE_KEY, this.enabled ? "1" : "0");
				} catch {}
			}
			/** agent 状态切换通知 */
			onStateChange(state) {
				if (state !== "idle") this.stop();
				else if (this.enabled) this.scheduleNext(2e3 + Math.random() * 2e3);
			}
			/** 用户开始拖拽/点击交互时立即中断游泳 */
			/** 被甩晕之后游不直，到这个时刻为止 */
			woozyUntil = 0;
			/** 晕了多久：期间的航迹会明显更歪 */
			setWoozy(ms) {
				this.woozyUntil = (typeof performance !== "undefined" ? performance.now() : Date.now()) + ms;
			}
			get isWoozy() {
				return (typeof performance !== "undefined" ? performance.now() : Date.now()) < this.woozyUntil;
			}
			interrupt() {
				this.stop();
				if (this.enabled) this.scheduleNext(5e3 + Math.random() * 3e3);
			}
			/** 停止当前正在进行的游泳与计时器，平稳复位 */
			stop() {
				if (this.rafId !== 0) {
					window.cancelAnimationFrame(this.rafId);
					this.rafId = 0;
				}
				if (this.timerId !== void 0) {
					window.clearTimeout(this.timerId);
					this.timerId = void 0;
				}
				this.clearParticles();
				if (this.isSwimming) {
					this.isSwimming = false;
					this.ctx.root.classList.remove("swimming");
					this.ctx.pet.classList.remove("swimming", "swimming-dive");
					this.ctx.root.dataset.facing = this.facing;
					this.ctx.pet.style.transform = `scaleX(${this.facing === "left" ? 1 : -1}) rotate(0deg)`;
					this.ctx.savePos();
				}
			}
			/** 调度下一次游泳 */
			scheduleNext(delay) {
				if (this.timerId !== void 0) {
					window.clearTimeout(this.timerId);
					this.timerId = void 0;
				}
				if (!this.enabled) return;
				const wait = delay ?? 3e3 + Math.random() * 3500;
				this.timerId = window.setTimeout(() => {
					this.timerId = void 0;
					if (!this.enabled) return;
					if (this.prefersReducedMotion()) {
						this.scheduleNext(6e3);
						return;
					}
					if (this.ctx.isBusy()) {
						this.scheduleNext(1500);
						return;
					}
					this.startSwimSession();
				}, wait);
			}
			prefersReducedMotion() {
				if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
				return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			}
			/** 启动一次自然游动或深潜 */
			startSwimSession() {
				this.stop();
				this.ctx.root.style.transition = "";
				const curX = parseFloat(this.ctx.root.style.left) || 0;
				const curY = parseFloat(this.ctx.root.style.top) || 0;
				this.startPos = {
					x: curX,
					y: curY
				};
				this.currentPos = {
					x: curX,
					y: curY
				};
				this.currentMode = Math.random() < .22 ? "dive" : "cruise";
				const { target, cp1, cp2, duration } = this.planTrajectory(this.startPos, this.currentMode);
				this.targetPos = target;
				this.cp1 = cp1;
				this.cp2 = cp2;
				this.duration = duration;
				this.startTime = performance.now();
				this.lastBubbleTime = this.startTime;
				this.lastRippleTime = this.startTime;
				this.lastStreamBubbleTime = this.startTime;
				this.hasSplashedThisSession = false;
				this.isSwimming = true;
				this.ctx.root.classList.add("swimming");
				this.ctx.pet.classList.add("swimming");
				if (this.currentMode === "dive") this.ctx.pet.classList.add("swimming-dive");
				if (Math.random() < .3) {
					const strings = this.ctx.getStrings();
					this.ctx.showDialog(pick$1(strings.feedback.swim));
				}
				this.rafId = window.requestAnimationFrame(this.step);
			}
			/** 规划贝塞尔曲线航迹 */
			planTrajectory(start, mode) {
				const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
				const vh = typeof window !== "undefined" ? window.innerHeight : 900;
				const dist = mode === "dive" ? 100 + Math.random() * 120 : 140 + Math.random() * 180;
				const cx = vw / 2;
				const cy = vh / 2;
				const toCenterAngle = Math.atan2(cy - start.y, cx - start.x);
				const wobble = this.isWoozy ? 2.2 : 1;
				const angle = toCenterAngle + (Math.random() * 1.8 - .9) * wobble;
				const rawTx = start.x + Math.cos(angle) * dist;
				const rawTy = start.y + Math.sin(angle) * dist + (mode === "dive" ? 30 + Math.random() * 40 : 0);
				const target = this.ctx.clampPos(rawTx, rawTy);
				const dx = target.x - start.x;
				const dy = target.y - start.y;
				const actualDist = Math.hypot(dx, dy) || 1;
				const nx = -dy / actualDist;
				const ny = dx / actualDist;
				const curveAmp = (mode === "dive" ? 45 : 30 + Math.random() * 35) * (Math.random() < .5 ? 1 : -1) * wobble;
				let cp1;
				let cp2;
				if (mode === "dive") {
					cp1 = {
						x: start.x + dx * .3 + nx * curveAmp * .5,
						y: start.y + dy * .2 + 55
					};
					cp2 = {
						x: start.x + dx * .7 + nx * curveAmp * .5,
						y: start.y + dy * .8 + 45
					};
				} else {
					cp1 = {
						x: start.x + dx * .33 + nx * curveAmp,
						y: start.y + dy * .33 + ny * curveAmp
					};
					cp2 = {
						x: start.x + dx * .67 + nx * curveAmp * .6,
						y: start.y + dy * .67 + ny * curveAmp * .6
					};
				}
				const duration = Math.max(1600, Math.min(3600, actualDist * 14 + (mode === "dive" ? 600 : 0)));
				return {
					target,
					cp1,
					cp2,
					duration
				};
			}
			/** 产生尾部扩散水纹圈（挂在全局粒子层，视口绝对坐标，留出自然拖尾） */
			spawnWaterRipple(x, y, isDive = false) {
				if (typeof document === "undefined" || this.prefersReducedMotion()) return;
				const layer = getOrCreateParticleLayer();
				if (!layer) return;
				const ripple = document.createElement("span");
				ripple.className = "pw-water-ripple";
				ripple.style.left = `${x}px`;
				ripple.style.top = `${y}px`;
				if (isDive) {
					ripple.style.width = "52px";
					ripple.style.height = "32px";
				} else {
					ripple.style.width = "38px";
					ripple.style.height = "24px";
				}
				layer.appendChild(ripple);
				this.addParticle(ripple);
			}
			/** 产生游动流线微水泡（挂在全局粒子层，自然随洋流向上/向后漂移） */
			spawnStreamBubble(x, y, isDive = false) {
				if (typeof document === "undefined" || this.prefersReducedMotion()) return;
				const layer = getOrCreateParticleLayer();
				if (!layer) return;
				const bubble = document.createElement("span");
				bubble.className = "pw-stream-bubble";
				const size = isDive ? 5 + Math.random() * 5 : 3.5 + Math.random() * 4;
				const dx = (this.facing === "left" ? 1 : -1) * (10 + Math.random() * 16);
				const dy = -(14 + Math.random() * 22);
				const dur = .9 + Math.random() * .45;
				bubble.style.left = `${x + (Math.random() * 12 - 6)}px`;
				bubble.style.top = `${y + (Math.random() * 10 - 5)}px`;
				bubble.style.width = `${size.toFixed(1)}px`;
				bubble.style.height = `${size.toFixed(1)}px`;
				bubble.style.setProperty("--pw-b-dx", `${dx.toFixed(1)}px`);
				bubble.style.setProperty("--pw-b-dy", `${dy.toFixed(1)}px`);
				bubble.style.setProperty("--pw-b-dur", `${dur.toFixed(2)}s`);
				layer.appendChild(bubble);
				this.addParticle(bubble);
			}
			/** 产生破浪出水/翻滚飞溅微水花 */
			spawnSplash(x, y, count = 5) {
				if (typeof document === "undefined" || this.prefersReducedMotion()) return;
				const layer = getOrCreateParticleLayer();
				if (!layer) return;
				for (let i = 0; i < count; i++) {
					const drop = document.createElement("span");
					drop.className = "pw-splash-drop";
					const size = 3 + Math.random() * 3.5;
					const dx = Math.random() * 36 - 18;
					const dy = -(18 + Math.random() * 26);
					const dur = .5 + Math.random() * .25;
					drop.style.left = `${x + (Math.random() * 14 - 7)}px`;
					drop.style.top = `${y}px`;
					drop.style.width = `${size.toFixed(1)}px`;
					drop.style.height = `${size.toFixed(1)}px`;
					drop.style.setProperty("--pw-sp-dx", `${dx.toFixed(1)}px`);
					drop.style.setProperty("--pw-sp-dy", `${dy.toFixed(1)}px`);
					drop.style.setProperty("--pw-sp-dur", `${dur.toFixed(2)}s`);
					layer.appendChild(drop);
					this.addParticle(drop);
				}
			}
			/** 产生悬空拖拽水滴下坠 */
			spawnDrip(x, y) {
				if (typeof document === "undefined" || this.prefersReducedMotion()) return;
				const layer = getOrCreateParticleLayer();
				if (!layer) return;
				const drip = document.createElement("span");
				drip.className = "pw-drag-drip";
				drip.style.left = `${x + (Math.random() * 10 - 5)}px`;
				drip.style.top = `${y}px`;
				drip.style.width = "4px";
				drip.style.height = "6.5px";
				layer.appendChild(drip);
				this.addParticle(drip);
			}
			/** 产生庆祝彩色纸屑粒子 */
			spawnConfetti(x, y, count = 18) {
				if (typeof document === "undefined" || this.prefersReducedMotion()) return;
				const layer = getOrCreateParticleLayer();
				if (!layer) return;
				const colors = [
					"#4D6BFE",
					"#8FB5FF",
					"#3BC46D",
					"#FFD15C",
					"#F0A0A0",
					"#B388FF",
					"#FF9F43"
				];
				for (let i = 0; i < count; i++) {
					const el = document.createElement("span");
					el.className = "pw-confetti";
					const w = 4.5 + Math.random() * 4;
					const h = 6 + Math.random() * 5;
					const color = pick$1(colors);
					const dx = Math.random() * 100 - 50;
					const dy = -(40 + Math.random() * 50);
					const dur = .95 + Math.random() * .35;
					el.style.left = `${x + (Math.random() * 16 - 8)}px`;
					el.style.top = `${y + (Math.random() * 8 - 4)}px`;
					el.style.setProperty("--pw-cf-w", `${w.toFixed(1)}px`);
					el.style.setProperty("--pw-cf-h", `${h.toFixed(1)}px`);
					el.style.setProperty("--pw-cf-bg", color);
					el.style.setProperty("--pw-cf-dx", `${dx.toFixed(1)}px`);
					el.style.setProperty("--pw-cf-dy", `${(Math.abs(dy) + 90 + Math.random() * 40).toFixed(1)}px`);
					el.style.setProperty("--pw-cf-dur", `${dur.toFixed(2)}s`);
					layer.appendChild(el);
					this.addParticle(el);
				}
			}
			addParticle(el) {
				this.particles.push(el);
				el.addEventListener("animationend", () => {
					this.removeParticle(el);
				}, { once: true });
				if (this.particles.length > MAX_PARTICLES) this.particles.shift()?.remove();
			}
			removeParticle(el) {
				const idx = this.particles.indexOf(el);
				if (idx !== -1) this.particles.splice(idx, 1);
				el.remove();
			}
			clearParticles() {
				for (const p of this.particles) p.remove();
				this.particles = [];
			}
			/** 动画帧主循环 */
			step = (now) => {
				if (!this.isSwimming) return;
				if (this.ctx.isBusy()) {
					this.stop();
					this.scheduleNext(2e3);
					return;
				}
				const elapsed = now - this.startTime;
				const progress = Math.min(1, elapsed / this.duration);
				const u = progress < .5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
				const u1 = 1 - u;
				const curX = u1 * u1 * u1 * this.startPos.x + 3 * u1 * u1 * u * this.cp1.x + 3 * u1 * u * u * this.cp2.x + u * u * u * this.targetPos.x;
				const curY = u1 * u1 * u1 * this.startPos.y + 3 * u1 * u1 * u * this.cp1.y + 3 * u1 * u * u * this.cp2.y + u * u * u * this.targetPos.y;
				const dX = 3 * u1 * u1 * (this.cp1.x - this.startPos.x) + 6 * u1 * u * (this.cp2.x - this.cp1.x) + 3 * u * u * (this.targetPos.x - this.cp2.x);
				const dY = 3 * u1 * u1 * (this.cp1.y - this.startPos.y) + 6 * u1 * u * (this.cp2.y - this.cp1.y) + 3 * u * u * (this.targetPos.y - this.cp2.y);
				if (Math.abs(dX) > .8) {
					const nextFacing = dX > 0 ? "right" : "left";
					if (this.facing !== nextFacing) {
						this.facing = nextFacing;
						this.ctx.root.dataset.facing = this.facing;
					}
				}
				const normalizedVy = dY / (Math.hypot(dX, dY) || 1);
				const maxPitch = this.currentMode === "dive" ? 24 : 14;
				let pitchDeg = 0;
				if (this.facing === "right") pitchDeg = Math.max(-maxPitch, Math.min(maxPitch, normalizedVy * maxPitch));
				else pitchDeg = Math.max(-maxPitch, Math.min(maxPitch, -normalizedVy * maxPitch));
				const wiggle = Math.sin(progress * Math.PI * 6) * (1 - progress * .4) * 2.2;
				pitchDeg += wiggle;
				let scaleDepth = 1;
				let depthOpacity = 1;
				const isDive = this.currentMode === "dive";
				if (isDive) {
					const diveArc = Math.sin(progress * Math.PI);
					scaleDepth = 1 - diveArc * .12;
					depthOpacity = 1 - diveArc * .22;
					if (progress > .72 && progress < .85 && !this.hasSplashedThisSession) {
						this.hasSplashedThisSession = true;
						const sz = this.ctx.petSize();
						this.spawnSplash(curX + sz.w / 2, curY + sz.h * .6, 5);
						this.spawnWaterRipple(curX + sz.w / 2, curY + sz.h * .6, true);
					}
				}
				const scaleX = (this.facing === "left" ? 1 : -1) * scaleDepth;
				const scaleY = scaleDepth;
				this.ctx.root.style.left = `${curX}px`;
				this.ctx.root.style.top = `${curY}px`;
				this.ctx.pet.style.transform = `scale(${scaleX}, ${scaleY}) rotate(${pitchDeg.toFixed(2)}deg)`;
				this.ctx.pet.style.opacity = `${depthOpacity.toFixed(3)}`;
				const tailX = this.facing === "left" ? curX + 112 : curX + 25;
				const tailY = curY + 52;
				const rippleGap = isDive ? 220 : 300;
				if (now - this.lastRippleTime > rippleGap && progress > .08 && progress < .92) {
					this.lastRippleTime = now;
					this.spawnWaterRipple(tailX, tailY, isDive);
				}
				const streamGap = isDive ? 140 : 200;
				if (now - this.lastStreamBubbleTime > streamGap && progress > .05 && progress < .95) {
					this.lastStreamBubbleTime = now;
					this.spawnStreamBubble(tailX, tailY, isDive);
				}
				if (now - this.lastBubbleTime > (isDive ? 260 : 500)) {
					this.lastBubbleTime = now;
					this.ctx.popBubble();
				}
				if (progress < 1) this.rafId = window.requestAnimationFrame(this.step);
				else {
					this.rafId = 0;
					this.isSwimming = false;
					this.ctx.root.classList.remove("swimming");
					this.ctx.pet.classList.remove("swimming", "swimming-dive");
					this.ctx.root.dataset.facing = this.facing;
					this.ctx.pet.style.opacity = "1";
					this.ctx.pet.style.transform = `scaleX(${this.facing === "left" ? 1 : -1}) rotate(0deg)`;
					this.ctx.savePos();
					this.scheduleNext();
				}
			};
			/** 完全清理 */
			dispose() {
				this.stop();
				if (typeof document !== "undefined") document.querySelector("[data-dsh-whale-particles]")?.remove();
			}
		};
		//#endregion
		//#region src/client/index.ts
		const inject = [
			"sessions",
			"locale",
			"uiConversation",
			"uiSession"
		];
		const STATES = [
			"idle",
			"think",
			"working",
			"celebrate",
			"error",
			"wait",
			"disappointed"
		];
		const POS_KEY = "pet-whale:pos";
		/** 隐藏状态：'1' 表示隐藏到右下角小按钮 */
		const HIDDEN_KEY = "pet-whale:hidden";
		const PRETEND_KEY = "pet-whale:pretend";
		const THINK_TICKER_KEY = "pet-whale:think-ticker";
		const MINI_POS_KEY = "pet-whale:mini-pos";
		const AUTO_HIDE_KEY = "pet-whale:auto-hide";
		/** 完成提醒：页面在后台时闪标签页标题 */
		const NOTIFY_KEY = "pet-whale:notify";
		/** 系统通知：需要浏览器授权，默认关 */
		const SYS_NOTIFY_KEY = "pet-whale:sys-notify";
		/** 久坐提醒阈值（分钟），0 表示关 */
		const SEDENTARY_KEY = "pet-whale:sedentary";
		const SEDENTARY_CHOICES = [
			0,
			45,
			60,
			90
		];
		/** 久坐计时的心跳间隔 */
		const SEDENTARY_TICK_MS = 6e4;
		/**
		* 熟悉度门槛：分数越过就进下一档。
		* 分数 = 互动次数 + 完成回合×2 + 共处天数×4——三个维度都算，
		* 免得只靠猛戳一天就刷满，"处得久"本身也该有分量。
		*/
		const BOND_THRESHOLDS = [
			0,
			80,
			400
		];
		/** 形影不离档才有的主动搭话：检查间隔，与真正开口的概率 */
		const CHATTER_TICK_MS = 45e3;
		const CHATTER_CHANCE = .18;
		/**
		* 抓住左右猛甩：靠"方向反转"计数，不看速度。
		* 一条腿走够 SHAKE_MIN_LEG 才算一次真甩动，免得手抖被当成甩；
		* 反转要挤在 SHAKE_WINDOW_MS 里，慢慢来回挪不该把它晃晕。
		*/
		const SHAKE_MIN_LEG = 26;
		const SHAKE_REVERSALS = 4;
		const SHAKE_WINDOW_MS = 1100;
		const SHAKEN_MS = 1600;
		/** 晕完还要缓一会儿，不然一路甩下去会连环触发 */
		const SHAKE_COOLDOWN_MS = 1400;
		/** 翻肚皮动画时长，与 pw-bellyUp 对齐 */
		const BELLY_UP_MS = 2e3;
		/** 拖着不放又不动多久开始不耐烦 */
		const DRAG_IDLE_MS = 2e3;
		/** 判定"贴边"的容差：拖到离边这么近就算压上去了 */
		const EDGE_SLACK = 2;
		/** 离开页面超过这么久，视为已经休息过，久坐计时清零 */
		const SEDENTARY_AWAY_RESET_MS = 6e5;
		const AUTO_HIDE_CHECK_MS = 3e4;
		/** 智能避让：只有 idle 且光标在身侧停留这么久才让开 */
		const AVOID_DWELL_MS = 900;
		const AVOID_MARGIN = 48;
		const AVOID_STEP = 120;
		/** 抓取/右键后 8 秒内不再避让，保证“想抓就能抓住” */
		const AVOID_COOLDOWN_MS = 8e3;
		const SLEEP_MS = 2e4;
		const DIALOG_MS = 2600;
		/** 自动音效最小间隔（防 think/working 抖动连响） */
		const SOUND_GAP_MS = 1200;
		const pick = (list) => list[Math.floor(Math.random() * list.length)];
		/** 跟随所有会话：别的会话在跑 / 跑完 / 等确认也让鲸鱼知道，'0' 表示只看当前会话 */
		const FOLLOW_ALL_KEY = "pet-whale:follow-all";
		/** 同时在跑的会话（含当前）到这个数就算"加班" */
		const OVERTIME_AT = 4;
		/**
		* 当前会话。0.1.5 的会话列表直接给 current；0.1.7 起导航归视图所有（列表里没有 current 了），
		* 主视图用 mainView 这个来源持有它正在显示的会话，看 retainedBy 就知道是哪个。
		*/
		function currentSessionId(list) {
			if ("current" in list) return list.current;
			const rows = list.byId ?? {};
			for (const id of Object.keys(rows)) if ((rows[id]?.retainedBy?.mainView ?? 0) > 0) return id;
		}
		function apply(ctx) {
			if (typeof document === "undefined") return () => {};
			document.querySelectorAll("[data-dsh-whale]").forEach((el) => el.remove());
			document.getElementById("pet-whale-style")?.remove();
			const style = document.createElement("style");
			style.id = "pet-whale-style";
			style.textContent = WHALE_CSS;
			document.head.appendChild(style);
			const localeService = ctx.locale;
			let locale = localeService?.getLocale().active === "en" ? "en" : detectBrowserLocale();
			let strings = getStrings(locale);
			const root = document.createElement("div");
			root.setAttribute("data-dsh-whale", "");
			root.innerHTML = `
    <span class="dsh-whale-shadow"></span>
    <span class="dsh-whale-wake"></span>
    <div class="dsh-whale-dialog"></div>
    <span class="dsh-whale-snack">🐟</span>
    <span class="dsh-whale-zzz">Zzz...</span>
    <div class="pet-official idle" role="img" aria-label="${strings.aria.pet}">${WHALE_HTML}</div>
    <span class="dsh-whale-badge" hidden></span>
    <div class="dsh-whale-menu" role="menu"></div>
  `;
			const dialog = root.querySelector(".dsh-whale-dialog");
			const badge = root.querySelector(".dsh-whale-badge");
			const snack = root.querySelector(".dsh-whale-snack");
			const pet = root.querySelector(".pet-official");
			const menu = root.querySelector(".dsh-whale-menu");
			const pupil = pet.querySelector(".pupil-highlight");
			const SCALE_KEY = "pet-whale:scale";
			/** 四档，对应 i18n 的 sizeNames */
			const SCALE_CHOICES = [
				.8,
				1,
				1.3,
				1.6
			];
			const loadScale = () => {
				try {
					const raw = Number(localStorage.getItem(SCALE_KEY));
					if (SCALE_CHOICES.includes(raw)) return raw;
				} catch {}
				return 1;
			};
			let scale = loadScale();
			const applyScale = (next) => {
				scale = next;
				root.style.setProperty("--pw-scale", String(next));
				try {
					localStorage.setItem(SCALE_KEY, String(next));
				} catch {}
				place();
				savePos();
			};
			const scaleName = () => strings.panel.sizeNames[SCALE_CHOICES.indexOf(scale)];
			/** 一倍大小时的占位，实际尺寸要乘当前缩放 */
			const BASE_W = 137;
			const BASE_H = 101;
			const PET_W = () => BASE_W * scale;
			const PET_H = () => BASE_H * scale;
			const petSize = () => ({
				w: PET_W(),
				h: PET_H()
			});
			const clampPos = (x, y) => {
				const maxX = Math.max(0, window.innerWidth - PET_W());
				const maxY = Math.max(0, window.innerHeight - PET_H());
				return {
					x: Math.min(Math.max(0, x), maxX),
					y: Math.min(Math.max(0, y), maxY)
				};
			};
			const loadPos = () => {
				try {
					const raw = localStorage.getItem(POS_KEY);
					if (raw !== null) {
						const parsed = JSON.parse(raw);
						if (typeof parsed.x === "number" && typeof parsed.y === "number") return clampPos(parsed.x, parsed.y);
					}
				} catch {}
				return clampPos(window.innerWidth - PET_W() - 16, window.innerHeight - PET_H() - 96);
			};
			const place = () => {
				const { x, y } = clampPos(parseFloat(root.style.left) || 0, parseFloat(root.style.top) || 0);
				root.style.left = `${x}px`;
				root.style.top = `${y}px`;
				return {
					x,
					y
				};
			};
			const pos = loadPos();
			root.style.left = `${pos.x}px`;
			root.style.top = `${pos.y}px`;
			document.body.appendChild(root);
			applyPalette(root, paletteOf(loadPaletteId()));
			root.style.setProperty("--pw-scale", String(scale));
			const readTheme = () => {
				const scheme = document.documentElement.style.colorScheme;
				if (scheme === "dark" || scheme === "light") return scheme;
				return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			};
			const applyTheme = () => {
				root.dataset.theme = readTheme();
			};
			const themeObserver = new MutationObserver(applyTheme);
			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["style"]
			});
			applyTheme();
			const savePos = () => {
				try {
					localStorage.setItem(POS_KEY, JSON.stringify(place()));
				} catch {}
			};
			const onResize = () => place();
			let dialogTimer;
			const showDialog = (text) => {
				if (root.classList.contains("hidden")) return;
				dialog.textContent = text;
				dialog.classList.add("show");
				window.clearTimeout(dialogTimer);
				dialogTimer = window.setTimeout(() => dialog.classList.remove("show"), DIALOG_MS);
			};
			const sounds = new WhaleSounds();
			sounds.installGestureUnlock();
			let lastAutoSound = 0;
			const autoSound = (state) => {
				if (root.classList.contains("hidden") || document.hidden) return;
				const now = performance.now();
				if (now - lastAutoSound < SOUND_GAP_MS) return;
				lastAutoSound = now;
				if (state === "think") sounds.play("bubble");
				else if (state === "working") sounds.play("work");
				else if (state === "celebrate") sounds.play("celebrate");
				else if (state === "error") sounds.play("error");
			};
			let visualState = "idle";
			let pretendOn = false;
			try {
				pretendOn = localStorage.getItem(PRETEND_KEY) === "1";
			} catch {}
			let tickerOn = true;
			try {
				tickerOn = localStorage.getItem(THINK_TICKER_KEY) !== "0";
			} catch {}
			let lastErrorText = "";
			const popBubble = () => {
				const bubbles = pet.querySelectorAll(".bubble");
				if (bubbles.length === 0) return;
				const b = bubbles[Math.floor(Math.random() * bubbles.length)];
				b.classList.remove("show");
				b.offsetWidth;
				b.classList.add("show");
				window.setTimeout(() => b.classList.remove("show"), 950);
			};
			const swimmer = new WhaleSwimmer({
				root,
				pet,
				clampPos,
				savePos,
				popBubble,
				showDialog,
				getStrings: () => strings,
				petSize,
				isBusy: () => root.classList.contains(HIDDEN_CLASS) || dragging || document.hidden || menu.classList.contains("open") || sleeping || Date.now() < microSwimUntil || visualState !== "idle"
			});
			const STATS_KEY = "pet-whale:stats";
			const loadStats = () => {
				try {
					const raw = localStorage.getItem(STATS_KEY);
					if (raw !== null) {
						const parsed = JSON.parse(raw);
						return {
							completedRounds: typeof parsed.completedRounds === "number" ? parsed.completedRounds : 0,
							errorCount: typeof parsed.errorCount === "number" ? parsed.errorCount : 0,
							interactionCount: typeof parsed.interactionCount === "number" ? parsed.interactionCount : 0,
							firstDate: typeof parsed.firstDate === "string" ? parsed.firstDate : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
							bondTier: typeof parsed.bondTier === "number" ? parsed.bondTier : 0
						};
					}
				} catch {}
				const init = {
					completedRounds: 0,
					errorCount: 0,
					interactionCount: 0,
					firstDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					bondTier: 0
				};
				try {
					localStorage.setItem(STATS_KEY, JSON.stringify(init));
				} catch {}
				return init;
			};
			const saveStats = (s) => {
				try {
					localStorage.setItem(STATS_KEY, JSON.stringify(s));
				} catch {}
			};
			const recordCelebrate = () => {
				const s = loadStats();
				s.completedRounds++;
				saveStats(s);
				checkBondUp();
			};
			const recordError = () => {
				const s = loadStats();
				s.errorCount++;
				saveStats(s);
			};
			const recordInteraction = () => {
				const s = loadStats();
				s.interactionCount++;
				saveStats(s);
				checkBondUp();
			};
			const calcDays = (s) => {
				try {
					const start = new Date(s.firstDate).getTime();
					const now = Date.now();
					if (Number.isNaN(start)) return 1;
					return Math.max(1, Math.floor((now - start) / 864e5) + 1);
				} catch {
					return 1;
				}
			};
			const bondScore = (s) => s.interactionCount + s.completedRounds * 2 + calcDays(s) * 4;
			const bondTierOf = (score) => {
				let tier = 0;
				for (let i = 0; i < BOND_THRESHOLDS.length; i++) if (score >= BOND_THRESHOLDS[i]) tier = i;
				return tier;
			};
			/** 距下一档的百分比；已经满档返回 -1 */
			const bondProgress = (score, tier) => {
				if (tier >= BOND_THRESHOLDS.length - 1) return -1;
				const from = BOND_THRESHOLDS[tier];
				const to = BOND_THRESHOLDS[tier + 1];
				return Math.max(0, Math.min(99, Math.round((score - from) / (to - from) * 100)));
			};
			const currentTier = () => bondTierOf(bondScore(loadStats()));
			/**
			* 升档播报。写回存储放在弹话之前——弹话没弹出来也不该让同一档反复恭喜。
			* 分数只增不减，所以这里不必处理回落。
			*/
			const checkBondUp = () => {
				const st = loadStats();
				const tier = bondTierOf(bondScore(st));
				if (tier <= st.bondTier) return;
				st.bondTier = tier;
				saveStats(st);
				window.setTimeout(() => showDialog(strings.bond.levelUp[tier]), 1500);
			};
			const setState = (next, changed) => {
				const effective = pretendOn ? "working" : next;
				if (effective !== "idle" && sulking) clearSulk();
				if (effective !== "idle") wake();
				for (const s of STATES) pet.classList.toggle(s, s === effective);
				visualState = effective;
				syncMiniState(effective);
				swimmer.onStateChange(effective);
				if (effective === "idle") scheduleIdleMicro();
				else clearIdleMicro();
				if (changed) {
					showDialog(pick(strings.status[effective]));
					autoSound(effective);
					if (effective === "celebrate") {
						recordCelebrate();
						notifyDone();
						const curX = parseFloat(root.style.left) || 0;
						const curY = parseFloat(root.style.top) || 0;
						swimmer.spawnConfetti(curX + PET_W() / 2, curY + PET_H() * .35, 24);
					} else if (effective === "error") recordError();
				}
			};
			const triggerSquish = () => {
				markActive();
				recordInteraction();
				popBubble();
				sounds.play("bubble");
				pet.classList.remove("squish", "dizzy", "joy");
				pet.offsetWidth;
				pet.classList.add("squish");
				window.setTimeout(() => pet.classList.remove("squish"), 450);
				showDialog(pick(strings.bond.poke[currentTier()]));
			};
			const triggerRoll = () => {
				markActive();
				recordInteraction();
				sounds.play("trick");
				showDialog(strings.feedback.roll);
				pet.classList.remove("rolling", "dizzy", "joy");
				pet.offsetWidth;
				pet.classList.add("rolling", "spouting");
				const curX = parseFloat(root.style.left) || 0;
				const curY = parseFloat(root.style.top) || 0;
				swimmer.spawnSplash(curX + PET_W() / 2, curY + PET_H() * .64, 6);
				swimmer.spawnWaterRipple(curX + PET_W() / 2, curY + PET_H() * .64, false);
				popBubble();
				window.setTimeout(() => popBubble(), 200);
				window.setTimeout(() => pet.classList.remove("rolling", "spouting"), 1100);
			};
			const triggerJoy = () => {
				if (root.classList.contains(HIDDEN_CLASS)) return;
				markActive();
				recordInteraction();
				pet.classList.remove("joy", "squish", "dizzy");
				pet.offsetWidth;
				pet.classList.add("joy");
				sounds.play("celebrate");
				showDialog(pick(strings.feedback.joy));
				popBubble();
				window.setTimeout(() => pet.classList.remove("joy"), 1100);
			};
			const triggerDizzy = () => {
				markActive();
				recordInteraction();
				pet.classList.remove("dizzy", "squish", "joy");
				pet.offsetWidth;
				pet.classList.add("dizzy");
				sounds.play("bubble");
				showDialog(pick(strings.feedback.pokeDizzy));
				window.setTimeout(() => pet.classList.remove("dizzy"), 900);
			};
			const POKE_ANNOYED_AT = 3;
			const POKE_SULK_AT = 6;
			/** 停手这么久，连戳计数清零 */
			const POKE_DECAY_MS = 2600;
			/** 闹脾气持续时长，期间再戳只会更闹 */
			const SULK_MS = 4200;
			let pokeStreak = 0;
			let pokeDecayTimer = 0;
			let sulking = false;
			let sulkTimer = 0;
			const clearSulk = () => {
				if (sulkTimer !== 0) {
					window.clearTimeout(sulkTimer);
					sulkTimer = 0;
				}
				sulking = false;
				pet.classList.remove("sulking");
			};
			const bumpPokeStreak = () => {
				pokeStreak += 1;
				if (pokeDecayTimer !== 0) window.clearTimeout(pokeDecayTimer);
				pokeDecayTimer = window.setTimeout(() => {
					pokeDecayTimer = 0;
					pokeStreak = 0;
				}, POKE_DECAY_MS);
			};
			const triggerAnnoyed = () => {
				markActive();
				recordInteraction();
				pet.classList.remove("annoyed", "squish", "dizzy", "joy");
				pet.offsetWidth;
				pet.classList.add("annoyed");
				sounds.play("bubble");
				showDialog(pick(strings.feedback.pokeAnnoyed));
				window.setTimeout(() => pet.classList.remove("annoyed"), 520);
			};
			const triggerSulk = () => {
				markActive();
				recordInteraction();
				clearSulk();
				sulking = true;
				pet.classList.remove("annoyed", "squish", "dizzy", "joy", "rolling");
				pet.offsetWidth;
				pet.classList.add("sulking");
				sounds.play("bubble");
				showDialog(pick(strings.feedback.pokeSulk));
				sulkTimer = window.setTimeout(() => {
					sulkTimer = 0;
					clearSulk();
					pokeStreak = 0;
				}, SULK_MS);
			};
			/** 失落时被戳：当作安慰，提前结束自愈 */
			const triggerComfort = () => {
				markActive();
				recordInteraction();
				clearSulk();
				pokeStreak = 0;
				pet.classList.remove("joy", "squish", "dizzy", "annoyed");
				pet.offsetWidth;
				pet.classList.add("joy");
				sounds.play("celebrate");
				showDialog(pick(strings.feedback.comfort));
				popBubble();
				window.setTimeout(() => pet.classList.remove("joy"), 1100);
			};
			let notifyOn = true;
			let sysNotifyOn = false;
			try {
				notifyOn = localStorage.getItem(NOTIFY_KEY) !== "0";
				sysNotifyOn = localStorage.getItem(SYS_NOTIFY_KEY) === "1";
			} catch {}
			const hasNotificationApi = typeof window !== "undefined" && "Notification" in window;
			/** 我们改写标题前的原值；null 表示当前没在闪 */
			let titleBeforeFlash = null;
			let flashedTitle = "";
			const restoreTitle = () => {
				if (titleBeforeFlash === null) return;
				if (document.title === flashedTitle) document.title = titleBeforeFlash;
				titleBeforeFlash = null;
				flashedTitle = "";
			};
			const flashTitle = () => {
				if (titleBeforeFlash !== null) return;
				titleBeforeFlash = document.title;
				flashedTitle = `✅ ${strings.notify.titleDone} · ${titleBeforeFlash}`;
				document.title = flashedTitle;
			};
			const sendSystemNotification = () => {
				if (!sysNotifyOn || !hasNotificationApi) return;
				if (Notification.permission !== "granted") return;
				try {
					const n = new Notification(`🐳 ${strings.notify.titleDone}`, { body: strings.notify.bodyDone });
					window.setTimeout(() => n.close(), 6e3);
				} catch {}
			};
			/** 回合完成时调用：只在页面不可见时才提醒 */
			const notifyDone = () => {
				if (!document.hidden) return;
				if (notifyOn) flashTitle();
				sendSystemNotification();
			};
			let sedentaryMin = 0;
			try {
				const raw = Number(localStorage.getItem(SEDENTARY_KEY));
				if (SEDENTARY_CHOICES.includes(raw)) sedentaryMin = raw;
			} catch {}
			let sittingMs = 0;
			let hiddenSince = 0;
			let sedentaryTimer = 0;
			const nudgeRest = () => {
				if (root.classList.contains(HIDDEN_CLASS)) return;
				pet.classList.remove("welcome");
				pet.offsetWidth;
				pet.classList.add("welcome", "spouting");
				showDialog(pick(strings.feedback.restNudge));
				sounds.play("bubble");
				window.setTimeout(() => pet.classList.remove("welcome", "spouting"), 1400);
			};
			const sedentaryTick = () => {
				if (sedentaryMin === 0) return;
				if (document.hidden) return;
				sittingMs += SEDENTARY_TICK_MS;
				if (sittingMs >= sedentaryMin * 6e4) {
					sittingMs = 0;
					nudgeRest();
				}
			};
			const startSedentary = () => {
				if (sedentaryTimer !== 0) window.clearInterval(sedentaryTimer);
				sedentaryTimer = 0;
				sittingMs = 0;
				if (sedentaryMin === 0) return;
				sedentaryTimer = window.setInterval(sedentaryTick, SEDENTARY_TICK_MS);
			};
			startSedentary();
			const triggerWelcome = () => {
				if (root.classList.contains(HIDDEN_CLASS) || visualState !== "idle") return;
				pet.classList.remove("welcome");
				pet.offsetWidth;
				pet.classList.add("welcome");
				showDialog(strings.bond.welcome[currentTier()]);
				sounds.play("bubble");
				window.setTimeout(() => pet.classList.remove("welcome"), 1200);
			};
			const HIDDEN_CLASS = "hidden";
			const MINI_SIZE = 46;
			let mini = null;
			let quitWhale = () => {};
			const syncMiniState = (state) => {
				if (mini === null) return;
				mini.dataset.state = state;
				mini.title = `${strings.aria.miniTitle(state)}`;
			};
			const miniClamp = (right, bottom) => {
				const maxRight = Math.max(0, window.innerWidth - MINI_SIZE);
				const maxBottom = Math.max(0, window.innerHeight - MINI_SIZE);
				return {
					right: Math.min(Math.max(0, right), maxRight),
					bottom: Math.min(Math.max(0, bottom), maxBottom)
				};
			};
			const loadMiniPos = () => {
				try {
					const raw = localStorage.getItem(MINI_POS_KEY);
					if (raw !== null) {
						const parsed = JSON.parse(raw);
						if (typeof parsed.right === "number" && typeof parsed.bottom === "number") return miniClamp(parsed.right, parsed.bottom);
					}
				} catch {}
				return {
					right: 14,
					bottom: 14
				};
			};
			const saveMiniPos = () => {
				if (mini === null) return;
				try {
					localStorage.setItem(MINI_POS_KEY, JSON.stringify({
						right: parseFloat(mini.style.right) || 0,
						bottom: parseFloat(mini.style.bottom) || 0
					}));
				} catch {}
			};
			let miniDrag = null;
			let miniDragging = false;
			let miniSuppressClick = false;
			const onMiniPointerDown = (e) => {
				if (e.button !== 0 || mini === null) return;
				miniDrag = {
					x: e.clientX,
					y: e.clientY,
					right: parseFloat(mini.style.right) || 0,
					bottom: parseFloat(mini.style.bottom) || 0
				};
				mini.setPointerCapture(e.pointerId);
			};
			const onMiniPointerMove = (e) => {
				if (miniDrag === null || mini === null) return;
				const dx = e.clientX - miniDrag.x;
				const dy = e.clientY - miniDrag.y;
				if (!miniDragging && Math.abs(dx) + Math.abs(dy) > 4) {
					miniDragging = true;
					miniSuppressClick = true;
					mini.classList.add("dragging");
				}
				if (miniDragging) {
					const p = miniClamp(miniDrag.right - dx, miniDrag.bottom - dy);
					mini.style.right = `${p.right}px`;
					mini.style.bottom = `${p.bottom}px`;
				}
			};
			const onMiniDragEnd = () => {
				if (miniDrag === null) return;
				miniDrag = null;
				if (miniDragging) {
					miniDragging = false;
					mini?.classList.remove("dragging");
					saveMiniPos();
				}
				window.setTimeout(() => {
					miniSuppressClick = false;
				}, 0);
			};
			const removeMini = () => {
				mini?.remove();
				mini = null;
			};
			const createMini = () => {
				if (mini !== null) return;
				mini = document.createElement("button");
				mini.type = "button";
				mini.setAttribute("data-dsh-whale-mini", "");
				mini.setAttribute("aria-label", strings.aria.mini);
				mini.textContent = "🐳";
				const pos = loadMiniPos();
				mini.style.right = `${pos.right}px`;
				mini.style.bottom = `${pos.bottom}px`;
				syncMiniState(visualState);
				mini.addEventListener("click", () => {
					if (miniSuppressClick) return;
					showWhale();
				});
				mini.addEventListener("pointerdown", onMiniPointerDown);
				mini.addEventListener("pointermove", onMiniPointerMove);
				mini.addEventListener("pointerup", onMiniDragEnd);
				mini.addEventListener("pointercancel", onMiniDragEnd);
				document.body.appendChild(mini);
			};
			const showWhale = () => {
				removeMini();
				root.classList.remove(HIDDEN_CLASS);
				try {
					localStorage.removeItem(HIDDEN_KEY);
				} catch {}
				place();
				triggerSquish();
				showDialog(strings.feedback.shown);
				swimmer.scheduleNext(1500);
			};
			const hideWhale = () => {
				swimmer.stop();
				root.classList.add(HIDDEN_CLASS);
				try {
					localStorage.setItem(HIDDEN_KEY, "1");
				} catch {}
				createMini();
			};
			const readAutoHide = () => {
				try {
					const raw = localStorage.getItem(AUTO_HIDE_KEY);
					if (raw === null) return null;
					const parsed = JSON.parse(raw);
					if (typeof parsed.at === "number" && typeof parsed.daily === "boolean") return parsed;
				} catch {}
				return null;
			};
			const saveAutoHide = (plan) => {
				try {
					localStorage.setItem(AUTO_HIDE_KEY, JSON.stringify(plan));
				} catch {}
			};
			const clearAutoHide = () => {
				try {
					localStorage.removeItem(AUTO_HIDE_KEY);
				} catch {}
			};
			const nextDailyAt = (hh, mm) => {
				const d = /* @__PURE__ */ new Date();
				d.setHours(hh, mm, 0, 0);
				if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
				return d.getTime();
			};
			const scheduleOnce = (ms) => {
				saveAutoHide({
					at: Date.now() + ms,
					daily: false,
					hh: 0,
					mm: 0
				});
			};
			const scheduleDaily = (hh, mm) => {
				saveAutoHide({
					at: nextDailyAt(hh, mm),
					daily: true,
					hh,
					mm
				});
			};
			const checkAutoHide = () => {
				const plan = readAutoHide();
				if (plan === null) return;
				if (Date.now() < plan.at) return;
				if (plan.daily) scheduleDaily(plan.hh, plan.mm);
				else clearAutoHide();
				if (!root.classList.contains(HIDDEN_CLASS)) hideWhale();
			};
			let autoHideTimer;
			const startAutoHide = () => {
				checkAutoHide();
				autoHideTimer = window.setInterval(checkAutoHide, AUTO_HIDE_CHECK_MS);
			};
			const THINK_TICKER_WIDTH = 360;
			const ticker = document.createElement("div");
			ticker.setAttribute("data-dsh-whale-think", "");
			ticker.innerHTML = "<span class=\"dsh-whale-think-label\">🧠</span><div class=\"dsh-whale-think-scroll\"><span class=\"dsh-whale-think-text\"></span></div>";
			root.appendChild(ticker);
			const tickerText = ticker.querySelector(".dsh-whale-think-text");
			let tickerOffset = 0;
			let tickerRaf = 0;
			const hideTicker = () => {
				ticker.classList.remove("show");
				if (tickerRaf !== 0) {
					window.cancelAnimationFrame(tickerRaf);
					tickerRaf = 0;
				}
			};
			const tickerTick = () => {
				const max = Math.max(0, tickerText.scrollWidth - ticker.clientWidth);
				tickerOffset += .5;
				if (tickerOffset > max + 40) tickerOffset = 0;
				tickerText.style.transform = `translateX(-${tickerOffset}px)`;
				if (ticker.classList.contains("show")) tickerRaf = window.requestAnimationFrame(tickerTick);
				else tickerRaf = 0;
			};
			const positionTicker = () => {
				const rect = root.getBoundingClientRect();
				const width = Math.min(THINK_TICKER_WIDTH, window.innerWidth - 24);
				const centerX = rect.left + rect.width / 2;
				const left = Math.min(Math.max(centerX, width / 2 + 12), window.innerWidth - width / 2 - 12);
				ticker.style.width = `${width}px`;
				ticker.style.left = `${left}px`;
				ticker.style.top = `${rect.top - 40}px`;
			};
			const updateTicker = (text) => {
				if (text.trim() === "") {
					hideTicker();
					return;
				}
				tickerText.textContent = text.slice(-200);
				tickerOffset = 0;
				positionTicker();
				ticker.classList.add("show");
				if (tickerRaf === 0) tickerRaf = window.requestAnimationFrame(tickerTick);
			};
			const partialTextOf = (partial) => {
				if (partial === null || typeof partial !== "object") return "";
				const blocks = partial.blocks;
				if (!Array.isArray(blocks)) return "";
				const parts = [];
				for (const block of blocks) {
					if (block === null || typeof block !== "object") continue;
					const b = block;
					if ((b.kind === "text" || b.kind === "reasoning") && typeof b.text === "string") parts.push(b.text);
				}
				return parts.join(" ");
			};
			const partialHasToolCall = (partial) => {
				if (partial === null || typeof partial !== "object") return false;
				const blocks = partial.blocks;
				if (!Array.isArray(blocks)) return false;
				for (const block of blocks) if (block !== null && typeof block === "object" && block.kind === "tool-call") return true;
				return false;
			};
			const onVisibility = () => {
				document.hidden;
				root.classList.toggle("paused", document.hidden);
				mini?.classList.toggle("paused", document.hidden);
				if (document.hidden) {
					hiddenSince = Date.now();
					hideTicker();
					swimmer.stop();
				} else {
					restoreTitle();
					if (hiddenSince !== 0 && Date.now() - hiddenSince >= SEDENTARY_AWAY_RESET_MS) sittingMs = 0;
					hiddenSince = 0;
					if (visualState === "idle") swimmer.scheduleNext(2e3);
				}
			};
			document.addEventListener("visibilitychange", onVisibility);
			onVisibility();
			const petBody = pet.querySelector(".body");
			const reduceMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			let followRaf = 0;
			let baseX = NaN;
			let baseY = NaN;
			const FOLLOW_MAX = 18;
			const clampFollow = (v) => Math.max(-18, Math.min(FOLLOW_MAX, v));
			const followBody = () => {
				followRaf = 0;
				if (badge.hidden || document.hidden || petBody === null) return;
				const b = petBody.getBoundingClientRect();
				const r = root.getBoundingClientRect();
				const x = b.left + b.width / 2 - r.left;
				const y = b.top + b.height / 2 - r.top;
				if (Number.isNaN(baseX)) {
					baseX = x;
					baseY = y;
				}
				baseX += (x - baseX) * .008;
				baseY += (y - baseY) * .008;
				badge.style.translate = `${clampFollow(x - baseX).toFixed(1)}px ${clampFollow(y - baseY).toFixed(1)}px`;
				followRaf = window.requestAnimationFrame(followBody);
			};
			const startFollow = () => {
				if (reduceMotion || followRaf !== 0) return;
				followRaf = window.requestAnimationFrame(followBody);
			};
			const onFollowVisibility = () => {
				if (!document.hidden && !badge.hidden) startFollow();
			};
			document.addEventListener("visibilitychange", onFollowVisibility);
			let menuMode = "main";
			const appendMenuBtn = (label, onClick, cls = "") => {
				const btn = document.createElement("button");
				btn.type = "button";
				if (cls) btn.className = cls;
				btn.textContent = label;
				btn.addEventListener("click", onClick);
				menu.appendChild(btn);
				return btn;
			};
			/** 切换开关后原地重画菜单：菜单不关、位置不动 */
			const reopenMenu = (mode) => {
				buildMenu(mode);
				menu.classList.add("open");
				positionMenu(lastMenuPos.x, lastMenuPos.y);
			};
			const buildMenu = (mode = "main") => {
				menuMode = mode;
				menu.textContent = "";
				const openMore = () => {
					buildMenu("more");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				const openAppearance = () => {
					buildMenu("appearance");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				const openBehavior = () => {
					buildMenu("behavior");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				const openStats = () => {
					buildMenu("stats");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				const openRest = () => {
					buildMenu("rest");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				const backMain = () => {
					buildMenu("main");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				const backMore = () => {
					buildMenu("more");
					menu.classList.add("open");
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				};
				if (mode === "main") {
					const items = [
						[strings.menu.feed, () => {
							snack.classList.remove("drop");
							snack.offsetWidth;
							snack.classList.add("drop");
							sounds.play("snack");
							showDialog(strings.feedback.feed);
							window.setTimeout(() => {
								triggerJoy();
							}, 600);
						}],
						[strings.menu.headpat, () => {
							triggerPat();
						}],
						[`${strings.panel.pretend}${pretendOn ? " ✓" : ""}`, () => {
							pretendOn = !pretendOn;
							try {
								localStorage.setItem(PRETEND_KEY, pretendOn ? "1" : "0");
							} catch {}
							updateTicker("");
							setState(pretendOn ? "working" : "idle", true);
							showDialog(pretendOn ? strings.feedback.pretendOn : strings.feedback.pretendOff);
						}],
						[sounds.isMuted ? strings.menu.soundOff : strings.menu.soundOn, () => {
							const next = !sounds.isMuted;
							sounds.setMuted(next);
							buildMenu("main");
							menu.classList.add("open");
							positionMenu(lastMenuPos.x, lastMenuPos.y);
							if (next) sounds.play("bubble");
						}],
						[strings.menu.hide, () => {
							hideWhale();
						}],
						...lastErrorText !== "" ? [[strings.menu.copyError, () => {
							try {
								navigator.clipboard?.writeText(lastErrorText);
							} catch {}
							showDialog(strings.feedback.errorCopied);
						}]] : [],
						[strings.menu.more, openMore]
					];
					for (const [label, action] of items) appendMenuBtn(label, () => {
						closeMenu();
						action();
					});
					return;
				}
				if (mode === "more") {
					appendMenuBtn(`🎨 ${strings.panel.appearance} ▸`, openAppearance);
					appendMenuBtn(`🧠 ${strings.panel.behavior} ▸`, openBehavior);
					appendMenuBtn(`📊 ${strings.panel.stats} ▸`, openStats);
					appendMenuBtn(`🕐 ${strings.panel.rest} ▸`, openRest);
					appendMenuBtn(strings.panel.back, backMain, "pw-back");
					return;
				}
				if (mode === "stats") {
					const stats = loadStats();
					const days = calcDays(stats);
					const items = [
						strings.panel.statsCompleted(stats.completedRounds),
						strings.panel.statsInteractions(stats.interactionCount),
						strings.panel.statsErrors(stats.errorCount),
						strings.panel.statsDays(days),
						strings.panel.statsBond(strings.bond.tierName[bondTierOf(bondScore(stats))], bondProgress(bondScore(stats), bondTierOf(bondScore(stats))))
					];
					for (const it of items) {
						const itEl = document.createElement("div");
						itEl.className = "pw-stats-item";
						itEl.textContent = it;
						menu.appendChild(itEl);
					}
					appendMenuBtn(strings.panel.back, backMore, "pw-back");
					return;
				}
				if (mode === "appearance") {
					for (const p of PALETTES) {
						const btn = document.createElement("button");
						btn.type = "button";
						btn.className = "pw-palette-btn";
						const dot = document.createElement("span");
						dot.className = "pw-swatch";
						dot.style.background = `linear-gradient(135deg, ${p.light}, ${p.main}, ${p.dark})`;
						btn.appendChild(dot);
						btn.appendChild(document.createTextNode(paletteName(locale, p.id, p.name)));
						btn.addEventListener("click", () => {
							closeMenu();
							applyPalette(root, p);
							savePaletteId(p.id);
							showDialog(strings.feedback.paletteApplied(paletteName(locale, p.id, p.name)));
							sounds.play("bubble");
						});
						menu.appendChild(btn);
					}
					appendMenuBtn(strings.panel.size(scaleName()), () => {
						const i = SCALE_CHOICES.indexOf(scale);
						applyScale(SCALE_CHOICES[(i + 1) % SCALE_CHOICES.length]);
						reopenMenu("appearance");
						showDialog(strings.feedback.sizeSet(scaleName()));
						sounds.play("bubble");
					});
					appendMenuBtn(strings.panel.back, backMore, "pw-back");
					return;
				}
				if (mode === "behavior") {
					appendMenuBtn(`${strings.panel.thinkTicker}${tickerOn ? " ✓" : ""}`, () => {
						tickerOn = !tickerOn;
						try {
							localStorage.setItem(THINK_TICKER_KEY, tickerOn ? "1" : "0");
						} catch {}
						updateTicker("");
						showDialog(tickerOn ? strings.feedback.tickerOn : strings.feedback.tickerOff);
						buildMenu("behavior");
						menu.classList.add("open");
						positionMenu(lastMenuPos.x, lastMenuPos.y);
					});
					appendMenuBtn(`${strings.panel.swim}${swimmer.isEnabled ? " ✓" : ""}`, () => {
						const next = swimmer.toggle();
						showDialog(next ? strings.feedback.swimOn : strings.feedback.swimOff);
						buildMenu("behavior");
						menu.classList.add("open");
						positionMenu(lastMenuPos.x, lastMenuPos.y);
					});
					appendMenuBtn(strings.panel.volume(sounds.isMuted ? strings.panel.volumeOff : strings.panel.volumeNames[VOLUME_LEVELS.indexOf(sounds.volume)]), () => {
						if (sounds.isMuted) {
							sounds.setMuted(false);
							sounds.setVolume("low");
						} else if (sounds.volume === "high") sounds.setMuted(true);
						else sounds.setVolume(VOLUME_LEVELS[VOLUME_LEVELS.indexOf(sounds.volume) + 1]);
						reopenMenu("behavior");
						sounds.play("bubble");
					});
					if (statusSource !== void 0) appendMenuBtn(`${strings.panel.followAll}${followAll ? " ✓" : " ✕"}`, () => {
						followAll = !followAll;
						try {
							localStorage.setItem(FOLLOW_ALL_KEY, followAll ? "1" : "0");
						} catch {}
						updateBadge();
						onSnapshot();
						showDialog(followAll ? strings.feedback.followAllOn : strings.feedback.followAllOff);
						reopenMenu("behavior");
					});
					appendMenuBtn(`${strings.panel.notify}${notifyOn ? " ✓" : " ✕"}`, () => {
						notifyOn = !notifyOn;
						try {
							localStorage.setItem(NOTIFY_KEY, notifyOn ? "1" : "0");
						} catch {}
						if (!notifyOn) restoreTitle();
						showDialog(notifyOn ? strings.feedback.notifyOn : strings.feedback.notifyOff);
						reopenMenu("behavior");
					});
					if (hasNotificationApi) appendMenuBtn(`${strings.panel.sysNotify}${sysNotifyOn ? " ✓" : " ✕"}`, () => {
						const turningOn = !sysNotifyOn;
						const commit = (granted) => {
							sysNotifyOn = turningOn && granted;
							try {
								localStorage.setItem(SYS_NOTIFY_KEY, sysNotifyOn ? "1" : "0");
							} catch {}
							showDialog(!turningOn ? strings.feedback.sysNotifyOff : granted ? strings.feedback.sysNotifyOn : strings.feedback.sysNotifyDenied);
							reopenMenu("behavior");
						};
						if (turningOn && Notification.permission === "default") {
							Notification.requestPermission().then((p) => commit(p === "granted"));
							return;
						}
						commit(Notification.permission === "granted");
					});
					appendMenuBtn(strings.panel.sedentary(sedentaryMin), () => {
						const i = SEDENTARY_CHOICES.indexOf(sedentaryMin);
						sedentaryMin = SEDENTARY_CHOICES[(i + 1) % SEDENTARY_CHOICES.length];
						try {
							localStorage.setItem(SEDENTARY_KEY, String(sedentaryMin));
						} catch {}
						startSedentary();
						showDialog(sedentaryMin === 0 ? strings.feedback.sedentaryOff : strings.feedback.sedentarySet(sedentaryMin));
						reopenMenu("behavior");
					});
					appendMenuBtn(strings.panel.back, backMore, "pw-back");
					return;
				}
				if (mode === "rest") {
					appendMenuBtn(`🕐 ${strings.panel.in1h}`, () => {
						closeMenu();
						scheduleOnce(36e5);
						showDialog(strings.feedback.schedule1h);
					});
					appendMenuBtn(`🌙 ${strings.panel.daily}`, () => {
						closeMenu();
						scheduleDaily(22, 0);
						showDialog(strings.feedback.scheduleDaily);
					});
					appendMenuBtn(`🚫 ${strings.panel.cancelSchedule}`, () => {
						closeMenu();
						clearAutoHide();
						showDialog(strings.feedback.scheduleCancel);
					});
					appendMenuBtn(strings.panel.hide, () => {
						closeMenu();
						hideWhale();
					});
					appendMenuBtn(strings.panel.close, () => {
						closeMenu();
						quitWhale();
					});
					appendMenuBtn(strings.panel.back, backMore, "pw-back");
				}
			};
			let lastMenuPos = {
				x: 0,
				y: 0
			};
			const positionMenu = (clientX, clientY) => {
				const rect = root.getBoundingClientRect();
				const menuW = menu.offsetWidth || 140;
				const menuH = menu.offsetHeight || 130;
				const x = Math.min(Math.max(0, clientX - rect.left), Math.max(0, rect.width - menuW));
				const y = clientY + menuH + 8 > window.innerHeight ? clientY - rect.top - menuH - 10 : clientY - rect.top + 12;
				const minY = -rect.top + 8;
				const maxY = Math.max(minY, window.innerHeight - rect.top - menuH - 8);
				menu.style.left = `${x}px`;
				menu.style.top = `${Math.min(Math.max(minY, y), maxY)}px`;
			};
			const openMenu = (clientX, clientY) => {
				lastMenuPos = {
					x: clientX,
					y: clientY
				};
				buildMenu("main");
				menu.classList.add("open");
				positionMenu(clientX, clientY);
			};
			const closeMenu = () => menu.classList.remove("open");
			const onDocPointerDown = (e) => {
				if (!menu.contains(e.target)) closeMenu();
			};
			let dragging = false;
			let suppressClick = false;
			let avoidCooldownUntil = 0;
			let avoidTimer;
			const cancelAvoid = () => {
				window.clearTimeout(avoidTimer);
				avoidTimer = void 0;
				root.style.transition = "";
			};
			const maybeAvoid = (e) => {
				if (root.classList.contains("hidden") || dragging || menu.classList.contains("open") || visualState !== "idle") return;
				if (performance.now() < avoidCooldownUntil) return;
				const rect = pet.getBoundingClientRect();
				if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
					cancelAvoid();
					return;
				}
				if (!(e.clientX >= rect.left - AVOID_MARGIN && e.clientX <= rect.right + AVOID_MARGIN && e.clientY >= rect.top - AVOID_MARGIN && e.clientY <= rect.bottom + AVOID_MARGIN)) {
					cancelAvoid();
					return;
				}
				if (avoidTimer !== void 0) return;
				avoidTimer = window.setTimeout(() => {
					avoidTimer = void 0;
					if (root.classList.contains("hidden") || dragging || menu.classList.contains("open") || visualState !== "idle") return;
					if (performance.now() < avoidCooldownUntil) return;
					swimmer.interrupt();
					const r = pet.getBoundingClientRect();
					if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) return;
					const cx = r.left + r.width / 2;
					const cy = r.top + r.height / 2;
					const dx = e.clientX - cx;
					const dy = e.clientY - cy;
					const len = Math.hypot(dx, dy) || 1;
					const next = clampPos(cx - dx / len * AVOID_STEP - PET_W() / 2, cy - dy / len * AVOID_STEP - PET_H() / 2);
					root.style.transition = "left .35s ease, top .35s ease";
					root.style.left = `${next.x}px`;
					root.style.top = `${next.y}px`;
					window.setTimeout(() => {
						root.style.transition = "";
						savePos();
					}, 380);
					showDialog(strings.feedback.avoid);
				}, AVOID_DWELL_MS);
			};
			/** 两次掉头之间至少要走这么远，手抖不算 */
			const PAT_MIN_TRAVEL = 8;
			/** 停手这么久就算摸完了 */
			const PAT_IDLE_MS = 650;
			/** 每蹭这么多下冒一颗爱心 */
			const PAT_HEART_EVERY = 5;
			const PAT_SAY_COOLDOWN_MS = 4e3;
			/** 这么多下蹭在 PAT_TOO_FAST_MS 以内就是乱蹭：生气、游开 */
			const PAT_TOO_FAST_STROKES = 8;
			const PAT_TOO_FAST_MS = 1100;
			/** 生气后这段时间里再蹭也不理 */
			const PAT_GRUMPY_MS = 5e3;
			const PAT_FLEE_STEP = 160;
			let patStrokes = 0;
			let patStrokeTimes = [];
			let patBlockedUntil = 0;
			let patLastY = 0;
			let patDir = 0;
			let patTurnX = 0;
			let patLastX = 0;
			let patEndTimer = 0;
			let patSaidAt = -Infinity;
			const inHeadZone = (x, y) => {
				const r = pet.getBoundingClientRect();
				if (r.width === 0) return false;
				const fx = (x - r.left) / r.width;
				const fy = (y - r.top) / r.height;
				return (swimmer.currentFacing === "left" ? fx >= .05 && fx <= .6 : fx >= .4 && fx <= .95) && fy >= 0 && fy <= .45;
			};
			const endPat = () => {
				window.clearTimeout(patEndTimer);
				patEndTimer = 0;
				patStrokes = 0;
				patStrokeTimes = [];
				patDir = 0;
				pet.classList.remove("petting", "pat-press");
				root.classList.remove("patting");
			};
			const pressHead = () => {
				pet.classList.remove("pat-press");
				pet.offsetWidth;
				pet.classList.add("pat-press");
			};
			const popHeart = () => {
				const heart = pet.querySelector(".pat-heart");
				if (heart === null) return;
				heart.classList.remove("show");
				heart.offsetWidth;
				heart.classList.add("show");
			};
			/** 摸满一轮：冒爱心、说句话、算一次互动；失落时这一摸就是安慰 */
			const patReward = () => {
				popHeart();
				if (visualState === "disappointed" && driver.soothe()) {
					triggerComfort();
					return;
				}
				recordInteraction();
				const now = performance.now();
				if (now - patSaidAt < PAT_SAY_COOLDOWN_MS) return;
				patSaidAt = now;
				sounds.play("bubble");
				showDialog(pick(strings.feedback.patted));
			};
			/** 乱蹭：吊眉、放狠话，朝远离光标的方向游开一段 */
			const patTooFast = () => {
				endPat();
				const now = performance.now();
				patBlockedUntil = now + PAT_GRUMPY_MS;
				avoidCooldownUntil = now + PAT_GRUMPY_MS;
				recordInteraction();
				clearSulk();
				sulking = true;
				pet.classList.remove("annoyed", "squish", "dizzy", "joy");
				pet.classList.add("sulking");
				sounds.play("bubble");
				showDialog(pick(strings.feedback.patTooFast));
				sulkTimer = window.setTimeout(() => {
					sulkTimer = 0;
					clearSulk();
				}, 2600);
				swimmer.interrupt();
				const r = pet.getBoundingClientRect();
				const cx = r.left + r.width / 2;
				const cy = r.top + r.height / 2;
				const dx = cx - patLastX;
				const dy = cy - patLastY;
				const len = Math.hypot(dx, dy) || 1;
				const next = clampPos(cx + dx / len * PAT_FLEE_STEP - PET_W() / 2, cy + dy / len * PAT_FLEE_STEP - PET_H() / 2);
				root.style.transition = "left .6s cubic-bezier(.2,.8,.3,1), top .6s cubic-bezier(.2,.8,.3,1)";
				root.style.left = `${next.x}px`;
				root.style.top = `${next.y}px`;
				swimmer.spawnSplash(cx, r.top + r.height * .79, 4);
				window.setTimeout(() => {
					root.style.transition = "";
					savePos();
				}, 650);
			};
			const onPatStroke = () => {
				markActive();
				const now = performance.now();
				patStrokeTimes.push(now);
				if (patStrokeTimes.length > PAT_TOO_FAST_STROKES) patStrokeTimes.shift();
				if (patStrokeTimes.length === PAT_TOO_FAST_STROKES && now - patStrokeTimes[0] < PAT_TOO_FAST_MS) {
					patTooFast();
					return;
				}
				patStrokes += 1;
				if (patStrokes >= 2) {
					if (!pet.classList.contains("petting")) {
						swimmer.interrupt();
						cancelAvoid();
						pet.classList.add("petting");
						root.classList.add("patting");
					}
					pressHead();
				}
				if (patStrokes % PAT_HEART_EVERY === 0) patReward();
			};
			const maybePat = (e) => {
				if (e.buttons !== 0 || dragging || menu.classList.contains("open") || root.classList.contains("hidden") || visualState === "error" || performance.now() < patBlockedUntil) {
					if (patStrokes > 0) endPat();
					return;
				}
				if (!inHeadZone(e.clientX, e.clientY)) {
					if (patStrokes > 0 || patDir !== 0) endPat();
					return;
				}
				const prevX = patLastX;
				patLastX = e.clientX;
				patLastY = e.clientY;
				const dx = e.clientX - prevX;
				if (dx === 0) return;
				const dir = dx > 0 ? 1 : -1;
				if (patDir === 0) {
					patDir = dir;
					patTurnX = prevX;
				} else if (dir !== patDir) {
					if (Math.abs(prevX - patTurnX) >= PAT_MIN_TRAVEL) onPatStroke();
					patDir = dir;
					patTurnX = prevX;
				}
				window.clearTimeout(patEndTimer);
				patEndTimer = window.setTimeout(endPat, PAT_IDLE_MS);
			};
			/** 菜单「摸摸头」和长按：没有鼠标轨迹，就替你摸三下 */
			const triggerPat = () => {
				if (root.classList.contains("hidden")) return;
				endPat();
				swimmer.interrupt();
				pet.classList.add("petting");
				[
					0,
					280,
					560
				].forEach((ms) => window.setTimeout(pressHead, ms));
				window.setTimeout(() => {
					patSaidAt = -Infinity;
					patReward();
				}, 560);
				patEndTimer = window.setTimeout(endPat, 1500);
			};
			let idleMicroTimer;
			const clearIdleMicro = () => {
				window.clearTimeout(idleMicroTimer);
				idleMicroTimer = void 0;
			};
			const microLook = () => {
				if (pupil === null) return;
				const dx = Math.random() * .4 - .2;
				const dy = Math.random() * .3 - .15;
				pupil.style.transition = "transform .45s ease";
				pupil.style.transform = `translate(${dx}px, ${dy}px)`;
				window.setTimeout(() => {
					pupil.style.transition = "";
					pupil.style.transform = "";
				}, 1500);
			};
			const microBubbles = () => {
				popBubble();
				window.setTimeout(popBubble, 260);
			};
			/** microSwim 的补间时长，也是"坐标不可信"的窗口 */
			const MICRO_SWIM_MS = 1450;
			let microSwimUntil = 0;
			const microSwim = (quiet = false) => {
				const ox = parseFloat(root.style.left) || 0;
				const oy = parseFloat(root.style.top) || 0;
				const target = clampPos(ox + (Math.random() * 200 - 100), oy + (Math.random() * 140 - 70));
				root.style.transition = "left 1.4s ease-in-out, top 1.4s ease-in-out";
				root.style.left = `${target.x}px`;
				root.style.top = `${target.y}px`;
				microSwimUntil = Date.now() + MICRO_SWIM_MS;
				window.setTimeout(() => {
					root.style.transition = "";
					microSwimUntil = 0;
					savePos();
				}, MICRO_SWIM_MS);
				if (!quiet && Math.random() < .35) showDialog(pick(strings.feedback.swim));
			};
			const scheduleIdleMicro = () => {
				clearIdleMicro();
				idleMicroTimer = window.setTimeout(() => {
					if (visualState !== "idle" || root.classList.contains("hidden") || dragging || document.hidden || menu.classList.contains("open")) {
						scheduleIdleMicro();
						return;
					}
					if (swimmer.isEnabled) if (Math.random() < .5) microLook();
					else microBubbles();
					else {
						const roll = Math.random();
						if (roll < .35) microSwim();
						else if (roll < .7) microLook();
						else microBubbles();
					}
					scheduleIdleMicro();
				}, 9e3 + Math.random() * 8e3);
			};
			/** 当前这条腿的方向，0 表示还没定下来 */
			let shakeDir = 0;
			/** 这条腿的起点；同向移动时跟着推进，等于一路记住最远处 */
			let shakeLegFrom = 0;
			let shakeCount = 0;
			let shakeWindowFrom = 0;
			/** 晕到什么时候为止，也当冷却用 */
			let shakenUntil = 0;
			const resetShake = () => {
				shakeDir = 0;
				shakeCount = 0;
			};
			const triggerShaken = () => {
				const now = performance.now();
				if (now < shakenUntil) return;
				shakeCount = 0;
				shakenUntil = now + SHAKEN_MS + SHAKE_COOLDOWN_MS;
				markActive();
				recordInteraction();
				pet.classList.remove("shaken", "dizzy", "squish", "joy", "annoyed");
				pet.offsetWidth;
				pet.classList.add("shaken");
				sounds.play("bubble");
				showDialog(pick(strings.feedback.shaken));
				swimmer.setWoozy(13600);
				window.setTimeout(() => pet.classList.remove("shaken"), SHAKEN_MS);
			};
			/** 双击的专属反应：翻肚皮。翻着的时候不接别的动作，让这两秒完整演完 */
			let bellyUpUntil = 0;
			const triggerBellyUp = () => {
				const now = performance.now();
				if (now < bellyUpUntil) return;
				bellyUpUntil = now + BELLY_UP_MS;
				markActive();
				recordInteraction();
				pokeStreak = 0;
				if (pokeDecayTimer !== 0) {
					window.clearTimeout(pokeDecayTimer);
					pokeDecayTimer = 0;
				}
				if (sulking) clearSulk();
				pet.classList.remove("squish", "dizzy", "joy", "annoyed", "shaken");
				pet.offsetWidth;
				pet.classList.add("belly-up");
				sounds.play("trick");
				showDialog(pick(strings.feedback.bellyUp));
				window.setTimeout(() => pet.classList.remove("belly-up"), BELLY_UP_MS);
			};
			const trackShake = (x) => {
				const now = performance.now();
				const delta = x - shakeLegFrom;
				const dir = Math.sign(delta);
				if (dir === 0) return;
				if (shakeDir === 0) {
					if (Math.abs(delta) >= SHAKE_MIN_LEG) {
						shakeDir = dir;
						shakeLegFrom = x;
					}
					return;
				}
				if (dir === shakeDir) {
					shakeLegFrom = x;
					return;
				}
				if (Math.abs(delta) < SHAKE_MIN_LEG) return;
				shakeDir = dir;
				shakeLegFrom = x;
				if (now - shakeWindowFrom > SHAKE_WINDOW_MS) {
					shakeCount = 0;
					shakeWindowFrom = now;
				}
				shakeCount++;
				if (shakeCount >= SHAKE_REVERSALS) triggerShaken();
			};
			let dragStart = null;
			let longPressTimer;
			let longPressTriggered = false;
			const onPetPointerDown = (e) => {
				if (e.button !== 0) return;
				cancelAvoid();
				swimmer.interrupt();
				avoidCooldownUntil = performance.now() + AVOID_COOLDOWN_MS;
				markActive();
				dragStart = {
					x: e.clientX,
					y: e.clientY,
					ox: parseFloat(root.style.left) || 0,
					oy: parseFloat(root.style.top) || 0
				};
				resetShake();
				shakeLegFrom = e.clientX;
				shakeWindowFrom = performance.now();
				root.dataset.facing = swimmer.currentFacing;
				pet.setPointerCapture(e.pointerId);
				longPressTriggered = false;
				window.clearTimeout(longPressTimer);
				longPressTimer = window.setTimeout(() => {
					longPressTriggered = true;
					suppressClick = true;
					triggerPat();
				}, 700);
			};
			/**
			* 贴边挤扁。只在拖拽时判定——自己游到边上是贴着走，不是被人按上去的。
			* 台词有独立冷却，不然沿着边拖一路会一直喊。
			*/
			let squeezeSaidAt = 0;
			const updateEdge = (x, y) => {
				const maxX = Math.max(0, window.innerWidth - PET_W());
				const maxY = Math.max(0, window.innerHeight - PET_H());
				const onLeft = x <= EDGE_SLACK;
				const onRight = x >= maxX - EDGE_SLACK;
				const sideways = onLeft || onRight;
				const onTop = !sideways && y <= EDGE_SLACK;
				const onBottom = !sideways && y >= maxY - EDGE_SLACK;
				root.classList.toggle("edge-left", onLeft);
				root.classList.toggle("edge-right", onRight);
				root.classList.toggle("edge-top", onTop);
				root.classList.toggle("edge-bottom", onBottom);
				if (!sideways && !onTop && !onBottom) return;
				const now = performance.now();
				if (now - squeezeSaidAt < 4e3) return;
				squeezeSaidAt = now;
				if (sideways) {
					showDialog(pick(strings.feedback.squeezed));
					swimmer.spawnDrip(x + (onLeft ? PET_W() * .18 : PET_W() * .82), y + PET_H() * .87);
				} else {
					showDialog(pick(onTop ? strings.feedback.squashedTop : strings.feedback.squashedBottom));
					swimmer.spawnDrip(x + PET_W() * (Math.random() < .5 ? .25 : .75), y + PET_H() * .87);
				}
			};
			const clearEdge = () => {
				root.classList.remove("edge-left", "edge-right", "edge-top", "edge-bottom");
			};
			/** 拖着不放又不动：三秒后开始扭 */
			let dragIdleTimer = 0;
			/** fresh=true 表示这是人动了手才重排的，扭动该停；续问时不能清，否则刚扭就被抹掉 */
			const armDragIdle = (fresh = true) => {
				if (dragIdleTimer !== 0) window.clearTimeout(dragIdleTimer);
				if (fresh) pet.classList.remove("impatient");
				dragIdleTimer = window.setTimeout(() => {
					if (!dragging) return;
					pet.classList.add("impatient");
					showDialog(pick(strings.feedback.dragIdle));
					armDragIdle(false);
				}, DRAG_IDLE_MS);
			};
			const disarmDragIdle = () => {
				if (dragIdleTimer !== 0) {
					window.clearTimeout(dragIdleTimer);
					dragIdleTimer = 0;
				}
				pet.classList.remove("impatient");
			};
			let lastDripTime = 0;
			const onPetPointerMove = (e) => {
				if (dragStart === null) return;
				const dx = e.clientX - dragStart.x;
				const dy = e.clientY - dragStart.y;
				if (!dragging && Math.abs(dx) + Math.abs(dy) > 4) {
					dragging = true;
					suppressClick = true;
					root.classList.add("dragging");
					window.clearTimeout(longPressTimer);
					armDragIdle();
				}
				if (dragging) {
					const p = clampPos(dragStart.ox + dx, dragStart.oy + dy);
					root.style.left = `${p.x}px`;
					root.style.top = `${p.y}px`;
					trackShake(e.clientX);
					updateEdge(p.x, p.y);
					armDragIdle();
					const now = performance.now();
					if (now - lastDripTime > 380) {
						lastDripTime = now;
						swimmer.spawnDrip(p.x + PET_W() / 2, p.y + PET_H() * .87);
					}
				}
			};
			const endDrag = () => {
				if (dragStart === null) return;
				dragStart = null;
				resetShake();
				disarmDragIdle();
				clearEdge();
				if (dragging) {
					dragging = false;
					root.classList.remove("dragging");
					const px = parseFloat(root.style.left) || 0;
					const py = parseFloat(root.style.top) || 0;
					swimmer.spawnSplash(px + PET_W() / 2, py + PET_H() * .79, 4);
					swimmer.spawnWaterRipple(px + PET_W() / 2, py + PET_H() * .79, false);
					savePos();
					root.dataset.facing = swimmer.currentFacing;
					pet.style.transform = `scaleX(${swimmer.currentFacing === "left" ? 1 : -1}) rotate(0deg)`;
				}
				window.clearTimeout(longPressTimer);
				if (longPressTriggered) {
					longPressTriggered = false;
					window.setTimeout(() => {
						suppressClick = false;
					}, 300);
				} else window.setTimeout(() => {
					suppressClick = false;
				}, 0);
			};
			let sleepTimer;
			let sleeping = false;
			const markActive = () => {
				window.clearTimeout(sleepTimer);
				if (sleeping) {
					sleeping = false;
					root.classList.remove("sleeping");
					pet.classList.add("spouting");
					window.setTimeout(() => pet.classList.remove("spouting"), 1400);
					showDialog(strings.feedback.wake);
					sounds.play("bubble");
				}
				sleepTimer = window.setTimeout(() => {
					if (visualState !== "idle" || dragging) {
						markActive();
						return;
					}
					sleeping = true;
					root.classList.add("sleeping");
					showDialog(strings.feedback.sleep);
				}, SLEEP_MS);
			};
			const wake = () => {
				if (sleeping) {
					sleeping = false;
					root.classList.remove("sleeping");
					pet.classList.add("spouting");
					window.setTimeout(() => pet.classList.remove("spouting"), 1400);
				}
			};
			let eyeRaf = 0;
			const onMouseMove = (e) => {
				if (root.classList.contains("hidden")) return;
				markActive();
				maybeAvoid(e);
				maybePat(e);
				if (pupil === null || eyeRaf !== 0) return;
				eyeRaf = window.requestAnimationFrame(() => {
					eyeRaf = 0;
					const rect = pet.getBoundingClientRect();
					const cx = rect.left + rect.width / 2;
					const cy = rect.top + rect.height / 2;
					const dx = Math.max(-.18, Math.min(.18, (e.clientX - cx) / 500));
					const dy = Math.max(-.15, Math.min(.15, (e.clientY - cy) / 450));
					pupil.style.transform = `translate(${dx}px, ${dy}px)`;
				});
			};
			pet.addEventListener("click", () => {
				if (suppressClick) return;
				if (visualState === "error" && lastErrorText !== "") {
					try {
						navigator.clipboard?.writeText(lastErrorText);
					} catch {}
					showDialog(strings.feedback.errorCopied);
					return;
				}
				if (visualState === "disappointed" && driver.soothe()) {
					triggerComfort();
					return;
				}
				markActive();
				bumpPokeStreak();
				if (sulking) {
					recordInteraction();
					showDialog(pick(strings.feedback.pokeSulk));
					return;
				}
				if (pokeStreak >= POKE_SULK_AT) {
					triggerSulk();
					return;
				}
				if (pokeStreak >= POKE_ANNOYED_AT) {
					triggerAnnoyed();
					return;
				}
				const rand = Math.random();
				if (rand < .65) triggerSquish();
				else if (rand < .85) triggerRoll();
				else triggerDizzy();
			});
			pet.addEventListener("dblclick", () => {
				if (currentTier() >= BOND_THRESHOLDS.length - 1) triggerBellyUp();
				else triggerRoll();
			});
			pet.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				cancelAvoid();
				avoidCooldownUntil = performance.now() + AVOID_COOLDOWN_MS;
				openMenu(e.clientX, e.clientY);
			});
			pet.addEventListener("pointerdown", onPetPointerDown);
			pet.addEventListener("pointermove", onPetPointerMove);
			pet.addEventListener("pointerup", endDrag);
			pet.addEventListener("pointercancel", endDrag);
			document.addEventListener("pointerdown", onDocPointerDown);
			document.addEventListener("keydown", markActive);
			document.addEventListener("wheel", markActive, { passive: true });
			window.addEventListener("mousemove", onMouseMove, { passive: true });
			window.addEventListener("resize", onResize);
			const driver = new WhaleDriver();
			const sessions = ctx.sessions;
			const uiConversation = ctx.uiConversation;
			let unsubList;
			let unsubSession;
			let unsubChat;
			let face;
			let chat;
			let boundSession;
			let prevSessionId = void 0;
			let isFirstSessionSync = true;
			const statusRaw = ctx.uiSession?.sessionStatus;
			const statusSource = typeof statusRaw?.getSnapshot === "function" ? statusRaw : void 0;
			/** 把两处订阅合成状态机需要的"最小快照面"。 */
			const composeSnapshot = () => {
				if (face === void 0) return void 0;
				const session = face.getSnapshot();
				const legacy = chat?.legacy;
				const partial = legacy?.partial ?? null;
				const status = prevSessionId === void 0 ? void 0 : statusSource?.getSnapshot().get(prevSessionId);
				return {
					running: session.running,
					partial,
					runningCalls: legacy?.runningCalls ?? [],
					partialToolCall: partialHasToolCall(partial),
					lastAgentError: session.lastAgentError,
					openError: session.openError,
					turnEnds: legacy?.turnEnds,
					pending: status?.pendingInteraction !== void 0 ? [status.pendingInteraction] : session.pending
				};
			};
			let followAll = true;
			try {
				followAll = localStorage.getItem(FOLLOW_ALL_KEY) !== "0";
			} catch {}
			let otherRunning = 0;
			let otherWaiting = 0;
			/** 别的会话的事，要在状态切换的那句台词之后再说，不然会被盖掉 */
			let otherNews = "";
			const prevOtherRunning = /* @__PURE__ */ new Map();
			const prevOtherWaiting = /* @__PURE__ */ new Map();
			let statusPrimed = false;
			const rowOf = (id) => (sessions?.list.getSnapshot().byId)?.[id];
			let badgeCount = 0;
			const updateBadge = () => {
				const n = followAll ? otherRunning : 0;
				badge.hidden = n === 0;
				badge.textContent = n > 9 ? "9+" : String(n);
				badge.title = n === 0 ? "" : strings.multi.badge(n);
				if (n > 0 && n !== badgeCount) {
					badge.classList.remove("pop");
					badge.offsetWidth;
					badge.classList.add("pop");
				}
				if (n > 0) startFollow();
				badgeCount = n;
			};
			const recountOthers = () => {
				if (statusSource === void 0) return;
				let running = 0;
				let waiting = 0;
				let done;
				let newlyWaiting;
				for (const [id, st] of statusSource.getSnapshot()) {
					const row = rowOf(id);
					if (row?.parentId !== void 0 || row?.origin === "subagent") continue;
					if (id === prevSessionId) {
						prevOtherRunning.delete(id);
						prevOtherWaiting.delete(id);
						continue;
					}
					const isRunning = st.running === true;
					const isWaiting = st.pendingInteraction !== void 0;
					if (isRunning) running++;
					if (isWaiting) waiting++;
					if (statusPrimed && prevOtherRunning.get(id) === true && st.running === false) done ??= id;
					if (statusPrimed && isWaiting && prevOtherWaiting.get(id) !== true) newlyWaiting ??= id;
					prevOtherRunning.set(id, isRunning);
					prevOtherWaiting.set(id, isWaiting);
				}
				statusPrimed = true;
				otherRunning = running;
				otherWaiting = waiting;
				updateBadge();
				if (followAll) {
					if (done !== void 0) {
						driver.celebrateOther(performance.now());
						otherNews = strings.multi.doneOther(rowOf(done)?.displayTitle ?? "");
					} else if (newlyWaiting !== void 0) otherNews = strings.multi.waitingOther(rowOf(newlyWaiting)?.displayTitle ?? "");
				}
			};
			const onStatus = () => {
				recountOthers();
				onSnapshot();
			};
			let wakeTimer = 0;
			const clearWake = () => {
				if (wakeTimer !== 0) {
					window.clearTimeout(wakeTimer);
					wakeTimer = 0;
				}
			};
			const scheduleWake = () => {
				clearWake();
				const now = performance.now();
				const at = driver.nextDeadline(now);
				if (at === null) return;
				wakeTimer = window.setTimeout(() => {
					wakeTimer = 0;
					onSnapshot();
				}, Math.max(16, at - now + 24));
			};
			/** 当前会话闲着时，别的会话的状态顶上来：有人等确认 > 有人在跑 */
			const withOthers = (state) => {
				if (!followAll || state !== "idle") return state;
				if (otherWaiting > 0) return "wait";
				if (otherRunning > 0) return "working";
				return state;
			};
			let busyTier = 0;
			let peakRunning = 0;
			const trackConcurrency = (currentRunning) => {
				if (!followAll || statusSource === void 0) {
					busyTier = 0;
					peakRunning = 0;
					return;
				}
				const total = otherRunning + (currentRunning ? 1 : 0);
				const tier = total >= OVERTIME_AT ? 2 : total >= 2 ? 1 : 0;
				if (tier > busyTier) {
					otherNews = pick(tier === 2 ? strings.multi.overtime(total) : strings.multi.parallel(total));
					busyTier = tier;
				}
				peakRunning = Math.max(peakRunning, total);
				if (total === 0) {
					if (peakRunning >= 2) otherNews = pick(strings.multi.allDone);
					busyTier = 0;
					peakRunning = 0;
				}
			};
			let lastShown = null;
			const announceOtherNews = () => {
				if (otherNews === "") return;
				showDialog(otherNews);
				otherNews = "";
			};
			const onSnapshot = () => {
				const snapObj = composeSnapshot();
				if (snapObj === void 0) {
					clearWake();
					lastErrorText = "";
					trackConcurrency(false);
					const shown = withOthers("idle");
					setState(shown, lastShown !== null && shown !== lastShown);
					lastShown = shown;
					announceOtherNews();
					updateTicker("");
					return;
				}
				lastErrorText = snapObj.lastAgentError ?? (snapObj.openError != null ? "open-error" : "");
				trackConcurrency(snapObj.running);
				const step = driver.step(snapObj, performance.now());
				const shown = withOthers(step.state);
				setState(shown, lastShown !== null && shown !== lastShown);
				lastShown = shown;
				announceOtherNews();
				updateTicker(tickerOn && step.state === "think" ? partialTextOf(snapObj.partial) : "");
				scheduleWake();
			};
			const syncSession = () => {
				const id = currentSessionId(sessions.list.getSnapshot());
				const binding = id === void 0 ? void 0 : sessions.binding(id);
				if (!isFirstSessionSync && id === prevSessionId && binding === boundSession) return;
				unsubSession?.();
				unsubChat?.();
				unsubSession = void 0;
				unsubChat = void 0;
				face = void 0;
				chat = void 0;
				boundSession = binding;
				if (id !== void 0 && id !== prevSessionId && !isFirstSessionSync) triggerWelcome();
				const switched = id !== prevSessionId;
				if (switched && !isFirstSessionSync) driver.reset();
				prevSessionId = id;
				isFirstSessionSync = false;
				if (switched) recountOthers();
				if (id === void 0 || binding === void 0) {
					onSnapshot();
					return;
				}
				face = binding.session;
				unsubSession = face.subscribe(onSnapshot);
				try {
					const target = uiConversation.binding(binding).target("chat");
					chat = target.getSnapshot();
					unsubChat = target.subscribe(() => {
						chat = target.getSnapshot();
						onSnapshot();
					});
				} catch {
					chat = void 0;
				}
				onSnapshot();
			};
			let unsubStatus;
			if (sessions !== void 0) {
				unsubList = sessions.list.subscribe(syncSession);
				syncSession();
				unsubStatus = statusSource?.subscribe(onStatus);
				onStatus();
			}
			markActive();
			try {
				if (localStorage.getItem(HIDDEN_KEY) === "1") {
					root.classList.add("hidden");
					createMini();
				}
			} catch {}
			startAutoHide();
			let localeUnsub;
			const applyLocale = (nextLocale) => {
				if (locale === nextLocale) return;
				locale = nextLocale;
				strings = getStrings(locale);
				pet.setAttribute("aria-label", strings.aria.pet);
				if (mini !== null) mini.setAttribute("aria-label", strings.aria.mini);
				syncMiniState(visualState);
				if (menu.classList.contains("open")) {
					buildMenu(menuMode);
					positionMenu(lastMenuPos.x, lastMenuPos.y);
				}
			};
			localeUnsub = localeService?.subscribe(() => {
				const nextLocale = localeService.getLocale().active === "en" ? "en" : "zh";
				applyLocale(nextLocale);
			});
			const chatterTick = () => {
				if (currentTier() < BOND_THRESHOLDS.length - 1) return;
				if (visualState !== "idle" || document.hidden || sleeping || sulking || root.classList.contains(HIDDEN_CLASS) || menu.classList.contains("open")) return;
				if (Math.random() > CHATTER_CHANCE) return;
				showDialog(pick(strings.bond.chatter));
			};
			const chatterTimer = window.setInterval(chatterTick, CHATTER_TICK_MS);
			checkBondUp();
			const dispose = () => {
				window.clearTimeout(sleepTimer);
				if (sedentaryTimer !== 0) window.clearInterval(sedentaryTimer);
				window.clearInterval(chatterTimer);
				if (dragIdleTimer !== 0) window.clearTimeout(dragIdleTimer);
				restoreTitle();
				if (pokeDecayTimer !== 0) window.clearTimeout(pokeDecayTimer);
				if (sulkTimer !== 0) window.clearTimeout(sulkTimer);
				window.clearTimeout(dialogTimer);
				if (eyeRaf !== 0) window.cancelAnimationFrame(eyeRaf);
				unsubList?.();
				unsubStatus?.();
				unsubSession?.();
				unsubChat?.();
				clearWake();
				document.removeEventListener("pointerdown", onDocPointerDown);
				document.removeEventListener("keydown", markActive);
				document.removeEventListener("wheel", markActive);
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("resize", onResize);
				document.removeEventListener("visibilitychange", onVisibility);
				document.removeEventListener("visibilitychange", onFollowVisibility);
				if (followRaf !== 0) window.cancelAnimationFrame(followRaf);
				themeObserver.disconnect();
				clearIdleMicro();
				cancelAvoid();
				swimmer.dispose();
				sounds.dispose();
				localeUnsub?.();
				window.clearTimeout(patEndTimer);
				if (autoHideTimer !== void 0) window.clearInterval(autoHideTimer);
				hideTicker();
				ticker.remove();
				removeMini();
				root.remove();
				style.remove();
			};
			quitWhale = dispose;
			return dispose;
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
