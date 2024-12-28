let form = document.getElementById("mind-form");
let likebtn;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let content = document.getElementById("mind-text").value
  let data = await fetch("/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  let response = await data.json();
  if (response) {
    document.getElementById("mind-text").value = ""
    fetchPosts()
  }
});

window.onload = async () => {
  localStorage.removeItem("ProfileID")
  fetchPosts()
  fetchFriends()
}

async function fetchPosts() {
  localStorage.removeItem("postID", "UserID");
  localStorage.setItem("postID", "")
  let datauserposts = await fetch("/userposts");
  const { people, MainID } = await datauserposts.json();
  const Base64 = MainID.profileImage
  const imgTag = document.getElementById("base64Image");
  imgTag.src = Base64;
  const username = document.getElementById("UserName");
  // console.log(response)
  if(MainID.receivedRequest.length > 0){
    friendTab = document.getElementById("FriendTab");
    friendTab.classList.remove("text-gray-700");
    friendTab.classList.add("text-red-700");
}
  username.innerHTML = MainID.username;
  let postContainerData = ''
  MainID.posts.reverse().forEach((post) => {
    if (post.likes.includes(MainID._id)) {
      likebtn = `<a class="text-blue-700" href="/like/${post._id}">unlike</a>`
    } else {
      likebtn = `<a class="text-blue-700" href="/like/${post._id}">like</a>`
    }
    postContainerData += `                        <div
                            class="mt-10 w-[800px] bg-white p-6 rounded-lg shadow-lg mr-10  min-h-fit ">
                            <h5 class="text-blue-700 font-medium ">${MainID.username}</h5>
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
async function fetchFriends() {
  let data = await fetch("/friendsData");
  let response = await data.json();
  let usersContainer = ''
  response.people.forEach((PeopleData) => {
    if (PeopleData.friends.includes(response.MainID._id)) {
      usersContainer += `                        <div id="${PeopleData._id}" class=" w-1/2 h-25 flex items-center bg-gray-100 rounded-lg justify-center p-6 gap-4">
                            <img src="${PeopleData.profileImage}" class="w-10 h-10 rounded-lg"  alt="">
                            <div class="flex items-center gap-4">
                            <a href="/VisitProfile"  id="${PeopleData._id}">
                                <p class="text-blue-700">${PeopleData.username}</p>
                                <p>${PeopleData.age}</p>
                            </a>
                            </div>    
                        </div>`
    }
  })
  document.getElementById("friendsContainer").innerHTML = usersContainer
  fetchAnchorTags()

}
// href="/profile/${PeopleData._id}"

function fetchAnchorTags() {
  let anchorTags = document.getElementsByTagName("a")
  Array.from(anchorTags).forEach((anchor) => {
    anchor.addEventListener("click", async (event) => {
      localStorage.setItem("ProfileID", anchor.id)
    })
  })
}
