import * as React from 'react';
import { observer } from 'mobx-react';
import BoardStore from './BoardStore';
import './Message.css';

interface MessageProps {
    store: BoardStore;
}

@observer
export default class Message extends React.Component<MessageProps, {}> {
    render() {
        return (
            <div className='MessageParent'>
                <p className='Message'>{this.props.store.message}</p>
            </div>
        );
    }
}