import { address, user, userDTO } from '../../types';
import { getAddress } from '../../models';

async function userMapper(dto: userDTO | userDTO[]): Promise<user | user[]> {
  const convertUserDtoToUser = async (d: userDTO): Promise<user> => {
    const newUser: user = {
      userID: d.user_id,
      username: d.username,
      firstname: d.firstname,
      middlename: d.middlename,
      lastname: d.lastname,
      address: d.address_id ? ((await getAddress(d.address_id)) as address) : null,
      company: d.company ?? null,
      phone: d.phone ?? null,
      email: d.email,
      profilePic: d.profile_pic ?? null,
      password: d.user_password,
    };

    return newUser;
  };

  if (Array.isArray(dto)) {
    const userArray: user[] = [];

    for await (const usr of dto) {
      userArray.push(await convertUserDtoToUser(usr));
    }
    return userArray;
  }

  return convertUserDtoToUser(dto);
}

export default userMapper;
