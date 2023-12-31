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

    console.log(result)

    if (result.error) {
      const registrationError = document.querySelector('#display-errors')
      registrationError.innerHTML = result.error
    }

    if (response.status === 302 && result.redirect_path) {
      setTimeout(() => {
        window.location.href = result.redirect_path
      }, 2000)
    }

    return result
  } catch (err) {
    console.error('Error:', err)
    const registrationError = document.querySelector('#display-errors')
    registrationError.innerHTML = err
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
