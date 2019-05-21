import './styles.css';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Logger from '../../services/logger';
import {withRouter} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import {logoutAction} from '../../reducer/actions'
import HomeIcon from '../../assets/images/home-icon'
import LogInIcon from '../../assets/images/login-icon'
import BoardsIcon from '../../assets/images/boards-icon'
import ActionsIcon from '../../assets/images/list-alt-solid';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {authorized: false};

        this.loggerService = new Logger();

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.actionsLink = this.actionsLink.bind(this);
        this.homePageLink = this.homePageLink.bind(this);
        this.dashboardLink = this.dashboardLink.bind(this);
    }

    login() {
        this.loggerService.logger('LOGGED IN');
        this.props.history.push('/login')
    }

    logout() {
        this.loggerService.logger('LOGGED OUT');
        this.props.history.push('/');
        this.props.onLogOutDispatch()
    };

    actionsLink() {
        this.loggerService.logger('LOGGED OUT');
        this.props.history.push('/dashboard/actions');
    };

    dashboardLink() {
        this.props.history.push('/dashboard/boards');
    }

    homePageLink() {
        this.props.history.push('/')
    }

    render() {
        const {isAuthorizied, userInfo} = this.props;
        return (
            <div className="header-wrapper">
                {
                    isAuthorizied ? (
                            <React.Fragment>
                                <div className="icons-wrapper">
                                    <Tooltip title="Home">
                                        <div onClick={this.homePageLink} className='home-icon'>
                                            <HomeIcon />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Boards">
                                        <div onClick={this.dashboardLink} className="board-icon">
                                            <BoardsIcon/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Actions">
                                    <div onClick={this.actionsLink} className="actions-logo">
                                        <ActionsIcon/>
                                    </div>
                                </Tooltip>
                                </div>
                                <Tooltip title="Trello">
                                    <div className="trello-logo">
                                        <BoardsIcon/>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Log Out">
                                    <div onClick={this.logout} className="user-profile">
                                        <span className='user-id-initial'>{userInfo.initials}</span>
                                    </div>
                                </Tooltip>

                            </React.Fragment>
                        ) :
                        <Tooltip title="log In">
                            <div
                                onClick={this.login}
                                className='login-icon'>
                                <LogInIcon/>
                            </div>
                        </Tooltip>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.rootReducer.userInfo,
        isAuthorizied: state.rootReducer.isAuthorizied,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOutDispatch: () => {dispatch(logoutAction())}
    }
};


HeaderComponent.propTypes = {
    login: PropTypes.func,
    userInfo: PropTypes.object,
    homePageLink: PropTypes.func,
    isAuthorizied: PropTypes.bool,
    logoutAction: PropTypes.func,
    onLogOutDispatch: PropTypes.func,
    switchToDashboard: PropTypes.func,
    loggerService: PropTypes.instanceOf(Logger),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
