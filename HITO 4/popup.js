// Obtener referencias a los elementos HTML
const card1Select = document.getElementById('card1');
const card2Select = document.getElementById('card2');
const card3Select = document.getElementById('card3');
const card4Select = document.getElementById('card4');
const card5Select = document.getElementById('card5');
const calcularButton = document.querySelector('button');
const limpiarButton = document.getElementById('limpiar');

// Asignar un controlador de eventos al botón "Calcular"
calcularButton.addEventListener('click', calcularProbabilidades);

// Asignar un controlador de eventos al botón "Limpiar"
limpiarButton.addEventListener('click', limpiarProbabilidad);

function calcularProbabilidades() {
  // Deshabilitar el botón mientras se realiza el cálculo
  calcularButton.disabled = true;

  // Mostrar mensaje de "Calculando"
  const resultadoDiv = document.createElement('div');
  resultadoDiv.textContent = 'Calculando...';
  resultadoDiv.id = 'resultado';
  document.body.appendChild(resultadoDiv);

  // Simulación del cálculo de probabilidades (espera 2 segundos)
  setTimeout(() => {
    // Obtener los valores de las cartas seleccionadas
    const carta1 = card1Select.value;
    const carta2 = card2Select.value;
    const carta3 = card3Select.value;
    const carta4 = card4Select.value;
    const carta5 = card5Select.value;

    // Lógica para calcular las probabilidades de ganar la mano de póker
    // En este ejemplo, se genera un valor de probabilidad aleatorio entre 0 y 1
    const probabilidad = Math.random();

    // Mostrar el resultado
    resultadoDiv.textContent = `La probabilidad de ganar la mano de póker es: ${probabilidad.toFixed(2)}`;

    // Habilitar el botón después de mostrar el resultado
    calcularButton.disabled = false;
  }, 2000);
}

function limpiarProbabilidad() {
  const resultadoDiv = document.getElementById('resultado');
  if (resultadoDiv) {
    resultadoDiv.remove();
  }
}
