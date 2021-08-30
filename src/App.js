import "./App.scss";
import React from "react";
import Header from "./Header.js";
import Timeline from "./Timeline";

// クラスコンポーネント
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="App">
          <Timeline />
        </main>
      </div>
    );
  }
}

export default App;
