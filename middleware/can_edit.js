module.exports = function(req, res, next) {
  if (req.user.id !== Number.parseInt(req.params.id)) {
    return res.status(403).send('Access Denined...');
  }
  next();
};
