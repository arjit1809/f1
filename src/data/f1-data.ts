export interface CircuitStats {
  record: string;
  drs: string;
  wear: string[];
}

export interface Circuit {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  path: string;
  stats: CircuitStats;
  color: string;
  description: string;
  funFact: string;
}

export interface Team {
  id: string;
  name: string;
  full_name: string;
  base: string;
  principal: string;
  chassis: string;
  power_unit: string;
  color: string;
  logo: string;
  description: string;
}

export const TEAMS: Team[] = [
  { id: "redbull", name: "Red Bull", full_name: "Oracle Red Bull Racing", base: "Milton Keynes, UK", principal: "Christian Horner", chassis: "RB22", power_unit: "Red Bull Powertrains", color: "#3671C6", logo: "/images/teams/redbull.png", description: "The dominant force in recent years, Red Bull continues to push the limits of aerodynamics and engineering." },
  { id: "ferrari", name: "Ferrari", full_name: "Scuderia Ferrari HP", base: "Maranello, Italy", principal: "Frédéric Vasseur", chassis: "SF-26", power_unit: "Ferrari", color: "#DC0000", logo: "/images/teams/ferrari.png", description: "The most successful team in F1 history, now bolstered by the arrival of Lewis Hamilton for a new era." },
  { id: "mclaren", name: "McLaren", full_name: "McLaren Formula 1 Team", base: "Woking, UK", principal: "Andrea Stella", chassis: "MCL39", power_unit: "Mercedes", color: "#FF8700", logo: "/images/teams/mclaren.png", description: "A historic team revived, featuring one of the most exciting young driver pairings on the grid." },
  { id: "mercedes", name: "Mercedes", full_name: "Mercedes-AMG PETRONAS F1 Team", base: "Brackley, UK", principal: "Toto Wolff", chassis: "W17", power_unit: "Mercedes", color: "#27F4D2", logo: "/images/teams/mercedes.png", description: "Seeking to reclaim their spot at the top after a decade of unprecedented success." },
  { id: "astonmartin", name: "Aston Martin", full_name: "Aston Martin Aramco F1 Team", base: "Silverstone, UK", principal: "Mike Krack", chassis: "AMR26", power_unit: "Honda", color: "#229971", logo: "/images/teams/aston.png", description: "Aggressively expanding their infrastructure with a new campus and Honda power unit partnership." },
];

export const DRIVERS = [
  { 
    id: "verstappen", 
    slug: "max-verstappen",
    name: "Max Verstappen", 
    teamId: "redbull",
    team: "Red Bull Racing", 
    country: "NL", 
    points: 245, 
    color: "bg-redbull", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
    bio: "Current world champion and arguably the fastest driver on the grid. Known for his aggressive driving style and relentless consistency."
  },
  { 
    id: "hamilton", 
    slug: "lewis-hamilton",
    name: "Lewis Hamilton", 
    teamId: "ferrari",
    team: "Ferrari", 
    country: "GB", 
    points: 210, 
    color: "bg-ferrari", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png",
    bio: "The 7-time world champion seeking an elusive 8th title in the iconic scarlet red of Ferrari."
  },
  { 
    id: "leclerc", 
    slug: "charles-leclerc",
    name: "Charles Leclerc", 
    teamId: "ferrari",
    team: "Ferrari", 
    country: "MC", 
    points: 198, 
    color: "bg-ferrari", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png",
    bio: "Maranello's golden boy, known for his incredible qualifying pace and deep connection to the Tifosi."
  },
  { 
    id: "norris", 
    slug: "lando-norris",
    name: "Lando Norris", 
    teamId: "mclaren",
    team: "McLaren", 
    country: "GB", 
    points: 185, 
    color: "bg-mclaren", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png",
    bio: "The heartbeat of the new McLaren era, a versatile driver who has matured into a regular race winner."
  },
  { 
    id: "russell", 
    slug: "george-russell",
    name: "George Russell", 
    teamId: "mercedes",
    team: "Mercedes", 
    country: "GB", 
    points: 150, 
    color: "bg-mercedes", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png",
    bio: "The future of Mercedes, a driver whose technical precision and work ethic are helping the Silver Arrows return to glory."
  },
  { 
    id: "piastri", 
    slug: "oscar-piastri",
    name: "Oscar Piastri", 
    teamId: "mclaren",
    team: "McLaren", 
    country: "AU", 
    points: 142, 
    color: "bg-mclaren", 
    image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png",
    bio: "One of the most impressive rookies in recent memory, showing maturity far beyond his years."
  },
];

