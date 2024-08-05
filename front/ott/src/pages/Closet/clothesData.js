// Importing images
import dress1 from '../../assets/images/clothes/dress1.jpg';
import dress1Back from '../../assets/images/clothes/dress1-1.jpg';
import dress2 from '../../assets/images/clothes/dress2.jpg';
import dress3 from '../../assets/images/clothes/dress3.jpg';
import outer1 from '../../assets/images/clothes/outer1.jpg';
import outer1Back from '../../assets/images/clothes/outer1-1.jpg';
import outer2 from '../../assets/images/clothes/outer2.jpg';
import outer2Back from '../../assets/images/clothes/outer2-1.jpg';
import outer3 from '../../assets/images/clothes/outer3.jpg';
import outer3Back from '../../assets/images/clothes/outer3-1.jpg';
import pants1 from '../../assets/images/clothes/pants1.jpg';
import pants1Back from '../../assets/images/clothes/pants1-1.jpg';
import pants2 from '../../assets/images/clothes/pants2.jpg';
import pants2Back from '../../assets/images/clothes/pants2-1.jpg';
import pants3 from '../../assets/images/clothes/pants3.jpg';
import pants3Back from '../../assets/images/clothes/pants3-1.jpg';
import shirt1 from '../../assets/images/clothes/shirt1.jpg';
import shirt1Back from '../../assets/images/clothes/shirt1-1.jpg';
import shirt2 from '../../assets/images/clothes/shirt2.jpg';
import shirt2Back from '../../assets/images/clothes/shirt2-1.jpg';
import shirt3 from '../../assets/images/clothes/shirt3.jpg';
import shirt3Back from '../../assets/images/clothes/shirt3-1.jpg';

const clothesData = [
  {
    id: 1,
    category: '한벌옷',
    img: [dress1, dress1Back],
    size: 100,
    brand: 'Brand A',
    purchase: 'https://example.com/purchase1',
    publicStatus: 'PUBLIC',
    salesStatus: 'ON_SALE',
    color: 'blue',
    gender: 'COMMON',
    uid: 1,
    isLiked: false,
  },
  {
    id: 2,
    category: '한벌옷',
    img: [dress2],
    size: 100,
    brand: 'Brand B',
    purchase: 'https://example.com/purchase2',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'red',
    gender: 'WOMAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 3,
    category: '한벌옷',
    img: [dress3],
    size: 100,
    brand: 'Brand C',
    purchase: 'https://example.com/purchase3',
    publicStatus: 'PUBLIC',
    salesStatus: 'ON_SALE',
    color: 'green',
    gender: 'MAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 4,
    category: '아우터',
    img: [outer1, outer1Back],
    size: 100,
    brand: 'Brand D',
    purchase: 'https://example.com/purchase4',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'black',
    gender: 'COMMON',
    uid: 1,
    isLiked: false,
  },
  {
    id: 5,
    category: '아우터',
    img: [outer2, outer2Back],
    size: 100,
    brand: 'Brand E',
    purchase: 'https://example.com/purchase5',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'white',
    gender: 'MAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 6,
    category: '아우터',
    img: [outer3, outer3Back],
    size: 100,
    brand: 'Brand F',
    purchase: 'https://example.com/purchase6',
    publicStatus: 'PUBLIC',
    salesStatus: 'ON_SALE',
    color: 'gray',
    gender: 'WOMAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 7,
    category: '하의',
    img: [pants1, pants1Back],
    size: 100,
    brand: 'Brand G',
    purchase: 'https://example.com/purchase7',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'blue',
    gender: 'COMMON',
    uid: 1,
    isLiked: false,
  },
  {
    id: 8,
    category: '하의',
    img: [pants2, pants2Back],
    size: 100,
    brand: 'Brand H',
    purchase: 'https://example.com/purchase8',
    publicStatus: 'PUBLIC',
    salesStatus: 'ON_SALE',
    color: 'black',
    gender: 'WOMAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 9,
    category: '하의',
    img: [pants3, pants3Back],
    size: 100,
    brand: 'Brand I',
    purchase: 'https://example.com/purchase9',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'gray',
    gender: 'MAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 10,
    category: '상의',
    img: [shirt1, shirt1Back],
    size: 100,
    brand: 'Brand J',
    purchase: 'https://example.com/purchase10',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'white',
    gender: 'WOMAN',
    uid: 1,
    isLiked: false,
  },
  {
    id: 11,
    category: '상의',
    img: [shirt2, shirt2Back],
    size: 100,
    brand: 'Brand K',
    purchase: 'https://example.com/purchase11',
    publicStatus: 'PUBLIC',
    salesStatus: 'ON_SALE',
    color: 'black',
    gender: 'COMMON',
    uid: 1,
    isLiked: false,
  },
  {
    id: 12,
    category: '상의',
    img: [shirt3, shirt3Back],
    size: 100,
    brand: 'Brand L',
    purchase: 'https://example.com/purchase12',
    publicStatus: 'PUBLIC',
    salesStatus: 'NOT_SALE',
    color: 'blue',
    gender: 'WOMAN',
    uid: 1,
    isLiked: false,
  },
];

export default clothesData;
