const clearCanvasButton = document.querySelector(".clear-canvas");
const saveCanvasButton = document.querySelector('.save-canvas');
const allTextButton = document.querySelectorAll(".btn");
const btnPlus = document.querySelector('.plus');
const btnMinus = document.querySelector('.minus');
const rangeScroll = document.querySelector('.rng');

let myColor = null;
let imgWidthG = 0;
let imgHeightG = 0;
//Выбор цвета
const cp = ColorPicker(
  document.getElementById("pcr"),
  document.getElementById("picker"),
  function(hex, hsv, rgb, mousePicker, mousepcr) {
    currentColor = hex;
    ColorPicker.positionIndicators(
      document.getElementById("pcr-indicator"),
      document.getElementById("picker-indicator"),
      mousepcr,
      mousePicker
    );
    document.querySelector(
      ".picker-wrapper"
    ).style.border = `10px solid ${currentColor}`;
    document.querySelector(".clear-canvas").style.background = currentColor;
    myColor = currentColor;
  }
);
cp.setHex("#D4EDFB");

$(function() {
  var el;
  $(".rng").change(function() {
  el = $(this);
  el
  .next(".ong")
  .text(`Розмір: ${el.val()}`);
  })
  .trigger('change');
  });


const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");


function mouseMove(event) {
  const sizeBrush = rangeScroll.value;
  let x = event.offsetX;
  let y = event.offsetY;
  context.fillStyle = myColor;
  context.beginPath();
  context.arc(x, y, sizeBrush, 0, Math.PI * 4, false);
  context.closePath();
  context.fill();
}


let src = './draw/malyshariki.jpg'

//добавляем картинку на холст и изменяем размеры canvas
function addImage(src) {
  const img = new Image();
  img.src = src;

  img.addEventListener("load", function(event) {

    const imgWidth = img.width;
    const imgHeight = img.height;

    imgHeightG = imgHeight;
    imgWidthG = imgWidthG;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    context.drawImage(img, 0, 0);
  });
  
  return img;
}

addImage(src);



//События при нажатие мышки и передвижении мышки
canvas.addEventListener("mousedown", function(event) {
  canvas.addEventListener("mousemove", mouseMove);
  //Событие при отпускании мышки
  canvas.addEventListener("mouseup", function() {
    canvas.removeEventListener("mousemove", mouseMove);
  });
});

//Событие на удаление
clearCanvasButton.addEventListener("click", function() {
  event.preventDefault();
  context.clearRect(0, 0, canvas.width, canvas.height);
  addImage(src)
});


//Создаем новую картинку с текущим изображением canvas
function getImage(canvas){
  
  const imageData = canvas.toDataURL();
  console.log(imageData)
  const image = new Image();
  image.src = imageData;
  
  return image;
}

//Делаем ссылку на скачку файла
function saveImage(image) {
  const link = document.createElement("a");

  link.setAttribute("href", image.src);
  link.setAttribute("download", "canvasImage");
  link.click();
}


//Событие на кнопке Зберегти
saveCanvasButton.addEventListener('click', (event)=>{
event.preventDefault();
const image = document.querySelector('.canvas');
const imageSave = getImage(image);

saveImage(imageSave)
});


//устанавливаем события на кнопки с текстом
allTextButton.forEach(el =>{

  el.addEventListener('click', function(event){
    event.preventDefault();
  
    const source = el.dataset.url;
    src = source;
    addImage(source);
  })
})












