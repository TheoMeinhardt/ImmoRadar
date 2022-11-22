import validator from 'is-my-json-valid';

const user = validator({
  type: 'object',
  properties: {
    userID: { type: 'string' },
    name: { type: 'string' },
    addressID: { type: ['string', 'null'] },
    company: { type: ['string', 'null'] },
    phone: { type: ['string', 'null'] },
    email: { type: 'string' },
    profilePic: { type: ['string', 'null'] },
    password: { type: 'string' },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
});

export default user;
