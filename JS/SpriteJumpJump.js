function Sprite(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    this.desenha = function(xCanvas, yCanvas){
        contexto.drawImage(img,this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
    }
}

var spriteCenario = new Sprite(0, 0, 800, 600),
spritePersonagem = new Sprite(890, 37, 50, 50),
spriteChao = new Sprite(0, 637, 800, 50),
spriteJogar = new Sprite(915, 261, 400, 400),
spritePerdeu = new Sprite(0, 722, 400, 400),
spriteRecord = new Sprite(503,952, 271, 114),
spriteNovo = new Sprite(955, 934, 271, 132),
thinBamboo = new Sprite(919, 1240, 30, 120),
smallBamboo = new Sprite(993, 1240, 40, 120),
mediumBamboo = new Sprite(1088, 1240, 50, 120),
largeBamboo = new Sprite(1166, 1240, 60, 120);
