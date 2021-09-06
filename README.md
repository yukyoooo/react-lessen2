# hws_react講義メモ

## 資料
[react講座PDF](index.pdf)
[javascript復習](第3回講義_ModernJS.md)

## [react講義_1](https://web.microsoftstream.com/video/db8e2205-b778-46fb-b72c-d230cc28db16)
- コンポーネントとは
    - 画面パーツのクラス。クラスはファンクションを束ねるもの
    - クラスコンポーネント
        - stateとしてデータ保持可能。ライフサイクルも可能。
        - stateの更新で画面描写をしなおす
    - ファンクションコンポーネント
        - 画面描画のためのパース

## [react講義_2](https://web.microsoftstream.com/video/6d56d10e-87a1-4381-8429-c26e872402b3)
- [javascriptのeventについて](https://www.javadrive.jp/javascript/event/index8.html)
### コンポーネント作成、コンポーネント読込について学習
- state
    - コンポーネントに変数を持たせる
- componentDidMount()
    - コンポーネントを呼び出した直後に呼び出す処理を記述
- componentWillUnmount()
    - コンポーネントを削除する直前に呼び出す処理を記述
- setState()
    - 処理の中でstateの値を変更する際に使う関数
- setInterval()
    - 一定間隔ごとに処理を実行する際に使う関数
- clearInterval()
    - 一定間隔ごとに実行する処理を解除するメソッド
- 流れ
    1. stateに変数を定義する
    2. componentDidMount()関数を設置し、その中にitmeIdという変数にsetIntervalで1秒毎にsetStateでdateの値にnew Date()を代入する処理を加える。その後setStateでtimeIdの変更を反映させる。
    3. componentWillUnmount()関数を設置し、clearIntervalで毎秒実行しているtimeIdを解除する
```js
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
```
- map()
    - 配列の中身を１つずつ取り出す関数
    - `a = [1,2,3].map(e => e * e);`
    - mapメソッドで表示する際にkeyをいれてくださいという警告が表示される
    ```js
        {this.state.items.map( (item, index) => {
            return <Item key={index} item={item}/>
        })}
    ```
```js
state = {ids:[1,2,3]}

{this.state.ids.map(id => {
return <div>{id}</div>;
})}
```
- 別ファイルから関数を読み込む方法
    - 読み込ませるファイル
        - export defaultをclassの前に記述する
        `export default class Item extends React.Component`
    - ファイルを呼び出すファイル
        - importでファイルを呼び込む
        `import Item from './Item.js';`
        - 表示させたい箇所にファイル名<Item />を表示
        ```js
        <a>
          <Item />
        </a>
        ```
    - default以外のクラスをimportする方法
        - defaultクラスの下に下記クラスを記入
        ```js
        export class Hoge()
        export class Fuga()
        ```
        - ファイルを呼び出すファイルのimportを下記のように記述
        `import Item, { Hoge, Fuga } from './Item.js';`
- js:onChange
    - 変更が加えられた際に実行する関数
    - onChange = { e => ()}のように記述する
    ```js
        handleEdit = e => (
        this.setState({
            text: e.target.value,
        })
    )

    render() {
        return ( 
            <div>
                <textarea onChange={this.handleEdit} value={this.state.text} />
                <button type="button">投稿</button>
            </div>
        )
    }
    ```



## [react講義_3](https://web.microsoftstream.com/video/54f46db2-a36b-46f1-9e92-ba53513f9e31)
- [reactライフサイクル図](https://qiita.com/kawachi/items/092bfc281f88e3a6e456)
### コンポーネント同士のデータの受け渡しについて学習
- setState関数を使ってstateを更新しないとライフサイクルのなかで更新がかからずrender()メソッドが呼ばれない。
- [1, ...[2,3,4]]の...を加えることで配列に付け加えることが可能
- filter関数
    - 配列の中で条件にあてはまる値を取得する
    ```js
        const newItem = this.state.items.filter( o => {
      return item.ts !== o.ts;
    })
    ```
- propsを子ぽーねんとで使うことで親コンポーネントから値を引き継ぐ。
    - [stateとprops](https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504)





## [react講義_4](https://web.microsoftstream.com/video/51c5744f-2226-48c1-8875-ce7c18f482b3)
### reduxの使い方、bootstrapとscssの導入について学習
- reduxの準備(index.js)
    - reduxのインストール
    `npm i -D react-redux react-scripts redux`
    - index.jsにreduxで使うライブラリをimportする
    ```js
    import { createStore } from 'redux';
    import { Provider } from 'react-redux';
    ```
    - グローバルに参照したいstateを作成する
    ```js
    const initialState = {user_name: 'ぽけぽけ'};
    const reducer = (state, action) => {
    return state;
    };
    const store = createStore(reducer, initialState);
    ```
    - Provideで囲む
    ```js
    ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
    ), document.getElementById('root'));
    ```
- headerにユーザ名を表示させる方法
    - connect関数をimportする
    `import { connect } from 'react-redux';`
    - Header関数にpropsの引数を与える
    ```js
    function Header(props){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>{props.user_name}</div>
            </header>
        );
    }
    ```
    - stateを取得する変数を追記し、connect関数でHeaderとstateを繋げる
    ```js
    const mapStateToProps = state =>{
        return {
            user_name: state.user_name,
        }
    };

    export default connect(mapStateToProps)(Header);
    ```
- bootstrap,scssのインストール
```
npm i bootstrap
npm i -D node-sass
```
- bootstrapの読込index.jsに下記を追記
`import 'bootstrap/dist/css/bootstrap.min.css';`



## [react講義_5](https://web.microsoftstream.com/video/664d2d92-1dc1-4498-a56f-294ad962e318)
### reduxを使って更新と削除をする方法について学習
- reduxとはデータを一元管理するためのライブラリ、propsのバケツリレーを省くことが出来るようになる。
- storeのstateを更新するにはreducerに処理を追加する必要がある。
```js
// { type: 'ADD_TWEET', payload: tweet}
const reducer = (state, action) => {
  switch (action.type ){
    case 'ADD_TWEET':
      return {
        ...state,
        tweets: [ action.payload, ...state.tweets],
      };
    case 'DELETE_TWEET':
      return state;
    default:
      return state;
  };
};
```
- reducerを走らせる箇所(timeline.js)ではdispatch関数を使う
```js
handleSubmit = (newTweet) => {
this.props.dispatch({ type: 'ADD_TWEET', payload: newTweet });
};
```
- 削除もreducerに追記する
```js
case 'DELETE_TWEET':
    return {
    ...state,
    tweets: state.tweets.filter(o => {
        return action.payload.ts !== o.ts;
})
};
```
### localstoreにtweetを保存する方法について学習
- localStorage.setItem(string, string)
    - localにデータを保存するstring形式しか保存できないため、第二引数にはJSON.stringify()関数を使うことでobjを文字列に変換する。
    ```js
    function saveTweets(tweets){
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
    ```
- localStorage.getItem(string)
    - localに保存されたデータを読み込む。objを文字列に変換していたり、日付などを保存していた場合は従来のデータ型に戻す必要がある。JSON.parse(),new Date()。上記関数をinitialStateで呼び出すようにする
    ```js
    function loadTweets() {
        try{
            const tweets = JSON.parse(localStorage.getItem('tweets') || '[]');
            for (const tweet of tweets){
            tweet.ts = new Date(tweet.ts);
            }
            return tweets;
        } catch {
            return {};
        }
    }
    ```
- componentDidUpdate()
    - コンポーネントがもつpropsの値のどれかが更新された時に呼び出される関数
    ```js
    componentDidUpdate(){
        saveTweets(this.props.tweets);
    }
    ```


## [react講義_6](https://web.microsoftstream.com/video/00ffaa25-3275-4bf2-99ec-b76d42d0c672)
### reduxのdevツールの使い方
- reduxDevTools導入方法
    - compose()をimportする
    `import { compose, createStore } from 'redux';`
    - createStore()に下記を追加する
    `compose(process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f)`
### reduxのreducerの機能をactions.jsにまとめて管理する
- [connect関数とは](https://zenn.dev/tk4/articles/820b0baeb41ee3fdaddf)
    -mapStateToProps(connectの第一引数)
        -stateを取得するための関数。connect関数の第一引数に渡す。
    - mapDispatchToProps(connectの第二引数)
        - stateを書き換えるための関数。
        - connect関数の第二引数に渡す。
- action.jsにreducer関連をまとめて管理する
    - 格納しない内容のタイプとクリエイターを作成する
    ```js:action.js
    // Action Types
    export const ADD_TWEET = 'ADD_TWEET';
    export const DELETE_TWEET = 'DELETE_TWEET';

    // Action Creators
    export const addTweet = (newTweet) => {
    return { type: ADD_TWEET, payload: newTweet };
    }
    export const deleteTweet = (tweet) => {
    return { type: DELETE_TWEET, payload: tweet };
    }
    ```
    - actions.jsに格納した内容を呼び出したい箇所に下記のように追記する
    ```js
    const mapState = state => {
        return {
            tweets: state.tweets,
        }
        };
        const mapDispatch = (dispatch) => {
        return {
            deleteTweet: (tweet) =>{
            dispatch(deleteTweet(tweet));
            },
        }
    }
    ```
    - {this.props.deleteTweet}を該当する箇所に明記する
    `<Tweet key={index} tweet={tweet} onDelete={this.props.deleteTweet} />`

        export default connect(mapState, mapDispatch)(Timeline);




## [react講義_7](https://web.microsoftstream.com/video/47f69b34-3146-43b5-94af-41102ef8cbf8?list=watchlist)
### reduxに処理を集約させる。（投稿後の入力欄を白紙にする）
- Actions.jsにreduxで使いたい処理を追記する
```js
// Action Types
export const ADD_TWEET = 'ADD_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const EDIT_VALUE = 'form/EDIT_VALUE';
export const RESET = 'form/RESET';

// Action Creators
export const addTweet = (newTweet) => {
  return { type: ADD_TWEET, payload: newTweet };
}
export const deleteTweet = (tweet) => {
  return { type: DELETE_TWEET, payload: tweet };
}
export const editValue = (name, value) => {
  return { type: EDIT_VALUE, name, value };
}
export const reset = () => {
  return { type: RESET };
}
```
- index.jsに追記したタイプをswitch文で反応できるように追記する。
    - importにactionsのタイプを追記
    `import { ADD_TWEET, DELETE_TWEET, EDIT_VALUE, RESET } from './Actions.js'`
    - initialStateに必要な情報の追記
    ```js
    const initialState = {
        user_name: 'ぽけぽけ',
        emojiList,
        tweets: loadTweets(),
        form: {
            text: '',
            avatar: null,
        }
    };
    ```
    - reducerのswitch文に追記
    ```js
    // { type: 'ADD_TWEET', payload: tweet}
    const reducer = (state, action) => {
    switch (action.type ){
        case ADD_TWEET:
            return {
                ...state,
                tweets: [ action.payload, ...state.tweets],
            };
        case DELETE_TWEET:
            return {
                ...state,
                tweets: state.tweets.filter(o => {
                return action.payload.ts !== o.ts;
                })
            };
        case EDIT_VALUE:
            return {
                ...state,
                form: {
                [action.name]: action.value,
                },
            };
        case RESET:
            return {
                ...state,
                form: {
                text: '',
                avatar: null,
                }
            }
        default:
            return state;
        };
    };
    ```
- PostFromに追記した処理のreduxをconnectする
    - import
    `import { addTweet, editValue, reset } from '../Actions.js'`
    - mapDispatch
    ```js
    const mapDispatch = (dispatch) => {
        return {
            addTweet: (newTweet) => {
                dispatch(addTweet(newTweet));
            },
            editValue: (name, value) =>{
                dispatch(editValue(name, value));
            },
            reset: () => {
                dispatch(reset());
            },
        }
    }
    ```
- 階層配列から配列の取得と変数定義を同時にする方法
```js
// propsからformを取得し、formという変数に格納
const { form } = this.props;
// formからtextを取得し、textという変数に格納
const { text } = form;
```





## [react講義_8](https://web.microsoftstream.com/video/474e423a-35ab-4181-81e1-f5618f3efd4d?list=watchlist)
### reducerの分割
- combineReducersを使うことでreducer.jsのなかのreducerを分割したものを最後にexportする際に1まとめに変換する
`import {combineReducers} from 'redux';`
```js
export default combineReducers({
  user,
  emojiList,
  tweets,
  form,
});
```
- ファイル単位で分割する方法
    - reducersフォルダを作成し、user,emojiList,tweets,form毎にファイルを作成し、処理をわける。
    - index.jsを作成し、各ファイルの読込とcombineReducersを作成する。
    ```js
    import {combineReducers} from 'redux';
    import user from './user';
    import emojiList from './emojiList';
    import tweets from './tweets';
    import form from './form';

    export default combineReducers({
        user,
        emojiList,
        tweets,
        form,
    });
    ```
    - おおもとのindex.jsのreducerのimportをフォルダに変更する(もともとreducer.jsだったが、reducersに変更)
    `import reducer from './reducers'`
### モーダルの作成
- [rodal](https://chenjiahan.github.io/rodal/)
- npm i rodalでrodalをインストール
- Modal用のコンポーネントを作成する。reduxも折り込み。
```js
import React from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';


const ProfileModal = (props) =>{
    console.log({props});
    return (
        <Rodal 
            visible={false}
            onClose={() => {}}
            animation={'flip'}
        >
            <h4>プロフィール</h4>
            <p>{props.user.name}</p>
        </Rodal>
    );
}

const mapState = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatch = (dispatch) => null;
export default connect(mapState, mapDispatch)(ProfileModal);
```
- app.jsで上記コンポーネントを読み込む


## [react講義_9](https://web.microsoftstream.com/video/a8a65459-c79e-49f2-b9fe-7e2f51a03569?list=watchlist)
### modalの作成(表示/非表示管理)
- パーツ整理
    - ProfileModal.js(コンポーネント)
        - Rodalというmodalの中身を構成
        - visibleのtrue, falseで表示非表示を切替える
        - onClose処理でreducerのtoggleProfileModalにfalseを与えるようにdispatchしている
    - Header.js(コンポーネントONのトリガー設置)
        - 自分の名前の部分をボタンにし、onClickでreducerのtoggleProfileModalをtrueにするようにdispatchしている
    - reducer/profileModal.js
        - stateの定義とaction実行時の処理を記述
    - Action.js
        - actionのタイプとクリエイターを一覧で定義
    - reducers/index.js
        - 各reducerをまとめる場所
### APIの活用方法
- [useEffectとは](https://qiita.com/seira/items/e62890f11e91f6b9653f)
- reduxでは何回実行しても想定した通りの結果が返ってくるような処理にしないといけない。
- redux thunk
    - index.jsにthunkを読み込むように設定する必要がある。
    ```js
    import thunk from 'redux-thunk';
    import { compose, createStore, applyMiddleware } from 'redux';
    
    const store = createStore(
    reducer, 
    compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f)
    );
    ```
    - 取得情報が変わっても大丈夫なように設計する。非同期処理を扱えるようにする
- axios
    - api取得の為の関数
    - [axiosの書き方](https://qiita.com/EdyEric/items/b70efe496e2d4d9b5196)
    - .thenと.catchはthunkの範囲
    ```js
    axios.get('https://qiita.com/api/v2/authenticated_user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      localStorage.setItem('apiKey', token);
      dispatch(successFetchProfile(response.data));
    }).catch(error =>{
      dispatch(failureFetchProfile(error));
    })
    ```
- api取得データをstateで読み込めるようにする。
- 取得したapiKeyをstoreに保存する。もし、store似ない場合は入力させる(useEffectで実装)


## [react講義_10](https://web.microsoftstream.com/video/87d9e126-d372-4511-95fa-9040818ca0fd?list=watchlist)
### react-router-domの活用方法について
- react-router-dom
    - urlで表示させる箇所を返る際に活用するライブラリ
- 導入手順
    - App.jsでimport
    `import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';`
    - 切替えたい箇所を下記のようにする
    ```js
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Qiita" component={QiitaLayout} />
    </Switch>
    ```
    - header.jsにリンク切り替えのボタン追加
    ```js
    import { NavLink } from 'react-router-dom';

    <NavLink exact to="/" activeClassName="text-info" className="btn btn-link">Home</NavLink>
    <NavLink to="/qiita" activeClassName="text-info" className="btn btn-link">Qiita</NavLink>
    ```


## [react講義_11](https://web.microsoftstream.com/video/5cb31f8b-e0a6-41be-acd2-cbd3f3f1db67?list=watchlist)
### QiitaStockページ作成

## [react講義_12](https://web.microsoftstream.com/video/98c7bd57-ef68-460c-9dbc-d9d20a5b6d46?list=watchlist)
### QiitaDetailページ作成

## [reactQiita学習_1](https://qiita.com/TsutomuNakamura/items/72d8cf9f07a5a30be048)
