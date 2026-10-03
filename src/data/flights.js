/**
 * In-memory flight data emulation using Bolivian airport / city codes:
 * - CBBA: Cochabamba (Jorge Wilstermann)
 * - LPZ:  La Paz (El Alto)
 * - VVI:  Santa Cruz (Viru Viru)
 * - TJA:  Tarija (Capitan Oriel Lea Plaza)
 * - SRE:  Sucre (Alcantarí)
 * - CIJ:  Cobija (Capitan Anibal Arab)
 * - TDD:  Trinidad (Jorge Henrich Arauz)
 * - ORU:  Oruro (Juan Mendoza)
 * - POT:  Potosí (Capitán Nicolas Rojas)
 */

const flights = [
  { flight_number: "OB-101", origin: "CBBA", destination: "LPZ" },
  { flight_number: "OB-102", origin: "LPZ", destination: "CBBA" },
  { flight_number: "OB-103", origin: "CBBA", destination: "VVI" },
  { flight_number: "OB-104", origin: "VVI", destination: "CBBA" },
  { flight_number: "OB-105", origin: "LPZ", destination: "VVI" },
  { flight_number: "OB-106", origin: "VVI", destination: "LPZ" },
  { flight_number: "OB-201", origin: "CBBA", destination: "TJA" },
  { flight_number: "OB-202", origin: "TJA", destination: "CBBA" },
  { flight_number: "OB-203", origin: "LPZ", destination: "SRE" },
  { flight_number: "OB-204", origin: "SRE", destination: "LPZ" },
  { flight_number: "OB-205", origin: "VVI", destination: "SRE" },
  { flight_number: "OB-206", origin: "SRE", destination: "VVI" },
  { flight_number: "OB-301", origin: "LPZ", destination: "CIJ" },
  { flight_number: "OB-302", origin: "CIJ", destination: "LPZ" },
  { flight_number: "OB-303", origin: "CBBA", destination: "TDD" },
  { flight_number: "OB-304", origin: "TDD", destination: "CBBA" },
  { flight_number: "OB-401", origin: "LPZ", destination: "ORU" },
  { flight_number: "OB-402", origin: "ORU", destination: "LPZ" },
  { flight_number: "OB-501", origin: "CBBA", destination: "POT" },
  { flight_number: "OB-502", origin: "POT", destination: "CBBA" }
];

module.exports = flights;
