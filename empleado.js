document.addEventListener('DOMContentLoaded', () => {
    const tablaTurnos = document.getElementById('tabla-turnos');
    const logoutButton = document.getElementById('logout');

    // Manejo de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }

    // Cargar turnos desde el localStorage
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    asignarNumeroTurno(turnos);
    mostrarTurnos(turnos);

    function asignarNumeroTurno(turnos) {
        turnos.forEach((turno, index) => {
            if (!turno.numero) {
                turno.numero = index + 1; // Asignar número de turno
            }
        });
        localStorage.setItem('turnos', JSON.stringify(turnos));
    }

    function mostrarTurnos(turnos) {
        tablaTurnos.innerHTML = '';
        if (turnos.length === 0) {
            tablaTurnos.innerHTML = '<tr><td colspan="13">No hay turnos disponibles.</td></tr>';
        } else {
            // Ordenar turnos por número de turno
            turnos.sort((a, b) => a.numero - b.numero);

            turnos.forEach(turno => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${turno.numero}</td>
                    <td>${turno.nombre}</td>
                    <td>${turno.apellido}</td>
                    <td>${turno.modelo}</td>
                    <td>${turno.patente}</td>
                    <td>${turno.color}</td>
                    <td>${turno.fecha}</td>
                    <td>${turno.horario}</td>
                    <td>${turno.telefono}</td>
                    <td>${turno.tipoLavado}</td>
                    <td><button class="btn btn-success" onclick="cambiarEstadoTurno(${turno.numero}, 'Aceptado')">Aceptar</button></td>
                    <td><button class="btn btn-danger" onclick="confirmarRechazoTurno(${turno.numero})">Rechazar</button></td>
                    <td><button class="btn btn-warning" onclick="finalizarTurno(${turno.numero})">Finalizó</button></td>
                `;
                tablaTurnos.appendChild(row);
            });
        }
    }

    window.confirmarRechazoTurno = function(numero) {
        if (confirm('¿Está seguro que desea rechazar el turno?')) {
            cambiarEstadoTurno(numero, 'Rechazado');
        }
    }

    window.cambiarEstadoTurno = function(numero, nuevoEstado) {
        const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        const turnoIndex = turnos.findIndex(turno => turno.numero === numero);
        if (turnoIndex > -1) {
            if (nuevoEstado === 'Rechazado') {
                turnos.splice(turnoIndex, 1); // Eliminar el turno
            } else {
                turnos[turnoIndex].estado = nuevoEstado;
            }
            localStorage.setItem('turnos', JSON.stringify(turnos));
            mostrarTurnos(turnos);
        }
    }

    window.finalizarTurno = function(numero) {
        if (confirm('Ha finalizado el turno correctamente')) {
            const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
            const turnoIndex = turnos.findIndex(turno => turno.numero === numero);
            if (turnoIndex > -1) {
                turnos.splice(turnoIndex, 1); // Eliminar el turno
                localStorage.setItem('turnos', JSON.stringify(turnos));
                mostrarTurnos(turnos);
            }
        }
    }
});






