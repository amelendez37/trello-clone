// required environment variables
[
  'PORT',
  'NODE_ENV',
  'MONGO_URL',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV,
  serverPort: Number(process.env.PORT),
  mongoUrl: process.env.MONGO_URL,
};

module.exports = config;
