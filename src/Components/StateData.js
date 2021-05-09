import Axios from 'axios'
import React, {Component} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Accordion,Card,Button} from 'react-bootstrap'

class StateData extends Component{
    constructor(props){
        super(props)
        this.state={
            stateData:{}
        }
    }

    componentDidMount(){
        Axios.get('https://api.covid19india.org/state_district_wise.json').then(response=>{
            
            this.setState({stateData:response.data})
        })
    }
    render(){
        // we can't use map here because it is not an array so we are using object keys
        let keys = Object.keys(this.state.stateData)
        return(
            <div className='row'>
                <div className='col-md-12'>
                <Accordion defaultActiveKey="0">
                    {
                        keys.map((item,ky)=>{
                            let districts = this.state.stateData[item].districtData
                            let district_keys  =Object.keys(districts)
                            let total_active =0;
                            let total_confirmed = 0;
                            let total_deaths = 0;
                            let total_recover = 0;
                            
                            let district_list =[];

                            for (let x in districts){
                                total_active += districts[x].active
                                total_confirmed += districts[x].confirmed
                                total_deaths += districts[x].deceased
                                total_recover += districts[x].recovered
                                let ob = districts[x]
                                ob['district_name']=x
                                district_list.push(ob)
                            }
                            
                            
                            return(
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="primary" eventKey={ky}>
                                        {item} <span className='btn-dark p-1 mr-2'>Total Cases: {total_confirmed}</span> <span className='btn-dark p-1 mr-2'>Active: {total_active}</span> <span className='btn-dark p-1 mr-2'>Recovered: {total_recover}</span> <span className='btn-dark p-1 mr-2'>Deaths: {total_deaths}</span>
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={ky}>
                                    <Card.Body>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <td>District</td>
                                                <td>Confirmed</td>
                                                <td>Active</td>
                                                <td>Recovered</td>
                                                <td>Deaths</td>
                                            </tr>
                                            </thead >
                                            <tbody>
                                                {
                                                    district_list.map((item,ky)=>{
                                                        return(
                                                            <tr>
                                                                <td>{item.district_name}</td>
                                                                <td>{item.confirmed}</td>
                                                                <td>{item.active}</td>
                                                                <td>{item.recovered}</td>
                                                                <td>{item.deceased}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })
                    }
  
</Accordion>
                </div>
            </div>
        )
    }
}

export default StateData;

// look into the data state of api, here it in the form of dictionary(value -pair), it can also be an array