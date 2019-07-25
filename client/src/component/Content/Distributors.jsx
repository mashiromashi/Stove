import React from "react";
import { DataTable } from "react-data-components";
import { base_url } from "../util/Global";
import Select from "react-select";

const columns = [
  { title: "No", prop: "no" },
  { title: "Distributor_Name", prop: "distributorname" },
  { title: "Distributor ID", prop: "distributorid" },
  { title: "Region", prop: "region" },
  { title: "Address", prop: "address" },
  { title: "Phone", prop: "phone" },
  { title: "Edit", prop: "Edit" },
  { title: "", prop: "Activate" }
];

export default class Distributors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userdata.userid,
      regionlist: [],

      deleteid: 0,
      distributordata: [],
      addapierror: false,
      adddata: {
        distributorname: "",
        distributorid: "",
        password: "",
        address: "",
        region: null,
        phone: ""
      },
      adderror: {
        distributornameerror: false,
        distributoriderror: false,
        passworderror: false,
        addresserror: false,
        regionerror: false,
        phoneerror: false
      },
      editapierror: false,
      editdata: {},
      editerror: {
        distributornameerror: false,
        distributoriderror: false,
        passworderror: false,
        addresserror: false,
        regionerror: false,
        phoneerror: false
      },
      activateid: 0
    };
  }

  componentDidMount() {
    this.getAllDistributors();
    this.getAllRegion();
  }
  getAllRegion = () => {
    fetch(`${base_url}/region/getall`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        let regiondrp = [];
        res.map(reg => {
          let obj = {
            label: reg.name
          };
          regiondrp.push(obj);
        });
        this.setState({
          regionlist: regiondrp
        });
      });
  };
  getAllDistributors = () => {
    fetch(`${base_url}/distributor/getall`)
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        console.log(data[1]);

        console.log(data[0].status);

        let array = [];
        const size = data.length;
        var i = 0;
        for (i = 0; i < size; i++) {
          let isActive = null;
          if (data[i].status === "Active") {
            isActive = (
              <button
                className="btn btm-sm btn-danger"
                data-toggle="modal"
                data-target="#delete"
                onClick={() => this.setState({ deleteid: temp.id })}
              >
                Dectivate
              </button>
            );
          } else {
            isActive = (
              <button
                type="button"
                class="btn btn-warning btn-sm"
                data-toggle="modal"
                data-target="#activate"
                onClick={() => {
                  this.setState({ activateid: temp.id });
                }}
              >
                Activate
              </button>
            );
          }
          let temp = data[i];
          temp.region = {
            label: temp.regionname,
            value: temp.regionid
          };
          array.push({
            no: 1 + i,
            distributorname: temp.distributorname,
            distributorid: temp.distributorid,
            address: temp.address,
            phone: temp.phone,
            region: temp.regionname,
            Edit: (
              <button
                className="btn btm-sm btn-primary"
                data-toggle="modal"
                data-target="#edit"
                onClick={() => this.setState({ editdata: temp })}
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
            ),
            Activate: isActive
          });
        }
        this.setState({ distributordata: array });
      })
      .catch(error => {
        console.log(error);
      });
  };
  add = () => {
    let data = this.state.adddata;
    data.createdby = this.state.userid;
    let errorlist = this.state.adderror;
    if (data.distributorname === "") {
      errorlist.distributornameerror = true;
    } else {
      errorlist.distributornameerror = false;
    }
    if (data.distributorid === "") {
      errorlist.distributoriderror = true;
    } else {
      errorlist.distributoriderror = false;
    }
    if (data.address === "") {
      errorlist.addresserror = true;
    } else {
      errorlist.addresserror = false;
    }
    if (data.phone === "") {
      errorlist.phoneerror = true;
    } else {
      errorlist.phoneerror = false;
    }
    if (data.password === "") {
      errorlist.passworderror = true;
    } else {
      errorlist.passworderror = false;
    }
    if (data.region === null) {
      errorlist.regionerror = true;
    } else {
      errorlist.regionerror = false;
    }
    this.setState({
      adderror: errorlist
    });
    if (
      data.distributorname !== "" &&
      data.distributorid !== "" &&
      data.region !== null &&
      data.address !== "" &&
      data.password !== "" &&
      data.phone !== ""
    ) {
      fetch(`${base_url}/distributor/adddistributor`, {
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
            this.setState(
              {
                addapierror: false,
                adddata: {
                  distributorname: "",
                  distributorid: "",
                  password: "",
                  address: "",
                  region: null,
                  phone: ""
                }
              },
              () => {
                this.getAllDistributors();
                document.querySelector("#addmodal").click();
              }
            );
          } else {
            this.setState({
              addapierror: true
            });
          }
        });
    }
  };
  delete = () => {
    fetch(`${base_url}/distributor/deletedistributor/${this.state.deleteid}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        if (res.message === "Successful") {
          document.querySelector("#deletemodal").click();
          this.getAllDistributors();
        }
      });
  };

  activate = () => {
    fetch(
      `${base_url}/distributor/activatedistributor/${this.state.activateid}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        if (res.message === "Successful") {
          document.querySelector("#activatemodal").click();
          this.getAllDistributors();
        }
      });
  };

  edit = () => {
    let data = this.state.editdata;
    data.modifiedby = this.state.userid;
    let errorlist = this.state.editerror;
    if (data.distributorname === "") {
      errorlist.distributornameerror = true;
    } else {
      errorlist.distributornameerror = false;
    }
    if (data.distributorid === "") {
      errorlist.distributoriderror = true;
    } else {
      errorlist.distributoriderror = false;
    }
    if (data.address === "") {
      errorlist.addresserror = true;
    } else {
      errorlist.addresserror = false;
    }
    if (data.phone === "") {
      errorlist.phoneerror = true;
    } else {
      errorlist.phoneerror = false;
    }
    if (data.password === "") {
      errorlist.passworderror = true;
    } else {
      errorlist.passworderror = false;
    }
    if (data.region === null) {
      errorlist.regionerror = true;
    } else {
      errorlist.regionerror = false;
    }
    this.setState({
      editerror: errorlist
    });
    if (
      data.distributorname !== "" &&
      data.distributorid !== "" &&
      data.region !== null &&
      data.address !== "" &&
      data.password !== "" &&
      data.phone !== ""
    ) {
      fetch(`${base_url}/distributor/updatedistributor`, {
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
            this.setState(
              {
                editapierror: false,
                editdata: {}
              },
              () => {
                this.getAllDistributors();
                document.querySelector("#editmodal").click();
              }
            );
          } else {
            this.setState({
              editapierror: true
            });
          }
        });
    }
  };
  addchange = e => {
    let data = this.state.adddata;
    let name = e.target.dataset.name;
    data[name] = e.target.value;
    this.setState({
      adddata: data
    });
  };
  editchange = e => {
    let data = this.state.editdata;
    let name = e.target.dataset.name;
    data[name] = e.target.value;
    this.setState({
      editdata: data
    });
  };
  addregionchange = value => {
    let data = this.state.adddata;
    data.region = value;
    this.setState({
      adddata: data
    });
  };
  editregionchange = value => {
    let data = this.state.editdata;
    data.region = value;
    this.setState({
      editdata: data
    });
  };
  numberchange = e => {
    let data = this.state.adddata;
    if (!isNaN(e.target.value)) {
      data.phone = e.target.value;
      this.setState({
        adddata: data
      });
    }
  };
  editnumberchange = e => {
    let data = this.state.editdata;
    if (!isNaN(e.target.value)) {
      data.phone = e.target.value;
      this.setState({
        editdata: data
      });
    }
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
            initialData={this.state.distributordata}
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
                  <h4 class="modal-title">Edit Distributors</h4>
                </div>

                <div class="modal-body p-5">
                  <form className="form-horizontal" name="demo-form">
                    <div className="form-group">
                      {this.state.editapierror ? (
                        <small className="error-txt">
                          Distributor name already exist!
                        </small>
                      ) : (
                        ""
                      )}
                      <br />
                      <label>Distributor Name</label>
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Distributor Name"
                          data-name="distributorname"
                          value={this.state.editdata.distributorname}
                          onChange={this.editchange}
                        />
                        {this.state.editerror.distributornameerror ? (
                          <small className="error-txt">
                            Distributor name is required
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Distributor ID</label>
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Distributor ID"
                          data-name="distributorid"
                          value={this.state.editdata.distributorid}
                          onChange={this.editchange}
                        />
                        {this.state.editerror.distributoriderror ? (
                          <small className="error-txt">
                            Distributor ID is required
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <div>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          data-name="password"
                          value={this.state.editdata.password}
                          onChange={this.editchange}
                        />
                        {this.state.editerror.passworderror ? (
                          <small className="error-txt">
                            Valid email address is required
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Address"
                          data-name="address"
                          value={this.state.editdata.address}
                          onChange={this.editchange}
                        />
                        {this.state.editerror.addresserror ? (
                          <small className="error-txt">
                            Address is required
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Region</label>
                      <div>
                        <Select
                          options={this.state.regionlist}
                          value={this.state.editdata.region}
                          onChange={this.editregionchange}
                        />
                        {this.state.editerror.regionerror ? (
                          <small className="error-txt">
                            Region is required
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.editdata.phone}
                          placeholder="Phone number"
                          onChange={this.editnumberchange}
                        />
                        {this.state.editerror.phoneerror ? (
                          <small className="error-txt">
                            Phone number is required
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
          {/* Activate Modal */}
          <div class="modal fade" id="activate" role="dialog">
            <div class="modal-dialog">
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Activate</h4>
                </div>

                <div class="modal-body">
                  <p>Sure want to Activate?</p>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    id="activatemodal"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={this.activate}
                  >
                    Activate
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
                <h4 class="modal-title">Add New Distributors</h4>
              </div>

              <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                  <div className="form-group">
                    {this.state.addapierror ? (
                      <small className="error-txt">
                        Distributor name already exist!
                      </small>
                    ) : (
                      ""
                    )}
                    <br />
                    <label>Distributor Name</label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Distributor Name"
                        data-name="distributorname"
                        value={this.state.adddata.distributorname}
                        onChange={this.addchange}
                      />
                      {this.state.adderror.distributornameerror ? (
                        <small className="error-txt">
                          Distributor name is required
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Distributor ID</label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Distributor ID"
                        data-add="distributorid"
                        data-name="distributorid"
                        value={this.state.adddata.distributorid}
                        onChange={this.addchange}
                      />
                      {this.state.adderror.distributoriderror ? (
                        <small className="error-txt">
                          Distributor ID is required
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        data-add="password"
                        data-name="password"
                        value={this.state.adddata.password}
                        onChange={this.addchange}
                      />
                      {this.state.adderror.passworderror ? (
                        <small className="error-txt">
                          Password is required
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Address"
                        data-add="address"
                        data-name="address"
                        value={this.state.adddata.address}
                        onChange={this.addchange}
                      />
                      {this.state.adderror.addresserror ? (
                        <small className="error-txt">Address is required</small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Region</label>
                    <div>
                      <Select
                        options={this.state.regionlist}
                        value={this.state.adddata.region}
                        onChange={this.addregionchange}
                      />
                      {this.state.adderror.regionerror ? (
                        <small className="error-txt">Region is required</small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.adddata.phone}
                        placeholder="Phone number"
                        onChange={this.numberchange}
                      />
                      {this.state.adderror.phoneerror ? (
                        <small className="error-txt">
                          Phone number is required
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
