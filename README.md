

#Infonexus APIs

 
## User Endpoints

### User Signup

- **URL:** `http://localhost:3000/user/signup`
- **Method:** `POST`
- **Request Body:**
  - `email` (String, required): Email of the user.
  - `password` (String, required): Password for the user.
  - `name` (String, optional): Name of the user.

### User Login

- **URL:** `http://localhost:3000/user/login`
- **Method:** `POST`
- **Request Body:**
  - `email` (String, required): Email of the user.
  - `password` (String, required): Password for the user.

## Doctor Endpoints

### Add Doctor

- **URL:** `http://localhost:3000/doctor/add-doctor`
- **Method:** `POST`
- **Request Body:**
  - `doctorId` (String, required): Unique identifier for the doctor.
  - `name` (String, required): Name of the doctor.
  - `specialty` (String, required): Specialty of the doctor.
  - `hospital` (String, required): Hospital where the doctor works.
  - `location` (String, required): Location/address of the hospital.
  - `contact` (String, required): Contact information for the doctor.

### Search Doctors

- **URL:** `http://localhost:3000/doctor/search-doctor`
- **Method:** `POST`
- **Request Body:**
  - `page` (Number, optional): Page number for pagination (default is 1).
  - `limit` (Number, optional): Number of results per page (default is 10).
  - `search` (String, optional): Search query to filter doctors by name.

## Request and Response Examples

### User Signup Example

**Request:**
```json
POST /users/signup
{
  "email": "example@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (Success):**
```json
Status: 201 Created
{
  "_id": "user_id",
  "email": "example@example.com",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Response (Error - Email Already Taken):**
```json
Status: 400 Bad Request
{
  "error": "Email is already taken"
}
```

### User Login Example

**Request:**
```json
POST /users/login
{
  "email": "example@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
Status: 200 OK
{
  "_id": "user_id",
  "name": "John Doe",
  "token": "jwt_token",
  "email": "example@example.com",
  "msg": "login is successful"
}
```

**Response (Error - User Not Found):**
```json
Status: 404 Not Found
{
  "msg": "User not found"
}
```

### Doctor Add Example

**Request:**
```json
POST /doctors/add
{
  "doctorId": "DOC001",
  "name": "Dr. John Doe",
  "specialty": "Cardiology",
  "hospital": "City Hospital",
  "location": "123 Main Street, City",
  "contact": "123-456-7890"
}
```

**Response (Success):**
```json
Status: 201 Created
{
  "_id": "doctor_id",
  "name": "Dr. John Doe",
  "specialty": "Cardiology",
  "hospital": "City Hospital",
  "location": "123 Main Street, City",
  "contact": "123-456-7890"
}
```

**Response (Error - Doctor Already Exists):**
```json
Status: 400 Bad Request
{
  "message": "Doctor ID already exists"
}
```

### Doctor Search Example

**Request:**
```json
POST /doctors/search
{
  "page": 1,
  "limit": 10,
  "search": "cardiology"
}
```

**Response (Success):**
```json
Status: 200 OK
{
  "doctors": [
    {
      "_id": "doctor_id",
      "name": "Dr. John Doe",
      "specialty": "Cardiology",
      "hospital": "City Hospital",
      "location": "123 Main Street, City",
      "contact": "123-456-7890"
    },
    {
      "_id": "doctor_id",
      "name": "Dr. Jane Smith",
      "specialty": "Cardiology",
      "hospital": "Community Clinic",
      "location": "456 Elm Street, Town",
      "contact": "987-654-3210"
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "totalCount": 2
}
```

**Response (Error):**
```json
Status: 500 Internal Server Error
{
  "message": "Failed to search doctors"
}
```

