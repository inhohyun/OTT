import hangericon from '../../assets/icons/hangericon.png';
import logo from '../../../public/icon-192x192.png';
import hanger from '../../assets/lottie/loadinghanger.json';
import Lottie from 'lottie-react';
const CustomSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-[215px]">
      <style>
        {`
            .custom-spin {
                animation: spin 2s linear infinite;
            }
            `}
      </style>
      {/* <div className="flex justify-center items-center bg-white w-16 h-16 rounded-full mt-[250px]"> */}
      {/* <img
          src={hangericon}
          alt="로딩 중..."
          className="custom-spin w-12 h-12"
        /> */}
      <Lottie
        loop
        animationData={hanger}
        autoplay
        speed={2}
        className="w-28 h-28"
      />
      {/* </div> */}
    </div>
  );
};

export default CustomSpinner;
