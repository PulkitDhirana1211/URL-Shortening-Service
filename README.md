# URL Shortening Service

A simple RESTful API service that allows users to shorten long URLs. The API provides full CRUD operations along with access statistics tracking for shortened URLs.

## Features

- ✨ Create shortened URLs with randomly generated unique codes
- 🔍 Retrieve original URLs from short codes
- ✏️ Update existing shortened URLs
- 🗑️ Delete shortened URLs
- 📊 Track and retrieve access statistics
- 🔢 Sequential ID generation using database counters
- ✅ Request validation and error handling

## Project Link: https://roadmap.sh/projects/url-shortening-service

## Technology Stack

- **Backend Framework**: [Your framework - e.g., Node.js/Express, Python/Flask, etc.]
- **Database**: [Your database - e.g., MongoDB, PostgreSQL, etc.]
- **ID Generation**: Counter-based sequential IDs using database counters collection

## Database Design

### Collections

1. **URLs Collection**: Stores the shortened URL data
2. **Counters Collection**: Maintains sequential ID generation

### ID Generation Strategy

The application uses a counter-based approach for generating unique, incremental IDs:

1. Before creating a new URL document, the system queries the counters collection
2. Retrieves the latest ID value for the URL collection
3. Increments the counter by 1
4. Assigns the new ID to the URL document being created
5. Updates the counter in the counters collection

This ensures that each URL document receives a unique, sequential ID without relying on database auto-increment features.

## API Endpoints

### Base URL
```
http://localhost:[PORT]/api
```

### 1. Create Short URL

Creates a new shortened URL with a randomly generated unique short code.

**Endpoint**: `POST /shorten`

**Request Body**:
```json
{
  "url": "https://www.example.com/some/long/url"
}
```

**Success Response** (201 Created):
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Invalid URL format"
}
```

---

### 2. Retrieve Original URL

Retrieves the original URL associated with a short code.

**Endpoint**: `GET /shorten/:shortCode`

**Example**: `GET /shorten/abc123`

**Success Response** (200 OK):
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Error Response** (404 Not Found):
```json
{
  "error": "Short URL not found"
}
```

**Note**: The frontend is responsible for retrieving the original URL and handling the redirect to the destination.

---

### 3. Update Short URL

Updates the original URL associated with an existing short code.

**Endpoint**: `PUT /shorten/:shortCode`

**Example**: `PUT /shorten/abc123`

**Request Body**:
```json
{
  "url": "https://www.example.com/some/updated/url"
}
```

**Success Response** (200 OK):
```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

**Error Responses**:
- **400 Bad Request**: Invalid URL format
- **404 Not Found**: Short URL not found

---

### 4. Delete Short URL

Deletes an existing shortened URL.

**Endpoint**: `DELETE /shorten/:shortCode`

**Example**: `DELETE /shorten/abc123`

**Success Response** (204 No Content):
```
No content returned
```

**Error Response** (404 Not Found):
```json
{
  "error": "Short URL not found"
}
```

---

### 5. Get URL Statistics

Retrieves access statistics for a shortened URL, including the number of times it has been accessed.

**Endpoint**: `GET /shorten/:shortCode/stats`

**Example**: `GET /shorten/abc123/stats`

**Success Response** (200 OK):
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 10
}
```

**Error Response** (404 Not Found):
```json
{
  "error": "Short URL not found"
}
```

---

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-shortening-service
```

2. Install dependencies:
```bash
npm install  # or yarn install, pip install -r requirements.txt, etc.
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database and counters collection:
```bash
# Run database migrations or initialization script
npm run db:init
```

5. Start the server:
```bash
npm start  # or npm run dev for development mode
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/url-shortener
# Add other configuration variables as needed
```

## Short Code Generation

Short codes are generated using a random string generator that ensures:
- Uniqueness (checked against existing codes in the database)
- URL-safe characters (alphanumeric)
- Configurable length (default: 6-8 characters)

## Frontend Integration (Optional)

The API can be integrated with a frontend application that provides:
- User interface for creating shortened URLs
- Automatic redirect functionality for short URLs
- Dashboard for viewing statistics
- Management interface for updating/deleting URLs

### Redirect Implementation

1. Call `GET /shorten/:shortCode` to retrieve the original URL
2. Increment the access count (if tracking is implemented)
3. Redirect the user to the original URL using `window.location.href` or similar

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Validation errors
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server errors

## Data Validation

All endpoints validate:
- URL format (must be a valid HTTP/HTTPS URL)
- Short code format (alphanumeric characters)
- Required fields presence

## Future Enhancements

- [ ] Custom short codes (user-defined)
- [ ] Expiration dates for shortened URLs
- [ ] QR code generation for shortened URLs
- [ ] Analytics dashboard with detailed statistics
- [ ] Rate limiting to prevent abuse
- [ ] User authentication and personal URL management
- [ ] Bulk URL shortening
- [ ] Link preview generation

---

**Built with ❤️ for efficient URL management**
