import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import ActionsComponent from "../components/ActionsComponent/ActionsComponent";


const styles = theme => ({
    paperBoard: {
        color: "red"
    },
});

export class BoardPaperComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {chosenBoardLists} = this.props;
        return (
            <div className='lists-items'>
                {
                    chosenBoardLists && chosenBoardLists.map((item, id) => {
                        return (
                            <div key={id} className="board-list-item">
                                <p>{item.name}</p>
                                {
                                    chosenBoardLists.cards.map((cardItem, idx) => {
                                        return cardItem.idList === item.id &&
                                            <Typography className="board-list-task-item" key={idx}>{cardItem.name}</Typography>
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chosenBoardLists: state.rootReducer.chosenBoardLists
    }
};


BoardPaperComponent.propTypes = {
    options: PropTypes.array,
    cards: PropTypes.array
};

export default connect(mapStateToProps, null)(withStyles(styles)(BoardPaperComponent));
