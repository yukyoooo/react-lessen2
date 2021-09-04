import "../App.scss";
import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from "./Header.js";
import Home from "./Home";
import QiitaLayout from "./QiitaLayout";
import ProfileModal from "./ProfileModal";
import 'rodal/lib/rodal.css';
// クラスコンポーネント
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Qiita" component={QiitaLayout} />
          </Switch>
          <ProfileModal />
        </div>
      </Router>
    );
  }
}

export default App;
