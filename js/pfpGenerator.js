function drawRandomPattern() {
    const canvas = document.getElementById('patternCanvas');
    const context = canvas.getContext('2d');
  
    const numSquares = 10;
  
    for (let i = 0; i < numSquares; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 50 + 20; // Random size between 20 and 70
      const color = getRandomColor();
  
      context.fillStyle = color;
      context.fillRect(x, y, size, size);
    }
  }
  
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function convertToPNG() {
    const canvas = document.getElementById('patternCanvas');
  
    // Use html2canvas to capture the canvas as an image
    html2canvas(canvas).then(canvas => {
      // Convert the canvas content to a data URL
      const dataURL = canvas.toDataURL('image/png');
  
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'pattern.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  
  // Draw the random pattern when the page loads
  drawRandomPattern();