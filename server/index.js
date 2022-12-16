const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT =
  "9cd44a2629d3fb73d1418216fc33a18509eda38271d77713a4dfdb8b93e3e1a0";

app.post("/gift", (req, res) => {
  const body = req.body;
  const proof = body.proof;
  const name = body.name;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
