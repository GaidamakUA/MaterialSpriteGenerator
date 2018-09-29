var ctx;

function setup() {
  var canvas = document.getElementById('spritesheet');
  ctx = canvas.getContext('2d');

  var femaleButton = document.getElementById('female')
  femaleButton.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage('body_female.png');
    femaleButton.className = "btn btn-primary"
    maleButton.className = "btn btn-outline-primary"
  }
  var maleButton = document.getElementById('male')
  maleButton.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage('body_male.png');
    maleButton.className = "btn btn-primary"
    femaleButton.className = "btn btn-outline-primary"
  }

  drawImage('body_male.png');
}
window.onload = setup;

function drawImage(url) {
  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
  };
  image.src = url;
}
