import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
    state = {
        text: "",
    }

    static propTypes = {
        busca: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    }

    onTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.busca(this.state.text);
        this.setState({text: ""});
    }

    render() {

        const {clearUsers, showClear} = this.props;
        return (
            <Fragment>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search..." value={this.state.text} onChange={this.onTextChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
        {showClear && <button className="btn btn-light btn-block text-center" onClick={clearUsers}>Clear</button> }
            </Fragment>
        )
    }
}

export default Search
