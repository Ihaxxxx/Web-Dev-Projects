window.onload = async () => {
    let data = await fetch("/friendsRequestData");
    let usersContainer = "";
    let response = await data.json();
    console.log(response.MainID._id)
    response.people.forEach(User => {
        if (User.receivedRequest.includes(response.MainID._id)) {
            usersContainer += `
                <div class="bg-white w-1/3 h-24 flex items-center justify-between p-6">
                    <div class="flex items-center">
                        <img class="w-16 h-16 rounded-lg mr-10" src="${User.profileImage || 'defaultImage.jpg'}" alt="User Profile Image">
                        <div>
                            <p class="text-blue-700">${User.username || 'Unknown User'}</p>
                            <p>${User.age || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="flex items-center felx-col gap-2">
                        <button id="${User._id}">
                            Add Friend
                        </button>
                        <button class="text-red-800" id="${User._id}">
                            Reject
                        </button>
                    </div>
                </div>
            `
        }
    });
    const idsContainer = document.getElementById("idsContainer");
    idsContainer.innerHTML = usersContainer;
}
