const picList = document.querySelector(".frame ul");
const txtList = document.querySelector(".txt ul");
const bgList = document.querySelector(".bg ul");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
// 이벤트 방지 전역변수 설정
let enableClick = true;
// setinterval 변수 설정
let setInTerVal;

// 공통 슬라이드 배열로 그룹핑
const frames = [picList, txtList, bgList]

// 가운데 프레임을 기점으로 양옆에 하나의 패널이 있어야함. 마진 left -100%
for (let el of frames) el.style.marginLeft = "-100%"

// btn-next를 클릭하면
btnNext.addEventListener("click", e => {
  next(e);
});

// btn-prev를 클릭하면
btnPrev.addEventListener("click", e => {
  prev(e);
});

//prev 함수 분리
function prev(e) {
  // 만약에 enableClick값이 true가 아니면 return
  if (!enableClick) return;

  // enableClick을 false로 바꿈
  enableClick = false;

  //공통 frames 반복
  frames.forEach((el) => {
    new Anime(el, {
      // prop 설정
      prop: 'margin-left',
      // 초기값 -100%에서 오른쪽으로 이동하려면 0%
      value: '0%',
      duration: 500,
      callback: () => {
        // 0% 모션의 끝날 찰나의 순간에 마지막 걸 뜯어서 앞에다 붙힌다. 
        el.prepend(el.querySelector("li:last-of-type"));
        // 초기값으로 -100% 돌린다.
        el.style.marginLeft = "-100%";
        // 모든 모션이 끝나면 enable 클릭값을 true로 바꿈
        enableClick = true;
      }
    });
  });
}

// next 함수 분리
function next(e) {
  // 만약에 enableClick이 true가 아니면 return
  if (!enableClick) return;
  // enableClick 값을 false로 바꿈
  enableClick = false;

  // 공통 frames 반복
  frames.forEach((el) => {
    new Anime(el, {
      // prop 설정
      prop: 'margin-left',
      // 초기값 -100%에서 왼쪽으로 이동하려면 -200%
      value: '-200%',
      duration: 500,
      callback: () => {
        // -200% 모션의 끝날 찰나의 순간에 첫번째 걸 뜯어서 뒤에다 붙힌다.
        el.append(el.querySelector("li:first-of-type"));
        // 초기값으로 -100% 돌린다.
        el.style.marginLeft = "-100%";
        // 모든 모션이 끝나면 enableClick 값을 true로 바꿈
        enableClick = true;
      }
    });
  });
}

//play 버튼을 누르면
play.addEventListener("click", e => {
  // 자동 슬라이드 시작
  setInTerVal = setInterval(next, 2000);
});

//stop 버튼을 누르면
stop.addEventListener("click", e => {
  // 자동슬라이드 멈춤
  clearInterval(setInTerVal);
});

