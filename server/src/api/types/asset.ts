type assetDTO = {
  asset_id: string;
  name: string;
  icon: string | null;
};

type asset = {
  assetID: string;
  name: string;
  icon?: string;
};

export { assetDTO, asset };
