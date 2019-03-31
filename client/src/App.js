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
      buttonText:'Add class',
      count:0,
      email:'',
      width:50,
      open:false
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
    // var {elements} = this.state;  
    this.setState({[fieldId]:value});  
    var count = 0
    this.state.elements.forEach((item)=>{
      if(this.state[item])
        count+=this.state[item].length
    })
    this.setState({count})
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
      button1 = {...styles.button}
    else
      button1 = styles.button

    if(this.state.count>10 || this.state.count===0)
      button2 = {...styles.button}
    else
      button2 = styles.button
    return (
      <div style={{textAlign:'center',background:`url(${bg})`,backgroundSize:'cover',paddingBottom:100,paddingTop:50}}>
        <div style={styles.glowingText}>
            Find this Face
        </div>
               
        
        <div style={styles.form}>
        {this.renderFileUpload('Upload Image')}

          <label style={styles.label}>
            All ]ill be resizedsuj tok some dimensions. Enter dimensions in Pixel(px)
          </label>
          <br/>
          <br/>
          <label style={styles.label}>permissible error: </label>
          <input type="number" value={this.state.width} onChange={this.handleWidthChange} style={{...styles.input,...{width:120}}} required={true}/>
          <br/>
          <form onSubmit={this.handleSubmit} method='post'>
            <label style={styles.label}>your_name: </label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} style={styles.input} required={true}/>
            <button  type="submit" style={button2}>
              {this.state.count>10 ? "Max 10 files":"Submit"}
            </button>
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
