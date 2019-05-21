import './styles.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import React, {Component} from 'react';
import ControlledOpenSelect from '../../parts/select';
import BoardPaperComponent from '../../parts/BoardPaperComponent';
import ActionsComponent from "../ActionsComponent/ActionsComponent";
import {getBoardLists, getBoardActions} from '../../reducer/actions';
import {withRouter} from 'react-router-dom';
import CircularProgress from "../LoginCompoent/LoginComponent";


const ROUTE = {
    boards: '/dashboard/boards',
    actions: '/dashboard/boards/actions'
};

class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenBoard: {}
        }
    }

    updateData = (value) => {
        const pathName = this.props.history.location.pathname;

        if (pathName === '/dashboard/boards') {
            this.props.getBoardListDispatch(value.id);
        } else if (pathName === '/dashboard/actions') {
            this.props.getBoardActionsDispatch(value.id);
        }
        this.setState({chosenBoard: value})
    };

    render() {
        const {allBoards, isAuthorizied} = this.props;

        return (
            <div className='dashboard-class'>
                {
                    isAuthorizied &&
                    <div className="info-line">
                        <ControlledOpenSelect options={allBoards} updateData={this.updateData}/>
                    </div>
                }
                <Route path='/dashboard/boards' component={BoardPaperComponent}/>
                <Route path='/dashboard/actions' component={ActionsComponent}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.rootReducer.userInfo,
        allBoards: state.rootReducer.allBoards,
        isAuthorizied: state.rootReducer.isAuthorizied,
        chosenBoardLists: state.rootReducer.chosenBoardLists
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getBoardListDispatch: (id) => {
            dispatch(getBoardLists(id))
        },
        getBoardActionsDispatch: (id) => {
            dispatch(getBoardActions(id))
        }
    }
};

DashboardComponent.propTypes = {
    updateData: PropTypes.func,
    userInfo: PropTypes.object,
    allBoards: PropTypes.array,
    isAuthorizied: PropTypes.bool,
    getBoardActions: PropTypes.func,
    chosenBoardLists: PropTypes.array,
    getBoardListDispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));
