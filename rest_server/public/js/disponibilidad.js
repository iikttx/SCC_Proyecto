// public/js/disponibilidad.js
 const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/pages/login.html";
    }

    function fetchConToken(url, options = {}) {
      const headers = options.headers || {};
      headers["Authorization"] = `Bearer ${token}`;
      return fetch(url, { ...options, headers });
    }
// Espera a que el layout se inyecte antes de inicializar
window.addEventListener('DOMContentLoaded', () => {
  


      // Si pasa la verificación, carga el layout e inventarios
      fetch('/pages/layout.html')
        .then(res => res.text())
        .then(html => {
          document.getElementById('layout-placeholder').innerHTML = html;
          inicializarEventos();
          cargarInventarios(token);
        })
        .catch(err => console.error('Error al cargar layout:', err));
    });



// ===========================================
// FUNCIONES DE INVENTARIO
// ===========================================

function inicializarEventos() {
  document.getElementById('btnBorrarFiltros').addEventListener('click', borrarFiltros);
  document.getElementById('filtroTipo').addEventListener('change', filtrarInventarios);
  document.getElementById('filtroDisponibilidad').addEventListener('change', filtrarInventarios);
}

function cargarInventarios(token) {
  fetchConToken('/api/inventario/inventarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => mostrarInventarios(data))
    .catch(err => console.error('Error al cargar inventarios:', err));
}

function filtrarInventarios() {
  const token = localStorage.getItem('token');
  const filtroTipo = document.getElementById('filtroTipo').value.toLowerCase();
  const filtroDisponibilidad = document.getElementById('filtroDisponibilidad').value.toLowerCase();

  fetchConToken('/api/inventario/inventarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const filtrados = data.filter(inv => {
        const tipoMatch = !filtroTipo || inv.tipo_nombre.toLowerCase() === filtroTipo;
        const dispMatch = !filtroDisponibilidad || inv.estado_nombre.toLowerCase() === filtroDisponibilidad;
        return tipoMatch && dispMatch;
      });
      mostrarInventarios(filtrados);
    })
    .catch(err => console.error('Error al filtrar inventarios:', err));
}

function borrarFiltros() {
  document.getElementById('filtroTipo').value = '';
  document.getElementById('filtroDisponibilidad').value = '';
  const token = localStorage.getItem('token');
  cargarInventarios(token);
}

function mostrarInventarios(inventarios) {
  const tbody = document.getElementById('tablaInventariosBody');
  tbody.innerHTML = '';
  inventarios.forEach(inv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${inv.id}</td>
      <td>${inv.modelo}</td>
      <td>${inv.marca}</td>
      <td>${inv.estado}</td>
      <td>${inv.num_serie}</td>
      <td>${inv.descripcion}</td>
      <td>${inv.tipo_nombre}</td>
      <td>${inv.estado_nombre}</td>
    `;
    tbody.appendChild(tr);
  });
}
