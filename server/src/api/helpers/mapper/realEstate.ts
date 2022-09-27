import { realEstate, realEstateDTO } from '../../types';

function realEstateMapper(dto: realEstateDTO | realEstateDTO[]): realEstate | realEstate[] {
  const convertrealEstateDTOtoRealEstate = (d: realEstateDTO): realEstate => {
    const newRealEstate: realEstate = {
      reID: d.re_id,
      name: d.name,
      subname: d.subname ?? null,
      description: d.description,
      addressID: d.address_id,
      propertyArea: d.property_area ?? null,
      usableArea: d.usable_area,
      outsideArea: d.outside_area ?? null,
      rooms: d.rooms,
      bathrooms: d.bathrooms,
      bedrooms: d.bedrooms,
      buyable: d.buyable,
      price: d.price ?? null,
      userID: d.user_id,
      provision: d.provision,
      constructionYear: d.construction_year ?? null,
      heatingID: d.heating_id ?? null,
      documentID: d.document_id ?? null,
    };

    return newRealEstate;
  };

  if (Array.isArray(dto)) {
    const newArr: realEstate[] = [];
    dto.forEach((re) => newArr.push(convertrealEstateDTOtoRealEstate(re)));
    return newArr;
  }

  return convertrealEstateDTOtoRealEstate(dto);
}

export default realEstateMapper;
