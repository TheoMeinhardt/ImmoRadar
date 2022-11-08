import { address } from '../types';

function makeReadableAddress(adrs: address): string {
  return `${adrs.address}, ${adrs.zip} ${adrs.city}, ${adrs.state}, ${adrs.country}`;
}

export default makeReadableAddress;
