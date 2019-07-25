import React from "react";
import { DataTable } from "react-data-components";
import { base_url } from "../util/Global";
import { CSVLink, CSVDownload } from "react-csv";
import Select from "react-select";
import moment from "moment";

let columns = [
  { title: "ID", prop: "id" },
  { title: "Serial Number", prop: "serial_number" },
  { title: "Beneficiary name", prop: "beneficiary_name" },
  { title: "Beneficiary Mom Name", prop: "beneficiary_mom_name" },
  { title: "Existing Cooking Fuel", prop: "existing_cooking_fuel" },
  { title: "Existing Stove Technology", prop: "existing_stove_technology" },
  { title: "Model Name", prop: "model_name" },
  { title: "Retailer name", prop: "retailer_name" },
  { title: "Retailer Mom Name", prop: "retailer_mom_name" },
  { title: "Mobile Number", prop: "mobile_number" },
  { title: "Distributor Name", prop: "distributorname" },
  { title: "Distribution Date", prop: "distribution_date" },
  { title: "Region Name", prop: "regionname" },
  { title: "Township Name", prop: "townshipname" },
  { title: "Village Name", prop: "villagename" }
];

const csvHeaders = [
  { label: "ID", key: "id" },
  { label: "Serial Number", key: "serial_number" },
  { label: "Beneficiary name", key: "beneficiary_name" },
  { label: "Beneficiary Mom Name", key: "beneficiary_mom_name" },
  { label: "Existing Cooking Fuel", key: "existing_cooking_fuel" },
  { label: "Existing Stove Technology", key: "existing_stove_technology" },
  { label: "Model Name", key: "model_name" },
  { label: "Retailer name", key: "retailer_name" },
  { label: "Retailer Mom Name", key: "retailer_mom_name" },
  { label: "Mobile Number", key: "mobile_number" },
  { label: "Distributor Name", key: "distributorname" },
  { label: "Distribution Date", key: "distribution_date" },
  { label: "Region Name", key: "regrionname" },
  { label: "Township Name", key: "townshipname" },
  { label: "Village Name", key: "villagename" }
];

export default class Sales extends React.Component {
  // ExportCSV = ({ csvData, fileName }) => {
  //     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     const fileExtension = ".xlsx"

  //     const exportToCSV = (csvData, fileName) => {
  //         const ws = XLSX.utils.json_to_sheet(csvData);
  //         const wb = { Sheets: { 'data': ws }, sheetNames: ['data'] }
  //         const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  //         const data = new Blob([excelBuffer], { type: fileType })
  //         FileSaver.saveAs(data, fileName + fileExtension)

  //     }
  // }

  constructor(props) {
    super(props);
    this.state = {
      saleorderlist: [],
      distList: [],
      selectedOption: 0
    };
  }
  componentDidMount() {
    this.getallsaleorder();
    this.getAllDistributor();
  }
  getallsaleorder = () => {
    fetch(`${base_url}/sale/getall`)
      .then(res => {
        //console.log(res);

        if (res.ok) return res.json();
      })
      .then(data => {
        let array = [];
        for (let i = 0; i < data.length; i++) {
          let temp = data[i];

          array.push({
            id: temp.id,
            serial_number: temp.serial_number,
            beneficiary_name: temp.beneficiary_name,
            beneficiary_mom_name: temp.beneficiary_mom_name,
            existing_cooking_fuel: temp.existing_cooking_fuel,
            existing_stove_technology: temp.existing_stove_technology,
            model_name: temp.model_name,
            retailer_name: temp.retailer_name,
            retailer_mom_name: temp.retailer_mom_name,
            mobile_number: temp.mobile_number,
            distributorname: temp.distributorname,
            distribution_date: temp.distribution_date,
            regionname: temp.regionname,
            townshipname: temp.townshipname,
            villagename: temp.villagename
          });
        }
        this.setState({ saleorderlist: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getAllDistributor = () => {
    fetch(`${base_url}/distributor/getall`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        let distDrop = [];
        res.map(dist => {
          let obj = {
            label: dist.distributorname,
            value: dist.id
          };
          distDrop.push(obj);
        });
        this.setState({
          distList: distDrop
        });
      });
  };

  _handleDistChange = selectedOption => {
    this.setState({
      selectedOption
    });
    console.log(selectedOption.value);
  };

  getSaleByDistributor = () => {
    fetch(`${base_url}/sale/getsalebydistributor/${this.state.selectedOption}`)
      .then(res => {
        console.log(res);

        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);

        let saleOrderArray = [];
        for (let i = 0; i < data.length; i++) {
          let temp = data[i];

          saleOrderArray.push({
            id: temp.id,
            serial_number: temp.serial_number,
            beneficiary_name: temp.beneficiary_name,
            beneficiary_mom_name: temp.beneficiary_mom_name,
            existing_cooking_fuel: temp.existing_cooking_fuel,
            existing_stove_technology: temp.existing_stove_technology,
            model_name: temp.model_name,
            retailer_name: temp.retailer_name,
            retailer_mom_name: temp.retailer_mom_name,
            mobile_number: temp.mobile_number,
            distributorname: temp.distributorname,
            distribution_date: temp.distribution_date,
            regionname: temp.regionname,
            townshipname: temp.townshipname,
            villagename: temp.villagename
          });
        }
        this.setState({
          saleorderlist: saleOrderArray
        });
      });
  };
  render() {
    return (
      <div>
        <br />
        <div className="grid-container">
          <div />
          <div>
            <label for="dateofbirth">Start Date</label>
            <input type="date" name="dateofbirth" id="dateofbirth" />
          </div>
          <div>
            <label for="dateofbirth">End Date</label>
            <input type="date" name="dateofbirth" id="dateofbirth" />
          </div>
          <div className="importsaledata">
            <button type="button" class="btn btn-primary">
              Import Sales Data
            </button>
          </div>
          <div className="exportsaledata">
            <CSVLink
              className="btn btn-primary"
              headers={csvHeaders}
              data={this.state.saleorderlist}
              filename={`${moment(new Date()).format("DD-MM-YYYY")}.xlsx`}
            >
              Export Sales Data
            </CSVLink>
          </div>
          <div className="distDropdown">
            <Select
              options={this.state.distList}
              value={this.state.selectedOption}
              onChange={this._handleDistChange}
              onMenuClose={this.getSaleByDistributor}
            />
          </div>
        </div>

        <br />

        <div className="table_container">
          <DataTable
            keys="id"
            columns={columns}
            initialData={this.state.saleorderlist}
            initialPageLength={10}
            initialSortBy={{ prop: "id", order: "ascending" }}
            pageLengthOptions={[5, 20, 50]}
          />
        </div>
      </div>
    );
  }
}
