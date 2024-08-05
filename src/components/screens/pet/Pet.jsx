import { useState, useEffect } from "react";
import PetContext from "./PetContext";
import { getPessoasAPI } from "../../../services/PessoaService";
import {
    getPetsAPI, getPetPorCodigoAPI,
    deletePetAPI, cadastraPetAPI
} from "../../../services/PetService";
import Tabela from "./Table";
import Form from "./Form";
import Carregando from "../../common/Loading";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Pet() {

    let navigate = useNavigate()

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaPessoas, setListaPessoas] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ id: "", nome: "", dono: "" });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ id: 0, nome: "", dono: "" });
    }

    const editarObjeto = async id => {
        try {
            const pet = await getPetPorCodigoAPI(id);
            if (pet) {
                setObjeto(pet);
                setEditar(true);
                setAlerta({ status: "", message: "" });
            } else {
                setAlerta({ status: "error", message: "Pet não encontrado." });
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
            let retornoAPI = await cadastraPetAPI(objeto, metodo);
            console.log("Retorno da API:", retornoAPI);
            if (retornoAPI && retornoAPI.objeto) {
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                setObjeto(retornoAPI.objeto);
                if (!editar) {
                    setEditar(true);
                }
            } else {
                throw new Error("Objeto retornado da API é inválido");
            }
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
        recuperaPets();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(false);

    const recuperaPets = async () => {
        setCarregando(true);
        try {
            const pets = await getPetsAPI();
            if (pets) {
                setListaObjetos(pets);
            } else {
                throw new Error("Lista de pets retornada da API é inválida");
            }
        } catch (error) {
            window.location.reload();
            navigate("login", { replace: true });
        }
        setCarregando(false);
    }

    const recuperaPessoas = async () => {
        try {
            const pessoas = await getPessoasAPI();
            if (pessoas) {
                setListaPessoas(pessoas);
            } else {
                throw new Error("Lista de pessoas retornada da API é inválida");
            }
        } catch (error) {
            window.location.reload();
            navigate("login", { replace: true });
        }
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deletePetAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaPets();
            } catch (error) {
                window.location.reload();
                navigate("login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaPets();
        recuperaPessoas();
    }, []);

    useEffect(() => {
        console.log("objeto atualizado:", objeto);
    }, [objeto]);

    return (
        <PetContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto, listaPessoas
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PetContext.Provider>
    )
}

export default WithAuth(Pet);
