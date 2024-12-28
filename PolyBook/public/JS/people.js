

window.onload = async () => {
    try {
        // Fetch people data
        const response = await fetch("/peopleData");
        const { people, MainID } = await response.json();
        console.log(people, MainID);
        let usersContainer = "";
        if(MainID.receivedRequest.length > 0){
            friendTab = document.getElementById("FriendTab");
            friendTab.classList.remove("text-gray-700");
            friendTab.classList.add("text-red-700");
        }

        // Build the user cards
        people.forEach(user => {
            isFriend = MainID.friends.includes(user._id);
            receivedRequest = MainID.receivedRequest.includes(user._id);
            if (isFriend) return;
            if (receivedRequest) return;
            const isPending = MainID.pendingRequest.includes(user._id);
            usersContainer += `
                <div class="bg-white w-1/3 h-24 flex items-center justify-between p-6">
                    <div class="flex items-center">
                        <img class="w-16 h-16 rounded-lg mr-10" src="${user.profileImage || 'defaultImage.jpg'}" alt="User Profile Image">
                        <div>
                            <p class="text-blue-700">${user.username || 'Unknown User'}</p>
                            <p>${user.age || 'N/A'}</p>
                        </div>
                    </div>
                    <div>
                        <button id="${user._id}" class="friend-action">
                            ${isPending ? "Pending" : "Add Friend"}
                        </button>
                    </div>
                </div>
            `;
        });

        // Inject HTML into container
        const idsContainer = document.getElementById("idsContainer");
        if (idsContainer) {
            idsContainer.innerHTML = usersContainer;
        } else {
            console.error("Container with ID 'idsContainer' not found.");
            return;
        }

        // Handle button click events
        window.onclick = async (event) => {
            if (event.target.tagName === "BUTTON" && event.target.classList.contains("friend-action")) {
                const button = event.target;
                const friendID = button.id;

                if (button.innerText === "Add Friend") {
                    // Send add friend request
                    const addResponse = await fetch("/addFriend", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ friendID }),
                    });
                    const addResult = await addResponse.json();
                    console.log(addResult);
                    window.location.href = "/people";
                }

                if (button.innerText === "Pending") {
                    // Send cancel request
                    const cancelResponse = await fetch("/CancelRequest", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ friendID }),
                    });
                    const cancelResult = await cancelResponse.json();
                    window.location.href = "/people";
                }
            }
        };
    } catch (error) {
        console.error("Error loading people data:", error);
        document.getElementById("header").innerHTML = "No People Data to Display as you have sent requests to all users";
    }
};
