const LoginForm = document.getElementById("login-form");
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
        window.location.href = "/homepage";
      }
  })