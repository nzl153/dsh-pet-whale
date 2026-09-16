// 灵儿（4.3 头身仙侠少女）：手写内联 SVG，结构约定与鲸鱼/猫完全一致（见 pets/types.ts）。
//
// 比例：画布 26×48，头高约 10.4 单位，人物约 4.3 头身（上一版是 3 头身，与参考图差距主要在比例）。
//       容器 size 由 index.ts 声明（26:48 的长宽比要一致）。
//
// 造型（对着参考图逐项对齐）：
//   发型：黑长发中分 + 平顺齐刘海；两侧偏外的双丫髻（绑出来的小发环）+ 蓝发绳与垂下的蓝丝带；
//         鬓发；搭在肩前、垂到腰际的长发；背后的及臀长发
//   服装：白色交领内衬（领口白色一路露到腰带）＋ 蓝色外袍（开口到腰带、浅色滚边）＋
//         大广袖（白、袖口蓝滚边、袖下露手）＋ 红色细腰带打结、两条细红飘带垂到裙中段
//   裙：白为主，蓝只做两侧窄片 + 裙摆滚边；浅蓝布鞋露在摆下
//   配色：--pw-body 蓝 / --pw-body-light 浅蓝 / --pw-body-dark 描边 / --pw-blush 红；
//         白袍固定白（专属变量 --pw-robe/--pw-robe-shade）
//
// 契约部件：.body / .eye-group(.eye/.pupil-highlight/.caught-eyes/.sleep-eyes/.dizzy-eyes/.angry-eyes)
//          / .angry / .stars(.starL/.starR) / .spout-group / .code-particle(.code-fx1/.code-fx2)
//          / .keyboard-unit(.tap-k1/.tap-k2) + 结尾 6 个气泡 span
// 专属部件：.sash / .skirt / .hair / .hair-front / .ribbon / .hand-seal / .sword
export const LINGER_HTML = `<svg viewBox="0 0 26 48" aria-hidden="true">
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
            <!-- 及臀后发（最底层，贴身不铺开） -->
            <path class="hair" d="M9.0 5.8 C8.1 12.2 7.9 20.4 8.5 28.4 C8.7 29.4 9.3 29.8 9.9 29.4 C9.4 21.4 9.7 13.2 10.4 7.0 Z" fill="url(#lingHair)"/>
            <path class="hair" d="M17.0 5.8 C17.9 12.2 18.1 20.4 17.5 28.4 C17.3 29.4 16.7 29.8 16.1 29.4 C16.6 21.4 16.3 13.2 15.6 7.0 Z" fill="url(#lingHair)"/>

            <!-- 长裙：白为主 + 蓝侧片 + 蓝裙摆滚边 -->
            <g class="skirt" style="transform-origin: 13px 23px">
              <path d="M10.0 23.0 L16.0 23.0 C17.2 30.2 18.6 39.0 19.2 45.2 C16.9 46.0 14.7 46.4 13 46.4 C11.3 46.4 9.1 46.0 6.8 45.2 C7.4 39.0 8.8 30.2 10.0 23.0 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
              <path d="M10.0 23.2 C8.9 30.2 7.9 38.4 7.0 45.0 L9.0 45.7 C9.3 38.6 9.9 30.0 10.9 23.4 Z" fill="url(#lingBlue)"/>
              <path d="M16.0 23.2 C17.1 30.2 18.1 38.4 19.0 45.0 L17.0 45.7 C16.7 38.6 16.1 30.0 15.1 23.4 Z" fill="url(#lingBlue)"/>
              <path d="M6.9 44.6 C9.4 45.5 16.6 45.5 19.1 44.6 C19.2 44.9 19.2 45.1 19.2 45.3 C16.8 46.1 9.2 46.1 6.8 45.3 C6.8 45.1 6.85 44.9 6.9 44.6 Z" style="fill:var(--pw-body,#4D6BFE)"/>
              <path d="M13 23.8 L13 46.0" fill="none" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.1" opacity=".24"/>
            </g>

            <!-- 浅蓝布鞋 -->
            <ellipse cx="11.4" cy="46.9" rx="1.05" ry="0.44" style="fill:var(--pw-body,#4D6BFE)"/>
            <ellipse cx="14.6" cy="46.9" rx="1.05" ry="0.44" style="fill:var(--pw-body,#4D6BFE)"/>

            <!-- 手臂：袖子 + 袖口滚边 + 手是**一个整体**，动作绕肩部轴心 —— 只动手不动袖会很怪 -->
            <g class="arm" style="transform-origin: 9.4px 15.2px">
              <path d="M9.0 14.2 C7.2 15.6 5.9 18.4 5.7 21.8 L5.6 30.2 C6.8 31.1 8.6 31.0 9.7 29.9 C9.9 26.0 10.3 19.6 10.8 16.0 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
              <path d="M5.7 28.2 C6.9 29.0 8.5 28.8 9.6 27.8" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.46" stroke-linecap="round"/>
              <g class="hand">
                <path d="M7.0 30.3 C6.2 30.6 5.9 31.3 6.1 32.0 C6.3 32.7 7.0 33.0 7.7 32.9 C8.4 32.8 8.8 32.3 8.8 31.6 C8.8 30.9 8.4 30.4 7.7 30.3 Z" fill="#F7E0CE" stroke="#E8C4A8" stroke-width="0.1"/>
                <path d="M6.6 31.0 C6.1 30.7 5.7 30.7 5.5 31.0 C5.3 31.3 5.5 31.7 5.9 31.8" fill="#F7E0CE" stroke="#E8C4A8" stroke-width="0.1"/>
                <path d="M7.0 32.3 L7.0 33.0 M7.7 32.5 L7.7 33.2 M8.4 32.2 L8.4 32.9" fill="none" stroke="#E8C4A8" stroke-width="0.09" stroke-linecap="round"/>
              </g>
            </g>
            <g class="arm" style="transform-origin: 16.6px 15.2px">
              <path d="M17.0 14.2 C18.8 15.6 20.1 18.4 20.3 21.8 L20.4 30.2 C19.2 31.1 17.4 31.0 16.3 29.9 C16.1 26.0 15.7 19.6 15.2 16.0 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
              <path d="M20.3 28.2 C19.1 29.0 17.5 28.8 16.4 27.8" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.46" stroke-linecap="round"/>
              <g class="hand">
                <path d="M19.0 30.3 C19.8 30.6 20.1 31.3 19.9 32.0 C19.7 32.7 19.0 33.0 18.3 32.9 C17.6 32.8 17.2 32.3 17.2 31.6 C17.2 30.9 17.6 30.4 18.3 30.3 Z" fill="#F7E0CE" stroke="#E8C4A8" stroke-width="0.1"/>
                <path d="M19.4 31.0 C19.9 30.7 20.3 30.7 20.5 31.0 C20.7 31.3 20.5 31.7 20.1 31.8" fill="#F7E0CE" stroke="#E8C4A8" stroke-width="0.1"/>
                <path d="M19.0 32.3 L19.0 33.0 M18.3 32.5 L18.3 33.2 M17.6 32.2 L17.6 32.9" fill="none" stroke="#E8C4A8" stroke-width="0.09" stroke-linecap="round"/>
              </g>
            </g>

            <!-- 白色交领内衬（领口白色一路露到腰带） -->
            <path d="M13 14.0 C10.4 14.0 8.6 15.4 8.3 17.8 L9.9 22.6 L16.1 22.6 L17.7 17.8 C17.4 15.4 15.6 14.0 13 14.0 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M11.0 14.4 L13 17.6 L15.0 14.4" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.2" stroke-linecap="round" opacity=".85"/>
            <!-- 蓝色外袍：开口一路开到腰带，白色交领整条露出 -->
            <path fill-rule="evenodd" d="M13 15.2 C10.9 15.2 9.3 16.3 8.9 18.1 L7.0 26.4 C8.9 27.2 10.9 27.5 13 27.5 C15.1 27.5 17.1 27.2 19.0 26.4 L17.1 18.1 C16.7 16.3 15.1 15.2 13 15.2 Z M13 16.0 C14.0 16.0 14.9 16.3 15.6 16.8 L13 21.6 L10.4 16.8 C11.1 16.3 12.0 16.0 13 16.0 Z" fill="url(#lingBlue)"/>
            <path d="M10.4 16.9 L13 21.8 L15.6 16.9" fill="none" style="stroke:var(--pw-robe,#F9FBFE)" stroke-width="0.3" stroke-linecap="round" opacity=".95"/>
            <path d="M10.1 17.2 L13 22.6 L15.9 17.2" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.15" stroke-linecap="round" opacity=".7"/>

            <!-- 红腰带（细）+ 打结 + 两条细长飘带 -->
            <rect x="9.6" y="22.2" width="6.8" height="1.1" rx="0.3" style="fill:var(--pw-blush,#F0A0A0)"/>
            <circle cx="13" cy="22.78" r="0.44" style="fill:var(--pw-blush,#F0A0A0)"/>
            <path d="M12.95 22.83 C12.35 22.38 11.85 22.28 11.35 22.48" fill="none" style="stroke:var(--pw-blush,#F0A0A0)" stroke-width="0.28" stroke-linecap="round"/>
            <path d="M13.05 22.83 C13.65 22.38 14.15 22.28 14.65 22.48" fill="none" style="stroke:var(--pw-blush,#F0A0A0)" stroke-width="0.28" stroke-linecap="round"/>
            <g class="sash" style="transform-origin: 12.6px 22.9px">
              <path d="M12.6 23.0 C12.0 27.4 11.9 32.0 12.3 36.4 C12.8 36.5 13.1 36.2 13.1 35.8 C12.8 31.8 12.9 27.4 13.3 23.0 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>
            <g class="sash" style="transform-origin: 13.4px 22.9px">
              <path d="M13.4 23.0 C13.9 27.4 14.0 31.8 13.7 35.8 C13.2 35.9 12.9 35.6 12.9 35.2 C13.2 31.6 13.1 27.2 12.8 23.0 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>

            <!-- 肩前发：两条**细**发，直直垂到腰际（参考图就是这两条，不是一整片） -->
            <path class="hair-front" style="transform-origin: 10.1px 13.0px" d="M10.4 12.8 C10.0 16.6 9.9 20.6 10.1 24.8 C10.6 25.0 11.0 24.7 11.1 24.2 C10.9 20.4 11.0 16.4 11.3 13.0 Z" fill="url(#lingHair)"/>
            <path class="hair-front" style="transform-origin: 15.9px 13.0px" d="M15.6 12.8 C16.0 16.6 16.1 20.6 15.9 24.8 C15.4 25.0 15.0 24.7 14.9 24.2 C15.1 20.4 15.0 16.4 14.7 13.0 Z" fill="url(#lingHair)"/>

            <!-- 脖子 -->
            <rect x="12.4" y="12.4" width="1.2" height="2.2" rx="0.35" fill="#EFCDB4"/>

            <!-- 脸 -->
            <ellipse cx="13" cy="8.6" rx="4.4" ry="5.0" fill="#F7E0CE"/>
            <!-- 鬓发（细，只到下颌） -->
            <path d="M8.6 6.2 C8.0 9.0 8.1 12.0 8.9 14.2 C9.7 14.3 10.3 13.6 10.4 12.8 C9.7 10.6 9.6 8.6 10.1 6.4 Z" fill="url(#lingHair)"/>
            <path d="M17.4 6.2 C18.0 9.0 17.9 12.0 17.1 14.2 C16.3 14.3 15.7 13.6 15.6 12.8 C16.3 10.6 16.4 8.6 15.9 6.4 Z" fill="url(#lingHair)"/>
            <!-- 顶发 + 平顺齐刘海 -->
            <path d="M13 1.9 C9.4 1.9 7.3 4.6 7.3 8.2 C8.7 6.6 10.7 6.0 13 6.0 C15.3 6.0 17.3 6.6 18.7 8.2 C18.7 4.6 16.6 1.9 13 1.9 Z" fill="url(#lingHair)"/>
            <path d="M13 2.3 L13 5.9" fill="none" stroke="#5A5266" stroke-width="0.14" stroke-linecap="round" opacity=".7"/>
            <!-- 双丫髻：小发环 + 蓝发绳 + 垂下的蓝丝带 -->
            <circle cx="9.3" cy="2.6" r="1.15" fill="url(#lingHair)"/>
            <circle cx="9.3" cy="2.55" r="0.5" fill="#4E4759"/>
            <path d="M8.4 3.1 C8.9 3.7 9.7 3.7 10.2 3.1" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.28" stroke-linecap="round"/>
            <circle cx="16.7" cy="2.6" r="1.15" fill="url(#lingHair)"/>
            <circle cx="16.7" cy="2.55" r="0.5" fill="#4E4759"/>
            <path d="M15.8 3.1 C16.3 3.7 17.1 3.7 17.6 3.1" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.28" stroke-linecap="round"/>
            <g class="ribbon" style="transform-origin: 9.3px 3.3px">
              <path d="M9.1 3.7 C8.2 5.6 7.9 7.6 8.0 9.6" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.28" stroke-linecap="round"/>
            </g>
            <g class="ribbon" style="transform-origin: 16.7px 3.3px">
              <path d="M16.9 3.7 C17.8 5.6 18.1 7.6 18.0 9.6" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.28" stroke-linecap="round"/>
            </g>

            <!-- 细眉 + 眼型 -->
            <path d="M10.1 7.7 Q11.0 7.35 11.9 7.65" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.16" stroke-linecap="round" opacity=".8"/>
            <path d="M15.9 7.7 Q15.0 7.35 14.1 7.65" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.16" stroke-linecap="round" opacity=".8"/>
            <g class="eye-group">
              <ellipse class="eye" cx="11.15" cy="9.15" rx="0.85" ry="1.03" style="fill:var(--pw-eye,#2E2A24)"/>
              <ellipse class="eye" cx="14.85" cy="9.15" rx="0.85" ry="1.03" style="fill:var(--pw-eye,#2E2A24)"/>
              <g class="pupil-highlight">
                <circle cx="11.38" cy="8.79" r="0.3" style="fill:var(--pw-pupil,#FBF8F0)"/>
                <circle cx="15.08" cy="8.79" r="0.3" style="fill:var(--pw-pupil,#FBF8F0)"/>
              </g>
              <g class="caught-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.32" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.45 8.7 L11.45 9.2 L10.45 9.7"/>
                <path d="M15.55 8.7 L14.55 9.2 L15.55 9.7"/>
              </g>
              <g class="sleep-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.28" stroke-linecap="round">
                <path d="M10.35 9.35 Q11.15 8.6 11.95 9.35"/>
                <path d="M14.05 9.35 Q14.85 8.6 15.65 9.35"/>
              </g>
              <g class="dizzy-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.24" stroke-linecap="round">
                <path d="M10.65 8.7 L11.7 9.75 M11.7 8.7 L10.65 9.75"/>
                <path d="M14.3 8.7 L15.35 9.75 M15.35 8.7 L14.3 9.75"/>
              </g>
              <g class="angry-eyes" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.28" stroke-linecap="round">
                <path d="M10.3 8.1 L11.9 8.7"/>
                <path d="M15.7 8.1 L14.1 8.7"/>
              </g>
            </g>
            <ellipse class="blush" cx="9.8" cy="11.0" rx="0.76" ry="0.4" style="fill:var(--pw-blush,#F0A0A0)" opacity=".36"/>
            <ellipse class="blush" cx="16.2" cy="11.0" rx="0.76" ry="0.4" style="fill:var(--pw-blush,#F0A0A0)" opacity=".36"/>
            <path d="M12.72 11.45 Q13 11.78 13.28 11.45" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.17" stroke-linecap="round" opacity=".75"/>

            <!-- 思考：双掌掐诀于胸前（手随手臂抬起，这里只画指间的灵光） -->
            <g class="hand-seal" style="display:none">
              <circle cx="13" cy="21.2" r="0.5" style="fill:var(--pw-body-light,#8FB5FF)"/>
              <circle cx="13" cy="21.2" r="1.25" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.16" opacity=".7"/>
              <path d="M11.9 21.9 L11.5 22.4 M14.1 21.9 L14.5 22.4" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.14" stroke-linecap="round" opacity=".8"/>
            </g>

            <!-- 施法失败的青筋 -->
            <g class="angry" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.26" stroke-linecap="round">
              <path d="M18.7 1.9 L19.4 3.3"/>
              <path d="M19.9 2.6 L20.6 4.0"/>
            </g>

            <!-- 灵光星星 -->
            <g class="stars" style="display:none">
              <path class="starL" d="M4.6 3.4 L4.88 4.12 L5.6 4.4 L4.88 4.68 L4.6 5.4 L4.32 4.68 L3.6 4.4 L4.32 4.12 Z" fill="#FFE9A8" style="transform-origin: 4.6px 4.4px"/>
              <path class="starR" d="M21.4 3.0 L21.68 3.72 L22.4 4.0 L21.68 4.28 L21.4 5.0 L21.12 4.28 L20.4 4.0 L21.12 3.72 Z" fill="#FFE9A8" style="transform-origin: 21.4px 4.0px"/>
            </g>

            <!-- 花瓣/灵光上升 -->
            <g class="spout-group" style="display:none">
              <circle class="spout-drop" cx="10.1" cy="0.8" r="0.36" style="fill:var(--pw-blush,#F0A0A0)" opacity=".9"/>
              <circle class="spout-drop" cx="13.0" cy="0.28" r="0.46" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".9"/>
              <circle class="spout-drop" cx="15.9" cy="0.8" r="0.36" style="fill:var(--pw-blush,#F0A0A0)" opacity=".9"/>
              <path class="spout-stream" d="M9.7 2.1 Q8.9 1.5 9.9 0.9" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-linecap="round" opacity=".85"/>
              <path class="spout-stream" d="M16.3 2.1 Q17.1 1.5 16.1 0.9" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-linecap="round" opacity=".85"/>
            </g>
          </g>

          <!-- 灵光符文（working 时浮起） -->
          <g class="code-particle" style="display:none">
            <path class="code-fx1" d="M5.8 32.6 L6.05 33.25 L6.7 33.5 L6.05 33.75 L5.8 34.4 L5.55 33.75 L4.9 33.5 L5.55 33.25 Z" style="fill:var(--pw-body-light,#8FB5FF)"/>
            <path class="code-fx2" d="M20.2 31.6 L20.45 32.25 L21.1 32.5 L20.45 32.75 L20.2 33.4 L19.95 32.75 L19.3 32.5 L19.95 32.25 Z" style="fill:var(--pw-body,#4D6BFE)"/>
          </g>

          <!-- 法阵（working 时出现，替代键盘） -->
          <g class="keyboard-unit" style="display:none">
            <ellipse cx="13" cy="44.8" rx="5.8" ry="1.4" style="fill:var(--pw-body-dark,#3550C9)" opacity=".24"/>
            <g class="tap-k1">
              <circle cx="13" cy="44.0" r="4.6" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-dasharray="1.1 .7" opacity=".9"/>
              <circle cx="13" cy="44.0" r="3.3" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.2" stroke-dasharray=".5 .9" opacity=".75"/>
            </g>
            <g class="tap-k2">
              <path d="M10.3 42.2 L10.6 43.0 M10.9 42.2 L10.6 43.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
              <path d="M15.7 42.2 L15.4 43.0 M15.1 42.2 L15.4 43.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
            </g>
          </g>

          <!-- 御剑：整把剑横在脚下，两端探出裙外 -->
          <g class="sword" style="display:none">
            <ellipse cx="13" cy="47.0" rx="9.6" ry="1.4" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".3"/>
            <path d="M1.0 46.2 L0.1 46.9 L1.0 47.6 Z" fill="#DCEFFF" stroke="#5A6B7A" stroke-width="0.12" stroke-linejoin="round"/>
            <path d="M1.0 46.2 L22.4 45.1 L23.0 46.5 L1.0 47.6 Z" fill="url(#lingBlade)" stroke="#5A6B7A" stroke-width="0.18" stroke-linejoin="round"/>
            <path d="M1.4 46.45 L22.2 45.4" fill="none" stroke="#FFFFFF" stroke-width="0.28" opacity=".95"/>
            <path d="M1.2 44.8 L6.4 45.7" fill="none" stroke="#DFF3FF" stroke-width="0.22" stroke-linecap="round" opacity=".9"/>
            <path d="M1.0 48.0 L5.6 47.3" fill="none" stroke="#DFF3FF" stroke-width="0.2" stroke-linecap="round" opacity=".8"/>
            <path d="M22.3 44.4 L22.9 47.2 L23.6 47.2 L23.1 44.4 Z" fill="#C9A76A" stroke="#8A6F3E" stroke-width="0.1" stroke-linejoin="round"/>
            <path d="M23.4 45.2 L25.3 45.1 L25.4 46.7 L23.5 46.8 Z" fill="#6B5A46"/>
            <path d="M25.2 45.2 L25.8 45.2 L25.9 46.7 L25.3 46.7 Z" fill="#C9A76A"/>
          </g>
        </svg>
        <span class="bubble"></span>
        <span class="bubble b2"></span>
        <span class="bubble b3"></span>
        <span class="bubble-blue"></span>
        <span class="bubble-blue bb2"></span>
        <span class="bubble-blue bb3"></span>`
