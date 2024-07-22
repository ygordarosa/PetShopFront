import { useContext } from "react";
import PessoaContext from "./PessoaContext";
import Alerta from "../../common/Alert";
import CampoEntrada from "../../common/InputField";
import Dialogo from "../../common/Dialog";
function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(PessoaContext);
    
    if (!objeto) {
      console.log("entrou no if")
      return null; // ou qualquer outra lógica de fallback que você queira
  }

    return (
        <Dialogo id="modalEdicao" titulo="Pessoa"
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
            <CampoEntrada id="txtCpf" label="Cpf" tipo="text"
                placeholder="Informe o cpf" requerido="true"
                name="cpf" value={objeto.cpf} onchange={handleChange}
                msgvalido="Campo cpf OK" msginvalido="Informe o cpf"
                readonly={false} />
        </Dialogo>
    )
}

export default Form;