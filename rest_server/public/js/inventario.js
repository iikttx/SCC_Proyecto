// ===================================
// VERIFICACIÓN DE PERFIL (ADMIN)
// ===================================
const token = localStorage.getItem("token");

if (!token) {
  alert("No has iniciado sesión. Serás redirigido.");
  window.location.href = "/pages/inicio.html";
}

/**
 * Decodifica un token JWT para extraer su contenido (payload).
 * @param {string} token El token JWT.
 * @returns {object|null} El payload del token o null si hay un error.
 */
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    return null;
  }
}

const payload = parseJwt(token);
// Asume que el rol de admin es '1'
const rol = payload?.rol;

if (rol !== "1") {
  alert("No tienes permisos de administrador para acceder a este módulo.");
  window.location.href = "/pages/inicio.html";
}

// ===================================
// LÓGICA DE LA PÁGINA DE INVENTARIO
// ===================================
let inventarios = [];
let editarId = null;

/**
 * Realiza una petición fetch añadiendo automáticamente el token de autorización.
 * @param {string} url La URL del endpoint.
 * @param {object} options Opciones adicionales para fetch (method, body, etc.).
 * @returns {Promise<Response>} La promesa de la respuesta de fetch.
 */
async function fetchConToken(url, options = {}) {
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers };
  return fetch(url, { ...options, headers });
}

/**
 * Maneja errores de acceso (401 No Autorizado, 403 Prohibido) redirigiendo al usuario.
 * @param {Response} res La respuesta de la petición fetch.
 */
function manejarErrorAcceso(res) {
  if (res.status === 401) {
    alert("Sesión expirada. Inicia sesión nuevamente.");
    window.location.href = "/pages/inicio.html";
  } else if (res.status === 403) {
    alert("No tienes permisos para realizar esta acción.");
  } else {
    alert(`Error inesperado: ${res.status}`);
  }
}

// --- Carga de Datos Inicial ---
async function cargarDatosIniciales() {
  try {
    const [tiposRes, estadosRes, inventariosRes] = await Promise.all([
      fetchConToken("/api/inventario/tipos"),
      fetchConToken("/api/inventario/estados"),
      fetchConToken("/api/inventario/inventarios")
    ]);

    if (!tiposRes.ok || !estadosRes.ok || !inventariosRes.ok) throw new Error("Error al cargar datos.");

    const tipos = await tiposRes.json();
    const estados = await estadosRes.json();
    inventarios = await inventariosRes.json();

    poblarSelects(tipos, estados);
    renderizarTabla(inventarios);
  } catch (error) {
    console.error("Fallo en la carga inicial:", error);
    alert("No se pudieron cargar los datos del inventario.");
  }
}

function poblarSelects(tipos, estados) {
  const tipoSelect = document.getElementById('tipoSelect');
  const filtroTipo = document.getElementById('filtroTipo');
  const estadoSelect = document.getElementById('estadoSelect');
  const filtroDisponibilidad = document.getElementById('filtroDisponibilidad');

  tipoSelect.innerHTML = '<option value="">-- Selecciona un tipo --</option>';
  filtroTipo.innerHTML = '<option value="">-- Todos los tipos --</option>';
  tipos.forEach(t => {
    tipoSelect.innerHTML += `<option value="${t.id_tipo}">${t.nombre}</option>`;
    filtroTipo.innerHTML += `<option value="${t.nombre}">${t.nombre}</option>`;
  });

  estadoSelect.innerHTML = '<option value="">-- Selecciona una disponibilidad --</option>';
  filtroDisponibilidad.innerHTML = '<option value="">-- Todas --</option>';
  estados.forEach(e => {
    estadoSelect.innerHTML += `<option value="${e.id_estado}">${e.nombre}</option>`;
    filtroDisponibilidad.innerHTML += `<option value="${e.nombre}">${e.nombre}</option>`;
  });
}

