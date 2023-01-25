
function enviarParaDisplay(value){
  document.getElementById("display").value += value;
  tocar();
}
  
function calculate(){
  try {
    var expression = document.getElementById("display").value;
    document.getElementById("conta").value = expression;
    var resultado = eval(expression);
    document.getElementById("display").value = resultado;
    registraHistorico();
  } catch (e) {
    document.getElementById("display").value = "Erro";
  }
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
}
function backspace() {
  var input = document.getElementById("display");
  input.value = input.value.slice(0, -1);
}
function tocar(){
  var audio = document.getElementById("somTeclas");
  audio.currentTime = 0;
  audio.play();
}
function memoria(){
  document.getElementById("memoria").value = document.getElementById("display").value;
}
function usarMemoria(){
  document.getElementById("display").value += document.getElementById("memoria").value;
}
function registraHistorico(){
  document.getElementById("historico").value += (document.getElementById("conta").value) + "=" + (document.getElementById("display").value) + "\n";
}