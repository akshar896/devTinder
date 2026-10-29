authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRequestRouter
-POST /request/send/interested/:userID
-POST /request/send/ignored/:userID
-POST /request/review/accepted/:userID
-POST /request/review/rejected/:userID

userRouter
-GET user/connections
-GET user/requests
-GET user/feed -Gets you the profile of other user on the platform

Status:ignore,rejected,accepted,interested