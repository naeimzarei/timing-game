import './Board.css';
import * as React from 'react';
import BoardStore from './BoardStore'

interface BoardProps {
    store: BoardStore
}

export default class Board extends React.Component<BoardProps, {}> {
    render() {
        return (
            <div className='ParentBoard'>
                <div className='Board' onClick={() => this.props.store.startRound()}>Start</div>
            </div>
        );
    }
}