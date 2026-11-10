// Ashi Birds - Complete 7-Bird Roster, 4-Pig Roster & 10 Grounded Physics Levels
// Ground surface is at Y = 610. All structures are mathematically stacked from Y = 610 upward.

const GY = 610; // Exact top surface of the ground

window.GROUND_SURFACE_Y = GY;

window.BIRD_TYPES = {
  red: {
    id: 'red',
    name: 'Red Ashi',
    nameTh: 'อชิแดงคลาสสิก',
    desc: 'สมดุล แม่นยำ • แตะจอขณะบินเพื่อปล่อยคลื่นเสียงกระแทก!',
    color: '#ef5350',
    accent: '#ff8a80',
    sprite: 'assets/sprites/red.png',
    radius: 24,
    drawScale: 2.35,
    density: 0.0028,
    restitution: 0.42,
    friction: 0.06,
    abilityName: 'Battle Warcry (คลื่นเสียงกระแทก)',
    hasAbility: true,
    abilityType: 'warcry'
  },
  chuck: {
    id: 'chuck',
    name: 'Chuck Ashi',
    nameTh: 'อชิเหลืองเทอร์โบ',
    desc: 'แตะจอ/คลิกขณะบินเพื่อพุ่งเทอร์โบความเร็วสูง ชนกำแพงแข็งและบล็อกพังในครั้งเดียว!',
    color: '#ffca28',
    accent: '#ffe082',
    sprite: 'assets/sprites/chuck.png',
    radius: 23,
    drawScale: 2.45,
    density: 0.0024,
    restitution: 0.38,
    friction: 0.04,
    abilityName: 'Armor Pierce Dash ⚡ (พุ่งชนกำแพงพังในทีเดียว)',
    hasAbility: true,
    abilityType: 'speed'
  },
  blues: {
    id: 'blues',
    name: 'The Blues Ashi',
    nameTh: 'แก๊งอชิฟ้า 3 พี่น้อง',
    desc: 'แตะจอ/คลิกขณะบินเพื่อแยกเป็น 3 ร่าง ทำลายน้ำแข็งและกระจกแรง 2.5 เท่า!',
    color: '#29b6f6',
    accent: '#81d4fa',
    sprite: 'assets/sprites/blue_single.png',
    queueSprite: 'assets/sprites/blues.png',
    radius: 19,
    drawScale: 2.35,
    density: 0.0021,
    restitution: 0.48,
    friction: 0.05,
    abilityName: 'Triple Split ❄️ (แยกร่าง 3 ทิศ)',
    hasAbility: true,
    abilityType: 'split'
  },
  bomb: {
    id: 'bomb',
    name: 'Bomb Ashi',
    nameTh: 'อชิดำลูกระเบิด',
    desc: 'แตะจอ/คลิก หรือชนเพื่อจุดชนวนระเบิด สร้างแรงระเบิดรอบทิศ!',
    color: '#424242',
    accent: '#ff7043',
    sprite: 'assets/sprites/bomb.png',
    radius: 27,
    drawScale: 2.4,
    density: 0.0038,
    restitution: 0.28,
    friction: 0.08,
    abilityName: 'Bomb Blast 💣 (จุดชนวนระเบิด)',
    hasAbility: true,
    abilityType: 'bomb'
  },
  stella: {
    id: 'stella',
    name: 'Stella Ashi',
    nameTh: 'อชิชมพูฟองสบู่',
    desc: 'แตะจอ/คลิกใกล้สิ่งก่อสร้างเพื่อปล่อยฟองสบู่ชมพู ยกบล็อกและหมูลอยขึ้นชั่วขณะ!',
    color: '#ec407a',
    accent: '#f48fb1',
    sprite: 'assets/sprites/stella.png',
    radius: 22,
    drawScale: 2.4,
    density: 0.0024,
    restitution: 0.52,
    friction: 0.05,
    abilityName: 'Bubble Lift 🫧 (ฟองสบู่ลอยฟ้า)',
    hasAbility: true,
    abilityType: 'bubble'
  },
  terence: {
    id: 'terence',
    name: 'Terence Ashi',
    nameTh: 'พี่ใหญ่อชิแดงยักษ์',
    desc: 'ตัวใหญ่ยักษ์ มวลหนักพิเศษ • แตะเพื่อทิ้งดิ่งลงพื้นกระแทกศัตรู!',
    color: '#b71c1c',
    accent: '#ef9a9a',
    sprite: 'assets/sprites/terence.png',
    radius: 33,
    drawScale: 2.35,
    density: 0.0085,
    restitution: 0.22,
    friction: 0.07,
    abilityName: 'Heavy Slam 💥 (ทิ้งดิ่งกระแทกพื้น)',
    hasAbility: true,
    abilityType: 'slam'
  },
  eagle: {
    id: 'eagle',
    name: 'Mighty Eagle Ashi',
    nameTh: 'พญาอินทรีอชิ',
    desc: 'แตะจอขณะบินเพื่อโฉบพุ่งดิ่งพสุธา สร้างคลื่นสะเทือนรอบจุดตก!',
    color: '#ffb300',
    accent: '#ffe57f',
    sprite: 'assets/sprites/eagle.png',
    radius: 31,
    drawScale: 2.45,
    density: 0.0065,
    restitution: 0.3,
    friction: 0.06,
    abilityName: 'Mighty Dive 🦅 (โฉบดิ่งพสุธา)',
    hasAbility: true,
    abilityType: 'eagle_dive'
  }
};

