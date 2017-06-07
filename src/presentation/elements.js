import preact from 'preact'


const Cell = ({value, onClick}) => {
    const text = value || '';
    return <div class="cell" onClick={onClick}>{ text }</div>
};

export class Game extends preact.Component {
    constructor(){
        super(...arguments);

        this.state = {squares: this.props.squares};
        this.subscription = null;
    }

    componentDidMount(){
        this.subscription = this.props.bus.addListener('STATE_UPDATED', (_, state)=>{
            this.setState({squares: state.squares});
        });
    }
    componentWillUnmount(){
        if(this.subscription !== null){
            this.subscription.unsubscribe();
        }
    }

    onCellClick(event) {
        this.props.bus.sendMessage('USER_CLICKED', event.target);
    }

    render(_, {squares}) {
        return <div id="container">
            <div id="board-game">
                { squares.map((value)=> {
                    return <Cell value={value} onClick={this.onCellClick.bind(this)}/>
                })}
            </div>
            <div id="history-management"></div>
        </div>;
    }
}
