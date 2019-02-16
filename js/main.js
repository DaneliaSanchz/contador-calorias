const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

// {
//   tag: 'h1',
//   attr: {
//     class: 'title'
//   }
// }

const attrsToString = (obj = {}) =>
  Object.keys(obj)
  .map(attr => `${attr}="${obj[attr]}"`)
  .join('')

// "tag="h1" class="title""

const tagAttrs = obj => (content = "") => 
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

// const tag = t => content => `<${t}>${content}</${t}>`

const tag = t => 
  typeof t === 'string' ? tagAttrs({tag: t}) : tagAttrs(t)

const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items)
// const tableRow = items => tableRowTag(tableCells(items))

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

// <button class="btn btn-outline-danger" onclick="removeItem(index)">
//   <i class="fas fa-trash-alt"></i>
// </button>

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('')

  //console.log(tag('h1')('Title')) // <h1>Title<h1>

  // let description = $('#description')
  // let carbs = $('carbs')
  // let calories = $('calories')
  // let protein = $('protein')

let description = document.getElementById('description')
let carbs = document.getElementById('carbs')
let calories = document.getElementById('calories')
let protein = document.getElementById('protein')

  // description.keypress(() => { jquery
  //   description.removeClass('is-invalid')
  // })

let list = []

description.addEventListener('keydown', () =>
    description.classList.remove('is-invalid'))

calories.addEventListener('keydown', () =>
    calories.classList.remove('is-invalid'))

carbs.addEventListener('keydown', () =>
    carbs.classList.remove('is-invalid'))

protein.addEventListener('keydown', () =>
    protein.classList.remove('is-invalid'))


const validateInputs = () => {
    // description.val() ? '' description.addClass('is-invalidate)
    description.value ? '' : description.classList.add('is-invalid')
    calories.value ? '' : calories.classList.add('is-invalid')
    carbs.value ? '' : carbs.classList.add('is-invalid')
    protein.value ? '' : protein.classList.add('is-invalid')

    if(description.value && calories.value && carbs.value && protein.value)
      add()
}

const add = () => {
    const newItem = {
      description: description.value,
      calories: parseInt(calories.value),
      carbs: parseInt(carbs.value),
      protein: parseInt(protein.value)
    }

    list.push(newItem)
    cleanInputs()
    updateTotals()
    renderItems()
}

const updateTotals = () => {
  let calories = 0, carbs = 0, protein = 0

  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })

  // $('#totalCalories').text(calories) JQuery
  document.querySelector('#totalCalories').textContent = calories
  document.querySelector('#totalCarbs').textContent = carbs
  document.querySelector('#totalProtein').textContent = protein
}

const cleanInputs = () => {
    description.value = ''
    calories.value = ''
    carbs.value = ''
    protein.value = ''
}

const renderItems = () => {
  // $('tbody').empty()
  document.querySelector('tbody').innerHTML = ''

  list.map((item, index) => {
    const row = document.createElement('tr')

    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)

    row.innerHTML = tableRow([
      item.description, 
      item.calories, 
      item.carbs, 
      item.protein, 
      removeButton])
    // $('tbody').append(tableRow([item.description, item.calories, item.carbs, item.protein]))
    document.querySelector('tbody').appendChild(row)

  })

}

const removeItem = index => {
  list.splice(index, 1)

  updateTotals()
  renderItems()
}
