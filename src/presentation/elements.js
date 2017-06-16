import preact from 'preact'


const Cell = ({value, onClick}) => {
    const text = value || '';
    return <div class="cell" onClick={onClick}>{ text }</div>
};

export class Game extends preact.Component {
    constructor() {
        super(...arguments);

        this.state = {squares: this.props.squares};
        this.subscription = null;
    }

    componentDidMount() {
        this.subscription = this.props.bus.addListener('STATE_UPDATED', (_, state)=> {
            this.setState({squares: state.squares});
        });
    }

    componentWillUnmount() {
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
    }

    onCellClick(cellIndex) {
        this.props.bus.sendMessage('CELL_CLICKED', cellIndex);
    }

    render(_, {squares}) {
        return <div class="board-game">
                <div class="row">
                    <Cell value={squares[0]} onClick={this.onCellClick.bind(this, 0)}/>
                    <Cell value={squares[1]} onClick={this.onCellClick.bind(this, 1)}/>
                    <Cell value={squares[2]} onClick={this.onCellClick.bind(this, 2)}/>
                </div>
                <div class="row">
                    <Cell value={squares[3]} onClick={this.onCellClick.bind(this, 3)}/>
                    <Cell value={squares[4]} onClick={this.onCellClick.bind(this, 4)}/>
                    <Cell value={squares[5]} onClick={this.onCellClick.bind(this, 5)}/>
                </div>
                <div class="row">
                    <Cell value={squares[6]} onClick={this.onCellClick.bind(this, 6)}/>
                    <Cell value={squares[7]} onClick={this.onCellClick.bind(this, 7)}/>
                    <Cell value={squares[8]} onClick={this.onCellClick.bind(this, 8)}/>
                </div>
            </div>;
    }
}

export class ScoreBoard extends preact.Component {
    constructor() {
        super(...arguments);

        this.state = {winner: this.props.winner};
        this.subscription = null;
    }

    componentDidMount() {
        this.subscription = this.props.bus.addListener('STATE_UPDATED', (_, state)=> {
            this.setState({winner: state.winner});
        });
    }

    componentWillUnmount() {
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
    }

    render(_, {winner}) {
        return <div class="score-board">
            And the winner is: {winner}
        </div>
    }
}

export class StateHistoryManager extends preact.Component {
    constructor() {
        super(...arguments);

        this.state = {
            history: [Object.assign({}, this.props.initialState)],
            cursor: 0
        };
        this.subscription = null;
    }

    componentDidMount() {
        this.subscription = this.props.bus.addListener('STATE_UPDATED', (_, state)=> {
            if(this.state.history.indexOf(state) >= 0){
                return;
            }

            const newHistory = this.state.history.concat([state]);

            this.setState({
                history: newHistory,
                cursor: newHistory.length - 1
            });
        });
    }

    componentWillUnmount() {
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
    }

    goBackInTime(){
        const pastState = this.state.history[this.state.cursor - 1];

        if(pastState){
            this.setState({
                cursor: this.state.cursor - 1,
                history: this.state.history
            });
            this.props.bus.sendMessage('GO_BACK_IN_TIME', pastState);
        }
    }

    goForwardInTime(){
        const futureState = this.state.history[this.state.cursor + 1];

        if(futureState){
            this.setState({
                cursor: this.state.cursor + 1,
                history: this.state.history
            });
            this.props.bus.sendMessage('GO_FORWARD_IN_TIME', futureState);
        }
    }

    render(_, {history, cursor}) {
        return <div class="state-history-manager">
            <button class="back" onClick={this.goBackInTime.bind(this)}>Back</button>
            <button class="forward" onClick={this.goForwardInTime.bind(this)}>Forward</button>
            {
                history.map((s, index) => {
                    let className = "";

                    if(cursor === index){
                        className += " current";
                    }

                    return <div class={className}>{index}</div>;
                })
            }
        </div>
    }
}
