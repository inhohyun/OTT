import lookbookimg from '../../../public/icon-192x192.png';
import clothesimg from '../../assets/images/clothes/shirt1.jpg';
import clothesbackimg from '../../assets/images/clothes/shirt1-1.jpg';

export const dummyLookbooks = [
  {
    id: 1,
    createdAt: '2024-07-16',
    nickname: 'John',
    images: [
      {
        clothesId: 101,
        imagePath: {
          path: clothesimg,
          itemStatus: 'FRONT',
        },
      },
      {
        clothesId: 101,
        imagePath: {
          path: clothesbackimg,
          itemStatus: 'BACK',
        },
      },
    ],
    content: 'rjfkdfjdkaslfjsdaklfjsldakfjkslafjsdalkjadsklf',
    tags: ['#여름', '#도시남'],
    salesClothes: [
      {
        clothesId: 101,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1000,
    comments: [
      {
        nickname: 'kimssafy',
        msg: '이쁘네요',
        createdAt: '2024-07-30 17:20:10',
        children: [
          {
            msg: '그러게요',
            nickname: 'Hohyun',
            createdAt: '2024-07-30 17:20:50',
          },
          {
            msg: '그러게요22',
            nickname: 'gahyun',
            createdAt: '2024-07-30 17:21:50',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    createdAt: '2024-07-10',
    nickname: 'JaneDoe',
    images: [
      {
        clothesId: 102,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'BACK',
        },
      },
    ],
    content: 'Autumn Vibes',
    tags: ['#가을', '#따뜻한'],
    salesClothes: [
      {
        clothesId: 102,
        imagePath: {
          path: clothesimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1500,
    comments: [
      {
        nickname: 'AlexJones',
        msg: '가을 느낌 물씬',
        createdAt: '2024-07-10 11:45:00',
        children: [
          {
            msg: '좋아요!',
            nickname: 'SophiaWong',
            createdAt: '2024-07-10 12:10:00',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    createdAt: '2024-07-01',
    nickname: 'MikeSmith',
    images: [
      {
        clothesId: 103,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Winter Wonderland',
    tags: ['#겨울', '#코트'],
    salesClothes: [
      {
        clothesId: 103,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1100,
    comments: [
      {
        nickname: 'SarahLee',
        msg: '정말 따뜻해 보여요!',
        createdAt: '2024-07-02 10:15:00',
        children: [],
      },
    ],
  },
  {
    id: 4,
    createdAt: '2024-07-15',
    nickname: 'SarahLee',
    images: [
      {
        clothesId: 104,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Spring Blossoms',
    tags: ['#봄', '#화사한'],
    salesClothes: [
      {
        clothesId: 104,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 950,
    comments: [
      {
        nickname: 'MikeSmith',
        msg: '봄 느낌 좋아요!',
        createdAt: '2024-07-16 09:30:00',
        children: [],
      },
    ],
  },
  {
    id: 5,
    createdAt: '2024-07-20',
    nickname: 'ChrisBrown',
    images: [
      {
        clothesId: 105,
        imagePath: {
          path: clothesimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Urban Jungle',
    tags: ['#도시', '#스트릿패션'],
    salesClothes: [
      {
        clothesId: 105,
        imagePath: {
          path: clothesimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1300,
    comments: [
      {
        nickname: 'JaneDoe',
        msg: '도시적이고 세련된 룩이에요.',
        createdAt: '2024-07-21 11:00:00',
        children: [],
      },
    ],
  },
  {
    id: 6,
    createdAt: '2024-07-10',
    nickname: 'EmilyClark',
    images: [
      {
        clothesId: 106,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Beach Breeze',
    tags: ['#해변', '#휴양지'],
    salesClothes: [
      {
        clothesId: 106,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1400,
    comments: [
      {
        nickname: 'DavidKim',
        msg: '여름 휴양지에서 입기 딱이네요!',
        createdAt: '2024-07-11 14:20:00',
        children: [],
      },
    ],
  },
  {
    id: 7,
    createdAt: '2024-07-14',
    nickname: 'DavidKim',
    images: [
      {
        clothesId: 107,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Classic Elegance',
    tags: ['#클래식', '#엘레강스'],
    salesClothes: [
      {
        clothesId: 107,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1600,
    comments: [
      {
        nickname: 'SophiaWong',
        msg: '우아한 룩이에요!',
        createdAt: '2024-07-15 15:45:00',
        children: [],
      },
    ],
  },
  {
    id: 8,
    createdAt: '2024-07-05',
    nickname: 'SophiaWong',
    images: [
      {
        clothesId: 108,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Sporty Spice',
    tags: ['#운동', '#스포티'],
    salesClothes: [
      {
        clothesId: 108,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1800,
    comments: [
      {
        nickname: 'AlexJones',
        msg: '스포티한 느낌 최고!',
        createdAt: '2024-07-06 12:30:00',
        children: [],
      },
    ],
  },
  {
    id: 9,
    createdAt: '2024-07-14',
    nickname: 'AlexJones',
    images: [
      {
        clothesId: 109,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Evening Chic',
    tags: ['#저녁', '#시크'],
    salesClothes: [
      {
        clothesId: 109,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1700,
    comments: [
      {
        nickname: 'MiaChen',
        msg: '저녁 모임에 어울리는 룩이에요.',
        createdAt: '2024-07-15 19:00:00',
        children: [],
      },
    ],
  },
  {
    id: 10,
    createdAt: '2024-07-02',
    nickname: 'MiaChen',
    images: [
      {
        clothesId: 110,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Festival Fun',
    tags: ['#페스티벌', '#즐거움'],
    salesClothes: [
      {
        clothesId: 110,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1200,
    comments: [
      {
        nickname: 'John',
        msg: '페스티벌에 딱 어울리는 스타일!',
        createdAt: '2024-07-03 10:30:00',
        children: [],
      },
    ],
  },
  {
    id: 11,
    createdAt: '2024-07-30',
    nickname: 'John',
    images: [
      {
        clothesId: 111,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Cozy Winter',
    tags: ['#겨울', '#코지'],
    salesClothes: [
      {
        clothesId: 111,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 2100,
    comments: [
      {
        nickname: 'kimssafy',
        msg: '정말 따뜻해 보여요!',
        createdAt: '2024-07-31 10:20:00',
        children: [],
      },
    ],
  },
  {
    id: 12,
    createdAt: '2024-07-12',
    nickname: 'JaneDoe',
    images: [
      {
        clothesId: 112,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Street Style',
    tags: ['#거리', '#스트릿'],
    salesClothes: [
      {
        clothesId: 112,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1450,
    comments: [
      {
        nickname: 'ChrisBrown',
        msg: '스트릿 패션 멋져요!',
        createdAt: '2024-07-13 14:00:00',
        children: [],
      },
    ],
  },
  {
    id: 13,
    createdAt: '2024-07-10',
    nickname: 'MikeSmith',
    images: [
      {
        clothesId: 113,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Retro Revival',
    tags: ['#레트로', '#복고'],
    salesClothes: [
      {
        clothesId: 113,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1900,
    comments: [
      {
        nickname: 'SarahLee',
        msg: '복고풍 멋져요!',
        createdAt: '2024-07-11 13:45:00',
        children: [],
      },
    ],
  },
  {
    id: 14,
    createdAt: '2024-07-22',
    nickname: 'SarahLee',
    images: [
      {
        clothesId: 114,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Casual Comfort',
    tags: ['#캐주얼', '#편안함'],
    salesClothes: [
      {
        clothesId: 114,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1650,
    comments: [
      {
        nickname: 'EmilyClark',
        msg: '편안해 보이는 스타일이에요.',
        createdAt: '2024-07-23 09:15:00',
        children: [],
      },
    ],
  },
  {
    id: 15,
    createdAt: '2024-07-15',
    nickname: 'ChrisBrown',
    images: [
      {
        clothesId: 115,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Bohemian Dream',
    tags: ['#보헤미안', '#드림'],
    salesClothes: [
      {
        clothesId: 115,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 2300,
    comments: [
      {
        nickname: 'SophiaWong',
        msg: '보헤미안 룩 너무 예뻐요!',
        createdAt: '2024-07-16 10:00:00',
        children: [],
      },
    ],
  },
  {
    id: 16,
    createdAt: '2024-07-20',
    nickname: 'EmilyClark',
    images: [
      {
        clothesId: 116,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Summer Breeze',
    tags: ['#여름', '#바캉스'],
    salesClothes: [
      {
        clothesId: 116,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 2050,
    comments: [
      {
        nickname: 'DavidKim',
        msg: '시원해 보이는 여름룩이에요!',
        createdAt: '2024-07-21 13:20:00',
        children: [],
      },
    ],
  },
  {
    id: 17,
    createdAt: '2024-07-22',
    nickname: 'DavidKim',
    images: [
      {
        clothesId: 117,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Urban Chic',
    tags: ['#도시', '#시크'],
    salesClothes: [
      {
        clothesId: 117,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1120,
    comments: [
      {
        nickname: 'MiaChen',
        msg: '시크한 도시 스타일이네요!',
        createdAt: '2024-07-23 12:00:00',
        children: [],
      },
    ],
  },
  {
    id: 18,
    createdAt: '2024-07-30',
    nickname: 'SophiaWong',
    images: [
      {
        clothesId: 118,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Classic Winter',
    tags: ['#겨울', '#클래식'],
    salesClothes: [
      {
        clothesId: 118,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1300,
    comments: [
      {
        nickname: 'John',
        msg: '겨울에 입기 딱 좋아요!',
        createdAt: '2024-07-31 11:30:00',
        children: [],
      },
    ],
  },
  {
    id: 19,
    createdAt: '2024-07-18',
    nickname: 'AlexJones',
    images: [
      {
        clothesId: 119,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Spring Awakening',
    tags: ['#봄', '#활기찬'],
    salesClothes: [
      {
        clothesId: 119,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 950,
    comments: [
      {
        nickname: 'EmilyClark',
        msg: '생동감 넘치는 스타일이에요.',
        createdAt: '2024-07-19 10:45:00',
        children: [],
      },
    ],
  },
  {
    id: 20,
    createdAt: '2024-07-25',
    nickname: 'MiaChen',
    images: [
      {
        clothesId: 120,
        imagePath: {
          path: lookbookimg,
          itemStatus: 'FRONT',
        },
      },
    ],
    content: 'Urban Night',
    tags: ['#도시', '#야경'],
    salesClothes: [
      {
        clothesId: 120,
        imagePath: {
          path: clothesimg,
          itemStatus: 'BACK',
        },
      },
    ],
    thumbnail: lookbookimg,
    viewCount: 1450,
    comments: [
      {
        nickname: 'ChrisBrown',
        msg: '야경에서 빛나는 룩!',
        createdAt: '2024-07-28 18:00:00',
        children: [],
      },
    ],
  },
];

export const dummyUsers = [
  {
    uid: 701,
    nickname: 'John',
    name: '홍길동',
    email: 'john@naver.com',
    gender: 'M',
    height: 170,
    weight: 65,
    bodyType: 0,
    sso: null,
    profileImage: 'https://example.com/images/john.jpg',
    createAt: '2024-07-16',
    tags: ['#Formal', '#Casual'], // Preferred styles
  },
  {
    uid: 702,
    nickname: 'JaneDoe',
    name: '이영희',
    email: 'jane@example.com',
    gender: 'F',
    height: 160,
    weight: 55,
    bodyType: 1,
    sso: 'Google',
    profileImage: 'https://example.com/images/jane.jpg',
    createAt: '2024-07-17',
    tags: ['#Casual', '#Chic'], // Preferred styles
  },
  {
    uid: 703,
    nickname: 'MikeSmith',
    name: '김철수',
    email: 'mike@smith.com',
    gender: 'M',
    height: 180,
    weight: 75,
    bodyType: 2,
    sso: 'Facebook',
    profileImage: 'https://example.com/images/mike.jpg',
    createAt: '2024-07-18',
    tags: ['#Sporty', '#Casual'], // Preferred styles
  },
  {
    uid: 704,
    nickname: 'SarahLee',
    name: '이민정',
    email: 'sarah@lee.com',
    gender: 'F',
    height: 165,
    weight: 50,
    bodyType: 0,
    sso: null,
    profileImage: 'https://example.com/images/sarah.jpg',
    createAt: '2024-07-19',
    tags: ['#Elegant', '#Casual'], // Preferred styles
  },
  {
    uid: 705,
    nickname: 'ChrisBrown',
    name: '박영수',
    email: 'chris@brown.com',
    gender: 'M',
    height: 175,
    weight: 68,
    bodyType: 1,
    sso: 'Twitter',
    profileImage: 'https://example.com/images/chris.jpg',
    createAt: '2024-07-20',
    tags: ['#Street', '#Casual'], // Preferred styles
  },
  {
    uid: 706,
    nickname: 'EmilyClark',
    name: '최수정',
    email: 'emily@clark.com',
    gender: 'F',
    height: 158,
    weight: 52,
    bodyType: 0,
    sso: 'LinkedIn',
    profileImage: 'https://example.com/images/emily.jpg',
    createAt: '2024-07-21',
    tags: ['#Bohemian', '#Casual'], // Preferred styles
  },
  {
    uid: 707,
    nickname: 'DavidKim',
    name: '김대위',
    email: 'david@kim.com',
    gender: 'M',
    height: 182,
    weight: 80,
    bodyType: 2,
    sso: 'GitHub',
    profileImage: 'https://example.com/images/david.jpg',
    createAt: '2024-07-22',
    tags: ['#Formal', '#Classic'], // Preferred styles
  },
  {
    uid: 708,
    nickname: 'SophiaWong',
    name: '황미영',
    email: 'sophia@wong.com',
    gender: 'F',
    height: 162,
    weight: 54,
    bodyType: 1,
    sso: null,
    profileImage: 'https://example.com/images/sophia.jpg',
    createAt: '2024-07-23',
    tags: ['#Chic', '#Elegant'], // Preferred styles
  },
  {
    uid: 709,
    nickname: 'AlexJones',
    name: '정훈',
    email: 'alex@jones.com',
    gender: 'M',
    height: 178,
    weight: 72,
    bodyType: 1,
    sso: 'Twitter',
    profileImage: 'https://example.com/images/alex.jpg',
    createAt: '2024-07-24',
    tags: ['#Urban', '#Casual'], // Preferred styles
  },
  {
    uid: 710,
    nickname: 'MiaChen',
    name: '진수',
    email: 'mia@chen.com',
    gender: 'F',
    height: 160,
    weight: 53,
    bodyType: 0,
    sso: 'Instagram',
    profileImage: 'https://example.com/images/mia.jpg',
    createAt: '2024-07-25',
    tags: ['#Vintage', '#Casual'], // Preferred styles
  },
];

export default dummyUsers;
