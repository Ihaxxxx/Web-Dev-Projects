window.onload = async () => {
    let data = await fetch("/VisitProfileData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ProfileID: localStorage.getItem("ProfileID") }),
      })
      let response = await data.json()
      console.log(response)
      fetchPosts(response)
      addEventListenerToAnchorTag()
}

function fetchPosts(response) {
    const Base64 = response.user.profileImage
    const imgTag = document.getElementById("base64Image");
    imgTag.src = Base64;
    document.getElementById("username").innerHTML = response.user.username;
    document.getElementById("age").innerHTML = response.user.age;
    let postContainerData = ''
    response.user.posts.reverse().forEach((post) => {
        if (post.likes.includes(response.mainUserID)) {
          likebtn = `<a class="text-blue-700" href="/likeByMainUser/${post._id}">unlike</a>`
        } else {
          likebtn = `<a class="text-blue-700" href="/likeByMainUser/${post._id}">like</a>`
        }
        postContainerData += `                        <div
                                class="mt-10 w-[800px] bg-white p-6 rounded-lg shadow-lg mr-10  min-h-fit ">
                                <h5 class="text-blue-700 font-medium ">${response.user.username}</h5>
                                <div class="mb-4 mt-2">
                                    ${post.content}
                                </div>
                                <p>${post.likes.length} likes</p>
                                ${likebtn}
                            </div>`
      });
      let postContainer = document.getElementById("post-container");
      postContainer.innerHTML = postContainerData;
}


function addEventListenerToAnchorTag() {
    let anchorTag = document.getElementById("AchorTag")
    anchorTag.addEventListener("click", async (event) => {
        let data = await fetch("/RemoveFriend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ friendID: localStorage.getItem("ProfileID") }),
        })
        let response = data.json()
        if(response.suceess){
            window.location.href = "/profile"
        }else{
            window.location.href = "/profile"
        }
    })
}