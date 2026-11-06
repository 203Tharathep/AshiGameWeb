// Ashi vs Zombie - Levels & World Definitions

const LEVELS_CONFIG = [
    // World 1: Day Campus
    {
        id: '1-1',
        world: 1,
        name: 'Stage 1-1: Welcome to Campus',
        nameTh: 'ด่าน 1-1: จุดเริ่มต้นรั้วมหาวิทยาลัย',
        theme: 'day',
        activeRows: [1, 2, 3], // 3 center lanes
        startingSun: 25,
        skySunInterval: 6.5,
        allowedPlants: ['sunflower', 'peashooter'],
        rewardPlant: 'wallnut',
        waves: [
            { delay: 26, zombies: [{ type: 'basic', row: 2 }] },
            { delay: 54, zombies: [{ type: 'basic', row: 1 }] },
            { delay: 82, zombies: [{ type: 'basic', row: 2 }, { type: 'basic', row: 3 }] },
            { delay: 110, isFlag: true, zombies: [{ type: 'basic', row: 1 }, { type: 'basic', row: 2 }, { type: 'basic', row: 3 }] }
        ]
    },
    {
        id: '1-2',
        world: 1,
        name: 'Stage 1-2: Expansion',
        nameTh: 'ด่าน 1-2: กองทัพกรวยส้มบุก',
        theme: 'day',
        activeRows: [0, 1, 2, 3, 4], // all 5 lanes
        startingSun: 25,
        skySunInterval: 6.5,
        allowedPlants: ['sunflower', 'peashooter', 'wallnut'],
        rewardPlant: 'repeater',
        waves: [
            { delay: 26, zombies: [{ type: 'basic', row: 2 }] },
            { delay: 54, zombies: [{ type: 'basic', row: 1 }, { type: 'basic', row: 3 }] },
            { delay: 82, zombies: [{ type: 'cone', row: 2 }, { type: 'basic', row: 0 }] },
            { delay: 110, zombies: [{ type: 'cone', row: 4 }, { type: 'basic', row: 1 }] },
            { delay: 140, isFlag: true, zombies: [
                { type: 'cone', row: 2 }, { type: 'basic', row: 0 }, { type: 'basic', row: 1 },
                { type: 'basic', row: 3 }, { type: 'basic', row: 4 }
            ]}
        ]
    },
    {
        id: '1-3',
        world: 1,
        name: 'Stage 1-3: Pizza Shield Rush',
        nameTh: 'ด่าน 1-3: วิกฤตการณ์กล่องพิซซ่า',
        theme: 'day',
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 6.5,
        allowedPlants: ['sunflower', 'peashooter', 'repeater', 'wallnut'],
        rewardPlant: 'bomb',
        waves: [
            { delay: 26, zombies: [{ type: 'basic', row: 2 }] },
            { delay: 54, zombies: [{ type: 'shield', row: 3 }] },
            { delay: 82, zombies: [{ type: 'cone', row: 1 }, { type: 'basic', row: 4 }] },
            { delay: 110, isFlag: true, zombies: [
                { type: 'shield', row: 2 }, { type: 'cone', row: 1 }, { type: 'basic', row: 3 }
            ]},
            { delay: 140, zombies: [{ type: 'shield', row: 0 }, { type: 'cone', row: 4 }] },
            { delay: 170, isFlag: true, isFinal: true, zombies: [
                { type: 'shield', row: 1 }, { type: 'shield', row: 3 },
                { type: 'cone', row: 2 }, { type: 'basic', row: 0 }, { type: 'basic', row: 4 }
            ]}
        ]
    },

    // World 2: Night Campus
    {
        id: '2-1',
        world: 2,
        name: 'Stage 2-1: Midnight Shadows',
        nameTh: 'ด่าน 2-1: คืนเดือนดับ แสงจันทร์เลือนราง',
        theme: 'night',
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 8.0,
        allowedPlants: ['sunflower', 'peashooter', 'repeater', 'wallnut', 'bomb'],
        rewardPlant: 'icepea',
        graves: [[1, 7], [3, 6]],
        waves: [
            { delay: 28, zombies: [{ type: 'basic', row: 2 }] },
            { delay: 56, zombies: [{ type: 'cone', row: 1 }, { type: 'basic', row: 3 }] },
            { delay: 84, zombies: [{ type: 'bucket', row: 2 }] },
            { delay: 112, isFlag: true, zombies: [
                { type: 'bucket', row: 2 }, { type: 'cone', row: 1 }, { type: 'basic', row: 3 }
            ]},
            { delay: 140, zombies: [{ type: 'bucket', row: 0 }, { type: 'cone', row: 4 }] },
            { delay: 172, isFlag: true, isFinal: true, zombies: [
                { type: 'bucket', row: 2 }, { type: 'cone', row: 0 }, { type: 'cone', row: 4 },
                { type: 'basic', row: 1 }, { type: 'basic', row: 3 }
            ]}
        ]
    },
    {
        id: '2-2',
        world: 2,
        name: 'Stage 2-2: GigaChad Vault',
        nameTh: 'ด่าน 2-2: กิกะแชดพุ่งทะยาน',
        theme: 'night',
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 8.0,
        allowedPlants: ['sunflower', 'peashooter', 'repeater', 'wallnut', 'bomb', 'icepea'],
        rewardPlant: 'squash',
        graves: [[0, 6], [2, 7], [4, 6]],
        waves: [
            { delay: 28, zombies: [{ type: 'gigachad', row: 2 }] },
            { delay: 56, zombies: [{ type: 'basic', row: 1 }, { type: 'cone', row: 3 }] },
            { delay: 84, zombies: [{ type: 'gigachad', row: 4 }, { type: 'cone', row: 0 }] },
            { delay: 112, isFlag: true, zombies: [
                { type: 'gigachad', row: 2 }, { type: 'bucket', row: 1 }, { type: 'cone', row: 3 }
            ]},
            { delay: 140, zombies: [{ type: 'shield', row: 0 }, { type: 'gigachad', row: 4 }] },
            { delay: 172, isFlag: true, isFinal: true, zombies: [
                { type: 'gigachad', row: 0 }, { type: 'bucket', row: 2 }, { type: 'gigachad', row: 4 },
                { type: 'basic', row: 1 }, { type: 'basic', row: 3 }
            ]}
        ]
    },

    // World 3: Pool / Restroom
    {
        id: '3-1',
        world: 3,
        name: 'Stage 3-1: Pool Party',
        nameTh: 'ด่าน 3-1: สระว่ายน้ำระทึกขวัญ',
        theme: 'pool',
        waterRows: [2, 3],
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 6.5,
        allowedPlants: ['sunflower', 'peashooter', 'repeater', 'wallnut', 'bomb', 'icepea', 'squash', 'lilypad'],
        rewardPlant: 'chomper',
        waves: [
            { delay: 28, zombies: [{ type: 'basic', row: 1 }] },
            { delay: 56, zombies: [{ type: 'basic', row: 2 }, { type: 'cone', row: 0 }] },
            { delay: 84, zombies: [{ type: 'shield', row: 3 }, { type: 'cone', row: 4 }] },
            { delay: 112, isFlag: true, zombies: [
                { type: 'cone', row: 2 }, { type: 'cone', row: 3 }, { type: 'bucket', row: 1 }
            ]},
            { delay: 140, zombies: [{ type: 'gigachad', row: 0 }, { type: 'shield', row: 2 }] },
            { delay: 172, isFlag: true, isFinal: true, zombies: [
                { type: 'bucket', row: 1 }, { type: 'bucket', row: 3 }, { type: 'shield', row: 2 },
                { type: 'cone', row: 0 }, { type: 'cone', row: 4 }
            ]}
        ]
    },
    {
        id: '3-2',
        world: 3,
        name: 'Stage 3-2: The Couch Menace',
        nameTh: 'ด่าน 3-2: การปรากฏตัวของโซฟาจอมถึก',
        theme: 'pool',
        waterRows: [2, 3],
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 6.5,
        allowedPlants: ['sunflower', 'peashooter', 'repeater', 'wallnut', 'bomb', 'icepea', 'squash', 'lilypad', 'chomper'],
        rewardPlant: 'spikeweed',
        waves: [
            { delay: 28, zombies: [{ type: 'couch', row: 1 }] },
            { delay: 56, zombies: [{ type: 'cone', row: 4 }, { type: 'shield', row: 2 }] },
            { delay: 84, zombies: [{ type: 'couch', row: 3 }, { type: 'basic', row: 0 }] },
            { delay: 112, isFlag: true, zombies: [
                { type: 'couch', row: 2 }, { type: 'bucket', row: 0 }, { type: 'cone', row: 4 }
            ]},
            { delay: 140, zombies: [{ type: 'gigachad', row: 1 }, { type: 'shield', row: 3 }] },
            { delay: 172, isFlag: true, isFinal: true, zombies: [
                { type: 'couch', row: 1 }, { type: 'couch', row: 3 },
                { type: 'bucket', row: 2 }, { type: 'cone', row: 0 }, { type: 'cone', row: 4 }
            ]}
        ]
    },

    // World 4: Rooftop & Boss
    {
        id: '4-1',
        world: 4,
        name: 'Stage 4-1: Rooftop Assault',
        nameTh: 'ด่าน 4-1: บุกทะลวงหลังคาดาดฟ้า',
        theme: 'roof',
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 6.2,
        allowedPlants: ['sunflower', 'peashooter', 'repeater', 'wallnut', 'bomb', 'icepea', 'squash', 'chomper', 'spikeweed', 'catapult'],
        rewardPlant: 'gatling',
        waves: [
            { delay: 28, zombies: [{ type: 'shield', row: 2 }] },
            { delay: 56, zombies: [{ type: 'bucket', row: 1 }, { type: 'shield', row: 3 }] },
            { delay: 84, zombies: [{ type: 'couch', row: 2 }, { type: 'cone', row: 0 }] },
            { delay: 112, isFlag: true, zombies: [
                { type: 'couch', row: 2 }, { type: 'gigachad', row: 0 }, { type: 'gigachad', row: 4 }
            ]},
            { delay: 140, zombies: [{ type: 'couch', row: 1 }, { type: 'bucket', row: 3 }] },
            { delay: 172, isFlag: true, isFinal: true, zombies: [
                { type: 'couch', row: 0 }, { type: 'couch', row: 4 }, { type: 'bucket', row: 2 },
                { type: 'shield', row: 1 }, { type: 'shield', row: 3 }
            ]}
        ]
    },
    {
        id: '4-2',
        world: 4,
        name: 'Stage 4-2: BOSS BATTLE - Emperor Ashi',
        nameTh: 'ด่าน 4-2: ศึกตัดสิน บอสใหญ่จักรพรรดิอชิ',
        theme: 'boss',
        isBossLevel: true,
        activeRows: [0, 1, 2, 3, 4],
        startingSun: 25,
        skySunInterval: 5.8,
        allowedPlants: [
            'sunflower', 'peashooter', 'repeater', 'wallnut', 'bomb',
            'icepea', 'squash', 'chomper', 'spikeweed', 'catapult', 'jalapeno', 'gatling', 'hypno'
        ],
        waves: [
            { delay: 15, zombies: [{ type: 'boss', row: 2 }] }
        ]
    }
];

window.LEVELS_CONFIG = LEVELS_CONFIG;
