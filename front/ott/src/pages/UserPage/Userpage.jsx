import { useCallback } from "react";
import TimeLabels from "../../components/userPage/TimeLabels";
import PropTypes from "prop-types";

const Frame = ({ className = "" }) => {
  const onGroupContainerClick = useCallback(() => {
    // Please sync "프로필 수정 1" to the project
  }, []);

  const onGroupContainerClick1 = useCallback(() => {
    // Please sync "마이페이지-팔로워" to the project
  }, []);

  const onGroupContainerClick2 = useCallback(() => {
    // Please sync "마이페이지-팔로잉" to the project
  }, []);

  const onTextClick = useCallback(() => {
    // Please sync "마이페이지-게시글-비공개" to the project
  }, []);

  const onAddButtonClick = useCallback(() => {
    // Please sync "룩북만들기" to the project
  }, []);

  const onCircularHighlightClick = useCallback(() => {
    // Please sync "ai 옷입히기" to the project
  }, []);

  const onGroupIconClick = useCallback(() => {
    // Please sync "검색 페이지- 사용자검색" to the project
  }, []);

  const onGroupIconClick1 = useCallback(() => {
    // Please sync "webRTC-첫화면" to the project
  }, []);

  const onGroupIconClick2 = useCallback(() => {
    // Please sync "메인페이지 - 추천" to the project
  }, []);

  return (
    <div
      className={`w-full flex flex-row items-start justify-start py-0 pr-0 pl-px box-border leading-[normal] tracking-[normal] ${className}`}
    >
      <div className="h-[51px] w-[51px] relative shadow-[0px_3px_30px_rgba(0,_0,_0,_0.08)] rounded-[50%] bg-mediumslateblue hidden" />
      <img
        className="h-[19.5px] w-[19.5px] relative hidden"
        alt=""
        src="/shape.svg"
      />
      <section className="flex-1 flex flex-col items-end justify-start pt-[21px] pb-0 pr-2.5 pl-[9px] box-border relative gap-[106px] max-w-full shrink-0 z-[7] text-center text-mid text-ios-home-indicator-indicator-color font-sf-pro-text">
        <div className="self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-2 box-border gap-[19px] max-w-full">
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[23px]">
            <div className="flex-1 flex flex-col items-start justify-start gap-[14px] min-w-[178px]">
             
              <div className="self-stretch flex flex-col items-end justify-start gap-[23px] text-left text-sm text-gray-100 font-roboto">
                <div className="self-stretch flex flex-row items-start justify-between py-0 pr-0 pl-2.5 gap-[20px]">
                  <div className="flex flex-col items-start justify-start pt-[15px] px-0 pb-0">
                    <img
                      className="w-6 h-6 relative object-cover z-[8]"
                      loading="lazy"
                      alt=""
                      src="/iconsetmenu@2x.png"
                    />
                  </div>
                  <div className="w-[171.1px] bg-ios-home-indicator-background-color flex flex-col items-start justify-start pt-[7px] pb-0 pr-[25px] pl-0 box-border z-[1]">
                    <img
                      className="self-stretch h-[47px] relative max-w-full overflow-hidden shrink-0 object-cover"
                      alt=""
                      src="/preview-1@2x.png"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[3px] pl-0">
                  <div
                    className="flex-1 flex flex-col items-start justify-start py-0 pr-0 pl-[95px] gap-[11px] cursor-pointer z-[8]"
                    onClick={onGroupContainerClick}
                  >
                    <div className="flex flex-row items-start justify-start py-0 px-14">
                      <img
                        className="h-16 w-16 relative rounded-[50%] object-cover"
                        loading="lazy"
                        alt=""
                        src="/ellipse-1@2x.png"
                      />
                    </div>
                    <div className="w-[298.5px] h-[30.4px] relative hidden">
                      <div className="absolute top-[0px] left-[0px] flex flex-row items-center justify-center gap-[9px]">
                        <div className="h-[30.4px] flex-1 relative">
                          <div className="absolute top-[7.2px] left-[10.9px]">
                            send a message
                          </div>
                          <div className="absolute top-[-0.5px] left-[-0.5px] rounded-10xs box-border w-full h-full border-[1px] border-solid border-gainsboro" />
                        </div>
                        <img
                          className="self-stretch w-[74.3px] relative max-h-full min-h-[30px]"
                          alt=""
                          src="/group-41.svg"
                        />
                        <div className="h-[30.4px] w-[33.5px] relative">
                          <div className="absolute top-[-0.5px] left-[-0.5px] rounded-10xs box-border w-full h-full border-[1px] border-solid border-gainsboro" />
                          <img
                            className="absolute top-[12.9px] left-[11.6px] w-[9.7px] h-[4.8px]"
                            alt=""
                            src="/vector-9.svg"
                          />
                        </div>
                      </div>
                      <div className="absolute top-[0px] left-[265px] w-[33.5px] h-[30.4px]">
                        <div className="absolute top-[0px] left-[0px] w-full h-full">
                          <div className="absolute top-[0px] left-[0px] rounded-10xs box-border w-full h-full border-[1px] border-solid border-gainsboro" />
                        </div>
                        <img
                          className="absolute top-[3px] left-[5px] w-[25px] h-6 object-cover"
                          alt=""
                          src="/freeiconwardrobe989465-1@2x.png"
                        />
                      </div>
                    </div>
                    <div className="w-[298.5px] h-[30.4px] relative hidden">
                      <div className="absolute top-[0px] left-[0px] flex flex-row items-center justify-center gap-[9px]">
                        <div className="h-[30.4px] flex-1 relative">
                          <div className="absolute top-[7.2px] left-[10.9px]">
                            send a message
                          </div>
                          <div className="absolute top-[-0.5px] left-[-0.5px] rounded-10xs box-border w-full h-full border-[1px] border-solid border-gainsboro" />
                        </div>
                        <img
                          className="self-stretch w-[74.3px] relative max-h-full min-h-[30px]"
                          alt=""
                          src="/group-41-1.svg"
                        />
                        <div className="h-[30.4px] w-[33.5px] relative">
                          <div className="absolute top-[-0.5px] left-[-0.5px] rounded-10xs box-border w-full h-full border-[1px] border-solid border-gainsboro" />
                          <img
                            className="absolute top-[12.9px] left-[11.6px] w-[9.7px] h-[4.8px]"
                            alt=""
                            src="/vector-9-1.svg"
                          />
                        </div>
                      </div>
                      <div className="absolute top-[0px] left-[265px] w-[33.5px] h-[30.4px]">
                        <div className="absolute top-[0px] left-[0px] w-full h-full">
                          <div className="absolute top-[0px] left-[0px] rounded-10xs box-border w-full h-full border-[1px] border-solid border-gainsboro" />
                        </div>
                        <img
                          className="absolute top-[3px] left-[5px] w-[25px] h-6 object-cover"
                          alt=""
                          src="/freeiconwardrobe989465-1-1@2x.png"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-start justify-start gap-[6px] text-[23px]">
                      <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                        <img
                          className="w-6 h-6 relative overflow-hidden shrink-0"
                          loading="lazy"
                          alt=""
                          src="/lock.svg"
                        />
                      </div>
                      <h1 className="m-0 relative text-inherit font-light font-inherit">
                        mediamodifier
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
              <div className="flex flex-row items-end justify-start gap-[6.7px]">
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-1">
                
                </div>
                <div className="flex flex-col items-start justify-start gap-[32.5px]">
                  <div className="w-[27.3px] h-[13px] relative z-[8]">
                    <div className="absolute h-full top-[0%] bottom-[0%] left-[calc(50%_-_13.65px)] rounded-[4.3px] box-border w-[25px] opacity-[0.35] mix-blend-normal border-[1px] border-solid border-ios-home-indicator-indicator-color" />
                    <img
                      className="absolute h-[31.54%] top-[36.92%] bottom-[31.54%] left-[calc(50%_+_12.35px)] max-h-full w-[1.3px] mix-blend-normal"
                      alt=""
                      src="/cap.svg"
                    />
                    <div className="absolute h-[69.23%] top-[15.38%] bottom-[15.38%] left-[calc(50%_-_11.65px)] rounded-[2.5px] bg-ios-home-indicator-indicator-color w-[21px] z-[1]" />
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 pr-0 pl-[9px]">
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[31px] pl-[27px] text-left text-base text-text-brand-on-brand font-single-line-body-base">
            <div className="h-14 flex-1 flex flex-col items-end justify-start pt-0 px-0 pb-8 box-border gap-[10px] z-[9]">
              <div className="self-stretch flex flex-row items-start justify-start gap-[28px] shrink-0">
                <div className="rounded-radius-200 bg-mediumpurple-200 flex flex-row items-start justify-start py-1 px-[11px] gap-[8px] whitespace-nowrap">
                  <h2 className="m-0 relative text-inherit leading-[100%] font-normal font-inherit inline-block min-w-[108px] whitespace-nowrap">
                    한여름의 도시남
                  </h2>
                  <img
                    className="h-scale-03 w-scale-03 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                    alt=""
                    src="/x16.svg"
                  />
                </div>
                <div className="w-[74px] flex flex-col items-start justify-start py-0 pr-2.5 pl-0 box-border">
                  <div className="self-stretch rounded-radius-200 bg-mediumpurple-200 flex flex-row items-start justify-start py-1 px-[7px] gap-[8px]">
                    <h2 className="m-0 flex-1 relative text-inherit leading-[100%] font-normal font-inherit">
                      댄디남
                    </h2>
                    <img
                      className="h-scale-03 w-scale-03 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                      alt=""
                      src="/x16.svg"
                    />
                  </div>
                </div>
                <div className="w-[49px] rounded-radius-200 bg-mediumpurple-200 flex flex-row items-start justify-start py-1 px-[7px] box-border gap-[8px]">
                  <h2 className="m-0 relative text-inherit leading-[100%] font-normal font-inherit inline-block min-w-[33px]">
                    훈남
                  </h2>
                  <img
                    className="h-scale-03 w-scale-03 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                    alt=""
                    src="/x16.svg"
                  />
                </div>
              </div>
              <div className="flex flex-row items-start justify-end py-0 px-[29px]">
                <div className="flex flex-row items-start justify-start gap-[35px] shrink-0">
                  <div className="rounded-radius-200 bg-mediumpurple-200 flex flex-row items-start justify-start py-[3.5px] px-space-200 gap-[8px] whitespace-nowrap z-[8]">
                    <h2 className="m-0 relative text-inherit leading-[100%] font-normal font-inherit inline-block min-w-[123px] whitespace-nowrap">
                      여자들이 좋아하는
                    </h2>
                    <img
                      className="h-scale-03 w-scale-03 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                      alt=""
                      src="/x16.svg"
                    />
                  </div>
                  <div className="w-[63px] rounded-radius-200 bg-mediumpurple-200 flex flex-row items-start justify-start py-[3px] px-[7px] box-border gap-[8px]">
                    <h2 className="m-0 flex-1 relative text-inherit leading-[100%] font-normal font-inherit">
                      소개팅
                    </h2>
                    <img
                      className="h-scale-03 w-scale-03 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                      alt=""
                      src="/x16.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0.5 pl-px box-border max-w-full text-gray-200 font-do-hyeon">
            <div className="flex-1 flex flex-row flex-wrap items-end justify-start max-w-full [row-gap:20px]">
              <div className="flex-1 flex flex-col items-end justify-start gap-[22px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[7px] pl-3 box-border max-w-full">
                  <div className="flex-1 flex flex-col items-end justify-start gap-[24px] max-w-full">
                    <div className="self-stretch flex flex-row items-end justify-start gap-[29.2px]">
                      <div className="flex-1 shadow-[0px_3px_12px_rgba(74,_58,_255,_0.18)] rounded-37xl bg-lightsteelblue flex flex-row items-start justify-start pt-2 px-3.5 pb-[7px] relative gap-[16.2px] z-[8]">
                        <div className="h-[100px] w-[calc(100%_-_12px)] absolute !m-[0] top-[-32.5px] right-[6px] left-[6px] overflow-hidden" />
                        <div className="relative inline-block min-w-[32px] z-[9]">
                          1,132
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-left text-sm">
                          <h3 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[33px] z-[9]">
                            게시글
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-end pt-0 pb-[7px] pr-[22px] pl-0">
                        <div
                          className="flex flex-row items-start justify-start gap-[12.5px] cursor-pointer z-[8]"
                          onClick={onGroupContainerClick1}
                        >
                          <div className="relative inline-block min-w-[28px]">
                            60K
                          </div>
                          <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-left text-sm">
                            <h3 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[33px]">
                              팔로워
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[7px]">
                        <div
                          className="flex flex-row items-start justify-start gap-[11px] cursor-pointer z-[8]"
                          onClick={onGroupContainerClick2}
                        >
                          <div className="relative inline-block min-w-[10px] shrink-0">
                            4
                          </div>
                          <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-left text-sm">
                            <h3 className="m-0 relative text-inherit font-normal font-inherit inline-block min-w-[33px] shrink-0">
                              팔로잉
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[277.6px] flex flex-row items-start justify-end py-0 px-9 box-border text-left text-lg">
                      <div className="flex-1 flex flex-row items-start justify-between gap-[20px]">
                        <div className="w-[83.2px] shadow-[0px_3px_12px_rgba(74,_58,_255,_0.18)] rounded-37xl bg-lightsteelblue flex flex-row items-start justify-start pt-[11px] pb-[5px] pr-0 pl-[25px] box-border relative gap-[8px] shrink-0 z-[8]">
                          <div className="h-[100px] w-[100px] absolute !m-[0] top-[-32.5px] right-[-8.4px] overflow-hidden shrink-0" />
                          <h1 className="m-0 w-[78px] relative text-inherit leading-[20px] font-normal font-inherit inline-block shrink-0 z-[9]">
                            공개
                          </h1>
                        </div>
                        <div className="w-[78px] flex flex-col items-start justify-start pt-[11px] px-0 pb-0 box-border">
                          <h1
                            className="m-0 self-stretch relative text-inherit leading-[20px] font-normal font-inherit shrink-0 cursor-pointer z-[8]"
                            onClick={onTextClick}
                          >
                            비공개
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-[277px] flex flex-row items-start justify-start gap-[18.4px]">
                  <div className="flex flex-col items-start justify-start pt-[99px] px-0 pb-0">
                    <img
                      className="w-6 h-6 relative z-[8]"
                      loading="lazy"
                      alt=""
                      src="/iconsetchevronleft.svg"
                    />
                  </div>
                  <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[12.1px]">
                    <div className="self-stretch flex-1 flex flex-row flex-wrap items-start justify-start gap-[11.1px_7.9px]">
                      <TimeLabels
                        img="/img@2x.png"
                        vector="/vector.svg"
                        messageCircle="/message-circle.svg"
                      />
                      <TimeLabels
                        img="/img-1@2x.png"
                        vector="/vector-1.svg"
                        messageCircle="/message-circle-1.svg"
                      />
                      <TimeLabels
                        img="/img-2@2x.png"
                        vector="/vector-2.svg"
                        messageCircle="/message-circle.svg"
                      />
                      <TimeLabels
                        img="/img-3@2x.png"
                        vector="/vector-3.svg"
                        messageCircle="/message-circle-3.svg"
                      />
                      <TimeLabels
                        img="/img-4@2x.png"
                        vector="/vector.svg"
                        messageCircle="/message-circle-4.svg"
                      />
                      <TimeLabels
                        img="/img-5@2x.png"
                        vector="/vector.svg"
                        messageCircle="/message-circle-5.svg"
                      />
                    </div>
                    <div className="w-[278.6px] flex flex-row items-start justify-start py-0 px-[7px] box-border">
                      <button
                        className="cursor-pointer [border:none] pt-[5.5px] px-[68px] pb-[6.5px] bg-lightsteelblue flex-1 shadow-[0px_3px_12px_rgba(74,_58,_255,_0.18)] rounded-37xl flex flex-row items-start justify-start gap-[8px] z-[8]"
                        onClick={onAddButtonClick}
                      >
                        <img
                          className="h-6 w-6 relative overflow-hidden shrink-0"
                          alt=""
                          src="/plus-circle.svg"
                        />
                        <div className="flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
                          <div className="self-stretch h-3.5 relative text-[19px] leading-[20px] font-do-hyeon text-gray-500 text-left inline-block shrink-0">
                            룩북 등록
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[180px] flex flex-col items-start justify-start">
                <img
                  className="w-6 h-6 relative object-contain z-[8]"
                  loading="lazy"
                  alt=""
                  src="/iconsetchevronleft-1.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] max-h-full object-cover z-[2]"
          alt=""
          src="/iphone-15-pro@2x.png"
        />
        <div className="w-full h-full absolute !m-[0] top-[0px] bottom-[0px] left-[-1px] text-4xs text-darkgray font-single-line-body-base">
          <div className="absolute top-[735.4px] left-[5px] w-[390px] h-[116.6px] flex items-center justify-center">
            <img
              className="w-full h-full object-contain absolute left-[0px] top-[3px] [transform:scale(1.515)]"
              alt=""
              src="/path-3.svg"
            />
          </div>
          <div className="absolute top-[0px] left-[0px] w-full h-full bg-[url('/public/group-37364@3x.png')] bg-cover bg-no-repeat bg-[top] z-[1]">
            <img
              className="absolute top-[0px] left-[0px] w-full h-full object-cover hidden"
              alt=""
              src="/istockphoto1398241461612x612-1@2x.png"
            />
            <img
              className="absolute top-[45.9px] left-[calc(50%_-_196.5px)] w-[393px] h-[761.6px] z-[1]"
              alt=""
              src="/rectangle-4362.svg"
            />
            <img
              className="absolute top-[80.9px] left-[157px] w-[2.2px] h-[15.4px] z-[3]"
              loading="lazy"
              alt=""
              src="/vector-6.svg"
            />
            <div className="absolute bottom-[384.7px] left-[149px] inline-block w-[60.7px] h-[11.7px] z-[9]">
              새 룩북 추가
            </div>
            <div className="absolute right-[151.5px] bottom-[302.1px] text-2xs font-light text-ios-home-indicator-indicator-color flex items-center justify-center w-[26px] h-[5.2px] z-[9]">
              3
            </div>
            <div className="absolute right-[82.3px] bottom-[384.7px] inline-block w-[60.7px] h-[11.7px] z-[11]">
              새 룩북 추가
            </div>
            <div className="absolute right-[50.5px] bottom-[302.1px] text-2xs font-light text-ios-home-indicator-indicator-color flex items-center justify-center w-[26px] h-[5.2px] z-[9]">
              3
            </div>
            <div className="absolute bottom-[264.7px] left-[151px] inline-block w-[60.7px] h-[11.7px] z-[9]">
              새 룩북 추가
            </div>
            <div className="absolute right-[149.5px] bottom-[182.1px] text-2xs font-light text-ios-home-indicator-indicator-color flex items-center justify-center w-[26px] h-[5.2px] z-[9]">
              3
            </div>
            <div className="absolute right-[78.3px] bottom-[264.7px] inline-block w-[60.7px] h-[11.7px] z-[11]">
              새 룩북 추가
            </div>
            <div className="absolute right-[46.5px] bottom-[182.1px] text-2xs font-light text-ios-home-indicator-indicator-color flex items-center justify-center w-[26px] h-[5.2px] z-[9]">
              3
            </div>
            <div className="absolute bottom-[384.7px] left-[49px] inline-block w-[60.7px] h-[11.7px] z-[9]">
              새 룩북 추가
            </div>
            <div className="absolute bottom-[302.1px] left-[115.5px] text-2xs font-light text-ios-home-indicator-indicator-color flex items-center justify-center w-[26px] h-[5.2px] z-[9]">
              3
            </div>
            <div className="absolute bottom-[264.7px] left-[49px] inline-block w-[60.7px] h-[11.7px] z-[9]">
              새 룩북 추가
            </div>
            <div className="absolute bottom-[182.1px] left-[115.5px] text-2xs font-light text-ios-home-indicator-indicator-color flex items-center justify-center w-[26px] h-[5.2px] z-[9]">
              3
            </div>
          </div>
          <div className="absolute top-[735.4px] left-[5px] w-[390px] h-[116.6px] z-[2] flex items-center justify-center">
            <img
              className="w-full h-full z-[2] object-contain absolute left-[0px] top-[3px] [transform:scale(1.515)]"
              alt=""
              src="/path-1.svg"
            />
          </div>
          <div className="absolute top-[735.4px] left-[5px] w-[390px] h-[116.6px] z-[5] flex items-center justify-center">
            <img
              className="w-full h-full z-[5] object-contain absolute left-[0px] top-[3px] [transform:scale(1.515)]"
              alt=""
              src="/path-2.svg"
            />
          </div>
          <div
            className="absolute top-[730px] left-[175px] shadow-[0px_3px_30px_rgba(0,_0,_0,_0.08)] rounded-[50%] bg-mediumpurple-100 w-[51px] h-[51px] cursor-pointer z-[6]"
            onClick={onCircularHighlightClick}
          />
          <div className="absolute top-[0px] left-[1px] bg-ios-home-indicator-background-color w-[392px] h-[111px]" />
          <div className="absolute top-[766px] left-[328px] w-[65px] h-[51px]">
            <img
              className="absolute top-[12px] left-[24px] w-5 h-5 overflow-hidden object-cover z-[6]"
              loading="lazy"
              alt=""
              src="/user-1@2x.png"
            />
            <div className="absolute top-[0px] left-[0px] shadow-[0px_3px_30px_rgba(0,_0,_0,_0.08)] rounded-[50%] bg-mediumpurple-300 w-full h-full z-[8]" />
          </div>
          <img
            className="absolute top-[23.3px] left-[320.5px] w-[17.1px] h-[12.3px] z-[8]"
            loading="lazy"
            alt=""
            src="/wifi.svg"
          />
          <img
            className="absolute top-[738px] left-[185px] w-[31.7px] h-[31.7px] object-cover z-[8]"
            loading="lazy"
            alt=""
            src="/white-outline-image-2@2x.png"
          />
          <img
            className="absolute top-[777px] left-[112px] w-6 h-6 object-cover cursor-pointer z-[8]"
            loading="lazy"
            alt=""
            src="/group-37368@2x.png"
            onClick={onGroupIconClick}
          />
          <img
            className="absolute top-[775px] left-[267px] w-6 h-6 object-cover cursor-pointer z-[8]"
            loading="lazy"
            alt=""
            src="/group-37371@2x.png"
            onClick={onGroupIconClick1}
          />
          <img
            className="absolute top-[22.9px] left-[292.3px] w-[19.2px] h-[12.2px] z-[8]"
            loading="lazy"
            alt=""
            src="/cellular-connection.svg"
          />
          <img
            className="absolute top-[779px] left-[29px] w-6 h-6 object-cover cursor-pointer z-[8]"
            loading="lazy"
            alt=""
            src="/group-37372@2x.png"
            onClick={onGroupIconClick2}
          />
        </div>
        <div className="self-stretch bg-ios-home-indicator-background-color flex flex-row items-start justify-center py-2 px-5 z-[6]">
          <div className="h-[5px] w-[139px] relative rounded-[100px] bg-ios-home-indicator-indicator-color" />
        </div>
      </section>
    </div>
  );
};

Frame.propTypes = {
  className: PropTypes.string,
};

export default Frame;
