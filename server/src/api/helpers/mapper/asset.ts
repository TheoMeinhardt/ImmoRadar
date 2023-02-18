import { asset, assetDTO } from '../../types';

function assetMapper(dto: assetDTO | assetDTO[]): asset | asset[] {
  const convertassetDTOToAsset = (d: assetDTO): asset => {
    const newasset: asset = {
      assetID: d.asset_id,
      name: d.name,
      icon: d.icon ?? undefined,
    };

    return newasset;
  };

  if (Array.isArray(dto)) {
    const assetArray: asset[] = [];

    for (const usr of dto) {
      assetArray.push(convertassetDTOToAsset(usr));
    }
    return assetArray;
  }

  return convertassetDTOToAsset(dto);
}

export default assetMapper;
