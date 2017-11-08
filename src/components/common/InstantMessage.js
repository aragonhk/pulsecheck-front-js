import React from 'react';
import PropTypes from 'prop-types';

class InstantMessage extends React.Component {
    constructor(props){
        super(props);
        this.closeMessage = this.closeMessage.bind(this);
    }

    closeMessage() {
        this.props.deleteMessage(this.props.message.id);
    }

    render() {
        const {id, type, text} = this.props.message;
        return (
            <div className="alert"> 
                {text}
                <button onClick={this.closeMessage} className="close"><span>&times;</span></button>
            </div>
        );
    }
}

InstantMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteMessage: PropTypes.func.isRequired
};

export default InstantMessage;