import axios, { AxiosError } from "axios";

interface Usuario {
  id?: string;
  email: string;
}

export const cadastrarUsuario = async (email: string, password: string): Promise<Usuario> => {
  try {
    const response = await axios.post<Usuario>("http://localhost:5000/api/auth/signup", {
      email,
      password,
    });

    console.log("Usuário cadastrado!", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Erro ao cadastrar usuário:", err.response?.data?.message || err.message);
    throw err;
  }
};
