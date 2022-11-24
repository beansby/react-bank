import {Component} from 'react';
import {Form, Label, Input, Button, FormGroup,Col,Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'
import axios from 'axios';
import { json } from 'react-router-dom';



class AccountBank extends Component {

    constructor (props){
        super(props);
        this.divStyle = {
            width:'800px',
            height:'600px',
            textAlign : 'left',
            margin : '100px auto',
            border : '2px solid gray',
            padding : '40px',
            borderRadius : '20px'
        };
        this.state = {
            acclist : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8090/accounts')
        .then((response)=> {
            this.setState({acclist : response.data});
        }).catch((err)=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div style={this.divStyle}>
                <Table>
                    {/* 없어서 에러가 나는 경우 있음 */}
                    <tbody>
                        <tr>
                            <th> 아이디 </th>
                            <th> 이름 </th>
                            <th> 잔액 </th>
                            <th> 등급 </th>
                        </tr>

                        {/* 목록에서 각각의 요소를 tr로 반환하는데, 목록에 해당하는 key값이 반드시 필요 */}
                        {this.state.acclist.map((acc)=>(
                            <tr key={acc.id}>
                                <td> {acc.id} </td>
                                <td> {acc.name} </td>
                                <td> {acc.balance} </td>
                                <td> {acc.grade} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default AccountBank;