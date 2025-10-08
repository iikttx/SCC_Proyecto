// public/js/inventario.js

let tipos = [];
let estados = [];
let editarId = null;

// === Manejo de token y rol ===
const token = localStorage.getItem("token");

if (!token) {
  alert("No has iniciado sesión. Serás redirigido al inicio.");
  window.location.href = "pages/inicio.html";
}

// Decodificar JWT para obtener rol (si guardas rol en payload)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const payload = parseJwt(token);
const rol = payload?.rol;

if (rol !== "1") { // Solo administrador
  alert("No tienes permisos para acceder al inventario.");
  window.location.href = "pages/inicio.html";
}

// === Función genérica fetch con token ===
function fetchConToken(url, options = {}) {
  const headers = options.headers ? { ...options.headers } : {};
  headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";
  return fetch(url, { ...options, headers });
}

// Manejo de errores comunes (token inválido o sin permisos)
function manejarErrorAcceso(res) {
  if (res.status === 401) {
    alert("Sesión expirada o no autenticado. Inicia sesión nuevamente.");
    window.location.href = "pages/inicio.html";
  } else if (res.status === 403) {
    alert("No tienes permisos para acceder a este módulo.");
    window.location.href = "pages/inicio.html";
  }
}

// === Funciones de carga y CRUD ===

// Carga lista de tipos desde la API
async function cargarTipos() {
  try {
    const res = await fetch("/api/inventario/tipos");
    if (!res.ok) return manejarErrorAcceso(res);
    tipos = await res.json();
    const tipoSelect = document.getElementById('tipoSelect');
    tipoSelect.innerHTML = '<option value="">-- Selecciona un tipo --</option>';
    tipos.forEach(t => {
      tipoSelect.innerHTML += `<option value="${t.id_tipo}">${t.nombre}</option>`;
    });
  } catch (err) {
    console.error('Error cargando tipos:', err);
    alert('No se pudieron cargar los tipos');
  }
}

// Carga lista de estados desde la API
async function cargarEstados() {
  try {
    const res = await fetch("/api/inventario/estados");
    if (!res.ok) throw new Error("Error al cargar estados");
    estados = await res.json();
    const estadoSelect = document.getElementById('estadoSelect');
    estadoSelect.innerHTML = '<option value="">-- Selecciona un estado --</option>';
    estados.forEach(e => {
      estadoSelect.innerHTML += `<option value="${e.id_estado}">${e.nombre}</option>`;
    });
  } catch (err) {
    console.error('Error cargando estados:', err);
    alert('No se pudieron cargar los estados');
  }
}

// ... El resto de tus funciones (limpiarFormulario, toggleBotones, obtenerDatosFormulario, registrarInventario, actualizarInventario, eliminarInventario, cargarInventarios, editar, filtrarInventarios, borrarFiltros) deben **reemplazar todos los fetch por fetchConToken** y conservar la lógica

// Ejemplo:
async function registrarInventario() {
  const data = obtenerDatosFormulario();
  if (!data) return;
  try {
    const res = await fetchConToken("/api/inventario/create", {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (!res.ok) return manejarErrorAcceso(res);
    alert("Inventario registrado correctamente");
    limpiarFormulario();
    cargarInventarios();
  } catch (err) {
    console.error('Error al registrar:', err);
    alert("Error al registrar inventario");
  }
}

function obtenerDatosFormulario() {
  const tipo = parseInt(document.getElementById('tipoSelect').value);
  const estado = parseInt(document.getElementById('estadoSelect').value);

  if (!tipo || !estado) {
    alert("Por favor, selecciona un tipo y un estado válidos.");
    return null;
  }

  return {
    modelo: document.getElementById('modelo').value.trim(),
    marca: document.getElementById('marca').value.trim(),
    estado: document.getElementById('estadoTexto').value.trim(),
    num_serie: document.getElementById('numSerie').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    tipo: tipo,
    id_disponible: estado
  };
}

// Inicialización al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnRegistrar').addEventListener('click', registrarInventario);/* 
  document.getElementById('btnActualizar').addEventListener('click', actualizarInventario);
  document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);
  document.getElementById('btnCargarInventarios').addEventListener('click', cargarInventarios);
  document.getElementById('btnBorrarFiltros').addEventListener('click', borrarFiltros);
  document.getElementById('filtroTipo').addEventListener('change', filtrarInventarios);
  document.getElementById('filtroDisponibilidad').addEventListener('change', filtrarInventarios); */

  cargarTipos();
  cargarEstados();
  cargarInventarios();
});
