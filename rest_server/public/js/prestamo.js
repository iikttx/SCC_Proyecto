// public/js/prestamo.js

// ===================================
// VERIFICACIÓN DE PERFIL (DOCENTE Y ADMIN)
// ===================================
const token = localStorage.getItem("token");

if (!token) {
  alert("No has iniciado sesión.");
  window.location.href = "/pages/inicio.html";
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) { return null; }
}

const payload = parseJwt(token);
// Asume que rol '1' es admin y '2' es docente
const rol = payload?.rol;

if (rol !== "1" && rol !== "2") {
  alert("No tienes permisos para solicitar préstamos.");
  window.location.href = "/pages/inicio.html";
}

// ===================================
// LÓGICA DE LA PÁGINA DE PRÉSTAMOS
// ===================================
let inventarioSeleccionadoId = null;

const authHeaders = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

/**
 * Función mejorada para fetch que maneja errores de red y permisos.
 * @param {string} url La URL a la que se hará la petición.
 * @param {object} options Opciones de Fetch.
 * @returns {Promise<any>} El JSON de la respuesta.
 */
async function apiFetch(url, options = {}) {
  options.headers = authHeaders;
  const response = await fetch(url, options);
  if (!response.ok) {
    // Si el servidor responde con un error (ej: 403 Prohibido), lo mostramos.
    const errorData = await response.json().catch(() => ({ error: 'Error de comunicación con el servidor.' }));
    alert(`Error: ${errorData.error || response.statusText}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// --- Carga de Datos ---
async function cargarLicenciaturas() {
  try {
    const data = await apiFetch("/api/prestamo/licenciaturas");
    const sel = document.getElementById("tipolicenciatura");
    sel.innerHTML = '<option value="">-- Selecciona una licenciatura --</option>';
    data.forEach(l => sel.innerHTML += `<option value="${l.id}">${l.nombre}</option>`);
  } catch (error) {
    console.error("No se pudieron cargar las licenciaturas:", error);
  }
}

async function cargarPosgrados() {
  try {
    const data = await apiFetch("/api/prestamo/posgrados");
    const sel = document.getElementById("selectPosgrado");
    sel.innerHTML = '<option value="">-- Selecciona un posgrado --</option>';
    data.forEach(p => sel.innerHTML += `<option value="${p.id}">${p.nombre}</option>`);
  } catch (error) {
    console.error("No se pudieron cargar los posgrados:", error);
  }
}

async function cargarInventariosDisponibles() {
  try {
    const data = await apiFetch("/api/inventario/disponibles");
    const tbody = document.getElementById("tablaInventariosBody");
    tbody.innerHTML = ""; // Limpiar tabla antes de llenar
    data.forEach(inv => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${inv.id}</td>
        <td>${inv.modelo}</td>
        <td>${inv.marca}</td>
        <td><span class="badge bg-success">${inv.estado_nombre}</span></td>
        <td>
          <button class="btn btn-success btn-sm" onclick="seleccionarInventario('${inv.id}')">
            Solicitar
          </button>
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("No se pudieron cargar los inventarios:", error);
    document.getElementById("tablaInventariosBody").innerHTML = `<tr><td colspan="5" class="text-center text-danger">No se pudieron cargar los equipos disponibles. Revisa tus permisos.</td></tr>`;
  }
}

// --- Lógica del Formulario ---
function seleccionarInventario(id) {
  inventarioSeleccionadoId = id;
  document.getElementById("idfecha").value = new Date().toISOString().split("T")[0];
  document.getElementById("idInventario").value = id;
  alert(`Equipo ${id} seleccionado. Por favor, completa el resto del formulario.`);
  document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
}

function generarIdPrestamo() {
  return Math.floor(Date.now() / 1000); // ID más único basado en el tiempo
}

async function guardarPrestamo() {
  const cuerpo = {
    id_Prestamos: generarIdPrestamo(),
    fecha: document.getElementById("idfecha").value,
    area: document.getElementById("Area").value,
    proposito: document.getElementById("propositoInput").value,
    firma: document.getElementById("firma").value,
    inventario_id: inventarioSeleccionadoId,
    licenciatura: document.getElementById("tipolicenciatura").value || null,
    posgrado: document.getElementById("selectPosgrado").value || null
  };

  if (!cuerpo.inventario_id || !cuerpo.firma || !cuerpo.proposito) {
    return alert("Por favor, selecciona un equipo, escribe tu firma y el propósito del préstamo.");
  }

  try {
    const data = await apiFetch("/api/prestamo", {
      method: "POST",
      body: JSON.stringify(cuerpo)
    });
    alert(data.mensaje || "Préstamo guardado correctamente.");
    document.getElementById("formulario").reset();
    inventarioSeleccionadoId = null;
    cargarInventariosDisponibles();
  } catch (error) {
    console.error("Error al guardar préstamo:", error);
    // El alert de error ya se muestra en apiFetch
  }
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  fetch('/pages/layout.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById("layout-placeholder").innerHTML = html;
      // Cargar todo después de que el layout esté listo
      cargarLicenciaturas();
      cargarPosgrados();
      cargarInventariosDisponibles();
      document.getElementById("btnGuardarPrestamo").addEventListener("click", guardarPrestamo);
    })
    .catch(console.error);
});