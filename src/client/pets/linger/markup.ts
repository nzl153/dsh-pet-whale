// 灵儿（Q 版 3 头身仙侠少女）：手写内联 SVG，结构约定与鲸鱼/猫完全一致（见 pets/types.ts）。
//
// 造型依据（对着参考图逐项对齐）：
//   发型：黑长发中分、**平顺齐刘海**（上一版画成 M 形，额头上像长了两个角，已改）、
//         两侧偏外的双丫髻 + 蓝发绳与垂下的蓝丝带、鬓发 + 搭在肩前的长发、及腰的后发
//   服装：白色交领内衬（领口白色一路露到腰）＋ 蓝色外袍（开口下移、浅色滚边）＋
//         大广袖（白、袖口蓝滚边、袖下露手）＋ 红色细腰带打结、两条细红飘带垂到裙中段
//   裙：白为主，蓝只做两侧窄片 + 裙摆滚边；裙摆收窄拉长，浅蓝布鞋露在摆下
//   配色映射：--pw-body 蓝 / --pw-body-light 浅蓝 / --pw-body-dark 描边 / --pw-blush 红
//             白袍固定白（专属变量 --pw-robe/--pw-robe-shade）
//
// 画布 26×35，配合 index.ts 的 size: { w: 104, h: 140 }。
// 契约部件：.body / .eye-group(.eye/.pupil-highlight/.caught-eyes/.sleep-eyes/.dizzy-eyes/.angry-eyes)
//          / .angry / .stars(.starL/.starR) / .spout-group / .code-particle(.code-fx1/.code-fx2)
//          / .keyboard-unit(.tap-k1/.tap-k2) + 结尾 6 个气泡 span
// 专属部件：.sash（红腰带飘带）/ .skirt / .hair / .hair-front（肩前发）/ .ribbon（蓝发带）
//          / .hand-seal（掐指）/ .sword（御剑）
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
            <!-- 及腰后发（最底层，两侧垂下） -->
            <path class="hair" d="M8.2 5.2 C6.2 9.8 5.8 16.2 6.6 22.4 C6.7 23.8 7.6 24.4 8.7 24.0 C8.1 18.2 8.5 12.0 9.7 6.4 Z" fill="url(#lingHair)"/>
            <path class="hair" d="M17.8 5.2 C19.8 9.8 20.2 16.2 19.4 22.4 C19.3 23.8 18.4 24.4 17.3 24.0 C17.9 18.2 17.5 12.0 16.3 6.4 Z" fill="url(#lingHair)"/>

            <!-- 裙：收窄拉长，白为主 + 蓝侧片 + 蓝裙摆滚边 -->
            <g class="skirt" style="transform-origin: 13px 18.6px">
              <path d="M10.2 18.6 L15.8 18.6 C17.2 23.6 18.4 28.6 19.2 32.2 C16.9 33.0 14.7 33.4 13 33.4 C11.3 33.4 9.1 33.0 6.8 32.2 C7.6 28.6 8.8 23.6 10.2 18.6 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
              <path d="M10.2 18.8 C9.0 23.6 7.8 28.4 6.9 32.0 L9.0 32.7 C9.3 28.4 10.1 23.4 11.1 18.9 Z" fill="url(#lingBlue)"/>
              <path d="M15.8 18.8 C17.0 23.6 18.2 28.4 19.1 32.0 L17.0 32.7 C16.7 28.4 15.9 23.4 14.9 18.9 Z" fill="url(#lingBlue)"/>
              <path d="M6.9 31.7 C9.4 32.6 16.6 32.6 19.1 31.7 C19.2 32.0 19.2 32.2 19.2 32.4 C16.8 33.2 9.2 33.2 6.8 32.4 C6.8 32.2 6.85 31.9 6.9 31.7 Z" style="fill:var(--pw-body,#4D6BFE)"/>
              <path d="M13 19.6 L13 33.0" fill="none" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.12" opacity=".26"/>
            </g>

            <!-- 浅蓝布鞋 -->
            <ellipse cx="11.4" cy="33.9" rx="1.1" ry="0.46" style="fill:var(--pw-body,#4D6BFE)"/>
            <ellipse cx="14.6" cy="33.9" rx="1.1" ry="0.46" style="fill:var(--pw-body,#4D6BFE)"/>

            <!-- 白色大广袖：外缘贴身的宽度，垂下到腿侧，袖口蓝滚边、袖下露手 -->
            <path d="M9.3 13.9 C7.6 15.2 6.3 17.6 6.1 20.1 L6.0 25.9 C7.1 26.7 8.7 26.6 9.8 25.6 C10.0 22.8 10.3 18.9 10.8 15.9 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M16.7 13.9 C18.4 15.2 19.7 17.6 19.9 20.1 L20.0 25.9 C18.9 26.7 17.3 26.6 16.2 25.6 C16.0 22.8 15.7 18.9 15.2 15.9 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M6.1 24.0 C7.2 24.7 8.6 24.6 9.7 23.7" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.46" stroke-linecap="round"/>
            <path d="M19.9 24.0 C18.8 24.7 17.4 24.6 16.3 23.7" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.46" stroke-linecap="round"/>
            <circle class="hand" cx="7.8" cy="26.7" r="0.68" fill="#F7E0CE"/>
            <circle class="hand" cx="18.2" cy="26.7" r="0.68" fill="#F7E0CE"/>

            <!-- 白色交领内衬（领口白色露到腰） -->
            <path d="M13 13.0 C10.7 13.0 9.0 14.2 8.6 16.4 L10.2 18.7 L15.8 18.7 L17.4 16.4 C17.0 14.2 15.3 13.0 13 13.0 Z" fill="url(#lingRobe)" stroke="var(--pw-body-dark,#3550C9)" stroke-width="0.2" stroke-linejoin="round"/>
            <path d="M10.9 13.4 L13 15.9 L15.1 13.4" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.2" stroke-linecap="round" opacity=".85"/>
            <!-- 蓝色外袍：开口下移（白交领露出来），下沿到腰下 -->
            <path fill-rule="evenodd" d="M13 14.7 C10.8 14.7 9.1 15.8 8.7 17.5 L6.9 21.0 C8.6 21.8 10.7 22.1 13 22.1 C15.3 22.1 17.4 21.8 19.1 21.0 L17.3 17.5 C16.9 15.8 15.2 14.7 13 14.7 Z M13 15.5 C14.1 15.5 15.0 15.8 15.7 16.3 L13 20.2 L10.3 16.3 C11.0 15.8 11.9 15.5 13 15.5 Z" fill="url(#lingBlue)"/>
            <path d="M10.3 16.4 L13 20.4 L15.7 16.4" fill="none" style="stroke:var(--pw-robe,#F9FBFE)" stroke-width="0.32" stroke-linecap="round" opacity=".95"/>
            <path d="M10.0 16.7 L13 21.2 L16.0 16.7" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.16" stroke-linecap="round" opacity=".75"/>

            <!-- 红腰带（细）+ 打结 + 两条细长飘带 -->
            <rect x="9.7" y="17.9" width="6.6" height="1.05" rx="0.3" style="fill:var(--pw-blush,#F0A0A0)"/>
            <circle cx="13" cy="18.45" r="0.44" style="fill:var(--pw-blush,#F0A0A0)"/>
            <path d="M12.95 18.5 C12.35 18.05 11.85 17.95 11.35 18.15" fill="none" style="stroke:var(--pw-blush,#F0A0A0)" stroke-width="0.28" stroke-linecap="round"/>
            <path d="M13.05 18.5 C13.65 18.05 14.15 17.95 14.65 18.15" fill="none" style="stroke:var(--pw-blush,#F0A0A0)" stroke-width="0.28" stroke-linecap="round"/>
            <g class="sash" style="transform-origin: 12.6px 18.6px">
              <path d="M12.6 18.7 C12.0 22.0 11.9 25.2 12.3 28.2 C12.8 28.3 13.1 28.0 13.1 27.6 C12.8 24.8 12.9 21.8 13.3 18.7 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>
            <g class="sash" style="transform-origin: 13.4px 18.6px">
              <path d="M13.4 18.7 C13.9 21.8 14.0 24.8 13.7 27.6 C13.2 27.7 12.9 27.4 12.9 27.0 C13.2 24.4 13.1 21.6 12.8 18.7 Z" style="fill:var(--pw-blush,#F0A0A0)"/>
            </g>

            <!-- 肩前发：两缕搭在肩头、压在衣服之上 -->
            <path class="hair-front" style="transform-origin: 9.6px 12.4px" d="M9.7 12.2 C9.0 15.2 8.8 18.6 9.2 22.0 C10.0 22.3 10.7 21.9 11.0 21.0 C10.7 18.0 10.9 15.0 11.4 12.4 Z" fill="url(#lingHair)"/>
            <path class="hair-front" style="transform-origin: 16.4px 12.4px" d="M16.3 12.2 C17.0 15.2 17.2 18.6 16.8 22.0 C16.0 22.3 15.3 21.9 15.0 21.0 C15.3 18.0 15.1 15.0 14.6 12.4 Z" fill="url(#lingHair)"/>

            <!-- 脖子 -->
            <rect x="12.4" y="11.5" width="1.2" height="2.1" rx="0.35" fill="#EFCDB4"/>

            <!-- 脸：鹅蛋形 -->
            <ellipse cx="13" cy="7.9" rx="4.4" ry="4.9" fill="#F7E0CE"/>
            <!-- 鬓发（细） -->
            <path d="M8.5 5.8 C7.8 8.6 7.9 11.6 8.8 13.9 C9.7 14.0 10.4 13.3 10.5 12.4 C9.8 10.1 9.7 7.9 10.2 5.9 Z" fill="url(#lingHair)"/>
            <path d="M17.5 5.8 C18.2 8.6 18.1 11.6 17.2 13.9 C16.3 14.0 15.6 13.3 15.5 12.4 C16.2 10.1 16.3 7.9 15.8 5.9 Z" fill="url(#lingHair)"/>
            <!-- 顶发 + 平顺齐刘海（一条光滑的弧，不再有 M 形尖角） -->
            <path d="M13 1.9 C9.5 1.9 7.4 4.3 7.3 7.2 C8.6 6.0 10.6 5.5 13 5.5 C15.4 5.5 17.4 6.0 18.7 7.2 C18.6 4.3 16.5 1.9 13 1.9 Z" fill="url(#lingHair)"/>
            <path d="M13 2.3 L13 5.4" fill="none" stroke="#5A5266" stroke-width="0.14" stroke-linecap="round" opacity=".7"/>
            <!-- 双丫髻：绑出来的小发环 + 蓝发绳 + 垂下的蓝丝带 -->
            <circle cx="9.4" cy="2.1" r="1.15" fill="url(#lingHair)"/>
            <circle cx="9.4" cy="2.05" r="0.5" fill="#4E4759"/>
            <path d="M8.5 2.6 C9.0 3.2 9.8 3.2 10.3 2.6" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.28" stroke-linecap="round"/>
            <circle cx="16.6" cy="2.1" r="1.15" fill="url(#lingHair)"/>
            <circle cx="16.6" cy="2.05" r="0.5" fill="#4E4759"/>
            <path d="M15.7 2.6 C16.2 3.2 17.0 3.2 17.5 2.6" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.28" stroke-linecap="round"/>
            <g class="ribbon" style="transform-origin: 9.4px 2.8px">
              <path d="M9.2 3.2 C8.4 4.8 8.1 6.4 8.2 8.0" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
            </g>
            <g class="ribbon" style="transform-origin: 16.6px 2.8px">
              <path d="M16.8 3.2 C17.6 4.8 17.9 6.4 17.8 8.0" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.3" stroke-linecap="round"/>
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
            <ellipse class="blush" cx="9.85" cy="10.05" rx="0.76" ry="0.4" style="fill:var(--pw-blush,#F0A0A0)" opacity=".36"/>
            <ellipse class="blush" cx="16.15" cy="10.05" rx="0.76" ry="0.4" style="fill:var(--pw-blush,#F0A0A0)" opacity=".36"/>
            <path d="M12.72 10.55 Q13 10.88 13.28 10.55" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.17" stroke-linecap="round" opacity=".75"/>

            <!-- 思考：抬手掐指（默认隐藏，think 时显示） -->
            <g class="hand-seal" style="display:none">
              <path d="M13.5 11.4 C14.5 11.5 15.2 12.2 15.2 13.1 C14.3 13.4 13.4 13.0 13.0 12.2 Z" fill="#F7E0CE" stroke="#E3BFA4" stroke-width="0.12"/>
              <path d="M14.2 11.0 L14.5 11.7 M14.9 11.2 L14.6 11.8" fill="none" style="stroke:var(--pw-eye,#2E2A24)" stroke-width="0.14" stroke-linecap="round" opacity=".5"/>
              <circle cx="15.6" cy="10.5" r="0.28" style="fill:var(--pw-body-light,#8FB5FF)"/>
            </g>

            <!-- 施法失败的青筋 -->
            <g class="angry" style="display:none;stroke:var(--pw-eye,#2E2A24)" fill="none" stroke-width="0.26" stroke-linecap="round">
              <path d="M18.6 1.5 L19.3 2.9"/>
              <path d="M19.8 2.2 L20.5 3.6"/>
            </g>

            <!-- 灵光星星 -->
            <g class="stars" style="display:none">
              <path class="starL" d="M4.6 2.9 L4.88 3.62 L5.6 3.9 L4.88 4.18 L4.6 4.9 L4.32 4.18 L3.6 3.9 L4.32 3.62 Z" fill="#FFE9A8" style="transform-origin: 4.6px 3.9px"/>
              <path class="starR" d="M21.4 2.5 L21.68 3.22 L22.4 3.5 L21.68 3.78 L21.4 4.5 L21.12 3.78 L20.4 3.5 L21.12 3.22 Z" fill="#FFE9A8" style="transform-origin: 21.4px 3.5px"/>
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
            <path class="code-fx1" d="M6.0 25.2 L6.25 25.85 L6.9 26.1 L6.25 26.35 L6.0 27.0 L5.75 26.35 L5.1 26.1 L5.75 25.85 Z" style="fill:var(--pw-body-light,#8FB5FF)"/>
            <path class="code-fx2" d="M20.0 24.4 L20.25 25.05 L20.9 25.3 L20.25 25.55 L20.0 26.2 L19.75 25.55 L19.1 25.3 L19.75 25.05 Z" style="fill:var(--pw-body,#4D6BFE)"/>
          </g>

          <!-- 法阵（working 时出现，替代键盘） -->
          <g class="keyboard-unit" style="display:none">
            <ellipse cx="13" cy="31.9" rx="5.6" ry="1.4" style="fill:var(--pw-body-dark,#3550C9)" opacity=".24"/>
            <g class="tap-k1">
              <circle cx="13" cy="31.0" r="4.5" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.26" stroke-dasharray="1.1 .7" opacity=".9"/>
              <circle cx="13" cy="31.0" r="3.2" fill="none" style="stroke:var(--pw-body,#4D6BFE)" stroke-width="0.2" stroke-dasharray=".5 .9" opacity=".75"/>
            </g>
            <g class="tap-k2">
              <path d="M10.4 29.2 L10.7 30.0 M11.0 29.2 L10.7 30.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
              <path d="M15.6 29.2 L15.3 30.0 M15.0 29.2 L15.3 30.0" fill="none" style="stroke:var(--pw-body-light,#8FB5FF)" stroke-width="0.22" stroke-linecap="round"/>
            </g>
          </g>

          <!-- 御剑：整把剑横在脚下，两端探出裙外 -->
          <g class="sword" style="display:none">
            <ellipse cx="13" cy="34.0" rx="9.6" ry="1.5" style="fill:var(--pw-body-light,#8FB5FF)" opacity=".3"/>
            <path d="M1.0 33.2 L0.1 33.9 L1.0 34.6 Z" fill="#DCEFFF" stroke="#5A6B7A" stroke-width="0.12" stroke-linejoin="round"/>
            <path d="M1.0 33.2 L22.4 32.1 L23.0 33.5 L1.0 34.6 Z" fill="url(#lingBlade)" stroke="#5A6B7A" stroke-width="0.18" stroke-linejoin="round"/>
            <path d="M1.4 33.45 L22.2 32.4" fill="none" stroke="#FFFFFF" stroke-width="0.28" opacity=".95"/>
            <path d="M1.2 31.8 L6.4 32.7" fill="none" stroke="#DFF3FF" stroke-width="0.22" stroke-linecap="round" opacity=".9"/>
            <path d="M1.0 35.0 L5.6 34.3" fill="none" stroke="#DFF3FF" stroke-width="0.2" stroke-linecap="round" opacity=".8"/>
            <path d="M22.3 31.4 L22.9 34.2 L23.6 34.2 L23.1 31.4 Z" fill="#C9A76A" stroke="#8A6F3E" stroke-width="0.1" stroke-linejoin="round"/>
            <path d="M23.4 32.2 L25.3 32.1 L25.4 33.7 L23.5 33.8 Z" fill="#6B5A46"/>
            <path d="M25.2 32.2 L25.8 32.2 L25.9 33.7 L25.3 33.7 Z" fill="#C9A76A"/>
          </g>
        </svg>
        <span class="bubble"></span>
        <span class="bubble b2"></span>
        <span class="bubble b3"></span>
        <span class="bubble-blue"></span>
        <span class="bubble-blue bb2"></span>
        <span class="bubble-blue bb3"></span>`
