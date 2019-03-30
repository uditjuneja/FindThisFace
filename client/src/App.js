import React, { Component } from 'react';
import './App.css';
import FileUpload from './FileUpload'
import  { post } from 'axios';
import bg from './images/backgroundImage.png'
import Linkedin from './Linkedin'
import Modal from "react-responsive-modal";

class App extends Component {
  constructor(props){
    super(props);
    this.initialState={
      elements:[],
      disabled:true,
      input:'',
      buttonText:'Add class',
      count:0,
      email:'',
      width:500,
      height:500,
      open:false
    }
    this.state = this.initialState;
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.renderFileBrowse = this.renderFileBrowse.bind(this);
    this.renderFileUpload = this.renderFileUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
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
    // var {elements} = this.state;  
    this.setState({[fieldId]:value});  
    var count = 0
    this.state.elements.forEach((item)=>{
      if(this.state[item])
        count+=this.state[item].length
    })
    this.setState({count})
  }

  handleAddButtonClick(){
    var {elements,input} = this.state;
    this.setState({elements:[...elements,input],input:'',disabled:true})
  }

  handleChange(event) {
    if(this.state.elements.indexOf(event.target.value)!==-1){
      this.setState({input: event.target.value,disabled:true,buttonText:'Class Already Exists'});
    }
    else{
      this.setState({input: event.target.value,disabled:event.target.value === '',buttonText:'Add class'});
    }
    
  }
  handleEmailChange(event){
    this.setState({email:event.target.value})
  }
  handleWidthChange(event){
    this.setState({width:event.target.value})
  }
  handleHeightChange(event){
    this.setState({height:event.target.value})
  }
  renderFileBrowse(){
    return(
      <div className="App">
          {this.state.elements.map(
            (item,key)=>this.renderFileUpload(item,key)
          )}
      </div>
    )
  }
  renderFileUpload(k,key){
    return (
       <FileUpload
            id={k}
            key={key}
            onChange={this.handleFieldChange}
        />      
    )
  }
  handleSubmit(event) {
    //console.log(this.state);
    event.preventDefault();
    this.onOpenModal();
    this.fileUpload().then((response)=>{
      console.log('Response is: \n'+ response.data);
    })
  }

  fileUpload(){
    const url = '/submit';
    const formData = new FormData();
    this.state.elements.forEach((item)=>{
      if(this.state[item]){
        this.state[item].forEach((inneritem)=>{
          var newName = item+"$"+inneritem.name
          var newFile =new File([inneritem],newName)
          formData.append('files',newFile);
        })
      }
    })

    formData.append('email',this.state.email);
    formData.append('height',this.state.height);
    formData.append('width',this.state.width);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    var button1,button2
    if(this.state.disabled)
      button1 = {...styles.button,...styles.notAllowed}
    else
      button1 = styles.button

    if(this.state.count>10 || this.state.count===0)
      button2 = {...styles.button,...styles.notAllowed}
    else
      button2 = styles.button
    return (
      <div style={{textAlign:'center',background:`url(${bg})`,backgroundSize:'cover',paddingBottom:100,paddingTop:50}}>
        <div style={styles.glowingText}>
            Image Fefature Extractor
        </div>
               
        
        <div style={styles.form}>
        {this.renderFileBrowse()}
          <input type="text" 
            value={this.state.input} 
            onChange={this.handleChange} 
            style={styles.input}
            placeholder="           Enter Class Name"
          />
          <button disabled={ this.state.disabled } 
              onClick={this.handleAddButtonClick}
              style={button1}
              >
            {this.state.buttonText}
          </button>
          <br/>
          File Count: {this.state.count}/10
          <br/>
          <br/>
          <label style={styles.label}>
            All ]ill be resized tok some dimensions. Enter dimensions in Pixel(px)
          </label>
          <br/>
          <br/>
          <label style={styles.label}>permissible error: </label>
          <input type="number" value={this.state.width} onChange={this.handleWidthChange} style={{...styles.input,...{width:120}}} required={true}/>
          <label style={styles.label}>Height: </label>
          <input type="number" value={this.state.height} onChange={this.handleHeightChange} style={{...styles.input,...{width:120}}} required={true}/>
          <br/>
          <form onSubmit={this.handleSubmit} method='post'>
            <label style={styles.label}>Email: </label>
            <input type="email" value={this.state.email} onChange={this.handleEmailChange} style={styles.input} required={true}/>
            <button disabled={ this.state.count>10 || this.state.count===0} type="submit" style={button2}>
              {this.state.count>10 ? "Max 10 files":"Submit"}
            </button>
        </form>
        </div>
        <h1 style={{color:'#333333',fontFamily:'roboto',textShadow:'2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)'}}>Developed By</h1>
        <div style={{display:'flex',flexDirection:'row,display:',justifyContent:'space-evenly',paddingTop:50,flexWrap:'wrap'}}>
          <Linkedin username='prakhartiet' profilename='Prakhar Gupta' datatype='vertical' email='pgupta7_be16@thapar.edu'/>
          <Linkedin username='jainhere' profilename='Nikhil Jain' datatype='vertical' email='njain_be16@thapar.edu'/>
          {/* <Linkedin username='prashant-singh-rana-6b089513' profilename='Dr. Prashant S Rana' datatype='vertical' email='prashant.singh@thapar.edu'/> */}
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
  notAllowed:{
    cursor:'not-allowed'
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
