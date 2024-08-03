const Finance = require("../models/FinaceModel");
const mongoose = require("mongoose");

const getFinances = async (req, res) => {
  try {
    const finances = await Finance.find({}).sort({createdAt: -1});
    res.status(200).json(finances);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFinance = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No finance with id: ${id}`);
    }
    const finance = await Finance.findById(id);
    res.status(200).json(finance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createFinance = async (req, res) => {
  const { name, amount, date, category, description, type, tags, user,status } =
    req.body;
  try {
    const finance = await Finance.create({
      name,
      amount,
      date,
      category,
      description,
      type,
      status,
      tags,
      user,
    });
    res.status(200).json(finance);
  } catch (error) {
    console.log(error);
    res.status(400).json({ mssg: "error" });
  }
};

const deleteFinance = async (req, res) => {
  const { id } = req.params;
  try {
    await Finance.findOneAndDelete({_id: id});
    res.json({ message: "Finance deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateFinance = async (req, res) => {
  const { id } = req.params;
  const finance = req.body;
  try {
    const updatedFinance = await Finance.findByIdAndUpdate(id, finance, {
      new: true,
    });
    res.status(200).json(updatedFinance);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getFinances,
  getFinance,
  createFinance,
  deleteFinance,
  updateFinance,
};
