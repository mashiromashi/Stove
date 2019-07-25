import React,{Component} from 'react';
import './App.css';
import Home from './component/Home';
import Login from './component/Content/Login/Login';

export default class App extends Component{
  constructor(){
    super();
    this.state={
      userdata:{},
      isLogin:false
    }
  }
  componentDidMount(){
    let userdata=JSON.parse(sessionStorage.getItem('userdata'));
    if(userdata){
        this.setState({
          isLogin:true,
          userdata:userdata[0]
        })
    }
    else{
      this.setState({
        isLogin:false
      })
    }
  }
  render(){
    return(
      <div>
        {
          this.state.isLogin?
          <Home userdata={this.state.userdata}/>
          :<Login/>
        }
     </div> 
    )
  }
}