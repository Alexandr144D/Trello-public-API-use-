import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    select: {
        width: 220,
        background: "hsla(0, 0%, 100%, .3)",
    },
    label: {
        color: "#fff"
    },
    option: {
        color: '#fff'
    }
});

class ControlledOpenSelect extends React.Component {
    state = {
        board: '',
        open: false,
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.props.updateData(event.target.value)
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        const {classes, options} = this.props;

        return (
            <form autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.label} htmlFor="demo-controlled-open-select">Board</InputLabel>
                    <Select
                        className={classes.select}
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.board}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'board',
                            id: 'demo-controlled-open-select',
                        }}
                    >
                        <MenuItem value="" >
                            <em>None</em>
                        </MenuItem>
                        {
                            options.map((item, id) => {
                                return <MenuItem key={id} value={item}>{item.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </form>
        )
            ;
    }
}

ControlledOpenSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
