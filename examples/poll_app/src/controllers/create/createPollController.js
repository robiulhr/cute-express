module.exports = createPollController = async function (req, res) {
  try {
    res.status(200).send({ massage: "render the create page." });
  } catch (err) {
    res.status(400).render({ massage: "something went wrong" });
  }
};
