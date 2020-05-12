import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import Avatar from '../Components/Avatar'

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  componentClicked = () => console.log("clicked");

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            borderRadius: '10pt',
            width: "400px",
            margin: "auto",
            background: "darkorchid",
            color: "whitesmoke",
            padding: "20px",
            boxShadow:
              `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
              0 6.7px 5.3px rgba(0, 0, 0, 0.048),
              0 12.5px 10px rgba(0, 0, 0, 0.06),
              0 22.3px 17.9px rgba(0, 0, 0, 0.072),
              0 41.8px 33.4px rgba(0, 0, 0, 0.086),
              0 100px 80px rgba(0, 0, 0, 0.12)`
          }}
        >
          <h2>Welcome, {this.state.name}!</h2>
          <span 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
              }}
            >
              <Avatar 
                image={this.state.picture} 
                alt={this.state.name} 
              />
              <p> Email: {this.state.email}</p>
          </span>
          <button onClick={() => this.setState({ isLoggedIn: false })}>Log Out</button>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId={process.env.REACT_APP_APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}