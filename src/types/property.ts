export interface Property {
  id?: string;
  landlordId: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  details: {
    type: 'apartment' | 'house' | 'room' | 'commercial';
    size: number; // in square meters
    rooms: number;
    bathrooms: number;
    floor?: number;
    constructionYear: number;
    heatingCost: number;
    heatingSolutions: string[];
    energyLabel: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    distances: {
      school: number;
      shopping: number;
      publicTransport: {
        bus: number;
        train: number;
      };
    };
    lease: {
      term: number; // in months
      renewalPolicy: string;
    };
    amenities: {
      refrigerator: boolean;
      washer: boolean;
      dryer: boolean;
      dishwasher: boolean;
      gym: boolean;
      pool: boolean;
      communityRoom: boolean;
      balcony: boolean;
      garden: boolean;
      parkingLot: boolean;
    };
    security: {
      cctv: boolean;
      alarm: boolean;
      accessControl: string;
    };
    status: 'available' | 'occupied' | 'maintenance';
    visitorPolicy: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    additionalFees: {
      [key: string]: {
        amount: number;
        included: boolean;
      };
    };
  };
  facilities: {
    parking: boolean;
    elevator: boolean;
    furnished: boolean;
    petsAllowed: boolean;
    internetIncluded: boolean;
    heatingIncluded: boolean;
    waterIncluded: boolean;
  };
  rent: {
    monthlyRent: number;
    deposit: number;
    prepaidRent: number;
  };
  tenants: string[]; // Array of tenant user IDs
  createdAt: Date;
  updatedAt: Date;
  images: Array<{
    url: string;
    path: string;
  }>;
}