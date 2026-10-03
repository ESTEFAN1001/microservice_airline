const express = require('express');
const cors = require('cors');
const flights = require('./data/flights');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

/**
 * Normalizes Bolivian airport and department acronyms:
 * - LPZ <-> LPB (La Paz)
 * - CBBA <-> CBB (Cochabamba)
 * - POT <-> POI (Potosí)
 */
function normalizeAirportCode(code) {
  if (!code) return [];
  const c = String(code).trim().toUpperCase();
  if (c === 'LPB' || c === 'LPZ') return ['LPB', 'LPZ'];
  if (c === 'CBB' || c === 'CBBA') return ['CBB', 'CBBA'];
  if (c === 'POI' || c === 'POT') return ['POI', 'POT'];
  return [c];
}

function matchesAirport(actual, query) {
  if (!query) return true;
  const actualVariants = normalizeAirportCode(actual);
  const queryVariants = normalizeAirportCode(query);
  return actualVariants.some((v) => queryVariants.includes(v));
}

function matchesFlightNumber(flight, query) {
  if (!query) return true;
  const q = String(query).trim().toUpperCase();
  const numOnly = flight.flight_number.toUpperCase();
  const fullCode = `${flight.carrier_code}-${flight.flight_number}`.toUpperCase();
  const flightId = flight.flight_id.toUpperCase();

  return (
    numOnly === q ||
    fullCode === q ||
    flightId === q ||
    flightId.includes(q)
  );
}

function matchesDate(flight, query) {
  if (!query) return true;
  const q = String(query).trim();
  const qCompact = q.replace(/-/g, '');
  const departureDate = flight.route.departure.slice(0, 10);
  const departureCompact = departureDate.replace(/-/g, '');

  return (
    departureDate === q ||
    departureCompact === qCompact ||
    flight.flight_id.includes(qCompact)
  );
}

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
 * Root endpoint with API overview and usage instructions
 */
app.get('/', (req, res) => {
  res.json({
    name: 'Airline Flight Microservice',
    status: 'online',
    description: 'Emulates formal flight cargo & passenger capacity data for Bolivian aviation.',
    endpoints: {
      getAllOrFilter: 'GET /flights?origin=CBBA&destination=LPZ&date=2026-10-03&flight_number=101',
      getSingleFlight: 'GET /flights/:id?date=2026-10-15',
      health: 'GET /health'
    },
    sampleReferenceFlight: '8J-105-20261015-LPB-VVI',
    supportedCarriers: ['8J (EcoJet)', 'OB (Boliviana de Aviación)'],
    supportedAirports: ['CBBA / CBB', 'LPZ / LPB', 'VVI', 'TJA', 'SRE', 'CIJ', 'TDD', 'ORU', 'POT / POI', 'UYU']
  });
});

/**
 * Main flights endpoint
 * Supports query parameters:
 * - origin: Departure airport code (e.g. CBBA, CBB, LPB, LPZ, VVI)
 * - destination: Arrival airport code (e.g. LPZ, LPB, VVI)
 * - date / flight_date: Date formatted as YYYY-MM-DD or YYYYMMDD (e.g. 2026-10-03, 2026-10-15)
 * - flight_number: Flight number (e.g. 105, 8J-105, OB-101)
 * - flight_id: Full flight identifier (e.g. 8J-105-20261015-LPB-VVI)
 * - carrier_code: Carrier IATA code (e.g. 8J, OB)
 *
 * If no filters are provided, returns all flights.
 */
app.get(['/flights', '/api/flights'], (req, res) => {
  const { origin, destination, flight_number, flight_id, carrier_code, date, flight_date } = req.query;

  let results = flights;

  // Filter by flight_id if provided
  if (flight_id) {
    const targetId = String(flight_id).trim().toUpperCase();
    results = results.filter((f) => f.flight_id.toUpperCase() === targetId);
  }

  // Filter by carrier_code if provided
  if (carrier_code) {
    const targetCarrier = String(carrier_code).trim().toUpperCase();
    results = results.filter((f) => f.carrier_code.toUpperCase() === targetCarrier);
  }

  // Filter by flight_number if provided
  if (flight_number) {
    results = results.filter((f) => matchesFlightNumber(f, flight_number));
  }

  // Filter by origin if provided
  if (origin) {
    results = results.filter((f) => matchesAirport(f.route.origin, origin));
  }

  // Filter by destination if provided
  if (destination) {
    results = results.filter((f) => matchesAirport(f.route.destination, destination));
  }

  // Filter by date if provided
  const queryDate = date || flight_date;
  if (queryDate) {
    results = results.filter((f) => matchesDate(f, queryDate));
  }

  res.json(results);
});

/**
 * Get flight by ID or flight number (supports optional date query param)
 */
app.get(['/flights/:id', '/api/flights/:id'], (req, res) => {
  const paramId = req.params.id.trim().toUpperCase();
  const queryDate = req.query.date || req.query.flight_date;

  let matching = flights.filter(
    (f) =>
      f.flight_id.toUpperCase() === paramId ||
      matchesFlightNumber(f, paramId)
  );

  if (queryDate) {
    matching = matching.filter((f) => matchesDate(f, queryDate));
  }

  if (matching.length === 0) {
    return res.status(404).json({
      error: 'Flight not found',
      message: `No flight found matching: ${req.params.id}${queryDate ? ` on date: ${queryDate}` : ''}`
    });
  }

  res.json(matching.length === 1 ? matching[0] : matching);
});

// Start server only when executed directly
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Flight microservice is running on port ${PORT}`);
  });
}

module.exports = app;
