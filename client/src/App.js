import React, { Component } from 'react';
import './App.css';
import FileUpload from './FileUpload'
import  { post } from 'axios';
//import bg from './images/backgroundImage.png'
import Modal from "react-responsive-modal";
import DisplayResult from './DisplayResult'


class App extends Component {
  constructor(props){
    super(props);
    this.initialState={
      image:[],
      email:'',
      width:50,
      open:false,
      results:[{name:'NAN',rollno:'NAN'}],
      year:'second',
      processing:'Idle  ... zzz'
     
    }
    this.state = this.initialState;
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.renderFileUpload = this.renderFileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.onOpenModal=this.onOpenModal.bind(this);
    this.onCloseModal=this.onCloseModal.bind(this);

  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleFieldChange(fieldId, value) {
    this.setState({image:value});  
  }

  handleEmailChange(event){
    this.setState({email:event.target.value})
  }
  handleWidthChange(event){
    this.setState({width:event.target.value})
  }


  renderFileUpload(k){
    return (
       <FileUpload
            id={k}
            onChange={this.handleFieldChange}
        />      
    )
  }
  handleSubmit(event) {
    //console.log(this.state);
    event.preventDefault();
    this.setState({
   
      processing:'Processing  ... Please wait !'
    });

    //this.onOpenModal();
   
    

    this.fileUpload().then((response)=>{
      this.setState({
        results:response.data,
        processing:'Done !!'
      });
      
      console.log('Response is: \n'+ response.data);
      //return this.readcsvfile();
      })
  }

  fileUpload(){
    const url = '/submit';
    const formData = new FormData();
    formData.append('email',this.state.email);
    formData.append('width',this.state.width);
    formData.append('fileExt',this.state.image[0].name.split('.').pop())    
    formData.append('files',this.state.image[0])
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }
  // readcsvfile(){
  //   let reader=new FileReader();
  //   reader.readAsText("./result_csv.csv");
  //   console.log('reader',reader);
  // }
// readcsvfile(){
//   var csvFilePath = require("./result_csv.csv");
//   console.log('i am in readcsv');
//   Papa.parse(csvFilePath, {
//     header: true,
//     download: true,
//     skipEmptyLines: true,
//     // Here this is also available. So we can call our custom class method
//     complete: this.updatecsvdata
//   });
// }
  // updatecsvdata(result) {
  //   console.log(result);
  //   var data = result.data;
  //   this.setState({
  //     results:data
  //   });
  // }
  
  render() { 
    return (
      <div style={{textAlign:'center',backgroundColor:'white',backgroundSize:'cover',paddingBottom:100,paddingTop:50}}>
        <div style={styles.glowingText}>
            Find this Face
        </div>
               
        
        <div style={styles.form}>
                {this.renderFileUpload('Upload Image')} <br/>
      
         
          
          <label style={styles.label}>Tolerance : </label> 
          <input type="number" value={this.state.width} onChange={this.handleWidthChange} style={{...styles.input,...{width:120}}} required={true}/><pr>%</pr>
       
         <p> (the more it is , more is the number of predicted results)</p>
          <form onSubmit={this.handleSubmit} method='post'>
            <label style={styles.label}>your_name: </label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} style={styles.input} required={true}/><pr>(No Spaces)</pr>
            <br/><br/>
            <b> Developed By : Prayag Lehana</b><br/><br/>
            <button  type="submit" style={styles.button}>
              Find Matches
            </button><br/>
            <label>State : {this.state.processing}</label><br/>
            <label> Matches Found With </label>
            
            <DisplayResult results={this.state.results}/>
            
     
        </form>
        </div>
   
        <Modal 
              open={this.state.open} 
              onClose={this.onCloseModal} 
              onExited = {()=> this.setState(this.initialState)}
              center>
              <div
                style={{
                  fontFamily:'roboto',
                  fontSize:20,
                  marginTop:50
                }}
              >Hey {this.state.email}, Thank you for using our web service</div>
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

const styles = {
  input:{
    border:'none',
    borderBottom:'1px dashed #83A4C5',
    margin:'10px 3px',    
    fontStyle:'italic',
    width:250,
    background:'transparent',
    fontFamily:'roboto',
    fontSize:20,
    color:'#1e1e1e'
  },
  label:{
    fontSize:20,
    fontFamily:'roboto'
  },
  button:{
    padding:'7px 30px',
    fontFamily:'roboto',
    borderRadius:'10px',
    marginLeft:'5px',
    fontSize:15,
    margin:'10px 3px',
    cursor:'pointer',
  },
  form:{
    background:'rgb(255,255,255,0.7)',
    paddingTop:30,
    paddingBottom:30,
    margin:'0 10px',
    borderRadius:10
  },
  glowingText:{
    color:'rgb(99, 54, 38)',
    background: '#333333',
    textShadow:'0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00',
    fontFamily:'roboto',
    fontSize:50,
    margin:30,
    padding:30,
    borderRadius:10
  }
}
export default App;
