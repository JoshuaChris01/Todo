const genContainer = document.querySelector('.generalContainer')
const generalLists = document.querySelector('.generallists')
const textArea = document.querySelector('.input')
const btn = document.querySelector('.cssbuttons-io-button')
const listContainers = document.querySelector('.listcontainers')
const delBtn = document.querySelector('.button')

function addTodoItem() {
    if (textArea.value.length !== 0) {

        let randomId = Math.floor(Math.random() * 1000) + 1;
        todoObj = {
            name: textArea.value,
            id: randomId
        }

        todo.push(todoObj)
        localStorage.setItem('todo', JSON.stringify(todo))
        addTodo(todoObj.id, todoObj.name)
    }

}

const todo = []
function addTodo(id, data) {
    const container = document.createElement('div')
    container.className = `p_${id}`
    listContainers.appendChild(container)

    const listItems = document.createElement('ul')
    listItems.className = 'listitems'
    container.appendChild(listItems)

    const items = document.createElement('li')
    items.className = 'items'
    items.textContent = data
    listItems.appendChild(items)

    const label = document.createElement('label')
    label.setAttribute('for', 'checkbox')
    label.className = 'checkbox-container'
    items.appendChild(label)

    const checkInput = document.createElement('input')
    checkInput.setAttribute('type', 'checkbox')
    checkInput.className = 'ui-checkbox'
    checkInput.checked = false
    label.appendChild(checkInput)

    const getLocal = localStorage.getItem(`p_${id}`)
    if (getLocal === 'checked') {
        checkInput.checked = true
        items.style.textDecoration = 'line-through'
        items.style.textDecorationThickness = '2px'
    } else if (getLocal === 'unchecked') {
        checkInput.checked = false
        items.style.textDecoration = 'none'

    }


    checkInput.addEventListener('change', () => {
        if (checkInput.checked) {
            items.style.textDecoration = 'line-through'
            items.style.textDecorationThickness = '2px'
            localStorage.setItem(`p_${id}`, 'checked')
        } else {
            items.style.textDecoration = 'none'
            localStorage.setItem(`p_${id}`, 'unchecked')
        }
    })

    delBtn.addEventListener('click', () => deleteButton(id))


    textArea.value = ''
}

function deleteButton(id) {
    const index = todo.findIndex(item => item.id === item)
    const container = document.querySelector(`.p_${id}`)
    const checkbox = document.querySelector('.ui-checkbox')

    if (index !== -1 && checkbox.checked) {
        todo.splice(index, 1)

        localStorage.setItem('todo', JSON.stringify(todo))
        
        if (container) {
            container.parentNode.removeChild(container)
        }
    }

}


btn.addEventListener('click', addTodoItem)
textArea.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addTodoItem()
    }
})
const data = JSON.parse(localStorage.getItem('todo')) || []
todo.push(...data)
todo.forEach(item => {
    addTodo(item.id, item.name)
})