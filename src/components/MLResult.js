import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class MLResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // methodName:['a','RandomForest','ac','jeshfjgsf'],
            // methodScore:['3','4','5','6']
            methodName: this.props.methodName,
            methodScore: this.props.methodScore
        };
        console.log(this.props.methodName,this.props.methodScore)
    }

    componentDidMount = () => {
        this.setState ({

        })
    }

    render ()  {
        const flexStyle = {
            display: 'flex',
            'flex-wrap': 'wrap',
            'justify-content': 'center'
        };

        const cardStyle = {
            width: '220px', 
            padding:'15px', 
            margin:'20px', 
            'text-align':'center',
            'border-color': 'black',
            'border-radius': '20px',
            'border-width': '1px'
        }


        let arrdata =this.state.methodName;
        let score = this.state.methodScore.map((item,index) =>
    
        <div class="card" style={cardStyle}>
            <div class="card-body">
                <h5 class="card-title" key={item}>{arrdata[index]}</h5>
                <h5 class="card-text">{item}</h5>
            </div>
        </div>
    );
          return ( 
            <div class="container" align="center">
                <div class="card w-75" align="center">
                    <div class="card-body">
                        <h4 class="card-title">Accuracy when executed using different algorithms</h4>
                    </div>
                </div>
                <div class='col-lg-auto' style={flexStyle}>
                    {score}
                </div>
            </div>          
          )
      }
}

export default withRouter(MLResult);