module.exports = notFoundController = function (req, res) {
  res.status(404).send({ massage: "Page not found" });
};