// --- Renderizado y Filtros ---
function renderizarTabla(datos) {
  const tbody = document.getElementById('tablaInventariosBody');
  tbody.innerHTML = '';
  datos.forEach(inv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${inv.id}</td>
      <td>${inv.modelo}</td>
      <td>${inv.marca}</td>
      <td>${inv.estado}</td>
      <td>${inv.num_serie}</td>
      <td>${inv.tipo_nombre}</td>
      <td><span class="badge bg-${inv.estado_nombre === 'Disponible' ? 'success' : 'warning'}">${inv.estado_nombre}</span></td>
      <td>
        <button class="btn btn-warning me-1" title="Editar" onclick="prepararEdicion(${inv.id})">
            <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-danger" title="Eliminar" onclick="eliminarInventario(${inv.id})">
            <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrarInventarios() {
    const filtroTipo = document.getElementById('filtroTipo').value.toLowerCase();
    const filtroDisp = document.getElementById('filtroDisponibilidad').value.toLowerCase();
    const datosFiltrados = inventarios.filter(inv => {
        const tipoOK = !filtroTipo || inv.tipo_nombre.toLowerCase() === filtroTipo;
        const dispOK = !filtroDisp || inv.estado_nombre.toLowerCase() === filtroDisp;
        return tipoOK && dispOK;
    });
    renderizarTabla(datosFiltrados);
}

function borrarFiltros() {
    document.getElementById('filtroTipo').value = '';
    document.getElementById('filtroDisponibilidad').value = '';
    renderizarTabla(inventarios);
}

// --- Funciones CRUD y de Formulario ---
function limpiarFormulario() {
  document.getElementById('formulario').reset();
  editarId = null;
  toggleBotones(false);
}

function toggleBotones(editando) {
  document.getElementById('btnRegistrar').style.display = editando ? 'none' : 'inline-block';
  document.getElementById('btnActualizar').style.display = editando ? 'inline-block' : 'none';
  document.getElementById('btnCancelar').style.display = editando ? 'inline-block' : 'none';
}

function obtenerDatosFormulario() {
  const data = {
    modelo: document.getElementById('modelo').value.trim(),
    marca: document.getElementById('marca').value.trim(),
    estado: document.getElementById('estadoTexto').value.trim(),
    num_serie: document.getElementById('numSerie').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    tipo: parseInt(document.getElementById('tipoSelect').value),
    id_disponible: parseInt(document.getElementById('estadoSelect').value)
  };

  if (!data.modelo || !data.marca || !data.tipo || !data.id_disponible) {
    alert("Los campos Modelo, Marca, Tipo y Disponibilidad son obligatorios.");
    return null;
  }
  return data;
}

async function registrarOActualizar() {
  const data = obtenerDatosFormulario();
  if (!data) return;

  let url, method, mensajeExito;

  if (editarId) {
    // Es una actualización
    url = "/api/inventario/update";
    method = "PUT";
    data.id = editarId;
    mensajeExito = "Equipo actualizado correctamente.";
  } else {
    // Es un registro nuevo
    url = "/api/inventario/create";
    method = "POST";
    mensajeExito = "Equipo registrado correctamente.";
  }

  try {
    const res = await fetchConToken(url, {
      method: method,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      manejarErrorAcceso(res);
      throw new Error("La petición falló.");
    }
    
    alert(mensajeExito);
    limpiarFormulario();
    await cargarDatosIniciales(); // Recargar todo para reflejar cambios
  } catch (error) {
    console.error(`Error al ${editarId ? 'actualizar' : 'registrar'}:`, error);
  }
}

function prepararEdicion(id) {
  const inv = inventarios.find(i => i.id === id);
  if (!inv) {
    alert("Error: No se encontró el equipo.");
    return;
  }
  document.getElementById('modelo').value = inv.modelo;
  document.getElementById('marca').value = inv.marca;
  document.getElementById('estadoTexto').value = inv.estado;
  document.getElementById('numSerie').value = inv.num_serie;
  document.getElementById('descripcion').value = inv.descripcion;
  document.getElementById('tipoSelect').value = inv.tipo; 
  document.getElementById('estadoSelect').value = inv.id_disponible;
  editarId = id;
  toggleBotones(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function eliminarInventario(id) {
    if (!confirm(`¿Estás seguro de eliminar el equipo con ID ${id}?`)) return;
    try {
        const res = await fetchConToken(`/api/inventario/delete/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            manejarErrorAcceso(res);
            throw new Error('No se pudo eliminar.');
        }
        alert('Equipo eliminado con éxito.');
        await cargarDatosIniciales(); // Recargar todo para reflejar cambios
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el equipo.");
    }
}

// --- INICIALIZACIÓN DE LA PÁGINA ---
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnRegistrar').addEventListener('click', registrarOActualizar);
  document.getElementById('btnActualizar').addEventListener('click', registrarOActualizar);
  document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);
  document.getElementById('btnBorrarFiltros').addEventListener('click', borrarFiltros);
  document.getElementById('filtroTipo').addEventListener('change', filtrarInventarios);
  document.getElementById('filtroDisponibilidad').addEventListener('change', filtrarInventarios);

  cargarDatosIniciales();
});