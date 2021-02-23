
//Remove Draggable.
var elements = document.getElementsByTagName("*");
elements.draggable = "false";

//Import navbar and footer.
$(function(){
    $('#importNav').load('navbar.html')
});

$(function(){
    $('#importFooter').load('footer.html')
});

//MemoGame
const memoVid = `
    <div style="min-width: 160px;">
        <div class="embed-responsive embed-responsive-16by9">
            <video class="embed-responsive-item" src="midia/memo.mp4" muted autoplay loop disablePictureInPicture></video>
        </div>
    </div>
`;

const memoGameContent = "<b>MEMOGAME</b><br>Melhore sua memória enquanto se diverte!<br><br><b>Comandos:</b> Clique duplo nos cartões."

 $('#memoGame').popover({
    trigger: 'hover',
    placement: "bottom",
    html: true,
    sanitize: false,
    title: memoVid,
    content: memoGameContent
});




//JumpJump
const jumpVid = `
    <div style="min-width: 160px;">
        <div class="embed-responsive embed-responsive-16by9">
            <video class="embed-responsive-item" src="midia/jump.mp4" muted autoplay loop disablePictureInPicture></video>
        </div>
    </div>
`;

const jumpContent = "<b>JUMP-JUMP</b><br>Controle os pulos de um pandinha e desvie dos bambus!<br><br><b>Comandos:</b> Clique para pular."

 $('#jumpjump').popover({
    trigger: 'hover',
    placement: "bottom",
    html: true,
    sanitize: false,
    title: jumpVid,
    content: jumpContent
});





//Pong
const pongVid = `
    <div style="min-width: 160px;">
        <div class="embed-responsive embed-responsive-16by9">
            <video class="embed-responsive-item" src="midia/pong.mp4" muted autoplay loop disablePictureInPicture></video>
        </div>
    </div>
`;

const pongContent = "<b>PONG</b><br>Ping pong virtual! Jogue com um amigo, divida o teclado.<br><br><b>Comandos:</b><br> Player 1: W e S<br>Player 2: Setas do teclado (Cima e baixo)."

 $('#pongGame').popover({
    trigger: 'hover',
    placement: "bottom",
    html: true,
    sanitize: false,
    title: pongVid,
    content: pongContent
});


function startPopUp(){
    swal({
        icon:"info",
        title: "Prepare-se",
        text: "Coloque as mãos no teclado, o jogo é rápido ! ",
        buttons: {
        cancel: "Fechar",
        confirm: { value: "play", text: "COMEÇAR!"},
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then((value) => {
        switch(value){
            
        case 'play':
            window.location.href = "pong.html";
        case null:
            swal.close();
        }
    });
}




//Snake
const snakeVid = `
    <div style="min-width: 160px;">
        <div class="embed-responsive embed-responsive-16by9">
            <video class="embed-responsive-item" src="midia/snake.mp4" muted autoplay loop disablePictureInPicture></video>
        </div>
    </div>
`;

const snakeContent = "<b>SNAKELIFE</b><br>Clássico jogo da cobrinha!<br><br><b>Comandos:</b> Setas do teclado."

 $('#snakeGame').popover({
    trigger: 'hover',
    placement: "bottom",
    html: true,
    sanitize: false,
    title: snakeVid,
    content: snakeContent
});