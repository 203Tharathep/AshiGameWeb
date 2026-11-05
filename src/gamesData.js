export const OFFICIAL_GAMES = [
  {
    id: 'fivenightatashi3',
    title: 'Five Nights at Ashi 3',
    subtitle: '30 ปีต่อมาในบ้านผีสิง Fazbear’s Fright เปิดเสียงล่อ ปิดท่อแอร์ และรีบูตระบบหนี Springtrap',
    playUrl: './games/fivenightatashi3/index.html',
    author: 'AkashiZai',
    category: 'horror',
    categoryLabel: 'สยองขวัญ / เอาชีวิตรอด',
    badge: 'Horror · Part 3',
    thumbnailBg: './games/fivenightatashi3/assets3/cams/office_window_springtrap.jpg',
    characterOverlay: '',
    icon: './games/fivenightatashi3/assets3/sprites/springtrap_full.jpg',
    screenshots: [
      { src: './games/fivenightatashi3/assets3/cams/office_window_springtrap.jpg', caption: 'Springtrap Ashi จ้องมองผ่านกระจกหน้าห้องทำงาน' },
      { src: './games/fivenightatashi3/assets3/cams/office_door_springtrap.jpg', caption: 'Springtrap ประชิดหน้าทางเข้าห้องด้านซ้าย' },
      { src: './games/fivenightatashi3/assets3/cams/cam08_springtrap.jpg', caption: 'ตรวจจับการเคลื่อนไหวในกล้องวงจรปิด (CAM 08)' },
      { src: './games/fivenightatashi3/assets3/cams/office_alarm.jpg', caption: 'สัญญาณเตือนไฟแดงเมื่อระบบระบายอากาศขัดข้อง' }
    ],
    likes: 2150,
    dislikes: 14,
    plays: 29400,
    allowMobileAspect: false,
    description:
      '30 ปีหลังจากตำนานความหลอนสู่บ้านผีสิง Fazbear’s Fright! ห้องทำงานของคุณไม่มีทั้งประตูและหน้ากาก ต้องคอยเปิดเสียงเด็กหัวเราะ (Play Audio) ล่อ Springtrap Ashi ให้ถอยกลับไป ดับเบิลคลิกหรือกดปิดผนึกท่อระบายอากาศ (CAM 11–15) เมื่อมันมุดท่อบุกเข้ามา หลบสายตาวิญญาณหลอนทั้ง 6 ตัว (Phantoms) และรีบหันซ้ายเปิด Maintenance Panel เพื่อ Reboot ระบบ Audio, Camera และ Ventilation ก่อนจะขาดอากาศหายใจ!',
    controls: [
      { key: 'A / แถบซ้าย', action: 'เปิด Maintenance Panel เพื่อ Reboot ระบบที่ขัดข้อง' },
      { key: 'Space / S', action: 'เปิด–ปิดจอมอนิเตอร์กล้องวงจรปิดฝั่งขวา' },
      { key: 'W (ขณะเปิดกล้อง)', action: 'กด Play Audio ส่งเสียงล่อ Springtrap ไปห้องข้างเคียง' },
      { key: 'Q / E (หรือดับเบิลคลิกท่อ)', action: 'สลับดูแผนที่ท่อแอร์ (CAM 11–15) และกด Seal Vent ปิดกั้นท่อ' }
    ]
  },
  {
    id: 'fivenightatashi2',
    title: 'Five Nights at Ashi 2',
    subtitle: 'ภาคต่อสุดหลอนไร้ประตู! สวมหน้ากาก ส่องไฟฉาย และไขลานกล่องดนตรีรับมือ 11 หุ่น',
    playUrl: './games/fivenightatashi2/index.html',
    author: 'AkashiZai',
    category: 'horror',
    categoryLabel: 'สยองขวัญ / เอาชีวิตรอด',
    badge: 'Horror · Part 2',
    thumbnailBg: './games/fivenightatashi2/assets2/cams/office_hall_foxy.jpg',
    characterOverlay: '',
    icon: './games/fivenightatashi2/assets2/sprites/foxy.png',
    screenshots: [
      { src: './games/fivenightatashi2/assets2/cams/office_hall_foxy.jpg', caption: 'ส่องไฟฉายทางเดินกลางรับมือ Fire Ashi' },
      { src: './games/fivenightatashi2/assets2/cams/cam09_all.jpg', caption: 'เวที Show Stage (CAM 09)' },
      { src: './games/fivenightatashi2/assets2/cams/cam11_2.jpg', caption: 'ไขลานกล่องดนตรี Prize Corner (CAM 11)' },
      { src: './games/fivenightatashi2/assets2/cams/cam08_all.jpg', caption: 'ห้อง Parts / Service รวมหุ่น Withered (CAM 08)' }
    ],
    likes: 1920,
    dislikes: 16,
    plays: 26800,
    allowMobileAspect: false,
    description:
      'ภาคต่อ Grand Re-Opening สุดระทึกที่ห้องทำงานไม่มีประตู! คุณต้องเอาชีวิตรอดตั้งแต่เที่ยงคืนถึง 6 โมงเช้าจากหุ่นทั้ง 11 ตัว (รุ่นใหม่ + Withered จากภาคแรก) ด้วยการรีบสวมหน้ากาก Freddy Mask เมื่อไฟกะพริบ รัวไฟฉายส่องทางเดินกลางไล่ Fire Ashi เช็กท่อระบายอากาศซ้าย–ขวา และคอยไขลานกล่องดนตรีที่ CAM 11 ไม่ให้หมด!',
    controls: [
      { key: 'D', action: 'สวม / ถอดหน้ากาก Freddy Mask ป้องกันหุ่นบุกห้อง' },
      { key: 'Z / Ctrl / คลิกโถงกลาง', action: 'ส่องไฟฉายโถงทางเดินกลาง (รัวไฟไล่ Fire Ashi)' },
      { key: 'Q / E', action: 'เปิดไฟเช็กท่อระบายอากาศฝั่งซ้าย / ขวา' },
      { key: 'Space / S และปุ่ม W', action: 'เปิดจอมอนิเตอร์ 12 กล้อง และกด W ค้างไขลานกล่องดนตรี (CAM 11)' }
    ]
  },
  {
    id: 'ashigame',
    title: 'Meme Duel: สงครามการ์ดเพื่อนแท้',
    subtitle: 'การ์ดแบทเทิลสไตล์ Hearthstone ดวลกับบ็อต หรือสร้างห้อง 4 หลักเล่นกับเพื่อน',
    playUrl: './games/ashigame/index.html',
    author: 'AkashiZai',
    category: 'card-battle',
    categoryLabel: 'การ์ดแบทเทิล / ออนไลน์',
    badge: 'Card Battle · Online',
    thumbnailBg: './games/ashigame/images/Gemini_Generated_Image_w62h0zw62h0zw62h.jpg',
    characterOverlay: '',
    icon: './games/ashigame/images/3.jpeg',
    screenshots: [
      { src: './games/ashigame/images/Gemini_Generated_Image_w62h0zw62h0zw62h.jpg', caption: 'การ์ดมีมสุดปั่นในสำรับ' },
      { src: './games/ashigame/images/3.jpeg', caption: 'กิกะชาดหน้าเหลี่ยม (Fighter)' },
      { src: './games/ashigame/images/Gemini_Generated_Image_njs9nynjs9nynjs9.jpg', caption: 'มินเนียนสกิลพิเศษบนสนาม' },
      { src: './games/ashigame/images/30.png', caption: 'สารานุกรมการ์ดและโหมดพิมพ์ A4' }
    ],
    likes: 1790,
    dislikes: 19,
    plays: 24100,
    allowMobileAspect: true,
    description:
      'เกมการ์ดกลยุทธ์สุดปั่นรวมการ์ดมีม 31 ใบพร้อมสกิลเฉพาะตัว อัญเชิญมินเนียนลงสนาม บริหารมานา ใช้แทงค์สายยั่วยุ (Taunt) ป้องกันฮีโร่ และลด HP ฝ่ายตรงข้ามจาก 30 ให้เหลือ 0 รองรับทั้งโหมดดวลกับ AI บ็อต, โหมดสลับกันเล่น 2 คน, โหมดห้องออนไลน์โค้ด 4 หลักแยกหน้าจอ และโหมดพิมพ์การ์ดจริงขนาด A4',
    controls: [
      { key: 'ลากการ์ด / คลิกการ์ด', action: 'อัญเชิญมินเนียนจากมือลงสู่สนามรบ' },
      { key: 'คลิกมินเนียน → เป้าหมาย', action: 'สั่งโจมตีมินเนียนศัตรูหรือฮีโร่อีกฝั่ง' },
      { key: 'ปุ่ม จบเทิร์น (End Turn)', action: 'สลับเทิร์นและรีเฟรชมานาในรอบถัดไป' },
      { key: 'ห้อง 4 หลัก (Online)', action: 'สร้างรหัสห้อง 4 หลักเพื่อดวลแยกจอกับเพื่อน' }
    ]
  },
  {
    id: 'fivenightatashi',
    title: 'Five Nights at Ashi',
    subtitle: 'เอาชีวิตรอดกะดึกเที่ยงคืนถึง 6 โมงเช้า เช็กกล้องและปิดประตูกันหุ่นบุก',
    playUrl: './games/fivenightatashi/index.html',
    author: 'AkashiZai',
    category: 'horror',
    categoryLabel: 'สยองขวัญ / เอาชีวิตรอด',
    badge: 'Horror',
    thumbnailBg: './games/fivenightatashi/assets/cams/cam1a_all.jpg',
    characterOverlay: '',
    icon: './games/fivenightatashi/assets/sprites/freddy.png',
    screenshots: [
      { src: './games/fivenightatashi/assets/cams/office_normal.jpg', caption: 'ห้องทำงานยามกะดึก' },
      { src: './games/fivenightatashi/assets/cams/cam1a_all.jpg', caption: 'กล้องวงจรปิด Show Stage (CAM 1A)' },
      { src: './games/fivenightatashi/assets/cams/cam1c_2.jpg', caption: 'Pirate Cove (CAM 1C)' },
      { src: './games/fivenightatashi/assets/cams/office_left_bonnie.jpg', caption: 'เปิดไฟเช็กหน้าประตูฝั่งซ้าย' }
    ],
    likes: 1640,
    dislikes: 24,
    plays: 21350,
    allowMobileAspect: false,
    description:
      'รับบทพนักงานรักษาความปลอดภัยกะดึกตั้งแต่ 12:00 AM ถึง 6:00 AM คอยเช็กกล้องวงจรปิดทั้ง 11 จุด เปิดไฟส่องทางเดิน และปิดประตูนิรภัยป้องกันหุ่น Animatronics ก่อนที่พลังงานไฟฟ้าจะหมดลง มาพร้อมโหมด Night 1–6 และ Custom Night ปรับระดับ AI ได้ถึง 20!',
    controls: [
      { key: 'เลื่อนเมาส์ / A, D', action: 'หันซ้าย–ขวาในห้องทำงาน' },
      { key: 'Space / S', action: 'เปิด–ปิดจอมอนิเตอร์กล้องวงจรปิด' },
      { key: 'Q / E', action: 'ปิด–เปิดประตูเหล็กฝั่งซ้าย / ขวา' },
      { key: 'Z / C', action: 'เปิด–ปิดไฟส่องทางเดินซ้าย / ขวา' }
    ]
  },
  {
    id: 'akirajung',
    title: 'รักวุ่นวายกับรุ่นพี่ AkiraJung',
    subtitle: 'Visual Novel ซิมูเลชั่นสารภาพรัก สะสม 11 CG และ 5 ฉากจบ',
    playUrl: './games/akirajung/index.html',
    author: '203Tharathep',
    category: 'visual-novel',
    categoryLabel: 'เนื้อเรื่อง / จีบสาว',
    badge: 'Visual Novel',
    thumbnailBg: './games/akirajung/asset/bg/school_gate.jpg',
    characterOverlay: './games/akirajung/asset/img_nobg/Gemini_Generated_Image_5grxkd5grxkd5grx.png',
    icon: './games/akirajung/asset/icon-192.png',
    screenshots: [
      { src: './games/akirajung/asset/bg/school_gate.jpg', caption: 'หน้าประตูโรงเรียนยามเช้า' },
      { src: './games/akirajung/asset/img/Gemini_Generated_Image_5grxkd5grxkd5grx.jpeg', caption: 'รุ่นพี่ AkiraJung' },
      { src: './games/akirajung/asset/img/Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg', caption: 'ภาพสะสมในแกลเลอรี CG' },
      { src: './games/akirajung/asset/bg/rooftop.jpg', caption: 'ดาดฟ้าโรงเรียนยามเย็น' }
    ],
    likes: 1480,
    dislikes: 28,
    plays: 18420,
    allowMobileAspect: true,
    description:
      'เกมเนื้อเรื่องโรแมนติกคอมเมดี้ เมื่อคุณต้องวิ่งฝ่าอุปสรรคสุดปั่นป่วนไปสารภาพรักกับรุ่นพี่ AkiraJung ให้ทันก่อน 8 โมงเช้า ทุกตัวเลือกส่งผลต่อระดับความสัมพันธ์ ไอเทมในกระเป๋า ภาพสะสม CG ทั้ง 11 ภาพ และฉากจบ 5 รูปแบบ พร้อมเสียงประกอบและระบบเซฟเกม',
    controls: [
      { key: 'คลิกซ้าย / แตะจอ', action: 'อ่านบทสนทนาและเลือกตัวเลือก' },
      { key: 'Space / Enter', action: 'ข้ามจังหวะพิมพ์ข้อความ / ไปฉากถัดไป' },
      { key: 'AUTO / SKIP', action: 'เล่นอัตโนมัติ หรือข้ามบทสนทนา' },
      { key: 'SAVE / LOAD', action: 'บันทึกและโหลดเซฟเกมได้ 4 ช่อง' }
    ]
  },
  {
    id: 'ashicard',
    title: 'Ashi Art Toy Blind Box 3D',
    subtitle: 'สุ่มกล่องของขวัญ Art Toy ลุ้นการ์ด Secret และตู้โชว์หมุนได้ 360°',
    playUrl: './games/ashicard/index.html',
    author: '203Tharathep',
    category: 'gacha-3d',
    categoryLabel: 'กล่องสุ่ม / 3D Showcase',
    badge: '3D Blind Box',
    thumbnailBg: './games/ashicard/ashi/Gemini_Generated_Image_9bccp39bccp39bcc.jpeg',
    characterOverlay: '',
    icon: './games/ashicard/ashi/1.jpeg',
    screenshots: [
      { src: './games/ashicard/ashi/Gemini_Generated_Image_9bccp39bccp39bcc.jpeg', caption: 'Cosmic Dreamer (Secret)' },
      { src: './games/ashicard/ashi/qwen_edit_20261004_234512 (1).png', caption: 'Cyber Fantasy (Super Secret)' },
      { src: './games/ashicard/ashi/1.jpeg', caption: 'Sunshine Breeze (SSR)' },
      { src: './games/ashicard/ashi/7.jpeg', caption: 'Starlight Muse (SSR)' }
    ],
    likes: 1325,
    dislikes: 21,
    plays: 15690,
    allowMobileAspect: true,
    description:
      'แกะกล่องสุ่ม Art Toy สไตล์ Pop Mart บนเว็บแบบ 3 มิติ เขย่ากล่องเพื่อฟังเสียงและเช็กคำใบ้ ลุ้นรับการ์ดฟอยล์โฮโลแกรมตั้งแต่ระดับ Regular, SR, SSR ไปจนถึง Secret สุดแรร์ พร้อมจัดแสดงในตู้โชว์ 3D หมุนชมได้รอบทิศทาง 360 องศา',
    controls: [
      { key: 'คลิกกล่อง / Space', action: 'ฉีกแถบเปิดกล่องสุ่ม Art Toy' },
      { key: 'ปุ่มเขย่ากล่อง', action: 'เขย่าเช็กเสียงและดูคำใบ้ความแรร์' },
      { key: 'ลากเมาส์ / ปัดนิ้ว', action: 'หมุนตู้โชว์ 3D รอบทิศทาง 360°' },
      { key: 'ลูกศรซ้าย / ขวา', action: 'สลับดูการ์ดใบก่อนหน้าและถัดไป' }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'card-battle', label: 'การ์ดแบทเทิล' },
  { id: 'horror', label: 'สยองขวัญ' },
  { id: 'visual-novel', label: 'เนื้อเรื่อง' },
  { id: 'gacha-3d', label: 'กล่องสุ่ม 3D' },
  { id: 'favorites', label: 'รายการโปรด' }
];
