import React from "react";
import { DataTable } from "react-data-components";
import { base_url } from "../util/Global";

const columns = [
  { title: "Stove Type", prop: "type" },
  { title: "Remark", prop: "remark" },
  { title: "Edit", prop: "Edit"},
  { title: "Delete", prop: "Delete"}
];

export default class StoveType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getalldata: [],
      createdby:props.userdata.userid,
      //edit
      editstovedata: {},
      editapierror:false,
      editerror:{
        stovetypeerror:false,
        remarkerror:false
      },
      //add
      addstovetypedata: {
        stovetype:'',
        remark:''
      },
      adderror:{
        stovetypeerror:false,
        remarkerror:false
      },
      apierror:false,
      adderrorTxt:'',
      deleteid:0
    };
  }
  componentDidMount(){
    this.getallstove();
  }
  update = () => {
    let data=this.state.editstovedata;
    data.modifiedby=this.state.createdby;
    console.log(data);
    let errorlist=this.state.editerror;
    if(data.stovetype===""){
        errorlist.stovetypeerror=true;
    }
    else{
      errorlist.stovetypeerror=false;
    }
    if(data.remark===""){
      errorlist.remarkerror=true;
    }
    else{
      errorlist.remarkerror=false;
    }
    this.setState({
      editerror:errorlist
    })
    if(data.stovetype!=="" && data.remark!==""){
      fetch(`${base_url}/stoveType/update_Stovetype`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(data => {
          if(data.message==="Successful"){
            this.setState({
              editapierror:false
            })
            this.getallstove();
            document.querySelector("#editmodal").click();
          }
          else{
            this.setState({
              editapierror:true
            })
          }
        });
    }
  };

  delete = () => {
    fetch(`${base_url}/stoveType/delete_Stovetype/${this.state.deleteid}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        if(res.message==="Successful"){
          document.querySelector("#deletemodal").click();
          this.getallstove()
        }
      });
  };

  addChange = e => {
    let add = e.target.dataset.add;
    let data = this.state.addstovetypedata;
    data[add] = e.target.value;
    this.setState(
      {
        addstovetypedata: data
      });
  };

  add = () => {
    let data=this.state.addstovetypedata;
    data.createdby=this.state.createdby;
    let errorlist=this.state.adderror;
    if(data.stovetype.trim()===""){
      errorlist.stovetypeerror=true;
    }
    else{
      errorlist.stovetypeerror=false;
    }
    if(data.remark.trim()===""){
      errorlist.remarkerror=true;
    }
    else{
      errorlist.remarkerror=false;
    }
    this.setState({
      adderror:errorlist
    },()=>{
      if(data.stovetype!=="" && data.remark!==""){
        fetch(`${base_url}/stoveType/create_stovetype`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        })
        .then(res=>{
          if(res.ok){
            return res.json();
          }
        })
        .then(res=>{
          if(res.message==="Successful"){
            this.setState({
              addstovetypedata:{
                stovetype:'',
                remark:''
              },
              apierror:false
            },()=>{
              this.getallstove()
            })
            document.querySelector("#stoveaddmodal").click();
          }
          else{
            this.setState({
              apierror:true,
              adderrorTxt:"Stove type already exist!"
            })
          }
        })

      }
    })

  };

  getallstove=()=>{
    fetch(`${base_url}/stoveType/getall`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(data=>{
      let array = []
      const size = data.length
      var i = 0
      for(i=0;i<size ; i++){
          let temp = data[i]
          let id=temp.id;
          array.push({
              type:temp.type,
              remark:temp.remark,
              Edit:
              (
                <button
                  className="btn btm-sm btn-primary"
                  data-toggle="modal"
                  data-target="#edit"
                  onClick={()=>this.setState({editstovedata:temp})}
                >
                  <i className="fas fa-pen" />
                </button>
              ),
              Delete:
              (
                <button
                  className="btn btm-sm btn-danger"
                  data-toggle="modal"
                  data-target="#delete"
                  onClick={()=>this.setState({deleteid:temp.id})}
                >
                  <i className="fas fa-trash" />
                </button>
              )
          })
      }
      this.setState({getalldata:array})
    })
  }
  updateChange=(e)=>{
    let data=this.state.editstovedata;
    let name=e.target.dataset.name;
    data[name]=e.target.value;
    this.setState({
      editstovedata:data
    })
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
              <i className="glyphicon glyphicon-plus" />
              Add
            </button>
          </div>
          <DataTable
            keys="id"
            columns={columns}
            initialData={this.state.getalldata}
            initialPageLength={5}
            initialSortBy={{ prop: "id", order: "descending" }}
            pageLengthOptions={[5, 20, 50]}
          />

          {/* <!-- Edit Modal --> */}
          <div class="modal fade" id="edit" role="dialog">
            <div class="modal-dialog">
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Edit StoveType</h4>
                </div>

                <div class="modal-body p-5">
                  <form className="form-horizontal" name="demo-form">
                    <div className="form-group">
                      {
                        this.state.editapierror?
                        <small className='error-txt'>Stock type already exist!</small>:''
                      }
                      <br/>
                      <label >Stove Type </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Stove Type"
                          data-name='type'
                          value={this.state.editstovedata.type}
                          onChange={this.updateChange}
                        />
                        {
                          this.state.editerror.stovetypeerror?
                          <small className='error-txt'>Stove Type is requried</small>:''
                        }
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Remark </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Remark"
                          value={this.state.editstovedata.remark}
                          data-name='remark'
                          onChange={this.updateChange}
                        />
                        {
                          this.state.editerror.remarkerror?
                          <small className='error-txt'>Remark is requried</small>:''
                        }
                      </div>
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
                   onClick={this.update}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Delete Modal --> */}
          <div class="modal fade" id="delete" role="dialog">
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
                  <p>Sure want to delete?</p>
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
                <h4 class="modal-title">Add New Stove Type</h4>
              </div>
              <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                  <div className="form-group">
                  {
                      this.state.apierror?
                      <small className='error-txt'>{this.state.adderrorTxt}</small>:''
                    }
                    <br/>
                    <label >
                      Stove Type
                    </label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.addstovetypedata.stovetype}
                        placeholder="Stove Type"
                        data-add="stovetype"
                        onChange={this.addChange}
                      />
                      {
                      this.state.adderror.stovetypeerror?
                      <small className='error-txt'>Stove type is required</small>:''
                    }
                    </div>
                  </div>
                  <div className="form-group">
                    <label >
                      Remark
                    </label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.addstovetypedata.remark}
                        placeholder="Remark"
                        data-add="remark"
                        onChange={this.addChange}
                      />
                    </div>
                    {
                      this.state.adderror.remarkerror?
                      <small className='error-txt'>Remark is required</small>:''
                    }
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  id="stoveaddmodal"
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
