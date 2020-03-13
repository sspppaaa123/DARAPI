import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Predictor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keys: this.props.keys
            // keys:["ram","three_g","four_g"]
        }
    }

    componentDidMount () {
        console.log(this.state.keys)
    }

    render () {
        let features = this.state.keys.map((item) =>
            <form>
                <div class="form-group row">
                    <h6 key={item} class="col-sm-2 col-form-label">{item}</h6>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"></input>
                    </div>
                </div>
            </form>
        );
        return (
            <div className="container">
                <div align="center">
                    <div class="card w-75" align="center">
                        <div class="card-body">
                            <h4>Enter the values for prediction</h4>
                            <br/><br/>
                            {features}
                            <button className='btn btn-primary'  onClick={this.onClick}>Predict</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Predictor);