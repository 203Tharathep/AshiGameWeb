/**
 * Ashi Kombat - Fighters Registry & Move List Data
 * Defines characters, lore, stats, special moves, supers, and fatalities.
 */

export const FIGHTERS = [
  {
    id: 'fire_ashi',
    name: 'FIRE ASHI',
    thaiName: 'อชิมาเติมไฟ',
    title: 'THE DRAGON FLAME',
    bio: 'จอมยุทธ์ผู้จุติมาพร้อมพลังเพลิงบรรลัยกัลป์ "อชิมาเติมไฟ" ผู้สืบทอดวิชาหมัดมังกรเพลิงและลูกเตะจักรยานไฟ',
    archetype: 'Balanced / Projectile',
    portrait: './assets/fighters/fire_ashi.jpg',
    themeColor: '#ff4500',
    stats: {
      health: 1000,
      speed: 6.2,
      power: 88,
      defense: 80,
      range: 92
    },
    keyColor: 'blue', // for chroma-key background removal
    keyColorRGB: [20, 85, 175],
    voiceQuotes: [
      'อชิมาเติมไฟแล้วโว้ยยย!',
      'ไฟของข้าจะแผดเผาเจ้าให้มอดไหม้!',
      'อย่าริอาจมาเทียบชั้นกับเพลิงมังกรอชิ!'
    ],
    specials: [
      {
        id: 'fireball',
        name: 'Dragon Fireball',
        thaiName: 'บอลมังกรเติมไฟ',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 110,
        type: 'projectile',
        fx: 'fire',
        speed: 13,
        desc: 'ปล่อยลูกบอลเพลิงพุ่งแผดเผาศัตรูระยะไกล'
      },
      {
        id: 'bicycle_kick',
        name: 'Bicycle Flame Kick',
        thaiName: 'ลูกเตะจักรยานไฟ',
        cmd: '← → + Kick (A+D+K)',
        damage: 145,
        type: 'rush',
        fx: 'flame_trail',
        hits: 4,
        desc: 'พุ่งเหาะถีบรัวกลางอากาศติดสถานะไฟลุก'
      },
      {
        id: 'teleport',
        name: 'Flame Teleport',
        thaiName: 'วาร์ปเพลิงมรณะ',
        cmd: '↓ ↑ + Kick (S+W+K)',
        damage: 85,
        type: 'teleport',
        fx: 'fire_pillar',
        desc: 'หายตัวในเปลวไฟแล้วดิ่งส้นเท้าลงด้านหลังคู่ต่อสู้'
      }
    ],
    superMove: {
      name: 'INFERNO DRAGON RAGE',
      thaiName: 'มหาเพลิงมังกรถล่มปฐพี',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 340,
      fx: 'giant_dragon',
      desc: 'ระเบิดพลังไฟขั้นสุด เรียกลมปราณมังกรยักษ์เผาทำลายกระดูกคู่ต่อสู้'
    },
    fatality: {
      name: 'FIRE TOASTED!',
      thaiName: 'ย่างสดเพลิงโลกันตร์',
      type: 'FATALITY',
      desc: 'ร่ายเวทมังกรไฟยักษ์เผาร่างศัตรูจนเหลือแต่โครงกระดูกเกรียม!',
      action: 'burn_skeleton'
    }
  },
  {
    id: 'goro_ashi',
    name: 'GORO ASHI',
    thaiName: 'อชิสี่แขน จอมพลัง',
    title: 'THE FOUR-ARMED TITAN',
    bio: 'ร่างยักษ์กลายพันธุ์ 4 แขนสไตล์โกโร่ ผู้ครอบครองพลังหมัดมหาศาลและแรงบดขยี้ไร้เทียมทาน',
    archetype: 'Heavy / Grappler',
    portrait: './assets/fighters/goro_ashi.jpg',
    themeColor: '#ff2222',
    stats: {
      health: 1150,
      speed: 4.8,
      power: 98,
      defense: 95,
      range: 75
    },
    keyColor: 'white',
    keyColorRGB: [255, 255, 255],
    voiceQuotes: [
      '4 แขนดีกว่า 2 แขนเสมอ!',
      'ข้าจะหักกระดูกเจ้าเป็นชิ้นๆ!',
      'ไม่มีใครรอดจากกรงเล็บ 4 แขนของข้าได้!'
    ],
    specials: [
      {
        id: 'quad_punch',
        name: 'Quad Rush Slap',
        thaiName: 'หมัดรัวสี่ทิศ',
        cmd: '← → + Punch (A+D+J)',
        damage: 135,
        type: 'multi_strike',
        fx: 'fist_flurry',
        hits: 6,
        desc: 'ระดมหมัด 4 ข้างตบต่อยคู่ต่อสู้กระเด็น'
      },
      {
        id: 'ground_stomp',
        name: 'Earthquake Stomp',
        thaiName: 'กระทืบแผ่นดินไหว',
        cmd: '↓ ↓ + Kick (S+S+K)',
        damage: 120,
        type: 'ground_wave',
        fx: 'earthquake',
        desc: 'กระทืบส้นเท้าสร้างคลื่นแผ่นดินไหวซัดศัตรูล้มทั้งสนาม'
      },
      {
        id: 'titan_slam',
        name: 'Four-Arm Body Slam',
        thaiName: 'จับทุ่มสี่แขนฟาดตึก',
        cmd: '↓ → + Kick (S+D+K)',
        damage: 160,
        type: 'throw',
        fx: 'smash_crater',
        desc: 'ใช้ 4 แขนล็อคตัวศัตรูขึ้นฟ้าแล้วฟาดลงพื้นอย่างโหดเหี้ยม'
      }
    ],
    superMove: {
      name: 'TITAN APOCALYPSE CRUSH',
      thaiName: 'มหาพลังสี่แขนแยกชิ้นส่วน',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 360,
      fx: 'quad_smash',
      desc: 'จับศัตรูชูขึ้นฟ้าด้วย 4 แขนก่อนซัดคอมโบหมัดหนักจนกระดูกแตกละเอียด'
    },
    fatality: {
      name: 'LIMB RIPPER!',
      thaiName: 'ฉีกร่างสี่เสี่ยง',
      type: 'FATALITY',
      desc: 'ใช้แขนทั้ง 4 ข้างจับแขนขาเหยื่อแล้วกระชากแยกเป็น 4 ชิ้น เลือดสาดกระจาย!',
      action: 'rip_limbs'
    }
  },
  {
    id: 'berserk_ashi',
    name: 'BERSERK ASHI',
    thaiName: 'อชิคลั่งเสื้อขาด',
    title: 'THE RIPPED BEAST',
    bio: 'รุ่นพี่อชิในสภาพสติหลุด เสื้อนักเรียนขาดกระจุย ปลดปล่อยสัญชาตญาณสัตว์ป่าไร้ปรานี',
    archetype: 'Rushdown / Brawler',
    portrait: './assets/fighters/berserk_ashi.jpg',
    themeColor: '#e67e22',
    stats: {
      health: 980,
      speed: 7.0,
      power: 92,
      defense: 72,
      range: 80
    },
    keyColor: 'white',
    keyColorRGB: [240, 240, 240],
    voiceQuotes: [
      'อย่าทำให้ข้าคลั่งงงง!',
      'เสื้อขาดแต่พลังข้าไม่เคยขาด!',
      'ตายซะเถอะแก!'
    ],
    specials: [
      {
        id: 'berserk_flurry',
        name: 'Wild Claw Strike',
        thaiName: 'กรงเล็บคลั่งขย้ำ',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 125,
        type: 'rush',
        fx: 'claw_slashes',
        hits: 5,
        desc: 'พุ่งตะปบฉีกกระชากศัตรูด้วยความเร็วสูง'
      },
      {
        id: 'tie_whip',
        name: 'Necktie Whip',
        thaiName: 'แส้เนกไทกระชากวิญญาณ',
        cmd: '← → + Punch (A+D+J)',
        damage: 95,
        type: 'pull',
        fx: 'tie_wrap',
        desc: 'สะบัดเนกไทพันคอคู่ต่อสู้แล้วดึงเข้ามารับหมัดเสย'
      },
      {
        id: 'rage_counter',
        name: 'Rage Armor Counter',
        thaiName: 'เกราะคลั่งสะท้อนกลับ',
        cmd: '↓ ↓ + Punch (S+S+J)',
        damage: 140,
        type: 'counter',
        fx: 'blood_shield',
        desc: 'เบ่งกล้ามรับการโจมตีแล้วสวนกลับด้วยหมัดน็อคเอาต์'
      }
    ],
    superMove: {
      name: 'BERSERK BLOODLUST',
      thaiName: 'เพลงหมัดคลั่งกระชากตับ',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 350,
      fx: 'berserk_frenzy',
      desc: 'เข้าสู่สภาวะคลั่งสุดขีด ซัดหมัดชุดทะลวงร่างจนฉากสั่นสะเทือน'
    },
    fatality: {
      name: 'HEART RIP!',
      thaiName: 'กระชากหัวใจสด',
      type: 'FATALITY',
      desc: 'พุ่งทะลวงอกควักหัวใจศัตรูออกมาบดขยี้คามือ!',
      action: 'rip_heart'
    }
  },
  {
    id: 'tank_ashi',
    name: 'TANK ASHI',
    thaiName: 'อชิไซส์บิ๊ก มหาพลัง',
    title: 'THE CHONKY COLOSSUS',
    bio: 'รุ่นพี่อชิไซส์ XL หนัก 300 กิโลกรัม พุงสะท้านโลกันตร์ที่พร้อมจะทับศัตรูแบนติดดิน',
    archetype: 'Super Tank / Armor',
    portrait: './assets/fighters/tank_ashi.jpg',
    themeColor: '#d35400',
    stats: {
      health: 1250,
      speed: 4.2,
      power: 94,
      defense: 98,
      range: 70
    },
    keyColor: 'white',
    keyColorRGB: [240, 240, 240],
    voiceQuotes: [
      'หนักจนแผ่นดินทรุด!',
      'พุงนี้สร้างมาเพื่อชนคน!',
      'แบนแน่เจ้าเด็กเมื่อวานซืน!'
    ],
    specials: [
      {
        id: 'belly_bounce',
        name: 'Belly Bumper',
        thaiName: 'พุงกระแทกสะท้านฟ้า',
        cmd: '← → + Kick (A+D+K)',
        damage: 130,
        type: 'armored_rush',
        fx: 'shockwave',
        desc: 'พุ่งเอาพุงชนศัตรูกระดอนลอยข้ามฉาก'
      },
      {
        id: 'body_slam',
        name: 'Super Fat Drop',
        thaiName: 'ดิ่งพสุธาทับแบน',
        cmd: '↓ ↑ + Kick (S+W+K)',
        damage: 150,
        type: 'air_crush',
        fx: 'ground_impact',
        desc: 'กระโดดขึ้นฟ้าแล้วทิ้งตัวลงมาทับศัตรูจนพื้นแตก'
      },
      {
        id: 'sumo_palm',
        name: 'Thousand Palm Wave',
        thaiName: 'ฝ่ามือซูโม่หมื่นลี้',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 115,
        type: 'projectile',
        fx: 'palm_wave',
        desc: 'ตบฝ่ามือปล่อยคลื่นกระแทกอัดลมบดขยี้'
      }
    ],
    superMove: {
      name: 'METEOR BELLY PRESS',
      thaiName: 'มหาอุกกาบาตพุงบดขยี้',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 370,
      fx: 'mega_crush',
      desc: 'กระโดดทะลุชั้นบรรยากาศแล้วร่วงลงมาทับเป็นหลุมอุกกาบาต'
    },
    fatality: {
      name: 'SQUASHED FLAT!',
      thaiName: 'ทับแบนเป็นกระดาษ',
      type: 'FATALITY',
      desc: 'กระโดดทับคู่ต่อสู้จนร่างแบนติดพื้นกลายเป็นแผ่นกระดาษเลือดสาด!',
      action: 'squash_paper'
    }
  },
  {
    id: 'spider_ashi',
    name: 'SPIDER ASHI',
    thaiName: 'สไปเดอร์อชิ ยอดมนุษย์',
    title: 'THE WEB WEAVER',
    bio: 'ฮีโร่แมงมุมสายพันธุ์เกรียน โหนเสาบาร์และปล่อยใยมัดตรึงเหยื่ออย่างว่องไว',
    archetype: 'Acrobatic / Zoner',
    portrait: './assets/fighters/spider_ashi.jpg',
    themeColor: '#c0392b',
    stats: {
      health: 960,
      speed: 7.8,
      power: 82,
      defense: 76,
      range: 96
    },
    keyColor: 'dark',
    keyColorRGB: [30, 20, 40],
    voiceQuotes: [
      'พลังที่ยิ่งใหญ่มาพร้อมความเกรียนที่ใหญ่ยิ่ง!',
      'ติดใยข้าแล้วแกจะหนีไปไหน!',
      'สไปเดอร์อชิมาปราบความชั่วร้ายแล้ว!'
    ],
    specials: [
      {
        id: 'web_shot',
        name: 'Sticky Web Trap',
        thaiName: 'ยิงใยแมงมุมตรึงร่าง',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 80,
        type: 'trap',
        fx: 'web_ball',
        stun: 1.5,
        desc: 'ยิงก้อนใยเหนียวมัดศัตรูนิ่งสนิท 1.5 วินาที'
      },
      {
        id: 'web_swing',
        name: 'Acrobatic Web Kick',
        thaiName: 'โหนใยถีบเสยหน้า',
        cmd: '← → + Kick (A+D+K)',
        damage: 135,
        type: 'air_swing',
        fx: 'web_line',
        desc: 'โหนใยแมงมุมสวิงข้ามฉากถีบคู่ต่อสู้'
      },
      {
        id: 'pole_drop',
        name: 'Pole Dance Spinner',
        thaiName: 'หมุนควงสว่านทิ่มดิน',
        cmd: '↓ ↓ + Kick (S+S+K)',
        damage: 120,
        type: 'spinning_kick',
        fx: 'pole_sparks',
        desc: 'ควงตัวหมุนเตะกวาดคู่ต่อสู้ลงไปกองกับพื้น'
      }
    ],
    superMove: {
      name: 'WEB COCOON DEVASTATION',
      thaiName: 'ดักแด้ใยมรณะถล่มตึก',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 345,
      fx: 'spider_storm',
      desc: 'มัดศัตรูเป็นดักแด้ใยแมงมุมแล้วดึงตึกถล่มทับอย่างสะใจ'
    },
    fatality: {
      name: 'WEB COCOON EXECUTION!',
      thaiName: 'รัดคอแขวนโยงใย',
      type: 'FATALITY',
      desc: 'พันคู่ต่อสู้ด้วยใยทั้งตัวแล้วดึงขึ้นไปแขวนหักคอกลางอากาศ!',
      action: 'hang_cocoon'
    }
  },
  {
    id: 'ghoul_ashi',
    name: 'GHOUL ASHI',
    thaiName: 'กูลอชิตาแดง (คาเนกิ)',
    title: 'THE ONE-EYED GHOUL',
    bio: 'อชิผมขาวตาแดงข้างเดียว ผู้ปลุกพลังคากุเนะสีเลือด แทงทะลวงและกินพลังวิญญาณ',
    archetype: 'Assassin / Lifesteal',
    portrait: './assets/fighters/ghoul_ashi.jpg',
    themeColor: '#8e44ad',
    stats: {
      health: 950,
      speed: 7.5,
      power: 95,
      defense: 74,
      range: 88
    },
    keyColor: 'white',
    keyColorRGB: [230, 230, 230],
    voiceQuotes: [
      '1,000 ลบ 7 ได้เท่าไหร่...?',
      'โลกนี้มันผิดพลาด หรือข้าผิดกันแน่!',
      'กลิ่นเนื้อเจ้าช่างหอมหวลเหลือเกิน!'
    ],
    specials: [
      {
        id: 'red_eye_glare',
        name: 'Evil Eye Stun',
        thaiName: 'จ้องตาสะกดจิต',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 75,
        type: 'paralyze',
        fx: 'red_glare',
        stun: 1.2,
        desc: 'เบิกเนตรสีเลือดสะกดให้ศัตรูหยุดนิ่งด้วยความหวาดกลัว'
      },
      {
        id: 'kagune_pierce',
        name: 'Tentacle Kagune Strike',
        thaiName: 'หนวดคากุเนะเสียบอก',
        cmd: '← → + Punch (A+D+J)',
        damage: 140,
        type: 'multi_pierce',
        fx: 'blood_tentacles',
        hits: 4,
        desc: 'งอกหนวดกูลสีเลือด 4 เส้นแทงทะลวงคู่ต่อสู้'
      },
      {
        id: 'shadow_dash',
        name: 'Blood Shadow Step',
        thaiName: 'ก้าวเงาโลหิตข้ามมิติ',
        cmd: '↓ → + Kick (S+D+K)',
        damage: 105,
        type: 'behind_strike',
        fx: 'blood_mist',
        desc: 'พุ่งสลายตัวเป็นหมอกเลือดโผล่ด้านหลังแล้วฟันคอ'
      }
    ],
    superMove: {
      name: 'CENTIPEDE KAGUNE CARNAGE',
      thaiName: 'ตะขาบกูลกลืนกินวิญญาณ',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 360,
      fx: 'kagune_rampage',
      desc: 'กลายร่างเป็นกูลตะขาบยักษ์ รัดร่างศัตรูและสูบพลังชีวิตฟื้นฟูตนเอง'
    },
    fatality: {
      name: 'KAGUNE DECAPITATION!',
      thaiName: 'หนวดกูลตัดคอขาด',
      type: 'FATALITY',
      desc: 'ใช้หนวดคากุเนะฟันสะบั้นหัวคู่ต่อสู้หลุดลอย เลือดพุ่งกระฉูดเป็นน้ำพุ!',
      action: 'decapitate_head'
    }
  },
  {
    id: 'dora_ashi',
    name: 'DORA ASHI',
    thaiName: 'โดราอชิ ฟันทองคำ',
    title: 'THE GOLDEN CAT ROBOT',
    bio: 'หุ่นยนต์แมวสีชมพูฟันทองวิบวับ มาพร้อมของวิเศษสุดเพี้ยนและพลังกัดเหล็กฉีกทอง',
    archetype: 'Trickster / Random',
    portrait: './assets/fighters/dora_ashi.jpg',
    themeColor: '#f39c12',
    stats: {
      health: 1020,
      speed: 6.0,
      power: 87,
      defense: 85,
      range: 85
    },
    keyColor: 'black',
    keyColorRGB: [0, 0, 0],
    voiceQuotes: [
      'ฟันทองแสบตามั้ยล่ะเจ้าพวกมนุษย์!',
      'ของวิเศษในกระเป๋าข้ามีฆ่าแกได้ทุกอย่าง!',
      'โดราอชิผู้น่ารักแต่กัดไม่ปล่อย!'
    ],
    specials: [
      {
        id: 'gold_smile',
        name: 'Golden Blind Flash',
        thaiName: 'ยิ้มฟันทองแสงสว่างวาบ',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 90,
        type: 'flash_blind',
        fx: 'golden_sparkles',
        desc: 'ยิงแสงสะท้อนฟันทองส่องตาคู่ต่อสู้จนตาพร่า'
      },
      {
        id: 'pocket_hammer',
        name: '100-Ton Mallet',
        thaiName: 'ค้อนร้อยตันจากกระเป๋า',
        cmd: '↓ ↓ + Punch (S+S+J)',
        damage: 150,
        type: 'overhead',
        fx: 'cartoon_hammer',
        desc: 'หยิบค้อนยักษ์ 100 ตันออกมาทุบกบาลศัตรู'
      },
      {
        id: 'bell_bomb',
        name: 'Golden Bell Bomb',
        thaiName: 'กระดิ่งทองเด้งดึ๋งบึ้ม',
        cmd: '← → + Kick (A+D+K)',
        damage: 110,
        type: 'bouncing_bomb',
        fx: 'bell_explosion',
        desc: 'ขว้างกระดิ่งคอเด้งตามพื้นไประเบิดใส่ศัตรู'
      }
    ],
    superMove: {
      name: 'DORAYAKI TSUNAMI APOCALYPSE',
      thaiName: 'มหาพายุขนมโดรายากิถล่มโลก',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 350,
      fx: 'dorayaki_blast',
      desc: 'เปิดกระเป๋าวิเศษเสกคลื่นขนมและของวิเศษทับถมศัตรูจนระเบิด'
    },
    fatality: {
      name: 'GOLD TOOTH CHOMP!',
      thaiName: 'ฟันทองเขมือบหัว',
      type: 'FATALITY',
      desc: 'อ้าปากขยายใหญ่ยักษ์แล้วใช้ฟันทองกัดกร้วมกลืนหัวเหยื่อหายวับ!',
      action: 'chomp_head'
    }
  },
  {
    id: 'sky_ashi',
    name: 'SKY ASHI',
    thaiName: 'อชิเหินเวหา ซูเปอร์แมน',
    title: 'THE STRATOSPHERE DIVER',
    bio: 'มนุษย์กล้าท้าเวหา ร่อนกลางก้อนเมฆด้วยกางเกงบ็อกเซอร์ตัวเดียว ทะลวงพสุธาด้วยความเร็วเสียง',
    archetype: 'Aerial / Dive Bomber',
    portrait: './assets/fighters/sky_ashi.jpg',
    themeColor: '#3498db',
    stats: {
      health: 990,
      speed: 8.2,
      power: 86,
      defense: 75,
      range: 90
    },
    keyColor: 'blue',
    keyColorRGB: [135, 206, 235],
    voiceQuotes: [
      'ข้าเหินเวหามาเพื่อดับซ่าแก!',
      'มองขึ้นไปบนฟ้าสิ นั่นแหละจุดจบเจ้า!',
      'สายลมพาอชิมาพิชิตศึก!'
    ],
    specials: [
      {
        id: 'sky_dive',
        name: 'Sky Torpedo Dive',
        thaiName: 'ตอร์ปิโดเวหาพุ่งชน',
        cmd: '↓ → + Kick (S+D+K)',
        damage: 135,
        type: 'dive_bomb',
        fx: 'sonic_boom',
        desc: 'พุ่งทะลวงจากฟ้าดั่งจรวดอัดศัตรูกระเด็น'
      },
      {
        id: 'cloud_gust',
        name: 'Cloud Tornado Blast',
        thaiName: 'พายุเมฆาหมุนวน',
        cmd: '← → + Punch (A+D+J)',
        damage: 105,
        type: 'tornado',
        fx: 'cloud_whirl',
        desc: 'พัดลมก้อนเมฆยักษ์ยกคู่ต่อสู้ลอยหมุนเคว้ง'
      },
      {
        id: 'sky_swoop',
        name: 'Orbital Flying Swoop',
        thaiName: 'บินโฉบเหยี่ยวเวหา',
        cmd: '↓ ↑ + Punch (S+W+J)',
        damage: 115,
        type: 'swoop',
        fx: 'wind_speedlines',
        desc: 'บินโฉบขึ้นฟ้าหลบการโจมตีก่อนดิ่งลงมาข่วน'
      }
    ],
    superMove: {
      name: 'STRATOSPHERE METEOR CRASH',
      thaiName: 'ดาวตกอชิดิ่งทะลวงโลก',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 355,
      fx: 'orbital_reentry',
      desc: 'อุ้มศัตรูทะลวงออกนอกโลกแล้วพุ่งกลับลงมาเสียดสีอากาศระเบิดบึ้ม'
    },
    fatality: {
      name: 'SPACE EJECTION!',
      thaiName: 'เตะกระเด็นออกนอกโลก',
      type: 'FATALITY',
      desc: 'เตะอัปเปอร์คัตส่งร่างคู่ต่อสู้ลอยทะลุชั้นบรรยากาศกลายเป็นดาวตกข้ามขอบฟ้า!',
      action: 'launch_space'
    }
  },
  {
    id: 'bikini_ashi',
    name: 'BIKINI ASHI',
    thaiName: 'อชิบิกินี่แดง มหาเสน่ห์',
    title: 'THE CRIMSON SIREN',
    bio: 'สาวแซ่บในชุดบิกินี่สีแดงสด พกพาความว่องไวและเสน่ห์เย้ายวนที่แฝงไปด้วยพิษสงร้ายกาจ',
    archetype: 'Speed / Agility',
    portrait: './assets/fighters/bikini_ashi.png',
    themeColor: '#e91e63',
    stats: {
      health: 920,
      speed: 8.5,
      power: 84,
      defense: 72,
      range: 82
    },
    keyColor: 'blue',
    keyColorRGB: [35, 110, 220],
    voiceQuotes: [
      'ชุดนี้มันร้อนแรงเกินกว่าแกจะต้านทาน!',
      'ความสวยของข้ามันอันตรายนะจ๊ะ!',
      'ยอมสยบแทบเท้าบิกินี่อชิซะดีๆ!'
    ],
    specials: [
      {
        id: 'beach_wave',
        name: 'Crimson Tidal Wave',
        thaiName: 'คลื่นซัดสาดสีแดง',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 110,
        type: 'wave',
        fx: 'water_splash',
        desc: 'สะบัดมือเสกคลื่นทะเลสีแดงซัดร่างศัตรูลอย'
      },
      {
        id: 'flip_kick',
        name: 'Cartwheel Siren Kick',
        thaiName: 'ตีลังกาเสยส้นไซเรน',
        cmd: '↓ ↑ + Kick (S+W+K)',
        damage: 130,
        type: 'anti_air',
        fx: 'heart_sparks',
        desc: 'ตีลังกากลางอากาศเตะเสยคางคู่ต่อสู้อย่างพลิ้วไหว'
      },
      {
        id: 'speed_mirage',
        name: 'Mirage Slide Snap',
        thaiName: 'สไลด์สายฟ้าบิกินี่สแน็ป',
        cmd: '← → + Kick (A+D+K)',
        damage: 105,
        type: 'low_slide',
        fx: 'pink_speed',
        desc: 'สไลด์ลอดใต้การโจมตีกวาดขาคู่ต่อสู้ล้ม'
      }
    ],
    superMove: {
      name: 'CRIMSON TEMPEST DANCE',
      thaiName: 'ระบำสึนามิเสน่ห์พิฆาต',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 350,
      fx: 'tsunami_dance',
      desc: 'ร่ายรำคอมโบลูกเตะพายุสีชมพูสุดพลิ้วก่อนเผด็จศึกด้วยคลื่นยักษ์'
    },
    fatality: {
      name: 'DEADLY KISS OF DEATH!',
      thaiName: 'จุมพิตพิษมรณะ',
      type: 'FATALITY',
      desc: 'เป่าจุมพิตรูปหัวใจใส่เหยื่อ ร่างของศัตรูค่อยๆ ละลายกลายเป็นกองเลือดเหลว!',
      action: 'poison_kiss'
    }
  },
  {
    id: 'senior_ashi',
    name: 'SENIOR ASHI',
    thaiName: 'รุ่นพี่อชิ ระเบียบจัด',
    title: 'THE DISCIPLINARY MASTER',
    bio: 'รุ่นพี่วินัยเนกไทเป๊ะ ชี้หน้าสั่งสอนรุ่นน้องด้วยกฎระเบียบเหล็กและพลังอำนาจแห่งสถาบัน',
    archetype: 'Balanced / Disciplinary',
    portrait: './assets/fighters/senior_ashi.jpg',
    themeColor: '#27ae60',
    stats: {
      health: 1000,
      speed: 6.5,
      power: 88,
      defense: 84,
      range: 86
    },
    keyColor: 'white',
    keyColorRGB: [240, 240, 240],
    voiceQuotes: [
      'แต่งกายไม่เรียบร้อย โดนสั่งพักการเรียนแน่!',
      'รู้จักรุ่นพี่รุ่นน้องบ้างมั้ยไอ้หนู!',
      'ระเบียบวินัยคือหัวใจของอชิคอมแบต!'
    ],
    specials: [
      {
        id: 'finger_point',
        name: 'Disciplinary Lecture Blast',
        thaiName: 'ชี้หน้าเทศนาคลื่นเสียง',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 100,
        type: 'sound_wave',
        fx: 'lecture_sound',
        desc: 'ชี้หน้านิ้วสั่งสอนปล่อยคลื่นเสียงความถี่สูงอัดหู'
      },
      {
        id: 'rulebook_toss',
        name: 'Heavy Rulebook Toss',
        thaiName: 'เขวี้ยงสมุดคู่มือนักเรียน',
        cmd: '← → + Punch (A+D+J)',
        damage: 115,
        type: 'projectile',
        fx: 'book_spin',
        desc: 'ปาสมุดระเบียบเล่มหนาฟาดแสกหน้าศัตรู'
      },
      {
        id: 'senior_slap',
        name: 'Respect Slap Flurry',
        thaiName: 'ตบสั่งสอนเตือนสติ',
        cmd: '↓ → + Kick (S+D+K)',
        damage: 130,
        type: 'multi_slap',
        fx: 'hand_blur',
        hits: 4,
        desc: 'ตบซ้ายตบขวาเรียกสติรุ่นน้องจนเซถอย'
      }
    ],
    superMove: {
      name: 'EXPULSION NOTICE JUDGMENT',
      thaiName: 'พิพากษาใบสั่งไล่ออกมหาประลัย',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 345,
      fx: 'expulsion_seal',
      desc: 'ประทับตราแดงไล่ออกขนาดมหึมา ทับร่างศัตรูจนวิญญาณหลุดจากร่าง'
    },
    fatality: {
      name: 'PERMANENT EXPULSION!',
      thaiName: 'ไล่ออกตลอดกาล',
      type: 'FATALITY',
      desc: 'ยื่นใบสั่งไล่ออกสีเลือด ก่อนฟาดไม้บรรทัดเหล็กผ่าครึ่งร่างศัตรูเป็นสองซีก!',
      action: 'slice_half'
    }
  },
  {
    id: 'bucktooth_ashi',
    name: 'BUCKTOOTH ASHI',
    thaiName: 'อชิฟันเหยิน หัวโล้นเต็ง',
    title: 'THE IRON CHOMPER',
    bio: 'อชิร่างโล้นฟันกระต่ายหน้าแป้น ผู้มีพลังกัดฟันเหล็กแข็งแกร่งกว่าเพชร 10 เท่า',
    archetype: 'Weird / Berserk Biter',
    portrait: './assets/fighters/bucktooth_ashi.jpg',
    themeColor: '#16a085',
    stats: {
      health: 1040,
      speed: 6.8,
      power: 90,
      defense: 82,
      range: 78
    },
    keyColor: 'black',
    keyColorRGB: [0, 0, 0],
    voiceQuotes: [
      'ฟันข้ากัดท่อเหล็กยังขาด!',
      'มองหน้าหาฟันกระต่ายเรอะ!',
      'หัวโล้นเต็งสะท้อนแสงแสบตาเว้ย!'
    ],
    specials: [
      {
        id: 'bucktooth_bite',
        name: 'Rabid Bucktooth Chomp',
        thaiName: 'กัดกระชากเนื้อฟันเหยิน',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 130,
        type: 'chomp',
        fx: 'bite_teeth',
        desc: 'พุ่งเข้าไปกัดคอศัตรูด้วยฟันหน้าขนาดยักษ์'
      },
      {
        id: 'bald_headbutt',
        name: 'Chrome Dome Headbutt',
        thaiName: 'หัวโล้นโหม่งสะท้านกะโหลก',
        cmd: '← → + Punch (A+D+J)',
        damage: 125,
        type: 'headbutt',
        fx: 'metal_clang',
        desc: 'ใช้หัวโล้นแข็งดั่งเหล็กโหม่งกระแทกอก'
      },
      {
        id: 'sneeze_wave',
        name: 'Nuclear Sneeze Blast',
        thaiName: 'จามมหาประลัย',
        cmd: '↓ ↓ + Kick (S+S+K)',
        damage: 110,
        type: 'shockwave',
        fx: 'sneeze_cloud',
        desc: 'จามอย่างรุนแรงส่งคลื่นกระแทกพัดศัตรูล้มคว่ำ'
      }
    ],
    superMove: {
      name: 'MEGA BUCKTOOTH MEGALODON',
      thaiName: 'เขี้ยวฟันเหยินยักษ์ขย้ำทั้งร่าง',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 355,
      fx: 'giant_teeth',
      desc: 'เสกฟันเหยินยักษ์คู่ขนาดเท่าบ้านลงมางับศัตรูแหลกเป็นผง'
    },
    fatality: {
      name: 'HEAD CRUNCHER!',
      thaiName: 'ฟันกระต่ายบดกะโหลก',
      type: 'FATALITY',
      desc: 'อ้าฟันเหยินคู่ยักษ์กัดครอบกะโหลกคู่ต่อสู้แล้วขบแตกโพละคอขาด!',
      action: 'crunch_skull'
    }
  },
  {
    id: 'scooby_ashi',
    name: 'SCOOBY ASHI',
    thaiName: 'สกู๊ปปี้อชิ ยอดสุนัข',
    title: 'THE MYSTERY HOUND',
    bio: 'สุนัขพันธุ์สกู๊ปปี้ดูหน้าคน ผู้ไขคดีปริศนาด้วยการหอนทำลายประสาทและตะครุบเหยื่อ',
    archetype: 'Beast / Fast Rusher',
    portrait: './assets/fighters/scooby_ashi.jpg',
    themeColor: '#795548',
    stats: {
      health: 970,
      speed: 8.0,
      power: 85,
      defense: 78,
      range: 84
    },
    keyColor: 'white',
    keyColorRGB: [255, 255, 255],
    voiceQuotes: [
      'สกู๊ปปี้ดูบี้ดูววว!',
      'ได้เวลาไขคดีด้วยกรงเล็บแล้ว!',
      'ขอกินขนมสกู๊ปปี้สแน็คหน่อยสิ!'
    ],
    specials: [
      {
        id: 'scooby_howl',
        name: 'Sonic Hound Howl',
        thaiName: 'หอนคลื่นเสียงสะท้านป่า',
        cmd: '↓ → + Punch (S+D+J)',
        damage: 105,
        type: 'sound_cone',
        fx: 'bark_rings',
        desc: 'ส่งเสียงหอนคำรามเป็นคลื่นกระแทกวงกว้าง'
      },
      {
        id: 'hound_pounce',
        name: 'Mystery Hound Tackle',
        thaiName: 'กระโจนตะครุบเหยื่อฟัด',
        cmd: '← → + Kick (A+D+K)',
        damage: 140,
        type: 'leap_tackle',
        fx: 'paw_slashes',
        desc: 'กระโดดตะครุบเหยื่อลงพื้นแล้วข่วนรัวๆ'
      },
      {
        id: 'snack_bomb',
        name: 'Explosive Scooby Snack',
        thaiName: 'ปาขนมสุนัขระเบิดตูม',
        cmd: '↓ ↓ + Punch (S+S+J)',
        damage: 115,
        type: 'toss_bomb',
        fx: 'bone_explosion',
        desc: 'ขว้างขนมรูปกระดูกอัดดินปืนไประเบิดใส่ศัตรู'
      }
    ],
    superMove: {
      name: 'MYSTERY MACHINE RUN OVER',
      thaiName: 'รถตู้ปริศนาซิ่งชนทะลวงไส้',
      cmd: 'Fatal Blow (Spacebar / Super Btn)',
      damage: 350,
      fx: 'van_crash',
      desc: 'เรียกรถตู้มิสเตอรี่แมชชีนซิ่งพุ่งชนศัตรูกระเด็นข้ามโลก'
    },
    fatality: {
      name: 'BEAST MAULING!',
      thaiName: 'ขย้ำฉีกร่างสุนัขล่าเนื้อ',
      type: 'FATALITY',
      desc: 'กระโจนฟัดกระชากคอหอยคู่ต่อสู้จนเลือดนองพื้น สิ้นชีพในพริบตา!',
      action: 'maul_throat'
    }
  }
];

