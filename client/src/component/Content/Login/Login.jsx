import React from "react";
import { base_url } from "../../util/Global";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logindata: {
        username: "",
        password: ""
      },

      loginError: {
        usernameError: false,
        passwordError: false
      },
      nouserError:false
    };
  }

  loginInputChange = e => {
    let name = e.target.dataset.name;
    let data = this.state.logindata;
    data[name] = e.target.value;
    this.setState({
      logindata: data
    });
  };

  login = () => {
    let data=this.state.logindata;
    let errorlist=this.state.loginError;
    if(data.username===''){
        errorlist.usernameError=true;
    }
    else{
      errorlist.usernameError=false;
    }
    if(data.password===""){
      errorlist.passwordError=true;
    }
    else{
      errorlist.passwordError=false;
    }
    this.setState({
      loginError:errorlist
    })
    if(data.username!=="" && data.password!==""){
      fetch(`${base_url}/users/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }
      })
      .then(res=>{
        if(res.message==="Successful"){
          this.setState({
              nouserError:false
          },()=>{
            sessionStorage.setItem('userdata',JSON.stringify(res.data));
            window.location.pathname='/admin';
            document.querySelector("#loginbutton").click();
            this.setState({
              logindata:{
                username:'',
                password:''
              }
            })
          })
        }
        else{
          this.setState({
            nouserError:true
          })
        }
      })
    }
  };
  forceLogin=(e)=>{
    if(e.which===13){
      this.login();
    }
  }
  render() {
    return (
      <div id="login" className="loginpanel" onKeyDown={this.forceLogin}>
        <div>
          <div className='loginTitle'>
            <img className=' text-center' src='/assets/img/logo.png' alt=''/>
          </div>
        {
            this.state.nouserError?
            <small className='error-txt'>No user found</small>:''
          }
        <div className='form-group mb-4'>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            data-name="username"
            value={this.state.logindata.username}
            onChange={this.loginInputChange}
          />
          {this.state.loginError.usernameError ? (
            <small className="error-txt">User name is required</small>
          ) : (
            ""
          )}
        </div>

        <div className=' form-group mb-0'>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            data-name="password"
            value={this.state.logindata.password}
            onChange={this.loginInputChange}
          />
          {
            this.state.loginError.passwordError?
            <small className='error-txt'>Password is required</small>:''
          }
        </div>

        <br /> 
        <div>
          <button
            id="loginbutton"
            className="loginBtn"
             onClick={this.login}
          >
            Login
          </button>
        </div>
        </div>
      </div>
    );
  }
}
