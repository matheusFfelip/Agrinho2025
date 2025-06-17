// Quiz elaborado com ajuda de Ia. prompt: crie um quiz no p5.js com o tema `Consumo consciente, origem dos alimentos``
let perguntas = [
  {
    pergunta: "Qual é a principal consequência do consumo desenfreado de recursos naturais?",
    opcoes: ["A) Sustentabilidade", "B) Escassez de recursos", "C) Menor impacto ambiental", "D) Menos poluição"],
    resposta: "B"
  },
  {
    pergunta: "O que é reciclagem?",
    opcoes: ["A) Jogar lixo no meio ambiente", "B) Reutilizar materiais para novos produtos", "C) Aumentar a produção de lixo", "D) Reduzir o uso de energia"],
    resposta: "B"
  },
  {
    pergunta: "Como podemos reduzir a pegada de carbono no dia a dia?",
    opcoes: ["A) Usando mais carros particulares", "B) Desperdiçando alimentos", "C) Optando por transporte público e energias renováveis", "D) Comprando mais produtos descartáveis"],
    resposta: "C"
  },
  {
    pergunta: "Por que é importante consumir de maneira consciente?",
    opcoes: ["A) Para reduzir o impacto no meio ambiente", "B) Para aumentar o lucro das empresas", "C) Para comprar mais produtos", "D) Para deixar a sociedade mais rica"],
    resposta: "A"
  },
  {
    pergunta: "Qual é uma prática sustentável no consumo de alimentos?",
    opcoes: ["A) Comprar alimentos embalados em plástico", "B) Preferir alimentos da estação", "C) Comprar produtos fora de temporada", "D) Comer alimentos industrializados"],
    resposta: "B"
  }
];

let perguntaAtual = 0;
let score = 0;
// Estado do jogo: "capa", "selecao", "quiz", "resultado"
let estadoJogo = "capa"; 
// Feedback visual: null, "correto", "errado"
let feedbackResposta = null; 
// Armazena o índice da opção clicada para o feedback visual
let opcaoSelecionadaNoMomento = -1; 
// Tempo para exibir o feedback antes de avançar (em milissegundos)
let tempoFeedback = 1500; 
let tempoInicioFeedback; // Guarda o momento em que o feedback começou

function setup() {
  createCanvas(600, 400);
  textAlign(LEFT, TOP);
  textSize(18);
}

function draw() {
  background(240);

  if (estadoJogo === "capa") {
    mostrarCapa();
  } else if (estadoJogo === "selecao") {
    mostrarSelecaoPerguntas();
  } else if (estadoJogo === "quiz") {
    mostrarPergunta();
    // Se houver feedback, verifica o tempo para avançar automaticamente
    if (feedbackResposta && millis() - tempoInicioFeedback > tempoFeedback) {
      avancarProximaPergunta();
    }
  } else if (estadoJogo === "resultado") {
    mostrarResultado();
  }
}

// --- Funções de Exibição ---

function mostrarCapa() {
  background(100, 180, 255); // Fundo azul claro
  fill(255); // Texto branco
  textAlign(CENTER, CENTER);

  textSize(40);
  text("Quiz do Consumo Consciente", width / 2, height / 2 - 80);

  textSize(20);
  text("Teste seus conhecimentos sobre sustentabilidade!", width / 2, height / 2 - 20);
  text("Escolha uma pergunta para começar.", width / 2, height / 2 + 20);

  textSize(25);
  fill(50, 200, 100); // Cor verde para o botão "JOGAR"
  rect(width / 2 - 100, height / 2 + 80, 200, 50, 10); 
  fill(255); 
  text("JOGAR", width / 2, height / 2 + 105);

  textAlign(LEFT, TOP); // Volta para o alinhamento padrão
}

function mostrarSelecaoPerguntas() {
  background(200, 230, 255); // Fundo levemente diferente para a seleção
  fill(0);
  textAlign(CENTER, TOP);
  textSize(28);
  text("Escolha uma Pergunta", width / 2, 30);

  textAlign(LEFT, CENTER);
  textSize(20);

  // Desenha os botões de seleção de pergunta
  let startY = 100;
  let buttonHeight = 40;
  let spacing = 10;

  for (let i = 0; i < perguntas.length; i++) {
    let yPos = startY + i * (buttonHeight + spacing);
    fill(70, 130, 180); // Cor dos botões de pergunta
    rect(width / 2 - 150, yPos, 300, buttonHeight, 8);
    fill(255);
    text(`Pergunta ${i + 1}: ${perguntas[i].pergunta.substring(0, 30)}...`, width / 2 - 140, yPos + buttonHeight / 2); // Exibe um trecho da pergunta
  }

  textAlign(LEFT, TOP); // Volta para o alinhamento padrão
}

