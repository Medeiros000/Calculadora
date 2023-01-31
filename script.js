
function enviarParaDisplay(value){
  document.getElementById("display").value += value;
}
/*    Função que envia Ponto para o display    */
var ponto = document.getElementById("ponto");
ponto.onclick = enviarPonto;
function enviarPonto(){
  var display = document.getElementById("display");
  var lastChar = display.value[display.value.length - 1];
  if(display.value === "" || lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/"){
    display.value += ("0" + ".");
  }else if(lastChar === "."){}else{
    display.value += ".";
  }
}
/*    Função que envia Zero para o display    */
var zero = document.getElementById("zero");
zero.onclick = enviarZero;
function enviarZero(){
  var display = document.getElementById("display");
  if(display.value === ""){
    display.value += "0";
  }else if(display.value === "0"){}else{
    display.value += "0";
  }
}
/*    Função que envia ZeroZero para o display    */
var zeroZero = document.getElementById("zeroZero");
zeroZero.onclick = enviarZeroZero;
function enviarZeroZero(){
  var display = document.getElementById("display");
  if(display.value === "" || display.value === "0"){}else{
    display.value += "00";
  }
}
/*    Função para calcular expressão do display    */
var calcular = document.getElementById("calcular");
calcular.onclick = calcularExpressao;
function calcularExpressao(){
  var vazio = document.getElementById("display");
  if(vazio.value === ""){    
  }else{
    try {
      var expressaoPre = document.getElementById("display").value;
      document.getElementById("conta").value = (expressaoPre + "=");
      var expressao = traduzir(expressaoPre);
      var resultado = eval(expressao);      
      if(resultado === undefined){ /*    Para resultado Undefined    */
        document.getElementById("display").value = "Erro";
        setTimeout(() => {limparDisplay()}, 1500);
      }else{ /*    Para resultado viável    */        
        if(resultado === 0.30000000000000004){/*    Por algum motivo a soma 0.1+0.2 está dando esse resultado    */
          resultado = "0.3";
        }
        document.getElementById("display").value = resultado;
        console.log(resultado);
        registraHistorico();
      }
    } catch (e) { /*    Para resultado Erro    */
      document.getElementById("display").value = "Erro";
      setTimeout(() => {limparDisplay()}, 1500);
    }
  }
}
/*    Função que troca o "x" e "÷" por "*" e "/"    */
function traduzir(input) {
  let simbolos = [["x" , "*"] , ["÷" , "/"]];
  for(let i = 0; i < simbolos.length; i++) {
      if(input.includes(simbolos[i][0])) {
          input = input.replaceAll(simbolos[i][0], simbolos[i][1]);
      }
  }
  return input; 
}
/*    Função para limpar todos os campos    */
function limparTudo(){
  document.getElementById("display").value = "";
  document.getElementById("conta").value = "";
  document.getElementById("memoria").value = "";
  document.getElementById("historico").value = "";
}
/*    Função para limpar somente os campos display e conta    */
function limparDisplay(){
  document.getElementById("display").value = "";
  document.getElementById("conta").value = "";
}
/*    Função para apagar o último caracter escrito    */
function backspace() {
  var input = document.getElementById("display");
  input.value = input.value.slice(0, -1);
}
/*    Função para guardar o valor no display na memória    */
function memoria(){
  document.getElementById("memoria").value = document.getElementById("display").value;
}
/*    Função para usar o valor na memória    */
function usarMemoria(){
  document.getElementById("display").value += document.getElementById("memoria").value;
}
/*    Função para registrar as operações no histórico    */
function registraHistorico(){
  document.getElementById("historico").value += (document.getElementById("conta").value) + (document.getElementById("display").value) + "\n";
}
/*    Função para alternar o modo de visualização do histórico    */
function alternarDiv(divAlvo){
  var div = document.getElementById(divAlvo);
  div.classList.contains("naoMostrar") ? mostrarDiv(divAlvo) : esconderDiv(divAlvo);
}
function mostrarDiv(divAlvo) {
  var div = document.getElementById(divAlvo);
  div.classList.remove("naoMostrar");
  div.classList.add("mostrar");
}
function esconderDiv(divAlvo) {
  var div = document.getElementById(divAlvo);
  div.classList.remove("mostrar");
  div.classList.add("naoMostrar");
}
/*    Função para alternar o som das teclas    */
function mutar(){
  var audio = document.getElementById("somTeclas");
  audio.muted = !audio.muted;
}
/*    EventListener para tocar som no click de um botão    */
var botao = document.querySelectorAll("button");
console.log(botao);

for (let i = 0; i < botao.length; i++){
  botao[i].addEventListener("click", () => {
    var audio = document.getElementById("somTeclas");
    audio.currentTime = 0;
    audio.play();
  });
}
/*    Listener para carregar os números    */
var numeros = document.querySelectorAll("#numeros");
var confereConta = document.getElementById("conta");
var confereDisplay = document.getElementById("display");
var operacoes =["+","-","÷","x"];

for (let i = 0; i < numeros.length; i++){  
  numeros[i].addEventListener("click", () => {
    if (confereConta.value.includes("=") && !operacoes.some(operacoes=>confereDisplay.value.includes(operacoes))) {
      limparDisplay();
    }   
    confereDisplay.value += numeros[i].innerHTML;
    console.log(numeros[i].innerHTML);
  });
}