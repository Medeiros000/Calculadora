/*_____________________Variáveis_____________________*/
let display = document.getElementById('display');
let conta = document.getElementById("conta");
let memoria = document.getElementById("memoria");
let historico = document.getElementById("historico");
/*\_________________________________________________/*/

function checkLastCharIsOp(lastChar, opInHtml) {
  return lastChar === opInHtml ||
      lastChar === "." ||
      lastChar === "x" && opInHtml === "÷"
      || lastChar === "÷" && opInHtml === "x"
      || ((display.value === "" || lastChar === "-" || lastChar === "+") && (opInHtml === "x" || opInHtml === "÷"))
}

/*     Listener para as operações matematicas     */
let operacoesHtml = document.querySelectorAll("#operacao");
operacoesHtml.forEach((operacao) => {
  operacao.addEventListener("click", () => {
    let lastChar = display.value[display.value.length - 1];
    let opInHtml = operacao.innerHTML;
    if(!checkLastCharIsOp(lastChar, opInHtml)) {
      display.value += opInHtml;
    }
  });
})
/*    Função que envia Ponto para o display    */
let ponto = document.getElementById("ponto");
ponto.onclick = enviarPonto;
function enviarPonto(){
  let operacoes =["+","-","÷","x"];
  let lastChar = display.value[display.value.length - 1];
  /*    Criar um map para rastrear como o ponto se comporta na expressão    */
  if(lastChar === ".") return;
  if(display.value === "" || lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷"){
    display.value += ("0" + ".");
  }else if(conta.value.includes("=") && operacoes.some(operacoes=>display.value.includes(operacoes))){
    display.value += ".";
  }else if(conta.value.includes("=")){
    limparDisplay()
    display.value += ("0" + ".");
  }else{
    display.value += ".";
  }
}
/*    Função que envia Zero para o display    */
let zero = document.getElementById("zero");
zero.onclick = enviarZero;
function enviarZero(){
  let operacoes =["+","-","÷","x"];
  let lastChar = display.value[display.value.length - 1];
  if(display.value === "" || lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷" || conta.value.includes("=") && operacoes.some(operacoes=>display.value.includes(operacoes))){
    display.value += "0";
  }else if(display.value === "0"){return;}else if(conta.value.includes("=")){
    limparDisplay()
    display.value += "0";
  }else{
    display.value += "0";
  }
}
/*    Função para calcular expressão do display    */
let calcular = document.getElementById("calcular");
calcular.onclick = calcularExpressao;
function calcularExpressao(){
  if(display.value === ""){
    return;
  }else{
    try{
      let expressaoPre = display.value;
      conta.value = (expressaoPre + "=");
      let expressao = traduzir(expressaoPre);
      let resultado = eval(expressao);      
      if(resultado === undefined){ /*    Para resultado Undefined    */
        display.value = "Erro";
        setTimeout(() => {limparDisplay()}, 1500);
      }else{ /*    Para resultado viável    */        
        if(resultado === 0.30000000000000004){/*    Por algum motivo a soma 0.1+0.2 está dando esse resultado    */
          resultado = "0.3";
        }
        display.value = resultado;
        registraHistorico();
      }
    }catch (e){ /*    Para resultado Erro    */
      display.value = "Erro";
      setTimeout(() => {limparDisplay()}, 1500);
    }
  }
}
/*    Função que troca o "x" e "÷" por "*" e "/"    */
function traduzir(input) {
  const simbolos = [["x" , "*"] , ["÷" , "/"]];
  simbolos.forEach(simbolo => {
    if(input.includes(simbolo[0])) {
      input = input.replaceAll(simbolo[0], simbolo[1]);
    }
  })

  return input; 
}
/*    Função para limpar todos os campos    */
let CE = document.getElementById("ce");
CE.onclick = limparDisplay;
function limparDisplay(){
  display.value = "";
  conta.value = "";
}
/*    Função para limpar somente os campos display e conta    */
let C = document.getElementById("c");
C.onclick = limparTudo;
function limparTudo(){
  display.value = "";
  conta.value = "";
  memoria.value = "";
  historico.value = "";
}
/*    Função para apagar o último caracter escrito    */
let backspace = document.getElementById("backspace");
backspace.onclick = Backspace;
function Backspace() {if ((conta.value.includes("=")) || (display.value === "0.")) {  
  limparDisplay();
  } else {
    let input = display;
    input.value = input.value.slice(0, -1);
    }  
}
/*    Função para guardar o valor no display na memória    */
let mPlus = document.getElementById("mPlus");
mPlus.onclick = guardarNaMemoria;
function guardarNaMemoria(){
  memoria.value = display.value;
}
/*    Função para usar o valor na memória    */
let usarM = document.getElementById("usarM");
usarM.onclick = usarMemoria;
function usarMemoria(){
  display.value += memoria.value;
}
/*    Função para registrar as operações no histórico    */
function registraHistorico(){
  historico.value += (conta.value) + (display.value) + "\n";
}
/*    Função para alternar o modo de visualização do histórico    */
let mHistorico = document.getElementById("mostrarHistorico")
mHistorico.onclick = alternarDiv;
function alternarDiv(){
  let div = document.getElementById("rodape");
  div.classList.contains("naoMostrar") ? mostrarDiv("rodape") : esconderDiv("rodape");
}
function mostrarDiv(divAlvo) {
  let div = document.getElementById(divAlvo);
  div.classList.remove("naoMostrar");
  div.classList.add("mostrar");
}
function esconderDiv(divAlvo) {
  let div = document.getElementById(divAlvo);
  div.classList.remove("mostrar");
  div.classList.add("naoMostrar");
}
/*    Função para alternar o som das teclas    */
let mutar = document.getElementById("mutar");
mutar.onclick = alternarSom;
function alternarSom(){
  let audio = document.getElementById("somTeclas");
  audio.muted = !audio.muted;
}
/*    EventListener para tocar som no click de um botão    */
let botoes = document.querySelectorAll("button");
botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    let audio = document.getElementById("somTeclas");
    audio.currentTime = 0;
    audio.play();
  });
})
/*    Listener para carregar os números    */
let numeros = document.querySelectorAll("#numeros");
let operacoes =["+","-","÷","x"];
numeros.forEach( numero => {
  numero.addEventListener("click", () => {
    if (conta.value.includes("=") && !operacoes.some(operacoes=>display.value.includes(operacoes))) {
      limparDisplay();
    }
    display.value += numero.innerHTML;
  });
})

/*    Modo Dark    */
let dark = document.getElementById("dark");
dark.onclick = DarkMode;
function DarkMode() {
  if(document.body.classList.contains('dark-mode')){
    document.body.classList.remove('dark-mode');
  }else{document.body.classList.add('dark-mode');} 
}