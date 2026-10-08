export interface CarSpec {
  engine?: string;
  horsepower?: string;
  acceleration?: string; // 0-60 mph
  topSpeed?: string;
  transmission?: string;
  drivetrain?: string;
  fuelType?: string;
  location?: string;
  mileage?: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: "Performance" | "Luxury" | "Sports" | "Sedan" | "SUV";
  priceSale: number;
  priceRentPerDay: number;
  availableForSale: boolean;
  availableForRent: boolean;
  featured: boolean;
  tagline: string;
  description: string;
  images: {
    hero: string;
    front: string;
    side: string;
    rear: string;
    gallery: string[];
  };
  specs: CarSpec;
}

export const CARS: Car[] = [
  {
    id: "porsche-911-gt3-rs",
    slug: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    category: "Performance",
    priceSale: 325000,
    priceRentPerDay: 1850,
    availableForSale: true,
    availableForRent: true,
    featured: true,
    tagline: "Pure motorsport DNA engineered for precise track domination.",
    description:
      "The Porsche 911 GT3 RS is the ultimate expression of naturally aspirated precision. Featuring aggressive active aerodynamics, lightweight carbon fiber construction, and a high-revving 4.0-liter flat-six boxer engine, it transforms every apex into an art form.",
    images: {
      hero: "/cars/porche/gt side.webp",
      front: "/cars/porche/gt front.webp",
      side: "/cars/porche/gt side.webp",
      rear: "/cars/porche/gt back.webp",
      gallery: [
        "/cars/porche/gt front.webp",
        "/cars/porche/gt side.webp",
        "/cars/porche/gt back.webp",
      ],
    },
    specs: {
      engine: "4.0L Naturally Aspirated Flat-6",
      horsepower: "518 hp @ 8,500 RPM",
      acceleration: "3.0 sec (0-60 mph)",
      topSpeed: "184 mph",
      transmission: "7-speed PDK Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "New York Showroom",
      mileage: "1,200 miles",
    },
  },
  {
    id: "ferrari-296-gtb",
    slug: "ferrari-296-gtb",
    brand: "Ferrari",
    model: "296 GTB",
    year: 2024,
    category: "Sports",
    priceSale: 368000,
    priceRentPerDay: 2200,
    availableForSale: true,
    availableForRent: true,
    featured: true,
    tagline: "Hybrid V6 performance delivering sound, soul, and instant torque.",
    description:
      "Redefining supercar dynamics, the Ferrari 296 GTB pairs a wide-angle mid-rear 120° V6 engine with an electric motor to unleash 819 horsepower. Sculpted with aerodynamic elegance, it provides electrifying responsiveness both on the street and circuit.",
    images: {
      hero: "/cars/ferrari/ferrari side.webp",
      front: "/cars/ferrari/ferrari front.webp",
      side: "/cars/ferrari/ferrari side.webp",
      rear: "/cars/ferrari/ferarri back.webp",
      gallery: [
        "/cars/ferrari/ferrari front.webp",
        "/cars/ferrari/ferrari side.webp",
        "/cars/ferrari/ferarri back.webp",
      ],
    },
    specs: {
      engine: "3.0L Twin-Turbo V6 Hybrid",
      horsepower: "819 hp total output",
      acceleration: "2.8 sec (0-60 mph)",
      topSpeed: "205 mph",
      transmission: "8-speed F1 Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      fuelType: "Plug-in Hybrid Gasoline",
      location: "Miami Sanctuary",
      mileage: "850 miles",
    },
  },
  {
    id: "lamborghini-huracan-performante",
    slug: "lamborghini-huracan-performante",
    brand: "Lamborghini",
    model: "Huracán Performante",
    year: 2023,
    category: "Performance",
    priceSale: 340000,
    priceRentPerDay: 2100,
    availableForSale: true,
    availableForRent: true,
    featured: true,
    tagline: "Unapologetic V10 symphony fused with forged composite aero.",
    description:
      "The Huracán Performante combines lightweight materials, active aerodynamics (ALA), and an atmospheric V10 engine that sings all the way to 8,500 RPM. Designed to command attention from every angle with dramatic presence.",
    images: {
      hero: "/cars/lambogini/lam side.webp",
      front: "/cars/lambogini/lam front.webp",
      side: "/cars/lambogini/lam side.webp",
      rear: "/cars/lambogini/lam back.webp",
      gallery: [
        "/cars/lambogini/lam front.webp",
        "/cars/lambogini/lam side.webp",
        "/cars/lambogini/lam back.webp",
      ],
    },
    specs: {
      engine: "5.2L Naturally Aspirated V10",
      horsepower: "631 hp @ 8,000 RPM",
      acceleration: "2.9 sec (0-60 mph)",
      topSpeed: "201 mph",
      transmission: "7-speed Dual-Clutch LDF",
      drivetrain: "All-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "Los Angeles Hub",
      mileage: "2,400 miles",
    },
  },
  {
    id: "mercedes-amg-gt-black-series",
    slug: "mercedes-amg-gt-black-series",
    brand: "Mercedes-AMG",
    model: "GT Black Series",
    year: 2023,
    category: "Performance",
    priceSale: 410000,
    priceRentPerDay: 2400,
    availableForSale: true,
    availableForRent: true,
    featured: true,
    tagline: "The absolute pinnacle of AMG performance in striking Solarbeam Yellow.",
    description:
      "Powered by a flat-plane crankshaft V8 engine, the AMG GT Black Series is a street-legal race car. Featuring adjustable motorsport suspension, dual rear spoiler wing, and aggressive front splitter, it represents the raw soul of Affalterbach.",
    images: {
      hero: "/cars/amg/benz yellow side.webp",
      front: "/cars/amg/benz yellow front.webp",
      side: "/cars/amg/benz yellow side.webp",
      rear: "/cars/amg/benz yellow back.webp",
      gallery: [
        "/cars/amg/benz yellow front.webp",
        "/cars/amg/benz yellow side.webp",
        "/cars/amg/benz yellow back.webp",
      ],
    },
    specs: {
      engine: "4.0L Biturbo Flat-Plane V8",
      horsepower: "720 hp @ 6,700 RPM",
      acceleration: "3.1 sec (0-60 mph)",
      topSpeed: "202 mph",
      transmission: "7-speed AMG SPEEDSHIFT DCT",
      drivetrain: "Rear-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "New York Showroom",
      mileage: "600 miles",
    },
  },
  {
    id: "aston-martin-dbs-superleggera",
    slug: "aston-martin-dbs-superleggera",
    brand: "Aston Martin",
    model: "DBS Superleggera",
    year: 2024,
    category: "Luxury",
    priceSale: 335000,
    priceRentPerDay: 1950,
    availableForSale: true,
    availableForRent: true,
    featured: false,
    tagline: "A magnificent super GT combining brute V12 power with British elegance.",
    description:
      "The Aston Martin DBS Superleggera is a flagship grand tourer wrapped in hand-crafted carbon fiber body panels. Its twin-turbo V12 unleashes effortless torque, creating a serene high-speed sanctuary.",
    images: {
      hero: "/cars/aston martin/aston martin side.webp",
      front: "/cars/aston martin/aston martin front.webp",
      side: "/cars/aston martin/aston martin side.webp",
      rear: "/cars/aston martin/aston martin back.webp",
      gallery: [
        "/cars/aston martin/aston martin front.webp",
        "/cars/aston martin/aston martin side.webp",
        "/cars/aston martin/aston martin back.webp",
      ],
    },
    specs: {
      engine: "5.2L Twin-Turbo V12",
      horsepower: "715 hp @ 6,500 RPM",
      acceleration: "3.2 sec (0-60 mph)",
      topSpeed: "211 mph",
      transmission: "8-speed ZF Automatic",
      drivetrain: "Rear-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "London Private Lounge",
      mileage: "1,500 miles",
    },
  },
  {
    id: "mercedes-benz-s-class-maybach",
    slug: "mercedes-benz-s-class-maybach",
    brand: "Mercedes-Benz",
    model: "Maybach S 680",
    year: 2024,
    category: "Luxury",
    priceSale: 245000,
    priceRentPerDay: 1400,
    availableForSale: true,
    availableForRent: true,
    featured: false,
    tagline: "Unrivaled presidential luxury and whisper-quiet V12 refinement.",
    description:
      "The Mercedes-Maybach S 680 stands as the benchmark for luxury sedans. First-class rear executive seats with calf massage, active road noise compensation, and Burmester high-end 4D sound turn every journey into a private lounge experience.",
    images: {
      hero: "/cars/benz/benz side.webp",
      front: "/cars/benz/benz front.webp",
      side: "/cars/benz/benz side.webp",
      rear: "/cars/benz/benz back.webp",
      gallery: [
        "/cars/benz/benz front.webp",
        "/cars/benz/benz side.webp",
        "/cars/benz/benz back.webp",
      ],
    },
    specs: {
      engine: "6.0L Biturbo V12",
      horsepower: "621 hp @ 5,500 RPM",
      acceleration: "4.4 sec (0-60 mph)",
      topSpeed: "155 mph (limited)",
      transmission: "9-speed 9G-TRONIC",
      drivetrain: "4MATIC All-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "New York Showroom",
      mileage: "3,100 miles",
    },
  },
  {
    id: "bmw-m4-competition",
    slug: "bmw-m4-competition",
    brand: "BMW",
    model: "M4 Competition xDrive",
    year: 2024,
    category: "Sedan",
    priceSale: 105000,
    priceRentPerDay: 650,
    availableForSale: true,
    availableForRent: true,
    featured: false,
    tagline: "Razor-sharp dynamic precision engineered for daily dominance.",
    description:
      "Combining track-tested M TwinPower Turbo technology with intelligence of M xDrive, the BMW M4 Competition delivers visceral acceleration, carbon bucket seat support, and aggressive front kidney grille geometry.",
    images: {
      hero: "/cars/bmw/bmw full side.webp",
      front: "/cars/bmw/bmw front.webp",
      side: "/cars/bmw/bmw full side.webp",
      rear: "/cars/bmw/bmw 1.webp",
      gallery: [
        "/cars/bmw/bmw front.webp",
        "/cars/bmw/bmw full side.webp",
        "/cars/bmw/bmw 1.webp",
      ],
    },
    specs: {
      engine: "3.0L Twin-Turbo Inline-6",
      horsepower: "503 hp @ 6,250 RPM",
      acceleration: "3.4 sec (0-60 mph)",
      topSpeed: "180 mph",
      transmission: "8-speed M Steptronic",
      drivetrain: "M xDrive All-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "Chicago Showroom",
      mileage: "2,200 miles",
    },
  },
  {
    id: "lexus-lc-500",
    slug: "lexus-lc-500",
    brand: "Lexus",
    model: "LC 500 Bespoke",
    year: 2024,
    category: "Luxury",
    priceSale: 112000,
    priceRentPerDay: 750,
    availableForSale: true,
    availableForRent: true,
    featured: false,
    tagline: "Concept-car design aesthetic with a glorious naturally aspirated V8 sound.",
    description:
      "The Lexus LC 500 is a modern masterwork of Japanese Takumi craftsmanship. Striking flush handles, dynamic rear-wing aero, and a high-revving 5.0L V8 engine make it an irresistible grand tourer.",
    images: {
      hero: "/cars/lexus/lexus side.webp",
      front: "/cars/lexus/lexus front.webp",
      side: "/cars/lexus/lexus side.webp",
      rear: "/cars/lexus/lexus back.webp",
      gallery: [
        "/cars/lexus/lexus front.webp",
        "/cars/lexus/lexus side.webp",
        "/cars/lexus/lexus back.webp",
      ],
    },
    specs: {
      engine: "5.0L Naturally Aspirated V8",
      horsepower: "471 hp @ 7,100 RPM",
      acceleration: "4.4 sec (0-60 mph)",
      topSpeed: "168 mph",
      transmission: "10-speed Direct-Shift Automatic",
      drivetrain: "Rear-Wheel Drive",
      fuelType: "Premium Gasoline",
      location: "San Francisco Haven",
      mileage: "1,800 miles",
    },
  },
];
