# Endpoint Testing Report: Register & Login

We tested the `/register` and `/login` endpoints.

## Bugs Identified & Fixed

During our testing, we found and corrected the following issues:

1. **`src/utils/user.js`**:
   - **Bug**: `bcrypt.genSalt(13)` returns a Promise which was passed directly into `bcrypt.hash(...)` without being awaited. This caused registration to crash with: `data must be a string or Buffer and salt must either be a salt string or a number of rounds`.
   - **Fix**: Added `await` to `bcrypt.genSalt(13)`.
   - **Bug**: `bcrypt.compare` was not awaited inside `compareHash`.
   - **Fix**: Added `await` to `bcrypt.compare`.

2. **`src/database/repository/users.js`**:
   - **Bug**: In the `login` function, the `email` argument was passed directly as the second argument to `pool.query(...)` instead of being wrapped in an array, throwing `Query values must be an array`.
   - **Fix**: Wrapped `email` in an array: `[email]`.

3. **`src/controllers/users.js`**:
   - **Bug**: In `signIn`, `compareHash` was called without `await`. Since `compareHash` is async and returns a Promise, `isValid` was always truthy, bypassing password verification.
   - **Fix**: Added `await` to `compareHash(password, row.password)`.
   - **Bug**: If a user tried logging in with an email that doesn't exist, `row` would be `null` and trying to access `row.password` would crash the application.
   - **Fix**: Checked if `row` is `null` first and returned a `400/500` or validation error if it doesn't exist.

---

## Test Cases & Outputs

### 1. Register Route (`POST /register`)
- **Payload**:
  ```json
  {
    "username": "testuser",
    "password": "mysecurepassword",
    "email": "testuser_123@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User successfully registered",
    "data": {
      "uuid": "019e971f-cb87-7521-a69f-b5fc43a8a348",
      "username": "testuser",
      "email": "testuser_123@example.com"
    }
  }
  ```

### 2. Login Route (`POST /login`) - Success Case
- **Payload**:
  ```json
  {
    "email": "testuser_123@example.com",
    "password": "mysecurepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User successfully logged in",
    "data": {
      "email": "testuser_123@example.com",
      "password": "$2b$13$I6oMH7blJKgOBJ6HA2sxkeyriT/HEXx2sKqnHEHyLCLxaOlT9zMS6"
    }
  }
  ```

### 3. Login Route (`POST /login`) - Incorrect Password
- **Payload**:
  ```json
  {
    "email": "testuser_123@example.com",
    "password": "wrongpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": false,
    "message": "Uh oh email or password is incorrect!",
    "data": null
  }
  ```

### 4. Login Route (`POST /login`) - Non-existent User
- **Payload**:
  ```json
  {
    "email": "nonexistent@example.com",
    "password": "mysecurepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": false,
    "message": "Uh oh email or password is incorrect!",
    "data": null
  }
  ```
