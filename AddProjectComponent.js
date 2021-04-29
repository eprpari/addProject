import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import MyAlert from '../user/MyAlert'
import axios from 'axios'


const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'
}

class AddProjectComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            projectPlace:'',
            projectDetails:'',
            projectPhotos:'',
            companyNames:[],
            message: '',
            show: false
        }
    }
    saveProject = (e) => {
        e.preventDefault();
        let project = {
            projectPlace: this.state.projectPlace,
            projectDetails: this.state.projectDetails,
            projectPhotos:this.state.projectPhotos
        };

        componentDidMount() {
                    axios.get('http://localhost:8080/api/company')
                        .then(response => {
                            console.log(response.data)
                            this.setState({
                               companyNames: response.data
                            })
                        })
           this.addProject(project);
         }
        

               addProject = (project) => {
                 axios.post('http://localhost:8080/api/company/projects')
               .then(res => {
               if(res.data != null) {
                this.setState({show:true, message : 'Admin added successfully.'});
                setTimeout(() => this.setState({show:false}), 3000);
            
              } else {
            this.setState({show:false});
        }
    });
    }
    }        

      onChange = (e) =>
            this.setState({ 
            [e.target.name]: e.target.value 
            });
        
render() {
    return(
        <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyAlert show = {this.state.show} message = {this.state.message} type = {"success"}/>
            </div>
            <form>
            <Select required native
              value={companyname} onChange={this.onChange} name='companyname' id='companyname'>
             {
               this.state.companyNames.map(companyname =>
              <option key={companyname.companyName} value={companyname.companyName}>{companyname.companyName}</option>
             )
             }
            </Select>
            <TextField placeholder="ProjectPlace" fullWidth margin="normal" name="projectPlace" value={this.state.projectPlace} onChange={this.onChange}/>
                <TextField placeholder="ProjectDetails" fullWidth margin="normal" name="projectDetails" value={this.state.projectDetails} onChange={this.onChange}/>
                <TextField placeholder="ProjectPhotos" fullWidth margin="normal" name="projectPhotos" value={this.state.projectPhotos} onChange={this.onChange}/>
                <Button variant="contained" color="primary" onClick={this.saveProject}>Save</Button>

                </form>
            </div>
        );
    }
}

export default AddProjectComponent;