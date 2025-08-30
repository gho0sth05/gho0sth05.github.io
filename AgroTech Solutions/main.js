  // Simulación de sensores
    const sensorList = document.getElementById('sensor-list');
    const sensorForm = document.getElementById('sensor-form');
    const sensorNameInput = document.getElementById('sensor-name');
    const sensorTypeSelect = document.getElementById('sensor-type');

    let sensors = [];

    function renderSensors() {
      sensorList.innerHTML = '';
      sensors.forEach((sensor, index) => {
        const tr = document.createElement('tr');
        tr.className = 'border border-blue-300 hover:bg-blue-50 transition';

        tr.innerHTML = `
          <td class="p-3 border border-blue-300">${sensor.name}</td>
          <td class="p-3 border border-blue-300">${sensor.type}</td>
          <td class="p-3 border border-blue-300 space-x-2">
            <button class="text-blue-600 hover:underline" onclick="editSensor(${index})">Editar</button>
            <button class="text-red-600 hover:underline" onclick="deleteSensor(${index})">Eliminar</button>
          </td>
        `;
        sensorList.appendChild(tr);
      });
    }

    function editSensor(index) {
      const sensor = sensors[index];
      sensorNameInput.value = sensor.name;
      sensorTypeSelect.value = sensor.type;
      sensorForm.dataset.editIndex = index;
      sensorForm.querySelector('button').textContent = 'Guardar Cambios';
    }

    function deleteSensor(index) {
      if (confirm(`¿Eliminar sensor "${sensors[index].name}"?`)) {
        sensors.splice(index, 1);
        renderSensors();
      }
    }

    sensorForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = sensorNameInput.value.trim();
      const type = sensorTypeSelect.value;

      if (!name || !type) return alert('Por favor, complete todos los campos.');

      if (sensorForm.dataset.editIndex !== undefined) {
        // Editar sensor
        sensors[sensorForm.dataset.editIndex] = { name, type };
        delete sensorForm.dataset.editIndex;
        sensorForm.querySelector('button').textContent = 'Agregar Sensor';
      } else {
        // Agregar sensor
        sensors.push({ name, type });
      }

      sensorForm.reset();
      renderSensors();
    });

    renderSensors();

    // Simulación de alertas
    const alertContainer = document.getElementById('alert-container');
    const triggerAlertBtn = document.getElementById('trigger-alert');

    triggerAlertBtn.addEventListener('click', () => {
      alertContainer.classList.remove('hidden');
      // Opcional: ocultar después de 8 segundos
      setTimeout(() => {
        alertContainer.classList.add('hidden');
      }, 8000);
    });

    // Simulación dinámica de métricas (opcional)
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomFloat(min, max, decimals = 1) {
      return (Math.random() * (max - min) + min).toFixed(decimals);
    }

    function updateMetrics() {
      const humedad = randomInt(30, 70);
      const temperatura = randomInt(18, 35);
      const ph = randomFloat(5.5, 7.5);

      document.getElementById('humedad-value').textContent = humedad + '%';
      document.getElementById('temperatura-value').textContent = temperatura + '°C';
      document.getElementById('ph-value').textContent = ph;

      // Si humedad < 40 o > 60, mostrar alerta automáticamente (opcional)
      if (humedad < 40 || humedad > 60) {
        alertContainer.classList.remove('hidden');
        setTimeout(() => alertContainer.classList.add('hidden'), 8000);
      }
    }

    // Actualizar métricas cada 10 segundos
    setInterval(updateMetrics, 10000);
    updateMetrics();
 const authModal = document.getElementById('auth-modal');
const openAuthModalBtn = document.getElementById('open-auth-modal');
const closeAuthModalBtn = document.getElementById('close-auth-modal');
const mainContent = document.querySelector('main');
const authForm = document.getElementById('auth-form');

openAuthModalBtn.addEventListener('click', () => {
  authModal.classList.remove('hidden');
});

closeAuthModalBtn.addEventListener('click', () => {
  authModal.classList.add('hidden');
});

authForm.addEventListener('submit', e => {
  e.preventDefault();
  authModal.classList.add('hidden');
  mainContent.classList.remove('hidden');
});