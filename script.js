// Variável global para armazenar a imagem
let houseImage = new Image();
houseImage.src = 'casa.png'; // Coloque o caminho correto da sua imagem aqui

// Variáveis para armazenar a posição e o ângulo da casa
let houseX = 5; // Valor padrão da coordenada X
let houseY = 5; // Valor padrão da coordenada Y
let houseAngle = 0; // Ângulo inicial da casa
let targetAngle = 0; // Ângulo para o qual a casa deve girar
let rotationSpeed = 2; // Velocidade de rotação (graus por quadro)
let isAnimating = false; // Estado da animação

// Função para desenhar o 1º quadrante do plano cartesiano
function drawGrid() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar linhas do eixo X e Y
    ctx.beginPath();
    ctx.moveTo(50, 350); // Eixo X
    ctx.lineTo(350, 350);
    ctx.moveTo(50, 350); // Eixo Y
    ctx.lineTo(50, 50);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Desenhar a grade
    ctx.strokeStyle = "#ccc";
    for (let i = 1; i <= 10; i++) {
        let x = 50 + (i * 30); // Espaçamento de 30px por unidade
        let y = 350 - (i * 30);

        // Linhas verticais
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, 350);
        ctx.stroke();

        // Linhas horizontais
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(350, y);
        ctx.stroke();

        // Números nos eixos
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(i, x - 5, 365); // Eixo X
        ctx.fillText(i, 35, y + 5);  // Eixo Y
    }
}

// Função para desenhar a casa rotacionada
function drawRotatedHouse() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Converter o ângulo para radianos
    const theta = (Math.PI / 180) * houseAngle;

    // Salvar o estado atual do contexto
    ctx.save();

    // Mover o contexto para as coordenadas onde a imagem será desenhada
    const xPos = 50 + houseX * 30; // Escalar as coordenadas para o canvas
    const yPos = 350 - houseY * 30;

    ctx.translate(xPos, yPos); // Centralizar no ponto de rotação

    // Aplicar a rotação
    ctx.rotate(theta);

    // Desenhar a imagem da casa (ajustando para centralizar)
    const imgWidth = 50;
    const imgHeight = 50;
    ctx.drawImage(houseImage, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

    // Restaurar o estado original do contexto
    ctx.restore();
}

// Função para rotacionar a imagem com base nos inputs do usuário
function rotateImage() {
    // Pegar os valores de entrada do usuário
    houseX = parseFloat(document.getElementById('x').value);
    houseY = parseFloat(document.getElementById('y').value);
    targetAngle = parseFloat(document.getElementById('angle').value); // Alvo de ângulo

    // Reiniciar a animação mesmo se o ângulo for o mesmo
    houseAngle = 0; // Reseta o ângulo atual
    isAnimating = true; // Iniciar a animação
    animateRotation();
}

// Função de animação de rotação
function animateRotation() {
    if (!isAnimating) return; // Para a animação se isAnimating for false

    // Redesenhar o grid
    drawGrid();

    // Calcular a diferença entre o ângulo atual e o ângulo alvo
    const angleDiff = targetAngle - houseAngle;

    // Se a diferença for pequena, parar a animação
    if (Math.abs(angleDiff) < rotationSpeed) {
        houseAngle = targetAngle; // Ajustar o ângulo para o alvo
        isAnimating = false; // Parar a animação
    } else {
        // Incrementar ou decrementar o ângulo
        houseAngle += (angleDiff > 0) ? rotationSpeed : -rotationSpeed; 
    }

    // Desenhar a casa na nova posição
    drawRotatedHouse();

    // Chamar a função de animação no próximo quadro
    requestAnimationFrame(animateRotation);
}

// Função para desenhar a casa no carregamento inicial
function init() {
    drawGrid();
    drawRotatedHouse(); // Desenhar a casa logo no início
}

// Iniciar a aplicação
houseImage.onload = init; // Garantir que a imagem seja carregada antes de desenhar
