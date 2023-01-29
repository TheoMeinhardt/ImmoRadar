type userDTO = {
  user_id: string;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  address_id: string;
  company: string | null;
  phone: string | null;
  email: string;
  profile_pic: string | null;
  user_password: string;
  // sessio_id: string | null;
};

type user = {
  userID: string;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  addressID: string;
  company: string | null;
  phone: string | null;
  email: string;
  profilePic: string | null;
  password: string;
  // sessio_id: string | null;
};

export { userDTO, user };
