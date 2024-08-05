import { getToken } from '../seguranca/Autenticacao';

export const getPetsAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pet`,
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

export const getPetPorCodigoAPI = async codigo => {
  const response = await fetch(
      `${process.env.REACT_APP_ENDERECO_API}/pet/${codigo}`,
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

export const deletePetAPI = async codigo => {
  const response = await fetch(
      `${process.env.REACT_APP_ENDERECO_API}/pet/${codigo}`,
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

export const cadastraPetAPI = async (objeto, metodo) => {
  const response = await fetch(
      `${process.env.REACT_APP_ENDERECO_API}/pet`,
      {
          method : metodo,
          headers : {
              "Content-Type" : "application/json",
              "authorization" : getToken()
          },
          body : JSON.stringify(objeto)
      });
  const data = await response.json();
  return data;
}