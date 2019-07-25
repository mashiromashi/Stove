import React from "react";
import DataTable from "react-data-components/lib/DataTable";
import { base_url } from "../util/Global";

const columns = [
  { title: "No", prop: "No" },
  { title: "Region Name", prop: "Region_Name" },
  { title: "Edit", prop: "Edit" },
  { title: "Delete", prop: "Delete" }
];

export default class Region extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regiondata: [],
      userid:props.userdata.userid,
      editdata: {},
      editerror:{
        nameerror:false
      },
      editapierror:false,
      deleteid: 0,
      //create
      addregiondata: {
        name: ''
      },
      adderror:{
        nameerror:false
      }
    };
  }

  componentDidMount() {
    this.getallregion();
  }
  getallregion = () => {
    fetch(`${base_url}/region/getall`)
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        let array = [];
        const size = data.length;
        var i = 0;
        for (i = 0; i < size; i++) {
          let temp = data[i];
          array.push({
            No: (i+1),
            Region_Name:temp.name,
            Edit: (
              <button
                className="btn btm-sm btn-primary"
                data-toggle="modal"
                data-target="#edit"
                onClick={()=>this.setState({editdata:temp})}
              >
                <i className="fas fa-edit" />
              </button>
            ),
            Delete: (
              <button
                className="btn btm-sm btn-danger"
                data-toggle="modal"
                data-target="#delete"
                onClick={()=>this.setState({deleteid:temp.id})}
              >
                <i className="fas fa-trash" />
              </button>
            )
          });
        }
        this.setState({ regiondata: array });
      })
      .catch(error => {
        console.log(error);
      });
  };
  add=()=>{
    let data=this.state.addregiondata;
    data.createdby=this.state.userid;
    let errorlist=this.state.adderror;
    if(data.name===""){
      errorlist.nameerror=true;
    }
    else{
      errorlist.nameerror=false;
    }
    this.setState({
      adderror:errorlist
    })
    if(data.name!==""){
      fetch(`${base_url}/region/addregion`,{
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
          document.querySelector("#addmodal").click();
          this.getallregion();
          this.setState({
            addapierror:false,
            addregiondata:{
              name:''
            }
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
  addChange = e => {
    let data=this.state.addregiondata;
    data.name=e.target.value;
    this.setState({
      addregiondata:data
    })
  };
  editChange=e=>{
    let data=this.state.editdata;
    data.name=e.target.value;
    this.setState({
      editdata:data
    })
  }
  delete=()=>{
    fetch(`${base_url}/region/deleteregion/${this.state.deleteid}`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(res=>{
      if(res.message==="Successful"){
        document.querySelector("#deletemodal").click();
        this.getallregion();
      }
  
    })
  }
  edit=()=>{
    let data=this.state.editdata;
    data.modifiedby=this.state.userid;
    let errorlist=this.state.editerror;
    if(data.name===""){
      errorlist.nameerror=true;
    }
    else{
      errorlist.nameerror=false;
    }
    this.setState({
      editerror:errorlist
    })
    if(data.name!==""){
      fetch(`${base_url}/region/updateregion`,{
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
          document.querySelector("#editmodal").click();
          this.getallregion();
          this.setState({
            editapierror:false
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
            initialData={this.state.regiondata}
            initialPageLength={5}
            initialSortBy={{ prop: "id", order: "ascending" }}
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
                  <h4 class="modal-title">Edit Region/State</h4>
                </div>

                <div class="modal-body p-5">
                  <form className="form-horizontal" name="demo-form">
                    <div className="form-group">
                      {
                        this.state.editapierror?
                        <small className='error-txt'>Region already exist</small>:''
                      }
                      <br/>
                      <label>
                        Regin/State
                      </label>
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Region/State"
                          onChange={this.editChange}
                          value={this.state.editdata.name}
                        />
                        {
                          this.state.editerror.nameerror?
                          <small>Name is required</small>:''
                        }
                      </div>
                    </div>
                  </form>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    id="editmodal"
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
          <div class="modal fade" id="delete" role="dialog">
            <div class="modal-dialog">
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Delete Region/State</h4>
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
                <h4 class="modal-title">Add New Region</h4>
              </div>

              <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                  <div className="form-group">
                    {
                      this.state.addapierror?
                      <small className='error-txt'>Name is already exist!</small>:''
                    }
                    <br/>
                    <label>
                      Region State
                    </label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Region/State name"
                        value={this.state.addregiondata.name}
                        onChange={this.addChange}
                      />
                      {
                        this.state.adderror.nameerror?
                        <small className='error-txt'>Region name is required!</small>:''
                      }
                    </div>
                    
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
