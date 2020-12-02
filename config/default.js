module.exports = {
  postgresUrl: process.env.POSTGRES_URL || '',
  port: '3001',
  jwt: {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  }
};
