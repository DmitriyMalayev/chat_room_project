class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chat_rooms");
    this.unsub;
    //creating a property without a value so we can unsubscribe and subscribe later upon change in chat room.
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
    this.unsub = this.chats //When invoked will unsub from changes. Returns a function. 
      .where("room", "==", this.room)
      .orderBy("created_at", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // update UI
            callback(change.doc.data);
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
  }
  updateRoom(room) {
    this.room = room;
    this.unsub()
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
where()
  The method allows us to get documents from a certain collection where a certain condition is true.
  Arguments
    1. The property we want to assess
    2. Operator like "==" We use double equals in FireStore not triple equals. 
    3. The property we want to compare to.
*/
