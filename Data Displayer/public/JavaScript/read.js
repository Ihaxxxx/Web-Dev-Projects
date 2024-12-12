window.onload = async function(event){
    let dataCards = ""
    let data = await fetch('/read-data')
    let UserData = await data.json()
    for (const key in UserData.users) {
            const element = UserData.users[key];
            if (element.imageurl != "") {
                dataCards += `                    <div class="user w-72 p-4 bg-zinc-800 rounded-lg">
                        <div class="w-full h-72 rounded-lg bg-zinc-700">
                            <img class="w-full h-full object-cover overflow-hidden object-top" src=${element.imageurl} alt="">
                        </div>
                        <h3 class="text-xl mt-3 tracking-tighter">${element.name}</h3>
                        <h5 class="text-zinc-500">${element.email}</h5>
                        <div class="flex gap-3 mt-10">
                            <a class="text-zinc-200" href="./HTML/edit.html" name="${element._id}">Edit User</a>
                            <a class="text-red-500" href="/delete/${element._id}">Delete User</a>
                        </div>
                        </div>`
            }
            
    }
    document.getElementById("userCards").innerHTML = dataCards
    window.onclick= function(event){
        localStorage.setItem("ID",event.target.name) 
    }
}