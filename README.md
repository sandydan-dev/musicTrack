## Routes

## adding rate-limit middleware

- POST request to `http://localhost:5001/api/v1/tracks` // creates a new track
- GET request to `http://localhost:5001/api/v1/tracks` // returns all tracks, with getting token which user logged in..
- GET request to `http://localhost:5001/api/v1/axios` // get all tracks, and adding rate-limiter

GET `/api/v1/like/<ID-67dab329b9608c791e29a0df>?trackId=1` // like a track by userId to trackId and return the track with the new like count `(/api/v1/like/<param-USER_ID>?trackId=1)` with this route

