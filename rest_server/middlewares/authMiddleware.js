import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const autorizeToken = (req, res, next) => {
   try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "No se proporcionó token" });
    }

    // El formato correcto es: Authorization: Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar datos del usuario en la request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Error en authorizeToken:", error);
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export function soloAdmin(req, res, next) {
  if (req.user?.rol === "1") {
    return next();
  }
  return res.status(403).json({ error: "No tienes permiso para esta acción" });
}

export function personal(req, res, next) {
  if (req.user?.rol === "1" || req.user?.rol === "2") {
    return next();
  }
  return res.status(403).json({ error: "No tienes permiso para esta acción" });
}


