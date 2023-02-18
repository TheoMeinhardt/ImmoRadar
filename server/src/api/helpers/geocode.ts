import axios from 'axios';
import dotenv from 'dotenv';
import { address, geocodeRes } from '../types';

dotenv.config();

async function coordinatesFromAddress(adrs: address): Promise<geocodeRes> {
  const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adrs.address} ${adrs.zip} ${adrs.city} ${adrs.country}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`);

  return data;
}

export default coordinatesFromAddress;
