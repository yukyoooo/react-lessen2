import './App.css';
import React from 'react';
import { render } from 'react-dom/cjs/react-dom.development';
import Item from './Item.js';
import Header from './Header.js';
import PostForm from './PostForm';

// クラスコンポーネント
class App extends React.Component {
  state = { 
    date: new Date(),
    aa:10,
    timeId: -1,
  };

  //componentを呼び出した直後に呼び出す処理
  componentDidMount() {
    const timeId = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
    this.setState({
      timeId: timeId,
    });
  }

  //componentを除する直前に呼び出す処理
  componentWillUnmount(){
    clearInterval(this.state.timeId);
  }
  



  render(){
    return (
      <div className="App">
        <Header />
        <PostForm />
        <div>
          {this.state.date.toString()}
          <Item />
        </div>
    </div>
    )
  }
}

export default App;
