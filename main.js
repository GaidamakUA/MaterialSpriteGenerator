$(document).ready(function() {
  var canvas = $("#spritesheet").get(0);
  var ctx = canvas.getContext("2d");

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var image = getImage("body_male.png")
    ctx.drawImage(image, 0, 0);
  }

  redraw();

  var images = {};

  function getImage(imgRef) {
    if (images[imgRef])
      return images[imgRef];
    else {

      // Load image if not in cache
      var img = new Image();
      img.src = "Universal-LPC-spritesheet/" + imgRef;
      img.onload = redraw;
      images[imgRef] = img;
      return img;
    }
  }

  function getImage2(imgRef, callback) {
    if (images[imgRef]) {
      callback(images[imgRef]);
      return images[imgRef];
    } else {

      // Load image if not in cache
      var img = new Image();
      img.src = "Universal-LPC-spritesheet/" + imgRef;
      img.onload = function() {
        callback(img)
      };
      images[imgRef] = img;
      return img;
    }
  }
});
