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
    mail: {
      address: process.env.EMAIL_ADDRESS,
      password: process.env.EMAIL_PASSWORD,
    },
    client_url: process.env.CLIENT_URL,
  };
};

const splitString = (
  value: string | undefined,
  splitter: string | RegExp,
): string[] => {
  if (!value) return ['*'];

  return value.split(splitter);
};
