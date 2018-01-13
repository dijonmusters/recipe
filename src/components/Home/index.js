import React from 'react';
import './style.css';

class Home extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/api/users')
    .then(response => response.json())
    .then(response => {
      console.log(response)
      this.setState({ response })
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <h1>Welcome to the home page</h1>
    );
  }
}

export default Home;