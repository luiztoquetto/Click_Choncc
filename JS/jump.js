
            //Variáveis globais do jogo.
            var canvas, contexto, 
            ALTURA, LARGURA, frames=0, 
            maxPulos=3, velocidade=8, estadoAtual, record, img, qtdVidas = 3,

            pontosNivel = [10,20,30,35,40,45,70,85,110,120,220],
            
            nivelAtual = 0,

            txtNivel = {
                texto: "",
                opacidade: 0.0,

                fadeIn: function(tempo){
                    var fadeInId = setInterval(function(){
                        if(txtNivel.opacidade < 1.0){
                            txtNivel.opacidade += 0.01;
                        }else{
                            clearInterval(fadeInId);
                        }
                    },10 * tempo);
                },

                fadeOut: function(tempo){
                    var fadeOutId = setInterval(function(){
                        if(txtNivel.opacidade > 0){
                            txtNivel.opacidade -= 0.01;
                        } else{
                            clearInterval(fadeOutId);
                        }
                    },10 * tempo);
                }
            },

            //Objeto que guarda os estados de jogo.
            estados = {
                //Atributos
                jogar: 0,
                jogando: 1,
                perdeu: 2
            };

            //Objeto de chão, guarda seus atibutos e métodos.
            var chao = {

                //Posicionamento e altura do chão.
                x: 0,
                y: 550,
                altura: 50,

                
                atualiza: function(){
                    this.x -= velocidade;
                    if(this.x <= -48){
                        this.x += 48;
                    }
                },

                //Método para desenhar o chão.
                desenha: function(){
                    spriteChao.desenha(this.x,this.y);
                    spriteChao.desenha(this.x + spriteChao.largura, this.y);
                    //contexto.fillStyle = this.cor;
                    //contexto.fillRect(0, this.y, LARGURA, this.altura);
                },
            };

            //Objeto do bloco (personagem), guarda seus atributos e métodos
            var bloco = {

                //Posicionamento inicial do bloco.
                x: 50,
                y: 0,

                //Dimensões.
                altura: spritePersonagem.altura,
                largura: spritePersonagem.largura,

                //Atributos que afetam a gameplay.
                gravidade: 1.5,
                velocidade: 0,
                forcaDoPulo: 25,
                qntPulos: 0,

                //Guardar a pontuação.
                score: 0,

                //Atributo de auxilio de rotacao.
                rotacao: 0,

                vidas: qtdVidas,
                colidindo: false,

                //Método que atualiza o posicionamento do bloco, sua movimentação.
                atualiza: function(){

                    this.velocidade += this.gravidade;
                    this.y += this.velocidade;
                    this.rotacao += Math.PI / 180 * velocidade;

                    if(this.y > chao.y - this.altura && estadoAtual != estados.perdeu){

                        this.y = chao.y - this.altura;
                        this.qntPulos = 0;
                        this.velocidade = 0;
                    }
                },

                //Retira a velocidade do bloco e ao inicio, também atribui o novo record.
                reset: function(){

                    this.velocidade = 0;
                    this.y = 0;

                    //Atribuição de record.
                    if (this.score > record){
                        
                        localStorage.setItem("record", this.score);
                        record = this.score;
                    }

                    this.vidas = qtdVidas;
                    this.score = 0;

                    velocidade = 8;
                    nivelAtual = 0;
                    this.gravidade = 1.5
                },
                
                //Bloco irá pular de acordo com a força declarada.
                pula: function(){

                    if(this.qntPulos < maxPulos){

                        this.velocidade = - this.forcaDoPulo;
                        this.qntPulos++;
                    }
                },

                //Desenha o bloco.
                desenha: function(){

                    contexto.save();
                    //Rotação:
                    contexto.translate(this.x+this.largura / 2, this.y + this.altura/2);
                    contexto.rotate(this.rotacao);

                    //Desenho.
                    spritePersonagem.desenha(-this.largura/2, -this.altura/2);
                    //Fim da rotação.

                    contexto.restore();

                    //contexto.fillStyle = this.cor;
                    //contexto.fillRect(this.x, this.y, this.largura, this.altura);
                },
            };

            //Objeto para os obstáculos.
            var obstaculos = {

                //Array para os obstáculos.
                _obs: [],
                scored: false,
                _sprites: [thinBamboo, smallBamboo, mediumBamboo, largeBamboo],

                tempoInsere: 0,

                //Inserir um obstaculo, aleatóriamente.
                insere: function(){

                    this._obs.push({

                        x: LARGURA,
                        y: chao.y - Math.floor(40 + Math.random()*80),

                        //largura: 30 + Math.floor(21 * Math.random()),
                        largura: 50,

                        sprite: this._sprites[Math.floor(this._sprites.length * Math.random())]
                    });

                    this.tempoInsere = 30 + Math.floor(31 * Math.random());
                },

                //Atualiza o obstaculo.
                atualiza: function(){

                    if(this.tempoInsere == 0){

                        this.insere();
                    }

                    else{

                        this.tempoInsere--;
                    }

                    for(var f = 0, tam = this._obs.length; f < tam; f++){

                        var obs = this._obs[f];

                        obs.x -= velocidade;
                        
                        //Game over.
                        if(!bloco.colidindo && obs.x <= bloco.x + bloco.largura && bloco.x <= obs.x + obs.largura && obs.y <= bloco.y+bloco.altura){

                            bloco.colidindo = true;
                           
                            setTimeout(function(){
                                bloco.colidindo = false;
                            }, 500);

                            if(bloco.vidas >= 1){
                                bloco.vidas--
                            }else{
                                estadoAtual = estados.perdeu;
                            }

                        }
                        
                        //Pontuar
                        else if(obs.x <= 0 && !obs.scored){
                            obs.scored = true;
                            bloco.score++;

                            if(nivelAtual < pontosNivel.length && bloco.score == pontosNivel[nivelAtual]){
                                levelUp();
                            }
                        }

                        else if(obs.x <= -obs.largura){

                            this._obs.splice(f, 1);

                            tam--;
                            f--;
                        }
                    }
                },
                
                //Limpa os obstaculos.
                limpa: function(){

                    this._obs = [];
                },
                
                //Desenha os obstáculos.
                desenha: function(){

                    for(var f = 0, tam = this._obs.length; f < tam; f++){

                        var obs = this._obs[f];

                        obs.sprite.desenha(obs.x,obs.y);
                    }
                },

            };

            //Verificação do clique.
            function clique(event){

                if(estadoAtual == estados.jogando){

                    bloco.pula();
                }

                else if(estadoAtual == estados.jogar){

                    estadoAtual = estados.jogando;
                }

                //Game over.
                else if(estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA){

                    estadoAtual = estados.jogar;
                    obstaculos.limpa();
                    bloco.reset();
                }
            }

            //Passar o nivel.

            function levelUp(){
                velocidade++;
                nivelAtual++;

                if(nivelAtual >= 4){
                    bloco.gravidade *= 0.95;
                }

                if(nivelAtual > 3){
                    bloco.vidas++;
                }                   

                txtNivel.texto = "Level "+ nivelAtual;
                txtNivel.fadeIn(0.4);

                setTimeout(function(){
                    txtNivel.fadeOut(0.4);
                }, 800);
                
            }

            //Main.
            function main(){
                
                ALTURA = window.innerHeight;
                LARGURA = window.innerWidth;
                
                if(LARGURA >= 500){

                    LARGURA = 800;
                    ALTURA = 600;
                }

                //Cria o canvas.
                canvas = document.createElement("canvas");
                canvas.width = LARGURA;
                canvas.height = ALTURA;
                canvas.style.border = "1px solid #000"

                contexto = canvas.getContext("2d");

                document.getElementById("canvasId").appendChild(canvas);  

                //Leitor de evento.
                document.addEventListener("mousedown",clique);

                estadoAtual = estados.jogar;
                
                //Pega a pontuação mais alta.
                record = localStorage.getItem("record");

                if(record == null){

                    record = 0;
                }

                img = new Image();
                img.src = "../image/jumpSprite.png";
                
                roda();
            }

            //Loop do jogo
            function roda(){
                
                //Atualiza o jogo constantemente.
                atualiza();
                //Desenha o jogo constantemente.
                desenha();

                window.requestAnimationFrame(roda);
            }

            //Atualizar o status do jogo.
            function atualiza(){

                if(estadoAtual == estados.jogando){

                    obstaculos.atualiza();
                }

                chao.atualiza();
                bloco.atualiza();

            }

            //Desenha o jogo.
            function desenha(){
                //desenho do cenario.
                //Antigo: contexto.fillStyle = "#80daff";
                //Antigo: contexto.fillRect(0, 0, LARGURA, ALTURA);

            
                spriteCenario.desenha(0,0);
            
                
                contexto.fillStyle = "#fff";
                //Configurações de fonte
                tamFont = 50;
                fonte = "px Brush Script MT";
                fontCfg = tamFont+fonte;
                contexto.font = fontCfg;
                contexto.strokeStyle = "black";
                contexto.lineWidth = 1;

                contexto.fillText(bloco.score, 30, 68);
                contexto.strokeText(bloco.score, 30, 68);
                contexto.fillText("Vidas: "+bloco.vidas, 630, 68);
                contexto.strokeText("Vidas: "+bloco.vidas, 630, 68);

                tamFont = 72;
                contexto.font = tamFont+fonte; 
                contexto.fillStyle = "rgba(150, 0, 0, "+ txtNivel.opacidade +")";
                contexto.fillText(txtNivel.texto, canvas.width / 2 - contexto.measureText(txtNivel.texto).width/2, canvas.height/3);
                contexto.strokeStyle = "rgba(0, 0, 0, "+ txtNivel.opacidade +")";
                contexto.strokeText(txtNivel.texto, canvas.width / 2 - contexto.measureText(txtNivel.texto).width/2, canvas.height/3);
                
                if(estadoAtual == estados.jogando){
                    obstaculos.desenha();
                }

                chao.desenha();
                bloco.desenha();

                if(estadoAtual == estados.jogar){
                    spriteJogar.desenha(LARGURA/2 - (spriteJogar.largura / 2), ALTURA/2 - (spriteJogar.altura/2));
                }     
                
                if(estadoAtual == estados.perdeu){
                    spritePerdeu.desenha(LARGURA/2 - (spritePerdeu.largura / 2), ALTURA/2 - (spritePerdeu.altura/2) - (spriteRecord.altura/2))
                    spriteRecord.desenha(LARGURA / 2 - (spriteRecord.largura/2 ), ALTURA / 2 + (spritePerdeu.altura / 2 - spriteRecord.altura - 25))

                    contexto.fillStyle = "#fff";
                    contexto.fillText(bloco.score, 440, 345);

                    if(bloco.score > record){
                        contexto.fillText(bloco.score, 440, 440);
                        spriteNovo.desenha(LARGURA/2 - 145, ALTURA/2 - 45);
                    }
                    else{
                        contexto.fillText(record, 440, 440);
                    }
                }

               
            }

            //inicializa o jogo
            main();
