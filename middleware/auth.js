class Authorization {
  static authorizeRequest(access) {
    return (req, res, next) => {
      const { user } = req;
      console.log(user,"useruser");
      if ((access === 'ADMIN' && user.role !== 'ADMIN')) {
        return res.status(403).json({ message: 'permission denied' });
      }
      return next();
    };
  }
}

module.exports = Authorization;
