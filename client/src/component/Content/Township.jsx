import React, { Component } from "react";
import DataTable from "react-data-components/lib/DataTable";
import { base_url } from "../util/Global";
import Select from 'react-select';
const columns = [
  { title: "No", prop: "No" },
  { title: "Township Name", prop: "name" },
  { title: "Township Status", prop: "status" },
  { title: "Edit", prop: "Edit" },
  { title: "Delete", prop: "Delete" }
];
class Township extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townshipData: [],
      userid: props.userdata.userid,
      editdata: {},
      editError: {},
      editApiError: false,
      deleteid: 0,
      //add township data
      addTownshipData: {
        name: "",
        selectedRegion:null
      },
      addError: {
        nameError: false,
        regionError:false
      },
      regionlists:[]
    };

  }

  componentDidMount() {
    this.getAllTownships();
    this.getAllRegion();
  }
  getAllRegion=()=>{
    fetch(`${base_url}/region/getall`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(res=>{
      let ary=[];
      res.map(item=>{
        let obj={
          label:item.name,
          value:item.id
        }
        ary.push(obj);
      })
      this.setState({
        regionlists:ary
      })
    })
  }
  getAllTownships = () => {
    fetch(`${base_url}/township/getall`)
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        let array = [];
        for (let i = 0; i < data.length; i++) {
          let temp = data[i];
          temp.selectedRegion={
            label:temp.regionname,
            value:temp.region_id
          }
          array.push({
            No: i + 1,
            name: temp.name,
            status: temp.status,
            Edit: (
              <button
                className="btn btm-sm btn-primary"
                data-toggle="modal"
                data-target="#edit"
                onClick={() =>
                  this.setState({ editdata: temp }, () =>
                    console.log(this.state.editdata)
                  )
                }
              >
                <i className="fas fa-edit" />
              </button>
            ),
            Delete: (
              <button
                className="btn btm-sm btn-danger"
                data-toggle="modal"
                data-target="#delete"
                onClick={() => this.setState({ deleteid: temp.id })}
              >
                <i className="fas fa-trash" />
              </button>
            )
          });
        }
        this.setState({ townshipData: array });
      })
      .catch(error => {
        console.log(error);
      });
  };
  changeRegion=(value)=>{
    const {addTownshipData}=this.state;
    addTownshipData.selectedRegion=value;
    this.setState({
      addTownshipData
    })
  }
  editchangeRegion=(value)=>{
    const {editdata}=this.state;
    editdata.selectedRegion=value;
    this.setState({
      editdata
    })
  }
  add = () => {
    let data = this.state.addTownshipData;
    data.createdby = this.state.userid;
    let errorList = this.state.addError;
    if (data.name === "") {
      errorList.nameError = true;
    } else {
      errorList.nameError = false;
    }
    if(data.selectedRegion===null){
      errorList.regionError = true;
    }
    else{
      errorList.regionError = false;
    }
    this.setState({
      addError: errorList
    });
    if (data.name !== "" && data.selectedRegion!==null) {
      fetch(`${base_url}/township/createTownship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(res => {
          if (res.message === "Successful") {
            document.querySelector("#addmodal").click();
            this.getAllTownships();
            this.setState({
              addApiError: false,
              addTownshipData: {
                name: "",
                selectedRegion:null
              }
            });
          } else {
            this.setState({
              addApiError: true
            });
          }
        });
    }
  };

  addChange = e => {
    let data = this.state.addTownshipData;
    data.name = e.target.value;
    this.setState({
      addTownshipData: data
    });
  };

  editChange = e => {
    let data = this.state.editdata;
    let name = e.target.dataset.name;
    data[name] = e.target.value;
    this.setState({
      editdata: data
    });
  };

  edit = () => {
    let data = this.state.editdata;
    data.modifiedby = this.state.userid;
    let errorList = this.state.editError;

    if (data.name === "") {
      errorList.nameError = true;
    } else {
      errorList.nameError = false;
    }
    if (data.selectedRegion === null) {
      errorList.regionError = true;
    } else {
      errorList.regionError = false;
    }
    this.setState({
      editError: errorList
    });
    if (data.name !== "" && data.selectedRegion!==null) {
      fetch(`${base_url}/township/updateTownship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(res => {
          if (res.message === "Successful") {
            document.querySelector("#editmodal").click();
            this.getAllTownships();
            this.setState({
              editApiError: false
            });
          } else {
            this.setState({
              editApiError: true
            });
          }
        });
    }
  };

  delete = () => {
    fetch(`${base_url}/township/deleteTownship/${this.state.deleteid}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        if (res.message === "Successful") {
          document.querySelector("#deletemodal").click();
          this.getAllTownships();
        }
      });
  };
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
            initialData={this.state.townshipData}
            initialPageLength={5}
            initialSortBy={{ prop: "id", order: "ascending" }}
            pageLengthOptions={[5, 20, 30]}
          />
          {/* Edit Modal */}
          <div class="modal fade" id="edit" role="dialog">
            <div class="modal-dialog">
              {/* Modal Content */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Edit Township</h4>
                </div>
                <div class="modal-body p-5">
                  <form className="form-horizontal" name="demo-form">
                  {this.state.editApiError ? (
                        <small className="error-txt">
                          Township already exists
                        </small>
                      ) : (
                        ""
                      )}
                      <br />
                    <div className="form-group">
                    {this.state.editError.regionError ? (
                          <small>Region is Required</small>
                        ) : (
                          ""
                        )}<br/>
                      <Select
                        placeholder="Select Region" 
                        value={this.state.editdata.selectedRegion}
                        options={this.state.regionlists} 
                        onChange={this.editchangeRegion}
                      />
                    </div>
                    <div className="form-group">
                      <label>Township</label>
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Township"
                          data-name="name"
                          onChange={this.editChange}
                          value={this.state.editdata.name}
                        />
                        {this.state.editError.nameError ? (
                          <small className='error-txt'>Name is Required</small>
                        ) : (
                          ""
                        )}
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
                    type="buttton"
                    class="btn btn-primary"
                    onClick={this.edit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          <div class="modal fade" id="delete" role="dialog">
            <div class="modal-dialog">
              {/* Modal Content */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Delete Township</h4>
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
                <h4 class="modal-title">Add New Township</h4>
              </div>

              <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                  {this.state.addApiError ? (
                      <small className="error-txt">
                        Name is already exist!
                      </small>
                    ) : (
                      ""
                    )}
                    <br />
                  <div className="form-group">
                  {this.state.addError.regionError? (
                      <small className="error-txt">
                       Region is required!
                      </small>
                    ) : (
                      ""
                    )}<br/>
                    <Select
                        placeholder="Select Region" 
                        value={this.state.addTownshipData.selectedRegion}
                        options={this.state.regionlists} 
                        onChange={this.changeRegion}
                      />
                  </div>
                  <div className="form-group">
                    <label>Township Name</label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Township Name"
                        value={this.state.addTownshipData.name}
                        onChange={this.addChange}
                      />
                      {this.state.addError.nameError ? (
                        <small className="error-txt">
                          Township name is required!
                        </small>
                      ) : (
                        ""
                      )}
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

export default Township;
