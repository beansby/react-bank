import {Component} from 'react';
import {Form, Label, Input, Button, FormGroup,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';


class MakeAccount extends Component {

    constructor (props){
        super(props);
        this.divStyle = {
            width:'450px',
            height:'330px',
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
                name:'',
                password:'',
                grade:''
            },
            special:false,
            modal : false,
            //받아서 쓸 변수 초기화
            msg_header:'',
            msg_body:''
        };
    }

    toggle = () => {
        this.setState({modal:!this.state.modal});
    }

    changeSpecial = (e) => {
        // 체크박스 상태를 넣어줌
        this.setState({special:e.target.checked});
        if (!e.target.checked){
            this.setState({acc:{...this.state.acc, grade:''}});
        }
    }

    changeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;   // 사용자 입력값
        // 전개식 뒷부분만 수정, 삽입 : id를 변경할 경우 [id]가 됨
        this.setState({acc:{...this.state.acc, [name]:value}})
    }

    submit = (e) => {
        console.log(JSON.stringify(this.state.acc));
        // 매개변수 URL, data(acc는 이름)
        axios.post('http://localhost:8090/makeaccount',null,
            {params:this.state.acc}
        ).then((response)=>{
            // 정상적으로 가져왔을 경우 : 계좌개설 에러 여부를 헤더와 바디로 가져옴
            this.setState({msg_header:'계좌개설', msg_body:'계좌가 개설되었습니다.'});
            this.toggle(); // modal을 보였다 안보였다 해주는 함수
        }).catch((err)=>{
            // 에러가 났을 경우
            this.setState({msg_header:'오류', msg_body:'계좌개설에 실패했습니다.'});
            this.toggle();
        }) 
    }

    checkId = (e) => {
        axios.post('http://localhost:8090/doubleid', null, {params:{id:this.state.acc.id}}
        ).then((response)=> {
            let msg = '';
            console.log(response.data);
            if(response.data === true){
                msg = '사용중인 계좌번호입니다.';
            } else {  msg = '사용 가능한 계좌번호입니다.'; }
            this.setState({msg_header:'계좌 중복확인', msg_body:msg});
            this.toggle();
        }).catch((err)=>{
            this.setState({msg_header:'오류', msg_body:'계좌 중복 확인을 실패했습니다.'});
            this.toggle();
        })
    }

    render () {
        return(
            <div style={this.divStyle}>
                <Form>
                    <FormGroup row>
                        {/* sm(비율) = label 4 : input 6 : button 2 => 전체 12*/}
                        <Label for='id' sm={4}> 계 좌 &nbsp; 번 호 </Label>
                        <Col sm={5}>
                            <Input type='text' name="id" id="id" value={this.state.acc.id} onChange={this.changeInput}/>
                        </Col>
                        
                        <Col sm={3}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.checkId}> 중복 </Button>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for='name' sm={4}> 이 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 름 </Label>
                        <Col sm={8}>
                            <Input type='text' name="name" id="name" value={this.state.acc.name} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for='password' sm={4}> 비 밀 &nbsp; 번 호 </Label>
                        <Col  sm={8}>
                            <Input type='password' name="password" id="password" value={this.state.acc.password} onChange={this.changeInput}/>
                        </Col>
                    </FormGroup>

                    {/* 특수계좌 선택시에만 option 선택하는 변수 연결 : special(false) - disabled, change함수로 상태 변경*/}
                    <FormGroup row>
                        <Label check sm={4}> 
                            <Input type='checkbox' checked={this.state.special} onChange={this.changeSpecial}/> {' '} 특수 계좌
                        </Label>
                        <Col sm={8}>
                            <Input type='select' name="grade" id="grade"  style={{color:'gray'}} value={this.state.acc.grade} disabled={!this.state.special} onChange={this.changeInput}>
                                <option> VIP </option>
                                <option> Gold </option>
                                <option> Silver </option>
                                <option> Normal </option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={12}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.submit}> 계좌 개설 </Button>
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

export default MakeAccount;