import './App.css';
import React from 'react';
import Item from './Item.js';
import Header from './Header.js';
import PostForm from './PostForm';

// クラスコンポーネント
class App extends React.Component {
  state = { 
    date: new Date(),
    aa:10,
    timeId: -1,
    // ts: Date, message: string
    items:[],
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
  

  handleSubmit = (newItem) => {
    const {items} = this.state;
    const newItems = [newItem, ...items];
    this.setState({ items: newItems});
  }

  handleDelete = (item) => {
    const newItem = this.state.items.filter( o => {
      return item.ts !== o.ts;
    })
    this.setState({ items: newItem });
  }

  render(){
    return (
      <div className="App">
        <Header />
        <PostForm onSubmit={this.handleSubmit}/>
        <div>
          {this.state.date.toLocaleString()}
          {this.state.items.map( (item, index) => {
            return (
            <Item 
              key={index} 
              item={item}
              onDelete={this.handleDelete}
            />
            )
          })}
          
        </div>
    </div>
    )
  }
}

export default App;
