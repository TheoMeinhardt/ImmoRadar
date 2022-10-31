import { user, userDTO } from '../../types/user';

function userMapper(dto: userDTO | userDTO[]): user | user[] {
  const convertUserDtoToUser = (d: userDTO): user => {
    const newUser: user = {
      userID: d.user_id,
      name: d.username,
      addressID: d.address_id,
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
    dto.forEach((usr) => userArray.push(convertUserDtoToUser(usr)));
    return userArray;
  }

  return convertUserDtoToUser(dto);
}

export default userMapper;
