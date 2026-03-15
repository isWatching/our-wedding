import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import mapInner from '../mapInner.jpg';
import weddingDay from '../change/weddingDay.png';
import { PhaserGame } from './PhaserGame';

import main1 from '../assets/main1.png';
import main2 from '../assets/main2.png';
import kiss from '../assets/Tilesheets/kiss.png';

// webp 이미지 파일명 배열 (순서대로 정렬)
const webpFiles = [
  '34-VATA2130_수정본.webp',
  '52-VATA0408_2차수정본.webp',
  '54-VATA0974_2차수정본.webp',
  '23-VATA1899_수정본.webp',
  '21-VATA1431_수정본.webp',
  '27-VATA0643_2차수정본.webp',
  '32-VATA1670_수정본.webp',
  '37-VATA0135_수정본.webp',
  '14-VATA1727 파란하늘_2차수정본.webp',
  '44-VATA2267_수정본.webp',
  '29-VATA1992_수정본.webp',
  '51-VATA2336_2차수정본.webp',
];

// jpg60 썸네일 파일명 매핑 (webp 파일명 -> jpg60 파일명)
const jpg60Files = [
  '34-VATA2130_수정본_1.jpg',
  '52-VATA0408_2차수정본_4.jpg',
  '54-VATA0974_2차수정본_6.jpg',
  '23-VATA1899_수정본_4.jpg',
  '21-VATA1431_수정본_2.jpg',
  '27-VATA0643_2차수정본_5.jpg',
  '32-VATA1670_수정본_4.jpg',
  '37-VATA0135_수정본_4.jpg',
  '14-VATA1727 파란하늘_2차수정본_5.jpg',
  '44-VATA2267_수정본_1.jpg',
  '29-VATA1992_수정본_1.jpg',
  '51-VATA2336_2차수정본_3.jpg',
];

// 썸네일 이미지 경로를 미리 계산 (성능 최적화)
const thumbnailPaths = jpg60Files.map((filename, index) => {
  try {
    return require(`../jpg60/${filename}`);
  } catch (e) {
    return require(`../webp/${webpFiles[index]}`);
  }
});

// webp 원본 이미지 경로를 미리 계산 (성능 최적화)
const webpPaths = webpFiles.map((filename) => {
  return require(`../webp/${filename}`);
});

// react-image-gallery용 이미지 배열
const galleryImages = thumbnailPaths.map((thumb, index) => ({
  original: webpPaths[index],
  thumbnail: thumb,
  originalAlt: `사진 ${index + 1}`,
  thumbnailAlt: `썸네일 ${index + 1}`
}));

