document.addEventListener('DOMContentLoaded', () => {
    const consultaForm = document.getElementById('consulta-form');
    const turnoForm = document.getElementById('turno-form');
    const logoutButton = document.getElementById('logout');
    const cardDeckServicios = document.getElementById('card-deck-servicios');
    
   // Inicializamos los servicios si no existen en localStorage
   // Hardcoding de los servicios con las rutas correctas
   const servicios = [
    {titulo: 'Lavado Clásico', precio: '100', imagen: 'ruta/a/clasico.jpg', pagina: 'clasico.html'},
    {titulo: 'Lavado Full', precio: '200', imagen: 'ruta/a/full.jpg', pagina: 'full.html'},
    {titulo: 'Lavado Premium', precio: '300', imagen: 'ruta/a/premium.jpg', pagina: 'premium.html'}
];

mostrarServicios(servicios);

function mostrarServicios(servicios) {
    cardDeckServicios.innerHTML = '';
    if (servicios.length === 0) {
        cardDeckServicios.innerHTML = '<p>No hay servicios disponibles.</p>';
    } else {
        servicios.forEach(servicio => {
            const card = document.createElement('div');
            card.classList.add('col-md-4');
            card.innerHTML = `
                <div class="card">
                    <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}" style="width: 287.2px; height: 191.46px;">
                    <div class="card-body">
                        <h5 class="card-title">${servicio.titulo}</h5>
                        <p class="card-text">Precio: ${servicio.precio}</p>
                        <a href="${servicio.pagina}" class="btn btn-primary-custom">Sacar Turno</a>
                    </div>
                </div>
            `;
            cardDeckServicios.appendChild(card);
        });
    }
}
    // Manejo de formulario de consulta
    if (consultaForm) {
        consultaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Consulta enviada con éxito');
            consultaForm.reset();
        });
    }

    // Manejo de formulario de turno
    if (turnoForm) {
        turnoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const tipoLavado = document.querySelector('body').getAttribute('data-servicio');
            const patente = turnoForm.querySelector('input[name="patente"]').value;
            const modelo = turnoForm.querySelector('input[name="modelo"]').value;
            const color = turnoForm.querySelector('input[name="color"]').value;
            const nombre = turnoForm.querySelector('input[name="nombre"]').value;
            const apellido = turnoForm.querySelector('input[name="apellido"]').value;
            const telefono = turnoForm.querySelector('input[name="telefono"]').value;
            const horario = turnoForm.querySelector('input[name="horario"]').value;
            const fecha = turnoForm.querySelector('input[name="fecha"]').value;

            const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
            const numero = turnos.length + 1;

            const turno = {
                numero,
                tipoLavado,
                patente,
                modelo,
                color,
                nombre,
                apellido,
                telefono,
                horario,
                fecha,
                estado: 'Pendiente'
            };

            turnos.push(turno);
            localStorage.setItem('turnos', JSON.stringify(turnos));
            alert('Turno solicitado con éxito');
            turnoForm.reset();
            mostrarTurnosCliente(turnos.filter(t => t.tipoLavado === tipoLavado));
        });

        // Mostrar los turnos del servicio al cargar la página
        const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        const tipoLavado = document.querySelector('body').getAttribute('data-servicio');
        mostrarTurnosCliente(turnos.filter(t => t.tipoLavado === tipoLavado));
    }

    function mostrarTurnosCliente(turnos) {
        const estadoTurno = document.getElementById('estado-turno');
        estadoTurno.innerHTML = '';
        turnos.forEach(turno => {
            const turnoDiv = document.createElement('div');
            turnoDiv.textContent = `Turno para ${turno.nombre} ${turno.apellido} - ${turno.tipoLavado} - Estado: ${turno.estado} - Fecha: ${turno.fecha} - Hora: ${turno.horario}`;
            estadoTurno.appendChild(turnoDiv);
        });
    }

    // Manejo de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});









document.addEventListener('DOMContentLoaded', () => {
    
});
