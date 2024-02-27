function Button(params) {
  return (
    <input type={params.type} value={params.value} onClick={params.onClick} />
  )
}

export default Button;