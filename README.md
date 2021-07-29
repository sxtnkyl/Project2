[Timbre WireFrame.pdf](https://github.com/sxtnkyl/Timbre/files/6895481/Timbre.WireFrame.pdf)
# Project 2: Timbre
## WHY IS THIS IDEA GOOD / WHY WOULD THIS IDEA BE BENEFICIAL?
Timbre is a connection platform for musicians to find their band-mate soul-mates.
Timbre is looking to "bridge" the gap for musical connections, and increase live musical performances.  

### DATABASE:
TABLES - columns
* User - id(pk), username, password, user_instrument(fk), user_genre(fk), content, photo_str, connections(fk),
* Instrument - id(pk), type 
* Genres - id(pk), name
* Connections - id(pk), user_id, target_id, accepted

* FUTURE DEV: Chat table for sockets

### WHAT IS THE RELATIONSHIP?
* one-to-many: User to Connections
* one-to-one: User to Instrument
* one-to-one: User to Genres

### PAGE ROUTES
* Home/Login
* UserProfile
* Search
* View Single User (from Search)
* User's Connections

### API ROUTES:
```
GET /API/User/ -all users (or first so many)
GET /API/User/:id -get single user info
GET /API/User/ -with filters > req.body
GET /API/Connections/user/:user_id -user_id = target_id
```
```
POST /API/Connection/user_id&:target_id //what is route for// does this create new connections?
POST /LOGIN -create user
```
```
PUT /API/User/:data
```
```
DELETE /API/Connections/:target_id - on rejection
DELETE /API/Connections/:user_id
```

### Wireframing:

### Acceptance Criteria:

### Technologies

### Future Functionality
Chat feature, multiple instruments, expanded library of instruments, select specific connections to remove, filter previous matches
