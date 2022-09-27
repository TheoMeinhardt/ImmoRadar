import { realEstate, realEstateDto } from '../../types';

function realEstateMapper(dto: realEstateDto): realEstate {
  const newRealEstate: realEstate = {
    reID: dto.re_id,
    name: dto.name,
    subname: dto.subname,
    description: dto.description,
    addressID: dto.address_id,
    propertyArea: dto.property_area,
    usableArea: dto.usable_area,
    outsideArea: dto.outside_area,
    rooms: dto.rooms,
    bathrooms: dto.bathrooms,
    bedrooms: dto.bedrooms,
    buyable: dto.buyable,
    price: dto.price,
    userID: dto.user_id,
    provision: dto.provision,
    constructionYear: dto.construction_year,
    heatingID: dto.heating_id,
    documentID: dto.document_id,
  };

  return newRealEstate;
}

export default realEstateMapper;
