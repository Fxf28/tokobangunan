// src/api.ts
import axios from "axios";

// Buat instance axios kustom
const api = axios.create({
  // URL backend Express kamu
  baseURL: "http://localhost:5000/api",

  // INI BAGIAN PALING PENTING
  // 'withCredentials: true' memberitahu axios untuk
  // mengirim cookie (mandiri_session_id) di setiap request
  // dan menerima cookie saat login/logout.
  withCredentials: true,
});

export default api;
