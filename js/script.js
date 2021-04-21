
function pageLoaded() {

    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    var bg, playerLoad, playerSendS, playerSendL, playerWatering, playerVide, playerProtect, botsLoad, botsSendS, botsSendL, botsWatering, botsVide, botsProtect, sendBtn, loadBtn, protectBtn, player, bots="";
    
    // time
    var timeInitial = new Date().getTime();
    var timeUpdate="";

    var newround = false;
    var animationdone = true;
    var nameplayer="Player";
    var botsPoint=0;
    var playerPoint=0;
    var currentPartie=1;
    var saveDonne =false;
    var nbGame ="";

    //initGame();
    initObject();
    initPlayer();

    var save = localStorage.getItem("save");
    console.log(save);
    if(save){
        updateScore();
        document.getElementById('resume').classList.remove("displaynone");
        document.querySelector('#namePlayerResume').innerHTML = nameplayer;
        document.querySelector('#pointsPlayerResume').innerHTML = playerPoint;
        document.querySelector('#pointsBotsendResume').innerHTML = botsPoint;
        document.querySelector('#totalPartiesBotsResume').innerHTML = nbGame;
        document.querySelector('#totalPartiesPlayerResume').innerHTML = nbGame;
    }else{
        document.getElementById('form').classList.remove("displaynone");
    }


    document.getElementById('playForm').addEventListener('click', function (){
        document.getElementById('rules').classList.remove("displaynone");
        document.getElementById('form').classList.add('displaynone');
        nameplayer = document.getElementById('nameplayer').value;
        document.querySelector('#infoPlayer').querySelector('h3').innerHTML = nameplayer;
        document.querySelector('#infoPlayer').querySelector('h2').innerHTML = 0;
        document.querySelector('#infoBots').querySelector('h2').innerHTML = 0;
        nbGame = document.getElementById('nbparties').value;
        document.querySelector('#nbPartie').innerHTML = nbGame;
        document.querySelector('#currentPartie').innerHTML = 1; 
    });

    document.getElementById('playResume').addEventListener('click', function(){
        document.getElementById('resume').classList.add('displaynone');
        updateScore();
        //interface
        document.querySelector('#infoPlayer').querySelector('h3').innerHTML = nameplayer;
        document.querySelector('#infoPlayer').querySelector('h2').innerHTML = playerPoint;
        document.querySelector('#infoBots').querySelector('h2').innerHTML = botsPoint;
        document.querySelector('#nbPartie').innerHTML = nbGame;
        document.querySelector('#currentPartie').innerHTML = currentPartie; 
         
    });


    document.getElementById('playNew').addEventListener('click', function(){
        document.getElementById('resume').classList.add('displaynone');
        document.getElementById('form').classList.remove('displaynone');
    });

    document.getElementById('playRules').addEventListener('click', function(){
        document.getElementById('rules').classList.add("displaynone");
    });

    document.getElementById('replay').addEventListener('click', function(){
        document.getElementById('info').classList.add('displaynone');
        currentPartie++;
        document.querySelector('#currentPartie').innerHTML = currentPartie; 
        initObject();
        initPlayer();
    });

    document.getElementById('replayform').addEventListener('click', function(){
        document.getElementById('end').classList.add('displaynone');
        document.getElementById('info').classList.add('displaynone');
        initGame();
        initObject();
        initPlayer();
    });

    window.requestAnimationFrame(game);


    // function  Objects
    function Bouton(id, use){
        this.id= id;
        this.show=use;
    }

    function Sprites(link, widthImage, heightImage, nbFrame, widthFrame){
        this.image= new Image;
        this.image.src=link;
        this.wimg=widthImage;
        this.himg=heightImage;
        this.frame=nbFrame;
        this.wframe=widthFrame;
        this.crtframe=0;         
    }

    function PlayerGame(){
        this.water= false;
        this.play="vide";
        this.win=false;
        this.animation="vide";
    }


    
 // function

    function game(){

        timeUpdate = new Date().getTime();

        if (timeUpdate - timeInitial > 400) {

            if(bg.crtframe==bg.wimg){
                bg.crtframe=0;
                context.drawImage(bg.image, bg.crtframe, 0, bg.wframe, bg.himg, 0, 0, bg.wframe, bg.himg);      
           }else{  
                bg.crtframe+=bg.wframe;  
                context.drawImage(bg.image, bg.crtframe, 0, bg.wframe, bg.himg, 0, 0, bg.wframe, bg.himg); 
           }

            if(!newround){
                sendBtn.id.addEventListener('click', playerAttack);
                loadBtn.id.addEventListener('click', playerAttack);
                protectBtn.id.addEventListener('click', playerAttack);
            }else{
                sendBtn.id.removeEventListener("click", playerAttack);
                loadBtn.id.removeEventListener("click", playerAttack);
                protectBtn.id.removeEventListener("click", playerAttack);
            }
    
            drawAnimation();
            showButtons();
            

            if(player.win||bots.win)endAnimation();

        timeInitial=timeUpdate; 
        
        }
        
        window.requestAnimationFrame(game);  
    }

    function initObject (){
        bg = new Sprites("./images/sprites/sprites-bg.png", 2700, 500, 3, 900);
       // playerSprites = new Sprites("./images/sprites/sprites-player.png", 976, 500, 6, 163);
        playerLoad = new Sprites("./images/sprites/player-load.png", 3600, 500, 4, 900);
        playerSendS = new Sprites("./images/sprites/player-send-small.png", 6300, 500, 7, 900);
        playerSendL = new Sprites("./images/sprites/player-send-big.png", 6300, 500, 7, 900);
        playerWatering = new Sprites("./images/sprites/player-watering.png", 5400, 500, 7, 900);
        playerVide = new Sprites("./images/sprites/player-vide.png", 900, 500, 1, 900);
        playerProtect = new Sprites("./images/sprites/player-protect.png", 900, 500, 1, 900);
        //botsSprites = new Sprites("./images/sprites/sprites-bots.png", 976, 500, 6, 163);
        botsLoad = new Sprites("./images/sprites/bots-load.png", 3600, 500, 4, 900);
        botsSendS = new Sprites("./images/sprites/bots-send-small.png", 6300, 500, 7, 900);
        botsSendL = new Sprites("./images/sprites/bots-send-big.png", 6300, 500, 7, 900);
        botsWatering = new Sprites("./images/sprites/bots-watering.png", 5400, 500, 7, 900);
        botsVide = new Sprites("./images/sprites/bots-vide.png", 900, 500, 1, 900);
        botsProtect = new Sprites("./images/sprites/bots-protect.png", 900, 500, 1, 900);
        sendBtn = new Bouton(document.getElementById("sends"), false);
        loadBtn = new Bouton(document.getElementById("load"), false);
        protectBtn = new Bouton(document.getElementById("protect"), false);
    }


    function playerAttack(){
        saveDonne = true; 
        initObject();
        animationdone = false;
        newround=true;
        player.play=this.id;
        round();
        addScore();
    }

    function botsAttack(){
        if(bots.play=="load")bots.water=true;
        if(bots.play=="sends")bots.water=false;

        if(bots.water){
            option = ['sends','protect'];
        }else{
            option = ['load', 'protect'];
        }

        bots.play = option[getRandomInt(option.length)];
        bots.animation=bots.play;
    }

    function round(){
        botsAttack();
        if(player.play=="sends" && bots.play=="sends"){
            player.animation="sendl";
            bots.animation="sendl";
        }else if(bots.play=="sends" && player.play!="protect"){
            bots.animation="sendl";
            player.animation="watering";
            bots.win=true;
        }else if (player.play=="sends" && bots.play!="protect"){
            player.animation="sendl";
            bots.animation="watering";
            player.win=true;
        }else{
            player.animation = player.play;
            bots.animation = bots.play; 
        }   
    }

    function initPlayer(){
        player = new PlayerGame();
        bots = new PlayerGame();
    }

    function initGame(){
        timeInitial = new Date().getTime();
        timeUpdate="";
        newround = false;
        animationdone = true;
        nameplayer="Player";
        botsPoint=0;
        playerPoint=0;
        currentPartie=1;
        document.getElementById('form').classList.remove('displaynone');
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    function showPopup(text){
        document.getElementById('info').classList.remove('displaynone');
        document.querySelector('#info').querySelector('p').innerHTML = text;
    }

    function drawAnimation(){

        switch (player.animation) {
            case "load":
                drawImage(playerLoad);
                player.water=true;
                break;
            case "sends":
                drawImage(playerSendS);
                player.water=false;
                break;
            case "sendl":
                drawImage(playerSendL);
                player.water=false;
                break;
            case "watering":
                drawImage(playerWatering);
                break;
            case "protect":
                drawImage(playerProtect);
                break;
            case "vide":
                drawImage(playerVide);
        }


        switch (bots.animation) {
            case "load":
                drawImage(botsLoad);
                bots.water=true;
                break;
            case "sends":
                drawImage(botsSendS);
                bots.water=false;
                break;
            case "sendl":
                drawImage(botsSendL);
                bots.water=false;
                break;
            case "watering":
                drawImage(botsWatering);
                break;
            case "protect":
                drawImage(botsProtect);
                break;
            case "vide":
                drawImage(botsVide);
            }
    }

    function drawImage(img){
            if(img.crtframe==img.wimg){
                fixeimg=img.wimg-900;
                context.drawImage(img.image, fixeimg, 0, img.wframe, img.himg, 0, 0, img.wframe, img.himg);   
                newround=false;  
                animationdone=true;
           }else{  
                img.crtframe+=img.wframe;  
                context.drawImage(img.image, img.crtframe, 0, img.wframe, img.himg, 0, 0, img.wframe, img.himg); 
           }        
    }

    function showButtons(){
        loadBtn.id.classList.remove('filtergray');
        sendBtn.id.classList.remove('filtergray');
        if(player.water){
            loadBtn.id.removeEventListener("click", playerAttack);
            sendBtn.id.addEventListener("click", playerAttack);
            loadBtn.id.classList.add('filtergray');
        }else{
            sendBtn.id.removeEventListener("click", playerAttack);
            loadBtn.id.addEventListener("click", playerAttack);
            sendBtn.id.classList.add('filtergray');
        }
    }

    function endAnimation(){
        if(animationdone){
            if(player.win){
                text="You win";
                playerPoint++;
                document.querySelector('#infoPlayer').querySelector('h2').innerHTML = playerPoint; 
                player.win=false;
            }
            else {
                text="You lost";
                botsPoint++;
                document.querySelector('#infoBots').querySelector('h2').innerHTML = botsPoint; 
                bots.win=false;
            }
            showPopup(text);
            updateGame();
        }
    }


    function updateGame(){
        var textend = "";
        if(currentPartie==nbGame){
            document.getElementById('end').classList.remove('displaynone');
            document.querySelector('#namePlayerend').innerHTML = nameplayer; 
            document.querySelector('#pointsPlayerend').innerHTML = playerPoint; 
            document.querySelector('#pointsBotsend').innerHTML = botsPoint; 

            if(playerPoint==botsPoint)textend="Equality! Replay a new game!";
            else if(playerPoint<botsPoint)textend="You lost! Replay a new game!";
            else textend="You win! Congratulations! Replay a new game!";

            document.querySelector('#textEnd').innerHTML = textend; 
            initGame();
            initObject();
            initPlayer();
            document.querySelector('#infoPlayer').querySelector('h2').innerHTML = 0; 
            document.querySelector('#infoBots').querySelector('h2').innerHTML = 0; 
            document.querySelector('#currentPartie').innerHTML = 0; 
            document.querySelector('#nbPartie').innerHTML = 0; 
            saveDonne =false;   
        }
    }

    function addScore(){
        console.log(nbGame);
        var playerSauv = {
            "name": nameplayer, 
            "water":player.water, 
            "play":player.play, 
            "animation":player.animation,
            "win": player.win,
            "numberwin":playerPoint,
            "currentPartie":currentPartie,
            "nbGame":nbGame,
        };
        
        var botsSauv = {
            "name": "Bots", 
            "water":bots.water, 
            "play":bots.play, 
            "animation":bots.animation,
            "win": bots.win,
            "numberwin":botsPoint,
        };

        
            // Store
            localStorage.setItem('playerSauv', JSON.stringify(playerSauv));
            localStorage.setItem('botsSauv', JSON.stringify(botsSauv));
            localStorage.setItem('save', saveDonne);
            
            // Retrieve
           
         
    }

   function updateScore(){
    var donneesPlayer = localStorage.getItem("playerSauv");
    var donneesBots = localStorage.getItem("botsSauv");

    donneesPlayer=JSON.parse(donneesPlayer);

    nameplayer=donneesPlayer.name;
    player.water= donneesPlayer.water;
    player.play=donneesPlayer.play;
    player.animation=donneesPlayer.animation;
    player.win=donneesPlayer.win;
    playerPoint=donneesPlayer.numberwin;
    saveDonne=donneesPlayer.saveDonne;
    currentPartie=donneesPlayer.currentPartie;
    nbGame=donneesPlayer.nbGame;

    console.log(playerPoint);

    donneesBots=JSON.parse(donneesBots);

    bots.water= donneesBots.water;
    bots.play=donneesBots.play;
    bots.animation=donneesBots.animation;
    bots.win=donneesBots.win;
    botsPoint=donneesBots.numberwin;
    }

}

