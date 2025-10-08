document.getElementById("cerrarSesion").addEventListener("click", async () => {
  try {
    await fetch("/api/usuarios/logout", { method: "POST" });
    window.location.href = "/";
  } catch (err) {
    alert("Error al cerrar sesión.");
  }
});
