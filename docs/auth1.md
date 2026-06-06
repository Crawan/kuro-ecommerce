# Walkthrough: Backend Route Verification & Testing

This document summarizes the changes verified during testing of the Express backend routes, including the fixes applied to authentication, token serialization, and database queries.

## Verified Changes

### 1. Root Route Configuration
- **File:** [index.js](file:///home/anko/Documents/Otodidak/Kuro/backend/src/index.js)
- **Change:** Changed `/profile` registration from `kuro.use` to `kuro.get` to explicitly bind it to the GET method.

### 2. Token Generation & Sign In
- **File:** [jwt.js](file:///home/anko/Documents/Otodidak/Kuro/backend/src/utils/jwt.js) & [users.js](file:///home/anko/Documents/Otodidak/Kuro/backend/src/controllers/users.js)
- **Change:** 
  - Removed the `async` wrapper from `createToken` so it synchronously signs and returns a token string.
  - Removed the unnecessary `await` statement from `signIn` when creating the token.
  - This resolves the serialization bug where the JWT field returned `{}` (empty object) instead of the signed token.

### 3. Token Verification & Middleware Security
- **File:** [jwt.js (utils)](file:///home/anko/Documents/Otodidak/Kuro/backend/src/utils/jwt.js) & [jwt.js (middleware)](file:///home/anko/Documents/Otodidak/Kuro/backend/src/middlewares/jwt.js)
- **Change:**
  - Modified `decodeJWT` to throw an error inside the `catch` block on verification failure instead of returning the error or `false`.
  - Updated `verifyToken` middleware to catch the thrown verification error and return a formatted error response immediately, preventing unauthorized requests from bypassing the authentication layer.

### 4. Database Queries
- **File:** [users.js](file:///home/anko/Documents/Otodidak/Kuro/backend/src/controllers/users.js)
- **Change:** Added `await` when calling `user.getUserByUsername` inside `profile`, ensuring that the response returns the database row object rather than an unresolved promise serialization (`{}`).

---

## Route Test Results

All routes were verified using an automated route-testing script:

| Route | HTTP Method | Expected Behavior | Actual Behavior | Status |
|---|---|---|---|---|
| `/` | `GET` | Returns hello message | `{ "message": "Hello world" }` | **PASS** |
| `/register` | `POST` | Registers a new user | Returns new user info | **PASS** |
| `/login` | `POST` | Validates credentials and returns JWT | Returns user object & token string | **PASS** |
| `/profile` | `GET` | Decodes valid token and gets profile data | Returns complete user profile | **PASS** |
| `/profile` | `GET` | Rejects invalid/malformed tokens | Returns `{ "success": false, "message": "Failed to get profile!" }` | **PASS** |
