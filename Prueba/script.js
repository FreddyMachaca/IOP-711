// Función para generar números aleatorios exponenciales
function generateExponential(lambda) {
    return -Math.log(1 - Math.random()) / lambda;
  }
  
  // Simulación del sistema de colas
  function simulateQueueSystem(event) {
    event.preventDefault(); // Evitar que se envíe el formulario y se recargue la página
  
    // Obtener los valores del formulario
    const lambda = parseFloat(document.getElementById('lambda').value);
    const mu = parseFloat(document.getElementById('mu').value);
    const s = parseInt(document.getElementById('s').value);
    const simulationTime = parseInt(document.getElementById('simulationTime').value);
  
    let time = 0; // Tiempo de simulación
    let customersInSystem = 0; // Número de clientes en el sistema
    let customersInQueue = 0; // Número de clientes en la cola
    let customersProcessed = 0; // Número de clientes atendidos
  
    while (time < simulationTime) {
      const arrivalTime = generateExponential(lambda); // Generar tiempo de llegada de un cliente
      const serviceTime = generateExponential(mu); // Generar tiempo de servicio para un cliente
  
      if (arrivalTime < serviceTime) {
        // El cliente llega antes de que se complete el servicio actual
        if (customersInSystem < s) {
          // Hay servidores disponibles para atender al cliente
          customersInSystem++;
          customersProcessed++;
        } else {
          // No hay servidores disponibles, el cliente se pone en cola
          customersInQueue++;
        }
      } else {
        // El servicio actual se completa antes de que llegue el próximo cliente
        if (customersInQueue > 0) {
          // Hay clientes en cola esperando
          customersInQueue--;
          customersProcessed++;
        } else {
          // No hay clientes en cola, un servidor queda disponible
          customersInSystem--;
          customersProcessed++;
        }
      }
  
      time += Math.min(arrivalTime, serviceTime); // Avanzar en el tiempo
    }
  
    const averageCustomersInSystem = customersProcessed / simulationTime;
    const averageCustomersInQueue = customersInQueue / simulationTime;

// Mostrar los resultados en el HTML
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = `<p>Clientes promedio en el sistema: ${averageCustomersInSystem}</p> <p>Clientes promedio en la cola: ${averageCustomersInQueue}</p>`; 
}

// Escuchar el evento 'submit' del formulario y llamar a la función simulateQueueSystem
const queueForm = document.getElementById('queueForm');
queueForm.addEventListener('submit', simulateQueueSystem);