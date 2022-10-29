import validator from 'is-my-json-valid';

const realEstate = validator({
  type: 'object',
  properties: {
    name: { type: 'string' },
    subname: { type: 'string' },
    description: { type: 'string' },
    addressID: { type: 'string' },
    propertyArea: { type: 'number' },
    usableArea: { type: 'number' },
    outsideArea: { type: 'number' },
    rooms: { type: 'number' },
    bathrooms: { type: 'number' },
    bedrooms: { type: 'number' },
    buyable: { type: 'boolean' },
    price: { type: 'number' },
    userID: { type: 'string' },
    provision: { type: 'number' },
    constructionYear: { type: 'number' },
    heatingID: { type: 'string' },
    documentID: { type: 'string' },
  },
  required: ['name', 'description', 'addressID', 'usableArea', 'rooms', 'bathrooms', 'bedrooms', 'buyable', 'userID', 'provision'],
  additionalProperties: false,
});

export default realEstate;