export const CALENDAR = [
  { round: 1, country: "Australia", circuit: "Albert Park", date: "Mar 14-16", isSprint: false },
  { round: 2, country: "China", circuit: "Shanghai", date: "Mar 21-23", isSprint: true },
  { round: 3, country: "Japan", circuit: "Suzuka", date: "Apr 4-6", isSprint: false },
  { round: 4, country: "Bahrain", circuit: "Sakhir", date: "Apr 11-13", isSprint: false },
  { round: 5, country: "Saudi Arabia", circuit: "Jeddah", date: "Apr 18-20", isSprint: false },
  { round: 6, country: "Miami", circuit: "Miami", date: "May 2-4", isSprint: true },
  { round: 7, country: "Italy", circuit: "Imola", date: "May 16-18", isSprint: false },
  { round: 8, country: "Monaco", circuit: "Monaco", date: "May 23-25", isSprint: false },
];

export const CIRCUITS = [
  {
    id: "miami",
    slug: "miami-gp",
    name: "Miami GP",
    location: "Miami International Autodrome",
    country: "USA",
    path: "M100,300 C150,150 250,100 400,150 C550,200 650,250 700,400 C750,550 500,550 400,450 C300,350 200,450 100,500 C50,550 50,450 100,300",
    stats: { record: "1:29.708", drs: "3 Zones", wear: ["C5", "C4", "C3"] },
    color: "ferrari",
    description: "Built around the Hard Rock Stadium, this temporary circuit features 19 corners and three straights, offering a high-speed street circuit experience.",
    funFact: "The fake marina features real yachts floating on a 'vinyl' water surface."
  },
  {
    id: "monaco",
    slug: "monaco-gp",
    name: "Monaco GP",
    location: "Circuit de Monaco",
    country: "MONACO",
    path: "M150,400 L200,380 C250,350 300,300 350,320 C400,340 450,400 480,450 C500,500 550,550 600,520 C650,490 700,400 680,350 C660,300 600,250 550,220 C500,200 400,150 300,180 C200,210 150,300 150,400",
    stats: { record: "1:12.909", drs: "1 Zone", wear: ["C5", "C4", "C3"] },
    color: "mercedes",
    description: "The jewel in the F1 crown. A tight, twisty street circuit where precision is everything and overtaking is nearly impossible without risk.",
    funFact: "It is the only Grand Prix that does not adhere to the FIA's mandatory 305km minimum race distance."
  },
  {
    id: "melbourne",
    slug: "australian-gp",
    name: "Australian GP",
    location: "Albert Park Circuit",
    country: "AUSTRALIA",
    path: "M100,100 L300,100 L400,200 L400,400 L300,500 L100,500 L50,400 L50,200 Z",
    stats: { record: "1:19.813", drs: "4 Zones", wear: ["C5", "C4", "C3"] },
    color: "mclaren",
    description: "A fast, flowing street circuit around the Albert Park Lake. Known for its technical sectors and high-speed chicanes.",
    funFact: "The track is completely resurfaced every year as it is a public park."
  },
  {
    id: "shanghai",
    slug: "chinese-gp",
    name: "Chinese GP",
    location: "Shanghai International Circuit",
    country: "CHINA",
    path: "M500,100 C700,100 800,300 700,500 L100,500 L100,300 Z",
    stats: { record: "1:32.238", drs: "2 Zones", wear: ["C4", "C3", "C2"] },
    color: "redbull",
    description: "Shaped like the Chinese character 'shang' (上), this circuit features one of the longest straights in F1.",
    funFact: "The main grandstand can hold 200,000 spectators."
  },
  {
    id: "suzuka",
    slug: "japanese-gp",
    name: "Japanese GP",
    location: "Suzuka Circuit",
    country: "JAPAN",
    path: "M100,100 L300,100 L500,300 L700,100 L700,500 L500,300 L300,500 L100,500 Z",
    stats: { record: "1:30.983", drs: "1 Zone", wear: ["C3", "C2", "C1"] },
    color: "ferrari",
    description: "A legendary figure-eight track featuring the high-speed 130R and technical Degner curves.",
    funFact: "It is the only FIA Grade 1 circuit with a figure-eight layout."
  },
  {
    id: "sakhir",
    slug: "bahrain-gp",
    name: "Bahrain GP",
    location: "Bahrain International Circuit",
    country: "BAHRAIN",
    path: "M200,100 L600,100 L700,300 L500,500 L100,500 L200,300 Z",
    stats: { record: "1:31.447", drs: "3 Zones", wear: ["C3", "C2", "C1"] },
    color: "mercedes",
    description: "A desert oasis featuring heavy braking zones and wide straights, perfect for night racing.",
    funFact: "The track is sprayed with a special glue to prevent desert sand from blowing onto the surface."
  },
  {
    id: "jeddah",
    slug: "saudi-arabian-gp",
    name: "Saudi Arabian GP",
    location: "Jeddah Corniche Circuit",
    country: "SAUDI ARABIA",
    path: "M400,50 L450,500 L350,500 L400,50 Z",
    stats: { record: "1:30.734", drs: "3 Zones", wear: ["C4", "C3", "C2"] },
    color: "redbull",
    description: "The fastest street circuit in the world, snaking along the Red Sea coast with average speeds over 250km/h.",
    funFact: "It has the most corners of any track on the calendar (27)."
  },
  {
    id: "imola",
    slug: "emilia-romagna-gp",
    name: "Emilia-Romagna GP",
    location: "Autodromo Enzo e Dino Ferrari",
    country: "ITALY",
    path: "M100,200 L300,150 L600,200 L700,400 L500,550 L200,500 Z",
    stats: { record: "1:15.484", drs: "1 Zone", wear: ["C5", "C4", "C3"] },
    color: "ferrari",
    description: "A classic Italian circuit known for its history, technicality, and the fast Tamburello corner.",
    funFact: "The track was renamed in 1988 following the death of Enzo Ferrari."
  },
  {
    id: "barcelona",
    slug: "spanish-gp",
    name: "Spanish GP",
    location: "Circuit de Barcelona-Catalunya",
    country: "SPAIN",
    path: "M100,400 L400,100 L700,400 L400,550 Z",
    stats: { record: "1:16.330", drs: "2 Zones", wear: ["C3", "C2", "C1"] },
    color: "mercedes",
    description: "A staple for pre-season testing, this track tests every aspect of a car's aerodynamic performance.",
    funFact: "The circuit's long home straight is nearly 1.1km long."
  },
  {
    id: "montreal",
    slug: "canadian-gp",
    name: "Canadian GP",
    location: "Circuit Gilles Villeneuve",
    country: "CANADA",
    path: "M100,300 L700,300 L700,400 L100,400 Z",
    stats: { record: "1:13.078", drs: "3 Zones", wear: ["C5", "C4", "C3"] },
    color: "mclaren",
    description: "Located on a man-made island, known for its heavy braking zones and the famous 'Wall of Champions'.",
    funFact: "Groundhogs are common visitors to the track, often causing yellow flags."
  },
  {
    id: "spielberg",
    slug: "austrian-gp",
    name: "Austrian GP",
    location: "Red Bull Ring",
    country: "AUSTRIA",
    path: "M100,500 L500,100 L700,300 L500,500 Z",
    stats: { record: "1:05.619", drs: "3 Zones", wear: ["C5", "C4", "C3"] },
    color: "redbull",
    description: "A short, high-speed circuit in the Styrian mountains, featuring dramatic elevation changes.",
    funFact: "At just 1 minute 5 seconds for a lap, it is the shortest lap in terms of time on the calendar."
  },
  {
    id: "silverstone",
    slug: "british-gp",
    name: "British GP",
    location: "Silverstone Circuit",
    country: "UK",
    path: "M100,200 L300,150 L500,180 L700,300 L650,450 L500,550 L300,500 L150,450 Z",
    stats: { record: "1:27.097", drs: "2 Zones", wear: ["C3", "C2", "C1"] },
    color: "redbull",
    description: "The home of F1. A high-speed masterclass featuring the iconic Maggotts, Becketts, and Chapel sequence.",
    funFact: "It hosted the first-ever F1 championship race in 1950."
  },
  {
    id: "spa",
    slug: "belgian-gp",
    name: "Belgian GP",
    location: "Spa-Francorchamps",
    country: "BELGIUM",
    path: "M200,100 L600,150 L750,300 L700,500 L400,550 L150,400 Z",
    stats: { record: "1:46.286", drs: "2 Zones", wear: ["C4", "C3", "C2"] },
    color: "ferrari",
    description: "A majestic forest circuit featuring Eau Rouge and the fast Blanchimont curve.",
    funFact: "At over 7km, it is the longest track currently on the F1 calendar."
  },
  {
    id: "budapest",
    slug: "hungarian-gp",
    name: "Hungarian GP",
    location: "Hungaroring",
    country: "HUNGARY",
    path: "M100,300 C200,100 600,100 700,300 L700,500 L100,500 Z",
    stats: { record: "1:16.627", drs: "2 Zones", wear: ["C5", "C4", "C3"] },
    color: "mercedes",
    description: "Often called 'Monaco without the walls' due to its tight, twisty nature and lack of overtaking opportunities.",
    funFact: "It was the first Grand Prix to be held behind the 'Iron Curtain' in 1986."
  },
  {
    id: "zandvoort",
    slug: "dutch-gp",
    name: "Dutch GP",
    location: "Circuit Zandvoort",
    country: "NETHERLANDS",
    path: "M100,400 L100,200 L400,100 L700,200 L700,400 L400,550 Z",
    stats: { record: "1:11.097", drs: "2 Zones", wear: ["C3", "C2", "C1"] },
    color: "redbull",
    description: "A rollercoaster through the dunes featuring extreme banking in Turns 3 and 14.",
    funFact: "The Arie Luyendyk corner features a steeper banking (18 degrees) than Indianapolis (9 degrees)."
  },
  {
    id: "monza",
    slug: "italian-gp",
    name: "Italian GP",
    location: "Monza Circuit",
    country: "ITALY",
    path: "M100,300 L700,300 C800,400 800,200 700,300 L100,300",
    stats: { record: "1:21.046", drs: "2 Zones", wear: ["C5", "C4", "C3"] },
    color: "ferrari",
    description: "The Temple of Speed. Straight sections and high-speed corners test top-end power and low-drag efficiency.",
    funFact: "The fastest lap in F1 history was set here by Lewis Hamilton in 2020 (average speed: 264.362 km/h)."
  },
  {
    id: "baku",
    slug: "azerbaijan-gp",
    name: "Azerbaijan GP",
    location: "Baku City Circuit",
    country: "AZERBAIJAN",
    path: "M100,100 L700,100 L700,500 L100,500 Z",
    stats: { record: "1:43.009", drs: "2 Zones", wear: ["C5", "C4", "C3"] },
    color: "redbull",
    description: "A unique street circuit combining the modern Baku skyline with the historic Old City walls.",
    funFact: "The 2.2km main straight is the longest flat-out section in Formula 1."
  },
  {
    id: "singapore",
    slug: "singapore-gp",
    name: "Singapore GP",
    location: "Marina Bay Street Circuit",
    country: "SINGAPORE",
    path: "M100,100 L300,50 L500,150 L700,200 L600,400 L400,550 L200,450 Z",
    stats: { record: "1:35.867", drs: "4 Zones", wear: ["C5", "C4", "C3"] },
    color: "mercedes",
    description: "The original night race. Extremely demanding due to humidity, 23 corners, and bumpiness.",
    funFact: "Drivers can lose up to 3kg of body weight during the two-hour race due to the heat."
  },
  {
    id: "austin",
    slug: "united-states-gp",
    name: "United States GP",
    location: "Circuit of the Americas",
    country: "USA",
    path: "M100,500 L200,100 L400,300 L600,100 L700,500 Z",
    stats: { record: "1:36.169", drs: "2 Zones", wear: ["C4", "C3", "C2"] },
    color: "redbull",
    description: "A counter-clockwise track featuring a steep uphill climb into Turn 1 and 'S' curves inspired by Silverstone.",
    funFact: "The first sector is heavily inspired by the Maggotts-Becketts sequence at Silverstone."
  },
  {
    id: "mexico",
    slug: "mexico-city-gp",
    name: "Mexico City GP",
    location: "Autódromo Hermanos Rodríguez",
    country: "MEXICO",
    path: "M100,300 L700,300 L700,500 L100,500 Z",
    stats: { record: "1:17.774", drs: "3 Zones", wear: ["C5", "C4", "C3"] },
    color: "redbull",
    description: "High-altitude racing at 2,200m above sea level, where thin air reduces downforce and engine cooling.",
    funFact: "The track passes directly through the Foro Sol baseball stadium."
  },
  {
    id: "brazil",
    slug: "sao-paulo-gp",
    name: "São Paulo GP",
    location: "Interlagos Circuit",
    country: "BRAZIL",
    path: "M100,100 L500,150 L700,500 L300,550 L100,400 Z",
    stats: { record: "1:10.540", drs: "2 Zones", wear: ["C4", "C3", "C2"] },
    color: "mercedes",
    description: "An old-school bowl-shaped track known for dramatic races, unpredictable weather, and the 'Senna S'.",
    funFact: "It is one of the few circuits to run counter-clockwise."
  },
  {
    id: "lasvegas",
    slug: "las-vegas-gp",
    name: "Las Vegas GP",
    location: "Las Vegas Strip Circuit",
    country: "USA",
    path: "M100,100 L700,100 L700,400 L100,400 Z",
    stats: { record: "1:35.490", drs: "2 Zones", wear: ["C5", "C4", "C3"] },
    color: "mercedes",
    description: "A high-speed blast down the iconic Las Vegas Strip, racing past the Sphere and Caesar's Palace.",
    funFact: "The race is held on a Saturday night to accommodate local traffic and global TV audiences."
  },
  {
    id: "qatar",
    slug: "qatar-gp",
    name: "Qatar GP",
    location: "Lusail International Circuit",
    country: "QATAR",
    path: "M100,400 L400,100 L700,400 L400,550 Z",
    stats: { record: "1:24.319", drs: "1 Zone", wear: ["C3", "C2", "C1"] },
    color: "redbull",
    description: "A fast and flowing track with high lateral loads, originally built for MotoGP.",
    funFact: "The entire 5.4km circuit is floodlit for night racing."
  },
  {
    id: "abudhabi",
    slug: "abu-dhabi-gp",
    name: "Abu Dhabi GP",
    location: "Yas Marina Circuit",
    country: "UAE",
    path: "M100,100 L700,100 L700,500 L400,300 L100,500 Z",
    stats: { record: "1:26.103", drs: "2 Zones", wear: ["C5", "C4", "C3"] },
    color: "redbull",
    description: "The season finale. A twilight race starting in the sun and finishing under lights through the Yas Hotel.",
    funFact: "It features a unique pit lane exit that passes under the track through a tunnel."
  }
];

export const CAR_PARTS = [
  { id: "halo", name: "Titanium Halo", desc: "Can withstand 12,000kg. Vital driver protection.", stat: "12 Tonnes" },
  { id: "pu", name: "Power Unit", desc: "1.6L V6 Turbo Hybrid + MGU-K/H.", stat: "1000+ BHP" },
  { id: "wing", name: "Front Wing", desc: "Active aero profiles for 2025 ground effect.", stat: "Downforce" },
  { id: "tyres", name: "P-Zero Compounds", desc: "C0 to C5 slick compounds.", stat: "18-inch" },
];
