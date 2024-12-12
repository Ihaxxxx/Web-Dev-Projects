window.onload = async function() {
    let ID = localStorage.getItem("ID")

    let data = await fetch('/search-data', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'  // Ensure correct content type
        },
        body: JSON.stringify({ id: ID })  // Send the data as JSON
    }); 
    let response = await data.json()
    console.log(response.user._id)
    let htmlData = `<div class="w-full h-full bg-zinc-900 p-10 text-white">
        <div class="nav mb-10">
            <a class="text-blue-500" href="/read">Read Users</a>
        </div>
        <h1 class="text-3xl tracking-tighter my-3">Edit User</h1>
        <form action=/edit-user/${response.user._id} method="post">
            <input class="px-5 py-2 border-2 border-zinc-800 outline-none bg-transparent" type="text" name="name" value=${response.user.name}  placeholder="name">
            <input class="px-5 py-2 border-2 border-zinc-800 outline-none bg-transparent" type="text" name="email" value=${response.user.email} placeholder="email">
            <input class="px-5 py-2 border-2 border-zinc-800 outline-none bg-transparent" type="text" name="imageurl" value=${response.user.imageurl} placeholder="imageurl">
            <input class="px-5 py-2 bg-blue-500 rounded-lg ml-3" type="submit" value="editUser">
        </form>
    </div>`
    document.getElementById("mainBody").innerHTML = htmlData
} 