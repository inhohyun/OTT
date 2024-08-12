import logo from '../../assets/icons/main.logo.png';
import { useNavigate } from 'react-router-dom';

const EmptyLookbook = () => {
  const nav = useNavigate();
  const handleonClick = () => {
    nav('/lookbookcreate');
  };
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl shadow-lg max-w-lg mx-auto mt-[14vh]"
      style={{ width: '65%' }}
    >
      <div className="w-full bg-violet-200 bg-opacity-60 rounded-t-2xl p-4 relative">
        <div
          className="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto"
          style={{ position: 'relative', top: '25px' }}
        >
          <img
            src={logo}
            alt="No Follow"
            className="w-[60px] h-[60px] rounded-full"
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-b-2xl p-6 flex flex-col items-center">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-500 mb-4">
            현재 저장된 <br />
            룩북이 없습니다.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            자신만의 룩북을 <br />
            만들어보세요!
          </p>
        </div>
        <div className="flex justify-around w-full">
          <button
            className="bg-violet-200 text-violet-700 font-semibold py-3 px-4 rounded-full shadow-md font-dohyeon"
            style={{ fontFamily: 'dohyeon' }}
            onClick={handleonClick}
          >
            룩북 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyLookbook;
