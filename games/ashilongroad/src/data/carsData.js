export const CARS = [
  {
    id: 'gt',
    name: 'Ashi GT Supercar',
    nameTh: 'อาชิ GT ซูเปอร์คาร์',
    tag: 'SPEED DEMON',
    desc: 'รถสปอร์ตแอโรไดนามิกส์ทรงต่ำ ความเร็วปลายจัดจ้าน สมดุลทั้งทางตรงและเข้าโค้ง',
    stats: {
      speed: 88,
      accel: 80,
      handling: 80,
      drift: 84,
      boost: 86
    },
    physics: {
      maxSpeed: 50,     // ~180 km/h (Boost ~260 km/h)
      accelRate: 23,
      brakeRate: 35,
      turnRate: 2.85,
      grip: 0.94,
      driftGrip: 0.85,
      mass: 1200
    },
    defaultColor: '#ff2255'
  },
  {
    id: 'kart',
    name: 'Ashi Kart 500',
    nameTh: 'โกคาร์ท อาชิซิ่ง',
    tag: 'DRIFT KING',
    desc: 'ขนาดเล็กกระทัดรัด ออกตัวพุ่งไว เลี้ยวคมที่สุด เหมาะกับการเลี้ยงคันเร่งและดริฟต์แคบ',
    stats: {
      speed: 76,
      accel: 94,
      handling: 92,
      drift: 95,
      boost: 82
    },
    physics: {
      maxSpeed: 44,     // ~158 km/h (Boost ~230 km/h)
      accelRate: 27,
      brakeRate: 38,
      turnRate: 3.35,
      grip: 0.92,
      driftGrip: 0.88,
      mass: 850
    },
    defaultColor: '#00d2ff'
  },
  {
    id: 'truck',
    name: 'Ashi Cyber Truck',
    nameTh: 'อาชิ ไซเบอร์ทรัค',
    tag: 'HEAVY BEAST',
    desc: 'รถกระบะเหล็กกล้า แรงบิดมหาศาล น้ำหนักเยอะ ต้องเบรกกะระยะเข้าโค้งอย่างแม่นยำ',
    stats: {
      speed: 82,
      accel: 76,
      handling: 68,
      drift: 72,
      boost: 88
    },
    physics: {
      maxSpeed: 47,     // ~169 km/h (Boost ~245 km/h)
      accelRate: 21,
      brakeRate: 32,
      turnRate: 2.45,
      grip: 0.96,
      driftGrip: 0.82,
      mass: 2200
    },
    defaultColor: '#00ff88'
  },
  {
    id: 'f1',
    name: 'Ashi Formula-X',
    nameTh: 'อาชิ ฟอร์มูล่า วัน',
    tag: 'ULTIMATE RACER',
    desc: 'รถแข่งฟอร์มูล่าวัน ความเร็วสูงสุดทะลุ 200+ km/h ดาวน์ฟอร์ซสูง ควบคุมตามฝีมือผู้ขับ',
    stats: {
      speed: 98,
      accel: 90,
      handling: 86,
      drift: 75,
      boost: 92
    },
    physics: {
      maxSpeed: 56,     // ~202 km/h (Boost ~290 km/h)
      accelRate: 28,
      brakeRate: 44,
      turnRate: 3.15,
      grip: 0.98,
      driftGrip: 0.80,
      mass: 950
    },
    defaultColor: '#ffd700'
  },
  {
    id: 'muscle',
    name: 'Ashi Muscle V8',
    nameTh: 'มัสเซิลคาร์ V8 อาชิ',
    tag: 'DRIFT MACHINE',
    desc: 'เครื่องยนต์ V8 ทรงพลัง เสียงคำรามดุดัน ท้ายปัดสไตล์มัสเซิลคาร์ ดริฟต์ได้มันส์สะใจ',
    stats: {
      speed: 85,
      accel: 85,
      handling: 74,
      drift: 92,
      boost: 85
    },
    physics: {
      maxSpeed: 51,     // ~184 km/h (Boost ~265 km/h)
      accelRate: 24,
      brakeRate: 34,
      turnRate: 2.75,
      grip: 0.90,
      driftGrip: 0.86,
      mass: 1500
    },
    defaultColor: '#9d4edd'
  },
  {
    id: 'hyper',
    name: 'Ashi Valkyrie Hypercar',
    nameTh: 'ไฮเปอร์คาร์ อาชิ วัลคิรี',
    tag: 'CYBER PROTOTYPE',
    desc: 'ไฮเปอร์คาร์ต้นแบบพลังแม่เหล็กไฟฟ้า ครีบ Shark Fin รีดลมความเร็วสูง อัตราเร่งทะลุขีดจำกัด',
    stats: {
      speed: 96,
      accel: 95,
      handling: 88,
      drift: 82,
      boost: 96
    },
    physics: {
      maxSpeed: 55,     // ~198 km/h (Boost ~285 km/h)
      accelRate: 29,
      brakeRate: 42,
      turnRate: 3.10,
      grip: 0.97,
      driftGrip: 0.84,
      mass: 1050
    },
    defaultColor: '#00f0ff'
  },
  {
    id: 'rally',
    name: 'Ashi WRC Rally Beast',
    nameTh: 'แรลลี่ อสูร อาชิ WRC',
    tag: 'ALL-TERRAIN BEAST',
    desc: 'รถแข่งแรลลี่ไฟสปอตไลท์ 4 ดวง โป่งซุ้มล้อกว้าง ลุยได้ทุกสภาพผิว เข้าโค้งแคบคมดั่งใบมีด',
    stats: {
      speed: 84,
      accel: 92,
      handling: 94,
      drift: 90,
      boost: 84
    },
    physics: {
      maxSpeed: 48,     // ~172 km/h (Boost ~250 km/h)
      accelRate: 26,
      brakeRate: 40,
      turnRate: 3.25,
      grip: 0.95,
      driftGrip: 0.90,
      mass: 1250
    },
    defaultColor: '#ff0055'
  },
  {
    id: 'speedster',
    name: 'Ashi Retro Speedster',
    nameTh: 'อาชิ เรโทร สปีดสเตอร์',
    tag: 'CLASSIC ELEGANCE',
    desc: 'รถสปอร์ตคลาสสิกเปิดประทุนทรงโค้งมน ท่อไอเสียข้างโครเมียมคู่ สวยหรูเหนือกาลเวลา',
    stats: {
      speed: 86,
      accel: 88,
      handling: 85,
      drift: 88,
      boost: 86
    },
    physics: {
      maxSpeed: 49,     // ~176 km/h (Boost ~255 km/h)
      accelRate: 25,
      brakeRate: 36,
      turnRate: 2.95,
      grip: 0.93,
      driftGrip: 0.88,
      mass: 1100
    },
    defaultColor: '#e0e7ff'
  }
];
