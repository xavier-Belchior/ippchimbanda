const wrapper = document.querySelector(".wrapper")
const loginLink = document.querySelector(".login-link")
const registerLink = document.querySelector(".register-link")
const registerSucess = document.querySelector(".register-sucess")
const register = document.querySelector("#register")

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active")
})
loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active")
})
