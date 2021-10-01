class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chat_rooms");
  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    this.chats.onSnapshot((snapshot) => {
      snapshot.docChanges.forEach((change) => {
        if (change.type === "added") {
          // update UI
          callback(change.doc.data);
        }
      });
    });
  }
}
const chatroom = new ChatRoom("general", "Dmitriy");
chatroom
  .addChat("First Message")
  .then(() => console.log("chat added"))
  .catch((err) => console.log(err));
const chatroom2 = new ChatRoom("general", "robot");
chatroom2.getChats((data) => console.log(data));

/*
Adding New Chat Documents To The Chat Collection with Async Method 
Setting Up a Real Time Listener To Get New Chats Whenever They're Added To The DB. Not Async. 
Updating The Username After Submitting An Update
Updating The Room Upon Clicking 

Notes
  docChanges returns an Array with changes. 
  forEach is called on the Array
*/
