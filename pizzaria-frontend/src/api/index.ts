import axios, { AxiosError } from "axios";

interface Usuario {
  id?: string;
  email: string;
  password:string 
}
export const cadastrarUsuario = async (nome: string, email: string, password: string): Promise<Usuario> => {
  try {
    const response = await axios.post<Usuario>("http://localhost:5000/api/auth/signup", {
      nome,   // <<< adicione isso
      email,
      password,
    });

    console.log("Usuário cadastrado!", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    console.error("Erro ao cadastrar usuário:", err.response?.data?.error || err.message);
    throw err;
  }
};
