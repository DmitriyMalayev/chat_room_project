// Render Chat Templates To The DOM
// Clear The List of Chats (When The Room Changes)

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  render(data) {
    <li class="list-group-item">
      <span class="username">${data.username}</span>
      <span class="message">${data.message}</span>
      <div class="time">${data.created_at.toDate()}</div>
    </li>;
    this.list.innerHTML += html;
  }
}

/*
list
  specifies where we are outputting the chats to.
  We use the parameter when creating UI so we have a reference.   
data
  The data property contains a single chat object. 
*/
