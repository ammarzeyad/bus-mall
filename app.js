'use strict';
let click = document.getElementById('click');
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let rightImg = document.getElementById('rightImg');
let centerImg = document.getElementById('centerImg');
let result = document.getElementById('results');
let busMallImg =['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maximumAttempts = 25;
let attempt = 1;
let busMall = [];

function BusMall (name){
this.busName = name.split('.')[0];
this.busImg = `img/${name}`;
this.votes=0;
this.views =0;
busMall.push(this);
}

for(let i=0; i <busMallImg.length; i++){
    new BusMall(busMallImg[i]);
}

console.log(busMall);

function randomImage() {
    return Math.floor(Math.random() * busMallImg.length);
}

let leftIndex;
let rightIndex;
let centerIndex;

function renderImg(){

    leftIndex = randomImage();
    
    rightIndex = randomImage();
    
    centerIndex = randomImage();
    
    if(leftIndex === rightIndex){
        leftIndex = randomImage();
       }   else if (rightIndex === centerIndex){
            rightIndex = randomImage();
        }
        else if (centerIndex === leftIndex){
            centerIndex = randomImage();
        }
    leftImg.setAttribute('src', busMall[leftIndex].busImg);
    rightImg.setAttribute('src', busMall[rightIndex].busImg);
    centerImg.setAttribute('src', busMall[centerIndex].busImg);
    busMall[leftIndex].views++;
    busMall[rightIndex].views++;
    busMall[centerIndex].views++;
    }

renderImg();

leftImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);
centerImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maximumAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            busMall[leftIndex].votes++;
        } else if (clickedImage === 'rightImg') {
            busMall[rightIndex].votes++
        }
        else if (clickedImage === 'centerImg'){
            busMall[centerIndex].votes++;
        }
        renderImg();
        console.log(busMall);
        attempt++;
    } else {
        leftImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
        centerImg.removeEventListener('click', clickHandler);
    }
}
click.addEventListener('click', buttonClick);
function buttonClick(){
    if (attempt === maximumAttempts + 1) {
        for (let i = 0; i < busMall.length; i++) {
            let liEl = document.createElement('li');
            result.appendChild(liEl);
            liEl.textContent = `${busMall[i].busName} has ${busMall[i].votes} votes and  ${busMall[i].views} views.`;
        }
        click.removeEventListener('click', buttonClick);
    }
}