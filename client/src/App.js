import React, { useState } from 'react';
import { PERIODS, formatPeriod } from './helpers/periods';
import formatNumber from './helpers/formats';
import {
    serviceGetTransactions,
    serviceRemoveTransaction,
    serviceUpdateTransaction,
    serviceInsertTransaction,
} from './services/transactionService';

import Statistic from './components/Statistic';
import TableTransactions from './components/TableTransactions';
import ModalFormTransaction from './components/ModalFormTransaction';

import M from 'materialize-css';

export default function App() {
    const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const [selectedTransaction, setSelectedTransaction] = useState({});

    const [modalIsOpen, setIsOpen] = useState(false);
    const [statistics, setStatistics] = useState({
        lancamentos: formatNumber(0),
        receitas: formatNumber(0),
        despesas: formatNumber(0),
        saldo: formatNumber(0),
    });

    React.useEffect(() => {
        fetchTransactions();
    }, [currentPeriod]);

    React.useEffect(() => {
        M.AutoInit();
    }, []);

    const fetchTransactions = async () => {
        const json = await serviceGetTransactions(currentPeriod);
        json.sort((a, b) => {
            return a.day - b.day;
        });
        setTransactions(json);
        setFilteredTransactions(json);
        setStatistics(genareteStatistics(json));
    };

    function openModal(transactionId) {
        setIsOpen(true);
        const transaction = transactions.find(
            (transaction) => transaction.id === transactionId
        );
        setSelectedTransaction(transaction);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function genareteStatistics(transactions) {
        let totalReceitas = 0;
        let totalDespesas = 0;

        for (const transaction of transactions) {
            if (transaction.type === '-') totalDespesas += transaction.value;
            if (transaction.type === '+') totalReceitas += transaction.value;
        }

        return {
            lancamentos: transactions.length,
            receitas: formatNumber(totalReceitas),
            despesas: formatNumber(totalDespesas),
            saldo: formatNumber(totalReceitas - totalDespesas),
        };
    }

    const newTransaction = () => {
        const hoje = new Date();
        const day = hoje.getDate();
        const month = currentPeriod.slice(5, 7);
        const year = currentPeriod.slice(0, 4);

        setSelectedTransaction({
            id: '0',
            category: '',
            description: '',
            type: '-',
            value: '',
            day,
            month,
            year,
            yearMonthDay: `${year}-${month
                .toString()
                .padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        });
        setIsOpen(true);
    };

    const saveTransaction = async (transactionModel) => {
        let {
            id,
            description,
            value,
            category,
            type,
            yearMonthDay,
        } = transactionModel;

        const year = yearMonthDay.slice(0, 4);
        const month = yearMonthDay.slice(5, 7);
        const day = yearMonthDay.slice(8, 10);

        const formData = {
            id,
            category,
            description,
            type,
            value: parseFloat(value),
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
        };

        if (id !== '0') {
            const res = await serviceUpdateTransaction(formData);
            console.log(res.data.message);
        } else {
            const res = await serviceInsertTransaction(formData);
            console.log(res.data.message);
        }

        fetchTransactions();
        closeModal();
    };

    const removeTransaction = async (transactionId) => {
        const res = await serviceRemoveTransaction(transactionId);
        fetchTransactions();
        console.log(res.data.message);
    };

    const handlePeriodChange = (event) => {
        setCurrentPeriod(event.target.value);
    };

    const searchTransaction = (event) => {
        const filtered = transactions.filter((transaction) => {
            return transaction.description.includes(event.target.value);
        });
        setFilteredTransactions(filtered);
    };

    return (
        <div className="container">
            <h1 className="center">Bootcamp Full Stack - Desafio Final</h1>
            <h2 className="center">Controle Financeiro Pessoal</h2>
            <div className="row">
                <div className="col s5"></div>
                <div className="col s2">
                    <select
                        className="browser-default"
                        value={currentPeriod}
                        onChange={handlePeriodChange}
                    >
                        {PERIODS.map((period) => {
                            return (
                                <option key={period} value={period}>
                                    {formatPeriod(period)}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col s5"></div>
            </div>

            <Statistic statistics={statistics} />

            <div className="row">
                <div className="col s3" style={{ lineHeight: 5 }}>
                    <a
                        className="waves-effect waves-light btn"
                        onClick={newTransaction}
                    >
                        Novo Lançamento
                    </a>
                </div>
                <div className="input-field col s9">
                    <input
                        id="filtro"
                        type="text"
                        onKeyUp={searchTransaction}
                    />
                    <label htmlFor="filtro">Filtro</label>
                </div>
            </div>

            <TableTransactions
                transactions={filteredTransactions}
                onOpenModal={openModal}
                onRemove={removeTransaction}
            />

            {modalIsOpen && (
                <ModalFormTransaction
                    title="Editar Lançamento Financeiro"
                    isOpen={modalIsOpen}
                    selectedTransaction={selectedTransaction}
                    onSaveTransaction={saveTransaction}
                    onCloseModal={closeModal}
                />
            )}
        </div>
    );
}
