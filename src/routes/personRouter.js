const router = require("express").Router();
const { trusted } = require("mongoose");
const Person = require("../models/Person");

//  posta novos dados
router.post("/", async (req, res) => {
  try {
    const { name, salary, aproved } = req.body;

    if (!name) {
      throw new Error("Adicione um nome para que prociga com os dados");
    }

    if (!salary) {
      throw new Error("Adicione um salario para que prociga com os dados");
    }

    if (!aproved) {
      throw new Error("Adicione um aproved para que prociga com os dados");
    }

    const user = await Person.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// prgar todos os dados
router.get("/", async (req, res) => {
  try {
    const users = await Person.find({});

    res.status(200).json(users);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// pegad dados por id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (id.length !== 24) {
      res.status(404).json({ message: "Id invalido" });
      return;
    }
    const user = await Person.findById(id);

    if (!user) {
      res.status(404).json({ message: "Id não encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// rota de delite
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await Person.findByIdAndDelete(id);

    res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Atualizar dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (id.length !== 24) {
      res.status(404).json({ message: "Id invalido" });
      return;
    }

    const user = await Person.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      res.status(404).json({ message: "Id não encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (id.length !== 24) {
    res.status(404).json({ message: "Id invalido" });
    return;
  }

  const user = await Person.findById(id);

  if (!user) {
    res.status(404).json({ message: "Id não encontrado" });
    return;
  }

  try {
    await Person.findByIdAndDelete(id);

    res.status(200).json({ message: "Usuario excluido com sucesso" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