window.PIG_TYPES = {
  chef_small: {
    id: 'chef_small',
    name: 'Chef Piglet Ashi',
    nameTh: 'หมูเชฟฝึกหัด',
    maxHp: 55,
    radius: 21,
    drawScale: 2.4,
    sprite: 'assets/sprites/pig_chef.png',
    score: 5000
  },
  chef: {
    id: 'chef',
    name: 'Chef Pig Ashi',
    nameTh: 'หมูเชฟหนวดงาม',
    maxHp: 95,
    radius: 25,
    drawScale: 2.45,
    sprite: 'assets/sprites/pig_chef.png',
    score: 7000
  },
  commander: {
    id: 'commander',
    name: 'Commander Pig Ashi',
    nameTh: 'หมูผู้พันหมวกเหล็ก',
    maxHp: 155,
    radius: 26,
    drawScale: 2.4,
    sprite: 'assets/sprites/pig_commander.png',
    score: 10000
  },
  king_guard: {
    id: 'king_guard',
    name: 'Royal Pig Ashi',
    nameTh: 'หมูขุนนางมงกุฎทอง',
    maxHp: 230,
    radius: 28,
    drawScale: 2.4,
    sprite: 'assets/sprites/pig_king.png',
    score: 15000
  },
  boss: {
    id: 'boss',
    name: 'Emperor King Pig Ashi',
    nameTh: 'ราชาหมูอชิบอสใหญ่',
    maxHp: 520,
    radius: 38,
    drawScale: 2.45,
    sprite: 'assets/sprites/pig_king.png',
    isBoss: true,
    score: 30000
  }
};

window.MATERIAL_TYPES = {
  wood: {
    nameTh: 'ไม้',
    color: '#d48c46',
    colorDark: '#a86424',
    borderColor: '#6d3b0e',
    density: 0.0019,
    friction: 0.45,
    restitution: 0.12,
    hpPerArea: 0.048,
    obstacleDmgMult: 1.55,
    scorePerKill: 500
  },
  ice: {
    nameTh: 'น้ำแข็ง',
    color: '#80deea',
    colorDark: '#26c6da',
    borderColor: '#00838f',
    density: 0.0014,
    friction: 0.2,
    restitution: 0.15,
    hpPerArea: 0.034,
    obstacleDmgMult: 1.3,
    scorePerKill: 600
  },
  stone: {
    nameTh: 'หิน',
    color: '#90a4ae',
    colorDark: '#607d8b',
    borderColor: '#37474f',
    density: 0.0038,
    friction: 0.55,
    restitution: 0.08,
    hpPerArea: 0.095,
    obstacleDmgMult: 2.0,
    scorePerKill: 800
  },
  tnt: {
    nameTh: 'ถังระเบิด TNT',
    color: '#e53935',
    colorDark: '#b71c1c',
    borderColor: '#7f0000',
    density: 0.002,
    friction: 0.55,
    restitution: 0.08,
    hpPerArea: 0.018,
    obstacleDmgMult: 1.5,
    isTNT: true,
    scorePerKill: 2000
  }
};

