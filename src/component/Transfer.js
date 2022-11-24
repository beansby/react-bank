import {Component} from 'react';
import {Form, Label, Input, Button, FormGroup,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';

class Transfer extends Component{

    constructor (props){
        super(props);
        this.divStyle = {
            width:'500px',
            height:'280px',
            textAlign : 'left',
            margin : '100px auto',
            border : '2px solid gray',
            padding : '40px',
            borderRadius : '20px'
        };
        this.state = {
            acc : {
                id_s:'',
                id_r:'',
                money:''
            },
            modal : false,
            msg_header:'',
            msg_body:''
        }

    }

    toggle = () => {
        this.setState({modal:!this.state.modal});
    }

    changeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;   // 사용자 입력값
        // 전개식 뒷부분만 수정, 삽입 : id를 변경할 경우 [id]가 됨
        this.setState({acc:{...this.state.acc, [name]:value}})
    }

    submit = (e) => {
        axios.post('http://localhost:8090/transfer', null, 
            {params:this.state.acc}) // 객체에서 만들어야 해서 중괄호 사용 {}
        .then((response)=> {
            console.log(response);
            this.setState({msg_header:'이체 성공', msg_body: `이체 후 잔액 : ${response.data}원`});
            this.toggle();
        }).catch((err)=>{
            console.log(err);
            this.setState({msg_header:'오류', msg_body:'이체에 실패했습니다.'});
            this.toggle();
        })
    }

    render(){
        return(
            <div style={this.divStyle}>
                <Form>
                    <FormGroup row>
                        <Label for='id_s' sm={4}> 보내는 계좌번호 </Label>
                        <Col sm={8}>
                            <Input type='text' name="id_s" id="id_s" value={this.state.acc.id_s} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for='id_r' sm={4}> 받 &nbsp; 는 계좌번호 </Label>
                        <Col sm={8}>
                            <Input type='text' name="id_r" id="id_r" value={this.state.acc.id_r} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for='money' sm={4}>  이 &nbsp; 체 &nbsp; 금 &nbsp; 액 </Label>
                        <Col sm={8}>
                            <Input type='number' name="money" id="money" value={this.state.acc.money} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={12}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.submit}> 이 &nbsp; &nbsp; 체 </Button>
                        </Col>
                    </FormGroup>

                    {/* 특수계좌 선택시에만 option 선택하는 변수 연결 : special(false) - disabled, change함수로 상태 변경*/}


                </Form>

                <Modal isOpen={this.state.modal} fade={true} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> {this.state.msg_header} </ModalHeader>
                    <ModalBody>
                        {this.state.msg_body}
                    </ModalBody>
                    <ModalFooter color='secondary' onClick={this.toggle}>
                        <Button color='secondary' onClick={this.toggle}> 닫기 </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }    
}


export default Transfer;
