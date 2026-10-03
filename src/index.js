const express = require('express');
const cors = require('cors');
const flights = require('./data/flights');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Root endpoint with API documentation and overview
 */
app.get('/', (req, res) => {
  res.json({
    name: 'Airline Flight Microservice',
    status: 'online',
    description: 'Emulates flight data between Bolivian destinations with filtering capabilities.',
    endpoints: {
      getAllOrFilter: 'GET /flights?origin=CBBA&destination=LPZ&flight_number=OB-101',
      getSingleFlight: 'GET /flights/:flight_number',
      health: 'GET /health'
    },
    sampleCodes: ['CBBA', 'LPZ', 'VVI', 'TJA', 'SRE', 'CIJ', 'TDD', 'ORU', 'POT']
  });
});

/**
 * Main flights endpoint
 * Supports query parameters:
 * - flight_number: Filter by flight number (e.g. OB-101)
 * - origin: Filter by origin code (e.g. CBBA)
 * - destination: Filter by destination code (e.g. LPZ)
 * If no filters are provided, all flights are returned.
 */
app.get(['/flights', '/api/flights'], (req, res) => {
  const { flight_number, origin, destination } = req.query;

  let results = flights;

  // Filter by flight_number if provided
  if (flight_number) {
    const targetFlightNumber = String(flight_number).trim().toUpperCase();
    results = results.filter(
      (flight) => flight.flight_number.toUpperCase() === targetFlightNumber
    );
  }

  // Filter by origin if provided
  if (origin) {
    const targetOrigin = String(origin).trim().toUpperCase();
    results = results.filter(
      (flight) => flight.origin.toUpperCase() === targetOrigin
    );
  }

  // Filter by destination if provided
  if (destination) {
    const targetDestination = String(destination).trim().toUpperCase();
    results = results.filter(
      (flight) => flight.destination.toUpperCase() === targetDestination
    );
  }

  res.json(results);
});

/**
 * Get flight by flight number parameter
 */
app.get(['/flights/:flight_number', '/api/flights/:flight_number'], (req, res) => {
  const targetFlightNumber = req.params.flight_number.trim().toUpperCase();
  const flight = flights.find(
    (f) => f.flight_number.toUpperCase() === targetFlightNumber
  );

  if (!flight) {
    return res.status(404).json({
      error: 'Flight not found',
      message: `No flight found with flight number: ${req.params.flight_number}`
    });
  }

  res.json(flight);
});

// Start server only when executed directly
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Flight microservice is running on port ${PORT}`);
  });
}

module.exports = app;

