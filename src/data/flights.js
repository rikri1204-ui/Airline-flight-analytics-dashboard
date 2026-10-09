// ============================================================
//  AIRLINE FLIGHT ANALYTICS — Mock Dataset Generator
//  Produces 520 realistic flight records deterministically.
// ============================================================

const AIRLINES = [
  { code: "AA", name: "American Airlines" },
  { code: "DL", name: "Delta Air Lines" },
  { code: "UA", name: "United Airlines" },
  { code: "SW", name: "Southwest Airlines" },
  { code: "BA", name: "British Airways" },
  { code: "LH", name: "Lufthansa" },
  { code: "EK", name: "Emirates" },
  { code: "QR", name: "Qatar Airways" },
];

const AIRPORTS = [
  { code: "JFK", name: "John F. Kennedy Intl", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles Intl", city: "Los Angeles", country: "USA" },
  { code: "ORD", name: "O'Hare Intl", city: "Chicago", country: "USA" },
  { code: "DFW", name: "Dallas/Fort Worth Intl", city: "Dallas", country: "USA" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta Intl", city: "Atlanta", country: "USA" },
  { code: "MIA", name: "Miami Intl", city: "Miami", country: "USA" },
  { code: "SFO", name: "San Francisco Intl", city: "San Francisco", country: "USA" },
  { code: "SEA", name: "Seattle-Tacoma Intl", city: "Seattle", country: "USA" },
  { code: "BOS", name: "Logan Intl", city: "Boston", country: "USA" },
  { code: "LHR", name: "Heathrow", city: "London", country: "UK" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "DXB", name: "Dubai Intl", city: "Dubai", country: "UAE" },
  { code: "DOH", name: "Hamad Intl", city: "Doha", country: "Qatar" },
  { code: "SIN", name: "Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "NRT", name: "Narita Intl", city: "Tokyo", country: "Japan" },
  { code: "SYD", name: "Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "YYZ", name: "Toronto Pearson Intl", city: "Toronto", country: "Canada" },
  { code: "GRU", name: "Guarulhos Intl", city: "São Paulo", country: "Brazil" },
  { code: "MEX", name: "Benito Juárez Intl", city: "Mexico City", country: "Mexico" },
];

const AIRCRAFT = [
  "Boeing 737-800",
  "Boeing 737 MAX 9",
  "Boeing 757-200",
  "Boeing 767-300ER",
  "Boeing 777-300ER",
  "Boeing 787-9 Dreamliner",
  "Airbus A319",
  "Airbus A320neo",
  "Airbus A321XLR",
  "Airbus A330-300",
  "Airbus A350-900",
  "Airbus A380-800",
];

const DELAY_REASONS = [
  "Late aircraft",
  "Weather",
  "Air traffic control",
  "Mechanical issue",
  "Crew availability",
  "Fueling delay",
  "Security screening",
  "Boarding delay",
  "Connecting flight",
  "Catering delay",
];

// Realistic distances between airport pairs (km)
const DISTANCES = {
  "JFK-LAX": 3983, "JFK-ORD": 1190, "JFK-DFW": 2212, "JFK-ATL": 1236,
  "JFK-MIA": 1757, "JFK-SFO": 4151, "JFK-SEA": 3866, "JFK-BOS": 298,
  "JFK-LHR": 5570, "JFK-CDG": 5837, "JFK-FRA": 6212, "JFK-DXB": 11005,
  "JFK-DOH": 11388, "JFK-NRT": 10844, "JFK-YYZ": 551, "JFK-GRU": 7678,
  "LAX-ORD": 2801, "LAX-DFW": 1996, "LAX-ATL": 3105, "LAX-SFO": 559,
  "LAX-SEA": 1535, "LAX-LHR": 8757, "LAX-DXB": 13420, "LAX-NRT": 8784,
  "LAX-SYD": 12077, "LAX-MEX": 2551,
  "ORD-DFW": 1292, "ORD-ATL": 1153, "ORD-MIA": 2198, "ORD-LHR": 6370,
  "ORD-FRA": 7469, "ORD-YYZ": 703,
  "DFW-ATL": 1158, "DFW-MIA": 1776, "DFW-SFO": 2858, "DFW-MEX": 1558,
  "ATL-MIA": 1062, "ATL-LHR": 7142, "ATL-CDG": 7754,
  "MIA-GRU": 6878, "MIA-MEX": 2091,
  "SFO-SEA": 1095, "SFO-NRT": 8280, "SFO-SYD": 11930,
  "LHR-CDG": 341, "LHR-FRA": 634, "LHR-DXB": 5482, "LHR-DOH": 5222,
  "LHR-SIN": 10840, "LHR-NRT": 9538, "LHR-SYD": 16993, "LHR-YYZ": 5715,
  "CDG-FRA": 479, "CDG-DXB": 5248, "CDG-SIN": 10730,
  "FRA-DXB": 4879, "FRA-NRT": 9360, "FRA-SIN": 10206,
  "DXB-DOH": 361, "DXB-SIN": 5844, "DXB-NRT": 7963, "DXB-SYD": 11788,
  "DOH-SIN": 5740, "DOH-NRT": 8028,
  "SIN-NRT": 5341, "SIN-SYD": 6309,
  "NRT-SYD": 7823, "YYZ-LHR": 5715, "GRU-LHR": 9459,
};

function getDistance(orig, dest) {
  return DISTANCES[`${orig}-${dest}`] || DISTANCES[`${dest}-${orig}`] || Math.floor(2000 + seededRandom(orig + dest) * 8000);
}

// Deterministic seeded pseudo-random (LCG)
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 0xffffffff;
}

class SeededRng {
  constructor(seed) { this.state = seed; }
  next() {
    this.state = (this.state * 1664525 + 1013904223) >>> 0;
    return this.state / 0xffffffff;
  }
  int(min, max) { return Math.floor(this.next() * (max - min + 1)) + min; }
  pick(arr) { return arr[this.int(0, arr.length - 1)]; }
}

function addMinutes(timeStr, minutes) {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const nh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const nm = ((total % 1440) + 1440) % 1440 % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

function formatDate(base, offsetDays) {
  const d = new Date(base);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function generateFlights() {
  const rng = new SeededRng(42);
  const flights = [];

  // Route pairs — wide variety
  const routePairs = [
    ["JFK","LAX"],["JFK","ORD"],["JFK","LHR"],["JFK","CDG"],["JFK","MIA"],
    ["JFK","BOS"],["JFK","ATL"],["JFK","DXB"],["JFK","NRT"],["JFK","YYZ"],
    ["LAX","ORD"],["LAX","DFW"],["LAX","SFO"],["LAX","NRT"],["LAX","SYD"],
    ["LAX","LHR"],["LAX","SEA"],["LAX","MEX"],
    ["ORD","DFW"],["ORD","ATL"],["ORD","LHR"],["ORD","FRA"],["ORD","YYZ"],
    ["DFW","ATL"],["DFW","MIA"],["DFW","SFO"],["DFW","MEX"],
    ["ATL","MIA"],["ATL","LHR"],["ATL","CDG"],
    ["MIA","GRU"],["MIA","MEX"],
    ["SFO","SEA"],["SFO","NRT"],["SFO","SYD"],
    ["LHR","CDG"],["LHR","FRA"],["LHR","DXB"],["LHR","SIN"],["LHR","NRT"],["LHR","SYD"],
    ["CDG","FRA"],["CDG","DXB"],["CDG","SIN"],
    ["FRA","DXB"],["FRA","NRT"],["FRA","SIN"],
    ["DXB","DOH"],["DXB","SIN"],["DXB","NRT"],["DXB","SYD"],
    ["DOH","SIN"],["SIN","NRT"],["SIN","SYD"],["NRT","SYD"],
  ];

  const baseDate = new Date("2024-01-01");
  let id = 1;

  // Distribute flights: loop routes, for each route generate several flights on different dates
  while (flights.length < 520) {
    for (const [orig, dest] of routePairs) {
      if (flights.length >= 520) break;

      const rRoute = new SeededRng(id * 7 + orig.charCodeAt(0) + dest.charCodeAt(0));

      // Pick airline weighted by route region
      const isIntl = getDistance(orig, dest) > 4000;
      const airlinePool = isIntl
        ? [AIRLINES[4], AIRLINES[5], AIRLINES[6], AIRLINES[7], AIRLINES[0], AIRLINES[2]]
        : [AIRLINES[0], AIRLINES[1], AIRLINES[2], AIRLINES[3]];
      const airline = rRoute.pick(airlinePool);

      const flightNum = `${airline.code}${rRoute.int(100, 9999)}`;
      const depDateOffset = rRoute.int(0, 89); // 3 months spread
      const depDate = formatDate(baseDate, depDateOffset);

      // Scheduled departure & flight duration based on distance
      const dist = getDistance(orig, dest);
      const scheduledDepH = rRoute.int(5, 22);
      const scheduledDepM = rRoute.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
      const scheduledDep = `${String(scheduledDepH).padStart(2,"0")}:${String(scheduledDepM).padStart(2,"0")}`;
      const flightDurationMin = Math.floor(dist / 10 + 30 + rRoute.int(-10, 20)); // ~100km/10min + taxi

      // Status distribution: 70% on-time, 22% delayed, 8% cancelled
      const statusRoll = rRoute.next();
      let status, delayMin, delayReason, actualDep, actualArr, scheduledArr;

      scheduledArr = addMinutes(scheduledDep, flightDurationMin);

      if (statusRoll < 0.70) {
        status = "On Time";
        delayMin = 0;
        delayReason = "";
        actualDep = addMinutes(scheduledDep, rRoute.int(-2, 5)); // tiny variance
        actualArr = addMinutes(scheduledArr, rRoute.int(-5, 8));
      } else if (statusRoll < 0.92) {
        status = "Delayed";
        delayMin = rRoute.int(15, 240);
        delayReason = rRoute.pick(DELAY_REASONS);
        actualDep = addMinutes(scheduledDep, delayMin);
        actualArr = addMinutes(scheduledArr, delayMin + rRoute.int(-5, 15));
      } else {
        status = "Cancelled";
        delayMin = 0;
        delayReason = rRoute.pick(["Weather", "Mechanical issue", "Air traffic control", "Crew availability"]);
        actualDep = null;
        actualArr = null;
      }

      const seats = rRoute.pick([120, 150, 180, 200, 240, 280, 320, 350, 400, 450, 500, 555]);
      const loadFactor = status === "Cancelled" ? 0 : (0.72 + rRoute.next() * 0.25);
      const passengers = status === "Cancelled" ? 0 : Math.floor(seats * loadFactor);

      const aircraft = isIntl
        ? rRoute.pick(AIRCRAFT.filter(a => a.includes("777") || a.includes("787") || a.includes("A350") || a.includes("A380") || a.includes("A330")))
        : rRoute.pick(AIRCRAFT.filter(a => a.includes("737") || a.includes("757") || a.includes("A319") || a.includes("A320") || a.includes("A321")));

      flights.push({
        flight_id: `FL${String(id).padStart(5, "0")}`,
        airline: airline.name,
        airline_code: airline.code,
        flight_number: flightNum,
        origin_airport: orig,
        destination_airport: dest,
        route: `${orig} → ${dest}`,
        departure_date: depDate,
        scheduled_departure: scheduledDep,
        actual_departure: actualDep,
        scheduled_arrival: scheduledArr,
        actual_arrival: actualArr,
        flight_status: status,
        aircraft,
        passengers,
        seats,
        delay_minutes: delayMin,
        delay_reason: delayReason,
        distance_km: dist,
      });

      id++;
    }
  }

  return flights.slice(0, 520);
}

export const FLIGHTS_DATA = generateFlights();
export { AIRLINES, AIRPORTS, AIRCRAFT };
