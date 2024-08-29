// src/data.ts
export interface SalesData {
  [month: string]: number;
}

export interface Model {
  name: string;
  sales: SalesData;
}

export interface Manufacturer {
  name: string;
  logo: string;
  models: Model[];
}

export const manufacturers: Manufacturer[] = [
  {
    name: "Toyota",
    logo: "src/assets/toyota.png",
    models: [
      {
        name: "Corolla",
        sales: {
          January: 500,
          February: 600,
          March: 550,
          April: 650,
          May: 500,
          June: 600,
          July: 550,
          Aug: 650,
        },
      },
      {
        name: "Fortuner",
        sales: {
          January: 500,
          February: 600,
          March: 550,
          April: 650,
          May: 500,
          June: 600,
          July: 550,
          Aug: 650,
        },
      },
      {
        name: "Innova",
        sales: {
          January: 500,
          February: 600,
          March: 550,
          April: 650,
          May: 500,
          June: 600,
          July: 550,
          Aug: 650,
        },
      },
      {
        name: "Camry",
        sales: {
          January: 300,
          February: 350,
          March: 400,
          April: 450,
          May: 500,
          June: 600,
          July: 550,
          Aug: 650,
        },
      },
      {
        name: "Hyryder",
        sales: {
          January: 300,
          February: 30,
          March: 40,
          April: 90,
          May: 400,
          June: 100,
          July: 350,
          Aug: 690,
        },
      },
    ],
  },
  {
    name: "Hyundai",
    logo: "src/assets/hyundai.png",
    models: [
      {
        name: "F-150",
        sales: {
          January: 800,
          February: 850,
          March: 900,
          April: 950,
        },
      },
      {
        name: "Mustang",
        sales: {
          January: 200,
          February: 250,
          March: 300,
          April: 350,
        },
      },
    ],
  },
  {
    name: "Tata Motors",
    logo: "src/assets/tata.png",
    models: [],
  },
  {
    name: "Mahindra",
    logo: "src/assets/mahindra.png",
    models: [],
  },
  {
    name: "Maruti Suzuki",
    logo: "src/assets/suzuki.png",
    models: [],
  },
  {
    name: "Force",
    logo: "src/assets/force.png",
    models: [],
  },
  {
    name: "Honda",
    logo: "src/assets/honda.png",
    models: [],
  },
  {
    name: "Škoda",
    logo: "src/assets/skoda.png",
    models: [],
  },
  {
    name: "Volkswagen",
    logo: "src/assets/vw.png",
    models: [],
  },
  {
    name: "Renault",
    logo: "src/assets/renault.png",
    models: [],
  },
  {
    name: "Nissan",
    logo: "src/assets/nissan.png",
    models: [],
  },
  {
    name: "MG Motor",
    logo: "src/assets/mg.png",
    models: [],
  },
  {
    name: "Kia",
    logo: "src/assets/kia.jpeg",
    models: [],
  },
  {
    name: "BMW",
    logo: "src/assets/bmw.png",
    models: [],
  },
  {
    name: "Mini",
    logo: "src/assets/mini.png",
    models: [],
  },
  {
    name: "Citroën",
    logo: "src/assets/citroen.jpg",
    models: [],
  },
  {
    name: "Fiat",
    logo: "src/assets/fiat.png",
    models: [],
  },
  {
    name: "Isuzu Motors",
    logo: "src/assets/isuzu.png",
    models: [],
  },
  {
    name: "Jaguar Land Rover",
    logo: "src/assets/jaguar.png",
    models: [],
  },
  {
    name: "Mercedes-Benz",
    logo: "src/assets/mercedes.png",
    models: [],
  },
  {
    name: "Lexus",
    logo: "src/assets/lexus.png",
    models: [],
  },
  {
    name: "Audi",
    logo: "src/assets/audi.png",
    models: [],
  },
  {
    name: "Porsche",
    logo: "src/assets/porsche.png",
    models: [],
  },
  {
    name: "Jeep",
    logo: "src/assets/jeep.png",
    models: [],
  },
];
