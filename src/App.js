import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapInner from './mapInner.jpg';

// webp 이미지 파일명 배열 (순서대로 정렬)
const webpFiles = [
  '1-VATA0234_3차수정본.webp',
  '2-VATA1349_2차수정본.webp',
  '3-VATA1336_수정본.webp',
  '4-VATA0508_2차수정본.webp',
  '5-VATA0524_3차수정본.webp',
  '6-VATA1461_수정본.webp',
  '7-VATA1512_수정본.webp',
  '8-VATA2050_2차수정본.webp',
  '9-VATA2057_2차수정본.webp',
  '10-VATA1168_수정본.webp',
  '11-VATA1182_수정본.webp',
  '12-VATA0048_3차수정본.webp',
  '13-VATA0197_2차수정본.webp',
  '14-VATA1727 파란하늘_2차수정본.webp',
  '15-VATA1833 파란하늘_수정본.webp',
  '16-VATA0883_수정본.webp',
  '17-VATA0913_수정본.webp',
  '18-VATA1075_3차수정본.webp',
  '19-VATA1142_2차수정본.webp',
  '20-VATA1391_수정본.webp',
  '21-VATA1431_수정본.webp',
  '22-VATA1883_수정본.webp',
  '23-VATA1899_수정본.webp',
  '24-VATA0206_2차수정본.webp',
  '25-VATA0231_3차수정본.webp',
  '26-VATA0755_3치수정본.webp',
  '27-VATA0643_2차수정본.webp',
  '28-VATA1951_수정본.webp',
  '29-VATA1992_수정본.webp',
  '30-VATA0558_수정본.webp',
  '31-VATA0599_수정본.webp',
  '32-VATA1670_수정본.webp',
  '33-VATA1627_2차수정본.webp',
  '34-VATA2130_수정본.webp',
  '35-VATA2136_수정본.webp',
  '36-VATA0026_수정본.webp',
  '37-VATA0135_수정본.webp',
  '38-VATA1977_수정본.webp',
  '39-VATA2013_2차수정본.webp',
  '40-VATA0367_수정본.webp',
  '41-VATA0405_2차수정본.webp',
  '42-VATA1861_3차수정본.webp',
  '43-VATA1868_2차수정본.webp',
  '44-VATA2267_수정본.webp',
  '45-VATA2224_2차수정본.webp',
  '46-VATA0434_수정본.webp',
  '47-VATA0455_수정본.webp',
  '48-VATA1192_수정본.webp',
  '49-VATA1060_2차수정본.webp',
  '50-VATA2298_2차수정본.webp',
  '51-VATA2336_2차수정본.webp',
  '52-VATA0408_2차수정본.webp',
  '53-VATA0383_수정본.webp',
  '54-VATA0974_2차수정본.webp',
  '55-VATA0853_수정본.webp',
  '56-VATA0833_수정본.webp',
  '57-VATA0621_수정본.webp',
  '58-VATA1261 컨페티 빈곳합성_3차수정본.webp',
];

// jpg60 썸네일 파일명 매핑 (webp 파일명 -> jpg60 파일명)
const jpg60Files = [
  '1-VATA0234_3차수정본_13.jpg',
  '2-VATA1349_2차수정본_14.jpg',
  '3-VATA1336_수정본_15.jpg',
  '4-VATA0508_2차수정본_16.jpg',
  '5-VATA0524_3차수정본_21.jpg',
  '6-VATA1461_수정본_22.jpg',
  '7-VATA1512_수정본_23.jpg',
  '8-VATA2050_2차수정본_24.jpg',
  '9-VATA2057_2차수정본_25.jpg',
  '10-VATA1168_수정본_1.jpg',
  '11-VATA1182_수정본_2.jpg',
  '12-VATA0048_3차수정본_3.jpg',
  '13-VATA0197_2차수정본_4.jpg',
  '14-VATA1727 파란하늘_2차수정본_5.jpg',
  '15-VATA1833 파란하늘_수정본_1.jpg',
  '16-VATA0883_수정본_2.jpg',
  '17-VATA0913_수정본_3.jpg',
  '18-VATA1075_3차수정본_4.jpg',
  '19-VATA1142_2차수정본_5.jpg',
  '20-VATA1391_수정본_1.jpg',
  '21-VATA1431_수정본_2.jpg',
  '22-VATA1883_수정본_3.jpg',
  '23-VATA1899_수정본_1.jpg',
  '24-VATA0206_2차수정본_2.jpg',
  '25-VATA0231_3차수정본_3.jpg',
  '26-VATA0755_3치수정본_4.jpg',
  '27-VATA0643_2차수정본_5.jpg',
  '28-VATA1951_수정본_6.jpg',
  '29-VATA1992_수정본_1.jpg',
  '30-VATA0558_수정본_2.jpg',
  '31-VATA0599_수정본_3.jpg',
  '32-VATA1670_수정본_4.jpg',
  '33-VATA1627_2차수정본_5.jpg',
  '34-VATA2130_수정본_1.jpg',
  '35-VATA2136_수정본_2.jpg',
  '36-VATA0026_수정본_3.jpg',
  '37-VATA0135_수정본_4.jpg',
  '38-VATA1977_수정본_5.jpg',
  '39-VATA2013_2차수정본_1.jpg',
  '40-VATA0367_수정본_2.jpg',
  '41-VATA0405_2차수정본_3.jpg',
  '42-VATA1861_3차수정본_4.jpg',
  '43-VATA1868_2차수정본_5.jpg',
  '44-VATA2267_수정본_1.jpg',
  '45-VATA2224_2차수정본_2.jpg',
  '46-VATA0434_수정본_3.jpg',
  '47-VATA0455_수정본_4.jpg',
  '48-VATA1192_수정본_5.jpg',
  '49-VATA1060_2차수정본_1.jpg',
  '50-VATA2298_2차수정본_2.jpg',
  '51-VATA2336_2차수정본_3.jpg',
  '52-VATA0408_2차수정본_4.jpg',
  '53-VATA0383_수정본_5.jpg',
  '54-VATA0974_2차수정본_6.jpg',
  '55-VATA0853_수정본_1.jpg',
  '56-VATA0833_수정본_2.jpg',
  '57-VATA0621_수정본_3.jpg',
  '58-VATA1261 컨페티 빈곳합성_3차수정본_4.jpg',
];

