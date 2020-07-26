import React from 'react';
import Action from './Action';
import formatNumber from '../helpers/formats';

export default function TableTransactions({
    transactions,
    onOpenModal,
    onRemove,
}) {
    const handleOpenModal = (transactionId) => {
        onOpenModal(transactionId);
    };

    const handleRemoveTransaction = (transactionId) => {
        onRemove(transactionId);
    };

    const { debitStyle, creditStyle } = styles;

    return (
        <div>
            {transactions.length === 0 ? (
                <div className="row">
                    <p>Nenhuma transação encontrada</p>
                </div>
            ) : (
                <div>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th className="center-align">Dia</th>
                                <th className="center-align">Categoria</th>
                                <th>Descrição</th>
                                <th className="right-align">Valor</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(
                                ({
                                    id,
                                    category,
                                    day,
                                    description,
                                    type,
                                    value,
                                }) => {
                                    const style =
                                        type === '+' ? creditStyle : debitStyle;

                                    return (
                                        <tr key={id} style={style}>
                                            <td className="center-align">
                                                {day}
                                            </td>
                                            <td className="center-align">
                                                {category}
                                            </td>
                                            <td>{description}</td>
                                            <td className="right-align">
                                                {formatNumber(value)}
                                            </td>
                                            <td className="right-align">
                                                <Action
                                                    id={id}
                                                    type="edit"
                                                    onActionClick={
                                                        handleOpenModal
                                                    }
                                                />
                                                &nbsp;
                                                <Action
                                                    id={id}
                                                    type="delete"
                                                    onActionClick={
                                                        handleRemoveTransaction
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const styles = {
    debitStyle: {
        color: '#f57467',
        fontFamily: 'Consolas',
    },
    creditStyle: {
        color: '#27ae60',
        fontFamily: 'Consolas',
    },
};
