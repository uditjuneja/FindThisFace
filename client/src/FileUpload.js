import { FilePond, File,registerPlugin } from 'react-filepond';
import React from "react";
import { CsvToHtmlTable } from 'react-csv-to-table';
import  { post } from 'axios';
import Modal from "react-responsive-modal";

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import './style.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin( FilePondPluginFileValidateType);


class FileUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            results:null,
            email:'',
            check:true,
            open:false
        };
        this.readFileContent=this.readFileContent.bind(this);
        this.renderTable=this.renderTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onOpenModal=this.onOpenModal.bind(this)
        this.onCloseModal=this.onCloseModal.bind(this)
    }


    componentDidMount() {
      this.interval = setInterval(() => {
        if (this.state.files.length>0)
          this.readFileContent(this.state.files[0]);
        else
          this.setState({results:''})
      }, 500);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
  
    onCloseModal = () => {
      this.setState({ open: false });
    };

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    renderTable(){
      if (this.state.results){
        console.log('rendering table');
        return(
          <div style={{overflowX:'scroll',width:'80vw',margin:'auto',textAlign:'center',background:'#EAF0F1',padding:10,borderRadius:10}}>
            <div style={{fontFamily:'roboto',color:'#2F363F'}}>
              <h2 >File Preview</h2>
              <input
                name="check"
                type="checkbox"
                checked={this.state.check}
                onChange={this.handleInputChange}
              />
              <label> Use default weights [-1,1]</label>
              <ul style={{listStyleType:'none'}}>
               <li>Make sure target column is in gray color.</li>
               {!this.state.check && <li>Make sure minimum weights are highlighted with red color</li>}
               {!this.state.check && <li>Make sure maximum weights are highlighted with yellow color</li>}
              </ul>
              
            </div>
            <CsvToHtmlTable
            data={this.state.results}
            csvDelimiter=","
            tableClassName="cinereousTable"
           />
          </div>
        )
      }
    }
    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    readFileContent(file) {
      const reader = new FileReader()
      reader.onloadend = function(evt){
          if (evt.target.readyState === FileReader.DONE) {  // DONE == 2
              this.setState({results:evt.target.result,flag:true})
              console.log('readFileContent completed')
          }
      }.bind(this);
      var blob = file.slice(0, 800);
      reader.readAsBinaryString(blob);
    }

    handleChange(event) {
      this.setState({email: event.target.value});
    }

    handleSubmit(event) {
      //console.log(this.state);
      event.preventDefault();
      this.fileUpload(this.state).then((response)=>{
        console.log('Data\n'+ response.data);
      })
      this.setState({open:true});
    }

    fileUpload({files,email,check}){
      const url = '/submit';
      const formData = new FormData();
      formData.append('files',files[0])
      formData.append('email',email)
      var check1 = check?"true":"false"
      formData.append('check',check1)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return  post(url, formData,config)
    }

    render() {
      console.log('state rendered')
        return (
          <div >
            {/* Pass FilePond properties as attributes */}
            <FilePond ref={ref => this.pond = ref}
              acceptedFileTypes =  {['application/vnd.ms-excel','.csv']}
              dropValidation={true}
              oninit={() => this.handleInit() }
              onupdatefiles={(fileItems) => {
                  // Set current file objects to this.state
                  this.setState({
                      files: fileItems.filter(fileItem => fileItem.file.name.split('.').pop()==='csv').map(fileItem => fileItem.file)
                  });
                  
              }}>
                
              {/* Update current files  */}
              {this.state.files.map(file => (
                  <File key={file} src={file} origin="local" />
              ))}
                
            </FilePond>
            <form onSubmit={this.handleSubmit} style={styles.form} method='post'>
              <label style={styles.label}>Email: </label>
                <input type="email" value={this.state.email} onChange={this.handleChange} style={styles.email}/>
                <button type="submit" disabled={!this.state.email || !this.state.files.length} style={styles.submit} >Submit</button>
            </form>
            {this.renderTable()}
            <Modal 
              open={this.state.open} 
              onClose={this.onCloseModal} 
              onExited = {()=> this.setState({files:[],results:'',email:''})}
              center>
              <div
                style={{
                  fontFamily:'roboto',
                  fontSize:20,
                  marginTop:50
                }}
              >Thank you for using our web service. Results will be mailed to {this.state.email}</div>
              <div style={{
                    display:'flex',flexDirection:'row',justifyContent:'space-evenly',
                    paddingTop:50,flexWrap:'wrap'
                }}>
                </div>
            </Modal>                
          </div>
        );
    }
}
export default FileUpload;

const styles={
  form:{
    textAlign:'center',

  },
  label:{
    fontSize:20,
    fontFamily:'roboto'
  },
  email:{
    border:'none',
    borderBottom:'1px dashed #83A4C5',
    margin:'10px 3px',    
    fontStyle:'italic',
    width:210,
    background:'transparent',
    fontFamily:'roboto',
    fontSize:20,
    color:'#1e1e1e'
  },
  submit:{
    padding:'7px 30px',
    fontFamily:'roboto',
    borderRadius:'10px',
    cursor:'pointer',
    marginLeft:'5px',
    fontSize:15,
    margin:'10px 3px'
  }
}