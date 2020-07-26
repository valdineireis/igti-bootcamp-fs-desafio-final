import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalFormTransaction({
    title,
    isOpen,
    selectedTransaction,
    onSaveTransaction,
    onCloseModal,
}) {
    const [transaction, setTransaction] = useState(selectedTransaction);

    const handleCloseModal = () => {
        onCloseModal();
    };

    const handleSaveTransaction = () => {
        onSaveTransaction(transaction);
    };

    const handleFormChange = (event) => {
        const { id, value } = event.target;
        setTransaction({ ...transaction, [id]: value });
    };

    const handleFormChangeRadio = (event) => {
        setTransaction({ ...transaction, type: event.target.value });
    };

    function isLabelActive(text) {
        return text ? 'active' : '';
    }

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Controle Financeiro Pessoal"
            style={styles.customModalStyle}
        >
            <div className="modal-header">
                <div className="row">
                    <div
                        className="col s10"
                        style={{ fontSize: '20px', fontWeight: 'bold' }}
                    >
                        {title}
                    </div>
                    <div className="col s2 right-align">
                        <a
                            className="waves-effect waves-light btn-small btn-floating red btn-flat"
                            onClick={handleCloseModal}
                            title="Fechar"
                        >
                            <i className="material-icons">clear</i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <label className="input-field col s6 center-align">
                            <input
                                className="with-gap"
                                name="type"
                                type="radio"
                                value="-"
                                onChange={handleFormChangeRadio}
                                checked={transaction.type === '-'}
                                disabled={transaction.id !== '0'}
                            />
                            <span>Despesa</span>
                        </label>
                        <label className="input-field col s6 center-align">
                            <input
                                className="with-gap"
                                name="type"
                                type="radio"
                                value="+"
                                onChange={handleFormChangeRadio}
                                checked={transaction.type === '+'}
                                disabled={transaction.id !== '0'}
                            />
                            <span>Receita</span>
                        </label>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="description"
                                type="text"
                                required
                                value={transaction.description}
                                onChange={handleFormChange}
                                autoFocus
                            />
                            <label
                                htmlFor="description"
                                className={isLabelActive(
                                    transaction.description
                                )}
                            >
                                Descrição
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="category"
                                type="text"
                                required
                                value={transaction.category}
                                onChange={handleFormChange}
                            />
                            <label
                                htmlFor="category"
                                className={isLabelActive(transaction.category)}
                            >
                                Categoria
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="value"
                                type="text"
                                required
                                value={transaction.value}
                                onChange={handleFormChange}
                            />
                            <label
                                htmlFor="value"
                                className={isLabelActive(transaction.value)}
                            >
                                Valor
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="yearMonthDay"
                                type="date"
                                required
                                value={transaction.yearMonthDay}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <a
                        className="waves-effect waves-light btn"
                        onClick={handleSaveTransaction}
                    >
                        SALVAR
                    </a>
                </form>
            </div>
        </Modal>
    );
}

const styles = {
    customModalStyle: {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
        },
    },
};
