import './styles.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Logger from "../../services/logger";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {loginAction} from '../../reducer/actions';
import {userKeyAction} from '../../reducer/actions';
import {withStyles} from '@material-ui/core/styles';
import {userTokenAction} from '../../reducer/actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    button: {
        marginTop: 40,
        width: 200
    },
    input: {
        width: "90%",
        marginTop: 50
    },
});

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {isEmptyKey: false, isEmptyToken: false};

        this.loggerService = new Logger();
        this.onChangeKey = this.onChangeKey.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);
        this.formFieldsValidation = this.formFieldsValidation.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        return nextProps.state.isAuthorizied ? this.props.history.push('/dashboard/boards') : null;
    }

    formFieldsValidation() {
        this.props.state.key === '' ? this.setState({isEmptyKey: true}) : this.setState({isEmptyKey: false});
        this.props.state.token === '' ? this.setState({isEmptyToken: true}) : this.setState({isEmptyToken: false});
    }

    onChangeKey(e) {
        this.props.onChangeKeyDispatch(e.target.value);
    }

    onChangeToken(e) {
        this.props.onChangeTokenDispatch(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {key, token} = this.props.state;
        this.formFieldsValidation();

        if (!key || !token) {
            return
        }

        this.props.onSubmitFormDispatch(key, token);
    }

    render() {
        const {isEmptyKey, isEmptyToken} = this.state;
        const {key, token, isFetching} = this.props.state;
        const {classes} = this.props;

        return (
            <React.Fragment>
                <form
                    className='form-login'
                    onSubmit={this.handleSubmit}
                >
                    <h1 className='login-text-logo'>Trello</h1>
                    <Input
                        error={isEmptyKey}
                        onChange={this.onChangeKey}
                        value={key}
                        placeholder="KEY"
                        className={classes.input}
                        autoFocus={true}
                    />
                    <Input
                        error={isEmptyToken}
                        onChange={this.onChangeToken}
                        value={token}
                        placeholder="TOKEN"
                        className={classes.input}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isFetching}
                        className={classes.button}
                        onClick={this.handleSubmit}
                    > Submit</Button>
                    {isFetching && <CircularProgress disableShrink className='login-loader'/>}
                </form>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        state: state.rootReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeKeyDispatch: (key) => {
            dispatch(userKeyAction(key))
        },
        onChangeTokenDispatch: (token) => {
            dispatch(userTokenAction(token))
        },
        onSubmitFormDispatch: (key, token) => {
            dispatch(loginAction(key, token))
        }
    }
};

LoginComponent.propTypes = {
    key: PropTypes.string,
    token: PropTypes.string,
    classes: PropTypes.object,
    isEmptyKey: PropTypes.bool,
    isEmptyToken: PropTypes.bool,
    isFetching: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginComponent));
