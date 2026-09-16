// 灵儿（Q 版 3 头身仙侠少女）：手写内联 SVG，结构约定与鲸鱼/猫完全一致（见 pets/types.ts）。
//
// 造型依据：白+蓝主色（白内衬 + 蓝色外袍/侧片 + 浅蓝滚边）、红色腰带垂两条长飘带、
// 黑长发垂至腰、双丫髻绑蓝色发带、浅蓝布鞋。
//
// 画布 26×35（竖版），配合 index.ts 里的 size: { w: 104, h: 140 }。
// 契约部件：.body / .eye-group(.eye/.pupil-highlight/.caught-eyes/.sleep-eyes/.dizzy-eyes/.angry-eyes)
//          / .angry / .stars(.starL/.starR) / .spout-group / .code-particle(.code-fx1/.code-fx2)
//          / .keyboard-unit(.tap-k1/.tap-k2) + 结尾 6 个气泡 span
// 本角色专属部件：.sash（红腰带飘带）/ .skirt（裙摆）/ .hair（长发）/ .ribbon（发带）/ .sword（御剑）
//
// 配色映射（这样 7 套色板换肤依然有效）：
//   --pw-body        蓝（外袍、裙侧片、裙摆滚边、发带、鞋）
//   --pw-body-light  白（内衬、广袖、裙中央、滚边）
//   --pw-body-dark   深蓝（描边、暗部）
//   --pw-blush       红（腰带、腮红）—— 正好是这套造型的点睛色
//   头发与肤色用固定色，免得夜黑皮肤下变成"白毛鬼"。
export const LINGER_HTML = `<svg viewBox="0 0 26 35" aria-hidden="true">
          <defs>
            <linearGradient id="lingRobe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--pw-robe,#F7F9FC)"/>
              <stop offset="0.75" style="stop-color:var(--pw-robe,#F7F9FC)"/>
              <stop offset="1" style="stop-color:var(--pw-robe-shade,#E4EAF2)"/>
            </linearGradient>
            <linearGradient id="lingBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--pw-body,#4D6BFE)"/>
              <stop offset="1" style="stop-color:var(--pw-body-dark,#3550C9)"/>
            </linearGradient>
            <linearGradient id="lingHair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#403A4C"/>
              <stop offset="1" stop-color="#221F2A"/>
            </linearGradient>
            <linearGradient id="lingBlade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#BFE6FF"/>
              <stop offset="0.5" stop-color="#FFFFFF"/>
              <stop offset="1" stop-color="#8FD0F5"/>
            </linearGradient>
          </defs>

          <g class="body">
            <!-- 及腰长发（画在最底层，两侧垂下） -->
            <path class="hair" d="M8.3 5.8 C6.3 10.2 5.9 15.4 6.5 20.6 C6.6 22.4 7.4 23.2 8.5 22.8 C8.0 17.8 8.3 12.4 9.5 7.2 Z" fill="url(#lingHair)"/>
            <path class="hair" d="M17.7 5.8 C19.7 10.2 20.1 15.4 19.5 20.6 C19.4 22.4 18.6 23.2 17.5 22.8 C18.0 17.8 17.7 12.4 16.5 7.2 Z" fill="url(#lingHair)"/>

            <!-- 裙（腰为轴心）：白裙身 + 蓝侧片 + 浅蓝滚边 -->
            <g class="skirt" style="transform-origin: 13px 18.5px">
              <path d="M10.0 18.5 L16.0 18.5 C17.8 23.2 19.6 27.6 20.5 30.0 C17.9 31.2 14.7 31.8 13 31.8 C11.3 31.8 8.1 31.2 5.5 30.0 C6.4 27.6 8.2 23.2 10.0 18.5 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.22" stroke-linejoin="round"/>
              <!-- 两侧蓝色裙片 -->
              <path d="M10.0 18.6 C8.6 23.2 7.1 27.4 6.0 29.9 C7.4 30.4 8.5 30.7 9.5 30.9 C9.6 26.6 10.5 22.0 11.3 18.7 Z" fill="url(#lingBlue)" opacity=".95"/>
              <path d="M16.0 18.6 C17.4 23.2 18.9 27.4 20.0 29.9 C18.6 30.4 17.5 30.7 16.5 30.9 C16.4 26.6 15.5 22.0 14.7 18.7 Z" fill="url(#lingBlue)" opacity=".95"/>
              <!-- 裙摆滚边 -->
              <path d="M5.7 29.6 C8.7 30.9 17.3 30.9 20.3 29.6 L20.6 30.6 C17.3 31.9 8.7 31.9 5.4 30.6 Z" style="fill:var(--pw-body,#4D6BFE)"/>
              <path d="M13 19.2 L13 31.0" fill="none" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.12" opacity=".3"/>
            </g>

            <!-- 浅蓝布鞋 -->
            <ellipse cx="11.2" cy="31.4" rx="1.2" ry="0.52" style="fill:var(--pw-body,#4D6BFE)"/>
            <ellipse cx="14.8" cy="31.4" rx="1.2" ry="0.52" style="fill:var(--pw-body,#4D6BFE)"/>

            <!-- 白色广袖（垂袖，袖口一道浅蓝滚边） -->
            <path d="M9.2 14.2 C7.2 15.4 6.1 18.0 6.2 20.8 C6.3 22.2 7.2 22.8 8.3 22.2 C9.4 20.6 10.2 17.8 10.4 15.2 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M16.8 14.2 C18.8 15.4 19.9 18.0 19.8 20.8 C19.7 22.2 18.8 22.8 17.7 22.2 C16.6 20.6 15.8 17.8 15.6 15.2 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M6.6 20.4 C7.7 21.1 8.9 20.6 9.6 19.4" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.32" stroke-linecap="round" opacity=".85"/>
            <path d="M19.4 20.4 C18.3 21.1 17.1 20.6 16.4 19.4" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.32" stroke-linecap="round" opacity=".85"/>

            <!-- 上衣：白色交领内衬 + 蓝色外袍 -->
            <path d="M13 13.2 C10.2 13.2 8.3 14.7 8.0 17.0 L10.0 18.7 L16.0 18.7 L18.0 17.0 C17.7 14.7 15.8 13.2 13 13.2 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M9.6 14.0 C11.0 15.4 15.0 15.4 16.4 14.0 C17.2 14.5 17.8 15.5 18.0 16.8 L15.4 18.7 L13 17.0 L10.6 18.7 L8.0 16.8 C8.2 15.5 8.8 14.5 9.6 14.0 Z" fill="url(#lingBlue)"/>
            <path d="M13 14.4 L11.0 17.9 M13 14.4 L15.0 17.9" fill="none" style="stroke:var(--pw-robe,#F7F9FC)" stroke-width="0.3" stroke-linecap="round" opacity=".95"/>

            <!-- 红腰带 + 两条长飘带 -->
            <rect x="9.4" y="17.4" width="7.2" height="1.5" rx="0.35" style="fill:var(--pw-blush,#F0A0A0)"/>
            <circle cx="13" cy="18.2" r="0.5" style="fill:var(--pw-blush,#F0A0A0)"/>
            <g class="sash" style="transform-origin: 12.4px 18.4px">
              <path d="M12.4 18.6 C11.7 21.6 11.5 24.6 12.0 27.4 C12.5 27.6 12.9 27.3 13.0 26.8 C12.7 24.2 12.8 21.4 13.2 18.6 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>
            <g class="sash" style="transform-origin: 13.6px 18.4px">
              <path d="M13.6 18.6 C14.3 21.4 14.5 24.2 14.1 26.8 C13.6 27.0 13.2 26.7 13.1 26.2 C13.4 23.8 13.3 21.2 13.0 18.6 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>

            <!-- 手 -->
            <circle class="hand" cx="8.3" cy="22.0" r="0.78" fill="#F7E0CE"/>
            <circle class="hand" cx="17.7" cy="22.0" r="0.78" fill="#F7E0CE"/>

            <!-- 脖子 -->
            <rect x="12.3" y="11.8" width="1.4" height="2.2" rx="0.4" fill="#EFCDB4"/>

            <!-- 脸 -->
            <circle cx="13" cy="7.8" r="4.9" fill="#F7E0CE"/>
            <!-- 垂在脸侧的两缕鬓发 -->
            <path d="M8.2 5.6 C7.4 8.8 7.5 12.0 8.5 14.4 C9.6 14.6 10.4 13.8 10.5 12.8 C9.7 10.2 9.6 7.8 10.1 5.8 Z" fill="url(#lingHair)"/>
            <path d="M17.8 5.6 C18.6 8.8 18.5 12.0 17.5 14.4 C16.4 14.6 15.6 13.8 15.5 12.8 C16.3 10.2 16.4 7.8 15.9 5.8 Z" fill="url(#lingHair)"/>
            <!-- 顶发 + 中分刘海 -->
            <path d="M13 1.9 C8.7 1.9 6.8 4.9 7.1 7.9 C7.6 6.5 8.2 5.5 9.1 5.0 C10.2 6.8 11.5 7.2 13 6.9 C14.5 7.2 15.8 6.8 16.9 5.0 C17.8 5.5 18.4 6.5 18.9 7.9 C19.2 4.9 17.3 1.9 13 1.9 Z" fill="url(#lingHair)"/>
            <!-- 双丫髻 + 蓝色发带 -->
            <circle cx="10.4" cy="2.5" r="1.1" fill="url(#lingHair)"/>
            <circle cx="15.6" cy="2.5" r="1.1" fill="url(#lingHair)"/>
            <path d="M9.4 2.0 C10.0 1.5 10.9 1.5 11.4 2.0" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            <path d="M14.6 2.0 C15.1 1.5 16.0 1.5 16.6 2.0" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            <g class="ribbon" style="transform-origin: 10.4px 3.0px">
              <path d="M10.2 3.3 C9.0 4.4 8.3 5.8 8.1 7.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            </g>
            <g class="ribbon" style="transform-origin: 15.6px 3.0px">
              <path d="M15.8 3.3 C17.0 4.4 17.7 5.8 17.9 7.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            </g>

            <!-- 眼（细眉 + 深色眼）、腮红、小口 -->
            <path d="M10.3 6.7 Q11.3 6.35 12.25 6.6" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.18" stroke-linecap="round" opacity=".75"/>
            <path d="M15.7 6.7 Q14.7 6.35 13.75 6.6" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.18" stroke-linecap="round" opacity=".75"/>
            <g class="eye-group">
              <ellipse class="eye" cx="11.35" cy="8.3" rx="0.95" ry="1.12" style="fill:var(--pw-eye,#2E2A24)"/>
              <ellipse class="eye" cx="14.65" cy="8.3" rx="0.95" ry="1.12" style="fill:var(--pw-eye,#2E2A24)"/>
              <g class="pupil-highlight">
                <circle cx="11.62" cy="7.9" r="0.33" style="fill:var(--pw-pupil,#FBF8F0)"/>
                <circle cx="14.92" cy="7.9" r="0.33" style="fill:var(--pw-pupil,#FBF8F0)"/>
              </g>
              <g class="caught-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.34" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.65 7.8 L11.7 8.33 L10.65 8.85"/>
                <path d="M15.35 7.8 L14.3 8.33 L15.35 8.85"/>
              </g>
              <g class="sleep-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.3" stroke-linecap="round">
                <path d="M10.5 8.47 Q11.35 7.7 12.2 8.47"/>
                <path d="M13.8 8.47 Q14.65 7.7 15.5 8.47"/>
              </g>
              <g class="dizzy-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.26" stroke-linecap="round">
                <path d="M10.8 7.8 L11.9 8.9 M11.9 7.8 L10.8 8.9"/>
                <path d="M14.1 7.8 L15.2 8.9 M15.2 7.8 L14.1 8.9"/>
              </g>
              <g class="angry-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.3" stroke-linecap="round">
                <path d="M10.4 7.2 L12.1 7.85"/>
                <path d="M15.6 7.2 L13.9 7.85"/>
              </g>
            </g>
            <ellipse class="blush" cx="10.0" cy="10.0" rx="0.8" ry="0.44" style="fill:var(--pw-blush,#F0A0A0)" opacity=".4"/>
            <ellipse class="blush" cx="16.0" cy="10.0" rx="0.8" ry="0.44" style="fill:var(--pw-blush,#F0A0A0)" opacity=".4"/>
            <path d="M12.6 10.5 Q13 10.9 13.4 10.5" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.18" stroke-linecap="round" opacity=".75"/>

            <!-- 施法失败的青筋 -->
            <g class="angry" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.26" stroke-linecap="round">
              <path d="M18.7 1.7 L19.4 3.1"/>
              <path d="M19.9 2.4 L20.6 3.8"/>
            </g>

            <!-- 灵光星星 -->
            <g class="stars" style="display:none">
              <path class="starL" d="M4.9 3.2 L5.18 3.92 L5.9 4.2 L5.18 4.48 L4.9 5.2 L4.62 4.48 L3.9 4.2 L4.62 3.92 Z" fill="#FFE9A8" style="transform-origin: 4.9px 4.2px"/>
              <path class="starR" d="M21.1 2.8 L21.38 3.52 L22.1 3.8 L21.38 4.08 L21.1 4.8 L20.82 4.08 L20.1 3.8 L20.82 3.52 Z" fill="#FFE9A8" style="transform-origin: 21.1px 3.8px"/>
            </g>

            <!-- 花瓣/灵光上升（醒来与庆祝） -->
            <g class="spout-group" style="display:none">
              <circle class="spout-drop" cx="10.3" cy="0.9" r="0.38" style="fill:var(--pw-blush,#F0A0A0)" opacity=".9"/>
              <circle class="spout-drop" cx="13.0" cy="0.35" r="0.48" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".9"/>
              <circle class="spout-drop" cx="15.7" cy="0.9" r="0.38" style="fill:var(--pw-blush,#F0A0A0)" opacity=".9"/>
              <path class="spout-stream" d="M9.9 2.3 Q9.1 1.7 10.1 1.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-linecap="round" opacity=".85"/>
              <path class="spout-stream" d="M16.1 2.3 Q16.9 1.7 15.9 1.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-linecap="round" opacity=".85"/>
            </g>
          </g>

          <!-- 灵光符文（working 时浮起） -->
          <g class="code-particle" style="display:none">
            <path class="code-fx1" d="M6.0 24.2 L6.25 24.85 L6.9 25.1 L6.25 25.35 L6.0 26.0 L5.75 25.35 L5.1 25.1 L5.75 24.85 Z" style="fill:var(--pw-body-light,#8FB5FF)"/>
            <path class="code-fx2" d="M20.0 23.4 L20.25 24.05 L20.9 24.3 L20.25 24.55 L20.0 25.2 L19.75 24.55 L19.1 24.3 L19.75 24.05 Z" style="fill:var(--pw-body,#4D6BFE)"/>
          </g>

          <!-- 法阵（working 时出现，替代键盘） -->
          <g class="keyboard-unit" style="display:none">
            <ellipse cx="13" cy="28.9" rx="5.8" ry="1.5" style="fill:var(--pw-body-dark,#3550C9)" opacity=".26"/>
            <g class="tap-k1">
              <circle cx="13" cy="27.6" r="4.7" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-dasharray="1.1 .7" opacity=".9"/>
              <circle cx="13" cy="27.6" r="3.3" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.2" stroke-dasharray=".5 .9" opacity=".75"/>
            </g>
            <g class="tap-k2">
              <path d="M10.4 25.7 L10.7 26.5 M11.0 25.7 L10.7 26.5" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
              <path d="M15.6 25.7 L15.3 26.5 M15.0 25.7 L15.3 26.5" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
            </g>
          </g>

          <!-- 御剑：御剑飞行时才出现（swimming / swim-dive） -->
          <g class="sword" style="display:none">
            <path d="M1.6 32.5 L24.0 31.3 L24.6 32.2 L1.2 33.5 Z" fill="url(#lingBlade)" stroke="#9BD4F0" stroke-width="0.12" stroke-linejoin="round"/>
            <path d="M2.2 32.6 L23.6 31.45" fill="none" stroke="#FFFFFF" stroke-width="0.16" opacity=".85"/>
            <ellipse cx="13" cy="32.9" rx="7.6" ry="1.5" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".3"/>
          </g>
        </svg>
        <span class="bubble"></span>
        <span class="bubble b2"></span>
        <span class="bubble b3"></span>
        <span class="bubble-blue"></span>
        <span class="bubble-blue bb2"></span>
        <span class="bubble-blue bb3"></span>`
