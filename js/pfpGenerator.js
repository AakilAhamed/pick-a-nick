var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var useSolidColor = true; // Default to solid color

// Get color picker elements
var headColorPicker = document.getElementById("headColorPicker");
var bodyColorPicker = document.getElementById("bodyColorPicker");
var bgColorPicker = document.getElementById("bgColorPicker");


// Add event listeners to color pickers
headColorPicker.addEventListener("input", drawCanvas);
bodyColorPicker.addEventListener("input", drawCanvas);
bgColorPicker.addEventListener("input", drawCanvas);

// Function to toggle background between solid color and image
function toggleBackground() {
  useSolidColor = !useSolidColor;
  drawCanvas();
}

// Function to draw canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!useSolidColor) {
    var img = new Image();
    img.src = 'forest.jpeg';
    img.onload = function () {
      var blurredImage = applyBlur(img, 5); //draw  blurred image on canvas
      ctx.drawImage(blurredImage, 0, 0, canvas.width, canvas.height);
      drawAvatar();
    };
  } else {
    ctx.fillStyle = bgColorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAvatar();
  }
}

// Function to draw avatar
function drawAvatar() {
  var avatarSize = 150;
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var bodyY = centerY + avatarSize / 4;

  // Get selected colors from color pickers
  var headColor = headColorPicker.value;
  var bodyColor = bodyColorPicker.value;

  ctx.beginPath();
  ctx.arc(centerX, centerY - avatarSize / 4, avatarSize / 4, 0, 2 * Math.PI);
  ctx.fillStyle = headColor; // Use selected head color
  ctx.fill();

  ctx.beginPath();
  ctx.arc(centerX, bodyY + avatarSize / 4, avatarSize / 2, 0, Math.PI, true);
  ctx.fillStyle = bodyColor; // Use selected body color
  ctx.fill();
}

// Function to apply blur effect to an image
function applyBlur(img, radius) {
  var blurryCanvas = document.createElement('canvas');
  var blurryCtx = blurryCanvas.getContext('2d');
  blurryCanvas.width = img.width;
  blurryCanvas.height = img.height;
  blurryCtx.filter = 'blur(' + radius + 'px)';
  blurryCtx.drawImage(img, 0, 0, img.width, img.height);
  return blurryCanvas;
}

// Function to generate a random color
// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// Function to download the canvas as an image file
function downloadCanvas() {
  var downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'avatar.png');
  var canvasData = canvas.toDataURL('image/png');
  var blob = dataURItoBlob(canvasData);
  var url = window.URL.createObjectURL(blob);
  downloadLink.setAttribute('href', url);
  downloadLink.click();
  window.URL.revokeObjectURL(url); // Free up memory
}

// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

function uploadCustomBackground() {
  var bgImageInput = document.getElementById("bgImageInput");
  bgImageInput.click(); // Trigger the file input click event
  bgImageInput.addEventListener("change", function () {
    var file = bgImageInput.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        var blurredImage = applyBlur(img, 5); // Draw blurred image on canvas
        ctx.drawImage(blurredImage, 0, 0, canvas.width, canvas.height);
        drawAvatar();
      };
    };
    reader.readAsDataURL(file);
  });
}

// Initial drawing of canvas
drawCanvas();
