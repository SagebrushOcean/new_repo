//рестарт
const main = document.querySelector('div');
const fileSave = main.innerHTML;
document.getElementById('restart-button').addEventListener('click', function(event) {
    main.innerHTML = fileSave;
    executeAll();
});

executeAll();

function executeAll(){

function noNegative(num) {
    if (num > 0) return num;
    return 0;
}

const bottom = document.querySelector('.scroll-bottom');
const bottomText = document.getElementById('text');
function addBottomText(text){
    bottomText.innerHTML += text+'<br>';
    bottom.scrollIntoView({
        behavior: 'smooth' || 'auto',
        block: 'end',
    });
}

//глобальный словарь с моими базовыми характеристиками
const myStats = {currentHealth: 24, maxHealth: 24, strength: 10, defense: 6, level: 1};
const myHealth = document.getElementById('health');
const myMaxHealth = document.getElementById('max-health');
const myStrength = document.getElementById('strength');
const myDefense = document.getElementById('defense');
const myLevel = document.getElementById('level');
//предметы
const items = {
    chest1: {name: 'Список задач!', pic: '../static/img/items/75.png', invID: 'task-list', text: 'Теперь вы можете посмотреть свои задачи, кликнув на иконку списка в инвентаре.'},
    chest2: {name: 'Исцеляющее зелье!', pic: '../static/img/items/76.png', invID: 'heal2', text: 'Позволяет полностью восстановить здоровье. Кликните по иконке зелья в инвентаре, чтобы использовать.'},
    stick_button: {name: 'Новый метод атаки - ветка!', pic: '../static/img/items/80.png', invID: 'stick', text: '+4 к силе атаки'},
    chest3: {name: 'Новый метод защиты - щит!', pic: '../static/img/items/83.png', invID: 'shield', text: '+8 к защите'},
    chest4: {name: 'Горсть монет!', pic: '../static/img/items/82.png', invID: 'money', text: 'Теперь у вас есть опция "заплатить"'},
    chest5: {name: 'Исцеляющее зелье!', pic: '../static/img/items/76.png', invID: 'heal3', text: 'Позволяет полностью восстановить здоровье. Кликните по иконке зелья в инвентаре, чтобы использовать.'},
    chest6: {name: 'Исцеляющее зелье!', pic: '../static/img/items/76.png', invID: 'heal4', text: 'Позволяет полностью восстановить здоровье. Кликните по иконке зелья в инвентаре, чтобы использовать.'},
    sword_button: {name: 'Новый метод атаки - меч!', pic: '../static/img/items/78.png', invID: 'sword', text: '+10 к силе атаки'},
    chest7: {name: 'Исцеляющее зелье!', pic: '../static/img/items/76.png', invID: 'heal4', text: 'Позволяет полностью восстановить здоровье. Кликните по иконке зелья в инвентаре, чтобы использовать.'},
    cabbage_stall: {name: 'Кочан капусты!', pic: '../static/img/items/84.png', invID: 'cabbage', text: '-100 очков репутации'},
    chest8: {name: 'Таинственный ключ!', pic: '../static/img/items/79.png', invID: 'key', text: 'Осталось только понять, что он открывает.'},
    final_chest: {name: 'Гору капусты!', pic: '../static/img/items/85.png', invID: 'more-cabbage', text: 'Похоже, весь сундук был забит кочанами с капустой. К счастью, вы точно знаете, что с ней делать.'}
}
let currentItem;
let currentQuestion;
//глобальный словарь с врагами и инфой о них
const enemies = {
    enemy1: {currentHealth: 24, defaultHealth: 24, strength: 12, defense: 6, pic: '../static/img/battle/enemy1_.png', text: 'Но, возможно, сначала вам стоит восстановить здоровье или найти какое-нибудь оружие.'},
    enemy2: {currentHealth: 32, defaultHealth: 32, strength: 20, defense: 14, pic: '../static/img/battle/enemy2.png', text: 'Но, возможно, сначала вам стоит найти какое-нибудь оружие или повысить свой уровень.'},
    enemy3: {currentHealth: 56, defaultHealth: 56, strength: 44, defense: 38, pic: '../static/img/battle/enemy3.png', text: 'Но, возможно, сначала вам стоит восстановить здоровье или найти оружие получше.'},
    enemy4: {currentHealth: 40, defaultHealth: 40, strength: 28, defense: 22, pic: '../static/img/battle/enemy4_.png', text: 'Но, возможно, сначала вам стоит восстановить здоровье.'},
    final_boss: {currentHealth: 60, defaultHealth: 60, strength: 50, defense: 44, pic: '../static/img/battle/dragon_.png', text: 'Однако вы не уверены, что победить дракона в честном сражении вообще возможно.'}
}
let currentEnemy;
let isWon;
const loseText = 'Ваше здоровье достигло нуля, после чего вы были вынуждены с позором ретироваться.<br>Вы поклялись вернуться и отомстить.<br>';
const winText = 'Вы получаете новый уровень:<br>+4 к максимуму здоровья,<br>+4 к силе атаки,<br>+4 к защите.';
const winText2 ='Вы предлагаете дракону кочан капусты.<br>Он принимает ваше подношение, после чего куда-то улетает.<br>Вы решаете считать это победой и торжественно повышаете свой уровень сразу до десятого:<br>+8 к максимуму здоровья,<br>+8 к силе атаки,<br>+8 к защите.';
//восстановление здоровья
let currentHeal;
let healthBoost = 4;
function addHealth() {
    if (myStats.currentHealth < myStats.maxHealth){
        myStats.currentHealth += healthBoost;
        if (myStats.currentHealth > myStats.maxHealth) myStats.currentHealth = myStats.maxHealth;
        myHealth.textContent = myStats.currentHealth;
    }
}
function useHeal(healID) {
    //showNotification('Ваше здоровье полностью восстановленно.')
    addBottomText('Ваше здоровье полностью восстанавливается.');
    myStats.currentHealth = myStats.maxHealth;
    myHealth.textContent = myStats.currentHealth;
    document.getElementById(healID).classList.toggle('hide');
}

//--------------------КАРТЫ---------------------
function createMapLink(mapA, mapB, textAB, textBA) {
    document.getElementById(mapA+'-'+mapB).addEventListener('click', function(event) {
        changeMaps(mapA, mapB, textAB);
    });
    document.getElementById(mapB+'-'+mapA).addEventListener('click', function(event) {
        changeMaps(mapA, mapB, textBA);
    });
}
function changeMaps(mapA, mapB, text) {
    document.getElementById(mapA).classList.toggle('hide');
    document.getElementById(mapB).classList.toggle('hide');
    addHealth();
    addBottomText('Вы перемещаетесь '+text);
}
createMapLink('map1', 'map2', 'налево в лес.', 'обратно на распутье.');
createMapLink('map1', 'map3', 'направо в лес.', 'обратно на распутье.');
createMapLink('map3', 'map4', 'глубже в лес.', 'ближе к распутью.');
createMapLink('map1', 'map6', 'в деревню.', 'обратно на распутье.');
createMapLink('map6', 'map7', 'ко входу в горы.', 'обратно в деревню.');
createMapLink('map7', 'map8', 'в горы.', 'ко входу в горы.');
createMapLink('map8', 'map9', 'в пещеру.', 'ко входу в пещеру.');
createMapLink('map8', 'map10', 'глубже в горы.', 'ко входу в пещеру.');
createMapLink('map6', 'map11', 'ко входу в замок.', 'обратно в деревню.');
createMapLink('map11', 'map12', 'в замок.', 'ко входу в замок.');
createMapLink('map12', 'map13', 'в левую башню.', 'обратно в центральную башню.');
createMapLink('map12', 'map14', 'в правую башню.', 'обратно в центральную башню.');
createMapLink('map14', 'map15', 'в подземелье.', 'в правую башню.');

//--------------------БЛОКИ---------------------
const blocks = {
    block34: {text: 'Вы не можете пройти, пока враг преграждает вам путь.', task: 'task4'},
    block16: {text: 'Похоже, в этой деревне взымается плата за вход. Вы не можете пройти дальше, не заплатив.', task: 'task1'},
    block89: {text: 'Вы не можете войти в пещеру, пока враг охраняет вход.', task: 'task6'},
    block1112: {text: 'Чтобы удостоиться входа в замок, вам нужно иметь уровень не ниже седьмого.', task: 'task5'}
}
for (const block in blocks) {
    document.getElementById(block).addEventListener('click', function(event) {
        showNotification(blocks[block].text);
        document.getElementById(blocks[block].task).classList.remove('hide');
    });
}

////--------------------ХИЛКИ---------------------
const heals = ['heal1', 'heal2', 'heal3', 'heal4'];
for (const heal of heals) {
    document.getElementById(heal).addEventListener('click', function(event) {
        currentHeal = heal;
        showQuestionNotification('Использовать исцеляющее зелье?','heal');
    });
}

////--------------------СУНДУКИ И ПРЕДМЕТЫ---------------------
const chests = ['chest1', 'chest2', 'stick_button', 'chest3', 'chest4', 'chest5', 'chest6', 'sword_button', 'chest8'];//, 'chest7'
for (const chest of chests) {
    document.getElementById(chest).addEventListener('click', function(event) {
        document.getElementById(chest).classList.toggle('hide');
        currentItem = showItemNotification(chest);
        additionalAction(chest);
    });
}
const payButton = document.getElementById('pay-button');
const keyButton = document.getElementById('key-button');
const finalButton = document.getElementById('final-button');
function additionalAction(chestID) {
    switch (chestID) {
        case 'stick_button':
            myStats.strength += 4;
            addBottomText('(+4 к силе атаки)');
            document.getElementById('task2').classList.add('strikethrough');
            break;
        case 'chest3':
            myStats.defense += 8;
            addBottomText('(+8 к защите)');
            break;
        case 'chest4':
            payButton.classList.toggle('hide');
            closeGeneralNotification.classList.toggle('hide');
            document.getElementById('task1').classList.add('strikethrough');
            break;
        case 'sword_button':
            myStats.strength += 10;
            addBottomText('(+10 к силе атаки)');
            break;
        case 'chest8':
            keyButton.classList.toggle('hide');
            document.getElementById('task9').classList.add('strikethrough');
            closeGeneralNotification.classList.toggle('hide');
            cabbageStall.removeEventListener('click', func);
//            cabbageStall.removeEventListener('click', function (event) {
//                showQuestionNotification('Купить капусты?','cabbage1');
//            });
            break;
    }
}
//заплатить
payButton.addEventListener('click', function(event) {
    generalNotification.classList.toggle('md-show');
    document.getElementById('money').classList.toggle('hide');
    document.getElementById('block16').classList.toggle('hide');
    payButton.classList.toggle('hide');
    closeGeneralNotification.classList.toggle('hide');
    showNotification('Отлично, теперь вы можете пройти.')
});
//капуста
const cabbageStall = document.getElementById('cabbage-stall');
function func() {
    showQuestionNotification('Купить капусты?','cabbage1');
}
cabbageStall.addEventListener('click', func);
//cabbageStall.addEventListener('click', function (event) {
//    showQuestionNotification('Купить капусты?','cabbage1');
//});
const cabbageStall2 = document.getElementById('cabbage-stall2');
cabbageStall2.addEventListener('click', function(event) {
    showQuestionNotification('Купить капусты?','cabbage3');
});
//ковёр
const carpet = document.getElementById('carpet');
carpet.addEventListener('click', function(event) {
    showQuestionNotification('Убрать ковер?','carpet');
});
//финальный сундук
const finalChest = document.getElementById('final_chest');
finalChest.addEventListener('click', function(event) {
    showNotification('Похоже, этот сундук заперт. Вы не можете открыть его без ключа.')
    document.getElementById('task9').classList.remove('hide');
});
//использовать ключ
keyButton.addEventListener('click', function(event) {
    generalNotification.classList.toggle('md-show');
    document.getElementById('key').classList.toggle('hide');
    finalChest.classList.toggle('hide');
    currentItem = showItemNotification(finalChest.getAttribute("id"));
    keyButton.classList.toggle('hide');
    closeGeneralNotification.classList.toggle('hide');
//    cabbageStall.removeEventListener('click', function (event) {
//        showQuestionNotification('Купить капусты?','cabbage1');
//    });
    cabbageStall.addEventListener('click', function(event) {
        showQuestionNotification('Отдать капусту продавцу?','cabbage5');
        //showQuestionNotification('Отдать капусту продавцу?','cabbage5');
    });
});

//--------------------УВЕДЫ---------------------
//////уведа о предмете
const itemNotification = document.getElementById('item-notification');
function showItemNotification(item) {
    document.getElementById('notification-img').src = items[item].pic;
    document.getElementById('item-notification-item').textContent = items[item].name
    document.getElementById('item-notification-text').textContent = items[item].text;
    itemNotification.classList.toggle('md-show');
    addBottomText('Вы получаете: "'+items[item].name+'"');
    return items[item].invID;
}
//закрыть уведу о предмете
document.getElementById('close-item-notification').addEventListener('click', function(event) {
    itemNotification.classList.toggle('md-show');
    document.getElementById(currentItem).classList.toggle('hide');
    myStrength.textContent = myStats.strength;
    myDefense.textContent = myStats.defense;
});
//////общая уведа
const generalNotification = document.getElementById('general-notification');
const closeGeneralNotification = document.getElementById('close-general-notification');
function showNotification(text) {
    document.getElementById('general-notification-text').textContent = text;
    //addBottomText(text);
    generalNotification.classList.toggle('md-show');
}
//закрыть общую уведу
closeGeneralNotification.addEventListener('click', function(event) {
    generalNotification.classList.toggle('md-show');
});
///////уведа вопрос
const questionNotification = document.getElementById('question-notification');
function showQuestionNotification(text,code) {
    document.getElementById('question-notification-text').textContent = text;
    currentQuestion = code;
    questionNotification.classList.toggle('md-show');
}
//да
const yesButton = document.getElementById('yes-button');
yesButton.addEventListener('click', function(event) {
    questionNotification.classList.toggle('md-show');
    switch (currentQuestion) {
        case 'heal':
            useHeal(currentHeal);
            break;
        case 'cabbage1':
            showQuestionNotification('Вы уже потратили все деньги, чтобы заплатить за вход в деревню. Украсть капусту?','cabbage2');
            break;
        case 'cabbage2':
            showNotification('Вы не можете этого сделать, пока фермер смотрит.');
            break;
        case 'cabbage3':
            showQuestionNotification('Похоже, продавца нет на месте. Украсть капусту?','cabbage4');
            break;
        case 'cabbage4':
            currentItem = showItemNotification("cabbage_stall");
            showNotification('Вернувшийся продавец замечает, что вы взяли кочан капусты, но не успевает ничего предпринять. Вы оставляете убитого горем продавца капусты и убегаете со своей добычей.');
            cabbageStall.classList.toggle('hide');
            pacifyButton.classList.toggle('hide');
            break;
        case 'cabbage5':
            closeGeneralNotification.classList.toggle('hide');
            finalButton.classList.toggle('hide');
            showNotification('Вы возвращаете продавцу всю капусту, что когда-то была у него украдена вами и драконом. Растроганный продавец не может сдержать слёз. Ваша репутация восстановлена и миссия завершена, вы выиграли!');
            document.getElementById('more-cabbage').classList.toggle('hide');
            break;
        case 'carpet':
            showNotification('Вы обнаруживаете под ковром проход в подземелье.');
            carpet.classList.toggle('hide');
            document.getElementById('map14-map15').classList.toggle('hide');
            break;
    }
});
//закрыть уведу вопрос
document.getElementById('no-button').addEventListener('click', function(event) {
    questionNotification.classList.toggle('md-show');
});
//начать игру
document.getElementById('start-button').addEventListener('click', function(event) {
    document.getElementById('start-screen').classList.toggle('md-show');
});

//--------------------СПИСОК ЗАДАЧ---------------------
const taskManager = document.getElementById('task-manager');
document.getElementById('task-list').addEventListener('click', function(event) {
    taskManager.classList.toggle('md-show');
});
document.getElementById('close-button').addEventListener('click', function(event) {
    taskManager.classList.toggle('md-show');
});

//--------------------ВРАГИ---------------------
const battleDisplay = document.getElementById('battle-display');
const myHealthBar = document.getElementById("my-health-bar");
const enemyHealthBar = document.getElementById("enemy-health-bar");
const enemyImg = document.getElementById('enemy-img');
const myAttack = document.getElementById('my-attack');
const enemyDamage = document.getElementById('enemy-damage');
const enemyAttack = document.getElementById('enemy-attack');
const myDamage = document.getElementById('my-damage');
let currentEnemyDamage;
let myCurrentDamage;
for (const enemy in enemies) {
    document.getElementById(enemy).addEventListener('click', function(event) {
        if (myStats.currentHealth<1) showNotification('Недостаточно здоровья чтобы сражаться!')
        else {
            currentEnemy = enemy;
            enemyImg.src = enemies[currentEnemy].pic;
            if (currentEnemy === 'final_boss') enemyImg.classList.toggle('finale');
            myHealthBar.style.width = myStats.currentHealth/myStats.maxHealth*100 + "%";
            currentEnemyDamage = noNegative(myStats.strength - enemies[currentEnemy].defense);
            myCurrentDamage = noNegative(enemies[currentEnemy].strength - myStats.defense);
            enemyDamage.textContent = '-'+currentEnemyDamage;
            myDamage.textContent = '-'+myCurrentDamage;
            battleDisplay.classList.toggle('md-show');
        }
    });
}

//аттаковать
const bigBlock = document.getElementById('big-block');
const battleContent = battleDisplay.querySelector('div');
const battleTitle = battleContent.querySelector('h1');
const VSscreen = document.getElementById('vs-screen');
const attackButton = document.getElementById('attack-button');
const battleEndText = document.getElementById('battle-end-text');
function yourAttack() {
    addBottomText('Вы атакуете врага на '+currentEnemyDamage+' урона.');
    enemies[currentEnemy].currentHealth -= currentEnemyDamage;
    enemyHealthBar.style.width = enemies[currentEnemy].currentHealth/enemies[currentEnemy].defaultHealth*100 + "%";
    myAttack.classList.remove('animate1');
    if (enemies[currentEnemy].currentHealth>0){
        enemyAttack.classList.toggle('animate1');
        myDamage.classList.toggle('animate2');
        setTimeout(enemiesAttack, 2000);
        setTimeout(() => {myDamage.classList.remove('animate2');}, 3000);
    } else{
        bigBlock.classList.add('hide');
        endFight('Вы победили!', winText, true);
        lvlUp(4, 1);
    }
}
function enemiesAttack() {
    addBottomText('Враг атакует вас в ответ на '+myCurrentDamage+' урона.');
    myStats.currentHealth -= myCurrentDamage;
    myHealthBar.style.width = myStats.currentHealth/myStats.maxHealth*100 + "%";
    if (myStats.currentHealth <= 0) {
        myStats.currentHealth = 0;
        endFight('Вы проиграли!', loseText + enemies[currentEnemy].text, false);
    }
    myHealth.textContent = myStats.currentHealth;
    bigBlock.classList.toggle('hide');
    enemyAttack.classList.remove('animate1');
}

attackButton.addEventListener('click', function(event) {
    bigBlock.classList.toggle('hide');
    myAttack.classList.toggle('animate1');
    enemyDamage.classList.toggle('animate2');
    setTimeout(yourAttack, 1000);
    setTimeout(() => {enemyDamage.classList.remove('animate2');}, 2000);
});
//лвл ап!
function lvlUp(addToAll, addToLvl) {
    myStats.maxHealth += addToAll;
    myStats.strength += addToAll;
    myStats.defense += addToAll;
    myStats.level += addToLvl;
    myMaxHealth.textContent = myStats.maxHealth;
    myStrength.textContent = myStats.strength;
    myDefense.textContent = myStats.defense;
    myLevel.textContent = myStats.level;
}
//закончить бой
function endFight(title, text, forSwitch) {
    battleContent.classList.toggle('you-lost');
    battleTitle.textContent = title;
    addBottomText(title);
    if (text === winText) addBottomText('Вы получаете новый уровень: +4 к максимуму здоровья, +4 к силе атаки, +4 к защите.');
    isWon = forSwitch;
    battleEndText.innerHTML = text;
    VSscreen.classList.toggle('hide');
    battleEndText.classList.toggle('hide');
    close.classList.toggle('hide');
    enemies[currentEnemy].currentHealth = enemies[currentEnemy].defaultHealth;
    enemyHealthBar.style.width = 100 + "%";
}
//отдать капусту
const pacifyButton = document.getElementById('pacify-button');
pacifyButton.addEventListener('click', function(event) {
    endFight('Победа?', winText2, true);
    lvlUp(8, 2);
});

//закрыть окно боя
const close = document.getElementById('close');
close.addEventListener('click', function(event) {
    battleDisplay.classList.toggle('md-show');
    aftermath(isWon);
    VSscreen.classList.toggle('hide');
    battleContent.classList.toggle('you-lost');
    battleEndText.classList.toggle('hide');
    close.classList.toggle('hide');
    battleTitle.textContent = 'Бой!';
});
//последствия битвы
function aftermath(isWon) {
    if (isWon){
        switch (currentEnemy) {
            case 'enemy1':
                if (myStats.level === 3) {
                    showNotification('Вы как следует накостыляли врагу 1 веткой. Не выдержав такого обращения, враг обижается и уходит.')
                    document.getElementById('enemy1').classList.toggle('hide');
                    document.getElementById('task3').classList.add('strikethrough');
                }
                break;
            case 'enemy2':
                document.getElementById('enemy2').classList.toggle('hide');
                document.getElementById('block34').classList.toggle('hide');
                document.getElementById('task4').classList.add('strikethrough');
                break;
            case 'enemy3':
                document.getElementById('enemy3').classList.toggle('hide');
                document.getElementById('block89').classList.toggle('hide');
                cabbageStall.classList.toggle('hide');
                document.getElementById('task6').classList.add('strikethrough');
                break;
            case 'enemy4':
                if (myStats.level === 7) {
                    showNotification('Не выдержав такого количества поражений, враг обижается и уходит.')
                    document.getElementById('enemy4').classList.toggle('hide');
                    document.getElementById('block1112').classList.toggle('hide');
                    document.getElementById('bridge').classList.toggle('hide');
                    document.getElementById('task5').classList.add('strikethrough');
                }
                break;
            case 'final_boss':
                document.getElementById('cabbage').classList.toggle('hide');
                document.getElementById('final_boss').classList.toggle('hide');
                document.getElementById('task8').classList.add('strikethrough');
                break;
        }
    } else{
        switch (currentEnemy) {
            case 'enemy1':
                showNotification('Здоровье восстанавливается само при перемещении между локациями, однако вы можете использовать зелье, чтобы ускорить процесс.')
                document.getElementById('task2').classList.remove('hide');
                break;
            case 'enemy2':
                showNotification('Вы можете повысить свой уровень и улучшить характеристики, побеждая врагов.')
                document.getElementById('task3').classList.remove('hide');
                break;
            case 'final_boss':
                enemyImg.classList.toggle('finale');
                document.getElementById('task8').classList.remove('hide');
                document.getElementById('task7').classList.add('strikethrough');
                break;
        }
    }
}

finalButton.addEventListener('click', function(event) {
    main.innerHTML = fileSave;
    executeAll();
});


}