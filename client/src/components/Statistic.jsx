import React from 'react';

export default function Statistic({ statistics }) {
    return (
        <div
            className="row"
            style={{
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: '5px',
            }}
        >
            <div className="col s3 center-align">
                <strong>Lançamentos:</strong> {statistics.lancamentos}
            </div>
            <div className="col s3 center-align">
                <strong>
                    Receitas:{' '}
                    <span className="green-text">{statistics.receitas}</span>
                </strong>
            </div>
            <div className="col s3 center-align">
                <strong>
                    Despesas:{' '}
                    <span className="red-text">{statistics.despesas}</span>
                </strong>
            </div>
            <div className="col s3 center-align">
                <strong>
                    Saldo:{' '}
                    <span className="green-text">{statistics.saldo}</span>
                </strong>
            </div>
        </div>
    );
}
