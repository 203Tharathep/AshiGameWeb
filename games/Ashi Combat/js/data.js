// ==========================================
// ASHI COMBAT: MORTAL KOMBAT EDITION - DATA
// ==========================================

export const STAGES = [
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

export const FIGHTERS = [
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

export const LADDER = [
  'slumber',
  'boxer',
  'liukang',
  'raiden',
  'subzero',
  'scorpion',
  'gigachad',
  'shadow' // Final Boss
];
