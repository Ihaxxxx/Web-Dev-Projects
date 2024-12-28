window.onload = async () => {
  let postArray = [];
  const response = await fetch("/userposts");
  const { people, MainID } = await response.json();
  let usersContainer = "";
  if (MainID.receivedRequest.length > 0) {
    let friendTab = document.getElementById("FriendTab");
    friendTab.classList.remove("text-gray-700");
    friendTab.classList.add("text-red-700");
  }

  people.forEach(element => {
    if (element.friends.includes(MainID._id)) {
      element.posts.forEach(e => {
        postArray.push(e);
      });
    }
  });
  let postContainer = ``;

  people.forEach(element => {
    console.log(postArray.sort());
    postArray.sort().reverse().forEach(post => {
      console.log(post)

      if (element._id == post.user) {
        
        if (element.friends.includes(MainID._id)) {
          let likebtn = "";
          if (post.likes.includes(MainID._id)) {
            likebtn = `<a class="text-blue-700" href="/likeByMainUserHomePage/${post._id}">unlike</a>`;
          } else {
            likebtn = `<a class="text-blue-700" href="/likeByMainUserHomePage/${post._id}">like</a>`;
          }
          postContainer += `                        <div
                            class="mt-10 w-[800px] bg-white p-6 rounded-lg shadow-lg mr-10  min-h-fit ">
                            <h5 class="text-blue-700 font-medium ">${element.username}</h5>
                            <div class="mb-4 mt-2">
                                ${post.content}
                            </div>
                            <p>${post.likes.length} likes</p>
                            ${likebtn}
                        </div>`;
        }
      }
    });
    document.getElementById("post-container").innerHTML = postContainer;
  });
};