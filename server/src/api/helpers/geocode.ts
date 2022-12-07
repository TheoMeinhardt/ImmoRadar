import axios from 'axios';
import dotenv from 'dotenv';
import { address, mapquestRes } from '../types';

dotenv.config();

async function coordinatesFromAddress(adrs: address): Promise<mapquestRes> {
  const { data } = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${'3CUJqq3AgXKh96JdS1h9gPQSLTwPvpOi'}&location=${adrs.address},${adrs.zip} ${adrs.city},${adrs.country}`);
  return data;
}

export default coordinatesFromAddress;
