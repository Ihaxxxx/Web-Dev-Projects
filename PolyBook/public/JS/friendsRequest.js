window.onload = async () => {
    let data = await fetch("/friendsRequestData");
    let usersContainer = "";
    let response = await data.json();
    response.MainID.receivedRequest.forEach(MainUser => {
        // console.log(response.people, MainUser)
        // console.log(response.people[0]._id === MainUser)

        if(response.MainID.receivedRequest.length > 0){
            friendTab = document.getElementById("FriendTab");
            friendTab.classList.remove("text-gray-700");
            friendTab.classList.add("text-red-700");
        }
        response.people.forEach(People => {
            console.log(People)
            if (People._id === MainUser && !(People.friends.includes(response.MainID._id))) {
                usersContainer += `
                <div class="bg-white w-1/3 h-24 flex items-center justify-between p-6">
                    <div class="flex items-center">
                        <img class="w-16 h-16 rounded-lg mr-10" src="${People.profileImage || 'defaultImage.jpg'}" alt="User Profile Image">
                        <div>
                            <p class="text-blue-700">${People.username || 'Unknown User'}</p>
                            <p>${People.age || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="flex items-center felx-col gap-2">
                        <a id="${People._id}" class="AcceptReq">
                            Add Friend
                        </a>
                        <a class="text-red-800 RejectReq" id="${People._id}">
                            Reject
                        </a>
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
            if(addResult){
                window.location.href = "/friendsRequest";
            }
        })
    });
    rejectButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const friendID = event.target.id;
            const addResponse = await fetch("/rejectReq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ friendID }),
            });
            const addResult = await addResponse.json();
            if(addResult){
                window.location.href = "/friendsRequest";
            }
        })
    });
};
