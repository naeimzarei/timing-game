import * as React from 'react';
import BoardStore from './BoardStore';
import { observer } from 'mobx-react';
import './Score.css';

interface ScoreProps {
    store: BoardStore
}

@observer
export default class Score extends React.Component <ScoreProps, {}> {
    render() {
        return <h1>Score: {this.props.store.score}</h1>
    }
}