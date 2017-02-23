import React from 'react';
import Header from '../static/Header';
import Footer from '../static/Footer';

class App extends React.Component {
  render() {
    return (
    <div>
      <Header />
      {this.props.children}
      <Footer />
    </div>
    )
  }
};

export default App;