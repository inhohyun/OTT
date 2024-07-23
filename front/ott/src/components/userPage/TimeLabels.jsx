import PropTypes from "prop-types";

const TimeLabels = ({ className = "", img, vector, messageCircle }) => {
  return (
    <div
      className={`w-[92px] flex flex-col items-start justify-start pt-[7.6px] pb-[3.4px] pr-0 pl-[31px] box-border relative gap-[74.5px] text-center text-4xs text-darkgray font-single-line-body-base ${className}`}
    >
      <div className="self-stretch relative z-[10]">2시간 전</div>
      <div className="w-[77.1px] h-full absolute !m-[0] top-[0px] bottom-[0px] left-[0px]">
        <div className="absolute top-[0px] left-[0px] [backdrop-filter:blur(28px)] rounded-lg bg-gray-400 box-border w-full h-full z-[8] border-[1px] border-solid border-gray-300" />
        <div className="absolute w-[calc(100%_-_3.8px)] top-[19.8px] right-[1.7px] left-[2.1px] rounded-lg [background:linear-gradient(#fff,_#fff),_#d9d9d9] h-[71.1px] z-[9]">
          <div className="absolute top-[0px] left-[0px] rounded-lg [background:linear-gradient(#fff,_#fff),_#d9d9d9] w-full h-full hidden" />
          <img
            className="absolute top-[0.6px] left-[18.3px] w-[40.1px] h-[68.7px] object-cover z-[10]"
            loading="lazy"
            alt=""
            src={img}
          />
        </div>
        <div className="absolute top-[95.5px] left-[34px] w-[6.8px] h-[8.6px] z-[9] flex items-center justify-center">
          <img
            className="w-full h-full z-[9] object-contain absolute left-[0px] top-[2px] [transform:scale(3.353)]"
            alt=""
            src={vector}
          />
        </div>
      </div>
      <div className="w-[33.9px] flex flex-row items-start justify-start py-0 px-0.5 box-border text-2xs text-ios-home-indicator-indicator-color">
        <div className="flex-1 flex flex-row items-start justify-start">
          <div className="flex-1 flex flex-col items-start justify-start pt-[2.9px] px-0 pb-0">
            <div className="self-stretch h-[5.2px] relative font-light flex items-center justify-center shrink-0 z-[10]">
              27
            </div>
          </div>
          <img
            className="h-[11.7px] w-[8.5px] relative overflow-hidden shrink-0 z-[11] ml-[-4.7px]"
            loading="lazy"
            alt=""
            src={messageCircle}
          />
        </div>
      </div>
    </div>
  );
};

TimeLabels.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  vector: PropTypes.string,
  messageCircle: PropTypes.string,
};

export default TimeLabels;
