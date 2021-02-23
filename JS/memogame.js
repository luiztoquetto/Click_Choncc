//Import navbar and footer.
$(function(){
  $('#importNav').load('navbar.html')
});

$(function(){
  $('#importFooter').load('footer.html')
});

const cardBoard = document.querySelector("#cardboard");
const imgs = [

  "vue.svg",
  "angular.svg",
  "react.svg",
  "ember.svg",
  "backbone.svg",
  "aurelia.svg"
];

let cardHTML = "";

imgs.forEach(img=>{

  cardHTML += `
    <div class="memory-card" data-card="${img}">

      <img draggable = false class="front-face" src="../../image/imgMemo/${img}"/>
      <img draggable = false class="back-face" src="../../image/imgMemo/js-badge.svg">
    </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let lockCards = false;
let cartas = [];

function flipCard(){

  if(lockCards){
    return false;
  }

  this.classList.add("flip");

  if(!firstCard){

    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch(){

  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);
}

function unFlipCards(){

  lockCards = true;

  setTimeout(() => {

    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 600);
}

(function random(){

  cards.forEach(card=>{

    let randm = Math.floor(Math.random() * 12);
    card.style.order = randm;
  });
})();

function resetCards(isMatch = false){

  if(isMatch){
    removeListener();
    cartas.push(true);
  }
  
  if(cartas.length >= 6) finishPopUp();

  [firstCard, secondCard, lockCards] = [null, null, false];
}

function removeListener(){
  firstCard.removeEventListener("dblclick",flipCard);
  secondCard.removeEventListener("dblclick",flipCard);
}


//Popup final
function finishPopUp(){
  swal({
    icon:"success",
    title: "Você ganhou !",
    text: " =)",
    buttons: {
      cancel: "Voltar",
      confirm: { value: "reset", text: "Reiniciar!"},
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch(value){
      
      case 'reset':
        location.reload();
        break;
      case null:
        window.location.replace("index.html");
    }
  });
}

cards.forEach(card => card.addEventListener("dblclick", flipCard));

cards.forEach(card => card.addEventListener("click", function(e){
  e.preventDefault();
}));

