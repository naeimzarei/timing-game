import './Board.css';
import * as React from 'react';
import BoardStore from './BoardStore';
import Score from './Score';

interface BoardProps {
    store: BoardStore
}

export default class Board extends React.Component<BoardProps, {}> {
    // render the board 
    render() {
        return (
            <div 
                className='ParentBoard' 
                ref='ParentBoard' 
                tabIndex={0}
                onKeyDown={(event) => this.props.store.handleKeyDown(event)}>
                <Score store={this.props.store}/>
                <div 
                    className='Board' 
                    onClick={() => this.props.store.startRound()}>
                    Start
                </div>
            </div>
        );
    }
    
    // focus the board so key and click events are registered on ParentBoard
    componentDidMount() {
        let ref = this.refs.ParentBoard as HTMLElement;
        ref.focus();
    }
}