const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
module.exports = {
  generateJWT: async (req, res) => {
    try {
      let { id } = req.body;
      if (!id) {
        throw new Error("'id' is an required field");
      }
      const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "5s" });
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.json({ error: "Error" });
    }
  },
  validateJWT: async (req, res) => {
    try {
      let { token } = req.body;

      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ decoded });
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      res.json({ error });
    }
  },
};
