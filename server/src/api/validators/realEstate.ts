import validator from 'is-my-json-valid';

const realEstate = validator({
  type: 'object',
  properties: {
    reID: { type: 'string' },
    name: { type: 'string' },
    subname: { type: 'string' },
    description: { type: 'string' },
    addressID: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        addressID: { type: 'string' },
        address: { type: 'string' },
        zip: { type: 'number' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' },
      },
      required: ['address', 'zip', 'city', 'state', 'country'],
      additionalProperties: false,
    },
    propertyArea: { type: 'string' },
    usableArea: { type: 'string' },
    outsideArea: { type: 'string' },
    rooms: { type: 'number' },
    bathrooms: { type: 'number' },
    bedrooms: { type: 'number' },
    buyable: { type: 'boolean' },
    price: { type: 'string' },
    userID: { type: 'string' },
    provision: { type: 'number' },
    assets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          assetID: { type: 'string' },
          name: { type: 'string' },
          icon: { type: 'string' },
        },
        required: ['assetID'],
        additionalProperties: false,
      },
    },
    heating: {
      type: 'object',
      properties: {
        heatingID: { type: 'string' },
        type: { type: 'string' },
        combustible: { type: 'string' },
        heatingCert: { type: 'string' },
        heatingRequirement: { type: 'number' },
        fgee: { type: 'number' },
      },
      required: ['type', 'combustible'],
      additionalProperties: false,
    },
    constructionYear: { type: ['number', 'null'] },
    documentID: { type: ['string', 'null'] },
  },
  required: ['name', 'description', 'address', 'usableArea', 'rooms', 'bathrooms', 'bedrooms', 'buyable', 'userID', 'provision', 'heating'],
  additionalProperties: false,
});

export default realEstate;
