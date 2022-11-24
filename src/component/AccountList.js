import {Component} from 'react';
import {Form, Label, Input, Button, FormGroup,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';
import { json } from 'react-router-dom';



class AccountList extends Component {

    constructor (props){
        super(props);
        this.divStyle = {
            width:'800px',
            height:'300px',
            textAlign : 'left',
            margin : '100px auto',
            border : '2px solid gray',
            padding : '40px',
            borderRadius : '20px'
        };
        this.state = {
            acclist : [],
        }
    }

    submit = (e) => {
        axios.post('http://localhost:8090/accountlist')
        .then((response)=> {
            console.log(response); //dummydata
            console.log(response.data.length); //배열 크기
            console.log(response.data); //배열

            // const arr = response.data;
            // const listitems = arr.map((id)=> <li> {id} </li>);
            // console.log(listitems.length);
            // for (let i=0; i < listitems.length; i++){
            //     console.log(listitems.i._self.state.acclist);
            // }
            // console.log(listitems.i._self.state.acclist);

            const { data : { 2 :{id, name, balance, grade}} } = response;

            // for (let i=0; i < response.data.length; i++){
            //     response = { data : { i :{ id, name, balance, grade}} };
            //     console.log(response);
            // }
            // console.log(response.data.map(((n)=>{return n;})));
            // var alist = response.data.map(((n)=>{return n;}));
            // console.log(alist);
            // for (let i=0; i < alist.data; i++){
            //     console.log(alist.data[i]);
            // }

            this.setState({
                acclist : `계좌번호 ${id} 이름 ${name} 잔액 ${balance} 등급 ${grade}`
            })
            
            // this.setState({acclist:[result.map((n)=>n)]});
            // console.log({acclist : result.map((n)=>{return n;})});
        }
        ).catch((err)=>{
            console.log(err);
    
        })
    }

    render(){

        const {acclist} = this.state;

        return(
            <div style={this.divStyle}>

                
                <Form>
                    <FormGroup row>
                        <Col sm={12}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.submit}> 계좌조회 </Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                           {/* {JSON.stringify(acclist)} */}
                           {acclist}
                        </Col>
                    </FormGroup>
                </Form>

                {/* <Modal isOpen={this.state.modal} fade={true} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> {this.state.msg_header} </ModalHeader>
                    <ModalBody>
                        {this.state.msg_body}
                    </ModalBody>
                    <ModalFooter color='secondary' onClick={this.toggle}>
                        <Button color='secondary' onClick={this.toggle}> 닫기 </Button>
                    </ModalFooter>
                </Modal> */}
            </div>
        )
    }

}

export default AccountList;
