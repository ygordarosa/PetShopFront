import { useContext } from "react";
import PetContext from "./PetContext";
import Alerta from "../../common/Alert";
import CampoEntrada from "../../common/InputField";
import CampoSelect from "../../common/SelectField"
import Dialogo from "../../common/Dialog";
function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaPessoas } = useContext(PetContext);

    if (!objeto) {
        console.log("entrou no if")
        return null; // ou qualquer outra lógica de fallback que você queira
    }

    return (
        <Dialogo id="modalEdicao" titulo="Pet"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtId" label="Id" tipo="number"
                placeholder="" requerido="false"
                name="id" value={objeto.id} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                placeholder="Informe o nome" requerido="true"
                name="nome" value={objeto.nome} onchange={handleChange}
                msgvalido="Campo nome OK" msginvalido="Informe o nome"
                readonly={false} />
            <CampoSelect id="selectPessoa" label="Pessoa"
                requerido="true"
                name="dono" value={objeto.dono}
                onchange={handleChange}
                msgvalido="Campo pessoa OK" msginvalido="Informe o dono"
                readonly={false}>
                {
                    listaPessoas.map((cat) => (
                        <option value={cat.id} key={cat.id}>{cat.nome}</option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;