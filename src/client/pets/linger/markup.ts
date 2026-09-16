// 灵儿（Q 版 3 头身仙侠少女）：手写内联 SVG，结构约定与鲸鱼/猫完全一致（见 pets/types.ts）。
//
// 造型依据（对着参考图逐项对齐）：
//   发型：黑长发中分、额头露得多；两侧偏外的双丫髻 + 蓝色发带与垂下的蓝丝带；及腰长发与鬓发
//   服装：白色交领内衬（V 形露出）＋ 蓝色外袍（带浅色滚边）＋ 大广袖（白、袖口蓝滚边、露手）
//         腰部红色细腰带打结、两条细红飘带垂到裙中段；长裙以白为主、蓝侧片 + 蓝裙摆滚边
//   配色映射（换肤依然有效）：--pw-body 蓝 / --pw-body-light 浅蓝 / --pw-body-dark 描边 / --pw-blush 红
//                            白袍固定白（专属变量 --pw-robe/--pw-robe-shade）
//
// 画布 26×35（竖版），配合 index.ts 的 size: { w: 104, h: 140 }。
// 契约部件：.body / .eye-group(.eye/.pupil-highlight/.caught-eyes/.sleep-eyes/.dizzy-eyes/.angry-eyes)
//          / .angry / .stars(.starL/.starR) / .spout-group / .code-particle(.code-fx1/.code-fx2)
//          / .keyboard-unit(.tap-k1/.tap-k2) + 结尾 6 个气泡 span
// 专属部件：.sash（红腰带飘带）/ .skirt / .hair / .ribbon（蓝发带）/ .hand-seal（掐指）/ .sword（御剑）
export const LINGER_HTML = `<svg viewBox="0 0 26 35" aria-hidden="true">
          <defs>
            <linearGradient id="lingRobe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--pw-robe,#F9FBFE)"/>
              <stop offset="0.72" style="stop-color:var(--pw-robe,#F6F9FD)"/>
              <stop offset="1" style="stop-color:var(--pw-robe-shade,#E5EBF3)"/>
            </linearGradient>
            <linearGradient id="lingBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style="stop-color:var(--pw-body,#4D6BFE)"/>
              <stop offset="1" style="stop-color:var(--pw-body-dark,#3550C9)"/>
            </linearGradient>
            <linearGradient id="lingHair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#413B4D"/>
              <stop offset="1" stop-color="#211E29"/>
            </linearGradient>
            <linearGradient id="lingBlade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#EAF8FF"/>
              <stop offset="0.5" stop-color="#FFFFFF"/>
              <stop offset="1" stop-color="#9FD8F5"/>
            </linearGradient>
          </defs>

          <g class="body">
            <!-- 及腰长发（最底层） -->
            <path class="hair" d="M8.2 5.4 C6.3 9.6 5.9 15.6 6.7 21.6 C6.8 23.0 7.7 23.6 8.8 23.2 C8.2 17.8 8.6 12.0 9.8 6.6 Z" fill="url(#lingHair)"/>
            <path class="hair" d="M17.8 5.4 C19.7 9.6 20.1 15.6 19.3 21.6 C19.2 23.0 18.3 23.6 17.2 23.2 C17.8 17.8 17.4 12.0 16.2 6.6 Z" fill="url(#lingHair)"/>

            <!-- 裙（腰为轴心）：白裙身为主，蓝只做两侧片与裙摆滚边 -->
            <g class="skirt" style="transform-origin: 13px 18.6px">
              <path d="M10.2 18.6 L15.8 18.6 C17.4 23.4 19.0 27.7 19.9 30.1 C17.5 31.0 14.8 31.4 13 31.4 C11.2 31.4 8.5 31.0 6.1 30.1 C7.0 27.7 8.6 23.4 10.2 18.6 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.22" stroke-linejoin="round"/>
              <!-- 蓝侧片（窄） -->
              <path d="M10.2 18.8 C8.9 23.4 7.4 27.4 6.3 29.9 L8.6 30.6 C8.9 26.6 9.8 22.2 11.0 18.9 Z" fill="url(#lingBlue)"/>
              <path d="M15.8 18.8 C17.1 23.4 18.6 27.4 19.7 29.9 L17.4 30.6 C17.1 26.6 16.2 22.2 15.0 18.9 Z" fill="url(#lingBlue)"/>
              <!-- 裙摆蓝滚边 -->
              <path d="M6.3 29.6 C9.0 30.6 17.0 30.6 19.7 29.6 C19.8 30.0 19.9 30.3 19.9 30.5 C17.2 31.5 8.8 31.5 6.1 30.5 C6.1 30.3 6.2 30.0 6.3 29.6 Z" style="fill:var(--pw-body,#4D6BFE)"/>
              <path d="M13 19.4 L13 30.8" fill="none" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.12" opacity=".28"/>
            </g>

            <!-- 浅蓝布鞋（裙摆下露出一点） -->
            <ellipse cx="11.4" cy="31.9" rx="1.15" ry="0.5" style="fill:var(--pw-body,#4D6BFE)"/>
            <ellipse cx="14.6" cy="31.9" rx="1.15" ry="0.5" style="fill:var(--pw-body,#4D6BFE)"/>

            <!-- 白色大广袖：外缘鼓到身体最宽处再垂下，袖口宽、滚蓝边、袖下露手 -->
            <path d="M9.3 13.9 C7.3 15.1 5.7 17.4 5.5 19.9 L5.4 25.3 C6.5 26.1 8.3 26.0 9.4 25.0 C9.6 22.4 10.0 18.8 10.6 15.9 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M16.7 13.9 C18.7 15.1 20.3 17.4 20.5 19.9 L20.6 25.3 C19.5 26.1 17.7 26.0 16.6 25.0 C16.4 22.4 16.0 18.8 15.4 15.9 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M5.5 23.5 C6.6 24.2 8.2 24.1 9.3 23.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.5" stroke-linecap="round"/>
            <path d="M20.5 23.5 C19.4 24.2 17.8 24.1 16.7 23.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.5" stroke-linecap="round"/>
            <circle class="hand" cx="7.4" cy="26.1" r="0.7" fill="#F7E0CE"/>
            <circle class="hand" cx="18.6" cy="26.1" r="0.7" fill="#F7E0CE"/>

            <!-- 白色交领内衬 + 蓝色外袍（V 领处露出白色，evenodd 挖空） -->
            <path d="M13 13.1 C10.7 13.1 8.9 14.3 8.6 16.5 L10.2 18.7 L15.8 18.7 L17.4 16.5 C17.1 14.3 15.3 13.1 13 13.1 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path fill-rule="evenodd" d="M13 13.2 C10.6 13.2 8.8 14.5 8.5 16.7 L10.2 18.7 L15.8 18.7 L17.5 16.7 C17.2 14.5 15.4 13.2 13 13.2 Z M13 14.0 C14.1 14.0 15.0 14.3 15.7 14.8 L13 18.6 L10.3 14.8 C11.0 14.3 11.9 14.0 13 14.0 Z" fill="url(#lingBlue)"/>
            <!-- 交领滚边 -->
            <path d="M10.3 14.9 L13 18.8 L15.7 14.9" fill="none" style="stroke:var(--pw-robe,#F9FBFE)" stroke-width="0.32" stroke-linecap="round" opacity=".95"/>
            <path d="M10.0 15.2 L13 19.6 L16.0 15.2" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.16" stroke-linecap="round" opacity=".8"/>

            <!-- 红腰带（细）+ 打结 + 两条细长飘带 -->
            <rect x="9.7" y="17.9" width="6.6" height="1.05" rx="0.3" style="fill:var(--pw-blush,#F0A0A0)"/>
            <circle cx="13" cy="18.45" r="0.46" style="fill:var(--pw-blush,#F0A0A0)"/>
            <path d="M12.95 18.5 C12.3 18.0 11.8 17.9 11.3 18.1" fill="none" style="stroke:var(--pw-blush,#F0A0A0)" stroke-width="0.3" stroke-linecap="round"/>
            <path d="M13.05 18.5 C13.7 18.0 14.2 17.9 14.7 18.1" fill="none" style="stroke:var(--pw-blush,#F0A0A0)" stroke-width="0.3" stroke-linecap="round"/>
            <g class="sash" style="transform-origin: 12.6px 18.6px">
              <path d="M12.6 18.7 C12.0 21.8 11.9 24.8 12.3 27.6 C12.8 27.7 13.1 27.4 13.1 27.0 C12.8 24.4 12.9 21.6 13.3 18.7 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>
            <g class="sash" style="transform-origin: 13.4px 18.6px">
              <path d="M13.4 18.7 C13.9 21.6 14.0 24.4 13.7 27.0 C13.2 27.1 12.9 26.8 12.9 26.4 C13.2 24.0 13.1 21.4 12.8 18.7 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>

            <!-- 脖子（给一点颈线，人物才立得住） -->
            <rect x="12.4" y="11.6" width="1.2" height="2.2" rx="0.35" fill="#EFCDB4"/>

            <!-- 脸：略呈鹅蛋形 -->
            <ellipse cx="13" cy="7.9" rx="4.45" ry="4.95" fill="#F7E0CE"/>
            <!-- 鬓发（细） -->
            <path d="M8.6 5.8 C7.9 8.6 8.0 11.6 8.9 13.9 C9.8 14.0 10.5 13.3 10.6 12.4 C9.9 10.1 9.8 7.9 10.3 5.9 Z" fill="url(#lingHair)"/>
            <path d="M17.4 5.8 C18.1 8.6 18.0 11.6 17.1 13.9 C16.2 14.0 15.5 13.3 15.4 12.4 C16.1 10.1 16.2 7.9 15.7 5.9 Z" fill="url(#lingHair)"/>
            <!-- 顶发 + 中分刘海（额头留得比上一版多） -->
            <path d="M13 2.0 C9.2 2.0 7.2 4.6 7.3 7.6 C7.9 6.0 8.8 4.8 9.8 4.3 C10.8 5.4 11.8 5.7 13 5.7 C14.2 5.7 15.2 5.4 16.2 4.3 C17.2 4.8 18.1 6.0 18.7 7.6 C18.8 4.6 16.8 2.0 13 2.0 Z" fill="url(#lingHair)"/>
            <path d="M13 2.4 L13 5.5" fill="none" stroke="#5A5266" stroke-width="0.16" stroke-linecap="round" opacity=".8"/>
            <!-- 双丫髻（偏外）+ 蓝发带与垂下的蓝丝带 -->
            <circle cx="9.6" cy="2.4" r="1.3" fill="url(#lingHair)"/>
            <circle cx="16.4" cy="2.4" r="1.3" fill="url(#lingHair)"/>
            <path d="M8.6 2.5 C9.0 1.8 10.2 1.7 10.6 2.4" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            <path d="M15.4 2.4 C15.8 1.7 17.0 1.8 17.4 2.5" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            <g class="ribbon" style="transform-origin: 9.6px 3.0px">
              <path d="M9.4 3.4 C8.6 5.0 8.3 6.6 8.4 8.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.32" stroke-linecap="round"/>
            </g>
            <g class="ribbon" style="transform-origin: 16.4px 3.0px">
              <path d="M16.6 3.4 C17.4 5.0 17.7 6.6 17.6 8.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.32" stroke-linecap="round"/>
            </g>

            <!-- 细眉 + 眼型 -->
            <path d="M10.15 6.95 Q11.05 6.6 11.95 6.9" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.16" stroke-linecap="round" opacity=".8"/>
            <path d="M15.85 6.95 Q14.95 6.6 14.05 6.9" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.16" stroke-linecap="round" opacity=".8"/>
            <g class="eye-group">
              <ellipse class="eye" cx="11.15" cy="8.3" rx="0.84" ry="1.02" style="fill:var(--pw-eye,#2E2A24)"/>
              <ellipse class="eye" cx="14.85" cy="8.3" rx="0.84" ry="1.02" style="fill:var(--pw-eye,#2E2A24)"/>
              <g class="pupil-highlight">
                <circle cx="11.38" cy="7.94" r="0.3" style="fill:var(--pw-pupil,#FBF8F0)"/>
                <circle cx="15.08" cy="7.94" r="0.3" style="fill:var(--pw-pupil,#FBF8F0)"/>
              </g>
              <g class="caught-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.32" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.45 7.85 L11.45 8.35 L10.45 8.85"/>
                <path d="M15.55 7.85 L14.55 8.35 L15.55 8.85"/>
              </g>
              <g class="sleep-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.28" stroke-linecap="round">
                <path d="M10.35 8.5 Q11.15 7.75 11.95 8.5"/>
                <path d="M14.05 8.5 Q14.85 7.75 15.65 8.5"/>
              </g>
              <g class="dizzy-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.24" stroke-linecap="round">
                <path d="M10.65 7.85 L11.7 8.9 M11.7 7.85 L10.65 8.9"/>
                <path d="M14.3 7.85 L15.35 8.9 M15.35 7.85 L14.3 8.9"/>
              </g>
              <g class="angry-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.28" stroke-linecap="round">
                <path d="M10.3 7.25 L11.9 7.85"/>
                <path d="M15.7 7.25 L14.1 7.85"/>
              </g>
            </g>
            <ellipse class="blush" cx="9.85" cy="10.05" rx="0.78" ry="0.42" style="fill:var(--pw-blush,#F0A0A0)" opacity=".38"/>
            <ellipse class="blush" cx="16.15" cy="10.05" rx="0.78" ry="0.42" style="fill:var(--pw-blush,#F0A0A0)" opacity=".38"/>
            <path d="M12.72 10.55 Q13 10.88 13.28 10.55" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.17" stroke-linecap="round" opacity=".75"/>

            <!-- 思考：抬手掐指（默认隐藏，think 时显示） -->
            <g class="hand-seal" style="display:none">
              <path d="M13.5 11.4 C14.5 11.5 15.2 12.2 15.2 13.1 C14.3 13.4 13.4 13.0 13.0 12.2 Z" fill="#F7E0CE" stroke="#E3BFA4" stroke-width="0.12"/>
              <path d="M14.2 11.0 L14.5 11.7 M14.9 11.2 L14.6 11.8" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.14" stroke-linecap="round" opacity=".5"/>
              <circle cx="15.6" cy="10.5" r="0.28" style="fill:var(--pw-body-light,#8FB5FF)"/>
            </g>

            <!-- 施法失败的青筋 -->
            <g class="angry" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.26" stroke-linecap="round">
              <path d="M18.8 1.6 L19.5 3.0"/>
              <path d="M20.0 2.3 L20.7 3.7"/>
            </g>

            <!-- 灵光星星 -->
            <g class="stars" style="display:none">
              <path class="starL" d="M4.7 3.0 L4.98 3.72 L5.7 4.0 L4.98 4.28 L4.7 5.0 L4.42 4.28 L3.7 4.0 L4.42 3.72 Z" fill="#FFE9A8" style="transform-origin: 4.7px 4.0px"/>
              <path class="starR" d="M21.3 2.6 L21.58 3.32 L22.3 3.6 L21.58 3.88 L21.3 4.6 L21.02 3.88 L20.3 3.6 L21.02 3.32 Z" fill="#FFE9A8" style="transform-origin: 21.3px 3.6px"/>
            </g>

            <!-- 花瓣/灵光上升 -->
            <g class="spout-group" style="display:none">
              <circle class="spout-drop" cx="10.2" cy="0.85" r="0.38" style="fill:var(--pw-blush,#F0A0A0)" opacity=".9"/>
              <circle class="spout-drop" cx="13.0" cy="0.3" r="0.48" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".9"/>
              <circle class="spout-drop" cx="15.8" cy="0.85" r="0.38" style="fill:var(--pw-blush,#F0A0A0)" opacity=".9"/>
              <path class="spout-stream" d="M9.8 2.2 Q9.0 1.6 10.0 0.95" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-linecap="round" opacity=".85"/>
              <path class="spout-stream" d="M16.2 2.2 Q17.0 1.6 16.0 0.95" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-linecap="round" opacity=".85"/>
            </g>
          </g>

          <!-- 灵光符文（working 时浮起） -->
          <g class="code-particle" style="display:none">
            <path class="code-fx1" d="M6.0 24.6 L6.25 25.25 L6.9 25.5 L6.25 25.75 L6.0 26.4 L5.75 25.75 L5.1 25.5 L5.75 25.25 Z" style="fill:var(--pw-body-light,#8FB5FF)"/>
            <path class="code-fx2" d="M20.0 23.8 L20.25 24.45 L20.9 24.7 L20.25 24.95 L20.0 25.6 L19.75 24.95 L19.1 24.7 L19.75 24.45 Z" style="fill:var(--pw-body,#4D6BFE)"/>
          </g>

          <!-- 法阵（working 时出现，替代键盘） -->
          <g class="keyboard-unit" style="display:none">
            <ellipse cx="13" cy="29.4" rx="5.9" ry="1.5" style="fill:var(--pw-body-dark,#3550C9)" opacity=".26"/>
            <g class="tap-k1">
              <circle cx="13" cy="28.1" r="4.8" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-dasharray="1.1 .7" opacity=".9"/>
              <circle cx="13" cy="28.1" r="3.4" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.2" stroke-dasharray=".5 .9" opacity=".75"/>
            </g>
            <g class="tap-k2">
              <path d="M10.3 26.2 L10.6 27.0 M10.9 26.2 L10.6 27.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
              <path d="M15.7 26.2 L15.4 27.0 M15.1 26.2 L15.4 27.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
            </g>
          </g>

          <!-- 御剑：剑身 + 剑格 + 剑柄，御剑飞行时出现 -->
          <g class="sword" style="display:none">
            <ellipse cx="12.2" cy="32.4" rx="8.6" ry="1.7" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".32"/>
            <path d="M2.2 31.9 L20.6 30.9 L21.0 32.0 L2.2 33.0 Z" fill="url(#lingBlade)" stroke="#9BD4F0" stroke-width="0.14" stroke-linejoin="round"/>
            <path d="M2.6 32.2 L20.4 31.25" fill="none" stroke="#FFFFFF" stroke-width="0.2" opacity=".9"/>
            <path d="M20.6 30.3 L21.1 32.4 L21.6 32.4 L21.2 30.3 Z" fill="#8A7A5E"/>
            <path d="M21.5 30.8 L23.7 30.7 L23.9 31.8 L21.7 32.0 Z" fill="#6B5A46"/>
            <path d="M1.6 31.4 L4.4 32.2 L1.6 33.4 Z" fill="#DFF3FF" opacity=".9"/>
          </g>
        </svg>
        <span class="bubble"></span>
        <span class="bubble b2"></span>
        <span class="bubble b3"></span>
        <span class="bubble-blue"></span>
        <span class="bubble-blue bb2"></span>
        <span class="bubble-blue bb3"></span>`
