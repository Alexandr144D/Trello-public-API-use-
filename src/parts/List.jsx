import React from 'react';
import PropTypes from 'prop-types';

function AlignItemsList(props) {
    const {actions} = props;

    return (
        <React.Fragment>
            <ul className='actions-list'>
                <li><p>Actions history</p></li>
                {
                    actions && actions.map((item, id) => {
                        return (
                            <li key={id} className='actions-item'>
                                {item.data.list &&
                                <div className='actions'><p>List Name</p><p>{item.data.list && item.data.list.name}</p>
                                </div>}
                                <div className='actions'><p>Created</p><p>{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                {item.data.old &&
                                <div className='actions'><p>Old Name</p><p>{item.data.old && item.data.old.name}</p>
                                </div>}
                                {item.data.card &&
                                <div className='actions'><p>Card Name</p><p>{item.data.card && item.data.card.name}</p>
                                </div>}
                            </li>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    );
}

AlignItemsList.propTypes = {
    actions: PropTypes.array,
};

export default AlignItemsList;
