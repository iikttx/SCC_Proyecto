// public/js/prestamo.js
let licenciaturas = [];
let inventarioSeleccionadoId = null;
const token = localStorage.getItem("token");

    // Si no hay token → redirige al login
    if (!token) {
      window.location.href = "/pages/inicio.html";
    }
  
// Cargar layout
document.addEventListener("DOMContentLoaded", () => {
  fetch('/pages/layout.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById("layout-placeholder").innerHTML = html;
      cargarLicenciaturas();
      cargarPosgrados();
      cargarInventariosDisponibles();
    })
    .catch(console.error);
});

// Cargar licenciaturas
function cargarLicenciaturas() {
  fetch("/api/prestamo/licenciaturas")
    .then(r => r.json())
    .then(data => {
      licenciaturas = data;
      const sel = document.getElementById("tipolicenciatura");
      sel.innerHTML = '<option value="">-- Selecciona una licenciatura --</option>';
      data.forEach(l => sel.innerHTML += `<option value="${l.id}">${l.nombre}</option>`);
    })
    .catch(console.error);
}

// Cargar posgrados
function cargarPosgrados() {
  fetch("/api/prestamo/posgrados")
    .then(r => r.json())
    .then(data => {
      const sel = document.getElementById("selectPosgrado");
      sel.innerHTML = '<option value="">-- Selecciona un posgrado --</option>';
      data.forEach(p => sel.innerHTML += `<option value="${p.id}">${p.nombre}</option>`);
    })
    .catch(console.error);
}

// Cargar inventarios disponibles
function cargarInventariosDisponibles() {
  fetch("/api/inventario/disponibles")
    .then(r => r.json())
    .then(data => {
      const tbody = document.getElementById("tablaInventariosBody");
      tbody.innerHTML = "";
      data.forEach(inv => {
        const tr = document.createElement("tr");
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
            <button class="btn btn-success btn-sm"
              onclick="seleccionarInventario('${inv.id}')">
              Pedir prestado
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(console.error);
}

// Seleccionar inventario
function seleccionarInventario(id) {
  inventarioSeleccionadoId = id;
  document.getElementById("idfecha").value = new Date().toISOString().split("T")[0];
  document.getElementById("idInventario").value = id;
  alert(`Equipo ${id} seleccionado. Completa el formulario.`);
}

// Generar ID aleatorio para préstamo
function generarIdPrestamo() {
  return Math.floor(Math.random() * 100000);
}

// Enviar formulario de préstamo
document.getElementById("btnCargarPrestamos").addEventListener("click", () => {
  const cuerpo = {
    id_Prestamos: generarIdPrestamo(),
    fecha: document.getElementById("idfecha").value,
    area:    document.getElementById("Area").value,
    proposito: document.getElementById("idUsuario").value,
    firma:     document.getElementById("firma").value,
    inventario_id: inventarioSeleccionadoId,
    licenciatura:  document.getElementById("tipolicenciatura").value || null,
    posgrado:      document.getElementById("selectPosgrado").value || null
  };

  if (!cuerpo.inventario_id || !cuerpo.firma || !cuerpo.fecha) {
    return alert("Selecciona equipo, fecha y firma antes de enviar.");
  }

  fetch("/api/prestamo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar préstamo");
      return res.json();
    })
    .then(() => {
      alert("Préstamo guardado correctamente.");
      document.getElementById("formulario").reset();
      cargarInventariosDisponibles();
    })
    .catch(err => {
      console.error(err);
      alert("Error al guardar el préstamo.");
    });
});
