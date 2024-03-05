import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://https://simpletodo-9jyz.onrender.com/api",
  withCredentials: true,
})

