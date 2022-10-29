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
  heatingID: string | null;
  documentID: string | null;
};

type shortRealEstate = {
  name: string;
  addressID: string;
  price: number | null;
  usableArea: number;
  rooms: number;
};

export { realEstate, realEstateDTO, shortRealEstate };
