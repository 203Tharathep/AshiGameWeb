// ==========================================
// ASHI COMBAT: STANDALONE CLIENT BUNDLE
// ==========================================
(function() {
'use strict';

// ==========================================
// ASHI COMBAT: MORTAL KOMBAT EDITION - DATA
// ==========================================

const STAGES = [
  {
    id: 'pit',
    name: 'The Pit of Ashi',
    nameTh: 'บ่อนรกสะพานขาดแห่งอชิ',
    subtitle: 'สะพานหินข้ามเหวนรก บนเสาหนามเหล็กโบราณ',
    theme: 'dark-pit',
    bgColor: '#0a050f',
    floorY: 570,
    musicMood: 'pit'
  },
  {
    id: 'shaolin',
    name: 'Shaolin Temple of Shadows',
    nameTh: 'วัดเส้าหลินเงาทมิฬ',
    subtitle: 'ลานประลองหน้าวิหาร โคมไฟมังกรและเปลวเพลิง',
    theme: 'shaolin',
    bgColor: '#120505',
    floorY: 570,
    musicMood: 'shaolin'
  },
  {
    id: 'netherrealm',
    name: 'Netherrealm Hellfire',
    nameTh: 'นรกเพลิงโลกันตร์',
    subtitle: 'บ่อลาวาเดือดพล่าน เสาหินอัคนีและเปลวไฟ 3000°C',
    theme: 'netherrealm',
    bgColor: '#1a0400',
    floorY: 570,
    musicMood: 'hellfire'
  },
  {
    id: 'rooftop',
    name: 'Dormitory Rooftop Storm',
    nameTh: 'ดาดฟ้าหอพักพายุสายฟ้า',
    subtitle: 'ศึกชี้ชะตาท่ามกลางพายุฝนและฟ้าผ่า 1,000 โวลต์',
    theme: 'rooftop',
    bgColor: '#050c18',
    floorY: 570,
    musicMood: 'storm'
  },
  {
    id: 'cyber',
    name: 'Cyber Neo-Bangkok',
    nameTh: 'สังเวียนนีออนไซเบอร์',
    subtitle: 'สนามประลองโฮโลแกรมแห่งอนาคต แสงนีออนและกริดดิจิทัล',
    theme: 'cyber',
    bgColor: '#030814',
    floorY: 570,
    musicMood: 'cyber'
  }
];

const FIGHTERS = [
  {
    id: 'scorpion',
    name: 'Scorpion Ashi',
    thaiName: 'อชิ สกอร์เปียนเพลิง',
    title: 'Hellfire Ninja of the Shirai Ryu',
    avatar: 'assets/fighters/Gemini_Generated_Image_8ffdat8ffdat8ffd.jpg',
    color: '#ffaa00',
    accentColor: '#ff4400',
    bloodColor: '#ff2200',
    stats: {
      atk: 9,
      spd: 8.5,
      def: 7.5,
      diff: 'ปานกลาง'
    },
    quote: '"GET OVER HERE! อย่าให้ต้องเผาจนเกรียม!"',
    bio: 'นินจาเพลิงผู้ลุกขึ้นจากขุมนรกเพื่อทวงแค้น ใช้โซ่คุไนดึงศัตรูเข้ามาเชือด และพ่นเปลวเพลิงโลกันตร์ 3,000°C',
    specials: [
      {
        name: 'Hell Spear',
        nameTh: 'โซ่คุไนลากสังหาร (Get Over Here!)',
        input: '↓ → + ต่อย (หรือ I)',
        key: 'spear',
        damage: 16,
        cost: 25,
        desc: 'ปาโซ่คุไนพุ่งจับศัตรูแล้วกระชากตัวเข้ามาประชิด พร้อมติดสตัน 1.5 วินาที'
      },
      {
        name: 'Hellfire Breath',
        nameTh: 'พ่นเพลิงโลกันตร์',
        input: '↓ ← + ต่อย',
        key: 'firebreath',
        damage: 22,
        cost: 35,
        desc: 'พ่นไฟเผาผลาญศัตรูด้านหน้าอย่างรุนแรง ล้มลงพื้น'
      },
      {
        name: 'Flame Teleport',
        nameTh: 'วาร์ปเพลิงแทงข้างหลัง',
        input: '← → + เตะ',
        key: 'teleport',
        damage: 18,
        cost: 30,
        desc: 'ระเบิดตัวเองเป็นเปลวไฟ แล้วโผล่มาเตะกลางอากาศข้างหลังศัตรู'
      }
    ],
    fatality: {
      name: 'Toasty Hellfire Roast',
      nameTh: 'เปลวเพลิงนรกเผาเกรียม (TOASTY!)',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'ถอดหน้ากากอชิ พ่นพายุเพลิงนรก เผาศัตรูจนกลายเป็นโครงกระดูกระเบิดเป็นผง!'
    }
  },
  {
    id: 'subzero',
    name: 'Sub-Zero Ashi',
    thaiName: 'อชิ ซับซีโร่เยือกแข็ง',
    title: 'Grandmaster of the Lin Kuei',
    avatar: 'assets/fighters/Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg',
    color: '#00d4ff',
    accentColor: '#0066ff',
    bloodColor: '#00ffff',
    stats: {
      atk: 8,
      spd: 7.5,
      def: 9,
      diff: 'ง่าย'
    },
    quote: '"ความหนาวเหน็บ จะทำให้แกแข็งทื่อไปตลอดกาล!"',
    bio: 'ปรมาจารย์แห่งน้ำแข็งหลินขุย ควบคุมผลึกไอเย็นเยือกแข็ง แช่แข็งศัตรูให้อยู่นิ่งก่อนสับเป็นชิ้นๆ',
    specials: [
      {
        name: 'Ice Freeze Blast',
        nameTh: 'กระสุนไอเย็นแช่แข็ง',
        input: '↓ → + ต่อย (หรือ I)',
        key: 'freeze',
        damage: 14,
        cost: 25,
        desc: 'ยิงคลื่นเยือกแข็ง แช่แข็งศัตรูในแท่งน้ำแข็งเป็นเวลา 2.2 วินาที'
      },
      {
        name: 'Cold Slide Tackle',
        nameTh: 'สไลด์กวาดขาเยือกแข็ง',
        input: '← → + เตะ',
        key: 'slide',
        damage: 18,
        cost: 25,
        desc: 'สไลด์ตัวแนบพื้นอย่างรวดเร็ว กวาดขาคู่ต่อสู้ล้มกลิ้ง'
      },
      {
        name: 'Ice Clone Decoy',
        nameTh: 'ร่างแยกผลึกน้ำแข็ง',
        input: '↓ ← + ต่อย',
        key: 'iceclone',
        damage: 15,
        cost: 35,
        desc: 'สร้างร่างเงาผลึกน้ำแข็งค้างไว้ หากศัตรูวิ่งชนจะถูกแช่แข็งทันที'
      }
    ],
    fatality: {
      name: 'Spine Cryo Shatter',
      nameTh: 'กระชากกระดูกสันหลังน้ำแข็งแตกสลาย',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'แช่แข็งร่างศัตรูจนกลายเป็นผลึกน้ำแข็ง แล้วต่อยหมัดหนักจนแตกกระจายเป็นเศษน้ำแข็งสีเลือด!'
    }
  },
  {
    id: 'gigachad',
    name: 'Gigachad Ashi',
    thaiName: 'อชิ กิกะชาดกรามเพชร',
    title: 'The Jawline Emperor & Meme Titan',
    avatar: 'assets/fighters/3.jpeg',
    color: '#e5c158',
    accentColor: '#d4af37',
    bloodColor: '#ff1100',
    stats: {
      atk: 10,
      spd: 6.5,
      def: 9.5,
      diff: 'ปานกลาง'
    },
    quote: '"ไม่ต้องคุยเยอะ สันกรามคมจัด บาดคอหอยแกได้สบาย"',
    bio: 'ชายผู้มีสันกรามคมประดุจเพชรซาฟไฟร์ กล้ามเนื้อแน่นระดับพระเจ้า โจมตีหนักหน่วงและมีเกราะเหล็กต้านแรงกระแทก',
    specials: [
      {
        name: 'Mewing Shockwave',
        nameTh: 'คลื่นโซนิคสันกรามมิวอิ้ง',
        input: '↓ → + ต่อย (หรือ I)',
        key: 'mewing',
        damage: 24,
        cost: 30,
        desc: 'หันข้างโชว์สันกราม ปลดปล่อยคลื่นตัดอากาศพุ่งผ่าครึ่งจอ'
      },
      {
        name: 'Chin Uppercut of Doom',
        nameTh: 'อัปเปอร์คัตเหนียงมหาประลัย',
        input: '↓ + ต่อยหนัก (หรือ U)',
        key: 'chinupper',
        damage: 26,
        cost: 35,
        desc: 'งัดหมัดอัปเปอร์คัตเหนียงคู่ ส่งศัตรูลอยเคว้งกลางอากาศเพื่อคอมโบต่อ'
      },
      {
        name: 'Hyper Flex Armor',
        nameTh: 'เบ่งกล้ามเกราะเหล็กเทพเจ้า',
        input: '↓ ↓ + ป้องกัน',
        key: 'flexarmor',
        damage: 0,
        cost: 40,
        desc: 'เบ่งกล้ามสร้างเกราะทองคำ ไม่ชะงักจากการโจมตี 3 วินาที และเพิ่มพลังโจมตี 30%'
      }
    ],
    fatality: {
      name: 'Jawline Decapitation Photo',
      nameTh: 'สันกรามสังหารตัดคอพร้อมแชะรูปเซลฟี่',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'หยิบกล้องหน้าขึ้นมาโพสหล่อ แฟลชสว่างวาบ แล้วซัดหมัดกรามส่งหัวศัตรูปลิวหลุดขอบโลก!'
    }
  },
  {
    id: 'raiden',
    name: 'Raiden Ashi',
    thaiName: 'อชิ มหาเทพสายฟ้า',
    title: 'Protector of the Realm & God of Thunder',
    avatar: 'assets/fighters/Gemini_Generated_Image_nkpk4ynkpk4ynkpk.jpeg',
    color: '#70d6ff',
    accentColor: '#ffe600',
    bloodColor: '#00e1ff',
    stats: {
      atk: 8.5,
      spd: 9,
      def: 7.5,
      diff: 'ปานกลาง'
    },
    quote: '"I MUST CONSULT WITH THE ELDER GODS!"',
    bio: 'มหาเทพสายฟ้าผู้ปกป้องหอพักอชิ สามารถพุ่งบินตะโกนเสียงเพี้ยนข้ามสนาม และช็อตไฟฟ้า 1 ล้านโวลต์',
    specials: [
      {
        name: 'Electric Torpedo',
        nameTh: 'บินพุ่งซูเปอร์แมนทะลวงฉาก',
        input: '← → + เตะ (หรือ I)',
        key: 'torpedo',
        damage: 22,
        cost: 30,
        desc: 'ตะโกนคำรามลั่นแล้วพุ่งบินแนวนอน อัดศัตรูกระแทกกำแพงจนกำแพงร้าว'
      },
      {
        name: 'Lightning Bolt',
        nameTh: 'สายฟ้าฟาดทะลวงร่าง',
        input: '↓ → + ต่อย',
        key: 'lightning',
        damage: 18,
        cost: 25,
        desc: 'ยิงประกายสายฟ้า 2 เส้นซ้อนจากฝ่ามือ สตันศัตรูชั่วขณะ'
      },
      {
        name: 'Thunder Teleport',
        nameTh: 'วาร์ปสายฟ้าเปลี่ยนมิติ',
        input: '↓ ↑',
        key: 'thundertp',
        damage: 12,
        cost: 25,
        desc: 'สลายร่างเป็นสายฟ้าแล้วโผล่มาด้านหลังศัตรูพร้อมระเบิดคลื่นไฟฟ้า'
      }
    ],
    fatality: {
      name: 'High Voltage Overload',
      nameTh: 'ช็อตโอเวอร์โหลดร่างระเบิดเป็นสายฟ้า',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'จับหัวศัตรูปล่อยไฟฟ้า 1 ล้านโวลต์ ตาเปล่งแสงฟ้า หัวใจเรืองแสง ก่อนร่างจะระเบิดเป็นประกายไฟ!'
    }
  },
  {
    id: 'liukang',
    name: 'Liu Kang Ashi',
    thaiName: 'อชิ มังกรเส้าหลิน',
    title: 'Shaolin Champion & Fire Dragon Master',
    avatar: 'assets/fighters/Gemini_Generated_Image_ovar5lovar5lovar.jpeg',
    color: '#ff3344',
    accentColor: '#ffaa00',
    bloodColor: '#ff1100',
    stats: {
      atk: 8.5,
      spd: 10,
      def: 7.5,
      diff: 'ง่าย'
    },
    quote: '"วาตาาาา! มังกรเพลิงจะเผาผลาญความชั่วร้าย!"',
    bio: 'แชมป์แห่งทัวร์นาเมนต์เส้าหลิน มีลูกถีบจักรยานอากาศสุดคลาสสิกและความเร็วสูงที่สุดในหมู่นักสู้',
    specials: [
      {
        name: 'Flying Dragon Kick',
        nameTh: 'ลูกถีบมังกรเหินเวหา',
        input: '← → + เตะ (หรือ I)',
        key: 'dragonkick',
        damage: 20,
        cost: 25,
        desc: 'กระโดดถีบขาเดียวพุ่งข้ามหน้าจอพร้อมประกายเพลิงมังกร'
      },
      {
        name: 'Bicycle Kicks',
        nameTh: 'ลูกถีบจักรยานรัว 8 ดอก',
        input: '← ← → + เตะ',
        key: 'bicycle',
        damage: 26,
        cost: 35,
        desc: 'ลอยตัวถีบรัวสไตล์บรูซลี 8 ครั้งต่อเนื่อง ดาเมจคอมโบทะลุปรอท'
      },
      {
        name: 'Shaolin Fireball',
        nameTh: 'หมัดคลื่นมังกรเพลิง',
        input: '↓ → + ต่อย',
        key: 'dragonfire',
        damage: 16,
        cost: 20,
        desc: 'ปล่อยลูกไฟรูปหัวมังกรพุ่งเป็นเส้นตรงอย่างรวดเร็ว'
      }
    ],
    fatality: {
      name: 'Dragon Wrath Beast Slam',
      nameTh: 'มังกรทองยักษ์เขมือบครึ่งร่าง',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'แปลงร่างเป็นมังกรทองเพลิงยักษ์ งับครึ่งบนของศัตรูแล้วฟาดลงพื้นจนแผ่นดินแยก!'
    }
  },
  {
    id: 'boxer',
    name: 'Boxer Ashi',
    thaiName: 'อชิ บุรุษเหล็กบ็อกเซอร์',
    title: 'The Sky Diver & Heavyweight Bruiser',
    avatar: 'assets/fighters/6.jpeg',
    color: '#28a745',
    accentColor: '#85e085',
    bloodColor: '#ff2222',
    stats: {
      atk: 9.5,
      spd: 8,
      def: 8,
      diff: 'ปานกลาง'
    },
    quote: '"บินดิ่งจากสามหมื่นฟุต ใส่บ็อกเซอร์ตัวเดียวก็เฟี้ยวได้!"',
    bio: 'ผู้ท้าทายแรงโน้มถ่วง ดิ่งพสุธาจากฟ้ามาพร้อมกางเกงบ็อกเซอร์คู่ใจ หมัดหนักระดับน็อกช้าง',
    specials: [
      {
        name: 'Stratosphere Dive Stomp',
        nameTh: 'ดิ่งพสุธาส้นตีนถล่มโลก',
        input: '↓ ↑ + เตะ (หรือ I)',
        key: 'divestomp',
        damage: 25,
        cost: 30,
        desc: 'กระโดดหายไปบนฟ้า แล้วพุ่งดิ่งลงมาเหยียบหัวศัตรูจมดิน'
      },
      {
        name: 'Mach-10 Gatling Punches',
        nameTh: 'หมัดกลปืนกล 10 นัดซ้อน',
        input: '↓ → + ต่อย',
        key: 'gatling',
        damage: 22,
        cost: 25,
        desc: 'รัวหมัดตรง 10 หมัดอย่างรวดเร็ว ผลักศัตรูถอยติดมุม'
      },
      {
        name: 'Ground Quake Smash',
        nameTh: 'ทุบปฐพีสะเทือนเลื่อนลั่น',
        input: '↓ ↓ + ต่อย',
        key: 'groundsmash',
        damage: 18,
        cost: 25,
        desc: 'ชกหมัดลงพื้น ทำให้หินแหลมพุ่งแทงศัตรูจากข้างล่าง'
      }
    ],
    fatality: {
      name: 'Orbital Supersonic Drop',
      nameTh: 'ทุ่มดิ่งอวกาศระเบิดหลุมอุกกาบาต',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'อุ้มศัตรูพุ่งขึ้นสู่วงโคจรอวกาศ แล้วหมุนควงสว่านทิ้งดิ่งลงมาปักหัวบนสังเวียน เกิดหลุมอุกกาบาตไฟลุก!'
    }
  },
  {
    id: 'slumber',
    name: 'Slumber Ashi',
    thaiName: 'อชิ จอมหลับหน้าแนบ',
    title: 'The Sleeping Snorlax & Pillow Master',
    avatar: 'assets/fighters/1.jpeg',
    color: '#9b5de5',
    accentColor: '#f15bb5',
    bloodColor: '#ff1100',
    stats: {
      atk: 8,
      spd: 6,
      def: 10,
      diff: 'ยาก'
    },
    quote: '"ขอนอนต่ออีก 5 นาที... ใครมาปลุก โดนทับแบนแน่!"',
    bio: 'จอมยุทธ์สายหลับไม่สนโลก เลือดหนาอึดเป็นพิเศษ มีหมอนอาวุธสะท้อนดาเมจและกลิ้งทับศัตรูเหมือนลูกโบว์ลิ่ง',
    specials: [
      {
        name: 'Snore Sound Cannon',
        nameTh: 'คลื่นเสียงกรนสลายวิญญาณ (Zzz...)',
        input: '↓ → + ต่อย (หรือ I)',
        key: 'snore',
        damage: 18,
        cost: 25,
        desc: 'อ้าปากกรน ปล่อยตัวอักษร Zzz... ขนาดยักษ์พุ่งชนศัตรู สตันหลับ 1.8 วินาที'
      },
      {
        name: 'Fluffy Pillow Counter',
        nameTh: 'หมอนดูดซับสะท้อนแรง 200%',
        input: '↓ ← + ป้องกัน',
        key: 'pillowcounter',
        damage: 25,
        cost: 30,
        desc: 'ยกหมอนขนนกขึ้นกัน หากโดนโจมตี จะสวนกลับด้วยแรง 2 เท่าพร้อมขนนกฟุ้งกระจาย'
      },
      {
        name: 'Rolling Snorlax Strike',
        nameTh: 'ม้วนตัวกลิ้งทับวินาศสันตะโร',
        input: '← → + เตะ',
        key: 'rollstrike',
        damage: 22,
        cost: 25,
        desc: 'นอนขดกลมแล้วกลิ้งพุ่งชนศัตรูลอยเคว้งข้ามหัว'
      }
    ],
    fatality: {
      name: '50-Ton Bed of Death',
      nameTh: 'เตียงนอน 50 ตันหล่นทับร่างแบนแต๊ดแต๋',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'นอนหาวใส่หน้ากากปิดตา ทันใดนั้นเตียงสปริงยักษ์ 50 ตันร่วงจากฟ้าทับศัตรูแบนเป็นกระดาษพร้อมเสียงกรนฟี้~'
    }
  },
  {
    id: 'shadow',
    name: 'Noob Shadow Ashi',
    thaiName: 'อชิ ยมทูตเงาทมิฬ',
    title: 'Grand Boss of the Nether Realm',
    avatar: 'assets/fighters/Gemini_Generated_Image_t2e45ct2e45ct2e4.jpeg',
    color: '#2b2b36',
    accentColor: '#9d4edd',
    bloodColor: '#4a0e4e',
    stats: {
      atk: 10,
      spd: 9.5,
      def: 8.5,
      diff: 'ยากมาก'
    },
    quote: '"FEAR ME! เงาของแก จะกลายเป็นเพชฌฆาตของแกเอง!"',
    bio: 'ร่างมืดและบอสใหญ่แห่งทัวร์นาเมนต์ สามารถส่งเงาสังหารออกมาจับศัตรู และเปิดประตูดำดึงดูดศัตรูให้ตกจากเพดาน',
    specials: [
      {
        name: 'Shadow Clone Tackle',
        nameTh: 'แยกร่างเงาทมิฬพุ่งจับทุ่ม',
        input: '↓ → + ต่อย (หรือ I)',
        key: 'shadowclone',
        damage: 24,
        cost: 30,
        desc: 'ส่งเงาดำทะมึนวิ่งพุ่งจับศัตรูเหวี่ยงฟาดพื้นอย่างแรง'
      },
      {
        name: 'Void Portal Slam',
        nameTh: 'เปิดมิติดำดูดลงหลุมมืด',
        input: '↓ ← + ต่อย',
        key: 'portal',
        damage: 22,
        cost: 30,
        desc: 'เปิดหลุมดำใต้ฝ่าเท้าศัตรู ดูดศัตรูหล่นลงมาจากฟ้ากระแทกพื้น'
      },
      {
        name: 'Shadow Curse Ball',
        nameTh: 'ลูกแก้วคำสาปปิดผนึกการป้องกัน',
        input: '← → + ต่อย',
        key: 'curse',
        damage: 16,
        cost: 25,
        desc: 'ยิงลูกแก้วเงาสีม่วง หากโดนจะห้ามศัตรูป้องกันเป็นเวลา 4 วินาที'
      }
    ],
    fatality: {
      name: 'Shadow Dimension Wishbone Tear',
      nameTh: 'เงาสังหารฉีกร่างสองซีก',
      input: '↓ ↓ + พิเศษ (หรือปุ่ม Fatality)',
      desc: 'เงาสองร่างโผล่ขึ้นมาจากพื้น จับขาทั้งสองข้างของศัตรู แล้วฉีกแยกออกเป็นสองส่วนพร้อมหมอกควันสีม่วงทะลัก!'
    }
  }
];

const LADDER = [
  'slumber',
  'boxer',
  'liukang',
  'raiden',
  'subzero',
  'scorpion',
  'gigachad',
  'shadow' // Final Boss
];


// ==========================================
// ASHI COMBAT: MORTAL KOMBAT AUDIO ENGINE
// ==========================================

class CombatAudio {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.bgmInterval = null;
    this.bgmPlaying = false;
    this.step = 0;
    this.bpm = 135;
    this.currentTheme = 'pit';
    this.speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.35;
    this.bgmGain.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;
    this.sfxGain.connect(this.ctx.destination);
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (!this.ctx) return;
    if (muted) {
      if (this.bgmGain) this.bgmGain.gain.value = 0;
      if (this.sfxGain) this.sfxGain.gain.value = 0;
      if (this.speechAvailable) window.speechSynthesis.cancel();
    } else {
      if (this.bgmGain) this.bgmGain.gain.value = 0.35;
      if (this.sfxGain) this.sfxGain.gain.value = 0.6;
    }
  }

  // ==========================================
  // PROCEDURAL SOUND EFFECTS
  // ==========================================

  playPunch(isHeavy = false) {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Whoosh + impact noise
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = isHeavy ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isHeavy ? 180 : 260, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + (isHeavy ? 0.22 : 0.12));

    gain.gain.setValueAtTime(isHeavy ? 0.8 : 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isHeavy ? 0.22 : 0.12));

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + (isHeavy ? 0.22 : 0.12));

    // Crunch noise
    this.playNoise(isHeavy ? 0.18 : 0.08, 0.4, 400);

    if (isHeavy) {
      this.playBoneCrunch();
    }
  }

  playBoneCrunch() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.linearRampToValueAtTime(30, t + 0.15);
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playKick(isHeavy = false) {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isHeavy ? 220 : 320, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);

    gain.gain.setValueAtTime(isHeavy ? 0.75 : 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.18);

    this.playNoise(isHeavy ? 0.12 : 0.07, 0.35, 600);
  }

  playBlock() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.08);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  playNoise(duration, volume, filterFreq = 1000) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.value = volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
  }

  playSpear() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Metal chain whistle + strike
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.linearRampToValueAtTime(400, t + 0.25);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.25);
    this.playNoise(0.2, 0.4, 3000);
  }

  playFreeze() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Crystalline frost chimes
    [1200, 1600, 2400].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.35);

      gain.gain.setValueAtTime(0.25, t + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + idx * 0.04);
      osc.stop(t + 0.35);
    });

    this.playNoise(0.25, 0.3, 4000);
  }

  playFire() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.linearRampToValueAtTime(60, t + 0.4);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.4);

    this.playNoise(0.45, 0.5, 800);
  }

  playLightning() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.setValueAtTime(180, t + 0.05);
    osc.frequency.setValueAtTime(900, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.3);

    this.playNoise(0.3, 0.6, 2500);
  }

  playSonicBoom() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.45);

    gain.gain.setValueAtTime(0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.45);

    this.playNoise(0.35, 0.45, 1200);
  }

  playBloodSpurt() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playNoise(0.18, 0.35, 1800);
  }

  playGong() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    [110, 164, 220, 275].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 2.5);
    });
  }

  playFatalityStart() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playGong();

    // Dark rumble chord
    const t = this.ctx.currentTime;
    [55, 65, 82].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 3.0);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 3.0);
    });
  }

  playFatalityImpact() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playPunch(true);
    this.playBoneCrunch();
    this.playBloodSpurt();
    this.playGong();
  }

  playSuper() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.35);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  // ==========================================
  // ANNOUNCER VOICE SYNTHESIS (DEEP MORTAL KOMBAT VOICE)
  // ==========================================

  announce(text) {
    if (this.isMuted) return;

    // Use Web Speech API if supported
    if (this.speechAvailable) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85; // Slow dramatic pace
        utterance.pitch = 0.55; // Deep gravelly demonic pitch
        utterance.volume = 1.0;

        // Try finding a deep English voice
        const voices = window.speechSynthesis.getVoices();
        const deepVoice = voices.find((v) => /en[-_](us|gb|ca)/i.test(v.lang) && /david|george|mark|male/i.test(v.name)) ||
          voices.find((v) => /en/i.test(v.lang));
        if (deepVoice) utterance.voice = deepVoice;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // Fallback to robotic synth sound
        this.synthDemonGrunt();
      }
    } else {
      this.synthDemonGrunt();
    }
  }

  synthDemonGrunt() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.linearRampToValueAtTime(70, t + 0.4);
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // ==========================================
  // BGM SYNTHESIZER: MORTAL KOMBAT TECHNO SYNDROME
  // ==========================================

  startBGM(theme = 'pit') {
    if (this.bgmPlaying) return;
    this.ensureContext();
    this.currentTheme = theme;
    this.bgmPlaying = true;
    this.step = 0;

    const stepInterval = (60 / this.bpm / 4) * 1000; // 16th notes
    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying || this.isMuted) return;
      this.tickBGM();
    }, stepInterval);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  tickBGM() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const s = this.step % 16;
    const bar = Math.floor(this.step / 16) % 4;

    // 1. Kick Drum (4 on the floor: steps 0, 4, 8, 12)
    if (s % 4 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.09);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(t);
      osc.stop(t + 0.09);
    }

    // 2. Snare / Clack (steps 4, 12)
    if (s === 4 || s === 12) {
      this.playBGMNoise(t, 0.07, 0.22, 1200);
    }

    // 3. Rolling 16th Hi-Hat
    if (s % 2 === 0) {
      this.playBGMNoise(t, 0.03, s % 4 === 2 ? 0.15 : 0.08, 6000);
    }

    // 4. MK Driving Synth Bassline (Techno Syndrome Motif: A - A - C - A - D - A - C - B)
    // Notes in Hz for A minor: A1 = 55, C2 = 65.4, D2 = 73.4, E2 = 82.4, G1 = 49
    const notesA = [55, 55, 65.4, 55, 73.4, 55, 65.4, 61.7];
    const noteFreq = notesA[Math.floor(s / 2) % notesA.length];

    if (s % 2 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(noteFreq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + (s % 4 === 0 ? 300 : 0), t);
      filter.Q.value = 4;

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.02, t + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(t);
      osc.stop(t + 0.11);
    }

    // 5. Minor Gothic Chord Stabs on step 0 of every bar
    if (s === 0) {
      const root = bar === 3 ? 164.81 : 146.83; // E or D minor
      [root, root * 1.2, root * 1.5].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(t);
        osc.stop(t + 0.28);
      });
    }

    this.step++;
  }

  playBGMNoise(t, duration, volume, filterFreq) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.value = volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    noise.start(t);
  }
}

