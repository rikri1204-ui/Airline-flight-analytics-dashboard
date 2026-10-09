// ============================================================
//  AIRLINE FLIGHT ANALYTICS — Mock Dataset
//  Generated deterministically at load time.
//  Exposes: window.FLIGHTS_DATA, window.AIRPORTS_META, window.AIRLINES_META
// ============================================================

(function () {
  var AIRLINES = [
    { code: "AA", name: "American Airlines" },
    { code: "DL", name: "Delta Air Lines" },
    { code: "UA", name: "United Airlines" },
    { code: "WN", name: "Southwest Airlines" },
    { code: "BA", name: "British Airways" },
    { code: "LH", name: "Lufthansa" },
    { code: "EK", name: "Emirates" },
    { code: "QR", name: "Qatar Airways" },
  ];

  var AIRPORTS = [
    { code: "JFK", name: "John F. Kennedy Intl",           city: "New York",      country: "USA" },
    { code: "LAX", name: "Los Angeles Intl",               city: "Los Angeles",   country: "USA" },
    { code: "ORD", name: "O'Hare Intl",                    city: "Chicago",       country: "USA" },
    { code: "DFW", name: "Dallas/Fort Worth Intl",         city: "Dallas",        country: "USA" },
    { code: "ATL", name: "Hartsfield-Jackson Atlanta",     city: "Atlanta",       country: "USA" },
    { code: "MIA", name: "Miami Intl",                     city: "Miami",         country: "USA" },
    { code: "SFO", name: "San Francisco Intl",             city: "San Francisco", country: "USA" },
    { code: "SEA", name: "Seattle-Tacoma Intl",            city: "Seattle",       country: "USA" },
    { code: "BOS", name: "Logan Intl",                     city: "Boston",        country: "USA" },
    { code: "LHR", name: "Heathrow",                       city: "London",        country: "UK" },
    { code: "CDG", name: "Charles de Gaulle",              city: "Paris",         country: "France" },
    { code: "FRA", name: "Frankfurt Airport",              city: "Frankfurt",     country: "Germany" },
    { code: "DXB", name: "Dubai Intl",                     city: "Dubai",         country: "UAE" },
    { code: "DOH", name: "Hamad Intl",                     city: "Doha",          country: "Qatar" },
    { code: "SIN", name: "Changi Airport",                 city: "Singapore",     country: "Singapore" },
    { code: "NRT", name: "Narita Intl",                    city: "Tokyo",         country: "Japan" },
    { code: "SYD", name: "Kingsford Smith",                city: "Sydney",        country: "Australia" },
    { code: "YYZ", name: "Toronto Pearson Intl",           city: "Toronto",       country: "Canada" },
    { code: "GRU", name: "Guarulhos Intl",                 city: "São Paulo",     country: "Brazil" },
    { code: "MEX", name: "Benito Juárez Intl",             city: "Mexico City",   country: "Mexico" },
  ];

  var AIRCRAFT = [
    "Boeing 737-800", "Boeing 737 MAX 9", "Boeing 757-200",
    "Boeing 767-300ER", "Boeing 777-300ER", "Boeing 787-9 Dreamliner",
    "Airbus A319", "Airbus A320neo", "Airbus A321XLR",
    "Airbus A330-300", "Airbus A350-900", "Airbus A380-800",
  ];

  var DELAY_REASONS = [
    "Late aircraft", "Weather", "Air traffic control",
    "Mechanical issue", "Crew availability", "Fueling delay",
    "Security screening", "Boarding delay", "Connecting flight", "Catering delay",
  ];

  var DISTANCES = {
    "JFK-LAX":3983,"JFK-ORD":1190,"JFK-DFW":2212,"JFK-ATL":1236,"JFK-MIA":1757,
    "JFK-SFO":4151,"JFK-SEA":3866,"JFK-BOS":298,"JFK-LHR":5570,"JFK-CDG":5837,
    "JFK-FRA":6212,"JFK-DXB":11005,"JFK-DOH":11388,"JFK-NRT":10844,"JFK-YYZ":551,"JFK-GRU":7678,
    "LAX-ORD":2801,"LAX-DFW":1996,"LAX-ATL":3105,"LAX-SFO":559,"LAX-SEA":1535,
    "LAX-LHR":8757,"LAX-DXB":13420,"LAX-NRT":8784,"LAX-SYD":12077,"LAX-MEX":2551,
    "ORD-DFW":1292,"ORD-ATL":1153,"ORD-MIA":2198,"ORD-LHR":6370,"ORD-FRA":7469,"ORD-YYZ":703,
    "DFW-ATL":1158,"DFW-MIA":1776,"DFW-SFO":2858,"DFW-MEX":1558,
    "ATL-MIA":1062,"ATL-LHR":7142,"ATL-CDG":7754,
    "MIA-GRU":6878,"MIA-MEX":2091,
    "SFO-SEA":1095,"SFO-NRT":8280,"SFO-SYD":11930,
    "LHR-CDG":341,"LHR-FRA":634,"LHR-DXB":5482,"LHR-DOH":5222,
    "LHR-SIN":10840,"LHR-NRT":9538,"LHR-SYD":16993,"LHR-YYZ":5715,
    "CDG-FRA":479,"CDG-DXB":5248,"CDG-SIN":10730,
    "FRA-DXB":4879,"FRA-NRT":9360,"FRA-SIN":10206,
    "DXB-DOH":361,"DXB-SIN":5844,"DXB-NRT":7963,"DXB-SYD":11788,
    "DOH-SIN":5740,"DOH-NRT":8028,
    "SIN-NRT":5341,"SIN-SYD":6309,
    "NRT-SYD":7823,"YYZ-LHR":5715,"GRU-LHR":9459,
  };

  function getDist(o, d) {
    return DISTANCES[o+"-"+d] || DISTANCES[d+"-"+o] || 3500;
  }

  // LCG seeded RNG
  function Rng(seed) { this.s = seed >>> 0; }
  Rng.prototype.next = function() {
    this.s = (Math.imul(1664525, this.s) + 1013904223) >>> 0;
    return this.s / 4294967295;
  };
  Rng.prototype.int = function(a, b) { return Math.floor(this.next() * (b - a + 1)) + a; };
  Rng.prototype.pick = function(arr) { return arr[this.int(0, arr.length - 1)]; };

  function pad2(n) { return String(n).padStart(2,"0"); }

  function addMins(t, m) {
    var parts = t.split(":").map(Number);
    var total = parts[0]*60 + parts[1] + m;
    total = ((total % 1440) + 1440) % 1440;
    return pad2(Math.floor(total/60)) + ":" + pad2(total%60);
  }

  function dateOffset(base, days) {
    var d = new Date(base);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0,10);
  }

  var ROUTE_PAIRS = [
    ["JFK","LAX"],["JFK","ORD"],["JFK","LHR"],["JFK","CDG"],["JFK","MIA"],
    ["JFK","BOS"],["JFK","ATL"],["JFK","DXB"],["JFK","NRT"],["JFK","YYZ"],
    ["JFK","GRU"],["JFK","SFO"],
    ["LAX","ORD"],["LAX","DFW"],["LAX","SFO"],["LAX","NRT"],["LAX","SYD"],
    ["LAX","LHR"],["LAX","SEA"],["LAX","MEX"],["LAX","ATL"],
    ["ORD","DFW"],["ORD","ATL"],["ORD","LHR"],["ORD","FRA"],["ORD","YYZ"],["ORD","MIA"],
    ["DFW","ATL"],["DFW","MIA"],["DFW","SFO"],["DFW","MEX"],["DFW","LHR"],
    ["ATL","MIA"],["ATL","LHR"],["ATL","CDG"],["ATL","SFO"],
    ["MIA","GRU"],["MIA","MEX"],["MIA","LHR"],
    ["SFO","SEA"],["SFO","NRT"],["SFO","SYD"],["SFO","LHR"],
    ["LHR","CDG"],["LHR","FRA"],["LHR","DXB"],["LHR","SIN"],["LHR","NRT"],["LHR","SYD"],
    ["CDG","FRA"],["CDG","DXB"],["CDG","SIN"],
    ["FRA","DXB"],["FRA","NRT"],["FRA","SIN"],
    ["DXB","DOH"],["DXB","SIN"],["DXB","NRT"],["DXB","SYD"],
    ["DOH","SIN"],["SIN","NRT"],["SIN","SYD"],["NRT","SYD"],
    ["YYZ","LHR"],["GRU","LHR"],["BOS","LHR"],["SEA","NRT"],
  ];

  var BASE = "2024-01-01";
  var flights = [];
  var rng = new Rng(12345);
  var id = 1;

  while (flights.length < 520) {
    for (var pi = 0; pi < ROUTE_PAIRS.length && flights.length < 520; pi++) {
      var orig = ROUTE_PAIRS[pi][0];
      var dest = ROUTE_PAIRS[pi][1];
      var dist = getDist(orig, dest);
      var isIntl = dist > 4000;

      var airlinePool = isIntl
        ? [AIRLINES[4],AIRLINES[5],AIRLINES[6],AIRLINES[7],AIRLINES[0],AIRLINES[2]]
        : [AIRLINES[0],AIRLINES[1],AIRLINES[2],AIRLINES[3]];
      var airline = rng.pick(airlinePool);

      var fnum = airline.code + rng.int(100, 9999);
      var depDate = dateOffset(BASE, rng.int(0, 89));

      var scheduledDepH = rng.int(5, 22);
      var scheduledDepM = rng.pick([0,5,10,15,20,25,30,35,40,45,50,55]);
      var scheduledDep = pad2(scheduledDepH) + ":" + pad2(scheduledDepM);
      var durationMin = Math.floor(dist / 10 + 30);
      var scheduledArr = addMins(scheduledDep, durationMin);

      var statusRoll = rng.next();
      var status, delayMin, delayReason, actualDep, actualArr;

      if (statusRoll < 0.70) {
        status = "On Time";
        delayMin = 0;
        delayReason = "";
        actualDep = addMins(scheduledDep, rng.int(0, 4));
        actualArr = addMins(scheduledArr, rng.int(-3, 7));
      } else if (statusRoll < 0.92) {
        status = "Delayed";
        delayMin = rng.int(15, 240);
        delayReason = rng.pick(DELAY_REASONS);
        actualDep = addMins(scheduledDep, delayMin);
        actualArr = addMins(scheduledArr, delayMin + rng.int(0, 15));
      } else {
        status = "Cancelled";
        delayMin = 0;
        delayReason = rng.pick(["Weather","Mechanical issue","Air traffic control","Crew availability"]);
        actualDep = null;
        actualArr = null;
      }

      var seats = rng.pick([120,150,180,200,240,280,320,350,400,450,500,555]);
      var passengers = status === "Cancelled" ? 0 : Math.floor(seats * (0.72 + rng.next() * 0.25));

      var wideBody = ["Boeing 777-300ER","Boeing 787-9 Dreamliner","Airbus A330-300","Airbus A350-900","Airbus A380-800"];
      var narrowBody = ["Boeing 737-800","Boeing 737 MAX 9","Boeing 757-200","Airbus A319","Airbus A320neo","Airbus A321XLR"];
      var aircraft = rng.pick(isIntl ? wideBody : narrowBody);

      flights.push({
        flight_id:           "FL" + pad2(Math.floor(id/100)) + pad2(id%100),
        airline:             airline.name,
        airline_code:        airline.code,
        flight_number:       fnum,
        origin_airport:      orig,
        destination_airport: dest,
        route:               orig + " → " + dest,
        departure_date:      depDate,
        scheduled_departure: scheduledDep,
        actual_departure:    actualDep,
        scheduled_arrival:   scheduledArr,
        actual_arrival:      actualArr,
        flight_status:       status,
        aircraft:            aircraft,
        passengers:          passengers,
        seats:               seats,
        delay_minutes:       delayMin,
        delay_reason:        delayReason,
        distance_km:         dist,
      });
      id++;
    }
  }

  window.FLIGHTS_DATA   = flights.slice(0, 520);
  window.AIRPORTS_META  = AIRPORTS;
  window.AIRLINES_META  = AIRLINES;
})();
