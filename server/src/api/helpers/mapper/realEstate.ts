import { realEstate, realEstateDto } from '../../types';

function realEstateMapper(dto: realEstateDto | realEstateDto[]): realEstate | realEstate[] {
  const convertRealEstateDTOtoRealEstate = (d: realEstateDto): realEstate => {
    const newRealEstate: realEstate = {
      reID: d.re_id,
      name: d.name,
      subname: d.subname,
      description: d.description,
      addressID: d.address_id,
      propertyArea: d.property_area,
      usableArea: d.usable_area,
      outsideArea: d.outside_area,
      rooms: d.rooms,
      bathrooms: d.bathrooms,
      bedrooms: d.bedrooms,
      buyable: d.buyable,
      price: d.price,
      userID: d.user_id,
      provision: d.provision,
      constructionYear: d.construction_year,
      heatingID: d.heating_id,
      documentID: d.document_id,
    };

    return newRealEstate;
  };

  if (Array.isArray(dto)) {
    const newArr: realEstate[] = [];
    dto.forEach((re) => newArr.push(convertRealEstateDTOtoRealEstate(re)));
    return newArr;
  }

  return convertRealEstateDTOtoRealEstate(dto);
}

export default realEstateMapper;
