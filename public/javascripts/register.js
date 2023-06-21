'use strict'

const url = 'http://localhost:3000/api/user/register'

var registrationForm = document.querySelector('#registration-form')

const userRegistration = async (dataObj) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    })

    const result = await response.json()

    setTimeout(() => {
      window.location.href = 'http://localhost:3000/login.html'
    }, 2000)

    return result
  } catch (err) {
    console.error('Error:', err.message)
  }
}

const clearForm = () => {
  registrationForm.reset()
}

registrationForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  let inputEmail = document.querySelector('#email-register')

  let inputPassword = document.querySelector('#password-register')

  let data = {
    email: inputEmail.value,
    password: inputPassword.value,
  }
  await userRegistration(data)

  clearForm()
})