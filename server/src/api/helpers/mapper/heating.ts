import { heating, heatingDTO } from '../../types';

async function heatingMapper(dto: heatingDTO | heatingDTO[]): Promise<heating | heating[]> {
  const convertheatingDtoToheating = async (d: heatingDTO): Promise<heating> => {
    const newheating: heating = {
      heatingID: d.heating_id,
      type: d.type,
      combustible: d.combustible,
      heatingCert: d.heating_certificate ?? undefined,
      heatingRequirement: d.heating_requirement ?? undefined,
      fgee: d.fgee ?? undefined,
    };

    return newheating;
  };

  if (Array.isArray(dto)) {
    const heatingArray: heating[] = [];

    for await (const usr of dto) {
      heatingArray.push(await convertheatingDtoToheating(usr));
    }
    return heatingArray;
  }

  return convertheatingDtoToheating(dto);
}

export default heatingMapper;
