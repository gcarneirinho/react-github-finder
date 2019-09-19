import React, {Fragment} from 'react';
import spinner from '../layout/spinner.gif';

const Spinner = () => <Fragment>
            <img alt="Loading..." src={spinner} style={{width: '200px', margin: 'auto', display: 'block'}} />            
        </Fragment>

export default Spinner

