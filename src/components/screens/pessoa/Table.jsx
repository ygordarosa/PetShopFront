import { useContext } from "react";
import PessoaContext from "./PessoaContext";
import Alerta from "../../common/Alert";

function Table() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(PessoaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pessoas</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={novoObjeto}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{
                                    textAlign: 'center'
                                }}>Ações</th>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Cpf</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.id}>
                                        <td align="center">
                                            <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalEdicao"
                                            onClick={() => editarObjeto(objeto.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger" title="Remover"
                                                onClick={() => { remover(objeto.id) }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.id}</th>
                                        <td>{objeto.nome}</td>
                                        <td>{objeto.cpf}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Table;
