type realEstate = {
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

export default realEstate;
