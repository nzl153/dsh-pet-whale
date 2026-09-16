// 小猫专属文案：覆盖 i18n.ts 里"鲸鱼口吻"的基准文案。
//
// 为什么需要它：基准文案是给鲸鱼写的——"正在深潜检索知识库""游一游，活动一下"，
// 这些话从一只猫嘴里说出来很违和。这里只写**要改的条目**，其余自动回落基准。
// 台词池（string[]）整组替换，不会与鲸鱼的句子混合。
//
// 想给新宠物定制：复制这个文件，把口吻换成该宠物的，然后在 pets/<id>/index.ts 里挂上 text。
import type { PetTextOverrides } from '../../i18n'

const zh: PetTextOverrides = {
  status: {
    idle: [
      '小猫趴在这儿呢~ 点我可以戳戳哦 🐱',
      '今天有什么新任务？我盯着屏幕呢 👀',
      '甩甩尾巴，随时可以开工！',
      '（在原地踩了踩奶）',
    ],
    think: [
      '正盯着屏幕梳理线索... 🔍',
      '让我想想这一步该怎么走…',
      '尾巴尖轻轻抽动，脑子在转 🧠',
      '趴在键盘边等你说完',
    ],
    working: ['认真敲代码中！⚡', '爪子噼里啪啦按着键盘 ⌨️', '正在调用 Agent 工具执行任务！'],
    celebrate: ['太棒啦！任务圆满搞定~ 🎉', '测试全绿，可以舔爪子收工了 ✨', '（开心地打了个滚）'],
    error: ['炸毛了！正在发抖求救 🙀', '捕获到一个异常，正在尝试自愈...', '呜——毛都竖起来了 >_<'],
    wait: ['主人，这里需要你确认一下 🙋', '等你拍板呢，我先把进度停在这里~', '歪头看你：要不要继续？ ✋'],
    disappointed: ['呜... 刚刚没发挥好，耳朵都耷拉了 🥺', '失败是成功之母，我再缓缓~', '下次一定会更好的...'],
  },
  bond: {
    levelUp: ['', '好像... 跟你熟起来了呢 🐱✨', '已经离不开你啦，别丢下我哦 (´∀｀)♡'],
    poke: [
      ['……（慢慢眨了下眼）', '喵？', '唔，痒。', '（尾巴甩了一下）'],
      [
        '呼噜呼噜~ 戳到软软的肚子啦！',
        '好痒呀~ 哈哈哈 (≧▽≦)',
        '猫猫活力 +10！继续加油~',
        '甩甩尾巴，心情超棒 ✨',
      ],
      [
        '又戳我~ 就知道你闲不住 (´∀｀)',
        '嘿嘿，今天也来找我玩啦 ♡',
        '再多摸一会儿嘛，我不介意的 🐱',
        '（主动翻过身，把肚皮露给你）',
      ],
    ],
    welcome: ['你好，我是这儿的小猫 🐱', '欢迎回来，今天也一起加油吧！🐱✨', '你来啦！我一直在窗边等你 🐱✨'],
    chatter: [
      '喵~ 我在这儿哦 🐱',
      '（悄悄看了你一眼）',
      '今天也一起呢，真好 ✨',
      '（用尾巴轻轻扫了扫你）',
      '不打扰你，就是想喵一声 🐾',
    ],
  },
  panel: {
    // 自主巡游这套动作对猫就是"到处溜达"，不叫游泳
    swim: '🐾 巡逻',
  },
  feedback: {
    roll: '打个滚给你看！(≧∇≦)ﾉ ✨',
    feed: '嚼嚼嚼... 小鱼干真好吃！美味~ 🐟',
    hidden: '我先躲到右下角啦，想我随时点 🐱',
    shown: '回来啦！想我了没~ 🐱',
    schedule1h: '好~ 1 小时后我会自己躲到右下角 🐱',
    scheduleDaily: '记下啦：每天 22:00 自动躲到右下角 🌙',
    sleep: '呼噜噜... 蜷成一团，做小鱼干的梦 (Zzz) 💤',
    swim: [
      '溜达一圈，活动一下~ 🐱',
      '换个角度看主人 ✨',
      '巡视领地中，一切正常 👑',
      '踮着脚走，不打扰你 🐾',
      '尾巴竖起来，心情不错 🐱',
    ],
    swimOn: '巡逻模式已开启，我会自己到处溜达 🐱🐾',
    swimOff: '巡逻模式已关闭，我乖乖待命~',
    joy: ['呼噜呼噜，最喜欢主人啦~ 🥰', '好开心！能量充满啦~ ✨', '（用脑袋蹭了蹭你）💖', '尾巴翘得高高的，心情极佳 🐱'],
    pokeDizzy: ['哎呀，轻轻戳嘛，有点小晕乎 @-@', '晕头转向了... 别戳太用力呀 🥺', '晃晃脑袋，差点被戳倒啦 ~'],
    pokeAnnoyed: ['喂喂喂，戳上瘾啦？(￣▽￣)"', '再戳我就要跑开咯 ~', '好啦好啦，知道你在了 🐱', '肚子都要被戳扁了啦 >_<'],
    pokeSulk: ['哼，不理你了 (￣ε(#￣)', '猫猫罢工中，请稍后再试 💤', '生气了！要摸摸才理你 (｀へ´)'],
    comfort: ['呜... 谢谢你还在 (´;ω;`)', '被摸了摸头，好像又有力气了 ✨', '有你在就没关系啦，再来一次！🐱'],
    shaken: ['呜哇——太晕了！别甩啦 @_@', '天旋地转... 我要吐毛球了 🧶', '停停停！毛都炸开啦 >_<', '眼冒金星... 让我缓缓 (@_@;)'],
    bellyUp: [
      '翻个肚皮给你看~ 只对你哦 ♡',
      '咕噜噜——肚皮朝天，最舒服的姿势 (´∀｀)',
      '晒肚皮时间！别戳痒痒肉 🐱',
      '完全放松状态，可以随便摸 ✨',
    ],
    dragIdle: ['举着不动... 手不酸吗 (・_・)', '要放我下来了吗，还是继续举着 ~', '悬在半空有点没安全感呀 🥺', '喂——还在吗？我还挂着呢 🐱'],
    sizeSet: (name) => `变成${name}号啦~ 合适吗 🐱`,
    sedentarySet: (min) => `好，坐满 ${min} 分钟我就过来蹭蹭你 ⏰`,
    restNudge: [
      '坐好久啦，起来伸个懒腰吧 🐱',
      '喝口水？我陪你歇一会儿 ☕',
      '眼睛也要休息的，看看远处吧 ✨',
      '猫都睡一轮了，你也歇会儿吧 💤',
    ],
  },
  aria: {
    mini: '显示桌宠小猫',
    miniTitle: (state) => `桌宠小猫（${state}）· 点我召回，可拖拽移动`,
  },
}

