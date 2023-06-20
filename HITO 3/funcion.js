// Variable global para contar el número de cambios realizados
var contadorCambios = 0;

// Timer para iniciar la función de voltear cartas después de 3 segundos
window.setTimeout(voltearCartas, 3000);

// Arreglo con imágenes
var lista = [
  "Cartas/Ac.jpg", "Cartas/2c.jpg", "Cartas/3c.jpg", "Cartas/4c.jpg", "Cartas/5c.jpg", "Cartas/6c.jpg", "Cartas/7c.jpg", "Cartas/8c.jpg", "Cartas/9c.jpg", "Cartas/Dc.jpg", "Cartas/Jc.jpg", "Cartas/Qc.jpg", "Cartas/Kc.jpg",
  "Cartas/Ae.jpg", "Cartas/2e.jpg", "Cartas/3e.jpg", "Cartas/4e.jpg", "Cartas/5e.jpg", "Cartas/6e.jpg", "Cartas/7e.jpg", "Cartas/8e.jpg", "Cartas/9e.jpg", "Cartas/De.jpg", "Cartas/Je.jpg", "Cartas/Qe.jpg", "Cartas/Ke.jpg",
  "Cartas/Ad.jpg", "Cartas/2d.jpg", "Cartas/3d.jpg", "Cartas/4d.jpg", "Cartas/5d.jpg", "Cartas/6d.jpg", "Cartas/7d.jpg", "Cartas/8d.jpg", "Cartas/9d.jpg", "Cartas/Dd.jpg", "Cartas/Jd.jpg", "Cartas/Qd.jpg", "Cartas/Kd.jpg",
  "Cartas/At.jpg", "Cartas/2t.jpg", "Cartas/3t.jpg", "Cartas/4t.jpg", "Cartas/5t.jpg", "Cartas/6t.jpg", "Cartas/7t.jpg", "Cartas/8t.jpg", "Cartas/9t.jpg", "Cartas/Dt.jpg", "Cartas/Jt.jpg", "Cartas/Qt.jpg", "Cartas/Kt.jpg"
];

