'use strict';
function startGame(tRexGameRunner)
{
    //
    //      DISTANCE
    //      WIDTH
    //      VELOCITY
    //
    //      UP
    //      Down
    //
    var perceptron = new Architect.Perceptron(3,20,20,2);
    var learningRate = 0.03;

    var keyEvent = {
        JUMP: 38,
        DUCK: 40
    };

    var jumpDragon = function()
    {
        console.log("UP");
        tRexGameRunner.onKeyDown({
            keyCode: keyEvent.JUMP,
            type: 'touchstart'
        });
        tRexGameRunner.onKeyUp({
            keyCode: keyEvent.JUMP,
            type: 'touchend'
        });
    };

    var duckDragon = function()
    {
        console.log("DOWN");
        tRexGameRunner.onKeyDown({
            keyCode: keyEvent.DUCK,
            type: 'touchstart'
        });
        tRexGameRunner.onKeyUp({
            keyCode: keyEvent.DUCK,
            type: 'touchend'
        });
    };

    var LastParams = [0,0,1];
    var LastRealParams = [0,0,1];
    var updateGame = function()
    {
        if (tRexGameRunner.crashed)
        {
            {
                var deltaFactor = ((LastParams[1]/LastParams[2]) * 10);

                if (tRexGameRunner.tRex.jumpVelocity > 0 || tRexGameRunner.tRex.jumping)
                {
                    perceptron.activate(LastParams);
                    perceptron.propagate(learningRate, [0, 1]);// Treina a rede para ensiná-la que você deveria ter esperado mais tempo.

                    //Tenta pular um pouco mais próximo
                    LastRealParams[0] = LastRealParams[0] + deltaFactor;
                    perceptron.activate(LastRealParams);
                    perceptron.propagate(learningRate, [1, 0]);// Treina a rede para ensiná-la que você deveria ter pulado mais cedo.

                    console.log(":foot: " + deltaFactor);
                }
                else
                {
                    perceptron.activate(LastParams);

                    //Tenta pular de uma determinada distância
                    LastParams[0] = LastParams[0] + deltaFactor;
                    perceptron.activate(LastParams);
                    perceptron.propagate(learningRate, [1, 0]);

                    console.log(":face: " + deltaFactor);
                }
            }
            
            // Mostra as coisas importantes na tela
            var distance = tRexGameRunner.distanceRan;
            console.log("[GAME]:\tSCORE: " + distance)

            // Reinicia o jogo
            tRexGameRunner.restart();
        }

        if (tRexGameRunner.runningTime > tRexGameRunner.config.CLEAR_TIME)
        {
            var obstacle = tRexGameRunner.horizon.obstacles[0];

            var params = [];
            params.push(obstacle.xPos);//Posição
            params.push(obstacle.size);//Tamanho
            params.push(Math.round(tRexGameRunner.currentSpeed * 10));
            
            var output = perceptron.activate(params);
            var confidence = output[0] - output[1] - 0.01;//Bias do peso

            if (confidence > 0)// Pula, caso a rede se sinta segura
            {
                // Pula sem parar
                if (!tRexGameRunner.tRex.jumping)
                {
                    jumpDragon();
                    LastParams = params;
                }
            }
            else
            {
                if (tRexGameRunner.tRex.jumping)
                {
                    duckDragon();
                    LastParams = params;
                }
            }
            LastRealParams = params;
        }
        // Configura o jogo para atualizar a tela a cada 50ms, ou então, 20 frames por segundo
        setTimeout(updateGame, 50);
    };

    // Inicia o jogo
    updateGame();
};
