/**
 * In-memory formal flight cargo & schedule emulation for Bolivian domestic aviation.
 *
 * Supported airline carriers:
 * - 8J: EcoJet (Fleet: Avro RJ85)
 * - OB: Boliviana de Aviación (Fleet: Boeing 737-800, Boeing 737-700)
 *
 * Airport / city codes:
 * - CBBA / CBB: Cochabamba (Jorge Wilstermann)
 * - LPZ  / LPB: La Paz (El Alto)
 * - VVI:        Santa Cruz (Viru Viru)
 * - TJA:        Tarija (Capitán Oriel Lea Plaza)
 * - SRE:        Sucre (Alcantarí)
 * - CIJ:        Cobija (Capitán Aníbal Arab)
 * - TDD:        Trinidad (Jorge Henrich Arauz)
 * - ORU:        Oruro (Juan Mendoza)
 * - POT  / POI: Potosí (Capitán Nicolás Rojas)
 * - UYU:        Uyuni (Joya Andina)
 */

// Route templates with carrier, flight numbers, aircraft specs and departure times
const routeDefinitions = [
  // EcoJet LPB <-> VVI (Includes the exact reference flight 8J-105)
  {
    carrier: '8J',
    origin: 'LPB',
    destination: 'VVI',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-3087', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '105', departure_time: '08:00:00-04:00' },
      { flight_number: '107', departure_time: '14:30:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'VVI',
    destination: 'LPB',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-2814', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '106', departure_time: '10:15:00-04:00' },
      { flight_number: '108', departure_time: '17:00:00-04:00' }
    ]
  },

  // BoA CBBA <-> LPZ / LPB Trunk Line
  {
    carrier: 'OB',
    origin: 'CBBA',
    destination: 'LPZ',
    aircraft: { type: 'B738', model: 'Boeing 737-800', registration: 'CP-3138', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '101', departure_time: '06:45:00-04:00' },
      { flight_number: '103', departure_time: '11:20:00-04:00' },
      { flight_number: '105', departure_time: '15:40:00-04:00' },
      { flight_number: '107', departure_time: '19:30:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'LPZ',
    destination: 'CBBA',
    aircraft: { type: 'B738', model: 'Boeing 737-800', registration: 'CP-3151', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '102', departure_time: '08:00:00-04:00' },
      { flight_number: '104', departure_time: '12:35:00-04:00' },
      { flight_number: '106', departure_time: '17:15:00-04:00' },
      { flight_number: '108', departure_time: '21:00:00-04:00' }
    ]
  },

  // BoA CBBA <-> VVI Trunk Line
  {
    carrier: 'OB',
    origin: 'CBBA',
    destination: 'VVI',
    aircraft: { type: 'B738', model: 'Boeing 737-800', registration: 'CP-3138', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '121', departure_time: '07:30:00-04:00' },
      { flight_number: '123', departure_time: '13:00:00-04:00' },
      { flight_number: '125', departure_time: '18:15:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'VVI',
    destination: 'CBBA',
    aircraft: { type: 'B738', model: 'Boeing 737-800', registration: 'CP-3151', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '122', departure_time: '09:15:00-04:00' },
      { flight_number: '124', departure_time: '14:45:00-04:00' },
      { flight_number: '126', departure_time: '20:00:00-04:00' }
    ]
  },

  // BoA LPZ <-> VVI Trunk Line
  {
    carrier: 'OB',
    origin: 'LPZ',
    destination: 'VVI',
    aircraft: { type: 'B738', model: 'Boeing 737-800', registration: 'CP-3112', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '141', departure_time: '07:00:00-04:00' },
      { flight_number: '143', departure_time: '12:00:00-04:00' },
      { flight_number: '145', departure_time: '17:30:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'VVI',
    destination: 'LPZ',
    aircraft: { type: 'B738', model: 'Boeing 737-800', registration: 'CP-3112', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '142', departure_time: '08:45:00-04:00' },
      { flight_number: '144', departure_time: '13:45:00-04:00' },
      { flight_number: '146', departure_time: '19:15:00-04:00' }
    ]
  },

  // Tarija (TJA) Routes
  {
    carrier: 'OB',
    origin: 'CBBA',
    destination: 'TJA',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2923', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '201', departure_time: '09:00:00-04:00' },
      { flight_number: '203', departure_time: '16:00:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'TJA',
    destination: 'CBBA',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2923', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '202', departure_time: '10:45:00-04:00' },
      { flight_number: '204', departure_time: '17:45:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'VVI',
    destination: 'TJA',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2924', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '221', departure_time: '08:30:00-04:00' },
      { flight_number: '223', departure_time: '15:15:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'TJA',
    destination: 'VVI',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2924', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '222', departure_time: '10:15:00-04:00' },
      { flight_number: '224', departure_time: '17:00:00-04:00' }
    ]
  },

  // Sucre (SRE) Routes
  {
    carrier: 'OB',
    origin: 'CBBA',
    destination: 'SRE',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2923', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '301', departure_time: '07:45:00-04:00' },
      { flight_number: '303', departure_time: '14:20:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'SRE',
    destination: 'CBBA',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2923', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '302', departure_time: '09:00:00-04:00' },
      { flight_number: '304', departure_time: '15:35:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'LPZ',
    destination: 'SRE',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-2814', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '311', departure_time: '08:15:00-04:00' },
      { flight_number: '313', departure_time: '13:50:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'SRE',
    destination: 'LPZ',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-2814', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '312', departure_time: '09:40:00-04:00' },
      { flight_number: '314', departure_time: '15:15:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'VVI',
    destination: 'SRE',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2924', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '321', departure_time: '11:00:00-04:00' },
      { flight_number: '323', departure_time: '18:30:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'SRE',
    destination: 'VVI',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2924', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '322', departure_time: '12:20:00-04:00' },
      { flight_number: '324', departure_time: '19:50:00-04:00' }
    ]
  },

  // Cobija (CIJ) & Trinidad (TDD) Routes
  {
    carrier: '8J',
    origin: 'LPZ',
    destination: 'CIJ',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-3087', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '401', departure_time: '09:10:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'CIJ',
    destination: 'LPZ',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-3087', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '402', departure_time: '11:30:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'VVI',
    destination: 'TDD',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-2814', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '521', departure_time: '08:45:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'TDD',
    destination: 'VVI',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-2814', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '522', departure_time: '10:20:00-04:00' }
    ]
  },

  // Uyuni (UYU) Tourism Routes
  {
    carrier: 'OB',
    origin: 'LPZ',
    destination: 'UYU',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2923', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '801', departure_time: '07:15:00-04:00' },
      { flight_number: '803', departure_time: '14:00:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'UYU',
    destination: 'LPZ',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2923', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '802', departure_time: '08:40:00-04:00' },
      { flight_number: '804', departure_time: '15:25:00-04:00' }
    ]
  },

  // Oruro (ORU) & Potosí (POT) Routes
  {
    carrier: '8J',
    origin: 'LPZ',
    destination: 'ORU',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-3087', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '601', departure_time: '10:00:00-04:00' }
    ]
  },
  {
    carrier: '8J',
    origin: 'ORU',
    destination: 'LPZ',
    aircraft: { type: 'AR8', model: 'Avro RJ85', registration: 'CP-3087', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '602', departure_time: '11:15:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'CBBA',
    destination: 'POT',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2924', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '711', departure_time: '08:20:00-04:00' }
    ]
  },
  {
    carrier: 'OB',
    origin: 'POT',
    destination: 'CBBA',
    aircraft: { type: 'B737', model: 'Boeing 737-700', registration: 'CP-2924', cargo_type: 'BULK_LOADED' },
    schedules: [
      { flight_number: '712', departure_time: '09:40:00-04:00' }
    ]
  }
];

/**
 * Calculates payload capacity breakdown and compartment distributions
 */
function createPayloadCapacity(aircraftModel, flightNumber) {
  const seed = (parseInt(flightNumber, 10) || 105) % 10;

  // Exact match for the user's reference Avro RJ85 flight 105
  if (flightNumber === '105' && aircraftModel === 'Avro RJ85') {
    return {
      weight_unit: 'KG',
      max_structural_cargo_payload: 2200.0,
      current_operational_limit: 1800.0,
      breakdown: {
        passenger_baggage_allocated: 950.0,
        commercial_cargo_capacity: 850.0,
        commercial_cargo_booked: 500.0,
        available_cargo_capacity: 350.0
      },
      compartments: [
        {
          compartment_id: 'HOLD_1_FWD',
          name: 'Bodega Delantera',
          max_weight_limit: 1100.0,
          current_weight: 700.0,
          content_types: ['BAGGAGE', 'CARGO']
        },
        {
          compartment_id: 'HOLD_2_AFT',
          name: 'Bodega Trasera',
          max_weight_limit: 1100.0,
          current_weight: 750.0,
          content_types: ['BAGGAGE', 'CARGO', 'MAIL']
        }
      ]
    };
  }

  // Boeing 737-800 capacity specs
  if (aircraftModel === 'Boeing 737-800') {
    const maxStructural = 3200.0;
    const operationalLimit = 2800.0;
    const baggage = 1250.0 + seed * 10;
    const commercialCapacity = operationalLimit - baggage;
    const booked = 600.0 + seed * 25;
    const available = Math.round((commercialCapacity - booked) * 10) / 10;
    const totalWeight = baggage + booked;
    const fwdWeight = Math.round((totalWeight * 0.48) * 10) / 10;
    const aftWeight = Math.round((totalWeight - fwdWeight) * 10) / 10;

    return {
      weight_unit: 'KG',
      max_structural_cargo_payload: maxStructural,
      current_operational_limit: operationalLimit,
      breakdown: {
        passenger_baggage_allocated: baggage,
        commercial_cargo_capacity: commercialCapacity,
        commercial_cargo_booked: booked,
        available_cargo_capacity: available
      },
      compartments: [
        {
          compartment_id: 'HOLD_1_FWD',
          name: 'Bodega Delantera',
          max_weight_limit: 1600.0,
          current_weight: fwdWeight,
          content_types: ['BAGGAGE', 'CARGO']
        },
        {
          compartment_id: 'HOLD_2_AFT',
          name: 'Bodega Trasera',
          max_weight_limit: 1600.0,
          current_weight: aftWeight,
          content_types: ['BAGGAGE', 'CARGO', 'MAIL']
        }
      ]
    };
  }

  // Standard medium fleet (Avro RJ85 / Boeing 737-700)
  const maxStructural = 2200.0;
  const operationalLimit = 1800.0;
  const baggage = 900.0 + seed * 10;
  const commercialCapacity = operationalLimit - baggage;
  const booked = 450.0 + seed * 15;
  const available = Math.round((commercialCapacity - booked) * 10) / 10;
  const totalWeight = baggage + booked;
  const fwdWeight = Math.round((totalWeight * 0.48) * 10) / 10;
  const aftWeight = Math.round((totalWeight - fwdWeight) * 10) / 10;

  return {
    weight_unit: 'KG',
    max_structural_cargo_payload: maxStructural,
    current_operational_limit: operationalLimit,
    breakdown: {
      passenger_baggage_allocated: baggage,
      commercial_cargo_capacity: commercialCapacity,
      commercial_cargo_booked: booked,
      available_cargo_capacity: available
    },
    compartments: [
      {
        compartment_id: 'HOLD_1_FWD',
        name: 'Bodega Delantera',
        max_weight_limit: 1100.0,
        current_weight: fwdWeight,
        content_types: ['BAGGAGE', 'CARGO']
      },
      {
        compartment_id: 'HOLD_2_AFT',
        name: 'Bodega Trasera',
        max_weight_limit: 1100.0,
        current_weight: aftWeight,
        content_types: ['BAGGAGE', 'CARGO', 'MAIL']
      }
    ]
  };
}

/**
 * Returns available schedule dates.
 * Includes today (Saturday), tomorrow (Sunday), Monday, Tuesday, Wednesday,
 * and the specific reference test date '2026-10-15', plus rolling days.
 */
function getScheduleDates() {
  const datesSet = new Set([
    '2026-10-03', // Today (Saturday)
    '2026-10-04', // Sunday
    '2026-10-05', // Monday
    '2026-10-06', // Tuesday
    '2026-10-07', // Wednesday
    '2026-10-15'  // Reference formal date from user schema
  ]);

  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    datesSet.add(d.toISOString().split('T')[0]);
  }

  return Array.from(datesSet).sort();
}

/**
 * Generates all formal flight objects across dates
 */
function generateFlights() {
  const dates = getScheduleDates();
  const flightsList = [];

  for (const date of dates) {
    const dateCompact = date.replace(/-/g, '');

    for (const route of routeDefinitions) {
      for (const schedule of route.schedules) {
        const flightId = `${route.carrier}-${schedule.flight_number}-${dateCompact}-${route.origin}-${route.destination}`;

        flightsList.push({
          flight_id: flightId,
          carrier_code: route.carrier,
          flight_number: schedule.flight_number,
          aircraft: {
            type: route.aircraft.type,
            model: route.aircraft.model,
            registration: route.aircraft.registration,
            cargo_type: route.aircraft.cargo_type
          },
          route: {
            origin: route.origin,
            destination: route.destination,
            departure: `${date}T${schedule.departure_time}`
          },
          payload_capacity: createPayloadCapacity(route.aircraft.model, schedule.flight_number)
        });
      }
    }
  }

  return flightsList;
}

const flights = generateFlights();

module.exports = flights;
