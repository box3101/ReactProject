//https://apis.map.kakao.com/web/guide/

// 자바스크립트 키
// 54721f87d84f573ca34ea5e6aaf18570

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

const t_on = document.querySelectorAll(".traffic li")[0];
const t_off = document.querySelectorAll(".traffic li")[1];
const branch_btns = document.querySelectorAll(".branch li");

let zoom = true;

//기본으로 가져온 정보
var options = { //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.507025, 126.7563481), //지도의 중심좌표.
  level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//우리가 만든 정보
var markerOptions = [{
    title: "본점",
    latlag: new kakao.maps.LatLng(37.507025, 126.7563481), //좌표
    imgSrc: "../img/marker1.png", // 이미지 불러오기
    imageSize: new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다 
    imgPos: {
      offset: new kakao.maps.Point(116, 50)
    }, // 마커이미지의 좌표 설정
    button: branch_btns[0], // branch_btn의 첫번째
  },
  {
    title: "코엑스",
    latlag: new kakao.maps.LatLng(37.5116828, 127.059151), //좌표
    imgSrc: "../img/marker2.png", // 이미지 불러오기
    imageSize: new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다 
    imgPos: {
      offset: new kakao.maps.Point(116, 50)
    }, // 마커이미지의 좌표 설정
    button: branch_btns[1], // branch_btn의 두번째
  },
  {
    title: "이즈파크",
    latlag: new kakao.maps.LatLng(37.4723739, 126.8816525), //좌표
    imgSrc: "../img/marker3.png", // 이미지 불러오기
    imageSize: new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다 
    imgPos: {
      offset: new kakao.maps.Point(116, 50)
    }, // 마커이미지의 좌표 설정
    button: branch_btns[2], // branch_btn의 세번째
  }
]

for (let i = 0; i < markerOptions.length; i++) {
  // 카카오맵에 전달 생성자함수에 -> 전달
  new kakao.maps.Marker({
    map: map,
    position: markerOptions[i].latlag, // 좌표
    title: markerOptions[i].title, // 타이틀
    //마커이미지의 생성자 함수를 씀
    image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imageSize, markerOptions[i].imgPos) // 이미지 src, 이미지 사이즈 , 이미지 좌표
  });

  markerOptions[i].button.addEventListener("click", e => {
    e.preventDefault();

    branch_btns.forEach((el, index) => {
      //모든 버튼을 반복을 돌면서 모두 제거
      el.classList.remove("on");

      //내가 선택한 곳에 on을 부여
      markerOptions[i].button.classList.add("on");
      moveTo(markerOptions[i].latlag);
    });

  });
}

function moveTo(target) {
  var moveLatlon = target;
  // setCenter 맵보이게 하고 좌표 센터 위치 시키기
  map.setCenter(moveLatlon);
}

t_on.addEventListener("click", e => {
  e.preventDefault();
  if (t_on.classList.contains("on")) return;
  // t_on은 교통정보를 보여주는 버튼인데 현재 교통정보 버튼에 on일경우 또다시
  // 이벤트가 발생하지 않도록 on을 contains로 물어봐서 현재상태가 on이 있는 경우
  // 아무일도 발생하지 않게 return으로 반환하고 없다면 해당 조건문은 무시 
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  t_on.classList.add("on");
  t_off.classList.remove("on");

});


t_off.addEventListener("click", e => {
  e.preventDefault();
  if (t_off.classList.contains("on")) return;
  // t_on은 교통정보를 보여주는 버튼인데 현재 교통정보 버튼에 on일경우 또다시
  // 이벤트가 발생하지 않도록 on을 contains로 물어봐서 현재상태가 on이 있는 경우
  // 아무일도 발생하지 않게 return으로 반환하고 없다면 해당 조건문은 무시 
  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  t_off.classList.add("on");
  t_on.classList.remove("on");

});

//브라우저 리사이즈시 현재 활성화되어있는데 버튼의 data-index를 구해서 setCenter의 매개변수로 사용
//data-index를 사용하는 이유는 카카오맵의 함수를 사용하는데 nth-of-type등의 순서는 인수로 보낼수 없기 때문이다.

window.addEventListener("resize", e => {
  let active_btn = document.querySelector(".branch li.on");
  let active_index = active_btn.getAttribute("data-index");

  map.setCenter(markerOptions[active_index].latlag);
});


// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();


// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

setZoomable();

function setZoomable(zoom) {
  map.setZoomable(zoom)
}