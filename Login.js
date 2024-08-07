document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
        const admin = { email: 'admin@gmail.com', password: '123456' };

        let user = clientes.find(cliente => cliente.email === email && cliente.password === password);
        let user2 = empleados.find(empleado => empleado.email === email && empleado.password === password);
        
        if (email === admin.email && password === admin.password) {
            alert('Acceso Exitoso');
            window.location.href = 'admin.html';
        } else if (user) {
            alert('Acceso Exitoso');
            window.location.href = 'inicio.html';
        } else if (user2) {
            alert('Acceso Exitoso');
            window.location.href = 'empleado.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});