function mostrarPergunta() {
  fill(0);
  text(`Pergunta ${perguntaAtual + 1} de ${perguntas.length}`, 20, 20);
  text(perguntas[perguntaAtual].pergunta, 20, 60, width - 40, 100);

  // Mostrar opções
  for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
    let yPos = 150 + i * 40;
    let corOpcao = color(50); // Cor padrão escura

    // Aplica a cor de feedback se houver e a opção for a clicada
    if (feedbackResposta) {
      if (opcaoSelecionadaNoMomento === i) {
        // Se esta é a opção que foi clicada
        if (feedbackResposta === "correto") {
          corOpcao = color(0, 180, 0); // Verde vibrante para correto
        } else if (feedbackResposta === "errado") {
          corOpcao = color(200, 0, 0); // Vermelho vibrante para errado
        }
      } else if (String.fromCharCode(65 + i) === perguntas[perguntaAtual].resposta) {
        // Se esta é a opção correta (mesmo se não foi a clicada)
        corOpcao = color(0, 100, 0); // Verde mais escuro para a correta
      }
    }
    
    fill(corOpcao);
    rect(20, yPos - 5, width - 40, 35, 5);
    fill(255);
    text(perguntas[perguntaAtual].opcoes[i], 30, yPos);
  }

  fill(0);
  if (!feedbackResposta) { 
    text("Clique na opção correta", 20, height - 40);
  } else {
    textAlign(CENTER, TOP);
    textSize(20);
    // Mensagem de feedback temporária
    if (feedbackResposta === "correto") {
        fill(0, 150, 0);
        text("Correto!", width / 2, height - 40);
    } else {
        fill(150, 0, 0);
        text("Incorreto!", width / 2, height - 40);
    }
    fill(0); // Volta ao preto para o texto principal
    textSize(16);
    text("Avançando...", width / 2, height - 20); // Indica que vai avançar automaticamente
    textAlign(LEFT, TOP);
  }
}

function mostrarResultado() {
  background(220); 
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(`Você acertou ${score} de ${perguntas.length} perguntas!`, width / 2, height / 2 - 40);

  textSize(20);
  if (score === perguntas.length) {
    text("Parabéns! Excelente conhecimento sobre consumo consciente!", width / 2, height / 2);
  } else if (score >= perguntas.length / 2) {
    text("Bom trabalho! Continue aprendendo sobre consumo consciente.", width / 2, height / 2);
  } else {
    text("Continue se informando sobre consumo consciente. Estamos no caminho certo!", width / 2, height / 2);
  }

  textSize(16);
  fill(100);
  text("Clique para reiniciar o quiz", width / 2, height / 2 + 80);
}

// --- Funções de Interação e Lógica ---

function mousePressed() {
  if (estadoJogo === "capa") {
    if (
      mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 80 && mouseY < height / 2 + 130
    ) {
      estadoJogo = "selecao"; 
    }
    return;
  }

  if (estadoJogo === "selecao") {
    let startY = 100;
    let buttonHeight = 40;
    let spacing = 10;

    for (let i = 0; i < perguntas.length; i++) {
      let yPos = startY + i * (buttonHeight + spacing);
      if (
        mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
        mouseY > yPos && mouseY < yPos + buttonHeight
      ) {
        perguntaAtual = i; 
        score = 0; 
        feedbackResposta = null; 
        opcaoSelecionadaNoMomento = -1; 
        estadoJogo = "quiz"; 
        return;
      }
    }
    return;
  }

  if (estadoJogo === "resultado") {
    // Reinicia o quiz ao clicar após finalizado
    perguntaAtual = 0;
    score = 0;
    feedbackResposta = null;
    opcaoSelecionadaNoMomento = -1;
    estadoJogo = "capa"; 
    return;
  }

  // Se estiver no quiz e ainda não houver feedback (resposta não foi dada)
  if (estadoJogo === "quiz" && !feedbackResposta) {
    for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
      let yPos = 150 + i * 40;
      if (
        mouseX > 20 && mouseX < width - 20 &&
        mouseY > yPos - 5 && mouseY < yPos + 30
      ) {
        checarResposta(i);
        break;
      }
    }
  }
  // Se estiver no quiz e houver feedback, o avanço é automático, então não precisamos de um clique aqui
}

function checarResposta(opcaoSelecionada) {
  let letraOpcao = String.fromCharCode(65 + opcaoSelecionada);
  opcaoSelecionadaNoMomento = opcaoSelecionada; 

  if (letraOpcao === perguntas[perguntaAtual].resposta) {
    score++;
    feedbackResposta = "correto"; 
  } else {
    feedbackResposta = "errado"; 
  }
  tempoInicioFeedback = millis(); // Registra o tempo em que o feedback começou
}

function avancarProximaPergunta() {
  perguntaAtual++;
  feedbackResposta = null; 
  opcaoSelecionadaNoMomento = -1; 

  if (perguntaAtual >= perguntas.length) {
    estadoJogo = "resultado";
  }
}