function Page1() {
  const [openAccordions, setOpenAccordions] = useState({});
  const scrollContainerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [hidePhaserSection, setHidePhaserSection] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const galleryRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const openModal = useCallback((index) => {
    setCurrentSlideIndex(index);
    setSelectedImage(index);
  }, []);

  const closeModal = useCallback(() => {
    if (selectedImage !== null) {
      setCurrentSlideIndex(selectedImage);
    }
    setSelectedImage(null);
  }, [selectedImage]);

  const navigateImage = useCallback((direction) => {
    setSelectedImage((prev) => {
      if (prev === null) return null;
      const newIndex = direction === 'prev'
        ? (prev > 0 ? prev - 1 : webpFiles.length - 1)
        : (prev < webpFiles.length - 1 ? prev + 1 : 0);

      if (galleryRef.current) {
        galleryRef.current.slideToIndex(newIndex);
      }

      return newIndex;
    });
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      navigateImage('next');
    }
    if (touchStart - touchEnd < -50) {
      navigateImage('prev');
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToNextSection = () => {
    setHidePhaserSection(true);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    }, 300);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setShowButton(scrollTop < window.innerHeight / 2);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const copyToClipboard = (text, name) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert(`${name}의 계좌번호가 복사되었습니다.`);
      }).catch((err) => {
        alert('복사에 실패했습니다.');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert(`${name}의 계좌번호가 복사되었습니다.`);
      } catch (err) {
        alert('복사에 실패했습니다.');
      }
      document.body.removeChild(textarea);
    }
  };

  const shareURL = () => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        alert('청첩장 URL이 복사되었습니다.');
      }).catch((err) => {
        alert('복사에 실패했습니다.');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert('청첩장 URL이 복사되었습니다.');
      } catch (err) {
        alert('복사에 실패했습니다.');
      }
      document.body.removeChild(textarea);
    }
  };

  const phaserRef = useRef(null);

  const onCurrentActiveScene = (scene) => {
    console.log('Current active scene:', scene);
  };

  return (
    <div className="max-w-full mx-auto bg-white font-wedding text-[#4a4a4a] overflow-x-hidden relative">
      {!hidePhaserSection && (
        <section className="h-[725px] flex items-center justify-center bg-[#1a1a2e]">
          <PhaserGame ref={phaserRef} currentActiveScene={onCurrentActiveScene} />
          {showButton && (
            <button
              onClick={scrollToNextSection}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-2/3 max-w-md bg-white/90 text-[#8b5a7a] py-3 px-6 rounded-full text-base font-normal shadow-[0_4px_20px_rgba(139,90,122,0.3)] transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 font-neodgm"
            >
              모바일 청첩장 보러가기
            </button>
          )}
        </section>
      )}
      <section className="h-full bg-slate-50 flex-col overflow-hidden">
        <div className="h-full flex flex-col justify-center">
          <div className="flex items-center justify-center w-full">
            <img
              src={main2}
              alt="사진"
              className="object-cover w-[100%] max-w-[500px] h-[75%] rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-base text-black mb-1 font-neodgm">
              2026.05.09(토) 오전 11시
            </p>
            <p className="text-base text-black mb-3 font-neodgm">
              수원 파티웨딩유
            </p>
          </div>
        </div>
      </section>

      {/* 메인 헤더 및 인사말 */}
      <section className="h-[650px] flex  px-3 text-center bg-[#faf6ed] relative ">
        <div className="max-w-[500px] mx-auto flex flex-col justify-center ">
          <p className="text-2xl text-black mb-3 font-normal font-neodgm">
            우리 결혼해요💍
          </ p>

          <p className="mt-10 text-[15px] text-[#5a5a5a] font-light whitespace-pre-line max-[480px]:text-sm font-neodgm">
            스무 살, 친구로 만나<br />
            서른 살, 연인이 된 저희가<br />
            이제 서로의 곁에서<br />
            영원한 행복을 약속하려 합니다.<br />
            <br />
            게임 오버 없는 사랑의 여정<br />
            두 사람의 이야기가 이제 시작합니다.<br />
            <br />
            소중한 걸음으로 함께하시어<br />
            저희의 새로운 시작을 <br />
            축복해 주시면 감사하겠습니다.<br />
          </p>

          {/* 부모님 이름 */}
          <div className="mt-14 px-5 max-w-xs mx-auto">
            <div className="mt-1 flex items-baseline">
              <p className="text-[15px] text-[#8b5a7a] font-medium w-12 flex-shrink-0">신랑</p>
              <p className="text-[15px] text-[#6b5b6b] leading-[1.8]">상우 · 은이의</p>
              <p className="text-[15px] text-[#6b5b6b] leading-[1.8] ml-2">아들</p>
              <p className="text-[15px] text-[#6b5b6b] font-bold ml-4">욱</p>
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-[15px] text-[#8b5a7a] font-medium w-12 flex-shrink-0">신부</p>
              <p className="text-[15px] text-[#6b5b6b] leading-[1.8]">정규 · 옥자의</p>
              <p className="text-[15px] text-[#6b5b6b] leading-[1.8] ml-2">딸</p>
              <p className="text-[15px] text-[#6b5b6b] font-bold ml-4">진희</p>
            </div>
          </div>
        </div>
      </section>


      {/* 사진 앨범 */}
      <section className="py-16 px-5 text-center bg-white">
        <div className="max-w-[500px] mx-auto">
          <h2 className="text-2xl text-black mb-1 font-normal font-neodgm">사진 앨범</h2>
          <div className="py-1 w-full">
            <ImageGallery
              ref={galleryRef}
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
              showNav={false}
              showIndex={true}
              showThumbnails={true}
              lazyLoad={true}
              slideDuration={100}
              onSlide={(currentIndex) => setCurrentSlideIndex(currentIndex)}
              onClick={() => openModal(currentSlideIndex)}
            />
          </div>
        </div>
      </section>

      {/* 장소 정보 */}
      <section className="h-[750px] flex items-center justify-center py-5 px-5 text-center overflow-hidden bg-[#faf6ed]">
        <div className="max-w-[500px] mx-auto  py-3 px-6 max-[480px]:py-8 max-[480px]:px-5">
          <h2 className="text-xl text-black mb-3 font-normal font-neodgm">오시는 길</h2>
          <div className="my-1">
            <p className="text-lg text-black font-medium">수원 파티웨딩유</p>
            <p className="text-sm text-black leading-[1.8]"> 경기도 수원시 권선구 세화로 218</p>
          </div>

          {/* 오시는 방법 이미지 */}
          <div className="mt-3 -mx-4">
            <div className="overflow-hidden rounded-[15px] shadow-[0_3px_15px_rgba(0,0,0,0.12)]">
              <img
                src={mapInner}
                alt="수원 파티웨딩유 오시는 방법 안내"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* 오시는 방법 텍스트 */}
          <div className="mt-6 text-left text-sm text-[#5a5a5a] leading-relaxed space-y-1">
            <div>
              <p className="font-medium text-[#8b5a7a] mb-1">셔틀버스</p>
              <p>수원역 지하상가 13번 출구 공항 리무진버스 정류장에서 탑승</p>
            </div>
            <div>
              <p className="font-medium text-[#8b5a7a] mb-1">자가용</p>
              <p>네비게이션에 &quot;파티웨딩유&quot; 또는 &quot;0312971000&quot; 을 입력해 주세요.</p>
            </div>
          </div>

          {/* 지도 링크 버튼 */}
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="https://naver.me/GIIlhUYk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#03c75a] text-white py-3 px-4 rounded-[25px] text-sm cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 font-inherit active:scale-95"
            >
              네이버 지도
            </a>
            <a
              href="https://kko.to/dTofpeDo17"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffe812] text-[#3c1e1e] py-3 px-4 rounded-[25px] text-sm cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 font-inherit active:scale-95"
            >
              카카오 지도
            </a>
          </div>
        </div>
      </section>

      {/* 마음 전하실 곳 */}
      <section className="h-[750px] flex items-center justify-center py-16 px-8 bg-white">
        <div className="max-w-[500px] w-full">
          <h3 className="text-2xl mb-2 text-center font-light tracking-[3px] text-black font-neodgm">
            마음 전하실 곳
          </h3>
          <div className="text-xl text-[#e8b4c8] mb-8 opacity-60 tracking-[10px] text-center">
            ❀ ❀ ❀
          </div>

          {/* 신랑측 */}
          <div className="mb-8">
            <h4 className="text-lg mb-4 text-center font-light tracking-[2px] text-[#6b6b6b]">
              신랑측
            </h4>
            <div className="space-y-3">
              {/* 송욱 */}
              <div className="border border-[#e8b4c8]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('songwook')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-[#fef9fb] transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-base text-[#6b6b6b]">[신랑] 송욱</span>
                  <span className={`text-[#e8b4c8] text-xl transition-transform duration-300 ${openAccordions['songwook'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openAccordions['songwook'] && (
                  <div className="px-5 py-4 bg-[#fef9fb] border-t border-[#e8b4c8]/20 flex items-center justify-between">
                    <p className="text-sm text-[#6b6b6b]">신한 110-353-906870</p>
                    <button
                      onClick={() => copyToClipboard('110-353-906870', '송욱')}
                      className="text-xs bg-[#e8b4c8] text-white py-2 px-4 rounded-full hover:bg-[#d89bb5] transition-colors duration-200 whitespace-nowrap"
                    >
                      복사
                    </button>
                  </div>
                )}
              </div>

              {/* 이은이 */}
              <div className="border border-[#e8b4c8]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('euny')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-[#fef9fb] transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-base text-[#6b6b6b">[모] 이은이</span>
                  <span className={`text-[#e8b4c8] text-xl transition-transform duration-300 ${openAccordions['euny'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openAccordions['euny'] && (
                  <div className="px-5 py-4 bg-[#fef9fb] border-t border-[#e8b4c8]/20 flex items-center justify-between">
                    <p className="text-sm text-[#6b6b6b]">우리 1002-031-875482</p>
                    <button
                      onClick={() => copyToClipboard('1002-031-875482', '이은이')}
                      className="text-xs bg-[#e8b4c8] text-white py-2 px-4 rounded-full hover:bg-[#d89bb5] transition-colors duration-200 whitespace-nowrap"
                    >
                      복사
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 신부측 */}
          <div>
            <h4 className="text-lg mb-4 text-center font-light tracking-[2px] text-[#6b6b6b]">
              신부측
            </h4>
            <div className="space-y-3">
              {/* 김진희 */}
              <div className="border border-[#e8b4c8]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('jinhee')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-[#fef9fb] transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-base text-[#6b6b6b]">[신부] 김진희</span>
                  <span className={`text-[#e8b4c8] text-xl transition-transform duration-300 ${openAccordions['jinhee'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openAccordions['jinhee'] && (
                  <div className="px-5 py-4 bg-[#fef9fb] border-t border-[#e8b4c8]/20 flex items-center justify-between">
                    <p className="text-sm text-[#6b6b6b]">카카오뱅크 3333-04-3954135</p>
                    <button
                      onClick={() => copyToClipboard('3333-04-3954135', '김진희')}
                      className="text-xs bg-[#e8b4c8] text-white py-2 px-4 rounded-full hover:bg-[#d89bb5] transition-colors duration-200 whitespace-nowrap"
                    >
                      복사
                    </button>
                  </div>
                )}
              </div>

              {/* 김정규(김진완) */}
              <div className="border border-[#e8b4c8]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('jeonggyu')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-[#fef9fb] transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-base text-[#6b6b6b]">[부] 김정규(김진완)</span>
                  <span className={`text-[#e8b4c8] text-xl transition-transform duration-300 ${openAccordions['jeonggyu'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openAccordions['jeonggyu'] && (
                  <div className="px-5 py-4 bg-[#fef9fb] border-t border-[#e8b4c8]/20 flex items-center justify-between">
                    <p className="text-sm text-[#6b6b6b]">농협 352-0695-6101-93</p>
                    <button
                      onClick={() => copyToClipboard('352-0695-6101-93', '김진완')}
                      className="text-xs bg-[#e8b4c8] text-white py-2 px-4 rounded-full hover:bg-[#d89bb5] transition-colors duration-200 whitespace-nowrap"
                    >
                      복사
                    </button>
                  </div>
                )}
              </div>

              {/* 김옥자 */}
              <div className="border border-[#e8b4c8]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('okja')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-[#fef9fb] transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="text-base text-[#6b6b6b">[모] 김옥자</span>
                  <span className={`text-[#e8b4c8] text-xl transition-transform duration-300 ${openAccordions['okja'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openAccordions['okja'] && (
                  <div className="px-5 py-4 bg-[#fef9fb] border-t border-[#e8b4c8]/20 flex items-center justify-between">
                    <p className="text-sm text-[#6b6b6b]">신한 110-230-047184</p>
                    <button
                      onClick={() => copyToClipboard('110-230-047184', '김옥자')}
                      className="text-xs bg-[#e8b4c8] text-white py-2 px-4 rounded-full hover:bg-[#d89bb5] transition-colors duration-200 whitespace-nowrap"
                    >
                      복사
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 장식 */}
      <section className="h-[750px] flex items-center justify-center py-12 px-8 pb-16 text-center bg-[#faf6ed]">
        <div>
          <img src={kiss} alt="장식" className="w-48 h-48 mx-auto mb-8 object-contain" />
          <div className="text-xl text-[#e8b4c8] mb-5 opacity-60 tracking-[10px]">❀ ❀ ❀</div>
          <p className="text-sm text-black font-light mb-8 font-neodgm">결혼을 축하해주셔서 감사합니다.</p>


          <button
            onClick={shareURL}
            className="bg-[#e8b4c8] text-white py-3 px-6 rounded-full text-sm cursor-pointer shadow-[0_4px_15px_rgba(232,180,200,0.3)] transition-all duration-300 hover:bg-[#d89bb5] hover:shadow-[0_6px_20px_rgba(232,180,200,0.4)] active:scale-95 font-neodgm"
          >
            모바일 청첩장 공유하기
          </button>
        </div>
      </section>

      {/* 이미지 확대 모달 */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black z-[1000] flex items-center justify-center"
          onClick={closeModal}
        >
          <button
            className="absolute top-2 right-2 text-white/60 text-2xl font-normal cursor-pointer transition-all duration-300 z-[1001] hover:text-white/90 p-4"
            onClick={closeModal}
            aria-label="닫기"
          >
            ✕
          </button>

          <div
            className="w-full h-full flex items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex items-center transition-transform duration-150 ease-out"
              style={{
                transform: `translateX(-${selectedImage * 100}vw)`,
              }}
            >
              {webpPaths.map((path, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center px-5"
                >
                  <img
                    src={path}
                    alt={`사진 ${index + 1}`}
                    loading={Math.abs(index - selectedImage) <= 1 ? "eager" : "lazy"}
                    className="max-w-[95%] max-h-[90vh] object-contain"
                    style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-[1001] flex justify-center">
            <div className="text-white/80 text-sm bg-black/50 py-2 px-4 rounded-full">
              {selectedImage + 1} / {webpFiles.length}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Page1;
