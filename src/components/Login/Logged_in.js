import React from 'react';
import {Link} from 'react-router-dom';

const Logged_in = () => {
  return (
    <div>
        <p>Logged_in Successfully</p>
        <Link to="/">Go to home</Link>
    </div>

  )
}

export default Logged_in