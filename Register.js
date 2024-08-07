document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const togglePassword = document.getElementById('toggle-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });

    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        toggleConfirmPassword.classList.toggle('fa-eye-slash');
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = registerForm.nombre.value;
        const apellido = registerForm.apellido.value;
        const usuario = registerForm.usuario.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm['confirm-password'].value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push({ nombre, apellido, usuario, email, password });
        localStorage.setItem('clientes', JSON.stringify(clientes));

        alert('Registro Exitoso');
        window.location.href = 'index.html';
    });
});
