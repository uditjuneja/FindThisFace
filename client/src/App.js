import React from "react";
import FileUpload from './FileUpload'
import Linkedin from './Linkedin'
class App extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef()
    }

    render() {
        return (
            <div className="App">
                <div style = {styles.heading}>
                    
                    <h1>
                        Randomized Weight Calculator
                    </h1>
                    <div>
                        Tired of calculating weights. Use our service to generate a determining equation for your problem.
                    </div>
                    <div style={{background:'#1e1e1e',padding:10,margin:10,borderRadius:10}}>
                        <ul style={{listStyleType:'none',padding:'10px 20px ', textAlign:'left'}}>
                            <li>1. Upload your file in CSV format. First Column should have Actual Value ( See sample file below).</li>
                            <li>2. Fill your email id on which you want the results to be mailed.</li>
                            <li>3. You can also specify weight range for each feature but make sure you follow the given sample file. After uploading file, uncheck the checkbox in file preview.</li>
                        </ul>
                        <button 
                            style={{
                                padding:10,
                                background:'#4C4B4B',
                                color:'white',
                                cursor:'pointer',
                                borderRadius:'5px'
                            }}
                            onClick={() => this.messagesEnd.scrollIntoView({ behavior: "smooth" })}>
                            Contact us for any queries
                        </button>
                    </div>
                </div>
               <FileUpload/>
               <div style={{textAlign:'center',background:'#586776',padding:'25px',borderRadius:'10px'}}>
                <h2
                    style={{color:'#ffffff',fontFamily:'roboto'}}
                    >
                    Sample File 
                    <a style = {{color:'#fff',marginLeft:5,textDecoration:'none',border:'1px dashed gray',padding:5,borderRadius:10}} href="https://docs.google.com/spreadsheets/d/1uWuxeQmtIZMEtbbj__xYOMmS9smsbmPWHZGD2ZT3qzw/export?format=csv" download>Download</a>
                </h2>
                <iframe 
                title = {"Sample File"}
                    style={{height:'50vh',width:'80vw',border:'0px',borderRadius:'10px'}}
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vStSMxRFDxDlDoZH8ijol4vKODN3-ueOYmjLYlUlxjKoO3yzQCYvllyXPazxoBM_g5Jcz9lMuLa4zht/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false">
                    </iframe>
                </div>
                <h1 style={{
                    margin:'30px auto', textAlign:'center',
                    fontFamily:'roboto',color:'#2B2B52'
                }}
                >Developed By</h1>
                <div 
                style={{
                    display:'flex',flexDirection:'row',justifyContent:'space-evenly',
                    paddingTop:50,flexWrap:'wrap'
                    
                }}>
                    <Linkedin username='prakhartiet' profilename='Prakhar Gupta' datatype='vertical' email='pgupta7_be16@thapar.edu'/>
                    <Linkedin username='jainhere' profilename='Nikhil Jain' datatype='vertical' email='njain_be16@thapar.edu'/>
                    <Linkedin username='prabhjot-singh-715013146' profilename='Prabhjot Singh' datatype='vertical' email='psingh4_be16@thapar.edu'/>
                </div>
                <div ref={(el) => { this.messagesEnd = el }}/>
                
                
            </div>
        );
    }
}
const styles = {
    heading:{
        textAlign:'center',
        backgroundColor:'#2F363F',
        margin:5,
        padding:10,
        borderRadius:10,
        fontFamily: 'Roboto',
        color:'#ffffff'
    }
}
export default App;