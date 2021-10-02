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
setTimeout()
  This will emulate a user changing a room and their username

