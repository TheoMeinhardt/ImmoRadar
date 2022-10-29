import validator from 'is-my-json-valid';

const realEstate = validator({
  type: 'object',
  properties: {
    reID: { type: 'string' },
    name: { type: 'string' },
    subname: { type: 'string' },
    description: { type: 'string' },
    addressID: { type: 'string' },
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
    constructionYear: { type: ['number', 'null'] },
    heatingID: { type: 'string' },
    documentID: { type: 'string' },
  },
  required: ['name', 'description', 'addressID', 'usableArea', 'rooms', 'bathrooms', 'bedrooms', 'buyable', 'userID', 'provision'],
  additionalProperties: false,
});

export default realEstate;
