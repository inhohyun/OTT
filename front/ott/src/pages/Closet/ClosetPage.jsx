import backgroundImage from '../../assets/images/background_image_closet.png';
import Header from '../../components/common/Header';

const ClosetPage = () => {
  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header className="mb-1"/>
      <h1 className="text-4xl font-bold mb-4">옷장 페이지</h1>
      <p className="text-lg text-gray-700">이건 옷장</p>
    </div>
  );
};

export default ClosetPage;
