import { realEstate, realEstateDTO, address } from '../../types';
import { getAddress, getImagesByRealEstate, getAssetsByRealEstate, getHeatingByID } from '../../models';
import { addressGeocode } from '..';

async function realEstateMapper(dto: realEstateDTO | realEstateDTO[]): Promise<realEstate | realEstate[]> {
  const convertrealEstateDTOtoRealEstate = async (d: realEstateDTO): Promise<realEstate> => {
    const adrs = await getAddress(d.address_id);
    const geoinfo = await addressGeocode(adrs as address);

    const newRealEstate: realEstate = {
      reID: d.re_id,
      name: d.name,
      subname: d.subname ?? null,
      description: d.description,
      addressID: d.address_id,
      address: adrs,
      propertyArea: d.property_area ?? null,
      usableArea: d.usable_area,
      outsideArea: d.outside_area ?? null,
      rooms: d.rooms,
      bathrooms: d.bathrooms,
      bedrooms: d.bedrooms,
      buyable: d.buyable,
      price: d.price ?? null,
      lat: geoinfo.features[0].center[1],
      long: geoinfo.features[0].center[0],
      userID: d.user_id,
      provision: d.provision,
      constructionYear: d.construction_year ?? null,
      images: (await getImagesByRealEstate(d.re_id)).map((img) => img.path),
      assets: await getAssetsByRealEstate(d.re_id),
      heatingID: d.heating_id ?? null,
      heating: await getHeatingByID(d.heating_id),
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
