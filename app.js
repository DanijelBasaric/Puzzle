const navElement = document.querySelector('.nav')
const mainElement = document.querySelector('main');

const btnOk = document.querySelector('.btn');
// const levelNums = document.getElementsByClassName('levels')
let numOfLevels = 5;
const clickedItems = [];
let cardItem = [];
let firstCard = false;
let secondCard = false;
let cardNum;
let slectedLevel = false;

btnOk.addEventListener('click', () => {
    // x = levelNums.value;
    btnOk.style.visibility = "hidden";
    for (let i = 1; i <= numOfLevels; i++) {
        // console.log(i);
        createLevels(i)
    }
});

console.log(numOfLevels);

//  napraviti navigaciju sa brojem nivoa - numOfLevels

const createLevels = (i) => {
    // let trenutniElement = navElement.children[1]; //!selektovanje ul elementa
    let listItem = document.createElement('li')
    listItem.appendChild(document.createTextNode('Level ' + (i)));
    navElement.children[1].appendChild(listItem);
    listItem.addEventListener('click', () => {
        if (!slectedLevel) {    
            showCards(i);
            slectedLevel = true;
            console.log( listItem.style.color = 'red');
        }
    });
};

const showCards = (i) => {
    // let trenutniElement = mainElement.children[0]
    cardNum = (i + 1) ** 2;
    let cardNums = [];
    for (let j = 1; j <= cardNum; j++) {
        cardNums.push(j)
    }

    shuffle(cardNums)
    // console.log(cardNums);
    // setTimeout(() => {

    cardNums.forEach((element, idx) => {
        // for (let j = 0; j < cardNums.length; j++) {
        cardItem = document.createElement('div');
        cardItem.appendChild(document.createTextNode([element]));

        cardItem.className = (`cardItem cardItem-${idx}`);
        cardItem.addEventListener('click', (event) => {
            swapCard(event);
        });

        cardItem.style.flexBasis = `${100 / (i + 1)}%`;
        cardItem.style.height = `${100 / (i + 1)}%`;
        cardItem.style.fontSize = `${300 / (i + 1)}px`
        mainElement.children[0].appendChild(cardItem);
    });

};


let firstSwapCard;
let scndSwapCard;

const swapCard = (event) => {
    if (!firstCard || !secondCard) {
        let klasa = event.target.className;
        let test = klasa.split(' ');
        let last = test[test.length - 1];
        let selectedCard = document.querySelector(`.${last}`)
        selectedCard.style.backgroundColor = 'red';
        if (!firstCard) {
            firstSwapCard = selectedCard;
            firstCard = true;
            selectedCard = '';
        } else if (!secondCard) {
            scndSwapCard = selectedCard;
            secondCard = true;
            selectedCard = ''
        }
    }

    if (firstCard && secondCard) {
        let temp = firstSwapCard.textContent;
        firstSwapCard.textContent = scndSwapCard.textContent;
        scndSwapCard.textContent = temp;
        firstCard = false;
        secondCard = false;
        firstSwapCard.style.backgroundColor = '';
        scndSwapCard.style.backgroundColor = '';
    }
    check()

};



const check = () => {
    let currentOrderArray = [];
    let wantedOrderArray = [];
    for (i = 1; i <= cardNum; i++) {
        wantedOrderArray.push(i)
    }
    currentOrder = document.querySelectorAll('.cardItem')
    currentOrder.forEach((element) => {
        let convToNum = Number(element.textContent);
        currentOrderArray.push(convToNum);
    });

    if (JSON.stringify(currentOrderArray) === JSON.stringify(wantedOrderArray)) {
        alert(`BRAVOOOO`)                                                           //! ovo prepraviti
        const parent = document.querySelector('.gameSpace');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
            cardItem.style.flexBasis = ``;
            cardItem.style.height = ``;
            cardItem.style.fontSize = ``;
            slectedLevel = false;
        }
    }
}


function shuffle(cardNums) {                                        //! ukradena i prepravljena funkcija
    let currentIndex = cardNums.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [cardNums[currentIndex], cardNums[randomIndex]] = [
            cardNums[randomIndex], cardNums[currentIndex]];
    }
    return cardNums;
}