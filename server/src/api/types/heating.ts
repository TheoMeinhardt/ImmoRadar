type heatingDTO = {
  heating_id: string;
  type: string;
  combustible: string;
  heating_certificate?: boolean; // change to string when updatetd in db, which will be a foreign key of table document containing the cert
  heating_requirement?: number;
  fgee?: number;
};

type heating = {
  heatingID: string;
  type: string;
  combustible: string;
  heatingCert?: boolean; // change to string when updatetd in db, which will be a foreign key of table document containing the cert
  heatingRequirement?: number;
  fgee?: number;
};

export { heating, heatingDTO };
