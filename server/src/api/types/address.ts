type addressDTO = {
  address_id: string;
  address: string;
  zip_code: number;
  city: string;
  state: string;
  country: string;
};

type address = {
  addressID: string;
  address: string;
  zip: number;
  city: string;
  state: string;
  country: string;
  lat?: number;
  long?: number;
};

export { address, addressDTO };
