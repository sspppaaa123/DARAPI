import React, { Component } from 'react';
  import { BrowserRouter as Router, Route } from 'react-router-dom'

  import NavBar from './components/NavBar'
  import Landing from './components/Landing'
  import Login from './components/Login'
  import Register from './components/Register'
  import Profile from './components/Profile'
  import FileUpload from './components/FileUpload';
  import UserFeatureInput from './components/UserFeatureInput'
  import SelectTarget from './components/SelectTarget';
  import FeatureDisplay from './components/FeatureDisplay'
  import DataVisualization from './components/DataVisualization'
  import OutlierAnalysis from './components/OutlierAnalysis';
  import MLResult from './components/MLResult'

  class App extends Component {
    constructor(){
      super();
      this.state = {
        filename:'',
        specs:[],
        percent:[],
        score:[],
        inputType:[],
        methodName:[],
        methodScore:[]
      };
    }

    getFilename(name) {
      this.setState({
        filename: name
      })
      console.log("getFilename app.js")
    }

    getSpecs(specs) {
      this.setState({
        specs: specs
      })
      console.log("getSpecs app.js")
    }

    getInputType(inputType) {
      this.setState({
        inputType: inputType
      })
      console.log("getInputType app.js")
    }

    getPercent(percent) {
      this.setState({
        percent: percent
      })
      console.log("getPercent app.js")
    }

    getScore(score) {
      this.setState({
        score: score
      })
      console.log("getScore app.js")
    }

    getTarget(target) {
      this.setState({
        target: target
      })
      console.log("getTarget app.js")
    }

    getOutlier(out_opt) {
      this.setState({
        out_opt: out_opt
      })
      console.log("getOutlier app.js")
    }

    getMethodName(methodName) {
      this.setState({
        methodName: methodName
      })
      console.log("getMethodName app.js")
    }

    getMethodScore(methodScore) {
      this.setState({
        methodScore: methodScore
      })
      console.log("getMethodScore app.js")
    }

    render () {
      return (
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/upload" 
                component={() => 
                  <FileUpload filename={ this.getFilename.bind(this)}
                  />
                } 
              />
              <Route exact path="/input" component={() => 
                  <UserFeatureInput filename={ this.state.filename }
                    specs={ this.getSpecs.bind(this) }
                    inputType={ this.getInputType.bind(this) }
                  />
              }/>
              <Route exact path="/visualize" 
                component={() => 
                  <DataVisualization filename={this.state.filename}
                    specs={ this.state.specs }
                  />
                } 
              />
              <Route exact path="/outliers" 
                component={() => 
                  <OutlierAnalysis out_opt={this.getOutlier.bind(this)}
                    filename={ this.state.filename }
                  />
                }
              />
              <Route exact path="/target"  
                component={() => 
                  <SelectTarget filename={ this.state.filename }
                    inputType={ this.state.inputType } 
                    specs={ this.getSpecs.bind(this) } 
                    percent={ this.getPercent.bind(this) } 
                    score={ this.getScore.bind(this) } 
                    target={ this.getTarget.bind(this)}
                  /> 
                } 
              />
              <Route exact path='/features'
                component={() => 
                  <FeatureDisplay specs={ this.state.specs }
                    score={ this.state.score }
                    percent={ this.state.percent }
                    filename={ this.state.filename }
                    target={this.state.target}
                    methodName={ this.getMethodName.bind(this) }
                    methodScore={ this.getMethodScore.bind(this) }
                    inputType = {this.state.inputType}
                  />
                }
              />
              <Route exact path='/result'
                component={() =>
                <MLResult methodName={ this.state.methodName }
                  methodScore={ this.state.methodScore }
                />
              }
            />
            </div>
          </div>
        </Router>
      );
    }
  }

  export default App;