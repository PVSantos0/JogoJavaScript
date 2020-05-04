var h = 0
var w = 0
var life = 1
var time = 10
var spwanMobTime = 1500

//iniciar o jogo
//olhar no html index


//Nivel de jogo
var levelGame = window.location.search
levelGame.replace('?', '')

if(levelGame.replace('?', '') === 'normal'){
    spwanMobTime = 1500
} else if (levelGame.replace('?', '') === 'hard'){
    spwanMobTime = 1000
}else if (levelGame.replace('?', '') === 'veryHard'){
    spwanMobTime = 750
}

//criar mobs
var spawnMob = setInterval(function(){
    posRandon()
} , spwanMobTime)

//tamanho da tela
function screenGame(){
    h = window.innerHeight
    w = window.innerWidth
}

screenGame()

//Conometro do jogo
document.getElementById('gameTime').innerHTML = time

var timeInGame = setInterval(function(){
    time -= 1

    if(time < 0){
        clearInterval(timeInGame)
        clearInterval(spawnMob)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('gameTime').innerHTML = time
    }
},1000)

function posRandon(){
    //remover mosquito caso exista
    if(document.getElementById('mob')){
        document.getElementById('mob').remove()

        //remover vida
        if (life > 3){
            window.location.href = 'gameover.html'
        }else{
            document.getElementById('l'+ life).src='imgs/coracao_vazio.png'
            life++
        }
    }

    //posisionamento randamico
    var posX = Math.floor(Math.random() * w - 90) 
    var posY = Math.floor(Math.random() * h - 90) 
    
    //para não dar problema se posição for 0
    posX = posX < 0 ? 0 : posX
    posY = posY < 0 ? 0 : posY

    //criar elemento html (mob)
    var mob = document.createElement('img')
    mob.src = 'imgs/mosquito.png'
    mob.className = sizeRandon() + ' ' + mirror()
    mob.style.left = posX + "px"
    mob.style.top = posY + "px"
    mob.style.position = 'absolute'
    mob.id = 'mob'
    mob.onclick = function() {
        this.remove()
    }
    document.body.appendChild(mob)

}

//clicar o mob
function hit() {
    this.remove()
}


//tananho randamico
function sizeRandon() {
    var sizeMob = Math.floor(Math.random() * 3)

    switch(sizeMob){
        case 0:
            return 'mod1'

        case 1:
            return 'mod2'

        case 2:
            return 'mod3'

    }
}

//Fazer mosquito virar de lado de forma randomica
function mirror() {
    var sideMob = Math.floor(Math.random() * 2)

    switch(sideMob){
        case 0:
            return 'sideA'

        case 1:
            return 'sideB'
    }
}
