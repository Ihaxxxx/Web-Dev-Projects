const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formTitle = document.getElementById('form-title');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');

    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
      formTitle.textContent = 'Sign Up';
    });

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      signupForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      formTitle.textContent = 'Login';
    });
const LoginForm = document.getElementById("login-form")
const SignForm = document.getElementById("signup-form")

LoginForm.addEventListener('submit',async (event)=>{
  event.preventDefault()
  const UserEmail = document.getElementById("login-email").value
  const UserPassword = document.getElementById("login-password").value
  let data = await fetch('/Login',{
    method : "POST",
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:UserEmail,password:UserPassword})
  })
  let response = await data.json()
  if (response.success == false) {
    alert("Email Not registered")
  }else{
    if (response.password === UserPassword ) {
      alert("Hello")
    }else{
      alert("Incorrect Password")
    }
  }
  
})



signupForm.addEventListener('submit', async (event)=>{
  event.preventDefault()
  const UserEmail = document.getElementById("signup-email").value
  const UserPassword = document.getElementById("signup-password").value
  const UserName = document.getElementById("signup-name").value
  let data = await fetch('/SignUp',{
    method : "POST",
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:UserEmail, name:UserName , password:UserPassword})
  })
  let response = await data.json()
  if (response.success == false) {
    alert("Email already registered")
  }
})