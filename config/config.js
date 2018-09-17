// required environment variables
[
  'PORT',
  'NODE_ENV',
  'MONGO_URL',
  'MONGO_URL_TEST',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV,
  serverPort: Number(process.env.PORT),
  mongoUrl: process.env.NODE_ENV !== 'production'
    ? process.env.MONGO_URL_TEST : process.env.MONGO_URL,
  baseUrl: process.env.NODE_ENV !== 'production'
    ? `http://localhost:${process.env.PORT}` : `${process.env.BASE_URL}:${process.env.PORT}`,
};

module.exports = config;
