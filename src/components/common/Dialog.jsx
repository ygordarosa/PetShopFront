function Dialog(props){

  // JS para validação do bootstrap
  (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
              if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
              }

              form.classList.add('was-validated')
          }, false)
      })
  })()

  return (
      <div className="modal fade" id={props.id} 
      tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" 
                      id="exampleModalLabel">{props.titulo}</h1>
                      <button type="button" className="btn-close" 
                      data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id={props.idform} onSubmit={props.acaoCadastrar}
                      className="needs-validation" noValidate>
                      <div className="modal-body">
                          {props.children}
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary"
                              data-bs-dismiss="modal">Fechar</button>
                          <button type="submit" className="btn btn-success">
                              Salvar
                              <i className="bi bi-save"></i>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  )
}

export default Dialog;