type geocodeRes = {
  type: string;
  query: string[];
  features: {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
      accuracy?: string;
    };
    text: string;
    place_name: string;
    bbox?: number[];
    center: number[];
    geometry: {
      type: string;
      coordinates: number[];
    };
    address: string;
    context: {
      id: string;
      short_code?: string;
      wikidata?: string;
      text: string;
    }[];
  }[];
  attribution: string;
};

export default geocodeRes;