const combatAudio = new CombatAudio();


// ==========================================
// ASHI COMBAT: 2D COMBAT ENGINE
// ==========================================


class Projectile {
  constructor(fighter, type, x, y, dir, opts = {}) {
    this.fighter = fighter;
    this.type = type; // 'spear', 'freeze', 'fireball', 'lightning', 'mewing', 'snore', 'shadow', 'rock'
    this.x = x;
    this.y = y;
    this.dir = dir; // 1 or -1
    this.speed = opts.speed || 14;
    this.width = opts.width || 40;
    this.height = opts.height || 40;
    this.damage = opts.damage || 15;
    this.active = true;
    this.lifetime = opts.lifetime || 90;
    this.age = 0;
    this.color = opts.color || '#ffaa00';
    this.isSpear = type === 'spear';
    this.attachedVictim = null;
    this.pullBackSpeed = 16;
  }

  update(engine) {
    this.age++;
    if (this.age > this.lifetime) {
      this.active = false;
      return;
    }

    if (this.isSpear && this.attachedVictim) {
      // Pulling victim back to the fighter
      const targetX = this.fighter.x + this.fighter.facing * 70;
      const dx = targetX - this.attachedVictim.x;
      if (Math.abs(dx) > 20) {
        this.attachedVictim.x += Math.sign(dx) * this.pullBackSpeed;
        this.x = this.attachedVictim.x;
      } else {
        this.attachedVictim.stunTimer = 60; // stunned for 1 sec
        this.attachedVictim.state = 'hurt';
        this.active = false;
        combatAudio.playPunch(true);
      }
      return;
    }

    this.x += this.dir * this.speed;

    // Check boundary
    if (this.x < 30 || this.x > 1250) {
      this.active = false;
    }
  }

