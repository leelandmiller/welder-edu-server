import React from 'react';
import Button from '@material-ui/core/Button';

const FourOhFour = props => {
  return (
    <div className="four-oh-four-wrapper">
      <h1>404</h1>
      <div className="info">
        Oops.<br/>The page you were looking for doesn't seem to exist
      </div>
      <Button variant="outlined" color="primary"
        className="back-to-home"
        onClick={() => props.history.push('/')}>
        Home
      </Button>
    </div>
  );
}

export default FourOhFour;
