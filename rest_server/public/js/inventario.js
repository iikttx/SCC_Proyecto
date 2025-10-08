// public/js/inventario.js

let tipos = [];
let estados = [];
let editarId = null;

// Recuperar token del localStorage
function getToken() {
  return localStorage.getItem("token");
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

// Carga lista de tipos desde la API
async function cargarTipos() {
  try {
    const res = await fetch("/api/inventario/tipos", {
      headers: { "Authorization": `Bearer ${getToken()}` }
    });
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
    const res = await fetch("/api/inventario/estados", {
      headers: { "Authorization": `Bearer ${getToken()}` }
    });
    if (!res.ok) return manejarErrorAcceso(res);
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

// Limpia el formulario y restablece estado de botones
function limpiarFormulario() {
  ['modelo','marca','estadoTexto','numSerie','descripcion','tipoSelect','estadoSelect'].forEach(id => {
    document.getElementById(id).value = '';
  });
  editarId = null;
  toggleBotones(false);
}

// Muestra/oculta botones en modo edición
function toggleBotones(editando) {
  document.getElementById('btnRegistrar').style.display = editando ? 'none' : 'inline-block';
  document.getElementById('btnActualizar').style.display = editando ? 'inline-block' : 'none';
  document.getElementById('btnCancelar').style.display = editando ? 'inline-block' : 'none';
}

// Recoge y valida datos del formulario
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

// Registrar nuevo inventario
async function registrarInventario() {
  const data = obtenerDatosFormulario();
  if (!data) return;
  try {
    const res = await fetch("/api/inventario/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
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

// Actualizar inventario existente
async function actualizarInventario() {
  if (!editarId) return;
  const data = obtenerDatosFormulario();
  if (!data) return;
  data.id = editarId;
  try {
    const res = await fetch("/api/inventario/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) return manejarErrorAcceso(res);
    alert("Inventario actualizado correctamente");
    limpiarFormulario();
    cargarInventarios();
  } catch (err) {
    console.error('Error al actualizar:', err);
    alert("Error al actualizar inventario");
  }
}

// Eliminar inventario por ID
async function eliminarInventario(id) {
  if (!confirm("¿Estás seguro de eliminar este inventario?")) return;
  try {
    const res = await fetch(`/api/inventario/delete/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${getToken()}` }
    });
    if (!res.ok) return manejarErrorAcceso(res);
    alert("Inventario eliminado correctamente");
    limpiarFormulario();
    cargarInventarios();
  } catch (err) {
    console.error('Error al eliminar:', err);
    alert("Error al eliminar inventario");
  }
}

// Carga y muestra todos los inventarios
async function cargarInventarios() {
  try {
    const res = await fetch("/api/inventario/inventarios", {
      headers: { "Authorization": `Bearer ${getToken()}` }
    });
    if (!res.ok) return manejarErrorAcceso(res);
    const data = await res.json();
    const tbody = document.getElementById('tablaInventariosBody');
    tbody.innerHTML = '';
    data.forEach(inv => {
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
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editar(${inv.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarInventario(${inv.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error al cargar inventarios:', err);
    alert("Error al obtener inventarios");
  }
}

// Rellenar formulario para edición
function editar(id) {
  fetch("/api/inventario/inventarios", {
    headers: { "Authorization": `Bearer ${getToken()}` }
  })
  .then(res => {
    if (!res.ok) return manejarErrorAcceso(res);
    return res.json();
  })
  .then(data => {
    const inv = data.find(i => i.id === id);
    if (!inv) return alert("Inventario no encontrado");
    document.getElementById('modelo').value      = inv.modelo;
    document.getElementById('marca').value       = inv.marca;
    document.getElementById('estadoTexto').value = inv.estado;
    document.getElementById('numSerie').value    = inv.num_serie;
    document.getElementById('descripcion').value = inv.descripcion;
    document.getElementById('tipoSelect').value  = inv.tipo;
    document.getElementById('estadoSelect').value= inv.id_disponible;
    editarId = id;
    toggleBotones(true);
  });
}

// Filtrado en cliente
function filtrarInventarios() {
  const filtroTipo = document.getElementById('filtroTipo').value.toLowerCase();
  const filtroDisp = document.getElementById('filtroDisponibilidad').value.toLowerCase();
  fetch("/api/inventario/inventarios", {
    headers: { "Authorization": `Bearer ${getToken()}` }
  })
  .then(res => {
    if (!res.ok) return manejarErrorAcceso(res);
    return res.json();
  })
  .then(data => {
    const tbody = document.getElementById('tablaInventariosBody');
    tbody.innerHTML = '';
    const filtrados = data.filter(inv => {
      const tipoOK = !filtroTipo || inv.tipo_nombre.toLowerCase() === filtroTipo;
      const dispOK = !filtroDisp || inv.estado_nombre.toLowerCase() === filtroDisp;
      return tipoOK && dispOK;
    });
    filtrados.forEach(inv => {
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
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editar(${inv.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarInventario(${inv.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });
}

// Limpia filtros
function borrarFiltros() {
  document.getElementById('filtroTipo').value = '';
  document.getElementById('filtroDisponibilidad').value = '';
  cargarInventarios();
}

// Inicialización al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const rol = localStorage.getItem("rol");
  if (rol !== "admin") {
    alert("No tienes permiso para acceder al inventario.");
    window.location.href = "pages/inicio.html";
    return;
  }

  document.getElementById('btnRegistrar').addEventListener('click', registrarInventario);
  document.getElementById('btnActualizar').addEventListener('click', actualizarInventario);
  document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);
  document.getElementById('btnCargarInventarios').addEventListener('click', cargarInventarios);
  document.getElementById('btnBorrarFiltros').addEventListener('click', borrarFiltros);
  document.getElementById('filtroTipo').addEventListener('change', filtrarInventarios);
  document.getElementById('filtroDisponibilidad').addEventListener('change', filtrarInventarios);

  cargarTipos();
  cargarEstados();
  cargarInventarios();
});