  getHitbox() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }
}

class Fighter {
  constructor(data, isP1, floorY = 570) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.thaiName = data.thaiName;
    this.isP1 = isP1;
    this.floorY = floorY;

    // Positions
    this.x = isP1 ? 320 : 960;
    this.y = floorY;
    this.vx = 0;
    this.vy = 0;
    this.width = 85;
    this.height = 175;
    this.facing = isP1 ? 1 : -1;

    // Combat Stats
    this.maxHp = 100;
    this.hp = 100;
    this.superMeter = 0; // 0 to 100
    this.roundsWon = 0;

    // Multipliers from stats
    this.atkMul = (data.stats.atk || 8) / 8;
    this.speedMul = (data.stats.spd || 8) / 8;
    this.defMul = (data.stats.def || 8) / 8;

    // States
    this.state = 'idle'; // idle, walk_fwd, walk_bwd, jump, crouch, punch_light, punch_heavy, kick_light, kick_heavy, special, block, hurt, knockdown, getup, dazed, fatality_performer, fatality_victim, victory, dead
    this.stateTime = 0;
    this.isGrounded = true;
    this.isBlocking = false;
    this.isCrouching = false;
    this.invulnerableTimer = 0;
    this.freezeTimer = 0;
    this.stunTimer = 0;
    this.armorTimer = 0;
    this.curseTimer = 0; // cannot block

    // Hitbox / Combo
    this.hitbox = null;
    this.hasHitThisAttack = false;
    this.comboHits = 0;
    this.comboDamage = 0;
    this.comboTimer = 0;

    // Fatality state
    this.fatalityType = null;
    this.fatalityStage = 0;

    // Special animation helpers
    this.activeSpecial = null;
  }

  reset(isP1) {
    this.isP1 = isP1;
    this.x = isP1 ? 320 : 960;
    this.y = this.floorY;
    this.vx = 0;
    this.vy = 0;
    this.facing = isP1 ? 1 : -1;
    this.hp = this.maxHp;
    this.state = 'idle';
    this.stateTime = 0;
    this.isGrounded = true;
    this.isBlocking = false;
    this.isCrouching = false;
    this.invulnerableTimer = 0;
    this.freezeTimer = 0;
    this.stunTimer = 0;
    this.armorTimer = 0;
    this.curseTimer = 0;
    this.hitbox = null;
    this.hasHitThisAttack = false;
    this.comboHits = 0;
    this.comboDamage = 0;
    this.comboTimer = 0;
    this.fatalityType = null;
    this.fatalityStage = 0;
    this.activeSpecial = null;
  }

  getHurtbox() {
    const crouchOffset = this.isCrouching ? 60 : 0;
    const h = this.height - crouchOffset;
    return {
      x: this.x - this.width / 2,
      y: this.y - h,
      width: this.width,
      height: h
    };
  }

  setState(newState, force = false) {
    if (this.state === newState && !force) return;
    if (this.state === 'dead' || this.state === 'fatality_victim') return;
    if (this.state === 'dazed' && !force && newState !== 'hurt' && newState !== 'knockdown' && newState !== 'fatality_victim') return;

    this.state = newState;
    this.stateTime = 0;
    this.hasHitThisAttack = false;
    this.hitbox = null;

    if (newState === 'crouch') {
      this.isCrouching = true;
    } else if (newState !== 'crouch_punch' && newState !== 'crouch_kick' && newState !== 'crouch_block') {
      this.isCrouching = false;
    }
  }

  handleInputs(inputs, opponent, engine) {
    if (this.freezeTimer > 0 || this.stunTimer > 0) return;
    if (this.state === 'hurt' || this.state === 'knockdown' || this.state === 'getup' || this.state === 'dazed') return;
    if (this.state === 'fatality_performer' || this.state === 'fatality_victim' || this.state === 'victory' || this.state === 'dead') return;

    // Update facing direction automatically if on ground and not in locked attack
    const isAttacking = this.state.startsWith('punch') || this.state.startsWith('kick') || this.state.startsWith('special');
    if (this.isGrounded && !isAttacking) {
      this.facing = this.x < opponent.x ? 1 : -1;
    }

    // 1. Fatality trigger during "FINISH HIM"
    if (engine.isFinishHim && inputs.fatality && !isAttacking) {
      engine.triggerFatality(this, opponent);
      return;
    }

    // 2. Fatal Blow (Super Move when Super Meter == 100)
    if (inputs.superMove && this.superMeter >= 100 && this.isGrounded && !isAttacking) {
      this.superMeter = 0;
      this.executeSuper(opponent, engine);
      return;
    }

    // 3. Specials
    if (inputs.special && this.isGrounded && !isAttacking) {
      this.executeSpecial(inputs.specialIndex || 0, opponent, engine);
      return;
    }

    // 4. Blocking
    if (inputs.block && this.isGrounded && this.curseTimer <= 0 && !isAttacking) {
      this.isBlocking = true;
      this.setState(inputs.down ? 'crouch_block' : 'block');
      this.vx = 0;
      return;
    } else {
      this.isBlocking = false;
    }

    // 5. Attacks (only when free)
    if (!isAttacking) {
      if (inputs.punchHeavy) {
        this.setState(inputs.down ? 'crouch_punch_heavy' : 'punch_heavy');
        this.vx = this.facing * 3;
        combatAudio.playPunch(true);
        return;
      }
      if (inputs.punch) {
        this.setState(inputs.down ? 'crouch_punch' : 'punch_light');
        this.vx = this.facing * 2;
        combatAudio.playPunch(false);
        return;
      }
      if (inputs.kickHeavy) {
        this.setState(inputs.down ? 'crouch_kick' : 'kick_heavy');
        this.vx = this.facing * 4;
        combatAudio.playKick(true);
        return;
      }
      if (inputs.kick) {
        this.setState('kick_light');
        this.vx = this.facing * 3;
        combatAudio.playKick(false);
        return;
      }
    }

    // 6. Movement
    if (!isAttacking) {
      if (inputs.up && this.isGrounded) {
        this.vy = -20; // Jump force
        this.isGrounded = false;
        this.setState('jump');
        // Forward / backward jump velocity
        if (inputs.right) this.vx = 6 * this.speedMul;
        else if (inputs.left) this.vx = -6 * this.speedMul;
        return;
      }

      if (inputs.down && this.isGrounded) {
        this.setState('crouch');
        this.vx = 0;
        return;
      }

      if (this.isGrounded) {
        if (inputs.right) {
          const isMovingFwd = this.facing === 1;
          this.vx = 5.5 * this.speedMul;
          this.setState(isMovingFwd ? 'walk_fwd' : 'walk_bwd');
        } else if (inputs.left) {
          const isMovingFwd = this.facing === -1;
          this.vx = -5.5 * this.speedMul;
          this.setState(isMovingFwd ? 'walk_fwd' : 'walk_bwd');
        } else {
          this.vx = 0;
          this.setState('idle');
        }
      }
    }
  }

  executeSpecial(index, opponent, engine) {
    const special = this.data.specials[index] || this.data.specials[0];
    this.activeSpecial = special;
    this.setState('special');
    this.superMeter = Math.max(0, this.superMeter - (special.cost || 20));

    // Handle character-specific special moves
    const key = special.key;

    if (key === 'spear') {
      // Scorpion Spear
      combatAudio.playSpear();
      combatAudio.announce('GET OVER HERE!');
      engine.addProjectile(new Projectile(this, 'spear', this.x + this.facing * 60, this.y - 110, this.facing, {
        speed: 18,
        width: 35,
        height: 25,
        damage: special.damage * this.atkMul,
        color: '#ffcc00'
      }));
    } else if (key === 'firebreath') {
      // Scorpion Fire Breath
      combatAudio.playFire();
      this.vx = this.facing * 2;
    } else if (key === 'teleport' || key === 'thundertp') {
      // Teleport behind opponent
      combatAudio.playLightning();
      this.x = opponent.x - opponent.facing * 90;
      this.facing = opponent.x < this.x ? -1 : 1;
      this.vy = -10;
      this.isGrounded = false;
      this.setState('kick_heavy');
      combatAudio.playKick(true);
    } else if (key === 'freeze') {
      // Sub-Zero Ice Freeze
      combatAudio.playFreeze();
      engine.addProjectile(new Projectile(this, 'freeze', this.x + this.facing * 60, this.y - 100, this.facing, {
        speed: 15,
        width: 45,
        height: 45,
        damage: special.damage * this.atkMul,
        color: '#00d4ff'
      }));
    } else if (key === 'slide') {
      // Sub-Zero Ice Slide
      combatAudio.playFreeze();
      this.vx = this.facing * 16;
      this.isCrouching = true;
    } else if (key === 'iceclone') {
      // Sub-Zero Ice Clone Decoy
      combatAudio.playFreeze();
      engine.addIceClone(this.x, this.y);
      this.x -= this.facing * 120; // hop backwards
    } else if (key === 'mewing') {
      // Gigachad Mewing Shockwave
      combatAudio.playSonicBoom();
      engine.addProjectile(new Projectile(this, 'mewing', this.x + this.facing * 60, this.y - 110, this.facing, {
        speed: 16,
        width: 55,
        height: 70,
        damage: special.damage * this.atkMul,
        color: '#ffd700'
      }));
    } else if (key === 'chinupper') {
      // Gigachad Chin Uppercut
      combatAudio.playPunch(true);
      this.vy = -22;
      this.vx = this.facing * 5;
      this.isGrounded = false;
    } else if (key === 'flexarmor') {
      // Gigachad Hyper Flex Armor
      combatAudio.playSonicBoom();
      this.armorTimer = 180; // 3 seconds of super armor
      engine.addEffect('flash', this.x, this.y - 100, '#ffd700');
    } else if (key === 'torpedo') {
      // Raiden Torpedo Fly
      combatAudio.playLightning();
      combatAudio.announce('GIBBERISH FLY!');
      this.vx = this.facing * 20;
      this.vy = -1;
      this.isGrounded = false;
    } else if (key === 'lightning') {
      // Raiden Lightning Bolt
      combatAudio.playLightning();
      engine.addProjectile(new Projectile(this, 'lightning', this.x + this.facing * 60, this.y - 110, this.facing, {
        speed: 19,
        width: 60,
        height: 35,
        damage: special.damage * this.atkMul,
        color: '#70d6ff'
      }));
    } else if (key === 'dragonkick') {
      // Liu Kang Flying Dragon Kick
      combatAudio.playFire();
      this.vx = this.facing * 18;
      this.vy = -6;
      this.isGrounded = false;
    } else if (key === 'bicycle') {
      // Liu Kang Bicycle Kicks
      combatAudio.playKick(true);
      this.vx = this.facing * 9;
      this.vy = -4;
      this.isGrounded = false;
    } else if (key === 'dragonfire') {
      // Liu Kang Dragon Fireball
      combatAudio.playFire();
      engine.addProjectile(new Projectile(this, 'fireball', this.x + this.facing * 60, this.y - 105, this.facing, {
        speed: 16,
        width: 50,
        height: 40,
        damage: special.damage * this.atkMul,
        color: '#ff4400'
      }));
    } else if (key === 'divestomp') {
      // Boxer Dive Stomp
      combatAudio.playPunch(true);
      this.vy = -24;
      this.vx = this.facing * 4;
      this.isGrounded = false;
    } else if (key === 'gatling') {
      // Boxer Gatling Punches
      combatAudio.playPunch(true);
      this.vx = this.facing * 4;
    } else if (key === 'snore') {
      // Slumber Snore Cannon
      combatAudio.playSonicBoom();
      engine.addProjectile(new Projectile(this, 'snore', this.x + this.facing * 60, this.y - 100, this.facing, {
        speed: 11,
        width: 65,
        height: 65,
        damage: special.damage * this.atkMul,
        color: '#c77dff'
      }));
    } else if (key === 'rollstrike') {
      // Slumber Rolling Snorlax
      combatAudio.playPunch(true);
      this.vx = this.facing * 16;
    } else if (key === 'shadowclone') {
      // Shadow Clone Rush
      combatAudio.playLightning();
      engine.addProjectile(new Projectile(this, 'shadow', this.x + this.facing * 60, this.y - 90, this.facing, {
        speed: 15,
        width: 75,
        height: 120,
        damage: special.damage * this.atkMul,
        color: '#4a0e4e'
      }));
    } else {
      // Generic special
      combatAudio.playPunch(true);
    }
  }

  executeSuper(opponent, engine) {
    this.setState('special');
    combatAudio.playSuper();
    engine.triggerSlowMo(40, 0.25);
    engine.addEffect('screen_dim', this.x, this.y, '#ffff00');
    combatAudio.announce('SUPER COMBO!');

    // Devastating rush forward
    this.vx = this.facing * 22;
    this.hasHitThisAttack = false;
  }

  update(opponent, engine) {
    this.stateTime++;

    // Timers
    if (this.invulnerableTimer > 0) this.invulnerableTimer--;
    if (this.freezeTimer > 0) {
      this.freezeTimer--;
      this.vx = 0;
      this.vy = 0;
      return;
    }
    if (this.stunTimer > 0) {
      this.stunTimer--;
      this.vx = 0;
      return;
    }
    if (this.armorTimer > 0) this.armorTimer--;
    if (this.curseTimer > 0) this.curseTimer--;

    // Combo timer
    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) {
        this.comboHits = 0;
        this.comboDamage = 0;
      }
    }

    // Apply Physics & Gravity
    if (!this.isGrounded) {
      this.vy += 1.05; // Gravity
      this.y += this.vy;

      if (this.y >= this.floorY) {
        this.y = this.floorY;
        this.vy = 0;
        this.isGrounded = true;
        if (this.state === 'jump') {
          this.setState('idle');
          this.vx = 0;
        } else if (this.state === 'knockdown') {
          // Bounce off floor
          combatAudio.playPunch(true);
          engine.triggerScreenShake(12);
          this.setState('getup');
        }
      }
    }

    this.x += this.vx;

    // Arena Boundaries (leave room for screen)
    if (this.x < 70) this.x = 70;
    if (this.x > 1210) this.x = 1210;

    // Friction on ground
    if (this.isGrounded) {
      this.vx *= 0.82;
      if (Math.abs(this.vx) < 0.2) this.vx = 0;
    }

    // State Durations & Transitions
    this.updateAttackFrames(opponent, engine);
  }

  updateAttackFrames(opponent, engine) {
    const st = this.stateTime;

    // Punch Light (16 frames)
    if (this.state === 'punch_light' || this.state === 'crouch_punch') {
      if (st >= 4 && st <= 10 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 20 : -90),
          y: this.y - (this.state === 'crouch_punch' ? 70 : 130),
          width: 70,
          height: 40,
          damage: 7 * this.atkMul,
          knockbackX: this.facing * 5,
          knockbackY: -2,
          isHeavy: false,
          type: 'punch'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 15) this.setState(this.isCrouching ? 'crouch' : 'idle');
    }

    // Punch Heavy / Uppercut (24 frames)
    else if (this.state === 'punch_heavy' || this.state === 'crouch_punch_heavy') {
      if (st >= 6 && st <= 14 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 25 : -100),
          y: this.y - 145,
          width: 75,
          height: 70,
          damage: 16 * this.atkMul,
          knockbackX: this.facing * 8,
          knockbackY: -16, // Launches into air!
          isHeavy: true,
          type: 'uppercut'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 24) this.setState(this.isCrouching ? 'crouch' : 'idle');
    }

    // Kick Light (18 frames)
    else if (this.state === 'kick_light') {
      if (st >= 5 && st <= 11 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 25 : -100),
          y: this.y - 95,
          width: 75,
          height: 45,
          damage: 9 * this.atkMul,
          knockbackX: this.facing * 6,
          knockbackY: -2,
          isHeavy: false,
          type: 'kick'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 18) this.setState('idle');
    }

    // Kick Heavy / Roundhouse (26 frames)
    else if (this.state === 'kick_heavy' || this.state === 'crouch_kick') {
      if (st >= 7 && st <= 15 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 25 : -110),
          y: this.y - (this.state === 'crouch_kick' ? 35 : 125),
          width: 85,
          height: 50,
          damage: 17 * this.atkMul,
          knockbackX: this.facing * 10,
          knockbackY: -9,
          isHeavy: true,
          type: 'heavy_kick'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 26) this.setState(this.isCrouching ? 'crouch' : 'idle');
    }

    // Special moves active window
    else if (this.state === 'special') {
      if (st >= 6 && st <= 22 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 20 : -115),
          y: this.y - 120,
          width: 95,
          height: 80,
          damage: (this.activeSpecial ? this.activeSpecial.damage : 20) * this.atkMul,
          knockbackX: this.facing * 12,
          knockbackY: -11,
          isHeavy: true,
          type: 'special'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 35) this.setState('idle');
    }

    // Hurt recovery (14 frames)
    else if (this.state === 'hurt') {
      if (st > 14) this.setState('idle');
    }

    // Knockdown & Get up
    else if (this.state === 'getup') {
      if (st > 25) {
        this.setState('idle');
        this.invulnerableTimer = 20; // wakeup frames
      }
    }
  }

  takeDamage(amount, knockX, knockY, isHeavy, isBlocked, engine) {
    if (this.invulnerableTimer > 0) return;
    if (this.armorTimer > 0) {
      // Super armor: take reduced damage, no flinch!
      this.hp = Math.max(0, this.hp - Math.round(amount * 0.5));
      combatAudio.playBlock();
      engine.addEffect('spark', this.x, this.y - 100, '#ffd700');
      return;
    }

    if (isBlocked) {
      const chipDamage = Math.max(1, Math.round(amount * 0.15));
      this.hp = Math.max(0, this.hp - chipDamage);
      this.vx = knockX * 0.4;
      combatAudio.playBlock();
      engine.addEffect('spark', this.x, this.y - 100, '#ffffff');
      return;
    }

    const finalDamage = Math.round((amount / this.defMul));
    this.hp = Math.max(0, this.hp - finalDamage);

    // Super meter gain on receiving damage
    this.superMeter = Math.min(100, this.superMeter + 6);

    // Sound and particle effects
    if (isHeavy) {
      combatAudio.playBoneCrunch();
      engine.triggerScreenShake(14);
    } else {
      combatAudio.playPunch(false);
      engine.triggerScreenShake(5);
    }
    combatAudio.playBloodSpurt();

    engine.addBloodParticles(this.x, this.y - 100, this.facing * -1, isHeavy ? 28 : 14, this.data.bloodColor || '#ff0000');
    engine.addDamagePopup(this.x, this.y - 140, finalDamage, isHeavy);

    // Knockback
    this.vx = knockX;
    if (knockY < -4) {
      this.vy = knockY;
      this.isGrounded = false;
      this.setState('knockdown', true);
    } else {
      this.setState('hurt', true);
    }

    // Check KO
    if (this.hp <= 0) {
      engine.handlePlayerZeroHP(this);
    }
  }
}

