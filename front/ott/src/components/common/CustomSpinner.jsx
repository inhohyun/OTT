import hangericon from '../../assets/icons/hangericon.png';
import logo from '../../../public/icon-192x192.png';

const CustomSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <style>
        {`
            .custom-spin {
                animation: spin 2s linear infinite;
            }
            `}
      </style>
      <div className="flex justify-center items-center bg-white w-16 h-16 rounded-full mt-[250px]">
        <img
          src={hangericon}
          alt="로딩 중..."
          className="custom-spin w-12 h-12"
        />
      </div>
    </div>
  );
};

export default CustomSpinner;
