const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
    const period = req.query.period;

    try {
        //condicao para o filtro no findAll
        if (!period) throw new Error('Condição "period" não informada.');
        let condition = {
            yearMonth: { $regex: new RegExp(period), $options: 'i' },
        };

        const data = await TransactionModel.find(condition);

        if (data.length < 1) {
            res.status(404).send({ message: 'Nenhuma Transaction encontrada' });
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Erro ao listar as transactions',
        });
    }
};

const create = async (req, res) => {
    try {
        const newTransaction = new TransactionModel(
            createObjectTransaction(req)
        );

        await TransactionModel.create(newTransaction);

        res.send({ message: 'Transaction inserida com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Algum erro ocorreu ao salvar',
        });
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await TransactionModel.findById({ _id: id });

        if (data.length < 1) {
            res.status(404).send({
                message: 'Nenhuma Transaction encontrada com o id:' + id,
            });
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao buscar a Transaction id: ' + id,
        });
    }
};

const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Dados para atualizacao vazio',
        });
    }

    const id = req.params.id;

    const transactionAtualizada = createObjectTransaction(req);

    try {
        const data = await TransactionModel.findByIdAndUpdate(
            { _id: id },
            transactionAtualizada,
            {
                new: true,
            }
        );

        if (data.length < 1) {
            res.status(404).send({
                message: 'Nenhuma Transaction encontrada para atualizar',
            });
        } else {
            res.send({ data, message: 'Transaction atualizada com sucesso' });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao atualizar a Transaction id: ' + id,
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await TransactionModel.findByIdAndDelete({ _id: id });

        if (data.length < 1) {
            res.status(404).send({
                message: 'Nenhuma Transaction encontrada para exclusao',
            });
        } else {
            res.send({ message: 'Transaction excluida com sucesso' });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Nao foi possivel deletar a Transaction id: ' + id,
        });
    }
};

function createObjectTransaction(req) {
    const now = new Date(req.body.year, req.body.month - 1, req.body.day);
    return {
        description: req.body.description,
        value: req.body.value,
        category: req.body.category,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        yearMonth: now.getFullYear() + '-' + addZeroLeft(now.getMonth() + 1),
        yearMonthDay:
            now.getFullYear() +
            '-' +
            addZeroLeft(now.getMonth() + 1) +
            '-' +
            addZeroLeft(now.getDate()),
        type: req.body.type,
    };
}

function addZeroLeft(number) {
    //return number < 10 ? '0' + number : number;
    return number.toString().padStart(2, '0');
}

module.exports = { findAll, create, findOne, update, remove };
