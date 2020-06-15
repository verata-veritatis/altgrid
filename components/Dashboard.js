import React from 'react';
import ApexChart from './Chart';
import { useAlert } from 'react-alert'
import './Feed.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            activeTicker: 'BTCUSD'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitBuy = this.handleSubmitBuy.bind(this);
        this.handleSubmitSell = this.handleSubmitSell.bind(this);
    }

    handleSubmitBuy(event) {
        alert('A BUY order on ' + this.props.activeTicker + ' for ' + this.state.value + ' contracts has been submitted!');
        event.preventDefault();
    }

    handleSubmitSell(event) {
        alert('A SELL order on ' + this.props.activeTicker + ' for ' + this.state.value + ' contracts has been submitted!');
        event.preventDefault();
    }

    handleChange(event) {
        console.log(event)
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <div className="Chart">
                <div className="Title">
                    BINANCE: {this.props.activeTicker}
                </div>
                <div className="Plot">
                    <ApexChart activeData={this.props.activeData} />
                </div>
                <div className="Info">
                    <form onSubmit={this.handleSubmitBuy}>
                        <div className="Form-Title">QTY</div>
                        <div className="Field">
                            <label><input type="text" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>
                        <div className="Form-Title">PRICE</div>
                        <div className="Field">
                            <label><input type="text" value="0"/></label>
                        </div>
                        <div className="Form-Title">STOP-LOSS</div>
                        <div className="Field">
                            <label><input type="text" value="0"/></label>
                        </div>
                        <div className="Submit Buy"><input type="submit" value="BUY" /></div>
                    </form>
                    <form onSubmit={this.handleSubmitSell}>
                        <div className="Form-Title">QTY</div>
                        <div className="Field">
                            <label><input type="text" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>
                        <div className="Form-Title">PRICE</div>
                        <div className="Field">
                            <label><input type="text" value="0"/></label>
                        </div>
                        <div className="Form-Title">STOP-LOSS</div>
                        <div className="Field">
                            <label><input type="text" value="0"/></label>
                        </div>
                        <div className="Submit Sell"><input type="submit" value="SELL" /></div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Dashboard