// Función para generar números aleatorios
function numeroAleatorios(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Función para cambiar el mazo
function CambiarMazo() {
  let ganancia;
  const input = document.getElementById('money-input').value;
  let inputElement = parseFloat(input.replace(/[Bs,]/g, ''));
  const valorInput = inputElement;
  let resta;

  if (valorInput >= 10000) {
    resta = 1000;
  } else {
    resta = 10;
  }

  ganancia = valorInput - resta;
  // Volver a formatear el resultado como una cadena de moneda
  let resultadoFormateado = 'Bs ' + ganancia.toLocaleString();
  // Actualizar el valor del input con el resultado
  document.getElementById("money-input").value = resultadoFormateado;

  // Obtener los estados de los checkboxes
  const checkbox1 = document.getElementById("checkCarta1");
  const checkbox2 = document.getElementById("checkCarta2");
  const checkbox3 = document.getElementById("checkCarta3");
  const checkbox4 = document.getElementById("checkCarta4");
  const checkbox5 = document.getElementById("checkCarta5");

  // Verificar si todos los checkboxes están desactivados
  if (!checkbox1.checked && !checkbox2.checked && !checkbox3.checked && !checkbox4.checked && !checkbox5.checked) {
    // Cambiar todas las cartas
    voltearCartas();
  } else {
    // Llamar a esta función si algún checkbox está activado
    evaluarCheckbox();
  }

  contadorCambios++;
  console.log(contadorCambios);
  var boton = document.getElementById("Cambio");
  if (contadorCambios >= 1) {
    boton.disabled = true;
  }
}

// Función para verificar el estado de los checkboxes
function evaluarCheckbox() {
  // Recorrer cada uno de los checkboxes
  for (var i = 1; i <= 5; i++) {
    // Obtener id del checkbox dependiendo del número de la iteración
    var checkbox = document.getElementById("checkCarta" + i);
    // Obtener id de la imagen dependiendo del número de la iteración
    var contenedor = ("ii" + i);
    // Evaluación si el checkbox está activado
    if (checkbox.checked) {
      comprobar(contenedor);
    } else {

    }
  }
}

// Función para no repetir cartas
function comprobar(contenedor) {
  // Obtener dirección de la imagen = http://127.0.0.1:5500/8t.jpg
  urlcarta1 = document.getElementById("ii1").src;
  urlcarta2 = document.getElementById("ii2").src;
  urlcarta3 = document.getElementById("ii3").src;
  urlcarta4 = document.getElementById("ii4").src;
  urlcarta5 = document.getElementById("ii5").src;
  // Separar dirección y obtener el nombre de la imagen solamente "8t.jpg"
  var carta1 = urlcarta1.split("/").pop();
  var carta2 = urlcarta2.split("/").pop();
  var carta3 = urlcarta3.split("/").pop();
  var carta4 = urlcarta4.split("/").pop();
  var carta5 = urlcarta5.split("/").pop();
  // Generar nueva carta para cambiar
  nuevacarta = lista[numeroAleatorios(0, 50)];

  // Evaluar para que no se repita la carta
  switch (nuevacarta) {
    case carta1:
      comprobar(contenedor);
      break;
    case carta2:
      comprobar(contenedor);
      break;
    case carta3:
      comprobar(contenedor);
      break;
    case carta4:
      comprobar(contenedor);
      break;
    case carta5:
      comprobar(contenedor);
      break;
    default:
      document.getElementById(contenedor).src = nuevacarta;
  }
}

// Función que activa el checkbox al hacer clic sobre la imagen de la carta
function activarcheck(num) {
  var imagen = document.getElementById("ii" + num);

  if (imagen.classList.contains("clicked")) {
    imagen.classList.remove("clicked");
    document.getElementById("checkCarta" + num).checked = false;
  } else {
    imagen.classList.add("clicked");
    document.getElementById("checkCarta" + num).checked = true;
  }
}

// Función para evaluar la jugada y generar la tabla con los resultados
function EvaluarJugada() {
  // Verifica qué tipo de mano es
  contadorCambios = 0;
  console.log(contadorCambios);
  var boton = document.getElementById("Cambio");
  boton.disabled = false;

  let jugada;
  let ganancia;
  const input = document.getElementById('money-input').value;
  let inputElement = parseFloat(input.replace(/[Bs,]/g, ''));
  const valorInput = inputElement;

  let valores = [];
  let palos = [];

  // Obtener todas las imágenes por su ID
  var images = document.querySelectorAll("img");

  // Crear un arreglo vacío para almacenar los nombres
  var cartas = [];

  // Iterar sobre cada imagen y obtener su nombre sin la extensión ".jpg"
  images.forEach(function (image) {
    var nombre = image.src.split('/').pop().split('.')[0];
    cartas.push(nombre);
  });

  // El arreglo 'cartas' ahora contiene los nombres de las imágenes sin la extensión ".jpg"
  console.log(cartas);

  // Separar los valores de las cartas y los palos
  valores = cartas.map(carta => carta.charAt(0));
  palos = cartas.map(carta => carta.charAt(1));

  // Variable de referencia para ordenar los valores en la siguiente función flecha
  const valoresOrdenados = '23456789DJQKA';

  // Ordenar los valores de las cartas de menor a mayor
  valores.sort((a, b) => {
    return valoresOrdenados.indexOf(a) - valoresOrdenados.indexOf(b);
  });
  console.log(valores);

  // Verificar la jugada
  if (valores[0] !== valores[1] && valores[1] !== valores[2] && valores[2] !== valores[3] && valores[3] !== valores[4]) {
    jugada = "Todos diferentes";
    ganancia = valorInput * 1;
  } else if (valores[0] === valores[1] || valores[1] === valores[2] || valores[2] === valores[3] || valores[3] === valores[4]) {
    jugada = "Un par";
    ganancia = valorInput * 2;
  } else if ((valores[0] === valores[1] && valores[2] === valores[3]) || (valores[0] === valores[1] && valores[3] === valores[4]) || (valores[1] === valores[2] && valores[3] === valores[4])) {
    jugada = "Dos pares";
    ganancia = valorInput * 3;
  } else if (valores[0] === valores[1] && valores[1] === valores[2]) {
    jugada = "Tercia";
    ganancia = valorInput * 4;
  } else if ((valores[0] === valores[1] && valores[2] === valores[3] && valores[3] === valores[4]) || (valores[0] === valores[1] && valores[1] === valores[2] && valores[3] === valores[4])) {
    jugada = "Full House";
    ganancia = valorInput * 5;
  } else if (valores[0] === valores[1] && valores[1] === valores[2] && valores[2] === valores[3]) {
    jugada = "Poker";
    ganancia = valorInput * 6;
  } else if (valores[0] === valores[1] && valores[1] === valores[2] && valores[2] === valores[3] && valores[3] === valores[4]) {
    jugada = "Quintilla";
    ganancia = valorInput * 7;
  } else {
    jugada = "Sin jugada";
    ganancia = valorInput * 0;
  }

  // Crear la tabla con los resultados
  var tabla = document.querySelector("table");
  tabla.innerHTML = "";
  var filaEncabezado = document.createElement("tr");
  var thCategoria = document.createElement("th");
  thCategoria.textContent = "Categoría";
  var thProbabilidad = document.createElement("th");
  thProbabilidad.textContent = "Probabilidad";
  var thEi = document.createElement("th");
  thEi.textContent = "Ei";
  filaEncabezado.appendChild(thCategoria);
  filaEncabezado.appendChild(thProbabilidad);
  filaEncabezado.appendChild(thEi);
  tabla.appendChild(filaEncabezado);

  var filaTodosDiferentes = document.createElement("tr");
  var tdTodosDiferentes = document.createElement("td");
  tdTodosDiferentes.textContent = "Todos diferentes";
  var tdProbabilidadTodosDiferentes = document.createElement("td");
  var probabilidadTodosDiferentes = 1 / 2598960;
  tdProbabilidadTodosDiferentes.textContent = probabilidadTodosDiferentes.toFixed(10);
  var tdEiTodosDiferentes = document.createElement("td");
  var EiTodosDiferentes = probabilidadTodosDiferentes * ganancia;
  tdEiTodosDiferentes.textContent = EiTodosDiferentes.toFixed(10);
  filaTodosDiferentes.appendChild(tdTodosDiferentes);
  filaTodosDiferentes.appendChild(tdProbabilidadTodosDiferentes);
  filaTodosDiferentes.appendChild(tdEiTodosDiferentes);
  tabla.appendChild(filaTodosDiferentes);

  var filaUnPar = document.createElement("tr");
  var tdUnPar = document.createElement("td");
  tdUnPar.textContent = "Un par";
  var tdProbabilidadUnPar = document.createElement("td");
  var probabilidadUnPar = 1 / 123552;
  tdProbabilidadUnPar.textContent = probabilidadUnPar.toFixed(10);
  var tdEiUnPar = document.createElement("td");
  var EiUnPar = probabilidadUnPar * ganancia;
  tdEiUnPar.textContent = EiUnPar.toFixed(10);
  filaUnPar.appendChild(tdUnPar);
  filaUnPar.appendChild(tdProbabilidadUnPar);
  filaUnPar.appendChild(tdEiUnPar);
  tabla.appendChild(filaUnPar);

  var filaDosPares = document.createElement("tr");
  var tdDosPares = document.createElement("td");
  tdDosPares.textContent = "Dos pares";
  var tdProbabilidadDosPares = document.createElement("td");
  var probabilidadDosPares = 1 / 123552;
  tdProbabilidadDosPares.textContent = probabilidadDosPares.toFixed(10);
  var tdEiDosPares = document.createElement("td");
  var EiDosPares = probabilidadDosPares * ganancia;
  tdEiDosPares.textContent = EiDosPares.toFixed(10);
  filaDosPares.appendChild(tdDosPares);
  filaDosPares.appendChild(tdProbabilidadDosPares);
  filaDosPares.appendChild(tdEiDosPares);
  tabla.appendChild(filaDosPares);

  var filaTercia = document.createElement("tr");
  var tdTercia = document.createElement("td");
  tdTercia.textContent = "Tercia";
  var tdProbabilidadTercia = document.createElement("td");
  var probabilidadTercia = 1 / 54912;
  tdProbabilidadTercia.textContent = probabilidadTercia.toFixed(10);
  var tdEiTercia = document.createElement("td");
  var EiTercia = probabilidadTercia * ganancia;
  tdEiTercia.textContent = EiTercia.toFixed(10);
  filaTercia.appendChild(tdTercia);
  filaTercia.appendChild(tdProbabilidadTercia);
  filaTercia.appendChild(tdEiTercia);
  tabla.appendChild(filaTercia);

  var filaFullHouse = document.createElement("tr");
  var tdFullHouse = document.createElement("td");
  tdFullHouse.textContent = "Full House";
  var tdProbabilidadFullHouse = document.createElement("td");
  var probabilidadFullHouse = 1 / 3744;
  tdProbabilidadFullHouse.textContent = probabilidadFullHouse.toFixed(10);
  var tdEiFullHouse = document.createElement("td");
  var EiFullHouse = probabilidadFullHouse * ganancia;
  tdEiFullHouse.textContent = EiFullHouse.toFixed(10);
  filaFullHouse.appendChild(tdFullHouse);
  filaFullHouse.appendChild(tdProbabilidadFullHouse);
  filaFullHouse.appendChild(tdEiFullHouse);
  tabla.appendChild(filaFullHouse);

  var filaPoker = document.createElement("tr");
  var tdPoker = document.createElement("td");
  tdPoker.textContent = "Poker";
  var tdProbabilidadPoker = document.createElement("td");
  var probabilidadPoker = 1 / 624;
  tdProbabilidadPoker.textContent = probabilidadPoker.toFixed(10);
  var tdEiPoker = document.createElement("td");
  var EiPoker = probabilidadPoker * ganancia;
  tdEiPoker.textContent = EiPoker.toFixed(10);
  filaPoker.appendChild(tdPoker);
  filaPoker.appendChild(tdProbabilidadPoker);
  filaPoker.appendChild(tdEiPoker);
  tabla.appendChild(filaPoker);

  var filaQuintilla = document.createElement("tr");
  var tdQuintilla = document.createElement("td");
  tdQuintilla.textContent = "Quintilla";
  var tdProbabilidadQuintilla = document.createElement("td");
  var probabilidadQuintilla = 1 / 2598960;
  tdProbabilidadQuintilla.textContent = probabilidadQuintilla.toFixed(10);
  var tdEiQuintilla = document.createElement("td");
  var EiQuintilla = probabilidadQuintilla * ganancia;
  tdEiQuintilla.textContent = EiQuintilla.toFixed(10);
  filaQuintilla.appendChild(tdQuintilla);
  filaQuintilla.appendChild(tdProbabilidadQuintilla);
  filaQuintilla.appendChild(tdEiQuintilla);
  tabla.appendChild(filaQuintilla);

  window.setTimeout(voltearCartas, 2500);
}

// Función de Alerta Ganadora
function Ganaste(jugada) {
  Swal.fire({
    title: '¡Ganaste! 🤑',
    text: 'Excelente jugada con ' + jugada,
    showConfirmButton: false,
    timer: 2000
  });
}

// Función de Alerta Perdedora
function Perdiste(perdio) {
  Swal.fire({
    Height: 200,
    Width: 30,
    title: '¡Perdiste! 😭',
    text: 'Perdiste por ' + perdio + '. -20 créditos',
    showConfirmButton: false,
    timer: 2000
  });
}

// Función de Alerta Te quedaste pobre
function sinDinero() {
  Swal.fire({
    icon: 'error',
    Height: 200,
    Width: 30,
    title: '¡Te quedaste sin créditos! 🤧',
    text: 'Ingresa más para seguir jugando',
    Intput: '',
    showConfirmButton: false,
    timer: 2000
  });
}

function voltearCartas() {
  comprobar("ii1");
  comprobar("ii2");
  comprobar("ii3");
  comprobar("ii4");
  comprobar("ii5");
}

// Función para comenzar a jugar
function jugar() {
  const game = document.getElementById("money-input").value;
  // Se evalúa el puntaje para saber si se puede seguir jugando
  if (game == "Bs 0") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Te quedaste sin créditos, volviendo a iniciar una nueva partida 😵!',
    });
    reiniciarPagina(game);
  } else {
    EvaluarJugada();
  }
}

// Función para Reiniciar la Partida
function nuevaPartida() {
  const game = document.getElementById("money-input").value;
  Swal.fire({
    title: 'Comenzando Nueva Partida...🤠',
    text: 'Se ha reiniciado la partida',
    showConfirmButton: false,
    timer: 1500
  });
  reiniciarPagina(game);
}

// Función para reiniciar la página
function reiniciarPagina(game) {
  // Reiniciar la página después de 1.5 segundos
  setTimeout(function () {
    location.reload();
  }, 1500);
}

// Eventos de clic en las cartas
document.getElementById("carta1").addEventListener("click", function () { activarcheck(1); });
document.getElementById("carta2").addEventListener("click", function () { activarcheck(2); });
document.getElementById("carta3").addEventListener("click", function () { activarcheck(3); });
document.getElementById("carta4").addEventListener("click", function () { activarcheck(4); });
document.getElementById("carta5").addEventListener("click", function () { activarcheck(5); });
