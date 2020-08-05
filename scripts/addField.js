//procurar botão
document.querySelector("#add-time")
//quando clicar no botão
.addEventListener('click', cloneField)

//executar uma ação
function cloneField(){
    //duplicar os campos. Qual campo?
  const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //boolean: true our false

  //limpar os campos. Quais campos voce quer limpar?
  const fields = newFieldContainer.querySelectorAll('input')

  //para cada campo, limpar, utilizando for
  fields.forEach(function (field){
    field.value = ""
})

  //colocar na página. Onde?
  document.querySelector('#schedule-items').appendChild(newFieldContainer)
}