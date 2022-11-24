import {Component} from 'react';
import {Form, Label, Input, Button, FormGroup,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';

class AccountInfo extends Component {

    constructor (props){
        super(props);
        this.divStyle = {
            width:'500px',
            height:'300px',
            textAlign : 'left',
            margin : '100px auto',
            border : '2px solid gray',
            padding : '40px',
            borderRadius : '20px'
        };
        this.state = {
            acc : {
                id:'',
                name:'',
                balance:'',
                grade:''
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
        axios.post('http://localhost:8090/accountinfo', null, {params:{id:this.state.acc.id}})
        .then((response)=> {
            console.log(response.data);
            var racc = response.data;
            console.log(typeof racc);
            this.setState({acc:racc});
            console.log(this.state.acc);
        }).catch((err)=>{
            console.log(err);
            this.setState({msg_header:'오류', msg_body:'조회에 실패했습니다.'});
            this.toggle();
        })
    }


        
    render(){
        return(
            <div style={this.divStyle}>
                <Form>
                    <FormGroup row>
                        <Label for='id' sm={4}> 계 좌 &nbsp; 번 호 </Label>
                        <Col sm={4}>
                            <Input type='text' name="id" id="id" value={this.state.acc.id || ''} onChange={this.changeInput}/>
                        </Col>
                        
                        <Col sm={4}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.submit}> 계좌조회 </Button>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for='name' sm={4}> 이 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 름 </Label>
                        <Col sm={8}>
                            <Input type='text' name="name" id="name" value={this.state.acc.name || ''} readOnly/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for='name' sm={4}> 잔 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 액 </Label>
                        <Col sm={8}>
                            <Input type='text' name="balance" id="balance" value={this.state.acc.balance && ''} readOnly/>
                        </Col>
                    </FormGroup>

                    {/* 특수계좌 선택시에만 option 선택하는 변수 연결 : special(false) - disabled, change함수로 상태 변경*/}
                    <FormGroup row>
                        <Label check sm={4}> 등 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 급 </Label>
                        <Col sm={8}>
                            <Input type='text' name="grade" id="grade"  style={{color:'gray'}} value={this.state.acc.grade || ''} readOnly />
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

export default AccountInfo;