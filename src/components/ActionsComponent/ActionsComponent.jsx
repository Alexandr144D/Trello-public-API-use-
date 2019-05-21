import React from 'react';
import {connect} from 'react-redux';
import AlignItemsList from '../../parts/List';

class ActionsComponent extends React.Component {
    render() {
        const { actionsList } = this.props;

        return (
            <React.Fragment>
                <AlignItemsList actions={actionsList} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        actionsList: state.rootReducer.actionsList,
    }
};

export default connect(mapStateToProps, null)(ActionsComponent);
