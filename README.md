# Airline Flight Microservice

A lightweight, production-ready REST microservice emulating flight routes across Bolivia. Built with Node.js and Express, with in-memory data, ready for instant hosting on [Render](https://render.com).

## Getting Started Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
For auto-reload during development:
```bash
npm run dev
```

The service will run at `http://localhost:3000`.

### 3. Run Automated Tests
```bash
npm test
```

---

## API Endpoints

### 1. Get All Flights (No Filter)
Returns all available flights.

- **URL**: `/flights` (or `/api/flights`)
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl http://localhost:3000/flights
  ```
- **Example Response**:
  ```json
  [
    { "flight_number": "OB-101", "origin": "CBBA", "destination": "LPZ" },
    { "flight_number": "OB-102", "origin": "LPZ", "destination": "CBBA" },
    { "flight_number": "OB-103", "origin": "CBBA", "destination": "VVI" },
    ...
  ]
  ```

---

### 2. Filter Flights by Origin and Destination
Filters flights matching the specified origin and destination.

- **URL**: `/flights?origin=:origin&destination=:destination`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl "http://localhost:3000/flights?origin=CBBA&destination=LPZ"
  ```
- **Example Response**:
  ```json
  [
    {
      "flight_number": "OB-101",
      "origin": "CBBA",
      "destination": "LPZ"
    }
  ]
  ```

---

### 3. Filter Flights by Flight Number (Query Param)
- **URL**: `/flights?flight_number=:flight_number`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl "http://localhost:3000/flights?flight_number=OB-101"
  ```
- **Example Response**:
  ```json
  [
    {
      "flight_number": "OB-101",
      "origin": "CBBA",
      "destination": "LPZ"
    }
  ]
  ```

---

### 4. Get a Single Flight by Path Parameter
- **URL**: `/flights/:flight_number`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl http://localhost:3000/flights/OB-101
  ```
- **Example Response**:
  ```json
  {
    "flight_number": "OB-101",
    "origin": "CBBA",
    "destination": "LPZ"
  }
  ```
- **If Not Found (404)**:
  ```json
  {
    "error": "Flight not found",
    "message": "No flight found with flight number: OB-999"
  }
  ```

---

### 5. Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Example Response**:
  ```json
  {
    "status": "ok",
    "uptime": 45.12,
    "timestamp": "2026-10-03T21:48:43.000Z"
  }
  ```

---

## How to Deploy to Render

### Option A: Using the Render Dashboard (Simplest)
1. Push this project to your GitHub/GitLab repository.
2. Log in to [Render](https://dashboard.render.com/).
3. Click **New +** and select **Web Service**.
4. Connect your Git repository.
5. Fill in the service settings:
   - **Name**: `airline-flight-microservice`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Click **Create Web Service**. Render will automatically detect the port via `process.env.PORT` and provide your public URL.

### Option B: Using Render Blueprints
Render automatically detects the included `render.yaml` file:
1. Push this repository to GitHub.
2. In Render, select **Blueprints** -> **New Blueprint Instance**.
3. Select your repository. Render will automatically apply the build and start commands from `render.yaml`.
