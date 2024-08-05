import { getToken } from '../seguranca/Autenticacao';

export const getPessoasAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pessoa`,
      {
          method : "GET",
          headers : {
              "Content-Type" : "application/json",
              "authorization" : getToken()
          }
      });
  const data = await response.json();
  return data;
}

export const getPessoaPorCodigoAPI = async codigo => {
  const response = await fetch(
      `${process.env.REACT_APP_ENDERECO_API}/pessoa/${codigo}`,
      {
          method : "GET",
          headers : {
              "Content-Type" : "application/json",
              "authorization" : getToken()
          }
      });
  const data = await response.json();
  return data;
}

export const deletePessoaAPI = async codigo => {
  const response = await fetch(
      `${process.env.REACT_APP_ENDERECO_API}/pessoa/${codigo}`,
      {
          method : "DELETE",
          headers : {
              "Content-Type" : "application/json",
              "authorization" : getToken()
          }
      });
  const data = await response.json();
  return data;
}

export const cadastraPessoaAPI = async (objeto, metodo) => {
  const response = await fetch(
      `${process.env.REACT_APP_ENDERECO_API}/pessoa`,
      {
          method : metodo,
          headers : {
              "Content-Type" : "application/json",
              "authorization" : getToken()
          },
          body : JSON.stringify(objeto)
      });
      console.log("response: " + response)
  const data = await response.json();
  console.log(data)
  return data;
}