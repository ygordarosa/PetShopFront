import { jwtDecode } from "jwt-decode";

const NOMEAPP = 'eshoppw';

export const getToken = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ?
    JSON.parse(localStorageAutenticacao) : null;
    if (autenticacao === null){
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        let decoded = jwtDecode(autenticacao.token);
        if (decoded.exp <= Math.floor(new Date() / 1000)){
            console.log('Token expirado');
            logout();
            throw "Token expirado";
        } else {
            return autenticacao.token;
        }
    }
}

export const getConta = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ?
    JSON.parse(localStorageAutenticacao) : null;
    if (autenticacao === null){
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        let decoded = jwtDecode(autenticacao.token);
        if (decoded.exp <= Math.floor(new Date() / 1000)){
            console.log('Token expirado');
            logout();
            throw "Token expirado";
        } else {
            console.log(decoded.conta)
            return decoded.conta;
        }
    }
}

export const gravaAutenticacao = (json) => {
    localStorage.setItem(NOMEAPP+'/autenticacao',JSON.stringify(json));
}

export const logout = () => {
    localStorage.setItem(NOMEAPP+'/autenticacao',JSON.stringify({
        "auth" : false , "token" : ''
    }));
}