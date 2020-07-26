import React from 'react';

export default function Action({ id, type, onActionClick }) {
    const handleAction = () => {
        onActionClick(id);
    };

    const typeDescription = type === 'edit' ? 'Editar' : 'Remover';

    return (
        <a href="#" title={typeDescription} onClick={handleAction}>
            <i className="material-icons">{type}</i>
        </a>
    );
}