class CombatEngine {
  constructor(p1Data, p2Data, stage) {
    this.stage = stage;
    this.floorY = stage.floorY || 570;
    this.p1 = new Fighter(p1Data, true, this.floorY);
    this.p2 = new Fighter(p2Data, false, this.floorY);

    this.projectiles = [];
    this.iceClones = [];
    this.effects = [];
    this.bloodParticles = [];
    this.damagePopups = [];

    // Match State
    this.round = 1;
    this.maxRounds = 3;
    this.roundTime = 99; // 99 seconds
    this.timerFrames = 0;
    this.state = 'intro'; // intro, fight, round_over, finish_him, fatality, match_over
    this.stateTimer = 0;

    // Slow motion & screen shake
    this.timeScale = 1.0;
    this.slowMoTimer = 0;
    this.screenShake = 0;

    // Finish Him state
    this.isFinishHim = false;
    this.finishHimTimer = 0;
    this.winner = null;
    this.loser = null;
    this.fatalityPerformer = null;
    this.fatalityVictim = null;
    this.fatalityType = null;
    this.isFlawless = false;
  }

  startMatch() {
    this.round = 1;
    this.p1.roundsWon = 0;
    this.p2.roundsWon = 0;
    this.startRound(1);
  }

  startRound(roundNumber) {
    this.round = roundNumber;
    this.roundTime = 99;
    this.timerFrames = 0;
    this.p1.reset(true);
    this.p2.reset(false);
    this.projectiles = [];
    this.iceClones = [];
    this.isFinishHim = false;
    this.state = 'intro';
    this.stateTimer = 0;

    combatAudio.playGong();
    const roundText = roundNumber === 1 ? 'ROUND ONE' : roundNumber === 2 ? 'ROUND TWO' : 'FINAL ROUND';
    combatAudio.announce(`${roundText}... FIGHT!`);
  }

  update(p1Inputs, p2Inputs) {
    // Screen shake decay
    if (this.screenShake > 0) this.screenShake *= 0.88;
    if (this.screenShake < 0.5) this.screenShake = 0;

    // Slow motion timer
    if (this.slowMoTimer > 0) {
      this.slowMoTimer--;
      if (this.slowMoTimer <= 0) this.timeScale = 1.0;
    }

    this.stateTimer++;

    // 1. Intro State
    if (this.state === 'intro') {
      if (this.stateTimer > 90) { // 1.5 seconds intro
        this.state = 'fight';
        this.stateTimer = 0;
      }
      return;
    }

    // 2. Fight State & Finish Him State
    if (this.state === 'fight' || this.state === 'finish_him') {
      // Countdown Timer (every 60 frames = 1 sec)
      if (this.state === 'fight') {
        this.timerFrames++;
        if (this.timerFrames >= 60) {
          this.timerFrames = 0;
          this.roundTime--;
          if (this.roundTime <= 0) {
            this.handleTimeOver();
            return;
          }
        }
      }

      // Finish Him timeout
      if (this.state === 'finish_him') {
        this.finishHimTimer--;
        if (this.finishHimTimer <= 0) {
          // Time expired -> standard decisive win
          this.loser.setState('dead');
          this.winner.setState('victory');
          this.state = 'match_over';
          combatAudio.announce(`${this.winner.name.toUpperCase()} WINS!`);
        }
      }

      // Input & Updates for both fighters
      this.p1.handleInputs(p1Inputs, this.p2, this);
      this.p2.handleInputs(p2Inputs, this.p1, this);

      this.p1.update(this.p2, this);
      this.p2.update(this.p1, this);

      // Check Attacks & Hitboxes
      this.checkCombatCollisions();

      // Update Projectiles
      this.updateProjectiles();
    }

    // 3. Fatality State
    if (this.state === 'fatality') {
      this.updateFatalitySequence();
    }

    // Update Particles & Effects
    this.updateParticles();
  }

  checkCombatCollisions() {
    // 1. P1 attacking P2
    if (this.p1.hitbox && !this.p1.hasHitThisAttack) {
      if (this.rectIntersects(this.p1.hitbox, this.p2.getHurtbox())) {
        this.p1.hasHitThisAttack = true;
        this.p1.comboHits++;
        this.p1.comboDamage += Math.round(this.p1.hitbox.damage);
        this.p1.comboTimer = 55;
        this.p1.superMeter = Math.min(100, this.p1.superMeter + 10);

        const isBlocked = this.p2.isBlocking;
        this.p2.takeDamage(
          this.p1.hitbox.damage,
          this.p1.hitbox.knockbackX,
          this.p1.hitbox.knockbackY,
          this.p1.hitbox.isHeavy,
          isBlocked,
          this
        );
      }
    }

    // 2. P2 attacking P1
    if (this.p2.hitbox && !this.p2.hasHitThisAttack) {
      if (this.rectIntersects(this.p2.hitbox, this.p1.getHurtbox())) {
        this.p2.hasHitThisAttack = true;
        this.p2.comboHits++;
        this.p2.comboDamage += Math.round(this.p2.hitbox.damage);
        this.p2.comboTimer = 55;
        this.p2.superMeter = Math.min(100, this.p2.superMeter + 10);

        const isBlocked = this.p1.isBlocking;
        this.p1.takeDamage(
          this.p2.hitbox.damage,
          this.p2.hitbox.knockbackX,
          this.p2.hitbox.knockbackY,
          this.p2.hitbox.isHeavy,
          isBlocked,
          this
        );
      }
    }
  }

  updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.update(this);

      const target = proj.fighter === this.p1 ? this.p2 : this.p1;
      if (proj.active && this.rectIntersects(proj.getHitbox(), target.getHurtbox())) {
        if (proj.type === 'freeze') {
          target.freezeTimer = 130; // frozen in ice
          target.takeDamage(proj.damage, 0, 0, false, target.isBlocking, this);
          combatAudio.playFreeze();
          this.addEffect('ice_shatter', target.x, target.y - 90, '#00d4ff');
          proj.active = false;
        } else if (proj.type === 'spear') {
          proj.attachedVictim = target;
          target.takeDamage(proj.damage, 0, 0, true, false, this);
        } else if (proj.type === 'snore') {
          target.stunTimer = 110;
          target.takeDamage(proj.damage, target.facing * -4, -3, false, false, this);
          proj.active = false;
        } else {
          target.takeDamage(proj.damage, proj.dir * 8, -6, true, target.isBlocking, this);
          proj.active = false;
        }
      }

      if (!proj.active && !proj.attachedVictim) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  handlePlayerZeroHP(loser) {
    const winner = loser === this.p1 ? this.p2 : this.p1;
    this.winner = winner;
    this.loser = loser;

    // Check if this is the deciding round
    const neededWins = 2;
    if (winner.roundsWon + 1 >= neededWins) {
      // FINISH HIM!
      winner.roundsWon++;
      this.isFinishHim = true;
      this.state = 'finish_him';
      this.finishHimTimer = 360; // 6 seconds to execute Fatality!
      loser.setState('dazed', true);
      this.triggerSlowMo(60, 0.35);
      combatAudio.playFatalityStart();
      combatAudio.announce('FINISH HIM!');
    } else {
      // Normal round win
      winner.roundsWon++;
      this.state = 'round_over';
      this.stateTimer = 0;
      combatAudio.announce(`${winner.name.toUpperCase()} WINS!`);
      setTimeout(() => {
        this.startRound(this.round + 1);
      }, 2500);
    }
  }

