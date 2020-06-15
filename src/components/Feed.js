import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { defaultData } from './Default'
import Dashboard from './Dashboard'
import FadeIn from 'react-fade-in';
import _ from 'lodash';
import './Feed.css';

const client = new W3CWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
const api = 'https://api.binance.com/api/v3/klines?interval=5m&limit=500&symbol='

class Feed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '0',
            response: {},
            activeTicker: 'BTCUSD',
            activeData: defaultData
        }
    }

    componentDidMount() {
        document.querySelector('.Grid').classList.add('fade-in');
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            var result = JSON.parse(message.data).reduce((acc, {c, P, b, a, v, s}) => {
                acc[s] = {c, P, b, a, v};
                return acc
            }, {});
            Object.keys(result).forEach(key => key.endsWith('BTC') ? null : delete result[key])
            this.setState(prevState => ({
                response: Object.assign(prevState.response, result)
            }));
        };
        client.onclose = () => {
            alert('The WebSocket connection has encountered an error. Please refresh to reconnect!');
            console.log('WebSocket Client Closed')
        };
    }

    setActiveTicker(ticker) {
        fetch(api + ticker)
            .then(result => result.json())
            .then((result) => {
                result.forEach(i => _.pullAt(i, [5, 6, 7, 8, 9, 10, 11]))
                return result
            })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    activeTicker: ticker,
                    activeData: [{data: result}]
                });
            });
    }

    render() {
        return (
            <header className="Container">
                <div className="Section Grid">
                    {Object.entries(this.state.response).map(([key, value]) => (
                        <button onClick={ () => this.setActiveTicker(key) }>
                            <div className="Box">
                                <FadeIn>
                                    <div className="Spacer"></div>
                                    <div className="Designator">ASK</div>
                                    <div className="Data Ask">{value.a}</div>
                                    <div className="Name">{key}</div>
                                    <div className="Price">{value.c}</div>
                                    <div className="Designator">BID</div>
                                    <div className="Data Bid">{value.b}</div>
                                    <div className="Spacer"></div>
                                </FadeIn>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="Section Fixed">
                    <Dashboard activeTicker={this.state.activeTicker} activeData={this.state.activeData} />
                </div>
            </header>
        )
    }
}

export default Feed;