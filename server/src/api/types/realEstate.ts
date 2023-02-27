import { address, asset, heating } from './index';

type realEstateDTO = {
  re_id: string;
  name: string;
  subname: string;
  description: string;
  address_id: string;
  property_area: number;
  usable_area: number;
  outside_area: number;
  rooms: number;
  bathrooms: number;
  bedrooms: number;
  buyable: boolean;
  price: number;
  user_id: string;
  provision: number;
  construction_year: Date;
  heating_id: string;
  document_id: string;
};

type realEstate = {
  reID: string;
  name: string;
  subname: string | null;
  description: string;
  addressID: string;
  address?: address;
  propertyArea: number | null;
  usableArea: number;
  outsideArea: number | null;
  rooms: number;
  bathrooms: number;
  bedrooms: number;
  buyable: boolean;
  price: number | null;
  userID: string;
  provision: number;
  constructionYear: Date | null;
  images: string[];
  assets: asset[];
  heatingID: string | null;
  heating: heating;
  documentID: string | null;
};

type shortRealEstate = {
  reID: string;
  name: string;
  address?: string;
  lat: number;
  long: number;
  price: number | null;
  buyable: boolean;
  usableArea: number;
  thumbnail: string;
  assets: asset[];
  rooms: number;
};

export { realEstate, realEstateDTO, shortRealEstate };
