
function enviarParaDisplay(value){
  document.getElementById("display").value += value;
  tocar();
}
function enviarParaDisplayPonto(value){
  var display = document.getElementById("display");
  if(display.value === ""){
    display.value += ("0" + value);
  }else{
    display.value += value;
  }
  tocar();
}
function enviarParaDisplayZero(value){
  var display = document.getElementById("display");
  if(display.value === ""){
    display.value += ("0" + value);
  }else{
    display.value += value;
  }
  tocar();
}
function calculate(){
  var vazio = document.getElementById("display");
  if(vazio.value === ""){
    alert("vazio");
  }else{
    try {
      var expressaoPre = document.getElementById("display").value;
      document.getElementById("conta").value = expressaoPre;
      var expressao = traduzir(expressaoPre);
      var resultado = eval(expressao);      
      document.getElementById("display").value = resultado;
      registraHistorico();
      tocar();
    } catch (e) {
      document.getElementById("display").value = "Erro";
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
  tocar();
}
/*    Função para limpar somente os campos display e conta    */
function limparDisplay(){
  document.getElementById("display").value = "";
  document.getElementById("conta").value = "";
  tocar();
}
/*    Função para apagar o último caracter escrito    */
function backspace() {
  var input = document.getElementById("display");
  input.value = input.value.slice(0, -1);
  tocar();
}
/*    Função para tocar som nas teclas    */
function tocar(){
  var audio = document.getElementById("somTeclas");
  audio.currentTime = 0;
  audio.play();
}
/*    Função para guardar o valor no display na memória    */
function memoria(){
  document.getElementById("memoria").value = document.getElementById("display").value;
  tocar();
}
/*    Função para usar o valor na memória    */
function usarMemoria(){
  document.getElementById("display").value += document.getElementById("memoria").value;
  tocar();
}
/*    Função para registrar as operações no histórico    */
function registraHistorico(){
  document.getElementById("historico").value += (document.getElementById("conta").value) + "=" + (document.getElementById("display").value) + "\n";
}
/*    Função para alternar o modo de visualização do histórico    */
function alternarDiv(divAlvo){
  var div = document.getElementById(divAlvo);
  div.classList.contains("naoMostrar") ? mostrarDiv(divAlvo) : esconderDiv(divAlvo);
}
/*    Função para alternar o som das teclas    */
function mutar(){
  var audio = document.getElementById("somTeclas");
  audio.muted = !audio.muted;
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
