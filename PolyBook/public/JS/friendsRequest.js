window.onload = async () => {
    let data = await fetch("/friendsRequestData");
    let usersContainer = "";
    let response = await data.json();
    response.MainID.receivedRequest.forEach(User => {
        console.log(response.people, User)
        console.log(response.people[0]._id === User)

        response.people.forEach(user => {
            console.log(user)
            if (user._id === User ) {
                usersContainer += `
                <div class="bg-white w-1/3 h-24 flex items-center justify-between p-6">
                    <div class="flex items-center">
                        <img class="w-16 h-16 rounded-lg mr-10" src="${user.profileImage || 'defaultImage.jpg'}" alt="User Profile Image">
                        <div>
                            <p class="text-blue-700">${user.username || 'Unknown User'}</p>
                            <p>${user.age || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="flex items-center felx-col gap-2">
                        <button id="${user._id}" class="AcceptReq">
                            Add Friend
                        </button>
                        <button class="text-red-800 RejectReq" id="${user._id}">
                            Reject
                        </button>
                    </div>
                </div>
            `
            }
        })
    })
    const idsContainer = document.getElementById("idsContainer");
    if (idsContainer) {
        idsContainer.innerHTML = usersContainer;
        addEventListeners();
    }
}

function addEventListeners() {
    const acceptButtons = document.querySelectorAll(".AcceptReq");
    const rejectButtons = document.querySelectorAll(".RejectReq");
    acceptButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const friendID = event.target.id;
            const addResponse = await fetch("/acceptFriendReq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ friendID }),
            });
            const addResult = await addResponse.json();
            window.location.href = "/friends";
        })
    });
};