const en: PetTextOverrides = {
  status: {
    idle: [
      'Cat on standby~ Click me for a poke! 🐱',
      'Any new tasks today? I am watching the screen 👀',
      'Swishing my tail, ready to go!',
      '(kneading the spot I am sitting on)',
    ],
    think: [
      'Staring at the screen, sorting out the clues... 🔍',
      'Let me think about how to approach this…',
      'Tail tip twitching — the brain is working 🧠',
      'Sitting by the keyboard, waiting for you to finish',
    ],
    working: ['Typing code seriously! ⚡', 'Paws clattering on the keyboard ⌨️', 'Calling agent tools to get things done!'],
    celebrate: ['Yay! Task completed~ 🎉', 'All tests green — time to groom my paws ✨', '(happily rolls over)'],
    error: ['Fur standing on end! Shaking for help 🙀', 'Caught an exception, trying to self-heal...', 'Mrrp — my fur is all puffed up >_<'],
    wait: ['Hey, I need your confirmation here 🙋', 'Waiting for your call—I will hold right here~', 'Tilting my head: shall we continue? ✋'],
    disappointed: ['Aww... that did not go well, my ears are drooping 🥺', 'Failure is the mother of success, give me a moment~', 'I will do better next time...'],
  },
  bond: {
    levelUp: ['', 'Feels like... we are getting close 🐱✨', 'I cannot do without you now, do not leave me (´∀｀)♡'],
    poke: [
      ['……(slowly blinks)', 'Meow?', 'Mm, ticklish.', '(flicks tail once)'],
      [
        'Purr purr~ you poked my soft belly!',
        'So ticklish~ hahaha (≧▽≦)',
        'Cat energy +10! Keep going~',
        'Tail swish, feeling great ✨',
      ],
      [
        'Poking me again~ I know you cannot sit still (´∀｀)',
        'Hehe, you came to play again today ♡',
        'Pet me a bit longer, I do not mind 🐱',
        '(rolls over and shows you the belly)',
      ],
    ],
    welcome: ['Hi, I am the cat here 🐱', 'Welcome back, let us do our best today too! 🐱✨', 'You are here! I was waiting by the window 🐱✨'],
    chatter: [
      'Meow~ I am right here 🐱',
      '(quietly glances at you)',
      'Together again today, nice ✨',
      '(brushes you lightly with the tail)',
      'Not disturbing you, just saying meow 🐾',
    ],
  },
  panel: {
    // Autonomous roaming reads as "patrol" for a cat, not swimming
    swim: '🐾 Patrol',
  },
  feedback: {
    roll: 'A roll just for you! (≧∇≦)ﾉ ✨',
    feed: 'Munch munch... this dried fish is great! Yummy~ 🐟',
    hidden: 'I will hide in the corner. Call me anytime 🐱',
    shown: 'I am back! Did you miss me~ 🐱',
    schedule1h: 'Okay~ I will hide in the corner in 1 hour 🐱',
    scheduleDaily: 'Noted: hide in the corner every day at 22:00 🌙',
    sleep: 'Purr... curled up, dreaming of dried fish (Zzz) 💤',
    swim: [
      'Taking a stroll, stretching my legs~ 🐱',
      'A different angle on you ✨',
      'Patrolling my territory, all clear 👑',
      'Walking on tiptoes so I do not disturb you 🐾',
      'Tail up, feeling good 🐱',
    ],
    swimOn: 'Patrol mode on — I will wander around on my own 🐱🐾',
    swimOff: 'Patrol mode off, I will stay put~',
    joy: ['Purr purr, you are my favorite~ 🥰', 'So happy! Fully charged~ ✨', '(headbutts you) 💖', 'Tail held high, in a great mood 🐱'],
    pokeDizzy: ['Hey, gentle pokes please, I am a bit dizzy @-@', 'Everything is spinning... not so hard 🥺', 'Shaking my head, almost got knocked over ~'],
    pokeAnnoyed: ['Hey hey hey, addicted to poking? (￣▽￣)"', 'Poke me again and I will run off ~', 'Okay okay, I know you are there 🐱', 'My belly is going flat from all this poking >_<'],
    pokeSulk: ['Hmph, not talking to you (￣ε(#￣)', 'Cat is on strike, please try later 💤', 'I am upset! Only pets will fix it (｀へ´)'],
    comfort: ['Aww... thank you for staying (´;ω;`)', 'A little headpat and I feel strong again ✨', 'With you here it is fine, let us try again! 🐱'],
    shaken: [
      'Whoa—too dizzy! Stop shaking me @_@',
      'The world is spinning... I am going to cough up a hairball 🧶',
      'Stop stop stop! My fur is all puffed up >_<',
      'Seeing stars... give me a moment (@_@;)',
    ],
    bellyUp: [
      'Belly up, just for you ♡',
      'Flop—— belly to the sky, the comfiest pose (´∀｀)',
      'Belly-basking time! Do not poke the ticklish spot 🐱',
      'Fully relaxed, you may pet me anywhere ✨',
    ],
    dragIdle: ['Held up and not moving... is your arm okay? (・_・)', 'Putting me down, or holding on? ~', 'Dangling in mid-air is a bit scary 🥺', 'Hey—— still there? I am still hanging 🐱'],
    sizeSet: (name) => `Now I am size ${name}~ how do I look 🐱`,
    sedentarySet: (min) => `Okay, after ${min} minutes I will come nudge you ⏰`,
    restNudge: [
      'You have sat for a long while, stand up and stretch 🐱',
      'Some water? I will rest with you ☕',
      'Eyes need breaks too — look far away ✨',
      'Even a cat has napped once already; take a break 💤',
    ],
  },
  aria: {
    mini: 'Show desktop pet cat',
    miniTitle: (state) => `Desktop cat (${state}) · Click to recall, draggable`,
  },
}

export const CAT_TEXT = { zh, en }
