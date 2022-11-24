import {Component} from 'react';
import {Form, Label, Input, Button, FormGroup,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';

class Deposit extends Component{
    constructor (props){
        super(props);
        this.divStyle = {
            width:'480px',
            height:'240px',
            textAlign : 'left',
            margin : '100px auto',
            border : '2px solid gray',
            padding : '40px',
            borderRadius : '20px'
        };
        this.state = {
            //초기화
            acc : {
                id:'',
                money:'',
            },
            modal : false,
            //받아서 쓸 변수 초기화
            msg_header:'',
            msg_body:''
        };
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
        axios.post('http://localhost:8090/deposit', null, 
            {params:this.state.acc}) // 객체에서 만들어야 해서 중괄호 사용 {}
        .then((response)=> {
            console.log(response);
            this.setState({msg_header:'입금', msg_body: `잔액 : ${response.data}원`});
            this.toggle();
        }).catch((err)=>{
            console.log(err);
            this.setState({msg_header:'오류', msg_body:'입금에 실패했습니다.'});
            this.toggle();
        })
    }

    render(){
        return(
            <div style={this.divStyle}>
                <Form>
                    <FormGroup row>
                        {/* sm(비율) = label 4 : input 6 : button 2 => 전체 12*/}
                        <Label for='id' sm={4}> 계 좌 &nbsp; 번 호 </Label>
                        <Col sm={8}>
                            <Input type='text' name="id" id="id" value={this.state.acc.id} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for='name' sm={4}> 입 &nbsp; &nbsp; 금 &nbsp; &nbsp; 액 </Label>
                        <Col sm={8}>
                            <Input type='number' name="money" id="money" value={this.state.acc.money} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>


                    <FormGroup row>
                        <Col sm={12}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.submit}> 입 &nbsp; &nbsp; &nbsp; &nbsp; 금 </Button>
                        </Col>
                    </FormGroup>
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

export default Deposit;


// 480 240
// 마진 100
// 계좌번호 출금액 출금

// 계좌번호 입금액 입금 버튼 100%
