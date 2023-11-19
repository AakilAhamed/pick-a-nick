function convertToPNG() {
    const pfp = document.getElementById('pfp');

    // Use html2canvas to capture the pfp as an image
    html2canvas(pfp).then(canvas => {
        // Convert the canvas pfp to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'profile.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}