export const configLoad = () => {
  return {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
  };
};
