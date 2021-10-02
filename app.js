// DOM Queries
const chatList = document.querySelector(".chat-list");
const chatRooms = document.querySelector(".chat-rooms");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-message");

// Add a New Chat
newChatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = newChatForm.message.value.trim();
  chatRoom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((error) => console.log(error));
});
// Update Username
newNameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatRoom.updateName(newName);
  newNameForm.reset();
  updateMessage.innerText = `Your name was updated successfully to ${newName}`;
  setTimeout(() => (updateMessage.innerText = ""), 3000);
});
chatRooms.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    chatUI.clear();
    chatRoom(event.target.getAttribute("id"));
    chatRoom.getChats(chat => chatUI.render(chat));
     }
     });
    

//Check localStorage for if a username is present
const username = localStorage.username ? localStorage.username : "robot";

// Class Instances
const chatUI = new ChatUI(chatList);
const chatRoom = new ChatRoom("general", username);

// Get Chats and Render Them
chatRoom.getChats((data) => chatUI.render(data));

/**
app.js joins everything together
addChat is an async function 

newNameForm
 updating the username via the ChatRoom class
*/
