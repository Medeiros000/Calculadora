
function enviarParaDisplay(value){
  document.getElementById("display").value += value;
  tocar();
}
  
function calculate(){
  var vazio = document.getElementById("display");
  if(vazio.value === ""){
    alert("Please select");
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
function limparTudo(){
  document.getElementById("display").value = "";
  document.getElementById("conta").value = "";
  document.getElementById("memoria").value = "";
  document.getElementById("historico").value = "";
  tocar();
}
function limparDisplay(){
  document.getElementById("display").value = "";
  document.getElementById("conta").value = "";
}
function backspace() {
  var input = document.getElementById("display");
  input.value = input.value.slice(0, -1);
  tocar();
}
function tocar(){
  var audio = document.getElementById("somTeclas");
  audio.currentTime = 0;
  audio.play();
}
function memoria(){
  document.getElementById("memoria").value = document.getElementById("display").value;
  tocar();
}
function usarMemoria(){
  document.getElementById("display").value += document.getElementById("memoria").value;
  tocar();
}
function registraHistorico(){
  document.getElementById("historico").value += (document.getElementById("conta").value) + "=" + (document.getElementById("display").value) + "\n";
}
function alternarDiv(){
  var div = document.getElementById("rodape");
  div.classList.contains("naoMostrar") ? mostrarDiv("rodape") : esconderDiv("rodape");
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
function mutar(){
  var audio = document.getElementById("somTeclas");
  audio.muted = !audio.muted;
}
function onoff(){
  var div = document.getElementById("on");
  div.classList.contains("naoMostrar") ? mostrarDiv("on") : esconderDiv("on");
  limparTudo();
}

function cinza(){
  const botoes = document.querySelectorAll("button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].style.filter = "contrast()";
  }
}
function nocinza(){
  const botoes = document.querySelectorAll("button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].style.filter = "contrast(40%)";
  }
}
/* Função em testes     
let checkConta = document.getElementById("conta");
let checkDisplay = document.getElementById("display");
checkDisplay.addEventListener("input", function() {
    if (checkConta.value == "") {
    }else{
      limparDisplay();
    }
    console.log(checkConta.value);
});
*/