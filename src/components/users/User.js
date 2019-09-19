import React, { Component } from "react";

export class User extends Component {
  componentDidMount() {
    // Get the login passed by props
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    //console.log(this.props.getUser);
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading } = this.props;
    return <div>User: {name}</div>;
  }
}

export default User;
