
        window.onload = function(){

            //Pegando o canvas.
            var tabuleiro = document.getElementById("tabuleiro");

            //Pegando o contexto do canvas.
            var contxt = tabuleiro.getContext("2d");

            //Aguarda um evento, keydown no caso, ele ativa a função keyPush.
            document.addEventListener("keydown",keyPush);

            //Intervalo de chamada da função jogo (60ms).
            setInterval(jogo, 80);

            //Velocidade constante.
            const vel = 1;

            //Velocidades X e Y.
            var velX = 0, velY = 0;

            //Ponto X(cabeça da snake) e ponto Y.
            var ptX = ptY = 10;

            //Largura de peças(quadrado).
            var larP = 30;

            //Quantidade de peças.
            var qtdP = 20;

            //Primeiro ponto da maça.
            var macaX=macaY=15;

            var snake = [];
            
            var tail = 5;

            function jogo(){

                ptX += velX;
                ptY += velY;

                if(ptX < 0){
                    ptX = qtdP-1;
                }

                if (ptX > qtdP-1){
                    ptX = 0;
                }

                if (ptY < 0){
                    ptY = qtdP-1;
                }

                if (ptY > qtdP-1){
                    ptY = 0;
                }
                
                //Desenha o tabuleiro.
                contxt.fillStyle = "#82D968";
                contxt.fillRect(0,0, tabuleiro.width, tabuleiro.height);

                //Desenha a maça.
                contxt.fillStyle = "red";
                contxt.fillRect(macaX*larP,macaY*larP, larP, larP);

                //Desenha a snake.
                contxt.fillStyle = "#FFCF01";
                for(var cc = 0; cc < snake.length; cc++){
                    contxt.fillRect(snake[cc].x*larP,snake[cc].y*larP,larP-1,larP-1);
    

                    //Snake se encosta(gameover).
                    if(snake[cc].x == ptX && snake[cc].y == ptY){
                        velX = velY = 0;
                        tail = 5;
                    }
                }

                snake.push({x:ptX,y:ptY});
                while(snake.length > tail){
                    snake.shift();
                }

                //Pegando a maça.
                if(macaX == ptX && macaY == ptY){
                    tail++;
                    macaX = Math.floor(Math.random()*qtdP);
                    macaY = Math.floor(Math.random()*qtdP);
                }
            }

            function keyPush(event){
                switch(event.keyCode){
                    case 37: //Left
                        velX = -vel;
                        velY = 0;
                        break;
                    case 38: //Up
                        velX = 0;
                        velY = -vel;
                        break;
                    case 39: //Right
                        velX = vel;
                        velY = 0;
                        break;
                    case 40: //Down
                        velX = 0;
                        velY = vel;
                        break;
                    default:
                        break;
                }
            }
        }