  handleTimeOver() {
    this.state = 'round_over';
    if (this.p1.hp > this.p2.hp) {
      this.p1.roundsWon++;
      combatAudio.announce(`${this.p1.name.toUpperCase()} WINS!`);
    } else if (this.p2.hp > this.p1.hp) {
      this.p2.roundsWon++;
      combatAudio.announce(`${this.p2.name.toUpperCase()} WINS!`);
    } else {
      combatAudio.announce('DRAW GAME!');
    }
    setTimeout(() => {
      if (this.p1.roundsWon >= 2 || this.p2.roundsWon >= 2) {
        this.state = 'match_over';
      } else {
        this.startRound(this.round + 1);
      }
    }, 2500);
  }

  triggerFatality(performer, victim) {
    if (!this.isFinishHim) return;
    this.state = 'fatality';
    this.stateTimer = 0;
    this.fatalityPerformer = performer;
    this.fatalityVictim = victim;
    this.fatalityType = performer.data.fatality.name;
    this.isFlawless = performer.hp === performer.maxHp;

    performer.setState('fatality_performer', true);
    victim.setState('fatality_victim', true);

    combatAudio.playFatalityStart();
    this.triggerSlowMo(90, 0.2);
    this.triggerScreenShake(20);
    this.addEffect('screen_dim', performer.x, performer.y, '#990000');
  }

  updateFatalitySequence() {
    const t = this.stateTimer;
    const p = this.fatalityPerformer;
    const v = this.fatalityVictim;

    // Cinematic beats:
    // Beat 1: Zoom & Darkness (0 - 60)
    // Beat 2: Execution Strike (60)
    if (t === 60) {
      combatAudio.playFatalityImpact();
      this.triggerScreenShake(25);
      this.addBloodParticles(v.x, v.y - 100, v.facing * -1, 80, v.data.bloodColor || '#ff0000');
      this.addEffect('explosion', v.x, v.y - 90, p.data.color || '#ffaa00');
    }

    // Beat 3: FATALITY Banner (90)
    if (t === 90) {
      combatAudio.announce('FATALITY!');
    }

    // Beat 4: Announce winner (180)
    if (t === 180) {
      const flawlessText = this.isFlawless ? ' FLAWLESS VICTORY!' : '';
      combatAudio.announce(`${p.name.toUpperCase()} WINS!${flawlessText}`);
      p.setState('victory');
      v.setState('dead');
    }

    // End match (320 frames ~ 5.3s)
    if (t >= 320) {
      this.state = 'match_over';
    }
  }

  triggerSlowMo(duration, scale = 0.3) {
    this.slowMoTimer = duration;
    this.timeScale = scale;
  }

  triggerScreenShake(amount) {
    this.screenShake = Math.max(this.screenShake, amount);
  }

  addProjectile(proj) {
    this.projectiles.push(proj);
  }

  addIceClone(x, y) {
    this.iceClones.push({ x, y, lifetime: 180, age: 0 });
  }

  addBloodParticles(x, y, dir, count, color = '#ff0000') {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - (Math.PI / 2) + (dir * 0.4);
      const speed = 4 + Math.random() * 12;
      this.bloodParticles.push({
        x: x + (Math.random() * 20 - 10),
        y: y + (Math.random() * 30 - 15),
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed - (Math.random() * 6),
        radius: 2.5 + Math.random() * 4,
        color,
        alpha: 1.0,
        gravity: 0.65,
        lifetime: 50 + Math.random() * 40,
        age: 0
      });
    }
  }

  addDamagePopup(x, y, damage, isHeavy) {
    this.damagePopups.push({
      x: x + (Math.random() * 30 - 15),
      y,
      damage,
      isHeavy,
      vy: -4,
      alpha: 1.0,
      age: 0,
      lifetime: 45
    });
  }

  addEffect(type, x, y, color = '#ffffff') {
    this.effects.push({
      type,
      x,
      y,
      color,
      age: 0,
      lifetime: 30,
      radius: 10
    });
  }

  updateParticles() {
    // Blood particles
    for (let i = this.bloodParticles.length - 1; i >= 0; i--) {
      const p = this.bloodParticles[i];
      p.age++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;

      // Floor splatter
      if (p.y >= this.floorY + 10) {
        p.y = this.floorY + 10;
        p.vx = 0;
        p.vy = 0;
      }
      p.alpha = Math.max(0, 1 - p.age / p.lifetime);
      if (p.age >= p.lifetime) {
        this.bloodParticles.splice(i, 1);
      }
    }

    // Damage popups
    for (let i = this.damagePopups.length - 1; i >= 0; i--) {
      const d = this.damagePopups[i];
      d.age++;
      d.y += d.vy;
      d.vy *= 0.92;
      d.alpha = Math.max(0, 1 - d.age / d.lifetime);
      if (d.age >= d.lifetime) {
        this.damagePopups.splice(i, 1);
      }
    }

    // Special effects
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const e = this.effects[i];
      e.age++;
      e.radius += 3;
      if (e.age >= e.lifetime) {
        this.effects.splice(i, 1);
      }
    }
  }

  rectIntersects(r1, r2) {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  }
}


// ==========================================
// ASHI COMBAT: CPU FIGHTER AI
// ==========================================

class FighterAI {
  constructor(difficulty = 'warrior') {
    this.difficulty = difficulty; // novice, warrior, master
    this.reactionDelay = difficulty === 'novice' ? 24 : difficulty === 'warrior' ? 14 : 6;
    this.timer = 0;
    this.state = 'eval'; // eval, approach, retreat, attack, block
    this.stateTimer = 0;
    this.targetDist = 120;
  }

  getInputs(aiFighter, opponent, engine) {
    this.timer++;
    const inputs = {
      up: false,
      down: false,
      left: false,
      right: false,
      punch: false,
      punchHeavy: false,
      kick: false,
      kickHeavy: false,
      special: false,
      specialIndex: 0,
      block: false,
      superMove: false,
      fatality: false
    };

    // If opponent is dazed during Finish Him -> Trigger Fatality!
    if (engine.isFinishHim && opponent.state === 'dazed') {
      if (Math.random() < 0.6) {
        inputs.fatality = true;
        return inputs;
      } else {
        inputs.punchHeavy = true;
        return inputs;
      }
    }

    // Distance to opponent
    const dx = opponent.x - aiFighter.x;
    const dist = Math.abs(dx);
    const facing = Math.sign(dx) || 1;

    // React to incoming projectiles
    const incomingProjectiles = engine.projectiles.filter((p) => p.fighter !== aiFighter);
    if (incomingProjectiles.length > 0) {
      const p = incomingProjectiles[0];
      const pDist = Math.abs(p.x - aiFighter.x);
      if (pDist < 250) {
        // Master & Warrior jump over or block
        if (this.difficulty !== 'novice' && Math.random() < 0.8) {
          inputs.up = true;
          if (facing === 1) inputs.right = true;
          else inputs.left = true;
          return inputs;
        } else {
          inputs.block = true;
          return inputs;
        }
      }
    }

    // React to opponent's attack: Block or Evade
    const isOpponentAttacking = opponent.state.startsWith('punch') || opponent.state.startsWith('kick') || opponent.state.startsWith('special');
    if (isOpponentAttacking && dist < 140) {
      const blockChance = this.difficulty === 'master' ? 0.85 : this.difficulty === 'warrior' ? 0.65 : 0.35;
      if (Math.random() < blockChance) {
        inputs.block = true;
        if (opponent.isCrouching) inputs.down = true;
        return inputs;
      }
    }

    // Super Move when available
    if (aiFighter.superMeter >= 100 && dist < 220) {
      inputs.superMove = true;
      return inputs;
    }

    // Offensive / Neutral behavior state machine
    this.stateTimer++;
    if (this.stateTimer > 40) {
      this.stateTimer = 0;
      const roll = Math.random();
      if (dist > 300) {
        this.state = roll < 0.7 ? 'approach' : 'special_range';
      } else if (dist < 100) {
        this.state = roll < 0.6 ? 'attack' : roll < 0.85 ? 'retreat' : 'uppercut';
      } else {
        this.state = roll < 0.5 ? 'approach' : 'attack';
      }
    }

    // Execute actions based on AI state
    if (this.state === 'approach') {
      if (facing === 1) inputs.right = true;
      else inputs.left = true;
      if (Math.random() < 0.08 && aiFighter.isGrounded) inputs.up = true; // occasional jump in
    } else if (this.state === 'retreat') {
      if (facing === 1) inputs.left = true;
      else inputs.right = true;
    } else if (this.state === 'special_range') {
      if (Math.random() < 0.5) {
        inputs.special = true;
        inputs.specialIndex = Math.floor(Math.random() * (aiFighter.data.specials.length || 1));
      } else {
        this.state = 'approach';
      }
    } else if (this.state === 'attack' && dist < 140) {
      const atkRoll = Math.random();
      if (atkRoll < 0.3) {
        inputs.punch = true;
      } else if (atkRoll < 0.55) {
        inputs.kick = true;
      } else if (atkRoll < 0.8) {
        inputs.kickHeavy = true;
      } else {
        inputs.special = true;
        inputs.specialIndex = 0;
      }
    } else if (this.state === 'uppercut' && dist < 120) {
      inputs.down = true;
      inputs.punchHeavy = true;
    }

    return inputs;
  }
}


// ==========================================
// ASHI COMBAT: CANVAS 2D RENDERER
// ==========================================

class CombatRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 1280;
    this.height = 720;
    canvas.width = this.width;
    canvas.height = this.height;

    // Preloaded fighter face images
    this.loadedImages = new Map();
    this.bgElements = {
      clouds: [],
      embers: [],
      rain: [],
      lightningTimer: 0,
      torchFlicker: 0
    };
    this.initBackgroundElements();
  }

  preloadFighterImages(fighters) {
    fighters.forEach((f) => {
      if (f.avatar && !this.loadedImages.has(f.avatar)) {
        const img = new Image();
        img.src = f.avatar;
        img.onload = () => {
          this.loadedImages.set(f.avatar, img);
        };
        this.loadedImages.set(f.avatar, img);
      }
    });
  }

  initBackgroundElements() {
    // Cloud layers for Pit & Rooftop
    for (let i = 0; i < 8; i++) {
      this.bgElements.clouds.push({
        x: Math.random() * this.width,
        y: 50 + Math.random() * 200,
        speed: 0.2 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.25
      });
    }

    // Embers for Netherrealm / Shaolin
    for (let i = 0; i < 40; i++) {
      this.bgElements.embers.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.random() * 1.5 - 0.75,
        vy: -1 - Math.random() * 2.5,
        size: 1.5 + Math.random() * 3,
        alpha: 0.3 + Math.random() * 0.7,
        color: Math.random() < 0.6 ? '#ff6600' : '#ffcc00'
      });
    }

    // Rain for Rooftop
    for (let i = 0; i < 60; i++) {
      this.bgElements.rain.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        speed: 16 + Math.random() * 8,
        len: 15 + Math.random() * 15
      });
    }
  }

  render(engine) {
    const ctx = this.ctx;
    ctx.save();

    // Screen Shake
    if (engine.screenShake > 0) {
      const sx = (Math.random() * 2 - 1) * engine.screenShake;
      const sy = (Math.random() * 2 - 1) * engine.screenShake;
      ctx.translate(sx, sy);
    }

    // 1. Draw Stage Background
    this.drawStage(engine.stage);

    // 2. Draw Floor Blood & Splatters
    this.drawFloorSplatters(engine);

    // 3. Draw Ice Clones
    this.drawIceClones(engine);

    // 4. Draw Fighters
    this.drawFighter(engine.p1, engine);
    this.drawFighter(engine.p2, engine);

    // 5. Draw Projectiles
    this.drawProjectiles(engine);

    // 6. Draw Particles & Effects
    this.drawParticles(engine);

    // 7. Draw HUD (Health, Super, Timer, Combos)
    this.drawHUD(engine);

    // 8. Draw Banners & Announcements (Fight, Finish Him, Fatality)
    this.drawAnnouncements(engine);

    ctx.restore();
  }

  // ==========================================
  // STAGE BACKGROUNDS
  // ==========================================

  drawStage(stage) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = stage.theme || 'dark-pit';

    this.bgElements.torchFlicker = (this.bgElements.torchFlicker + 0.15) % (Math.PI * 2);

    if (theme === 'dark-pit') {
      // The Pit: Moon, Dark mountains, stone bridge, spikes below
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#05030a');
      skyGrad.addColorStop(0.6, '#180922');
      skyGrad.addColorStop(1, '#050008');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Blood Full Moon
      ctx.save();
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 40;
      ctx.fillStyle = '#ffeedd';
      ctx.beginPath();
      ctx.arc(w / 2, 160, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Clouds
      this.drawClouds('#30123d');

      // Distant Spikes & Pit Chasm
      ctx.fillStyle = '#08020a';
      ctx.fillRect(0, 600, w, 120);
      for (let x = 30; x < w; x += 45) {
        ctx.fillStyle = '#221526';
        ctx.beginPath();
        ctx.moveTo(x, 720);
        ctx.lineTo(x + 22, 610);
        ctx.lineTo(x + 44, 720);
        ctx.fill();
      }

      // Stone Bridge
      ctx.fillStyle = '#1c1524';
      ctx.fillRect(0, 560, w, 50);

      // Carved Bridge Railing & Runes
      ctx.strokeStyle = '#382548';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 560, w, 50);
      for (let x = 60; x < w; x += 140) {
        ctx.strokeRect(x, 565, 80, 40);
      }
    } else if (theme === 'netherrealm') {
      // Netherrealm Hellfire: Lava, Volcanoes, Obsidian
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#150000');
      skyGrad.addColorStop(0.5, '#400800');
      skyGrad.addColorStop(1, '#1a0200');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Lava Glow from bottom
      const lavaGlow = ctx.createRadialGradient(w / 2, 650, 50, w / 2, 650, 500);
      lavaGlow.addColorStop(0, 'rgba(255, 120, 0, 0.45)');
      lavaGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lavaGlow;
      ctx.fillRect(0, 200, w, 520);

      // Obsidian Spires
      ctx.fillStyle = '#120505';
      ctx.beginPath();
      ctx.moveTo(0, 560);
      ctx.lineTo(180, 260);
      ctx.lineTo(340, 560);
      ctx.lineTo(550, 320);
      ctx.lineTo(820, 560);
      ctx.lineTo(1050, 280);
      ctx.lineTo(w, 560);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Stone Platform
      ctx.fillStyle = '#220808';
      ctx.fillRect(0, 560, w, 60);

      // Embers
      this.drawEmbers();
    } else if (theme === 'shaolin') {
      // Shaolin Temple: Pagodas, Dragon Lanterns, Courtyard
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#0c0512');
      skyGrad.addColorStop(0.6, '#281122');
      skyGrad.addColorStop(1, '#15060f');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Temple Pagoda Silhouette
      ctx.fillStyle = '#110614';
      ctx.fillRect(200, 250, 880, 310);
      // Roof eaves
      ctx.beginPath();
      ctx.moveTo(120, 270);
      ctx.quadraticCurveTo(640, 180, 1160, 270);
      ctx.lineTo(1050, 330);
      ctx.lineTo(230, 330);
      ctx.closePath();
      ctx.fill();

      // Hanging Glowing Lanterns
      [320, 500, 780, 960].forEach((lx) => {
        const flicker = Math.sin(this.bgElements.torchFlicker + lx) * 5;
        ctx.save();
        ctx.strokeStyle = '#664400';
        ctx.beginPath();
        ctx.moveTo(lx, 260);
        ctx.lineTo(lx, 360 + flicker);
        ctx.stroke();

        ctx.shadowColor = '#ffaa00';
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#ff4400';
        ctx.beginPath();
        ctx.arc(lx, 375 + flicker, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Courtyard Tiles
      ctx.fillStyle = '#22151f';
      ctx.fillRect(0, 560, w, 160);
    } else if (theme === 'rooftop') {
      // Dormitory Rooftop Storm
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#040914');
      skyGrad.addColorStop(0.8, '#0b1626');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Bangkok Skyscrapers with illuminated windows
      this.drawCitySkyline();

      // Rain
      this.drawRain();

      // Rooftop Edge & Water Puddles
      ctx.fillStyle = '#131e2e';
      ctx.fillRect(0, 560, w, 160);
    } else {
      // Cyber Neo-Bangkok
      ctx.fillStyle = '#030814';
      ctx.fillRect(0, 0, w, h);

      // Neon Gridlines
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
      ctx.lineWidth = 1.5;
      for (let y = 300; y < 560; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let x = 0; x < w; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 300);
        ctx.lineTo(x * 1.3 - w * 0.15, 560);
        ctx.stroke();
      }

      ctx.fillStyle = '#081426';
      ctx.fillRect(0, 560, w, 160);
    }
  }

  drawClouds(color) {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    this.bgElements.clouds.forEach((c) => {
      c.x += c.speed;
      if (c.x > this.width + 150) c.x = -150;
      ctx.save();
      ctx.globalAlpha = c.alpha;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 45 * c.scale, 0, Math.PI * 2);
      ctx.arc(c.x + 40 * c.scale, c.y - 15 * c.scale, 55 * c.scale, 0, Math.PI * 2);
      ctx.arc(c.x + 85 * c.scale, c.y, 40 * c.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawEmbers() {
    const ctx = this.ctx;
    this.bgElements.embers.forEach((e) => {
      e.x += e.vx;
      e.y += e.vy;
      if (e.y < 0) {
        e.y = this.height;
        e.x = Math.random() * this.width;
      }
      ctx.save();
      ctx.globalAlpha = e.alpha;
      ctx.fillStyle = e.color;
      ctx.shadowColor = e.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawRain() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(180, 220, 255, 0.45)';
    ctx.lineWidth = 1.2;
    this.bgElements.rain.forEach((r) => {
      r.y += r.speed;
      r.x -= 2;
      if (r.y > this.height) {
        r.y = 0;
        r.x = Math.random() * this.width;
      }
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - 4, r.y + r.len);
      ctx.stroke();
    });
  }

  drawCitySkyline() {
    const ctx = this.ctx;
    const buildings = [
      { x: 40, w: 90, h: 280 },
      { x: 150, w: 120, h: 360 },
      { x: 290, w: 80, h: 240 },
      { x: 400, w: 140, h: 420 },
      { x: 570, w: 100, h: 300 },
      { x: 700, w: 130, h: 380 },
      { x: 860, w: 110, h: 290 },
      { x: 1000, w: 140, h: 410 },
      { x: 1160, w: 90, h: 260 }
    ];

    buildings.forEach((b) => {
      ctx.fillStyle = '#0a101d';
      ctx.fillRect(b.x, 560 - b.h, b.w, b.h);

      // Windows
      ctx.fillStyle = 'rgba(255, 230, 150, 0.25)';
      for (let wx = b.x + 12; wx < b.x + b.w - 15; wx += 20) {
        for (let wy = 560 - b.h + 20; wy < 540; wy += 35) {
          if (Math.random() > 0.3) {
            ctx.fillRect(wx, wy, 8, 12);
          }
        }
      }
    });
  }

  drawFloorSplatters(engine) {
    const ctx = this.ctx;
    ctx.save();
    engine.bloodParticles.forEach((p) => {
      if (p.vx === 0 && p.vy === 0) {
        // Splattered on floor
        ctx.fillStyle = p.color || '#990000';
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.radius * 1.5, p.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  drawIceClones(engine) {
    const ctx = this.ctx;
    engine.iceClones.forEach((clone) => {
      clone.age++;
      ctx.save();
      ctx.globalAlpha = Math.max(0.2, 1 - clone.age / clone.lifetime);
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(100, 230, 255, 0.7)';
      ctx.fillRect(clone.x - 35, clone.y - 170, 70, 170);
      ctx.restore();
    });
  }

  // ==========================================
  // FIGHTER SPRITE & AVATAR RENDERING
  // ==========================================

  drawFighter(fighter, engine) {
    const ctx = this.ctx;
    ctx.save();

    const x = fighter.x;
    const y = fighter.y;
    const facing = fighter.facing;
    const isP1 = fighter.isP1;
    const col = fighter.data.color || '#ffaa00';
    const accentCol = fighter.data.accentColor || '#ffffff';

    // Flip context horizontally if facing left
    ctx.translate(x, y);
    ctx.scale(facing, 1);

    // Dynamic animation offsets based on state
    let bodyBob = 0;
    let armAngleL = 0;
    let armAngleR = 0;
    let legAngleL = 0;
    let legAngleR = 0;
    let headOffsetY = 0;
    let punchOffset = 0;
    let kickOffset = 0;

    const st = fighter.stateTime;

    // 1. Idle breathing
    if (fighter.state === 'idle') {
      bodyBob = Math.sin(st * 0.12) * 4;
      armAngleL = 0.2 + Math.sin(st * 0.12) * 0.08;
      armAngleR = -0.3 + Math.sin(st * 0.12) * 0.08;
    }
    // 2. Walking
    else if (fighter.state === 'walk_fwd' || fighter.state === 'walk_bwd') {
      bodyBob = Math.abs(Math.sin(st * 0.2)) * 6;
      legAngleL = Math.sin(st * 0.2) * 0.45;
      legAngleR = -Math.sin(st * 0.2) * 0.45;
      armAngleL = -Math.sin(st * 0.2) * 0.4;
      armAngleR = Math.sin(st * 0.2) * 0.4;
    }
    // 3. Crouching
    else if (fighter.state.startsWith('crouch')) {
      headOffsetY = 45;
      bodyBob = 50;
      legAngleL = 0.6;
      legAngleR = 0.6;
      if (fighter.state === 'crouch_punch') punchOffset = 30;
      if (fighter.state === 'crouch_punch_heavy') punchOffset = 45;
      if (fighter.state === 'crouch_kick') kickOffset = 50;
    }
    // 4. Punching
    else if (fighter.state === 'punch_light') {
      punchOffset = Math.sin((st / 16) * Math.PI) * 45;
    } else if (fighter.state === 'punch_heavy') {
      punchOffset = Math.sin((st / 24) * Math.PI) * 60;
      headOffsetY = -10;
    }
    // 5. Kicking
    else if (fighter.state === 'kick_light') {
      kickOffset = Math.sin((st / 18) * Math.PI) * 50;
    } else if (fighter.state === 'kick_heavy') {
      kickOffset = Math.sin((st / 26) * Math.PI) * 75;
    }
    // 6. Block
    else if (fighter.state === 'block' || fighter.state === 'crouch_block') {
      armAngleL = 1.1;
      armAngleR = 1.1;
      // Shield Aura
      ctx.save();
      ctx.strokeStyle = accentCol;
      ctx.lineWidth = 4;
      ctx.shadowColor = accentCol;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(35, -90, 60, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
      ctx.restore();
    }
    // 7. Hurt
    else if (fighter.state === 'hurt') {
      headOffsetY = 15;
      bodyBob = 10;
      armAngleL = -0.5;
      armAngleR = -0.5;
    }
    // 8. Knockdown
    else if (fighter.state === 'knockdown') {
      ctx.rotate(-0.8);
      headOffsetY = 20;
    }
    // 9. Dazed (Finish Him)
    else if (fighter.state === 'dazed') {
      bodyBob = Math.sin(st * 0.1) * 8;
      headOffsetY = Math.sin(st * 0.15) * 6;
      armAngleL = -0.3 + Math.sin(st * 0.1) * 0.2;
      armAngleR = -0.3 - Math.sin(st * 0.1) * 0.2;

      // Swirling stars above head
      for (let i = 0; i < 3; i++) {
        const starAngle = st * 0.1 + (i * Math.PI * 2) / 3;
        const sx = Math.cos(starAngle) * 35;
        const sy = -190 + Math.sin(starAngle) * 12;
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Shadow on ground
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Legs
    ctx.fillStyle = '#111116';
    // Back leg
    ctx.save();
    ctx.translate(-15, -60 + bodyBob);
    ctx.rotate(legAngleR);
    ctx.fillRect(-12, 0, 24, 60 - bodyBob);
    ctx.fillStyle = col;
    ctx.fillRect(-13, 30 - bodyBob * 0.5, 26, 30); // Shin guard
    ctx.restore();

    // Front leg
    ctx.save();
    ctx.translate(15, -60 + bodyBob);
    ctx.rotate(legAngleL);
    if (kickOffset > 0) {
      // Extended kick
      ctx.fillStyle = '#111116';
      ctx.fillRect(-10, -10, 60 + kickOffset, 24);
      ctx.fillStyle = col;
      ctx.fillRect(30, -12, 35 + kickOffset, 28);
    } else {
      ctx.fillStyle = '#111116';
      ctx.fillRect(-12, 0, 24, 60 - bodyBob);
      ctx.fillStyle = col;
      ctx.fillRect(-13, 30 - bodyBob * 0.5, 26, 30);
    }
    ctx.restore();

    // Torso / Martial Gi / Armor
    ctx.fillStyle = col;
    ctx.fillRect(-28, -130 + bodyBob, 56, 75);

    // Belt & Vest trim
    ctx.fillStyle = accentCol;
    ctx.fillRect(-30, -75 + bodyBob, 60, 12); // Belt
    ctx.fillStyle = '#111116';
    ctx.fillRect(-14, -130 + bodyBob, 28, 75); // Inner tunic

    // Arms
    // Back Arm
    ctx.save();
    ctx.fillStyle = col;
    ctx.translate(-22, -120 + bodyBob);
    ctx.rotate(armAngleR);
    ctx.fillRect(-10, 0, 20, 50);
    ctx.fillStyle = accentCol;
    ctx.fillRect(-11, 25, 22, 25); // Gauntlet
    ctx.restore();

    // Front Arm / Punch
    ctx.save();
    ctx.fillStyle = col;
    ctx.translate(22, -120 + bodyBob);
    if (punchOffset > 0) {
      // Extended punch
      ctx.fillRect(0, -12, 45 + punchOffset, 24);
      ctx.fillStyle = accentCol;
      ctx.fillRect(25, -14, 25 + punchOffset, 28);
      // Fist glow
      ctx.shadowColor = col;
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(45 + punchOffset, 0, 14, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.rotate(armAngleL);
      ctx.fillRect(-10, 0, 20, 50);
      ctx.fillStyle = accentCol;
      ctx.fillRect(-11, 25, 22, 25);
    }
    ctx.restore();

    // Head / Avatar Photo Face
    const avatarImg = this.loadedImages.get(fighter.data.avatar);
    const headX = 0;
    const headY = -145 + bodyBob + headOffsetY;
    const headRadius = 32;

    ctx.save();
    // Ninja Hood / Mask boundary
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius + 4, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();

    // Circular clip for avatar image
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);
    ctx.clip();

    if (avatarImg && avatarImg.complete) {
      ctx.drawImage(avatarImg, headX - headRadius, headY - headRadius, headRadius * 2, headRadius * 2);
    } else {
      // Fallback head drawing
      ctx.fillStyle = '#ffccaa';
      ctx.fillRect(headX - headRadius, headY - headRadius, headRadius * 2, headRadius * 2);
      ctx.fillStyle = '#000000';
      ctx.fillRect(headX + 5, headY - 5, 8, 8); // Eye
    }
    ctx.restore();

    // Ninja Mask / Headband Overlay
    ctx.fillStyle = col;
    ctx.fillRect(headX - headRadius, headY + 5, headRadius * 2, 22); // Lower mask
    ctx.fillStyle = accentCol;
    ctx.fillRect(headX - headRadius - 4, headY - headRadius + 4, (headRadius + 4) * 2, 10); // Headband

    // Glowing Eyes
    ctx.save();
    ctx.shadowColor = accentCol;
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 8, headY - 6, 7, 5);
    ctx.restore();

    // Frozen state: solid ice overlay
    if (fighter.freezeTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(100, 220, 255, 0.65)';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      ctx.fillRect(-45, -180, 90, 185);
      ctx.restore();
    }

    // Gigachad Hyper Armor: gold shimmer
    if (fighter.armorTimer > 0) {
      ctx.save();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 20;
      ctx.strokeRect(-35, -170, 70, 170);
      ctx.restore();
    }

    ctx.restore();
  }

  // ==========================================
  // PROJECTILES RENDERING
  // ==========================================

  drawProjectiles(engine) {
    const ctx = this.ctx;

    engine.projectiles.forEach((p) => {
      ctx.save();
      const x = p.x;
      const y = p.y;

      if (p.type === 'spear') {
        // Scorpion Hell Spear & Linked Chain
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(p.fighter.x + p.fighter.facing * 50, p.fighter.y - 110);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Spear head
        ctx.fillStyle = '#ffdd44';
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(x + p.dir * 25, y);
        ctx.lineTo(x - p.dir * 15, y - 12);
        ctx.lineTo(x - p.dir * 15, y + 12);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'freeze') {
        // Sub-Zero Ice Snowflake Blast
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 4;
        for (let a = 0; a < 6; a++) {
          const angle = (a * Math.PI) / 3 + p.age * 0.1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30);
          ctx.stroke();
        }
      } else if (p.type === 'fireball') {
        // Liu Kang Fireball
        ctx.shadowColor = '#ff3300';
        ctx.shadowBlur = 25;
        const grad = ctx.createRadialGradient(x, y, 5, x, y, 25);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, '#ffaa00');
        grad.addColorStop(1, 'rgba(255, 30, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'lightning') {
        // Raiden Lightning Bolt
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(x - p.dir * 35, y);
        ctx.lineTo(x - p.dir * 15, y - 15);
        ctx.lineTo(x + p.dir * 10, y + 12);
        ctx.lineTo(x + p.dir * 35, y);
        ctx.stroke();
      } else if (p.type === 'mewing') {
        // Gigachad Jawline Shockwave
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(x, y, 40, -Math.PI / 2, Math.PI / 2, p.dir === -1);
        ctx.stroke();
      } else if (p.type === 'snore') {
        // Slumber "ZZZ..."
        ctx.font = 'bold 36px "Segoe UI", sans-serif';
        ctx.fillStyle = '#d8b4e2';
        ctx.shadowColor = '#9b5de5';
        ctx.shadowBlur = 12;
        ctx.fillText('Zzz...', x - 30, y + 10);
      } else if (p.type === 'shadow') {
        // Shadow Clone
        ctx.fillStyle = 'rgba(10, 5, 20, 0.9)';
        ctx.shadowColor = '#9d4edd';
        ctx.shadowBlur = 20;
        ctx.fillRect(x - 30, y - 60, 60, 120);
      }

      ctx.restore();
    });
  }

  // ==========================================
  // PARTICLES & EFFECTS RENDERING
  // ==========================================

  drawParticles(engine) {
    const ctx = this.ctx;

    // Blood Particles
    engine.bloodParticles.forEach((p) => {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Damage Popups
    engine.damagePopups.forEach((d) => {
      ctx.save();
      ctx.font = d.isHeavy ? 'bold 32px "Impact", sans-serif' : 'bold 24px "Impact", sans-serif';
      ctx.fillStyle = d.isHeavy ? '#ff3300' : '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.shadowColor = d.isHeavy ? '#ff0000' : '#ffff00';
      ctx.shadowBlur = 10;
      ctx.globalAlpha = d.alpha;

      const txt = `${d.damage}`;
      ctx.strokeText(txt, d.x, d.y);
      ctx.fillText(txt, d.x, d.y);
      ctx.restore();
    });

    // Special Effects (Explosions / Screen Dims)
    engine.effects.forEach((e) => {
      ctx.save();
      if (e.type === 'screen_dim') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, this.width, this.height);
      } else if (e.type === 'spark') {
        ctx.strokeStyle = e.color;
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(e.x + Math.cos(a) * e.radius, e.y + Math.sin(a) * e.radius);
          ctx.stroke();
        }
      } else if (e.type === 'explosion') {
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 30;
        ctx.globalAlpha = Math.max(0, 1 - e.age / e.lifetime);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  // ==========================================
  // MORTAL KOMBAT HUD
  // ==========================================

  drawHUD(engine) {
    const ctx = this.ctx;
    ctx.save();

    const p1 = engine.p1;
    const p2 = engine.p2;

    const barWidth = 460;
    const barHeight = 28;
    const topY = 35;

    // 1. P1 Health Bar (Left to Right)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(60, topY, barWidth, barHeight);
    ctx.fillStyle = '#ff2200'; // Underlayer
    ctx.fillRect(60, topY, barWidth, barHeight);

    const p1HpRatio = Math.max(0, p1.hp / p1.maxHp);
    const p1Grad = ctx.createLinearGradient(60, 0, 60 + barWidth, 0);
    p1Grad.addColorStop(0, '#00ff66');
    p1Grad.addColorStop(0.7, '#ffdd00');
    p1Grad.addColorStop(1, '#ff3300');
    ctx.fillStyle = p1Grad;
    ctx.fillRect(60, topY, barWidth * p1HpRatio, barHeight);

    // P1 Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, topY, barWidth, barHeight);

    // 2. P2 Health Bar (Right to Left)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(this.width - 60 - barWidth, topY, barWidth, barHeight);
    ctx.fillStyle = '#ff2200';
    ctx.fillRect(this.width - 60 - barWidth, topY, barWidth, barHeight);

    const p2HpRatio = Math.max(0, p2.hp / p2.maxHp);
    const p2Grad = ctx.createLinearGradient(this.width - 60, 0, this.width - 60 - barWidth, 0);
    p2Grad.addColorStop(0, '#00ff66');
    p2Grad.addColorStop(0.7, '#ffdd00');
    p2Grad.addColorStop(1, '#ff3300');
    ctx.fillStyle = p2Grad;
    ctx.fillRect(this.width - 60 - barWidth * p2HpRatio, topY, barWidth * p2HpRatio, barHeight);

    // P2 Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.width - 60 - barWidth, topY, barWidth, barHeight);

    // Names in Mortal Kombat Font
    ctx.font = 'bold 24px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#ffcc00';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 6;
    ctx.fillText(p1.data.name.toUpperCase(), 65, topY + barHeight + 26);
    ctx.textAlign = 'right';
    ctx.fillText(p2.data.name.toUpperCase(), this.width - 65, topY + barHeight + 26);
    ctx.textAlign = 'left';

    // Round Win Tokens (Dragon Medals)
    for (let r = 0; r < 2; r++) {
      ctx.fillStyle = r < p1.roundsWon ? '#ff2200' : '#444444';
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(60 + barWidth - 25 - r * 28, topY + barHeight + 16, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = r < p2.roundsWon ? '#ff2200' : '#444444';
      ctx.beginPath();
      ctx.arc(this.width - 60 - barWidth + 25 + r * 28, topY + barHeight + 16, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 3. Center Timer (99s)
    ctx.fillStyle = 'rgba(10, 5, 15, 0.9)';
    ctx.fillRect(this.width / 2 - 40, topY - 10, 80, 60);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.width / 2 - 40, topY - 10, 80, 60);

    ctx.font = 'bold 38px "Impact", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = engine.roundTime <= 10 ? '#ff1100' : '#ffffff';
    ctx.shadowColor = engine.roundTime <= 10 ? '#ff0000' : '#ffaa00';
    ctx.shadowBlur = 10;
    ctx.fillText(`${engine.roundTime}`, this.width / 2, topY + 34);
    ctx.textAlign = 'left';

    // 4. Super Meters (Bottom Corners)
    const superW = 260;
    const superH = 18;
    const botY = this.height - 40;

    // P1 Super Meter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(60, botY, superW, superH);
    ctx.fillStyle = p1.superMeter >= 100 ? '#ffd700' : '#00b4d8';
    ctx.fillRect(60, botY, superW * (p1.superMeter / 100), superH);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, botY, superW, superH);

    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(p1.superMeter >= 100 ? '★ FATAL BLOW READY (SPACE) ★' : 'SUPER METER', 65, botY - 6);

    // P2 Super Meter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(this.width - 60 - superW, botY, superW, superH);
    ctx.fillStyle = p2.superMeter >= 100 ? '#ffd700' : '#00b4d8';
    ctx.fillRect(this.width - 60 - superW * (p2.superMeter / 100), botY, superW * (p2.superMeter / 100), superH);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.width - 60 - superW, botY, superW, superH);

    ctx.textAlign = 'right';
    ctx.fillText(p2.superMeter >= 100 ? '★ FATAL BLOW READY ★' : 'SUPER METER', this.width - 65, botY - 6);
    ctx.textAlign = 'left';

    // 5. Combo Hits Display
    if (p1.comboHits >= 2 && p1.comboTimer > 0) {
      ctx.font = 'bold 36px "Impact", sans-serif';
      ctx.fillStyle = '#ffcc00';
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 15;
      ctx.fillText(`${p1.comboHits} HITS!`, 70, 160);
      ctx.font = 'bold 20px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${p1.comboDamage} DAMAGE`, 70, 190);
    }

    if (p2.comboHits >= 2 && p2.comboTimer > 0) {
      ctx.textAlign = 'right';
      ctx.font = 'bold 36px "Impact", sans-serif';
      ctx.fillStyle = '#ffcc00';
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 15;
      ctx.fillText(`${p2.comboHits} HITS!`, this.width - 70, 160);
      ctx.font = 'bold 20px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${p2.comboDamage} DAMAGE`, this.width - 70, 190);
      ctx.textAlign = 'left';
    }

    ctx.restore();
  }

  // ==========================================
  // ANNOUNCEMENTS & BANNERS
  // ==========================================

  drawAnnouncements(engine) {
    const ctx = this.ctx;
    ctx.save();
    ctx.textAlign = 'center';

    const cx = this.width / 2;
    const cy = this.height / 2 - 30;

    // 1. Intro Banner: ROUND X ... FIGHT!
    if (engine.state === 'intro') {
      const t = engine.stateTimer;
      ctx.font = 'bold 72px "Impact", sans-serif';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;

      if (t < 50) {
        const roundName = engine.round === 1 ? 'ROUND 1' : engine.round === 2 ? 'ROUND 2' : 'FINAL ROUND';
        ctx.fillStyle = '#ffdd00';
        ctx.shadowColor = '#ff2200';
        ctx.shadowBlur = 25;
        ctx.strokeText(roundName, cx, cy);
        ctx.fillText(roundName, cx, cy);
      } else {
        ctx.fillStyle = '#ff1100';
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 35;
        ctx.strokeText('FIGHT!', cx, cy);
        ctx.fillText('FIGHT!', cx, cy);
      }
    }

    // 2. FINISH HIM! Banner
    else if (engine.state === 'finish_him') {
      const pulse = Math.sin(engine.stateTimer * 0.2) * 8;
      ctx.font = `bold ${80 + pulse}px "Impact", sans-serif`;
      ctx.fillStyle = '#ff0000';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 10;
      ctx.shadowColor = '#ff0000';
      ctx.shadowBlur = 30;

      ctx.strokeText('FINISH HIM!', cx, cy);
      ctx.fillText('FINISH HIM!', cx, cy);

      // Subtitle prompt for player
      ctx.font = 'bold 26px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.fillText('กดปุ่ม [ F ] หรือแตะปุ่ม FATALITY สีแดงเพื่อสังหาร!', cx, cy + 70);
    }

    // 3. FATALITY Banner
    else if (engine.state === 'fatality') {
      const t = engine.stateTimer;
      if (t >= 70) {
        ctx.font = 'bold 96px "Impact", sans-serif';
        ctx.fillStyle = '#cc0000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 40;

        ctx.strokeText('FATALITY', cx, cy - 20);
        ctx.fillText('FATALITY', cx, cy - 20);

        if (t >= 150) {
          ctx.font = 'bold 34px "Impact", sans-serif';
          ctx.fillStyle = '#ffd700';
          ctx.shadowBlur = 15;
          const winnerText = `${engine.fatalityPerformer.name.toUpperCase()} WINS!`;
          ctx.fillText(winnerText, cx, cy + 60);

          if (engine.isFlawless) {
            ctx.fillStyle = '#00ffff';
            ctx.fillText('FLAWLESS VICTORY!', cx, cy + 105);
          }
        }
      }
    }

    // 4. Round Over / Decisive Win Banner
    else if (engine.state === 'round_over' || engine.state === 'match_over') {
      ctx.font = 'bold 64px "Impact", sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#ff5500';
      ctx.shadowBlur = 20;

      const winnerText = engine.winner ? `${engine.winner.name.toUpperCase()} WINS!` : 'MATCH OVER';
      ctx.strokeText(winnerText, cx, cy);
      ctx.fillText(winnerText, cx, cy);
    }

    ctx.restore();
  }
}


// ==========================================
// ASHI COMBAT: MORTAL KOMBAT EDITION - MAIN
// ==========================================






class AshiCombatGame {
  constructor() {
    this.canvas = document.getElementById('combatCanvas');
    this.renderer = new CombatRenderer(this.canvas);
    this.engine = null;
    this.ai = new FighterAI('warrior');

    // Flow State: 'title', 'mode_select', 'char_select', 'stage_select', 'versus', 'battle', 'tower', 'game_over', 'victory'
    this.flowState = 'title';

    // Game Mode: '1p' (Arcade Ladder), '2p' (Versus), 'training'
    this.gameMode = '1p';
    this.difficulty = 'warrior';

    // Selections
    this.p1Index = 0;
    this.p2Index = 1;
    this.stageIndex = 0;
    this.towerStep = 0; // Current position in ladder (0 to LADDER.length - 1)

    // Key states
    this.keys = {};
    this.touchInputsP1 = {};

    this.initInputs();
    this.initUI();
    this.renderer.preloadFighterImages(FIGHTERS);
    this.startLoop();
  }

  initInputs() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      combatAudio.ensureContext();

      // UI navigation during menus
      if (this.flowState === 'title' && (e.code === 'Enter' || e.code === 'Space')) {
        this.openModeSelect();
      } else if (this.flowState === 'char_select') {
        this.handleCharSelectKeys(e.code);
      } else if (this.flowState === 'stage_select') {
        this.handleStageSelectKeys(e.code);
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Touch button bindings
    const bindTouch = (btnId, keyName) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const start = (e) => {
        e.preventDefault();
        combatAudio.ensureContext();
        this.touchInputsP1[keyName] = true;
      };
      const end = (e) => {
        e.preventDefault();
        this.touchInputsP1[keyName] = false;
      };
      btn.addEventListener('touchstart', start, { passive: false });
      btn.addEventListener('touchend', end, { passive: false });
      btn.addEventListener('mousedown', start);
      btn.addEventListener('mouseup', end);
    };

    bindTouch('btn-left', 'left');
    bindTouch('btn-right', 'right');
    bindTouch('btn-up', 'up');
    bindTouch('btn-down', 'down');
    bindTouch('btn-punch', 'punch');
    bindTouch('btn-punch-heavy', 'punchHeavy');
    bindTouch('btn-kick', 'kick');
    bindTouch('btn-kick-heavy', 'kickHeavy');
    bindTouch('btn-special', 'special');
    bindTouch('btn-block', 'block');
    bindTouch('btn-super', 'superMove');
    bindTouch('btn-fatality', 'fatality');
  }

  initUI() {
    // Menu Buttons
    document.getElementById('btnStartGame')?.addEventListener('click', () => {
      combatAudio.ensureContext();
      this.openModeSelect();
    });

    document.getElementById('btnMode1P')?.addEventListener('click', () => {
      this.gameMode = '1p';
      this.openCharSelect();
    });

    document.getElementById('btnMode2P')?.addEventListener('click', () => {
      this.gameMode = '2p';
      this.openCharSelect();
    });

    document.getElementById('btnModeTraining')?.addEventListener('click', () => {
      this.gameMode = 'training';
      this.openCharSelect();
    });

    // Audio & Fullscreen buttons
    document.getElementById('btnToggleAudio')?.addEventListener('click', () => {
      combatAudio.setMute(!combatAudio.isMuted);
      const icon = document.getElementById('audioIcon');
      if (icon) icon.textContent = combatAudio.isMuted ? '🔇' : '🔊';
    });

    document.getElementById('btnFullscreen')?.addEventListener('click', () => {
      const elem = document.getElementById('game-container') || document.documentElement;
      if (!document.fullscreenElement) {
        elem.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

    // Rematch & Return buttons
    document.getElementById('btnConfirmChar')?.addEventListener('click', () => {
      this.confirmCharacter();
    });

    document.getElementById('btnRematch')?.addEventListener('click', () => {
      this.startBattle();
    });

    document.getElementById('btnChangeChar')?.addEventListener('click', () => {
      this.openCharSelect();
    });
  }

  getP1Inputs() {
    return {
      up: this.keys['KeyW'] || this.touchInputsP1['up'] || false,
      down: this.keys['KeyS'] || this.touchInputsP1['down'] || false,
      left: this.keys['KeyA'] || this.touchInputsP1['left'] || false,
      right: this.keys['KeyD'] || this.touchInputsP1['right'] || false,
      punch: this.keys['KeyJ'] || this.touchInputsP1['punch'] || false,
      punchHeavy: this.keys['KeyU'] || this.touchInputsP1['punchHeavy'] || false,
      kick: this.keys['KeyK'] || this.touchInputsP1['kick'] || false,
      kickHeavy: this.keys['KeyI'] && this.keys['ShiftLeft'] ? true : this.touchInputsP1['kickHeavy'] || false,
      special: this.keys['KeyI'] || this.touchInputsP1['special'] || false,
      specialIndex: 0,
      block: this.keys['KeyL'] || this.touchInputsP1['block'] || false,
      superMove: this.keys['Space'] || this.touchInputsP1['superMove'] || false,
      fatality: this.keys['KeyF'] || this.touchInputsP1['fatality'] || false
    };
  }

  getP2Inputs() {
    if (this.gameMode === '1p' || this.gameMode === 'training') {
      // Handled by AI
      return this.ai.getInputs(this.engine.p2, this.engine.p1, this.engine);
    }

    // 2P Local Keyboard controls
    return {
      up: this.keys['ArrowUp'] || false,
      down: this.keys['ArrowDown'] || false,
      left: this.keys['ArrowLeft'] || false,
      right: this.keys['ArrowRight'] || false,
      punch: this.keys['Numpad1'] || this.keys['KeyZ'] || false,
      punchHeavy: this.keys['Numpad4'] || this.keys['KeyC'] || false,
      kick: this.keys['Numpad2'] || this.keys['KeyX'] || false,
      kickHeavy: this.keys['Numpad5'] || this.keys['KeyV'] || false,
      special: this.keys['Numpad0'] || this.keys['KeyB'] || false,
      specialIndex: 0,
      block: this.keys['Numpad3'] || this.keys['KeyN'] || false,
      superMove: this.keys['Enter'] || false,
      fatality: this.keys['NumpadDecimal'] || this.keys['KeyM'] || false
    };
  }

  // ==========================================
  // FLOW TRANSITIONS
  // ==========================================

  showScreen(screenId) {
    document.querySelectorAll('.screen-overlay').forEach((el) => {
      el.classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
  }

  openModeSelect() {
    this.flowState = 'mode_select';
    this.showScreen('screen-mode-select');
    combatAudio.playGong();
    combatAudio.announce('CHOOSE YOUR MODE!');
  }

  openCharSelect() {
    this.flowState = 'char_select';
    this.showScreen('screen-char-select');
    this.renderCharSelectGrid();
    this.updateCharSelectPreview();
    combatAudio.announce('CHOOSE YOUR FIGHTER!');
  }

  renderCharSelectGrid() {
    const grid = document.getElementById('charGrid');
    if (!grid) return;
    grid.innerHTML = '';

    FIGHTERS.forEach((f, idx) => {
      const box = document.createElement('div');
      box.className = `char-card ${idx === this.p1Index ? 'selected-p1' : ''} ${idx === this.p2Index && this.gameMode === '2p' ? 'selected-p2' : ''}`;
      box.style.borderColor = f.color;

      box.innerHTML = `
        <div class="char-thumb-wrap">
          <img src="${f.avatar}" alt="${f.name}" class="char-thumb" />
          <div class="char-glow" style="background:${f.color}"></div>
        </div>
        <div class="char-card-name">${f.name}</div>
        <div class="char-card-thai">${f.thaiName}</div>
      `;

      box.addEventListener('click', () => {
        this.p1Index = idx;
        combatAudio.playPunch(false);
        this.updateCharSelectPreview();
        this.renderCharSelectGrid();
      });

      grid.appendChild(box);
    });
  }

  updateCharSelectPreview() {
    const f1 = FIGHTERS[this.p1Index];
    document.getElementById('p1PreviewImg').src = f1.avatar;
    document.getElementById('p1PreviewName').textContent = f1.name.toUpperCase();
    document.getElementById('p1PreviewThai').textContent = f1.thaiName;
    document.getElementById('p1PreviewTitle').textContent = f1.title;
    document.getElementById('p1Quote').textContent = f1.quote;
    document.getElementById('p1AtkBar').style.width = `${(f1.stats.atk / 10) * 100}%`;
    document.getElementById('p1SpdBar').style.width = `${(f1.stats.spd / 10) * 100}%`;
    document.getElementById('p1DefBar').style.width = `${(f1.stats.def / 10) * 100}%`;

    // Special moves list
    const movesList = document.getElementById('p1MovesList');
    if (movesList) {
      movesList.innerHTML = f1.specials
        .map((s) => `<li><span class="move-name">${s.name} (${s.nameTh}):</span> <span class="move-input">${s.input}</span></li>`)
        .join('');
      movesList.innerHTML += `<li class="fatality-move"><span class="move-name">FATALITY - ${f1.fatality.name}:</span> <span class="move-input">${f1.fatality.input}</span></li>`;
    }

    // P2 Setup
    if (this.gameMode === '1p') {
      const nextOpponentId = LADDER[this.towerStep] || 'scorpion';
      this.p2Index = FIGHTERS.findIndex((f) => f.id === nextOpponentId);
      if (this.p2Index === -1) this.p2Index = 1;
    }

    const f2 = FIGHTERS[this.p2Index];
    document.getElementById('p2PreviewImg').src = f2.avatar;
    document.getElementById('p2PreviewName').textContent = f2.name.toUpperCase();
    document.getElementById('p2PreviewThai').textContent = f2.thaiName;
  }

  handleCharSelectKeys(code) {
    const cols = 4;
    const total = FIGHTERS.length;

    if (code === 'KeyA' || code === 'ArrowLeft') {
      this.p1Index = (this.p1Index - 1 + total) % total;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'KeyD' || code === 'ArrowRight') {
      this.p1Index = (this.p1Index + 1) % total;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'KeyW' || code === 'ArrowUp') {
      if (this.p1Index >= cols) this.p1Index -= cols;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'KeyS' || code === 'ArrowDown') {
      if (this.p1Index + cols < total) this.p1Index += cols;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'Enter' || code === 'Space' || code === 'KeyJ') {
      this.confirmCharacter();
    }
  }

  confirmCharacter() {
    combatAudio.playGong();
    const p1 = FIGHTERS[this.p1Index];
    combatAudio.announce(`${p1.name.toUpperCase()}!`);
    this.openStageSelect();
  }

  openStageSelect() {
    this.flowState = 'stage_select';
    this.showScreen('screen-stage-select');
    this.renderStageList();
  }

  renderStageList() {
    const list = document.getElementById('stageList');
    if (!list) return;
    list.innerHTML = '';

    STAGES.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = `stage-card ${idx === this.stageIndex ? 'selected-stage' : ''}`;
      card.innerHTML = `
        <div class="stage-name">${s.name}</div>
        <div class="stage-thai">${s.nameTh}</div>
        <div class="stage-sub">${s.subtitle}</div>
      `;
      card.addEventListener('click', () => {
        this.stageIndex = idx;
        combatAudio.playPunch(false);
        this.renderStageList();
      });
      list.appendChild(card);
    });

    document.getElementById('btnConfirmStage').onclick = () => {
      this.openVersusScreen();
    };
  }

  handleStageSelectKeys(code) {
    if (code === 'KeyW' || code === 'ArrowUp') {
      this.stageIndex = (this.stageIndex - 1 + STAGES.length) % STAGES.length;
      combatAudio.playPunch(false);
      this.renderStageList();
    } else if (code === 'KeyS' || code === 'ArrowDown') {
      this.stageIndex = (this.stageIndex + 1) % STAGES.length;
      combatAudio.playPunch(false);
      this.renderStageList();
    } else if (code === 'Enter' || code === 'Space') {
      this.openVersusScreen();
    }
  }

  openVersusScreen() {
    this.flowState = 'versus';
    this.showScreen('screen-versus');

    const f1 = FIGHTERS[this.p1Index];
    const f2 = FIGHTERS[this.p2Index];

    document.getElementById('vsP1Img').src = f1.avatar;
    document.getElementById('vsP1Name').textContent = f1.name.toUpperCase();
    document.getElementById('vsP1Quote').textContent = f1.quote;

    document.getElementById('vsP2Img').src = f2.avatar;
    document.getElementById('vsP2Name').textContent = f2.name.toUpperCase();
    document.getElementById('vsP2Quote').textContent = f2.quote;

    combatAudio.playGong();
    combatAudio.announce(`${f1.name.toUpperCase()} VERSUS ${f2.name.toUpperCase()}!`);

    setTimeout(() => {
      this.startBattle();
    }, 2800);
  }

  startBattle() {
    this.flowState = 'battle';
    this.showScreen('screen-battle');

    const f1 = FIGHTERS[this.p1Index];
    const f2 = FIGHTERS[this.p2Index];
    const stage = STAGES[this.stageIndex];

    this.engine = new CombatEngine(f1, f2, stage);
    this.engine.startMatch();

    combatAudio.startBGM(stage.theme);
  }

  handleMatchEnd() {
    combatAudio.stopBGM();

    const winner = this.engine.winner;
    const isP1Winner = winner === this.engine.p1;

    if (this.gameMode === '1p') {
      if (isP1Winner) {
        this.towerStep++;
        if (this.towerStep >= LADDER.length) {
          // Beat the game!
          this.openVictoryScreen();
        } else {
          // Advance to next tower fighter
          this.openTowerScreen();
        }
      } else {
        // Defeated in tower
        this.openGameOverScreen();
      }
    } else {
      // 2P mode victory screen
      this.showScreen('screen-match-result');
      document.getElementById('resultWinnerText').textContent = `${winner.name.toUpperCase()} WINS!`;
      document.getElementById('resultWinnerImg').src = winner.data.avatar;
    }
  }

  openTowerScreen() {
    this.flowState = 'tower';
    this.showScreen('screen-tower');

    const ladderList = document.getElementById('towerLadder');
    if (ladderList) {
      ladderList.innerHTML = '';
      [...LADDER].reverse().forEach((fighterId, reverseIdx) => {
        const idx = LADDER.length - 1 - reverseIdx;
        const f = FIGHTERS.find((item) => item.id === fighterId);
        const item = document.createElement('div');
        const isCurrent = idx === this.towerStep;
        const isDefeated = idx < this.towerStep;

        item.className = `tower-slot ${isCurrent ? 'current' : ''} ${isDefeated ? 'defeated' : ''}`;
        item.innerHTML = `
          <div class="tower-step-num">${idx + 1}</div>
          <img src="${f.avatar}" class="tower-thumb" />
          <div class="tower-name">${f.name}</div>
          ${isDefeated ? '<div class="skull-stamp">💀 DEFEATED</div>' : ''}
          ${isCurrent ? '<div class="now-stamp">⚔️ NEXT BATTLE</div>' : ''}
        `;
        ladderList.appendChild(item);
      });
    }

    combatAudio.playGong();
    combatAudio.announce('KOMBAT ADVANCES!');

    setTimeout(() => {
      this.p2Index = FIGHTERS.findIndex((f) => f.id === LADDER[this.towerStep]);
      this.stageIndex = (this.stageIndex + 1) % STAGES.length;
      this.openVersusScreen();
    }, 3500);
  }

  openVictoryScreen() {
    this.flowState = 'victory';
    this.showScreen('screen-victory');

    const p1 = FIGHTERS[this.p1Index];
    document.getElementById('victoryChampImg').src = p1.avatar;
    document.getElementById('victoryChampName').textContent = p1.name.toUpperCase();
    document.getElementById('victoryEpilogue').textContent =
      `ขอคารวะแด่ ${p1.name} ผู้พิชิตศึกมหากาพย์ Ashi Combat! ได้ก้าวขึ้นเป็นสุดยอดนักสู้ในตำนานเหนือหอพักอชิทั้งปวง!`;

    combatAudio.playGong();
    combatAudio.announce('CHAMPION OF ASHI COMBAT! FLAWLESS VICTORY!');
  }

  openGameOverScreen() {
    this.flowState = 'game_over';
    this.showScreen('screen-game-over');
    combatAudio.announce('YOU LOSE!');
  }

  // ==========================================
  // MAIN GAME LOOP (60 FPS)
  // ==========================================

  startLoop() {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (this.flowState === 'battle' && this.engine) {
        const p1Inputs = this.getP1Inputs();
        const p2Inputs = this.getP2Inputs();

        this.engine.update(p1Inputs, p2Inputs);
        this.renderer.render(this.engine);

        if (this.engine.state === 'match_over' && this.engine.stateTimer > 180) {
          this.handleMatchEnd();
        }
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.ashiCombat = new AshiCombatGame();
});


})();
