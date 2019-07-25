import React from "react";
import Distributors from "./Content/Distributors";
import User from "./Content/User";
import Villages from "./Content/Villages";
import Region from "./Content/Region";
import Sales from "./Content/Sales";
import StoveType from './Content/StoveType';
import Township from './Content/Township';
import { Switch, Route } from "react-router-dom";

export default class Content extends React.Component{
  render(){
    return(
  <div>
    <Switch>
      <Route path="/admin" exact
        render={(props)=>
          <Distributors {...props} userdata={this.props.userdata}/>
        } 
      />
      <Route path="/township" 
        render={(props)=>
          <Township {...props} userdata={this.props.userdata}/>
        } 
      />
      <Route path="/user" 
        render={(props)=>
          <User {...props} userdata={this.props.userdata}/>
        } 
      />
      <Route path="/villages" 
        render={(props)=>
          <Villages {...props} userdata={this.props.userdata}/>
        } 
      />
      <Route path="/region" 
        render={(props)=>
          <Region {...props} userdata={this.props.userdata}/>
        }/>
      <Route path="/sales" component={Sales} />
      <Route path="/stovetype" 
        render={(props)=>
          <StoveType {...props} userdata={this.props.userdata}/>}
      />
    </Switch>
  </div>
)
  }
}
