import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Circle from 'react-circle'
import axios from 'axios'

class FeatureDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features:'',
            data_file:'',
            // percent:["45.49","24.47","13.99","99","99","99","99","99","99","99","99","99","99","99","99","99","99","99","99","99"],
            // specs:["_id", "battery_power", "blue", "clock_speed", "dual_sim", "fc", "four_g", "id", "int_memory", "m_dep", "mobile_wt", "n_cores", "pc", "px_height", "px_width", "ram", "sc_h", "sc_w", "talk_time", "three_g", "touch_screen", "wifi"],
            percent:[],
            specs:[],
            score:[],
            checkedItems: new Map(),
            colarr:[],
            methodName:[],
            methodScore:[],
            target:'',
            inputType:this.props.inputType
        };
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount = () => {
        this.setState ({
            specs: this.props.specs,
            percent: this.props.percent,
            score: this.props.score,
            target:this.props.target
        })
        console.log(this.props.specs,this.props.percent)
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        console.log(item, isChecked)
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        console.log(this.state.checkedItems)
    }

    onClick(e) {
        
        let keys = Array.from( this.state.checkedItems.keys() );
        console.log(keys,this.props.filename)
        if(this.props.inputType[this.props.target]=="1")
        {
        axios({
            method: 'post',
            url: '/users/classify',
            data: {
              collection: this.props.filename,
              features: keys,
              target: this.props.target,
              inputType:this.props.inputType
            },
            headers: {'Content-Type': 'application/json'}
            })
            .then((response) => {
                this.setState({
                    methodName: response.data.names,
                    methodScore: response.data.test_scores
                })
                this.props.methodName(this.state.methodName)
                this.props.methodScore(this.state.methodScore)
                this.props.history.push(`/result`)
                console.log(response.data.names, this.state.methodName)
                console.log(response.data.test_scores, this.state.methodScore)
            })
            .catch(function (response) {
                console.log(response);
            });
        }
        else
        {
            axios({
                method: 'post',
                url: '/users/regression',
                data: {
                  collection: this.props.filename,
                  features: keys,
                  target: this.props.target,
                  inputType:this.props.inputType
                },
                headers: {'Content-Type': 'application/json'}
                })
                .then((response) => {
                    this.setState({
                        methodName: response.data.names,
                        methodScore: response.data.test_scores
                    })
                    this.props.methodName(this.state.methodName)
                    this.props.methodScore(this.state.methodScore)
                    this.props.history.push(`/result`)
                    console.log(response.data.names, this.state.methodName)
                    console.log(response.data.test_scores, this.state.methodScore)
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
    }

    render ()  {
        const flexStyle = {
            display: 'flex',
            'flex-wrap': 'wrap',
            'justify-content': 'center'
          };

        const cardStyle = {
            width: '190px', 
            padding:'5px', 
            margin:'5px', 
            'text-align':'center',
            'border-color': 'black',
            'border-radius': '20px',
            'border-width': '1px'
        }

        const checkbox = {
            width: '20px', 
            height: '20px',
            padding: '10px',
            margin: '20px 0'
        }

        let arrdata =this.state.specs;
        let optionfeatures = this.state.percent.map((item,index) =>
    
        <div class="card" style={cardStyle}>
            <div class="card-body">
            <h5 class="card-title">{arrdata[index]}</h5>
                <Circle         
                    progress={item}
                    progressColor="cornflowerblue" 
                    bgColor="whitesmoke"
                    textColor="hotpink"
                    key={arrdata[index]}
                    />
                    <br></br>
                    <input type='checkbox' style={checkbox} name={arrdata[index]} checked={this.state.checkedItems.get(arrdata[index])} onChange={this.handleChange}  />
                    </div>
            </div>
    );

          return ( 
            <div>
                <div class='col-lg-auto' style={flexStyle}>
                    {optionfeatures}
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div align="center">
                <button type="button" class="btn btn-primary btn-lg" onClick={this.onClick}>Predict</button>
                </div>
            </div>          
          )
      }
}

export default withRouter(FeatureDisplay);