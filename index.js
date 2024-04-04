// Variável global para armazenar o stream da câmera
let cameraStream;

function openCamera() {
    // Verifica se o navegador suporta a API de mídia getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Armazena o stream da câmera
                cameraStream = stream;
                // Exibe o stream da câmera no elemento de vídeo
                document.getElementById('videoElement').srcObject = stream;
            })
            .catch(function (error) {
                // Se houver um erro ao abrir a câmera
                console.error("Erro ao abrir a câmera:", error);
            });
    } else {
        // Se o navegador não suportar a API de mídia getUserMedia
        console.error("Seu navegador não suporta a API de mídia getUserMedia");
    }
}

function takePhoto() {
    // Verifica se há um stream de câmera ativo
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

        // Você pode salvar a foto onde desejar (por exemplo, enviar para um servidor)
        // Ou fazer qualquer outra coisa com ela
        console.log("Foto capturada:", photoDataUrl);
    }
}

// Abre a câmera ao carregar a página
window.onload = openCamera;