// Battle Arena Stages
export const STAGES = [
  {
    id: 'temple',
    name: 'Ashi Shinto Temple',
    thaiName: 'ศาลเจ้าอชิเพลิงมรณะ',
    bgGradient: ['#2b0d0d', '#120505'],
    floorColor: '#3a1e1e',
    accentColor: '#ff4400',
    hazards: 'Flaming Braziers & Dragon Statues'
  },
  {
    id: 'comlab',
    name: 'Computer Lab 101',
    thaiName: 'ห้องแล็บคอมพิวเตอร์มหาประลัย',
    bgGradient: ['#0d1b2a', '#050a12'],
    floorColor: '#1b263b',
    accentColor: '#00e5ff',
    hazards: 'Flickering CRT Glitches & Server Sparks'
  },
  {
    id: 'rooftop',
    name: 'Storm Rooftop of Destiny',
    thaiName: 'ดาดฟ้าสวรรค์เวหาพายุฟ้าผ่า',
    bgGradient: ['#1a102f', '#090514'],
    floorColor: '#2b1f47',
    accentColor: '#b388ff',
    hazards: 'Thunder Lightning & Flying Clouds'
  },
  {
    id: 'urinal_pit',
    name: 'The Nether Bathroom Pit',
    thaiName: 'บ่อกระเบื้องเหลืองห้องน้ำมรณะ',
    bgGradient: ['#2a2610', '#0f0e04'],
    floorColor: '#423d1d',
    accentColor: '#ffd600',
    hazards: 'Yellow Tiles & Steaming Urinals'
  }
];

