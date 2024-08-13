import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getUid } from '../../api/user/user';
import axios from 'axios';
import { inviteMeeting } from '../../api/notification/notification';
import useUserStore from '../../data/lookbook/userStore';

const CustomPersonSearchResult = ({
  // 검색 결과 데이터 배열
  results,
  // 사용자가 입력한 검색어
  searchQuery,
}) => {
  const [visibleResults, setVisibleResults] = useState(4); // 한 번에 결과 4개 표시
  const [filteredResults, setFilteredResults] = useState([]); // 필터링된 결과 저장
  const navigate = useNavigate(); // 페이지 이동
  const memberId = useUserStore((state) => state.userId);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredResults([]);
      return;
    }

    setFilteredResults(results);
  }, [results, searchQuery]);

  // "더보기" 버튼 클릭 시 추가 결과 표시
  const handleShowMore = () => {
    setVisibleResults((prev) => prev + 4);
  };

  // 비디오 채팅 시작
  const startVideoChat = async (invitedMemberId) => {
    // const memberId = (await getUid()).data.id;
    // if (!memberId) console.log("호스트 회원 아이디 조회 실패");

    const userName = (await getUserInfo(memberId)).data.nickname;
    // if (!userName) console.log("호스트 회원 이름 조회 실패");

    const sessionId = `session-${nickname}`;
    // const sessionId = 'session-jjh';

    await inviteMeeting({ invitedMemberId, sessionId });
    // 사용자를 비디오 채팅 페이지로 이동시키면서 세션 ID와 토큰을 전달
    navigate(`/video-chat`, { state: { sessionId, userName } });
  };

  if (!searchQuery) {
    return null;
  }

  if (!filteredResults.length) {
    return <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>;
  }

  return (
    <div
      className="mt-10 mx-auto backdrop-blur-md bg-violet-200 bg-opacity-40 text-stone-600 p-4 rounded-3xl shadow-md"
      style={{
        width: '80%',
        maxWidth: '400px',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <h2 className="font-bold mb-4 text-center" style={{ fontSize: '16px' }}>
        검색결과
      </h2>
      <div className="space-y-4">
        {filteredResults.slice(0, visibleResults).map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 rounded-lg relative"
          >
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-gray-400 mr-4"
                src={result.profileImageUrl}
                style={{ fontSize: '36px' }}
              />
              <div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontSize: '14px' }}
                >
                  {result.nickname}
                </h3>
                <p
                  className="text-xs text-stone-500"
                  style={{ fontSize: '12px' }}
                >
                  {result.name}
                </p>
              </div>
            </div>
            <div
              onClick={() => startVideoChat(result.id)}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <FontAwesomeIcon icon={faVideo} className="text-xl" />
            </div>
          </div>
        ))}
      </div>
      {visibleResults < filteredResults.length && (
        <p
          onClick={handleShowMore}
          className="mt-2 text-stone-500 py-1 px-3 rounded-full cursor-pointer text-center"
        >
          더보기
        </p>
      )}
    </div>
  );
};

export default CustomPersonSearchResult;
