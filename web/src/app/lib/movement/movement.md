
## Steps for movement


1. Ensure the pawn object is the pawn object of the user. (Maybe we should assign userId to pawn?)
2. When board is loaded, bind event listeners to the pawn of the user
3. Event should be listening to arrows at first
4. On each event we should make a REST API call to validate the move.
5. Validation should be done completely server side. (We do not send any data except the access token)
6. When The action is valid, we save the new "state" in the database. 
In other words: Move the pawn. We do this to ensure the state is being managed properly.
(Whenever a user goes offline, we have the most recent state)
7. On turn ended, we trigger through the STOMP client a message 
Which all players will receive. On that message the client will refresh the board.


