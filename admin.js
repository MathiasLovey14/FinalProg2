document.addEventListener('DOMContentLoaded', () => {
    const tablaTurnos = document.getElementById('tabla-turnos');
    const tablaEmpleados = document.getElementById('tabla-empleados');
    const empleadoForm = document.getElementById('empleado-form');
    const logoutButton = document.getElementById('logout');
    const agregarServicioButton = document.getElementById('agregar-servicio');
    const modal = document.getElementById('modal-agregar-servicio');
    const closeModal = document.getElementsByClassName('close')[0];
    const formAgregarServicio = document.getElementById('form-agregar-servicio');
    const cardDeckServicios = document.getElementById('card-deck-servicios');

    // Manejo de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }

    // Manejo de turnos
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    mostrarTurnos(turnos);

    function mostrarTurnos(turnos) {
        tablaTurnos.innerHTML = '';
        if (turnos.length === 0) {
            tablaTurnos.innerHTML = '<tr><td colspan="13">No hay turnos disponibles.</td></tr>';
        } else {
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
                    <td><button class="btn btn-success-custom" onclick="cambiarEstadoTurno(${turno.numero}, 'Aceptado')">Aceptar</button></td>
                    <td><button class="btn btn-danger-custom" onclick="confirmarRechazoTurno(${turno.numero})">Rechazar</button></td>
                    <td><button class="btn btn-warning-custom" onclick="finalizarTurno(${turno.numero})">Finalizó</button></td>
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
                turnos.splice(turnoIndex, 1); 
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
                turnos.splice(turnoIndex, 1); 
                localStorage.setItem('turnos', JSON.stringify(turnos));
                mostrarTurnos(turnos);
            }
        }
    }

    // Manejo de empleados
    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
    mostrarEmpleados(empleados);

    empleadoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoEmpleado = {
            nombre: empleadoForm.nombre.value,
            apellido: empleadoForm.apellido.value,
            direccion: empleadoForm.direccion.value,
            dni: empleadoForm.dni.value,
            usuario: empleadoForm.usuario.value,
            email: empleadoForm.email.value,
            password: empleadoForm.password.value
        };

        if (!nuevoEmpleado.email.endsWith('@lavaderotuc.com')) {
            alert('El email debe terminar con @lavaderotuc.com');
            return;
        }

        empleados.push(nuevoEmpleado);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        mostrarEmpleados(empleados);
        empleadoForm.reset();
    });

    function mostrarEmpleados(empleados) {
        tablaEmpleados.innerHTML = '';
        if (empleados.length === 0) {
            tablaEmpleados.innerHTML = '<tr><td colspan="7">No hay empleados disponibles.</td></tr>';
        } else {
            empleados.forEach((empleado, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${empleado.nombre}</td>
                    <td>${empleado.apellido}</td>
                    <td>${empleado.direccion}</td>
                    <td>${empleado.dni}</td>
                    <td>${empleado.usuario}</td>
                    <td>${empleado.email}</td>
                    <td><button class="btn btn-danger-custom" onclick="eliminarEmpleado(${index})">Eliminar</button></td>
                `;
                tablaEmpleados.appendChild(row);
            });
        }
    }

    window.eliminarEmpleado = function(index) {
        empleados.splice(index, 1);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        mostrarEmpleados(empleados);
    }

    // Manejo de servicios
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [
        {titulo: 'Lavado Clásico', precio: '100', imagen: 'ruta/a/clasico.jpg', pagina: 'clasico.html'},
        {titulo: 'Lavado Full', precio: '200', imagen: 'ruta/a/full.jpg', pagina: 'full.html'},
        {titulo: 'Lavado Premium', precio: '300', imagen: 'ruta/a/premium.jpg', pagina: 'premium.html'}
    ];
    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarServicios(servicios);

    agregarServicioButton.addEventListener('click', () => {
        modal.style.display = "block";
    });

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    formAgregarServicio.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoServicio = {
            titulo: document.getElementById('titulo-servicio').value,
            precio: document.getElementById('precio-servicio').value,
            imagen: document.getElementById('imagen-servicio').files[0] ? URL.createObjectURL(document.getElementById('imagen-servicio').files[0]) : '',
            pagina: document.getElementById('titulo-servicio').value.toLowerCase().replace(' ', '-') + '.html'
        };

        servicios.push(nuevoServicio);
        localStorage.setItem('servicios', JSON.stringify(servicios));
        mostrarServicios(servicios);
        sincronizarServiciosConInicio();
        modal.style.display = "none";
        formAgregarServicio.reset();
    });

    function mostrarServicios(servicios) {
        cardDeckServicios.innerHTML = '';
        if (servicios.length === 0) {
            cardDeckServicios.innerHTML = '<p>No hay servicios disponibles.</p>';
        } else {
            servicios.forEach((servicio, index) => {
                const card = document.createElement('div');
                card.classList.add('col-md-4');
                card.innerHTML = `
                    <div class="card">
                        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}" style="width: 287.2px; height: 191.46px;">
                        <div class="card-body">
                            <h5 class="card-title">${servicio.titulo}</h5>
                            <p class="card-text">Precio: ${servicio.precio}</p>
                            <button class="btn btn-danger-custom" onclick="eliminarServicio(${index})">Eliminar</button>
                            <button class="btn btn-warning-custom" onclick="editarServicio(${index})">Editar</button>
                        </div>
                    </div>
                `;
                cardDeckServicios.appendChild(card);
            });
        }
    }

    window.eliminarServicio = function(index) {
        servicios.splice(index, 1);
        localStorage.setItem('servicios', JSON.stringify(servicios));
        mostrarServicios(servicios);
        sincronizarServiciosConInicio();
    }

    window.editarServicio = function(index) {
        const servicio = servicios[index];
        document.getElementById('titulo-servicio').value = servicio.titulo;
        document.getElementById('precio-servicio').value = servicio.precio;
        document.getElementById('imagen-servicio').value = ''; 

        modal.style.display = "block";

        formAgregarServicio.onsubmit = function(e) {
            e.preventDefault();
            servicio.titulo = document.getElementById('titulo-servicio').value;
            servicio.precio = document.getElementById('precio-servicio').value;
            if (document.getElementById('imagen-servicio').files[0]) {
                servicio.imagen = URL.createObjectURL(document.getElementById('imagen-servicio').files[0]);
            }

            servicio.pagina = servicio.titulo.toLowerCase().replace(' ', '-') + '.html';

            servicios[index] = servicio;
            localStorage.setItem('servicios', JSON.stringify(servicios));
            mostrarServicios(servicios);
            sincronizarServiciosConInicio();
            modal.style.display = "none";
            formAgregarServicio.reset();
            formAgregarServicio.onsubmit = agregarServicio;
        }
    }

    function agregarServicio(e) {
        e.preventDefault();
        const nuevoServicio = {
            titulo: document.getElementById('titulo-servicio').value,
            precio: document.getElementById('precio-servicio').value,
            imagen: document.getElementById('imagen-servicio').files[0] ? URL.createObjectURL(document.getElementById('imagen-servicio').files[0]) : '',
            pagina: document.getElementById('titulo-servicio').value.toLowerCase().replace(' ', '-') + '.html'
        };

        servicios.push(nuevoServicio);
        localStorage.setItem('servicios', JSON.stringify(servicios));
        mostrarServicios(servicios);
        sincronizarServiciosConInicio();
        modal.style.display = "none";
        formAgregarServicio.reset();
    }

    function sincronizarServiciosConInicio() {
        localStorage.setItem('servicios', JSON.stringify(servicios));
    }

    // Sincronizar y mostrar los servicios iniciales
    sincronizarServiciosConInicio();
    mostrarServicios(servicios);
});
