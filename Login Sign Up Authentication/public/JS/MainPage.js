const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");
const errordisplaysignup = document.getElementById("errordisplaysignup");
const errordisplaylogin = document.getElementById("errordisplaylogin");

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  formTitle.textContent = "Sign Up";
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  formTitle.textContent = "Login";
});
const LoginForm = document.getElementById("login-form");
const SignForm = document.getElementById("signup-form");

LoginForm.addEventListener('submit',async (event)=>{
  event.preventDefault()
  const UserEmail = document.getElementById("login-email").value
  const UserPassword = document.getElementById("login-password").value
  let data = await fetch('/login',{
    method : "POST",
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:UserEmail,password:UserPassword})
  })
  let response = await data.json()
  console.log(response.success)
  if (!response.success) {
        errordisplaylogin.classList.remove("hidden");
    }else{
        errordisplaylogin.innerHTML = "Success"
        errordisplaylogin.classList.remove("hidden");
    }
})

signupForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const UserEmail = document.getElementById("signup-email").value
    const UserPassword = document.getElementById("signup-password").value
    const UserName = document.getElementById("signup-name").value
    const UserAge = document.getElementById("signup-age").value
    let data = await fetch('/Register',{
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:UserName,email:UserEmail,password:UserPassword, age : UserAge})
    })
    let response = await data.json()
    if (!response.success) {
        errordisplaysignup.classList.remove("hidden");
    }else{
        errordisplaysignup.innerHTML = "Success"
        errordisplaysignup.classList.remove("hidden bg-red-900");
    }
  })