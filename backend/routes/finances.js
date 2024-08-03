const express = require('express');
const router = express.Router(); 
const { getFinances, getFinance, createFinance, deleteFinance, updateFinance } = require('../controller/finaceController.js');

//Get a single, get all, post, delete, put
router.get('/', getFinances);

router.get('/:id',getFinance);

router.post('/', createFinance);

router.delete('/:id', deleteFinance);

router.patch('/:id', updateFinance);


module.exports = router;