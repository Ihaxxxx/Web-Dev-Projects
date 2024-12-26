let form = document.getElementById("mind-form");
let likebtn ;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let content = document.getElementById("mind-text").value
  let data = await fetch("/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content}),
  });  
  let response = await data.json();
  if (response) {
    fetchPosts()
  }
});

window.onload = async () => {
  fetchPosts()
}

async function fetchPosts() {
  localStorage.removeItem("postID","UserID")  ;
  localStorage.setItem("postID","")
  let data = await fetch("/userposts");
  let response = await data.json();
  const Base64 = response.user.profileImage
  const imgTag = document.getElementById("base64Image");
  imgTag.src = Base64;
  const username = document.getElementById("UserName");
  // console.log(response)
  username.innerHTML = response.user.username;
  let postContainerData = ''
  response.user.posts.reverse().forEach((post) => {
    if (post.likes.includes(response.user._id)) {
      likebtn = `<a class="text-blue-700" href="/like/${post._id}">unlike</a>`
    } else {
      likebtn = `<a class="text-blue-700" href="/like/${post._id}">like</a>`
    }
    postContainerData += `                        <div
                            class="mt-10 w-[800px] bg-white p-6 rounded-lg shadow-lg mr-10  min-h-fit ">
                            <h5 class="text-blue-700 font-medium ">${response.user.username}</h5>
                            <div class="mb-4 mt-2">
                                ${post.content}
                            </div>
                            <p>${post.likes.length} likes</p>
                            ${likebtn}
                            <a class="text-gray-700" name="${post._id}" href="/edit">edit</a>
                        </div>`
  });
  window.onclick = async (event) => {
    localStorage.setItem("postID", event.target.name)
    await fetch("/edit")
  }
  let postContainer = document.getElementById("post-container");
  postContainer.innerHTML = postContainerData;
}