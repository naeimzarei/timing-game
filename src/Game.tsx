import * as React from 'react';
import { observer } from 'mobx-react';
import Board from './Board';
import BoardStore from './BoardStore';
import Score from './Score';
import Message from './Message';
import './Game.css';

interface GameProps {
    store: BoardStore;
}

@observer
export default class Game extends React.Component<GameProps, {}> {
    render() {
        return (
            <div className='Game'>
                <div className='GameScore'>
                    <Score store={this.props.store}/>
                </div>
                <Board store={this.props.store}/>
                <div className='GameMessage'>
                    <Message store={this.props.store}/>
                </div>
            </div>
        );
    }
}