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
        return <div id="container">
            <div id="board-game">
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
            </div>
            <div id="history-management"></div>
        </div>;
    }
}
