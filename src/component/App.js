import "../App.scss";
import React from "react";
import Header from "./Header.js";
import Timeline from "./Timeline";
import ProfileModal from "./ProfileModal";
import 'rodal/lib/rodal.css';
// クラスコンポーネント
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="App">
          <Timeline />
        </main>
        <ProfileModal />
      </div>
    );
  }
}

export default App;
