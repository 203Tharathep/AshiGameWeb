// ===================================================================
// AshiLane Track (Stage) Definitions
// -------------------------------------------------------------------
// Every track is a flat closed loop described by [x, z] control points.
// Rules for authoring new tracks:
//   * The first point must be (0, 0) and the circuit must run along +Z
//     there (start / finish straight). The last points should approach
//     the origin along the X = 0 line so the grid sits on a straight.
//   * Keep >= 45 m between non-adjacent sections so barriers never cross.
//   * Item boxes / boost pads / tunnels are expressed as fractions (0..1)
//     of the lap distance.
// ===================================================================

export const TRACKS = [
  {
    id: 'beach',
    name: 'Sunset Beach Speedway',
    nameTh: 'ซันเซ็ตบีช สปีดเวย์',
    stageLabel: 'ด่าน 1',
    difficulty: 1,
    desc: 'สนามริมทะเลยามเย็น ถนนกว้าง โค้งยาวไหลลื่น เหมาะกับการฝึกดริฟต์และจังหวะไนโตร',
    defaultLaps: 3,
    trackWidth: 24,
    aiSpeedMul: 0.88,
    points: [
      [0, 0], [0, 90], [10, 170], [70, 215], [150, 215], [205, 165],
      [215, 80], [198, -10], [205, -100], [170, -170], [100, -195],
      [30, -175], [0, -120], [0, -60]
    ],
    itemClusters: [0.2, 0.47, 0.74],
    boostPads: [0.1, 0.58, 0.9],
    tunnel: null,
    theme: {
      sky: 0xff9e6b,
      fog: 0xffb98a,
      fogDensity: 0.0024,
      exposure: 1.05,
      ambient: 0xffe2c4,
      ambientIntensity: 0.75,
      hemiSky: 0xffc89a,
      hemiGround: 0x6a4a2a,
      sun: 0xffd2a0,
      sunIntensity: 1.6,
      ground: '#d8b47c',
      groundDetail: '#c9a066',
      farGround: 0x1f8fb3,
      tarmac: '#2a2a30',
      railA: 0xff7a00,
      railB: 0x00c8ff,
      skyline: 'resort',
      props: 'palms',
      weather: null,
      holograms: false
    }
  },
  {
    id: 'buriram',
    name: 'Buriram Night GP',
    nameTh: 'บุรีรัมย์ ไนท์ กรังด์ปรีซ์',
    stageLabel: 'ด่าน 2',
    difficulty: 2,
    desc: 'สนามกลางคืนแสงนีออน มีอุโมงค์ไฟและแฮร์พินกลางสนาม ต้องเบรกให้ถูกจังหวะ',
    defaultLaps: 3,
    trackWidth: 20,
    aiSpeedMul: 0.95,
    points: [
      [0, 0], [0, 80], [0, 160], [45, 230], [120, 250], [195, 220],
      [260, 150], [280, 50], [260, -50], [220, -140], [150, -210],
      [60, -250], [-40, -250], [-130, -210], [-180, -130], [-190, -30],
      [-150, 50], [-90, 20], [-75, -40], [-62, -115], [-52, -162],
      [-28, -190], [2, -188], [14, -160], [6, -112], [0, -60]
    ],
    itemClusters: [0.18, 0.42, 0.65, 0.84],
    boostPads: [0.03, 0.24, 0.48, 0.94],
    tunnel: [0.47, 0.54],
    theme: {
      sky: 0x0a0c18,
      fog: 0x0a0c18,
      fogDensity: 0.0035,
      exposure: 1.1,
      ambient: 0xb0c4de,
      ambientIntensity: 0.6,
      hemiSky: 0x3a4a8a,
      hemiGround: 0x101018,
      sun: 0xcfdcff,
      sunIntensity: 1.2,
      ground: '#0b0c14',
      groundDetail: '#1b2238',
      farGround: 0x05060c,
      tarmac: '#1c1e24',
      railA: 0xff0055,
      railB: 0x00f3ff,
      skyline: 'city',
      props: 'lamps',
      weather: null,
      holograms: true
    }
  },
  {
    id: 'snow',
    name: 'Frosty Peak Circuit',
    nameTh: 'ยอดเขาหิมะ เซอร์กิต',
    stageLabel: 'ด่าน 3',
    difficulty: 3,
    desc: 'สนามเทคนิคบนภูเขาหิมะ โค้ง S ต่อเนื่องและแฮร์พินแคบ คู่แข่งเก่งขึ้นอย่างเห็นได้ชัด',
    defaultLaps: 3,
    trackWidth: 20,
    aiSpeedMul: 1.0,
    points: [
      [0, 0], [0, 90], [30, 140], [90, 150], [120, 110], [112, 50],
      [150, 10], [212, 28], [248, 82], [285, 95], [318, 58], [322, -20],
      [270, -70], [200, -60], [150, -100], [150, -170], [90, -210],
      [30, -190], [0, -130], [0, -60]
    ],
    itemClusters: [0.15, 0.4, 0.63, 0.85],
    boostPads: [0.05, 0.33, 0.7],
    tunnel: [0.74, 0.79],
    theme: {
      sky: 0xbcd7ee,
      fog: 0xd6e6f5,
      fogDensity: 0.0042,
      exposure: 1.0,
      ambient: 0xdbe9ff,
      ambientIntensity: 0.8,
      hemiSky: 0xe6f2ff,
      hemiGround: 0x8899aa,
      sun: 0xffffff,
      sunIntensity: 1.3,
      ground: '#eef4fb',
      groundDetail: '#d5e2f0',
      farGround: 0xe9f1fa,
      tarmac: '#2b2e36',
      railA: 0x3aa0ff,
      railB: 0xffffff,
      skyline: 'mountains',
      props: 'pines',
      weather: 'snow',
      holograms: false
    }
  },
  {
    id: 'volcano',
    name: 'Ashi Volcano Inferno',
    nameTh: 'ภูเขาไฟอาชิ อินเฟอร์โน',
    stageLabel: 'ด่าน 4',
    difficulty: 4,
    desc: 'ด่านสุดท้าย! ทางตรงยาวสุดโหดสลับแฮร์พินความเร็วสูงรอบภูเขาไฟ บอทระดับโปรไม่ยอมแพ้ง่ายๆ',
    defaultLaps: 3,
    trackWidth: 20,
    aiSpeedMul: 1.06,
    points: [
      [0, 0], [0, 120], [0, 240], [40, 300], [110, 310], [150, 260],
      [140, 180], [180, 120], [260, 120], [320, 170], [380, 140],
      [390, 40], [340, -30], [340, -130], [380, -200], [340, -270],
      [240, -280], [165, -235], [128, -178], [92, -148], [48, -150], [10, -122],
      [0, -60]
    ],
    itemClusters: [0.12, 0.33, 0.55, 0.78],
    boostPads: [0.04, 0.27, 0.6, 0.86],
    tunnel: [0.4, 0.46],
    theme: {
      sky: 0x2a0c0a,
      fog: 0x3a120c,
      fogDensity: 0.0032,
      exposure: 1.15,
      ambient: 0xff9a7a,
      ambientIntensity: 0.55,
      hemiSky: 0xff5a2a,
      hemiGround: 0x1a0808,
      sun: 0xffb07a,
      sunIntensity: 1.25,
      ground: '#1b0f0d',
      groundDetail: '#ff4a12',
      farGround: 0xff3a0a,
      tarmac: '#1a1a1e',
      railA: 0xff3300,
      railB: 0xffcc00,
      skyline: 'volcano',
      props: 'rocks',
      weather: 'embers',
      holograms: false
    }
  }
];

export const DIFFICULTIES = {
  easy: { label: 'ง่าย', aiMul: 0.9, rubberBand: 0.06 },
  normal: { label: 'ปกติ', aiMul: 1.0, rubberBand: 0.05 },
  hard: { label: 'ยาก', aiMul: 1.07, rubberBand: 0.04 }
};

export function getTrackDef(id) {
  return TRACKS.find(t => t.id === id) || TRACKS[0];
}
