window.onload = async () => {
  let data = await fetch("/userposts");
  let response = await data.json();
  localStorage.setItem("userID", JSON.stringify(response.user._id));
}