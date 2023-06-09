// Parámetros iniciales del sistema de colas
let lambda = 0; // Tasa de llegada promedio (clientes por hora)
let mu = 0; // Tasa de servicio promedio (clientes por hora)
const numServidores = 2; // Número de servidores disponibles
let solicitudCount = 0;

// Función para calcular los resultados y actualizar el panel
function calcularResultados() {
  // Cálculos de la teoría de colas
  const rho = lambda / (mu * numServidores);
  const utilizacion = rho / numServidores;
  const lq = (utilizacion * utilizacion) / (1 - utilizacion);
  const wq = lq / lambda;
  const w = wq + (1 / mu);
  const r = 1 / (mu * (1 - utilizacion));
  const n = lambda * r;
  const nq = lambda * wq;

  // Actualizar los elementos del panel con los resultados
  document.getElementById('lq').textContent = lq.toFixed(2);
  document.getElementById('wq').textContent = wq.toFixed(2);
  document.getElementById('w').textContent = w.toFixed(2);
  document.getElementById('n').textContent = n.toFixed(2);
  document.getElementById('nq').textContent = nq.toFixed(2);

  // Actualizar el estado de la cola
  const queueStatus = document.getElementById('status');
  if (utilizacion >= 1) {
    queueStatus.textContent = 'SATURADO';
    queueStatus.style.color = 'red';
  } else {
    queueStatus.textContent = 'NORMAL';
    queueStatus.style.color = 'green';
  }
}

// Función para capturar las solicitudes de reserva y actualizar los parámetros
function capturarReserva(tasaLlegada, tasaServicio) {
  lambda += tasaLlegada;
  mu += tasaServicio;
  solicitudCount++;

  // Actualizar contador de solicitudes
  document.getElementById('count').textContent = solicitudCount;

  // Calcular y actualizar los resultados
  calcularResultados();
}

// Agregar evento de clic a los botones de reserva
const reserveButtons = document.getElementsByClassName('reserve-btn');
for (let i = 0; i < reserveButtons.length; i++) {
  reserveButtons[i].addEventListener('click', function() {
    const packageElement = this.parentNode;
    const tasaLlegada = parseFloat(packageElement.querySelector('p:nth-child(1)').textContent.split(': ')[1]);
    const tasaServicio = parseFloat(packageElement.querySelector('p:nth-child(2)').textContent.split(': ')[1]);
    capturarReserva(tasaLlegada, tasaServicio);
  });
}
