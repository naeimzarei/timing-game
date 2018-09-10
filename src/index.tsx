import * as React from 'react';
import * as ReactDOM from 'react-dom';;
import './index.css';
import Board from './Board';
import BoardStore from './BoardStore';
import registerServiceWorker from './registerServiceWorker';

const boardStore = new BoardStore();

ReactDOM.render(
  <Board store={boardStore}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
