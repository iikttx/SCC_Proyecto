
async function verificarAutenticacion() {
    const token = localStorage.getItem('token');

    if (!token) {
        // No hay token, redirigir a login
        window.location.href = '/pages/login.html';
        return;
    }

    try {
        const res = await fetch('/api/usuarios/perfil', {
            headers: { Authorization: 'Bearer ' + token }
        });

        if (!res.ok) {
            // Token inválido o expirado → redirigir al login
            localStorage.removeItem('token');
            window.location.href = '/pages/login.html';
            return;
        }

        const user = await res.json();
    } catch (error) {
        console.error('❌ Error al verificar autenticación:', error);
        localStorage.removeItem('token');
        window.location.href = '/pages/login.html';
    }
}

// Ejecutar verificación al cargar la página
verificarAutenticacion();
