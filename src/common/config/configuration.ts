export interface Config {
  steamApiKey: string;
  chunkSize: number;
  services: Services;
}

export interface Services {
  tf2Schema: string;
}

export default (): Config => {
  return {
    steamApiKey: process.env.STEAM_API_KEY,
    chunkSize: parseInt(process.env.CHUNK_SIZE, 10) || 100,
    services: {
      tf2Schema: process.env.TF2_SCHEMA_SERVICE_URL,
    },
  };
};
