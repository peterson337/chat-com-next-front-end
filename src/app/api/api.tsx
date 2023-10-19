import react from "react";
import axios from 'axios';

export const api = axios.create({
    baseURL: "https://chat-tempo-real.onrender.com",
})
