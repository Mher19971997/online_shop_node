class CryptoService {
  numGen = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
}

module.exports = new CryptoService();
