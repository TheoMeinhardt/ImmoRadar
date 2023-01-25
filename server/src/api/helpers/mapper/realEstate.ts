import { realEstate, realEstateDTO } from '../../types';
import { getAddress, getImagesByRealEstate } from '../../models';

async function realEstateMapper(dto: realEstateDTO | realEstateDTO[]): Promise<realEstate | realEstate[]> {
  const convertrealEstateDTOtoRealEstate = async (d: realEstateDTO): Promise<realEstate> => {
    const newRealEstate: realEstate = {
      reID: d.re_id,
      name: d.name,
      subname: d.subname ?? null,
      description: d.description,
      addressID: d.address_id,
      address: await getAddress(d.address_id),
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
      images: (await getImagesByRealEstate(d.re_id)).map((img) => img.path),
      heatingID: d.heating_id ?? null,
      documentID: d.document_id ?? null,
    };

    return newRealEstate;
  };

  if (Array.isArray(dto)) {
    const newArr: realEstate[] = [];
    for await (const re of dto) {
      newArr.push(await convertrealEstateDTOtoRealEstate(re));
    }
    return newArr;
  }

  return convertrealEstateDTOtoRealEstate(dto);
}

export default realEstateMapper;
