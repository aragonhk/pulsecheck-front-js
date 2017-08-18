import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return(
            <div className="jumbotron">
                <h1>Pulsecheck </h1>
                <h4>React, Redux and React Router v4</h4>
                <Link to="/about" className="btn btn-primary btn-sm"> Learn More</Link>
            </div>
        );
    }
}

export default HomePage;