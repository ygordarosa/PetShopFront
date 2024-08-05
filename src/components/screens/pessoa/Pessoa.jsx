import { useState, useEffect } from "react";
import PessoaContext from "./PessoaContext";
import {
    getPessoasAPI, getPessoaPorCodigoAPI,
    deletePessoaAPI, cadastraPessoaAPI
} from "../../../services/PessoaService";
import Tabela from "./Table";
import Form from "./Form";
import Carregando from "../../common/Loading";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Pessoa() {

    let navigate = useNavigate()

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ id: "", nome: "", cpf: "" });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ id: 0, nome: "", cpf: "" });
    }

    const editarObjeto = async id => {
        try {
            const pessoa = await getPessoaPorCodigoAPI(id);
            if (pessoa) {
                setObjeto(pessoa);
                setEditar(true);
                setAlerta({ status: "", message: "" });
            } else {
                setAlerta({ status: "error", message: "Pessoa não encontrada." });
            }
        } catch (error) {
            window.location.reload();
            navigate("login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPessoaAPI(objeto, metodo);
            console.log("Retorno da API:", retornoAPI);
            if (retornoAPI && retornoAPI.objeto) {
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                setObjeto(retornoAPI.objeto);
                if (!editar) {
                    setEditar(true);
                }
            } else {
              console.log("caiu no else")
                throw new Error("Objeto retornado da API é inválido");
            }
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
        recuperaPessoas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(false);

    const recuperaPessoas = async () => {
        setCarregando(true);
        try {
            const pessoas = await getPessoasAPI();
            if (pessoas) {
                setListaObjetos(pessoas);
            } else {
                throw new Error("Lista de pessoas retornada da API é inválida");
            }
        } catch (error) {
            window.location.reload();
            navigate("login", { replace: true });
        }
        setCarregando(false);
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deletePessoaAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaPessoas();
            } catch (error) {
                window.location.reload();
                navigate("login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaPessoas();
    }, []);

    useEffect(() => {
        console.log("objeto atualizado:", objeto);
    }, [objeto]);

    return (
        <PessoaContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PessoaContext.Provider>
    )
}

export default WithAuth(Pessoa);
