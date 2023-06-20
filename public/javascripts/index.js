'use strict'

const rendering = () => {
  const auth_token = localStorage.getItem('auth_token')

  const auth_email = localStorage.getItem('auth_email')

  const unAuth = ` <nav>
          <div style='padding-left: 20px;'>
            <a href='http://localhost:3000' class="brand-logo">Empyrea</a>
            <ul>
              <li><a href='http://localhost:3000/login.html'>Login</a></li>
              <li><a href='http://localhost:3000/register.html'>Register</a></li>
            </ul>
          </div>
        </nav>`

  const auth = `<div><button id='logout'>Logout</button><p>${auth_email}</p></div>`

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
