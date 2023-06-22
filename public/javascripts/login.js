'use strict'

const url = 'http://localhost:3000/api/user/login'

var loginForm = document.querySelector('#login-form')

const userLogin = async (dataObj) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    })

    const result = await response.json()

    if (result.error) {
      const loginError = document.querySelector('#display-errors')
      loginError.innerHTML = result.error
    }

    if (response.status === 302 && result.success) {
      window.localStorage.setItem('auth_token', result.token)

      window.localStorage.setItem('auth_email', result.email)

      setTimeout(() => {
        window.location.href = 'http://localhost:3000'
      }, 2000)
    }

    return result
  } catch (err) {
    console.error('Error:', err.message)
    const loginError = document.querySelector('#display-errors')
    loginError.innerHTML = err
  }
}

const clearForm = () => {
  loginForm.reset()
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  let inputEmail = document.querySelector('#email-login')

  let inputPassword = document.querySelector('#password-login')

  let data = {
    email: inputEmail.value,
    password: inputPassword.value,
  }
  await userLogin(data)

  clearForm()
})

