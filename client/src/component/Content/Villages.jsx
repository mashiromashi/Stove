import React from "react";
import { DataTable } from "react-data-components";
import { base_url } from "../util/Global";
import Select from 'react-select';
const columns = [
  { title: "No", prop: "id" },
  { title: "Village Name", prop: "villagename" },
  { title: "Township", prop: "selectedTownship" },
  { title: "Edit", prop: "Edit" },
  { title: "Delete", prop: "Delete" }
];

export default class Villages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     userdata:props.userdata.userid,
     townshiplists:[],
     villagedata:[],
     editdata:{},
     editerror:{
      villagenameerror:false,
      townshiperror:false,
     },
     adddata:{
        villagename:'',
        selectedTownship:null
     },
     adderror:{
        villagenameerror:false,
        townshiperror:false
     },
     editapierror:false,
     addapierror:false,
     deleteid:0
    };
  }

  componentDidMount() {
    this.getAllVillages();
    this.getAllTownship();
  }
  getAllTownship=()=>{
    fetch(`${base_url}/township/getall`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(res=>{
      let townshipdrp=[];
      res.map(reg=>{
        let obj={
          label:reg.name,
          value:reg.id
        }
        townshipdrp.push(obj);
      })
      this.setState({
        townshiplists:townshipdrp
      })
    })
  }
  getAllVillages = () => {
    fetch(`${base_url}/village/getall`)
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        let array = [];
        const size = data.length;
        var i = 0;
        for (i = 0; i < size; i++) {
          let temp = data[i];
          temp.selectedTownship={
            label:temp.townshipname,
            value:temp.townshipid
          }
          array.push({
            id: (i+1),
            villagename: temp.villagename,
            selectedTownship:temp.townshipname,
            Edit: (
              <button
                className="btn btm-sm btn-primary glyphicon glyphicon-edit"
                data-toggle="modal"
                data-target="#myModal"
                data-list={JSON.stringify(temp)}
                onClick={this.seteditdata.bind(this)}
              >
                
              </button>
            ),
            Delete: (
              <button
                className="btn btm-sm btn-danger"
                data-toggle="modal"
                data-target="#del"
                onClick={()=>this.setState({deleteid:temp.id})}
              >
                <i className="glyphicon glyphicon-trash" />
              </button>
            )
          });
        }
        this.setState({ villagedata: array });
      })
      .catch(error => {
        console.log(error);
      });
  };
  seteditdata=(e)=>{
    console.log(e.target);
    let data=JSON.parse(e.target.dataset.list);
    this.setState({
      editdata:data,
      editapierror:false
    })
  }
  addChange=(e)=>{
    let data=this.state.adddata;
    let name=e.target.dataset.name;
    data[name]=e.target.value;
    this.setState({
      adddata:data
    })
  }
  editChange=(e)=>{
    let data=this.state.editdata;
    let name=e.target.dataset.name;
    data[name]=e.target.value;
    this.setState({
      editdata:data
    })
  }
  townshipChange=(value)=>{
    let data=this.state.adddata;
    data.selectedTownship=value;
    this.setState({
      adddata:data
    })
  }
  edittownshipChange=(value)=>{
    let data=this.state.editdata;
    data.selectedTownship=value;
    this.setState({
      editdata:data
    })
  }
  add=()=>{
   let data=this.state.adddata;
   data.createdby=this.state.userdata;
   let errorlist=this.state.adderror;
   if(data.villagename===""){
     errorlist.villagenameerror=true;
   }
   else{
     errorlist.villagenameerror=false;
   }
   if(data.selectedTownship===null){
     errorlist.townshiperror=true;
   }
   else{
     errorlist.townshiperror=false;
   }
   this.setState({
     adderror:errorlist
   })
   if(data.selectedTownship!==null && data.villagename!==""){
      fetch(`${base_url}/village/addvillage`,{
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
          this.getAllVillages();
          this.setState({
              addapierror:false,
              adderror:{
                villagenameerror:false,
                regionerror:false,
                townshiperror:false
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
  edit=()=>{
    let data=this.state.editdata;
   data.modifiedby=this.state.userdata;
   let errorlist=this.state.editerror;
   if(data.villagename===""){
     errorlist.villagenameerror=true;
   }
   else{
     errorlist.villagenameerror=false;
   }
   if(data.township===""){
     errorlist.townshiperror=true;
   }
   else{
     errorlist.townshiperror=false;
   }
   if(data.region===null){
     errorlist.regionerror=true;
   }
   else{
     errorlist.regionerror=false;
   }
   this.setState({
     editerror:errorlist
   })
   if(data.township!=="" && data.region!==null && data.villagename!==""){
    fetch(`${base_url}/village/updatevillage`,{
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
          editapierror:false
        })
        document.querySelector("#editmodal").click();
        this.getAllVillages();
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
    fetch(`${base_url}/village/deletevillage/${this.state.deleteid}`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })
    .then(res=>{
      if(res.message==="Successful"){
       document.querySelector("#deletemodal").click();
       this.getAllVillages();
      }
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
            initialData={this.state.villagedata}
            initialPageLength={5}
            initialSortBy={{ prop: "id", order: "descending" }}
            pageLengthOptions={[5, 20, 50]}
          />

          {/* <!-- Edit Modal --> */}
          <div class="modal fade" id="myModal" role="dialog"
          >
            <div class="modal-dialog">
              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 class="modal-title">Edit Village</h4>
                </div>
                <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                    {
                      this.state.editapierror?
                      <small className='error-txt'>Village already exist!</small>:''
                    }
                    <br/>
                  <div className='form-group'>
                    <Select
                        placeholder="Select region" 
                        value={this.state.editdata.selectedTownship}
                        options={this.state.townshiplists} 
                        onChange={this.edittownshipChange}
                      />
                  </div>
                  <div className="form-group">
                    
                    <label>
                      Village Name
                    </label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Village Name"
                        data-name="villagename"
                        value={this.state.editdata.villagename}
                        onChange={this.editChange}
                      />
                      {
                        this.state.editerror.villagenameerror?
                        <small className='error-txt'>Village name is required!</small>:''
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
                <h4 class="modal-title">Add New Village</h4>
              </div>

              <div class="modal-body p-5">
                <form className="form-horizontal" name="demo-form">
                    {
                      this.state.addapierror?
                      <small className='error-txt'>Village already exist!</small>:''
                    }
                    <br/>
                <div className="form-group">
                    <label>
                      Township
                    </label>
                    <div>
                      <Select
                        placeholder="Select township" 
                        value={this.state.adddata.selectedTownship}
                        options={this.state.townshiplists} 
                        onChange={this.townshipChange}
                      />
                      {
                        this.state.adderror.townshiperror?
                        <small className='error-txt'>Township is required!</small>:''
                      }
                    </div>
                  </div>
                  <div className="form-group">
                    
                    <label>
                      Village Name
                    </label>
                    <div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Village Name"
                        data-name="villagename"
                        value={this.state.adddata.villagename}
                        onChange={this.addChange}
                      />
                      {
                        this.state.adderror.villagenameerror?
                        <small className='error-txt'>Village name is required!</small>:''
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
