window.onload = async function() {
    let ID = localStorage.getItem("ID")
    console.log(ID)
    let data = await fetch('/edit', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'  // Ensure correct content type
        },
        body: JSON.stringify({ id: ID })  // Send the data as JSON
    }); 
    let email
} 