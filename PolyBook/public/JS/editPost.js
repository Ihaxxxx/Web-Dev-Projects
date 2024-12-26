window.onload = async () => {
    let data = await fetch("/PostData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ postID: localStorage.getItem("postID") }),
    });
    let response = await data.json();
    let postContent = document.getElementById("mind-text")
    postContent.value = response.post.content

    let form = document.getElementById("mind-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let content = document.getElementById("mind-text").value
        let data = await fetch("/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, postID: localStorage.getItem("postID") }),
        });
        let response = await data.json();
        if (response) {
            window.location.href = "/profile";
        }
    });
}