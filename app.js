// DOM Queries
const chatList = document.querySelector(".chat-list");

// Class Instances
const chatUI = new ChatUI(chatList);
const chatRoom = new ChatRoom("general", "Dmitriy");

// Get Chats and Render Them
chatRoom.getChats((data) => chatUI.render(data));

/**
app.js joins everything together
 
 
 
*/
