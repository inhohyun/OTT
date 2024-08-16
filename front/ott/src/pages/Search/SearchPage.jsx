import { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_main.png';
import SearchInput from '../../components/search/SearchInput';
import PersonSearchResult from '../../components/search/PersonSearchResult';
import StyleSearchResult from '../../components/search/StyleSearchResult';
import { searchPeople } from '../../api/search/searchPeople';
import { searchStyle } from '../../api/search/searchStyle';
import useUserStore from '../../data/lookbook/userStore';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState(''); // 마지막 검색 쿼리 저장
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState([]);

  //memberId
  const memberId = useUserStore((state) => state.userId);
  const searchPeopleMethod = async (nickname, offset, limit) => {
    try {
      const response = await searchPeople(nickname, offset, limit);
      // console.log('검색한 response.data : ', response.data);
      return response.data;
    } catch (error) {
      // console.error('Error fetching user info:', error);
    }
  };
  const searchStyleMethod = async (tags, memberId) => {
    try {
      const response = await searchStyle(tags, memberId);
      return response;
    } catch (error) {
      // console.error('Error fetching user info:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    const { value } = e.target;
    // 영어, 숫자, 언더스코어(_)만 허용하는 정규식
    const regex = /^[a-zA-Z0-9_]*$/;

    if (regex.test(value)) {
      setSearchQuery(value);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLastSearchQuery(searchQuery); // 마지막 검색 쿼리 업데이트

    if (isChecked) {
      // 태그 검색을 위한 모의 검색 함수
      const styleData = [
        {
          tags: ['소개팅', '남친룩'],
          description: 'Casual outfit with jeans and t-shirt',
          username: 'user1',
          likes: 2800,
          comments: 3700,
        },
        {
          tags: ['포멀', '정장'],
          description: 'Formal attire with a suit and tie',
          username: 'user2',
          likes: 3200,
          comments: 2100,
        },
        {
          tags: ['스포티', '남친룩'],
          description: 'Sporty look with sneakers and a tracksuit',
          username: 'user3',
          likes: 1500,
          comments: 1200,
        },
        {
          tags: ['보헤미안', '여유로운'],
          description: 'Bohemian style with a flowy dress and sandals',
          username: 'user4',
          likes: 1800,
          comments: 900,
        },
        {
          tags: ['비즈니스', '격식있는'],
          description: 'Business attire with a blazer and dress pants',
          username: 'user5',
          likes: 2700,
          comments: 1300,
        },
        {
          tags: ['스트릿', '남친룩'],
          description: 'Street style with oversized hoodie and ripped jeans',
          username: 'user6',
          likes: 2400,
          comments: 1800,
        },
        {
          tags: ['빈티지', '남친룩'],
          description: 'Vintage look with a retro dress and accessories',
          username: 'user7',
          likes: 2100,
          comments: 1100,
        },
        {
          tags: ['시크', '소개팅'],
          description: 'Chic outfit with a sleek blazer and heels',
          username: 'user8',
          likes: 2900,
          comments: 1400,
        },
        {
          tags: ['소개팅', '강렬한'],
          description: 'Punk look with leather jacket and combat boots',
          username: 'user9',
          likes: 2200,
          comments: 1600,
        },
        {
          tags: ['고딕', '어두운'],
          description: 'Gothic style with black dress and dark makeup',
          username: 'user10',
          likes: 3100,
          comments: 2000,
        },
        {
          tags: ['소개팅', '단정한'],
          description: 'Preppy outfit with a collared shirt and cardigan',
          username: 'user11',
          likes: 1700,
          comments: 900,
        },
        {
          tags: ['남친룩', '심플'],
          description: 'Minimalist style with neutral colors and clean lines',
          username: 'user12',
          likes: 2600,
          comments: 1200,
        },
      ];
      const searchStyleResult = await searchStyleMethod(searchQuery, memberId);
      // console.log('스타일 검색 결과 : ', searchStyleResult);
      // 검색어와 일치하는 스타일 데이터 필터링
      // const matchedResults = searchStyleResult.filter((item) =>
      //   item.tags.some((tag) =>
      //     tag.toLowerCase().includes(searchQuery.toLowerCase())
      //   )
      // );

      setResults(searchStyleResult);
    } else {
      const nickname = searchQuery;
      const offset = 1;
      const limit = 10;
      const searchResult = await searchPeopleMethod(nickname, offset, limit);

      // const mockPeopleResults = [
      //   { title: 'ofekim0', description: 'Description for person 1' },
      //   { title: 'eunwoo_c', description: 'Description for person 2' },
      //   { title: 'songkang_b', description: 'Description for person 3' },
      //   { title: 'byeonwooseok', description: 'Description for person 4' },
      //   { title: '_wonbin_', description: 'Description for person 5' },
      //   { title: 'junny_cha', description: 'Description for person 6' },
      // ];

      setResults(searchResult);
    }
  };

  // 체크박스 상태 변경하는 함수
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <main className="flex-grow p-4 w-full max-w-md mx-auto mt-5">
        <SearchInput
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          handleSearch={handleSearch}
        />
        {/* 체크박스 상태에 따라 결과를 다르게 렌더링 */}
        {isChecked ? (
          <StyleSearchResult results={results} searchQuery={lastSearchQuery} />
        ) : (
          <PersonSearchResult results={results} searchQuery={lastSearchQuery} />
        )}
      </main>
    </div>
  );
};

export default SearchPage;
