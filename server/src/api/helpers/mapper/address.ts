import { addressDTO, address } from '../../types';

function addressMapper(dto: addressDTO | addressDTO[]): address | address[] {
  const convertAddressDtoToAddress = (d: addressDTO): address => {
    const newAddress: address = {
      addressID: d.address_id,
      address: d.address,
      zip: d.zip_code,
      city: d.city,
      state: d.state,
      country: d.country,
    };

    return newAddress;
  };

  if (Array.isArray(dto)) {
    const addressArray: address[] = [];
    dto.forEach((adr) => addressArray.push(convertAddressDtoToAddress(adr)));
    return addressArray;
  }

  return convertAddressDtoToAddress(dto);
}

export default addressMapper;
