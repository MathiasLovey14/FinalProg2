document.addEventListener('DOMContentLoaded', () => {
    const formTurno = document.getElementById('form-turno');

    formTurno.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nuevoTurno = {
            numero: Date.now(),
            nombre: formTurno.nombre.value,
            apellido: formTurno.apellido.value,
            modelo: formTurno.modelo.value,
            patente: formTurno.patente.value,
            color: formTurno.color.value,
            fecha: formTurno.fecha.value,
            horario: formTurno.horario.value,
            telefono: formTurno.telefono.value,
            tipoLavado: document.title.split(' ')[1] // Clásico, Full, Premium
        };

        let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        turnos.push(nuevoTurno);
        localStorage.setItem('turnos', JSON.stringify(turnos));

        formTurno.reset();
        alert('Turno enviado exitosamente');
    });
});
