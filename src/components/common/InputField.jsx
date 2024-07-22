function InputField({ id, label, tipo, placeholder, requerido, name,
  value, onchange, msgvalido, msginvalido, readonly
}) {
  return (
      <div className="mb-3">
          <label htmlFor={id}
              className="form-label">{label}</label>
          <input type={tipo} class="form-control"
              readOnly={readonly}
              id={id} placeholder={placeholder}
              required={requerido}
              name={name}
              value={value}
              onChange={onchange} />
          <div className="valid-feedback">
              {msgvalido}
          </div>
          <div className="invalid-feedback">
              {msginvalido}
          </div>
      </div>
  )
}

export default InputField;