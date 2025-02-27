
  function moveTo(selector){
  const target = document.querySelector(selector);
  if(target) {
  window.scrollTo({top: target.offsetTop, behavior: "smooth"});
  }
}

  function imgPopUp(element) { //이미지 팝업창 띄우기
  const imgurl = element.getAttribute("src");
  console.log(imgurl);
  const modalImg = document.querySelector(".modal_img");
  modalImg.setAttribute("src", imgurl);
  const modal = document.querySelector(".modal");
  modal.style.display = 'flex';
  console.log(modalImg);
}

  function modal_close() { // 모달 끄기
  const modal = document.querySelector(".modal");
  modal.style.display = 'none';
}
  function updateButtonColor() {
  const mainBtn = document.querySelector(".mainBtn");
  const profileBtn = document.querySelector(".profileBtn");
  const galleryBtn = document.querySelector(".galleryBtn");

  let scrollY = window.scrollY;

  mainBtn.style.backgroundColor = "white";
  profileBtn.style.backgroundColor = "white";
  galleryBtn.style.backgroundColor = "white";

  // 현재 스크롤 위치에 따라 버튼 색상 변경
  switch (true) {
  case scrollY >= 0 && scrollY < 500:
  mainBtn.style.backgroundColor = "black";
  mainBtn.style.color = "white";
  galleryBtn.style.color="black";
  profileBtn.style.color="black";
  break;

  case scrollY >= 500&& scrollY < 1000:
  profileBtn.style.backgroundColor = "black";
  profileBtn.style.color = "white";
  mainBtn.style.color="black";
  galleryBtn.style.color="black";
  break;

  case scrollY > 1000:
  galleryBtn.style.backgroundColor = "black";
  galleryBtn.style.color = "white";
  mainBtn.style.color="black";
  profileBtn.style.color="black";
  break;

  default:
  break;
}
}
  // 스크롤할 때마다 버튼 색상 업데이트
  window.addEventListener("scroll", updateButtonColor);

  // 초기 실행
  window.addEventListener("DOMContentLoaded", updateButtonColor);

  function likeImage(imageId){
  let likeCountSpan = document.getElementById(`likeCount-${imageId}`);
  let data = JSON.parse(localStorage.getItem(`data`)) || {} ; // 저장된 객체를 갖고오거나 생성
  let imageData = data[imageId] || {liked: false , count : 0}; //imageId가 들어간 객체의 데이터를 갖고 오거나 없다면 liked와 count의 초기값을 생성
  let likebtn = document.getElementById(`btn-${imageId}`);

  if(imageData.liked){
  imageData.count -= 1;
  imageData.liked = false;
  likebtn.classList.remove("liked");
  console.log(data ,imageData);
}else{
  imageData.count += 1;
  imageData.liked = true;
  likebtn.classList.add("liked");
  console.log(data ,imageData);
}
  data[imageId] = imageData; // data[imageId]에다가 변경된 imageData의 값을 넣음

  localStorage.setItem('data' , JSON.stringify(data)); // 로컬 스토리지에 data를 JSON 문자열로 변환해 저장
  likeCountSpan.innerText = imageData.count;
}
  function loadLikes(){
  const data = JSON.parse(localStorage.getItem(`data`)) || {};
  document.querySelectorAll(".like-btn").forEach(btn => {
  let imageId = btn.getAttribute("onclick").match(/'([^']+)'/)[1]; // 버튼에서 정규식으로 imageId를 추출
  let likeCountSpan = document.getElementById(`likeCount-${imageId}`);
  let imageData = data[imageId] || {liked: false , count : 0};

  likeCountSpan.innerText = imageData.count;
  if(imageData.liked){
  btn.classList.add("liked");
}else{
  btn.classList.remove("liked");
}
})
}

  document.addEventListener("DOMContentLoaded", loadLikes); //페이지 불러오면 loadLikes 함수 실행

  // function likeImage(imageId) {
  //     let likeCountSpan = document.getElementById(`likeCount-${imageId}`);
  //     let liked = localStorage.getItem(`liked-${imageId}`) === "true";
  //     let likeBtn = document.getElementById(`btn-${imageId}`);
  //     let count = parseInt(localStorage.getItem(`count-${imageId}`)) || 0;
  //     if (liked && count > 0) { //이미지 좋아요를 눌렀는지 확인
  //         count -= 1;
  //         localStorage.setItem(`liked-${imageId}` , "false");
  //         likeBtn.classList.remove("liked"); //좋아요를 취소하기 때문에 liked CSS를 삭제
  //         console.log("감소");
  //     }else{
  //         count += 1;
  //         localStorage.setItem(`liked-${imageId}` , "true");
  //         console.log("증가");
  //         likeBtn.classList.add("liked");// 좋아요를 누르면 opacity가 1이 되는 liked CSS를 추가
  //     }
  //
  //     localStorage.setItem(`count-${imageId}`, count);
  //     likeCountSpan.innerText = count;
  // }

  // function loadLikes() { // 기존 좋아요 데이터 불러옴
  //     document.querySelectorAll(".like-btn").forEach(btn => {
  //         let imageId = btn.getAttribute("onclick").match(/'([^']+)'/)[1];
  //         let likeCountSpan = document.getElementById(`likeCount-${imageId}`);
  //         let liked = localStorage.getItem(`liked-${imageId}`) === "true";
  //         likeCountSpan.innerText = localStorage.getItem(`count-${imageId}`) || 0;
  //         if(liked){ // 좋아요를 눌렀다면 클래스에 liked를 눌러서 투명도 설정
  //             btn.classList.add("liked");
  //         }else{
  //             btn.classList.remove("liked");
  //         }
  //
  //     });
  // }

