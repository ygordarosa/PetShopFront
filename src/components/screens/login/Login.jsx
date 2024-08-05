
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import Carregando from '../../common/Loading';
import Alerta from '../../common/Alert';
import './signin.css';

function Login() {

    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const acaoLogin = async e => {

        e.preventDefault();

        try {
            const body = {
                cpf: cpf,
                senha: senha
            };
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(json => {
                    if (json.auth === false) {
                        setAlerta({ status: "error", message: json.message })
                    }
                    if (json.auth === true) {
                        setAutenticado(true);
                        gravaAutenticacao(json);
                    }
                });
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: err.message })
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({status : "error" , message : err != null ? err.message : ""});
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/privado" />
    }










    return (
        <div>
            <Carregando carregando={carregando}>
                <div>
                    <body className="text-center">
                        <Alerta alerta={alerta} />
                        <main className="form-signin">
                            <form onSubmit={acaoLogin}>
                                <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Nome de usuário"
                                        value={cpf}
                                        name="cpf"
                                        onChange={e => setCpf(e.target.value)} />
                                    <label htmlFor="floatingInput">Cpf</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                                        value={senha}
                                        name="senha"
                                        onChange={e => setSenha(e.target.value)} />
                                    <label htmlFor="floatingPassword">Senha</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                            </form>
                        </main>
                    </body>
                </div>
            </Carregando>
        </div>
    )

}

export default Login;