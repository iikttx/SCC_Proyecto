import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// 📦 Inicializar dotenv
dotenv.config();

// 📌 __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔌 Rutas de API importadas
import usuariosRoutes      from "./routes/usuarios.routes.js";
import inventarioRoutes    from "./routes/inventario.routes.js";
import prestamoRoutes      from "./routes/prestamo.routes.js";
import inoutRoutes         from "./routes/entradas-salidas.routes.js";
import logUsuariosRoutes   from "./routes/log_usuarios.routes.js";
import reservacionesRoutes from "./routes/reservaciones.routes.js";

// 🚀 Inicializar app
const app = express();
const PORT = Number(process.env.PORT) || 3000;



// 🧠 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌍 Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// 🔗 CORS con whitelist
const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "file://"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
}));

// 🛣️ Rutas de API
app.use("/api/usuarios",         usuariosRoutes);
app.use("/api/log-usuarios",     logUsuariosRoutes);
app.use("/api/inventario",       inventarioRoutes);
app.use("/api/prestamo",         prestamoRoutes);
app.use("/api/entradasalidas",   inoutRoutes);
app.use("/api/reservaciones",    reservacionesRoutes);

// 📄 Rutas HTML
const P = (folder, page) => path.join(__dirname, `public/pages/${folder}/${page}.html`);
const R = (page) => path.join(__dirname, "public/pages", `${page}.html`);

app.get("/",             (req, res) => res.sendFile(R("login")));
app.get("/registro",     (req, res) => res.sendFile(R("registro")));
app.get("/perfil",       (req, res) => res.sendFile(R("perfil")));
app.get("/admin",        (req, res) => res.sendFile(R("admin")));
app.get("/docente",      (req, res) => res.sendFile(R("docente")));

app.get("/inventarios",     (req, res) => res.sendFile(R("inventario")));
app.get("/disponibilidad",  (req, res) => res.sendFile(R("disponibilidad")));
app.get("/prestamo",        (req, res) => res.sendFile(R("prestamo")));
app.get("/inicio",        (req, res) => res.sendFile(R( "Inicio")));
app.get("/visualizar",        (req, res) => res.sendFile(P("registros", "Visualizar_Datos")));
app.get("/registrar-entrada", (req, res) => res.sendFile(P("entradas", "Registrar_Entrada")));
app.get("/generar-reportes",  (req, res) => res.sendFile(P("entradas", "Generar_Reportes")));
app.get("/registrar-salida",  (req, res) => res.sendFile(P("entradas", "Registrar_Salida")));
app.get("/registrar-huella",  (req, res) => res.sendFile(P("huellas", "Registrar_Huellas")));
app.get("/reservar",          (req, res) => res.sendFile(P("reservaciones", "Reservar_Sala")));
app.get("/cancelar-reserva",  (req, res) => res.sendFile(P("reservaciones", "Cancelar_Reservacion")));

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
