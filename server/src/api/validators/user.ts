import validator from 'is-my-json-valid';

const user = validator({
  type: 'object',
  properties: {
    userID: { type: 'string' },
    username: { type: 'string' },
    firstname: { type: ['string', 'null'] },
    middlename: { type: ['string', 'null'] },
    lastname: { type: ['string', 'null'] },
    address: {
      type: 'object',
      properties: {
        addressID: { type: ['string', 'null'] },
        address: { type: 'string' },
        zip: { type: 'number' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' },
      },
      required: ['address', 'zip', 'city', 'state', 'country'],
      additionalProperties: false,
    },
    company: { type: ['string', 'null'] },
    phone: { type: ['string', 'null'] },
    email: { type: 'string' },
    profilePic: { type: ['string', 'null'] },
    password: { type: 'string' },
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false,
});

export default user;
