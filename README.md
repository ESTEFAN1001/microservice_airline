# Airline Flight & Cargo Microservice

A lightweight, production-ready REST microservice emulating formal commercial airline flight and payload/cargo capacity across Bolivia. Built with Node.js and Express, with in-memory data, ready for instant hosting on [Render](https://render.com).

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

## Data Structure (Formal Airline Schema)

Each flight item strictly follows this formal structure:

```json
{
  "flight_id": "8J-105-20261015-LPB-VVI",
  "carrier_code": "8J",
  "flight_number": "105",
  "aircraft": {
    "type": "AR8",
    "model": "Avro RJ85",
    "registration": "CP-3087",
    "cargo_type": "BULK_LOADED"
  },
  "route": {
    "origin": "LPB",
    "destination": "VVI",
    "departure": "2026-10-15T08:00:00-04:00"
  },
  "payload_capacity": {
    "weight_unit": "KG",
    "max_structural_cargo_payload": 2200.0,
    "current_operational_limit": 1800.0,
    "breakdown": {
      "passenger_baggage_allocated": 950.0,
      "commercial_cargo_capacity": 850.0,
      "commercial_cargo_booked": 500.0,
      "available_cargo_capacity": 350.0
    },
    "compartments": [
      {
        "compartment_id": "HOLD_1_FWD",
        "name": "Bodega Delantera",
        "max_weight_limit": 1100.0,
        "current_weight": 700.0,
        "content_types": ["BAGGAGE", "CARGO"]
      },
      {
        "compartment_id": "HOLD_2_AFT",
        "name": "Bodega Trasera",
        "max_weight_limit": 1100.0,
        "current_weight": 750.0,
        "content_types": ["BAGGAGE", "CARGO", "MAIL"]
      }
    ]
  }
}
```

---

## Supported Carriers and Airports

### Carriers
- **`8J`**: EcoJet (Fleet: Avro RJ85 `AR8`)
- **`OB`**: Boliviana de Aviación / BoA (Fleet: Boeing 737-800 `B738`, Boeing 737-700 `B737`)

### Airport & Department Code Aliases
The search automatically normalizes department abbreviations and official IATA codes:
- **Cochabamba**: `CBBA` or `CBB`
- **La Paz**: `LPZ` or `LPB`
- **Santa Cruz**: `VVI`
- **Tarija**: `TJA`
- **Sucre**: `SRE`
- **Cobija**: `CIJ`
- **Trinidad**: `TDD`
- **Oruro**: `ORU`
- **Potosí**: `POT` or `POI`
- **Uyuni**: `UYU`

---

## API Endpoints & Filtering

### 1. Get All Flights (No Filter)
Returns all available flights across dates.

- **URL**: `/flights` (or `/api/flights`)
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl http://localhost:3000/flights
  ```

---

### 2. Filter Flights by Origin, Destination and Date
Filters flights matching origin, destination, and departure date.

- **URL**: `/flights?origin=:origin&destination=:destination&date=:date`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl "http://localhost:3000/flights?origin=LPB&destination=VVI&date=2026-10-15"
  ```
  *(Also accepts `origin=CBBA&destination=LPZ&date=2026-10-03`)*

---

### 3. Filter Flights by Date Only
Returns all flights operating in Bolivia on a specific date.

- **URL**: `/flights?date=:date`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl "http://localhost:3000/flights?date=2026-10-05"
  ```

---

### 4. Filter Flights by Flight Number or Carrier
- **URL**: `/flights?flight_number=:flight_number`
- **URL**: `/flights?carrier_code=:carrier_code`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl "http://localhost:3000/flights?flight_number=105&date=2026-10-15"
  ```

---

### 5. Get a Specific Flight by ID
- **URL**: `/flights/:id`
- **Method**: `GET`
- **Example Request**:
  ```bash
  curl http://localhost:3000/flights/8J-105-20261015-LPB-VVI
  ```

---

### 6. Health Check
- **URL**: `/health`
- **Method**: `GET`

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
6. Click **Create Web Service**.

### Option B: Using Render Blueprints
Render automatically detects the included `render.yaml` file:
1. Push this repository to GitHub.
2. In Render, select **Blueprints** -> **New Blueprint Instance**.
3. Select your repository. Render will automatically apply the build and start commands from `render.yaml`.
