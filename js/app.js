'use strict';
let imgeArr=[
  'bag','banana','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep',
  'scissors','shark','sweep.png','tauntaun','unicorn','usb.gif','water-can','wine-glass'
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

function ProductImge(name){
  this.name=name;
  if(name==='sweep.png' || name==='usb.gif'){
    this.img = `./img/${name}`;
  }else{
    this.img = `./img/${name}.jpg`;
  }
  this.imgClikcs = 0;
  this.imgShown = 0;
  ProductImge.all.push(this);
}

ProductImge.all=[];

for(let i = 0; i<imgeArr.length;i++){
  new ProductImge(imgeArr[i]);

}
console.log(ProductImge.all);

function clickImgHadler(){
  imgClikcsNum++;
  if(imgClikcsNum<=26){

    ProductImge.all[imgeFristIndex].imgClikcs++;
    ProductImge.all[imgeSecondIndex].imgClikcs++;
    ProductImge.all[imgeThirdIndex].imgClikcs++;
    renderImgeProducr();
  }
  if(imgClikcsNum==26){
    remove();
  }
  console.log(ProductImge.all);
  console.log(imgClikcsNum);
}
function result(){
  if(imgClikcsNum==26){
    let ulEle = document.createElement('ul');
    resultSection.appendChild(ulEle);

    for(let i=0;i<imgeArr.length;i++){
      let liEle = document.createElement('li');
      ulEle.appendChild(liEle);
      liEle.textContent=imgeArr[i] + ' had '+ ProductImge.all[i].imgClikcs +' votes and had seen '+
    ProductImge.all[i].imgShown+' times';
    }
  }else{
    alert('You should choose 25 times');
  }
}
function remove(){
  if(imgClikcsNum == 26){
    imgeSection.removeEventListener('click',remove);
  }

}

function renderImgeProducr(){
  let imgNum1 = randomImgNum(0,imgeArr.length-1);
  let imgNum2;
  let imgNum3;

  do{
    imgNum2 = randomImgNum(0,imgeArr.length-1);
    imgNum3 = randomImgNum(0,imgeArr.length-1);
  }while(imgNum1===imgNum2 || imgNum2===imgNum3 || imgNum1 === imgNum3);



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





function randomImgNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


imgeSection.addEventListener('click',clickImgHadler);
renderImgeProducr();
imgeSection.removeEventListener('click',remove);
remove();
btnResult.addEventListener('click',result);




