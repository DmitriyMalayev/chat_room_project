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
    localStorage.setItem("username", username)
  }
  updateRoom(room) {
    this.room = room;
    if (this.unsub()) {
      this.unsub();
    }
  }
}



// setTimeout(() => {
//   chatroom.updateRoom("general");
//   chatroom.updateName("dmitriy");
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat("Hello");
// }, 3000);
