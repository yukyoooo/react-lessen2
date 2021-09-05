import React from "react";
import QiitaDetail from "./QiitaDetail";
import QiitaStocks from "./QiitaStocks";
import { Switch, Route } from "react-router-dom";

const QiitaLayout = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/Qiita" component={QiitaStocks} />
                <Route path="/Qiita/:post_id" component={QiitaDetail} />
            </Switch>
        </main>
    );
};

export default QiitaLayout;