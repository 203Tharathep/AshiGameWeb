export const OFFICIAL_GAMES = [
  {
    id: 'ashivszombie',
    title: 'Ashi vs Zombie: Defense of the Dorm',
    subtitle: 'เกมกันป้อมสไตล์ Plants vs Zombies วางแนวพืชอชิ 14 ชนิด สกัดกั้นกองทัพซอมบี้บุกหอพัก',
    playUrl: './games/ashivszombie/index.html',
    author: '203Tharathep',
    category: 'defense',
    categoryLabel: 'กันป้อม / วางแผน',
    badge: 'Tower Defense · PvZ Style',
    thumbnailBg: './games/akirajung/asset/bg/school_gate.jpg',
    characterOverlay: './games/ashivszombie/assets/sprites/zombie_boss.png',
    icon: './games/ashivszombie/assets/sprites/plant_peashooter.png',
    screenshots: [
      { src: './games/ashivszombie/assets/sprites/zombie_boss.png', caption: 'Stage 4-2: Final Boss ศึกตัดสิน มหาจักรพรรดิอชิ 6,500 HP' },
      { src: './games/ashivszombie/assets/sprites/plant_peashooter.png', caption: 'Gekko-Ashi อชิมือปืนเก๊กโกะ ยิงสกัดซอมบี้ในเลน' },
      { src: './games/ashivszombie/assets/sprites/zombie_gigachad.png', caption: 'Gigachad Zombie ซอมบี้กิกะชาดหน้าเหลี่ยม เลือดหนาพิเศษ' },
      { src: './games/ashivszombie/assets/sprites/plant_sunflower.png', caption: 'Sun-Ashi อชิบิกินี่พลังแสง ผลิตแต้มดวงอาทิตย์' }
    ],
    likes: 2650,
    dislikes: 11,
    plays: 35800,
    allowMobileAspect: false,
    description:
      'เกมแนว Plants vs Zombies สุดฮาฉบับมีมอชิ! วางแผนปลูกกองทัพพืชผู้พิทักษ์ 14 ชนิด ทั้ง Sun-Ashi บิกินี่ผลิตแสง, Gekko-Ashi มือปืนยิงพลาสมา, อชิจูบเบิ้ล Repeater และ Fat-Ashi กำแพงเลือด 4,000 HP เพื่อป้องกันหอพักจากการรุกรานของซอมบี้อชิหลากสายพันธุ์ ผจญภัยฝ่า 8+ ด่าน ครบทั้งด่านกลางวัน หอพักยามค่ำคืน สระน้ำ ดาดฟ้า และบอสใหญ่ Final Boss มหาจักรพรรดิอชิ 6,500 HP พร้อมดนตรี Web Audio และสารานุกรม Almanac ครบครัน!',
    controls: [
      { key: 'คลิกซ้าย / แตะจอ', action: 'คลิกเก็บดวงอาทิตย์ ☀️ และเลือกการ์ดพืชมาวางลงแปลงหญ้า' },
      { key: 'พลั่ว (Shovel)', action: 'เลือกพลั่วแล้วคลิกที่พืชเพื่อขุดถอนเปิดทาง' },
      { key: 'ปุ่ม 1x / 2x', action: 'ปรับความเร็วเกม เพิ่มความสะใจในการต่อสู้' },
      { key: 'สารานุกรม (Almanac)', action: 'เปิดอ่านสเตตัส ประวัติตัวละคร และวิธีแก้ทางพืช/ซอมบี้' }
    ]
  },
  {
    id: 'ashitunnel',
    title: 'ทางออกที่ 10 : Ashi Tunnel',
    subtitle: 'เกม 3D สไตล์ The Exit 8 ในอุโมงค์สถานี จดจำโปสเตอร์ 10 แผ่น จับผิดจุดหลอนสู่อิสรภาพ',
    playUrl: './games/ashitunnel/index.html',
    author: '203Tharathep',
    category: 'horror',
    categoryLabel: 'สยองขวัญ / เอาชีวิตรอด',
    badge: '3D Anomaly · Exit 8',
    thumbnailBg: './games/ashitunnel/ashi/variants/R2_var_cerberus.jpg',
    characterOverlay: '',
    icon: './games/ashitunnel/ashi/variants/L1_var_eyes_open.jpg',
    screenshots: [
      { src: './games/ashitunnel/ashi/variants/R2_var_cerberus.jpg', caption: 'โกลเด้นอชิกลายร่างเป็นหมาปีศาจเซเบอรัสตาแดง' },
      { src: './games/ashitunnel/ashi/variants/L1_var_eyes_open.jpg', caption: 'เจ้าชายนิทราลืมตาตื่นจ้องมองผู้เล่น' },
      { src: './games/ashitunnel/ashi/variants/L2_var_gigachad.jpg', caption: 'เหนียงแห่งสันติภาพกลายร่างเป็นกิกะชาดหน้าเหลี่ยม' },
      { src: './games/ashitunnel/ashi/base/R2_dog.jpg', caption: 'ภาพด่านต้นแบบปกติ (ทางออก 0) ต้องจำให้แม่นยำ' }
    ],
    likes: 2480,
    dislikes: 12,
    plays: 31200,
    allowMobileAspect: true,
    description:
      'คุณติดอยู่ในอุโมงค์ใต้ดินสถานีอชิที่วนลูปไม่รู้จบในรูปแบบ 3D สมจริง! ใน "ทางออก 0" จงเดินสำรวจและจดจำภาพโปสเตอร์ทั้งหมด 10 แผ่นให้แม่นยำ หากทางเดินปกติดีให้เดินตรงไปสุดทางแล้วเลี้ยวขวาเพื่อเพิ่มด่าน แต่ถ้าพบสิ่งผิดปกติแม้แต่น้อย (ภาพเปลี่ยนไป, ไฟกระพริบ, หรือสิ่งลี้ลับ) ให้รีบหันหลังเดินย้อนกลับเลี้ยวขวาทันที! ฝ่าฟันให้ครบทั้ง 10 ด่านเพื่อหนีสู่อิสรภาพ',
    controls: [
      { key: 'W / A / S / D', action: 'เดินสำรวจในอุโมงค์ (กด Shift เพื่อวิ่ง)' },
      { key: 'เมาส์ / จอยมือถือ', action: 'หันมุมมองกล้อง 360 องศา (คลิกเพื่อล็อกเมาส์)' },
      { key: 'คลิกขวา / F / ซูม', action: 'ซูมเพ่ง 2.5× ส่องสังเกตรายละเอียดภาพโปสเตอร์' },
      { key: 'R / ปุ่มกลับหลัง', action: 'กลับหลังหันทันที (เมื่อพบความผิดปกติ)' }
    ]
  },
  {
    id: 'fivenightatashisisterlocation',
    title: 'Five Nights at Ashi: Sister Location',
    subtitle: 'สัมผัสเนื้อเรื่องเต็ม 5 คืน ลิฟต์ใต้ดิน กล่องควบคุม บันทึกเสียง HandUnit และห้องลับ Ennard',
    playUrl: './games/fivenightatashisisterlocation/index.html',
    author: 'AkashiZai',
    category: 'horror',
    categoryLabel: 'สยองขวัญ / เอาชีวิตรอด',
    badge: 'Horror · Sister Location',
    thumbnailBg: './games/fivenightatashisisterlocation/assets5/cams/control_module.jpg',
    characterOverlay: './games/fivenightatashisisterlocation/assets5/sprites/baby.png',
    icon: './games/fivenightatashisisterlocation/assets5/sprites/ennard.png',
    screenshots: [
      { src: './games/fivenightatashisisterlocation/assets5/cams/control_module.jpg', caption: 'Primary Control Module ห้องควบคุมส่วนกลาง ส่องไฟและช็อกกระตุ้นเวที' },
      { src: './games/fivenightatashisisterlocation/assets5/cams/parts_freddy_closed.jpg', caption: 'Night 3: ผ่าตัดปลดชนวน Funtime Freddy และจับ Bon-Bon ในห้องซ่อม' },
      { src: './games/fivenightatashisisterlocation/assets5/cams/springlock_gameplay.jpg', caption: 'Night 4: เอาชีวิตรอดในชุด Springlock หมุนสลักไขลานไม่ให้ดีดหลุด' },
      { src: './games/fivenightatashisisterlocation/assets5/cams/private_room_office.jpg', caption: 'Secret Private Room ศึกชี้ชะตากับ Ennard สไตล์ FNaF 1 แบบคลาสสิก' }
    ],
    likes: 2510,
    dislikes: 15,
    plays: 34800,
    allowMobileAspect: false,
    description:
      'ภาคเนื้อเรื่องสุดยิ่งใหญ่และน่าสะพรึงกลัวที่สุดของมหากาพย์ Five Nights at Ashi! สวมบทบาทเป็นช่างเทคนิคกะดึก Eggs Benedict ลงลิฟต์สู่ศูนย์วิจัยใต้ดิน Circus Baby’s Entertainment and Rental รับฟังคำแนะนำสุดป่วนจาก HandUnit คลานผ่าน Ballora Gallery โดยฟังเสียงเพลงเต้นรำ ใช้ Flash Beacon ส่องไฟเป็นจังหวะใน Funtime Auditorium ผ่าตัดถอดชิป Funtime Freddy และ Bon-Bon เอาชีวิตรอดจากการถูกบีบอัดในชุด Springlock และเลือกเส้นทางสู่ตอนจบ 2 แบบ: Real Ending ในห้อง Scooping Room หรือ Fake Ending ในห้องลับ Private Room ต่อกรกับ Ennard ด้วยรหัส 1-9-8-3!',
    controls: [
      { key: 'Space / คลิกปุ่ม', action: 'ข้ามบทสนทนา / ส่องไฟ / กดช็อกไฟฟ้า / ดึงประตูกล่องใต้โต๊ะ' },
      { key: 'A / D (ในคืนที่ 4)', action: 'สลัดตัว Minireena ที่ปีนขึ้นชุด Springlock Suit' },
      { key: 'คลิกสลักไขลาน (คืนที่ 4)', action: 'คลิกค้างเพื่อหมุนไขลาน Springlocks ทั้ง 10 จุดไม่ให้หลุด' },
      { key: 'A / W / D (ในห้อง Private Room)', action: 'ปิด–เปิดประตูซ้าย, ท่อระบายอากาศบน, และประตูด้านขวา' },
      { key: 'พิมพ์คำว่า L-O-L', action: 'แก้ภาพบั๊กไวรัส Lolbit บนหน้าจอคอมพิวเตอร์' }
    ]
  },
  {
    id: 'fivenightatashi4',
    title: 'Five Nights at Ashi 4',
    subtitle: 'บทสรุปแห่งฝันร้าย The Final Chapter คอยฟังเสียงหายใจที่ประตู ซุ่มดูตู้เสื้อผ้า และไล่ Freddles บนเตียง',
    playUrl: './games/fivenightatashi4/index.html',
    author: 'AkashiZai',
    category: 'horror',
    categoryLabel: 'สยองขวัญ / เอาชีวิตรอด',
    badge: 'Horror · Part 4',
    thumbnailBg: './games/fivenightatashi4/assets4/cams/bedroom_normal.jpg',
    characterOverlay: './games/fivenightatashi4/assets4/sprites/n_fredbear.png',
    icon: './games/fivenightatashi4/assets4/sprites/plushtrap.png',
    screenshots: [
      { src: './games/fivenightatashi4/assets4/cams/bedroom_normal.jpg', caption: 'ห้องนอนยามค่ำคืน หมุนตัวสำรวจประตูซ้าย ขวา ตู้เสื้อผ้า และเตียงนอน' },
      { src: './games/fivenightatashi4/assets4/cams/left_hall_bonnie_close.jpg', caption: 'Nightmare Bonnie โผล่ประชิดประตูซ้าย ต้องรีบปิดประตูก่อนส่องไฟ' },
      { src: './games/fivenightatashi4/assets4/cams/plushtrap_chair.jpg', caption: 'มินิเกม Fun with Plushtrap ส่องไฟให้หยุดตรงจุด X เพื่อเริ่มคืนถัดไปที่ตี 2 (+2 ชม.)' },
      { src: './games/fivenightatashi4/assets4/cams/bed_nightmare.jpg', caption: 'Nightmare Ashi บอสเงาสุดหลอนบนเตียงนอน' }
    ],
    likes: 2340,
    dislikes: 13,
    plays: 32100,
    allowMobileAspect: false,
    description:
      'บทสรุปสุดท้ายแห่งฝันร้าย The Final Chapter! คืนนี้ไม่มีทั้งห้องทำงานและกล้องวงจรปิด คุณติดอยู่ในห้องนอนที่มีประตู 2 ข้าง ตู้เสื้อผ้า และเตียงนอนข้างหลัง จงตั้งใจฟัง "เสียงหายใจ (Breathing)" ให้ดี หากได้ยินเสียงหายใจที่ประตู ห้ามเปิดไฟฉายเด็ดขาด ให้รีบปิดประตูค้างไว้จนกว่ามันจะเดินจากไป ส่องไฟไล่ลูกหมี Freddles บนเตียงก่อนที่ Nightmare Freddy จะรวมร่าง ปิดตู้เสื้อผ้าไล่ Nightmare Foxy และเผชิญหน้ากับ Nightmare Fredbear และ Nightmare ในคืนที่ 5-7 พร้อมมินิเกมดัก Plushtrap บนเก้าอี้เพื่อชิงโบนัส 2 ชั่วโมง!',
    controls: [
      { key: 'A / ลูกศรซ้าย', action: 'วิ่งไปสำรวจและเฝ้าระวังที่ประตูซ้าย (Left Door)' },
      { key: 'D / ลูกศรขวา', action: 'วิ่งไปสำรวจและเฝ้าระวังที่ประตูขวา (Right Door)' },
      { key: 'W / ลูกศรขึ้น', action: 'วิ่งไปสำรวจตู้เสื้อผ้ากลางห้อง (Closet)' },
      { key: 'S / ลูกศรลง', action: 'หันหลังกลับมาดูเตียงนอน (Bed) หรือกลับเข้าห้องนอน' },
      { key: 'Space / Z (กดค้าง)', action: 'ส่องไฟฉาย (ห้ามส่องถ้าได้ยินเสียงหายใจประชิดประตู!)' },
      { key: 'Shift / X (กดค้าง)', action: 'ดึงปิดประตูบานนั้นค้างไว้เพื่อกันหุ่นบุก' }
    ]
  },
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
    playUrl: 'https://ashigame.onrender.com/',
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
  { id: 'defense', label: 'กันป้อม / วางแผน' },
  { id: 'card-battle', label: 'การ์ดแบทเทิล' },
  { id: 'horror', label: 'สยองขวัญ' },
  { id: 'visual-novel', label: 'เนื้อเรื่อง' },
  { id: 'gacha-3d', label: 'กล่องสุ่ม 3D' },
  { id: 'favorites', label: 'รายการโปรด' }
];
