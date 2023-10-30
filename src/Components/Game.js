import React, { Component } from 'react';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGame: true,
            level: 1,
            numbers: [],
            numbersCurrentIndex: 0,
            gameMode: '',
            showNumber: 0,
            waitTime: 0,
            showInput: false,
            maxNumber: 0,
            answer: ''
        };

    }

    handleAnswer = (event) => {
        this.setState({ answer: event.target.value });
        if (event.target.value == this.state.maxNumber) {
            this.setState({ gameMode: 'Finish' });
        }
    }
    handleAnswerFromButton(char){
        this.setState({ answer: this.state.answer + char },()=>{
            if (this.state.answer == this.state.maxNumber) {
                this.setState({ gameMode: 'Finish' });
            }
        });
        
    }

    handleClearAnswer(){
        this.setState({ answer: '' });
    }

    handleClearLastCharAnswer(){
        this.setState({ answer: this.state.answer.substring(0,this.state.answer.length-1) });
    }

    randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setRandom() {
        const min = 100 * (this.state.level * 2);
        const max = 999 * (this.state.level * 2);
        const newNumbers = [
            this.randomNumberInRange(min, max),
            this.randomNumberInRange(min, max),
            this.randomNumberInRange(min, max),
            this.randomNumberInRange(min, max),
        ];
        this.setState({
            numbers: newNumbers
        });
        this.setState({ maxNumber: Math.max(...newNumbers.map(o => o)) });
    }

    componentDidMount() {
        this.setRandom();
        this.setState({ gameMode: 'Run' });
        setInterval(this.tick, 1000);
    }

    tick = () => {
        if (this.state.gameMode === 'Run' && this.state.numbersCurrentIndex < this.state.numbers.length) {
            this.setState({ showNumber: this.state.numbers[this.state.numbersCurrentIndex] });
            this.setState({ numbersCurrentIndex: this.state.numbersCurrentIndex + 1 });
        }
        else if (this.state.gameMode === 'Run') {
            this.setState({ showNumber: 0 });
            this.setState({ gameMode: 'Wait' });
        }

        if (this.state.gameMode === 'Wait' && this.state.waitTime < 5) {
            this.setState({ waitTime: this.state.waitTime + 1 });
        }
        else if (this.state.gameMode === 'Wait') {
            this.setState({ waitTime: 0 });
            this.setState({ gameMode: 'Check' });
        }

        if (this.state.gameMode === 'Finish') {
            this.setRandom();
            this.setState({ waitTime: 0 });
            this.setState({ answer: '' });
            this.setState({ numbersCurrentIndex: 0 });
            this.setState({ level: this.state.level + 1 });
            this.setState({ gameMode: 'Run' });
        }
        //console.log("this.state.level");
        //this.setState({ level: this.state.level + 1 });
    }



    render() {
        return (
            <div>


                <div className='note'>
                    <div className='header'>
                        <h3>Game Level {this.state.level}</h3>
                    </div>
                    <div>
                        {this.state.showNumber !== 0 ? 'Number ' + this.state.numbersCurrentIndex + ' ' + this.state.showNumber : ''}
                        {this.state.gameMode === 'Check' ?
                                            
                            <div>
                                <div>Type answer</div>
                                <input type="text"
                                    value={this.state.answer}
                                    onChange={this.handleAnswer}></input>
                                <div>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(7)}>7</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(8)}>8</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(9)}>9</button>
                                </div>
                                <div>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(4)}>4</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(5)}>5</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(6)}>6</button>
                                </div>
                                <div>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(1)}>1</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(2)}>2</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(3)}>3</button>
                                </div>
                                <div>
                                    <button className="save" onClick={()=>this.handleClearAnswer()}>C</button>
                                    <button className="save" onClick={()=>this.handleAnswerFromButton(0)}>0</button>
                                    <button className="save" onClick={()=>this.handleClearLastCharAnswer()}>-</button>
                                </div>
                            </div>
                            : ''}

                        {this.state.gameMode === 'Wait' ?

                            <div>
                                Waiting  {5 - this.state.waitTime}
                            </div>

                            : ''}
                        {this.state.gameMode === 'Finish' ?

                            <div>
                                Next Game Loading...
                            </div>

                            : ''}
                    </div>
                </div>
                gameMode:{this.state.gameMode} - waitTime:{this.state.waitTime} - showNumber:{this.state.showNumber} - answer:{this.state.answer}  - maxNumber:{this.state.maxNumber}
            </div>

        )
    }
}
