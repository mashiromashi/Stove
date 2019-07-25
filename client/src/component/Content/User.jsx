import React from "react";
import { DataTable } from "react-data-components";
import { base_url } from "../util/Global";

const columns = [
  { title: "No", prop: "no" },
  { title: "Username", prop: "username" },
  { title: "Email Address", prop: "emailaddress" },
  { title: "Address", prop: "address" },
  { title: "Phone", prop: "phone" },
  { title: "Role", prop: "role" },
  { title: "Edit", prop: "Edit" },
  { title: "Delete", prop: "Delete" }
];

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid:props.userdata.userid,
      userdata:[],
      deleteid: 0,
      addapierror:false,
      adddata:{
        username:'',
        password:'',
        emailaddress:'',
        address:'',
        phone:''
      },
      adderror:{
        usernameerror:false,
        passworderror:false,
        emailaddresserror:false,
        addresserror:false,
        phoneerror:false
      },
      editpaierror:false,
      editdata:{},
      editerror:{
        usernameerror:false,
        passworderror:false,
        emailaddresserror:false,
        addresserror:false,
        phoneerror:false
      }
  }
  }
  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    fetch(`${base_url}/user/getall`)
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        console.log("data is",data);
        let array = [];
        const size = data.length;
        var i = 0;
        for (i = 0; i < size; i++) {
          let temp = data[i];
          array.push({
            no: (i+1),
            username: temp.username,
            password: temp.password,
            emailaddress: temp.emailaddress,
            address: temp.address,
            phone: temp.phone,
            role: temp.role,
            Edit: (
              <button
                className="btn btm-sm btn-primary"
                data-toggle="modal"
                data-target="#myModal"
                onClick={()=>this.setState({editdata:temp})}
              >
                <i className="fas fa-edit" />
              </button>
            ),
            Delete: (
              <button
                className="btn btm-sm btn-danger"
                data-toggle="modal"
                data-target="#del"
                onClick={()=>this.setState({deleteid:temp.userid})}
              >
                <i className="fas fa-trash" />
              </button>
            )
          });
        }
        this.setState({ userdata: array });
      })
      .catch(error => {
        console.log(error);
      });
  };
  addchange=(e)=>{
    let data=this.state.adddata;
    let name=e.target.dataset.name;
    data[name]=e.target.value;
    this.setState({
      adddata:data
    })
  }
  editchange=(e)=>{
    let data=this.state.editdata;
    let name=e.target.dataset.name;
    data[name]=e.target.value;
    this.setState({
      editdata:data
    })
  }
  edit=()=>{
    let data=this.state.editdata;
    data.modifiedby=this.state.userid;
    let errorlist=this.state.editerror;
    if(data.username===""){
      errorlist.usernameerror=true;
    }
    else{
      errorlist.usernameerror=false;
    }
    if(data.emailaddress===""){
      errorlist.emailaddresserror=true;
    }
    else{
      errorlist.emailaddresserror=false;
    }
    if(data.address===""){
      errorlist.addresserror=true;
    }
    else{
      errorlist.addresserror=false;
    }
    if(data.phone===""){
      errorlist.phoneerror=true;
    }
    else{
      errorlist.phoneerror=false;
    }
    if(data.password===""){
      errorlist.passworderror=true;
    }
    else{
      errorlist.passworderror=false;
    }
    if(this.ValidateEmail(data.emailaddress)===false){
      errorlist.emailaddresserror=true;
    }
    else{
      errorlist.emailaddresserror=false;
    }
    this.setState({
      editerror:errorlist
    })
    if(this.ValidateEmail(data.emailaddress)===true && data.password!=='' && 
    data.phone!=='' && data.username!=="" && data.address!==""){
      fetch(`${base_url}/user/updateuser`,{
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
                editapierror:false,
                editdata:{}
            },()=>{
                this.getAllUsers()
                document.querySelector("#editmodal").click()
            })
        }
        else{
            this.setState({
                editapierror:true
            })
        }
    })
      
    }
  }
  delete=()=>{
    fetch(`${base_url}/user/deleteuser/${this.state.deleteid}`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(res=>{
      if(res.message==="Successful"){
       document.querySelector("#deletemodal").click();
       this.getAllUsers();
      }
    })
  }
  addnumberchange=(e)=>{
    let data=this.state.adddata;
    if(!isNaN(e.target.value)){
        data.phone=e.target.value;
        this.setState({
            adddata:data
        })
    }
  }
  editnumberchange=(e)=>{
    let data=this.state.editdata;
    if(!isNaN(e.target.value)){
        data.phone=e.target.value;
        this.setState({
            editdata:data
        })
    }
  }
  add=()=>{
    let data=this.state.adddata;
    data.createdby=this.state.userid;
    let errorlist=this.state.adderror;
    if(data.username===""){
      errorlist.usernameerror=true;
    }
    else{
      errorlist.usernameerror=false;
    }
    if(data.emailaddress===""){
      errorlist.emailaddresserror=true;
    }
    else{
      errorlist.emailaddresserror=false;
    }
    if(data.address===""){
      errorlist.addresserror=true;
    }
    else{
      errorlist.addresserror=false;
    }
    if(data.phone===""){
      errorlist.phoneerror=true;
    }
    else{
      errorlist.phoneerror=false;
    }
    if(data.password===""){
      errorlist.passworderror=true;
    }
    else{
      errorlist.passworderror=false;
    }
    if(this.ValidateEmail(data.emailaddress)===false){
      errorlist.emailaddresserror=true;
    }
    else{
      errorlist.emailaddresserror=false;
    }
    this.setState({
      adderror:errorlist
    })
    if(this.ValidateEmail(data.emailaddress)===true && data.password!=='' && 
    data.phone!=='' && data.username!=="" && data.address!==""){
      fetch(`${base_url}/user/createuser`,{
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
                addapierror:false,
                adddata:{
                  username:'',
                  password:'',
                  emailaddress:'',
                  address:'',
                  phone:''
               }
            },()=>{
                this.getAllUsers()
                document.querySelector("#addmodal").click()
            })
        }
        else{
            this.setState({
                addapierror:true
            })
        }
      })
    }
  }
  ValidateEmail=(inputText)=>{
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(inputText.match(mailformat))
            {
                return true;
            }
            else
            {
            return false;
            }
  }
  render() {
    return (
      <div>
        <br />
        <div className="table_container">
          <div className="add">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#add"
            >
              <i className="fas fa-plus" />
              Add
            </button>
          </div>
          <DataTable
            keys="id"
            columns={columns}
            initialData={this.state.userdata}
            initialPageLength={5}
            initialSortBy={{ prop: "id", order: "descending" }}
            pageLengthOptions={[5, 20, 50]}
          />

          {/* <!-- Edit Modal --> */}
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Edit User</h4>
                </div>

                <div class="modal-body p-5">
                  <form className="form-horizontal" name="demo-form">
                  <div className='form-group'>
                    {
                        this.state.editpaierror?
                        <small className='error-txt'>User already exist</small>:''
                      }<br/>
                      <label>Username</label>
                      <input 
                        type='text' 
                        className='form-control'
                        data-name="username"
                        value={this.state.editdata.username}
                        onChange={this.editchange}
                      />
                      {
                        this.state.editerror.usernameerror?
                        <small className='error-txt'>Username is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Password</label>
                      <input 
                        type='password' 
                        className='form-control'
                        data-name="password"
                        value={this.state.editdata.password}
                        onChange={this.editchange}
                      />
                      {
                        this.state.editerror.passworderror?
                        <small className='error-txt'>Password is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Email address</label>
                      <input 
                        type='text' 
                        className='form-control'
                        data-name="emailaddress"
                        value={this.state.editdata.emailaddress}
                        onChange={this.editchange}
                      />
                      {
                        this.state.editerror.emailaddresserror?
                        <small className='error-txt'>Valid Email address is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Phone number</label>
                      <input 
                        type='text' 
                        className='form-control'
                        value={this.state.editdata.phone}
                        onChange={this.editnumberchange}
                      />
                      {
                        this.state.editerror.phoneerror?
                        <small className='error-txt'>Valid phone number is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Address</label>
                      <input 
                        type='text' 
                        className='form-control'
                        data-name='address'
                        value={this.state.editdata.address}
                        onChange={this.editchange}
                      />
                      {
                        this.state.editerror.addresserror?
                        <small className='error-txt'>Address is required</small>:''
                      }
                  </div>
                  </form>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    id="editmodal"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.edit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Delete Modal --> */}
          <div class="modal fade" id="del" role="dialog">
            <div class="modal-dialog">
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Delete</h4>
                </div>

                <div class="modal-body">
                  <p>Are you sure want to delete?</p>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    id="deletemodal"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={this.delete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Add Modal --> */}
        <div class="modal fade" id="add" role="dialog">
          <div class="modal-dialog">
            {/* <!-- Modal content--> */}
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Add New User</h4>
              </div>
              <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                  <div className='form-group'>
                    {
                        this.state.addapierror?
                        <small className='error-txt'>User already exist</small>:''
                      }<br/>
                      <label>Username</label>
                      <input 
                        type='text' 
                        className='form-control'
                        data-name="username"
                        value={this.state.adddata.username}
                        onChange={this.addchange}
                      />
                      {
                        this.state.adderror.usernameerror?
                        <small className='error-txt'>Username is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Password</label>
                      <input 
                        type='password' 
                        className='form-control'
                        data-name="password"
                        value={this.state.adddata.password}
                        onChange={this.addchange}
                      />
                      {
                        this.state.adderror.passworderror?
                        <small className='error-txt'>Password is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Email address</label>
                      <input 
                        type='text' 
                        className='form-control'
                        data-name="emailaddress"
                        value={this.state.adddata.emailaddress}
                        onChange={this.addchange}
                      />
                      {
                        this.state.adderror.emailaddresserror?
                        <small className='error-txt'>Valid Email address is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Phone number</label>
                      <input 
                        type='text' 
                        className='form-control'
                        value={this.state.adddata.phone}
                        onChange={this.addnumberchange}
                      />
                      {
                        this.state.adderror.phoneerror?
                        <small className='error-txt'>Valid phone number is required</small>:''
                      }
                  </div>
                  <div className='form-group'>
                      <label>Address</label>
                      <input 
                        type='text' 
                        className='form-control'
                        data-name='address'
                        value={this.state.adddata.address}
                        onChange={this.addchange}
                      />
                      {
                        this.state.adderror.addresserror?
                        <small className='error-txt'>Address is required</small>:''
                      }
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  id="addmodal"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.add}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

