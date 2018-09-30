// required environment variables
[
  'NODE_ENV',
  'PORT',
  'MONGO_URL',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

module.exports = {
  env: process.env.NODE_ENV,
  serverPort: Number(process.env.PORT || 3000),
  mongoUrl: process.env.NODE_ENV !== 'production'
    ? process.env.MONGO_URL_TEST : process.env.MONGO_URL,
};
