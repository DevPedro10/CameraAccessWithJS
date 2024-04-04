// Variável global para armazenar o stream da câmera
let cameraStream;

const openCamera = () => {
    // Verifica se o navegador suporta a API de mídia getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                cameraStream = stream;

                // Exibe o stream da câmera no elemento de vídeo
                document.getElementById('videoElement').srcObject = stream;
            })
            .catch(function (error) {
                console.error("Erro ao abrir a câmera:", error);
            });
    } else {
        console.error("Seu navegador não suporta a API de mídia getUserMedia");
    }
}

const takePhoto = () => {
    if (cameraStream) {
        // Cria um canvas para capturar a foto
        let canvas = document.createElement('canvas');
        let video = document.getElementById('videoElement');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Obtém a foto como um data URL
        let photoDataUrl = canvas.toDataURL('image/png');

        // Exibe a foto no elemento de imagem
        let photoElement = document.getElementById('photoElement');
        photoElement.src = photoDataUrl;
        photoElement.style.display = 'block';
        let paragraph = document.getElementById('paragraph');
        paragraph.innerHTML = "muito feio"
        console.log("Foto capturada:", photoDataUrl);
    }
}

window.onload = openCamera;