
window.onload = function(){
    loadData()
}

async function loadData() {
    let data = await fetch("/dataCheck")
    let response = await data.json()
    console.log(response.message)
    response.message.forEach(element => {
        document.getElementById("MainGrid").insertAdjacentHTML("beforeend",element)
    });
}