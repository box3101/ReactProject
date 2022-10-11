//변수 설정 
const frame = document.querySelector("section"); 
const lists = frame.querySelectorAll("article");
const prev = document.querySelector(".btnPrev"); 
const next = document.querySelector(".btnNext"); 
const audio = document.querySelectorAll("audio"); 

let i = 0; 
let num = 0; 
const deg = 45; 
let active = 0; 
const len = lists.length - 1; 
 
//article의 갯수만큼 반복을 돌면서 코드 실행 
for(let el of lists){
    //article의 위치값 설정 - 45도씩 회전하고 아래로 배치 
    el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;      

    //각 article의 .pic에 백그라운드 이미지 넣기 
    let pic = el.querySelector(".pic"); 
    pic.style.backgroundImage = `url(img/member${i+1}.jpg)`; 

    //반복할 때마다 1씩 증가 
    i++;


    //플레이버튼을 클릭했을 때 .pic에 on 추가, 음악 재생  
    const play = el.querySelector(".play"); 
    const pause = el.querySelector(".pause"); 
    const load = el.querySelector(".load"); 

    //play버튼을 클릭했을 때 pic에 on 추가하고 음악재생 
    play.addEventListener("click", e=>{
        //클릭한 버튼의 부모인 article이 활성화 되어있는지 판별하여 값을 변수로 저장 
        let isActive = e.currentTarget.closest("article").classList.contains("on"); 
        // console.log(isActive); 

        //활성화되어있다면 - true라면 코드 실행 
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on"); 
            e.currentTarget.closest("article").querySelector("audio").play(); 
        }
      
    });

    //pause 버튼을 클릭했을 .pic on 제거, 음악 재생중지 
    pause.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on"); 
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on"); 
            e.currentTarget.closest("article").querySelector("audio").pause(); 
        }       
    }); 

    //load 버튼을 클릭했을 때 .pic의 on제거하고 음악재생중지
    load.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on"); 
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on"); 
            e.currentTarget.closest("article").querySelector("audio").load(); 
            e.currentTarget.closest("article").querySelector("audio").play(); 
        }      
    });
}


//prev버튼을 클릭했을 때 이전 article이 화면 중앙에 오도록
prev.addEventListener("click", ()=>{
    //음악재생중지, .pic 애니메이션 중지 
    initMusic(); 

    num++; //frame 회전 가가도 
    frame.style.transform = `rotate( ${num * deg}deg)`; 
  
    //article 8개 - lists배열에 [0,1,2,3,4,5,6,7];  
    //7,6,5,4,3,2,1,0->7,6,5,4,3,2,1,0 
    //현재 활성화 article 순서값 설정 
    if(active == 0){
        active = len; //7
    }else{
        active--; 
    }  
    
    // (active == 0) ? active = len : active--; 
    //모든 article 순간적으로 비활성화하고  
    activation(active, lists);  
});

//next 버튼을 클릭했을 때 다음 article이 화면 중앙에 오도록 
next.addEventListener("click", ()=>{
    initMusic(); 

    num--; 
    frame.style.transform = `rotate(${num * deg}deg)`; 
 
    //article 활성화 순번 
    //0,1,2,3,4,5,6,7 => 0,1,2,3,4,5,6,7
    if(active == len){
        active = 0; 
    }else{
        active++; 
    }
    
    // (active == len) ? active = 0 : active++; 
    activation(active, lists); 
});


//article 활성화 함수정의 
function activation(index, lists){
    for(let el of lists){
        el.classList.remove("on"); 
    }
    lists[index].classList.add("on"); 
}

//prev, next 버튼 클릭시 호출하는 함수 
//음악 재생 중지, .pic 애니메이션 중지(on 제거) 함수 정의 
function initMusic(){
    for(let el of audio){
        el.pause(); 
        el.load(); 
        el.closest("article").querySelector(".pic").classList.remove("on"); 
    }
}