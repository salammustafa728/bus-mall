'use strict';
let imgeArr=[
  'bag.jpg','banana.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg',
  'scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'
];
const imgeSection = document.getElementById('productImgSec');
const imgeFrist = document.getElementById('fistImgproduct');
const imgeSecond = document.getElementById('secondImgproduct');
const imgeThird = document.getElementById('thirdmgproduct');

const resultSection = document.getElementById('sec_result');
const btnResult = document.getElementById('btn_result');

let imgClikcsNum = 0;
let imgeFristIndex = 0;
let imgeSecondIndex = 0;
let imgeThirdIndex = 0;
let attempsClick=25;

function ProductImge(name){
  this.name=name.split('.')[0];
  this.img=`./img/${name}`;
  // if(name==='sweep.png' || name==='usb.gif'){
  //   this.img = `./img/${name}`;
  // }else{
  //   this.img = `./img/${name}.jpg`;
  // }
  this.imgClikcs = 0;
  this.imgShown = 0;
  ProductImge.all.push(this);
}

ProductImge.all=[];

for(let i = 0; i<imgeArr.length;i++){
  new ProductImge(imgeArr[i]);

}
// console.log(ProductImge.all);

function clickImgHadler(e){

  if(imgClikcsNum<attempsClick){
    if(e.target.id === 'fistImgproduct' ){
      ProductImge.all[imgeFristIndex].imgClikcs++;
    }else if(e.target.id === 'secondImgproduct'){
      ProductImge.all[imgeSecondIndex].imgClikcs++;
    }else if(e.target.id === 'thirdmgproduct'){
      ProductImge.all[imgeThirdIndex].imgClikcs++;
    }

    // console.log(ProductImge.all);
    renderImgeProducr();
    imgClikcsNum++;
  }

  console.log(ProductImge.all);
  console.log(imgClikcsNum);
}

function result(){

  let ulEle = document.createElement('ul');
  resultSection.appendChild(ulEle);

  for(let i=0;i<imgeArr.length;i++){
    let liEle = document.createElement('li');
    ulEle.appendChild(liEle);
    liEle.textContent=ProductImge.all[i].name + ' had a '+ ProductImge.all[i].imgClikcs +' votes and had seen a '+
    ProductImge.all[i].imgShown+' times';
  }
  btnResult.removeEventListener('click',result);
}

btnResult.addEventListener('click',result);

function renderImgeProducr(){
  let imgNum1 = randomImgNum(0,imgeArr.length-1);
  let imgNum2;
  let imgNum3;

  do{
    imgNum2 = randomImgNum(0,imgeArr.length-1);
    imgNum3 = randomImgNum(0,imgeArr.length-1);
  }while(imgNum1===imgNum2 || imgNum2===imgNum3 || imgNum1 === imgNum3);

  if(imgeFristIndex == imgeSecondIndex){
    imgNum1 = randomImgNum(0,imgeArr.length-1);
  }else if(imgeSecondIndex == imgeThirdIndex){
    imgNum2 = randomImgNum(0,imgeArr.length-1);
  }else if(imgeFristIndex == imgeThirdIndex ) {
    imgNum3 = randomImgNum(0,imgeArr.length-1);
  }

  imgeFrist.src = ProductImge.all[imgNum1].img;
  imgeSecond.src = ProductImge.all[imgNum2].img;
  imgeThird.src = ProductImge.all[imgNum3].img;

  imgeFristIndex=imgNum1;
  imgeSecondIndex=imgNum2;
  imgeThirdIndex=imgNum3;

  ProductImge.all[imgNum1].imgShown++;
  ProductImge.all[imgNum2].imgShown++;
  ProductImge.all[imgNum3].imgShown++;

}

function chartImg(){
  let clicksVotes=[];
  let names =[];
  let shownImg =[];
  for(let i = 0;i<ProductImge.all.length;i++){
    clicksVotes.push(ProductImge.all[i].imgClikcs);
    names.push(ProductImge.all[i].name);
    shownImg.push(ProductImge.all[i].imgShown);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes cliks',
        data: clicksVotes,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },{
        label: '# of image has been shown',
        data: shownImg,
        backgroundColor: 'rgba(255, 99, 200, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



function randomImgNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


imgeSection.addEventListener('click',clickImgHadler);
btnResult.addEventListener('click',chartImg);
renderImgeProducr();








