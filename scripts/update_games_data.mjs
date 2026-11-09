import fs from 'fs';

let content = fs.readFileSync('src/gamesData.js', 'utf8');

const combatGame = `  {
    id: 'ashicombat',
    title: 'Ashi Kombat: Realm of Memes',
    subtitle: 'เกมต่อสู้ 2D สไตล์ Mortal Kombat รวม 12 ยอดนักสู้อชิ ท่าไม้ตาย บอลเพลิง และ Fatality เผด็จศึก!',
    playUrl: './games/ashicombat/index.html',
    author: 'AshiTeam',
    category: 'fighting',
    categoryLabel: 'ต่อสู้ / แอ็กชัน',
    badge: 'Mortal Kombat Style · 12 Ashi Fighters',
    coverFit: 'cover',
    thumbnailBg: './games/ashicombat/assets/cover.jpg',
    characterOverlay: '',
    icon: './games/ashicombat/assets/icon.png',
    screenshots: [
      { src: './games/ashicombat/assets/cover.jpg', caption: 'Ashi Kombat: ปกเกมมหาศึกจ้าวยุทธภพ' },
      { src: './games/ashicombat/assets/fighters/fire_ashi.jpg', caption: 'Fire Ashi อชิมาเติมไฟ จอมยุทธ์เพลิงมังกรบรรลัยกัลป์' },
      { src: './games/ashicombat/assets/fighters/goro_ashi.jpg', caption: 'Goro Ashi อชิสี่แขน จอมพลังผู้บดขยี้แผ่นดิน' },
      { src: './games/ashicombat/assets/fighters/berserk_ashi.jpg', caption: 'Berserk Ashi อชิคลั่งเสื้อขาด สัญชาตญาณสัตว์ป่า' },
      { src: './games/ashicombat/assets/fighters/spider_ashi.jpg', caption: 'Spider Ashi สไปเดอร์อชิ โหนใยถีบกวาดล้าง' },
      { src: './games/ashicombat/assets/fighters/ghoul_ashi.jpg', caption: 'Ghoul Ashi กูลอชิตาแดง คากุเนะสีเลือดแทงทะลวง' }
    ],
    likes: 4820,
    dislikes: 12,
    plays: 62500,
    allowMobileAspect: true,
    defaultMobileAspect: false,
    description:
      'มหาศึกเกมต่อสู้ 2D แนว Mortal Kombat สุดมันส์ในตำนานฉบับมีมอชิ! เลือกตัวละครจาก 12 ร่างอชิสุดแกร่ง: Fire Ashi (อชิมาเติมไฟ), Goro Ashi (อชิ 4 แขน), Berserk Ashi (อชิคลั่งเสื้อขาด), Chonky Tank Ashi (อชิบิ๊กไซส์), Spider Ashi, Ghoul Ashi (กูลคาเนกิ), Sky Ashi (อชิเหินเวหา), Dora Ashi (โดราอชิฟันทอง), Bikini Ashi, Senior Ashi, Bucktooth Ashi และ Scooby Ashi! พร้อมระบบคอมโบสุดเดือด, เกจท่าไม้ตาย Fatal Blow X-Ray, เสียงพากย์โฆษกยุค 90s และฉากจบเผด็จศึก "FINISH HIM! - FATALITY!" เลือดสาดสะใจ! รองรับทั้งโหมด Arcade ไต่หอคอย, ดวลกับคอม VS CPU, และเล่นสองคนบนจอเดียวกัน!',
    controls: [
      { key: 'W / A / S / D', action: 'เคลื่อนที่ / กระโดด / ย่อตัว / แดชหลบ' },
      { key: 'U / J (หมัดเบา / หมัดหนัก)', action: 'ออกหมัดโจมตี (กด ย่อตัว+J เพื่อทำ Uppercut เสยขึ้นฟ้า)' },
      { key: 'I / K (เตะเบา / เตะหนัก)', action: 'ออกลูกเตะ (กด ย่อตัว+I เพื่อเตะกวาดขาให้ล้ม)' },
      { key: 'L หรือ Shift (Block)', action: 'ตั้งการ์ดป้องกัน ลดดาเมจ 85%' },
      { key: 'Spacebar (Fatal Blow)', action: 'ใช้ท่าไม้ตายสูงสุดเมื่อเกจ Super เต็ม 100' },
      { key: 'ปุ่ม F หรือ Space ตอน Finish Him', action: 'ปลดปล่อยท่าสังหารโหด FATALITY เผด็จศึก!' },
      { key: 'จอสัมผัส (มือถือ / แท็บเล็ต)', action: 'มีปุ่มจอยสติ๊กจำลอง D-Pad และปุ่มกดอาเขตครบครันบนหน้าจอ' }
    ]
  },`;

if (!content.includes("'ashicombat'")) {
  content = content.replace('export const OFFICIAL_GAMES = [', 'export const OFFICIAL_GAMES = [\n' + combatGame);
}

const catTarget = `export const CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด' },`;
const catReplace = `export const CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'fighting', label: 'ต่อสู้ / แอ็กชัน' },`;

if (!content.includes("'fighting'")) {
  content = content.replace(catTarget, catReplace);
}

fs.writeFileSync('src/gamesData.js', content, 'utf8');
console.log('Successfully registered ashicombat into src/gamesData.js');

