import * as React from 'react';
import * as ReactDOM from 'react-dom';;
import './index.css';
import Game from './Game';
import BoardStore from './BoardStore';
import registerServiceWorker from './registerServiceWorker';

const store = new BoardStore();

ReactDOM.render(
  <Game store={store}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
