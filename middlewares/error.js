module.exports = (err, _req, res, _next) => {
  console.log(err.message);
  res.status(500).json({ message: 'server error' });
};
