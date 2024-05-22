export const configLoad = () => {
  return {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    origins: splitString(process.env.ORIGINS, ','),
  };
};

const splitString = (
  value: string | undefined,
  splitter: string | RegExp,
): string[] => {
  if (!value) return ['*'];

  return value.split(splitter);
};
