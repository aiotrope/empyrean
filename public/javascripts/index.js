/* eslint-disable quotes */
'use strict'

var todoArr = []

const url = 'http://localhost:3000/api/todos'

var auth_token = localStorage.getItem('auth_token')

var auth_email = localStorage.getItem('auth_email')

const rendering = () => {
  const unAuth = ` <nav>
          <div style='padding-left: 20px;'>
            <a href='http://localhost:3000' class="brand-logo">Empyrea</a>
            <ul>
              <li><a href='http://localhost:3000/login.html'>Login</a></li>
              <li><a href='http://localhost:3000/register.html'>Register</a></li>
            </ul>
          </div>
        </nav>`

  const auth = ` <div>
  <div style="margin: 20px 20px;">
      <button id='logout'>Logout</button>
      <p>${auth_email}</p>
  </div>
  <form action="" method="POST" id="todo-form" style="margin: 50px 20px;">
      <label for="items">Add item</label>
      <input id="add-item" name="items" /><br />
      <button type="submit">ADD</button>
  </form>
  <section>
      <h2>Item list:</h2>
      <ul id="item-ul"></ul>
  </section>
</div>`

  if (auth_token) {
    document.getElementById('home').innerHTML = auth
  } else {
    document.getElementById('home').innerHTML = unAuth
  }
}

rendering()

window.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('#logout')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')

      setTimeout(() => {
        window.location.href = 'http://localhost:3000'
      }, 1000)
    })
  }
})

const createTodo = async (dataObj) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(dataObj),
    })

    const result = await response.json()

    const parseResult = JSON.parse(JSON.stringify(result))

    todoArr.push(parseResult)

    return result
  } catch (err) {
    console.error('Error:', err.message)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('#todo-form')

  if (todoForm) {
    todoForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      let inputItem = document.querySelector('#add-item')

      let data = {
        items: [inputItem.value],
      }
      await createTodo(data)

      todoForm.reset()
    })
  }
})

const fetchAndSetAllTodos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }),
    })
    const data = await response.json()

    if (response.status === 200 && data) {
      // clone array
      let clone = await JSON.parse(JSON.stringify(data))

      let itemUL = document.getElementById('item-ul')

      todoArr = clone
      console.log(clone)
      todoArr.map(({ user, items }) => {
        //console.log(user.email)
        if (itemUL) {
          itemUL.innerHTML = `<p>User: ${user.email}</p><p>Todos: ${items}</p>`
        }
      })
    } else {
      todoArr = null
    }
  } catch (error) {
    console.error('Error fetching todos: ', error.message)
  }
}

if (auth_token) {
  fetchAndSetAllTodos()
}
