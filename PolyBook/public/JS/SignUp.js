let base64Image = ''; // Variable to store the base64 image
const signupForm = document.getElementById("signup-form");

function previewImage(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('image-preview-container');
    const previewImage = document.getElementById('image-preview');
    
    if (file) {
        const reader = new FileReader();
        
        // Read the file as a data URL (Base64 encoded string)
        reader.onload = function(e) {
            base64Image = e.target.result;  // Store the base64 string in the variable
            
            // Display the preview image
            previewImage.src = base64Image;
            previewContainer.classList.remove('hidden');
        };
        
        reader.readAsDataURL(file); // This converts the file to base64
    } else {
        previewContainer.classList.add('hidden');
    }
}

signupForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const UserEmail = document.getElementById("signup-email").value
    const UserPassword = document.getElementById("signup-password").value
    const UserName = document.getElementById("signup-name").value
    const UserAge = document.getElementById("signup-age").value
    const profileImage = base64Image;
    let data = await fetch('/Register',{
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:UserName,email:UserEmail,password:UserPassword, age : UserAge,profileImage:profileImage})
    })
    let response = await data.json()
    if (!response.success) {
        errordisplaysignup.classList.remove("hidden");
    }else{
        window.location.href = "/homepage";
    }
})
