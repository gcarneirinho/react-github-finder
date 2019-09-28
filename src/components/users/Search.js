import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({clearUsers, showClear, setAlert, busca, }) => {
    const [text, setText] = useState('');

    const onTextChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(text === ''){
            setAlert('Please enter something', 'light');
        } else {
            busca(text);
            setText('');
        }
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="Search..." value={text} onChange={onTextChange} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
    {showClear && <button className="btn btn-light btn-block text-center" onClick={clearUsers}>Clear</button> }
        </div>
    )

}

Search.propTypes = {
    busca: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search