// 썸네일 이미지 경로를 미리 계산 (성능 최적화)
const thumbnailPaths = jpg60Files.map((filename, index) => {
  try {
    return require(`./jpg60/${filename}`);
  } catch (e) {
    return require(`./webp/${webpFiles[index]}`);
  }
});

// webp 원본 이미지 경로를 미리 계산 (성능 최적화)
const webpPaths = webpFiles.map((filename) => {
  return require(`./webp/${filename}`);
});

// 이미지 아이템 컴포넌트 (메모이제이션)
const AlbumItem = React.memo(({ index, thumbnailPath, onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={imgRef}
      className="relative w-full pt-[100%] overflow-hidden rounded-xl cursor-pointer shadow-[0_2px_10px_rgba(232,180,200,0.2)] transition-[transform,box-shadow] duration-200 bg-[#f8f8f8] will-change-transform hover:-translate-y-[5px] hover:shadow-[0_6px_20px_rgba(232,180,200,0.4)]"
      onClick={() => onOpenModal(index)}
    >
      {isVisible && (
        <img
          src={thumbnailPath}
          alt={`사진 ${index + 1}`}
          loading="lazy"
          decoding="async"
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-200 will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
        />
      )}
    </div>
  );
});

AlbumItem.displayName = 'AlbumItem';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const navigateImage = useCallback((direction) => {
    setSelectedImage((prev) => {
      if (prev === null) return null;
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : webpFiles.length - 1;
      } else {
        return prev < webpFiles.length - 1 ? prev + 1 : 0;
      }
    });
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div className="max-w-full mx-auto bg-gradient-to-b from-[#fff5f5] via-white to-[#fff5f5] min-h-screen font-wedding text-[#4a4a4a] overflow-x-hidden">
      {/* 메인 헤더 */}
      <section className="pt-[60px] px-5 pb-10 text-center bg-gradient-to-br from-[#ffeef7] to-[#fff5f5] relative">
        <div className="text-2xl text-[#e8b4c8] my-5 opacity-70">❀</div>
        <h1 className="text-[32px] font-normal text-[#8b5a7a] my-8 tracking-[2px] leading-[1.4] max-[480px]:text-[28px]">송욱 & 김진희</h1>
        <div className="my-8">
          <p className="text-base text-[#6b5b6b] leading-[1.8] font-light">2026년 05월 09일 토요일 오전 11시</p>
        </div>
        <div className="text-2xl text-[#e8b4c8] my-5 opacity-70">❀</div>
      </section>

      {/* 인사말 */}
      <section className="py-12 px-8 text-center">
        <div className="max-w-[500px] mx-auto bg-white/80 py-10 px-8 rounded-[20px] shadow-[0_4px_20px_rgba(232,180,200,0.15)] max-[480px]:py-8 max-[480px]:px-5">
          <p className="text-[15px] leading-[2.2] text-[#5a5a5a] font-light whitespace-pre-line max-[480px]:text-sm">
            서로를 향한 마음이 하나가 되어<br />
            사랑으로 함께 가고자 합니다.<br />
            <br />
            저희 두 사람이 사랑의 이름으로<br />
            하나 되는 자리에<br />
            소중한 분들을 모시고자 합니다.<br />
            <br />
            부디 참석하시어<br />
            저희의 새로운 시작을<br />
            축복해 주시면 감사하겠습니다.
          </p>
        </div>
      </section>

      {/* 부모님 이름 */}
      <section className="py-10 px-8 text-center">
        <div className="max-w-[500px] mx-auto bg-white/90 py-9 px-6 rounded-[15px] shadow-[0_3px_15px_rgba(232,180,200,0.1)] max-[480px]:py-8 max-[480px]:px-5">
          <div className="my-6">
            <p className="text-sm text-[#8b5a7a] mb-2.5 font-medium">신랑</p>
            <p className="text-[15px] text-[#6b5b6b] leading-[1.8]">상우 · 은이의 차남 욱</p>
          </div>
          <div className="my-6">
            <p className="text-sm text-[#8b5a7a] mb-2.5 font-medium">신부</p>
            <p className="text-[15px] text-[#6b5b6b] leading-[1.8]">정규 · 옥자의 장녀 진희</p>
          </div>
        </div>
      </section>

      {/* 사진 앨범 */}
      <section className="py-12 px-5 text-center">
        <div className="max-w-[500px] mx-auto">
          <h2 className="text-xl text-[#8b5a7a] mb-6 font-normal">사진 앨범</h2>
          <div className="grid grid-cols-2 gap-3 py-5 w-full max-[480px]:gap-2">
            {thumbnailPaths.map((thumbnailPath, index) => (
              <AlbumItem
                key={index}
                index={index}
                thumbnailPath={thumbnailPath}
                onOpenModal={openModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 장소 정보 */}
      <section className="py-10 px-8 text-center">
        <div className="max-w-[500px] mx-auto bg-white/90 py-9 px-6 rounded-[15px] shadow-[0_3px_15px_rgba(232,180,200,0.1)] max-[480px]:py-8 max-[480px]:px-5">
          <h2 className="text-xl text-[#8b5a7a] mb-6 font-normal">오시는 길</h2>
          <div className="my-5">
            <p className="text-lg text-[#6b5b6b] mb-2.5 font-medium">수원 파티웨딩유</p>
            <p className="text-sm text-[#7a7a7a] leading-[1.8] my-1">
              경기도 수원시 권선구 세화로 218 (서둔동 9-16번지) 파티웨딩유
            </p>
            <p className="text-sm text-[#7a7a7a] leading-[1.8] my-1">031-297-1000</p>
          </div>

          {/* 오시는 방법 이미지 */}
          <div className="mt-6">
            <div className="overflow-hidden rounded-[15px] shadow-[0_3px_15px_rgba(0,0,0,0.12)]">
              <img
                src={mapInner}
                alt="수원 파티웨딩유 오시는 방법 안내"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* 오시는 방법 텍스트 */}
          <div className="mt-6 text-left text-sm text-[#5a5a5a] leading-relaxed space-y-3">
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

      {/* 하단 장식 */}
      <section className="py-12 px-8 pb-16 text-center">
        <div className="text-xl text-[#e8b4c8] mb-5 opacity-60 tracking-[10px]">❀ ❀ ❀</div>
        <p className="text-sm text-[#8b8b8b] font-light">소중한 분들의 참석을 기다립니다</p>
      </section>

      {/* 이미지 모달 */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[1000] p-5"
          onClick={closeModal}
        >
          <button 
            className="absolute top-5 right-5 bg-white/90 border-2 border-white/50 text-gray-800 text-[32px] font-bold w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] leading-none p-0 hover:bg-white hover:scale-110 hover:shadow-[0_4px_15px_rgba(255,255,255,0.3)] max-[480px]:top-2.5 max-[480px]:right-2.5 max-[480px]:w-[45px] max-[480px]:h-[45px] max-[480px]:text-[28px]" 
            onClick={closeModal} 
            aria-label="닫기"
          >
            ✕
          </button>
          <button 
            className="absolute top-1/2 -translate-y-1/2 left-5 bg-white/90 border-2 border-white/50 text-gray-800 text-[40px] font-bold w-[60px] h-[60px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] leading-none p-0 hover:bg-white hover:-translate-y-1/2 hover:scale-115 hover:shadow-[0_4px_20px_rgba(255,255,255,0.4)] active:-translate-y-1/2 active:scale-105 max-[480px]:left-2.5 max-[480px]:w-[50px] max-[480px]:h-[50px] max-[480px]:text-[35px]" 
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            aria-label="이전"
          >
            ‹
          </button>
          <div 
            className="max-w-[90%] max-h-[90vh] relative flex flex-col items-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={webpPaths[selectedImage]}
              alt={`사진 ${selectedImage + 1}`}
              loading="eager"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-white mt-4 text-base opacity-90 bg-black/50 py-2 px-4 rounded-[20px]">
              {selectedImage + 1} / {webpFiles.length}
            </div>
          </div>
          <button 
            className="absolute top-1/2 -translate-y-1/2 right-5 bg-white/90 border-2 border-white/50 text-gray-800 text-[40px] font-bold w-[60px] h-[60px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] leading-none p-0 hover:bg-white hover:-translate-y-1/2 hover:scale-115 hover:shadow-[0_4px_20px_rgba(255,255,255,0.4)] active:-translate-y-1/2 active:scale-105 max-[480px]:right-2.5 max-[480px]:w-[50px] max-[480px]:h-[50px] max-[480px]:text-[35px]" 
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            aria-label="다음"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