// Helper to place a block with its bottom resting at `bottomY`
function b(mat, x, bottomY, w, h) {
  return { mat, x, y: bottomY - h / 2, w, h };
}

// Helper to place a target pig with its bottom resting at `bottomY`
function p(type, x, bottomY) {
  const def = window.PIG_TYPES[type] || window.PIG_TYPES.chef_small;
  return { type, x, y: bottomY - def.radius };
}

window.LEVELS_DATA = [
  // =========================================================================
  // LEVEL 1: First Flight (Sunny Hills)
  // =========================================================================
  {
    id: 1,
    name: 'ด่าน 1: ปฐมบทการบิน (First Flight)',
    subtitle: 'ดึงหนังสติ๊กเล็งยิงถล่มบ้านไม้ให้หล่นทับหมูเชฟ!',
    theme: 'sunny',
    starScores: [5000, 10000, 16000],
    birds: ['red', 'chuck', 'red'],
    targets: [
      p('chef_small', 840, GY)
    ],
    blocks: [
      // Ground floor pillars (bottom = GY = 610, height = 84 -> top = 526)
      b('wood', 785, GY, 20, 84),
      b('wood', 895, GY, 20, 84),
      // Roof beam (bottom = 526, height = 20 -> top = 506)
      b('wood', 840, 526, 150, 20),
      // Upper blocks that topple onto the pig when roof tilts (bottom = 506)
      b('ice', 815, 506, 24, 52),
      b('ice', 865, 506, 24, 52),
      b('wood', 840, 454, 96, 18)
    ]
  },

  // =========================================================================
  // LEVEL 2: Double Trouble (Sunny Hills) — Chuck Yellow Bird
  // =========================================================================
  {
    id: 2,
    name: 'ด่าน 2: หอคอยคู่พิฆาต (Double Towers)',
    subtitle: 'แตะจอขณะ Chuck สีเหลืองกำลังบิน เพื่อพุ่งเทอร์โบทะลวงไม้!',
    theme: 'sunny',
    starScores: [10000, 15000, 22000],
    birds: ['chuck', 'red', 'chuck'],
    targets: [
      p('chef_small', 760, GY),
      p('chef', 940, GY)
    ],
    blocks: [
      // Left Tower (bottom = GY, h = 86 -> top = 524)
      b('wood', 712, GY, 20, 86),
      b('wood', 808, GY, 20, 86),
      b('wood', 760, 524, 128, 20),
      b('ice', 760, 504, 44, 44),

      // Right Tower (bottom = GY, h = 88 -> top = 522)
      b('wood', 892, GY, 20, 88),
      b('wood', 988, GY, 20, 88),
      b('wood', 940, 522, 128, 20),
      b('wood', 915, 502, 20, 62),
      b('wood', 965, 502, 20, 62),
      b('wood', 940, 440, 82, 18)
    ]
  },

  // =========================================================================
  // LEVEL 3: Glass Palace (Sunny Hills) — The Blues Triple Split
  // =========================================================================
  {
    id: 3,
    name: 'ด่าน 3: วิหารผลึกน้ำแข็ง (Ice Palace)',
    subtitle: 'แตะจอขณะแก๊งอชิฟ้ากำลังบิน เพื่อแยกเป็น 3 ร่างถล่มน้ำแข็ง!',
    theme: 'sunny',
    starScores: [17500, 23000, 29000],
    birds: ['blues', 'blues', 'chuck'],
    targets: [
      p('chef_small', 770, GY),
      p('chef_small', 910, GY),
      p('commander', 840, 504)
    ],
    blocks: [
      // 1st Floor Ice Pillars (bottom = GY, h = 86 -> top = 524)
      b('ice', 722, GY, 22, 86),
      b('ice', 818, GY, 22, 86),
      b('ice', 862, GY, 22, 86),
      b('ice', 958, GY, 22, 86),
      // 1st Floor Deck (bottom = 524, h = 20 -> top = 504)
      b('wood', 840, 524, 265, 20),
      // 2nd Floor Ice enclosure (bottom = 504, h = 82 -> top = 422)
      b('ice', 792, 504, 20, 82),
      b('ice', 888, 504, 20, 82),
      b('ice', 840, 422, 128, 20)
    ]
  },

  // =========================================================================
  // LEVEL 4: Stone Bunker (Sunset Canyon) — Bomb Black Bird
  // =========================================================================
  {
    id: 4,
    name: 'ด่าน 4: บังเกอร์หินผา (Stone Bunker)',
    subtitle: 'ส่ง Bomb Ashi พุ่งชนหรือแตะจอเพื่อระเบิดทำลายกำแพงหิน!',
    theme: 'sunset',
    starScores: [12500, 18000, 24000],
    birds: ['bomb', 'chuck', 'red'],
    targets: [
      p('commander', 850, GY),
      p('chef', 850, 496)
    ],
    blocks: [
      // Heavy Stone Bunker 1st floor (bottom = GY, h = 92 -> top = 518)
      b('stone', 785, GY, 26, 92),
      b('stone', 915, GY, 26, 92),
      b('stone', 850, 518, 170, 22), // top = 496
      // 2nd floor (bottom = 496, h = 82 -> top = 414)
      b('stone', 798, 496, 24, 82),
      b('stone', 902, 496, 24, 82),
      b('wood', 850, 414, 140, 20), // top = 394
      b('ice', 850, 394, 42, 42)
    ]
  },

  // =========================================================================
  // LEVEL 5: Pink Bubble Fiesta (Sunset Canyon) — Stella Pink Bird
  // =========================================================================
  {
    id: 5,
    name: 'ด่าน 5: ฟองสบู่ถล่มหอคอย (Bubble Lift)',
    subtitle: 'แตะจอเมื่อ Stella สีชมพูบินถึงตึก เพื่อเป่าฟองสบู่ยกหินลอยฟ้าแล้วทิ้งดิ่ง!',
    theme: 'sunset',
    starScores: [17500, 23000, 30000],
    birds: ['stella', 'chuck', 'bomb'],
    targets: [
      p('chef', 765, GY),
      p('commander', 915, GY),
      p('chef_small', 840, 498)
    ],
    blocks: [
      // Left Bay (bottom = GY, h = 90 -> top = 520)
      b('stone', 718, GY, 24, 90),
      b('wood', 814, GY, 22, 90),
      // Right Bay
      b('wood', 866, GY, 22, 90),
      b('stone', 962, GY, 24, 90),
      // Bridge Deck (bottom = 520, h = 22 -> top = 498)
      b('stone', 840, 520, 275, 22),
      // Upper Cage (bottom = 498, h = 78 -> top = 420)
      b('wood', 795, 498, 20, 78),
      b('wood', 885, 498, 20, 78),
      b('stone', 840, 420, 120, 22)
    ]
  },

  // =========================================================================
  // LEVEL 6: TNT Chain Reaction (Sunset Canyon)
  // =========================================================================
  {
    id: 6,
    name: 'ด่าน 6: โกดังระเบิดลูกโซ่ (TNT Warehouse)',
    subtitle: 'เล็งยิงถัง TNT สีแดงเพื่อจุดชนวนระเบิดกวาดล้างทั้งโกดัง!',
    theme: 'sunset',
    starScores: [17500, 24000, 32000],
    birds: ['blues', 'chuck', 'red', 'bomb'],
    targets: [
      p('chef', 740, GY),
      p('king_guard', 860, GY),
      p('commander', 980, GY)
    ],
    blocks: [
      // Ground Pillars (bottom = GY, h = 92 -> top = 518)
      b('wood', 692, GY, 20, 92),
      b('wood', 788, GY, 20, 92),
      b('stone', 932, GY, 24, 92),
      b('wood', 1028, GY, 20, 92),
      // Deck (bottom = 518, h = 20 -> top = 498)
      b('wood', 740, 518, 126, 20),
      b('stone', 980, 518, 126, 20),
      // TNT Crates sitting securely on top of decks (bottom = 498)
      b('tnt', 740, 498, 42, 42),
      b('tnt', 980, 498, 42, 42),
      // Center Arch over King Guard (bottom = 518, h = 20 -> top = 498)
      b('wood', 860, 518, 126, 20),
      b('tnt', 860, 498, 42, 42)
    ]
  },

  // =========================================================================
  // LEVEL 7: Terence the Giant (Midnight Castle) — Terence Big Bird
  // =========================================================================
  {
    id: 7,
    name: 'ด่าน 7: พี่ใหญ่อชิทลายปราการ (Terence Smash)',
    subtitle: 'ส่ง Terence อชิยักษ์พุ่งทะลวงกำแพงหิน 2 ชั้นให้พินาศ!',
    theme: 'midnight',
    starScores: [20000, 26000, 33000],
    birds: ['terence', 'bomb', 'stella', 'chuck'],
    targets: [
      p('commander', 775, GY),
      p('king_guard', 885, GY),
      p('commander', 830, 494)
    ],
    blocks: [
      // Outer Shield Wall
      b('stone', 690, GY, 26, 108),
      // Main Fortress 1st Floor (bottom = GY, h = 94 -> top = 516)
      b('stone', 732, GY, 26, 94),
      b('stone', 822, GY, 26, 94),
      b('stone', 948, GY, 26, 94),
      // Main Slab (bottom = 516, h = 22 -> top = 494)
      b('stone', 840, 516, 245, 22),
      // 2nd Floor (bottom = 494, h = 84 -> top = 410)
      b('wood', 775, 494, 22, 84),
      b('wood', 885, 494, 22, 84),
      b('stone', 830, 410, 142, 22),
      b('tnt', 830, 388, 42, 42)
    ]
  },

  // =========================================================================
  // LEVEL 8: Three-Story Citadel (Midnight Castle)
  // =========================================================================
  {
    id: 8,
    name: 'ด่าน 8: หอคอยสามชั้นรัตติกาล (Midnight Tower)',
    subtitle: 'ผสมผสานสกิลของฝูงนกเพื่อโค่นหอคอยสูง 3 ชั้น!',
    theme: 'midnight',
    starScores: [17500, 24000, 31000],
    birds: ['blues', 'stella', 'bomb', 'terence'],
    targets: [
      p('chef', 850, GY),
      p('commander', 850, 496),
      p('king_guard', 850, 390)
    ],
    blocks: [
      // 1st Floor (bottom = GY, h = 92 -> top = 518)
      b('stone', 784, GY, 26, 92),
      b('stone', 916, GY, 26, 92),
      b('stone', 850, 518, 172, 22), // top = 496

      // 2nd Floor (bottom = 496, h = 86 -> top = 410)
      b('wood', 792, 496, 22, 86),
      b('wood', 908, 496, 22, 86),
      b('wood', 850, 410, 150, 20), // top = 390

      // 3rd Floor (bottom = 390, h = 82 -> top = 308)
      b('ice', 802, 390, 20, 82),
      b('ice', 898, 390, 20, 82),
      b('ice', 850, 308, 128, 18), // top = 290
      b('tnt', 850, 290, 40, 40)
    ]
  },

  // =========================================================================
  // LEVEL 9: Wings of the Mighty Eagle (Midnight Castle) — Mighty Eagle
  // =========================================================================
  {
    id: 9,
    name: 'ด่าน 9: พญาอินทรีถล่มปฐพี (Mighty Eagle Dive)',
    subtitle: 'ยิงพญาอินทรี Eagle Ashi ขึ้นเหนือป้อม แล้วแตะจอเพื่อพุ่งโฉบถล่มปฐพี!',
    theme: 'midnight',
    starScores: [25000, 32000, 40000],
    birds: ['eagle', 'bomb', 'chuck', 'blues'],
    targets: [
      p('commander', 725, GY),
      p('king_guard', 855, GY),
      p('commander', 985, GY),
      p('chef', 855, 494)
    ],
    blocks: [
      // Left Bunker (bottom = GY, h = 94 -> top = 516)
      b('stone', 678, GY, 24, 94),
      b('stone', 772, GY, 24, 94),
      b('stone', 725, 516, 126, 22),
      b('tnt', 725, 494, 42, 42),

      // Center Keep (bottom = GY, h = 94 -> top = 516)
      b('stone', 808, GY, 24, 94),
      b('stone', 902, GY, 24, 94),
      b('stone', 855, 516, 126, 22),
      b('wood', 816, 494, 20, 76),
      b('wood', 894, 494, 20, 76),
      b('wood', 855, 418, 108, 18),

      // Right Bunker (bottom = GY, h = 94 -> top = 516)
      b('stone', 938, GY, 24, 94),
      b('stone', 1032, GY, 24, 94),
      b('stone', 985, 516, 126, 22),
      b('tnt', 985, 494, 42, 42)
    ]
  },

  // =========================================================================
  // LEVEL 10: Emperor King Pig's Final Citadel (Boss Stage)
  // =========================================================================
  {
    id: 10,
    name: 'ด่าน 10: ปราสาทราชาหมูอชิ (King Ashi Final Boss)',
    subtitle: 'ศึกตัดสิน! รวมพลังฝูงนกอชิถล่มบัลลังก์ราชาหมู Emperor King Ashi!',
    theme: 'boss',
    starScores: [25000, 34000, 42000],
    birds: ['eagle', 'terence', 'bomb', 'stella', 'chuck', 'blues'],
    targets: [
      p('commander', 715, GY),
      p('boss', 865, 492), // Giant Emperor King Ashi on the Royal Throne!
      p('king_guard', 865, GY),
      p('commander', 1015, GY)
    ],
    blocks: [
      // Left Guard Tower (bottom = GY, h = 96 -> top = 514)
      b('stone', 668, GY, 26, 96),
      b('stone', 762, GY, 26, 96),
      b('stone', 715, 514, 126, 22), // top = 492
      b('tnt', 715, 492, 42, 42),

      // Center Royal Throne Foundation (bottom = GY, h = 96 -> top = 514)
      b('stone', 804, GY, 28, 96),
      b('stone', 926, GY, 28, 96),
      b('stone', 865, 514, 164, 22), // top = 492

      // Royal Throne Canopy (bottom = 492, h = 96 -> top = 396)
      b('wood', 808, 492, 20, 96),
      b('wood', 922, 492, 20, 96),
      b('stone', 865, 396, 150, 22), // top = 374
      b('ice', 830, 374, 20, 56),
      b('ice', 900, 374, 20, 56),
      b('wood', 865, 318, 102, 18), // top = 300
      b('tnt', 865, 300, 42, 42),

      // Right Guard Tower (bottom = GY, h = 96 -> top = 514)
      b('stone', 968, GY, 26, 96),
      b('stone', 1062, GY, 26, 96),
      b('stone', 1015, 514, 126, 22), // top = 492
      b('tnt', 1015, 492, 42, 42)
    ]
  }
];
