## Routes

## adding rate-limit middleware

- POST request to `http://localhost:5001/api/v1/tracks` // creates a new track
- GET request to `http://localhost:5001/api/v1/tracks` // returns all tracks, with getting token which user logged in..
- GET request to `http://localhost:5001/api/v1/axios` // get all tracks, and adding rate-limiter