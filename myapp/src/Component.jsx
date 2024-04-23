import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios, { formToJSON } from 'axios'
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';

const Component = () => {

  // data store
  const [data, setData] = useState([])

  let url = 'http://localhost:5050/api/user'

  async function getData() {
    let res = await axios.get(url)
    setData(res.data)
    console.log(res.data);
    console.log(res.data[0]._id);
  }
  useEffect(() => {
    getData()
  }, [])

  // add task ke liye

  const [formData, setFormData] = useState({
    task: '',
    // status: '',
    assing: '',
    due_date: '',
    comp_date: ''
  })
  // handle input values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  // post api
  const handleSubmit = async () => {
    const url = 'http://localhost:5050/api/user'
    const res = await axios.post(url, formData)
    console.log(res);
    if (res.status === 200) {
      console.log('Form data submitted:', formData);
      getData()
      handleClose();
    } else {
      console.log('Error submit data');
    }
  }

  // delete
  async function deleteData(id) {
    console.log(id)
    let url = 'http://localhost:5050/api/user';
    let res = await axios.delete(`${url}/${id}`);
    console.log(res);
    getData()

  }

  //update fill data
  // const [id, setId] = useState()
  // function update(_id, newTask, newStatus, newDue_date, newComp_date) {
  //   console.log(_id, newTask, newStatus, newDue_date, newComp_date);
  //   setFormData({
  //     ...formData,
  //     // _id: newSno,
  //     task: newTask,
  //     status: newStatus,
  //     due_date: newDue_date,
  //     comp_date: newComp_date,
  //   })
  //   setId(_id)
  //   handleShow1()
  // }

 

  const[tasks,settasks] = useState({
    _id:"",
    task:"",
    status:"",
    comp_date:""
  })
  function update(_id,taks,status,due_date,comp_date){
    settasks({
      ...tasks,
      _id:_id,
      task:taks,
      status:status,
      comp_date: moment(comp_date).format('YYYY-MM-DD')
    })
    
    handleShow1()
  }
  const handleInput1 = (e) => {
    
    const { name, value } = e.target; 
    settasks({ ...tasks, [name]: value })
  }

  // patch api
  const  handleSubmit1 =  async (_id)=> {
    const url =  'http://localhost:5050/api/user'

    const res = await axios.patch(`${url}/${_id}`,tasks)
    console.log(res);
    if (res.status === 200) {
      console.log('Form data submitted:', tasks);
      getData()
      handleClose1();
    } else {
      console.log('Error submit data');
    }
  }

  //  add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  //useState for edit
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  return (
    <div className="position-relative">

      <Container>

      </Container>
      <Button variant="primary" onClick={handleShow} >
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Task</Form.Label>
                <Form.Control as="textarea" rows={3} name='task' placeholder="task" value={formData.task} onChange={handleInput} />
              </Form.Group>


            </Row>
            <Row className="mb-3">


              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Due date</Form.Label>
                <Form.Control type="date" name='due_date' value={formData.due_date}  />
              </Form.Group>

            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit} >
            Submit
          </Button>

        </Modal.Footer>
      </Modal>


      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Task</Form.Label>
                <Form.Control as="textarea" rows={3} name='task' placeholder="task" value={tasks.task} //onChange={handleInput1}
                onChange={(e)=>settasks({...tasks,task:e.target.value})}
                />
              </Form.Group>


            </Row>
            <Row className="mb-3">
              <Form.Select as={Col} controlId="formGridPassword" name='status' value={tasks.status} onChange={handleInput1} >
                <option>Status</option>
                <option value="Pending">Pending</option>
                <option value="Progress">Progress</option>
                <option value="Complete">Complete</option>
              </Form.Select>

             
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Completion date</Form.Label>
                <Form.Control type="date" name='comp_date' value={tasks.comp_date} onChange={handleInput1}/>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleSubmit1(tasks._id)}} >Save</Button>
        </Modal.Footer>
      </Modal>


      <Table striped bordered hover variant='light' className="position-absolute" style={{width:'80vw',marginLeft:'10vw'}}>

        <thead>
          <tr>
            <th>Sno</th>
            <th>Task</th>
            <th>Status</th>
            <th>Assign Date</th>
            <th>Due Date</th>
            <th>Completion Date</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.status}</td>
                  <td>{moment(item.ass_date).format('DD-MM-yyyy')}</td>
                  <td>{moment(item.due_date).format('DD-MM-yyyy')}</td>
                  <td>{moment(item.comp_date).format('DD-MM-yyyy')}</td>


                  <td>
                    <Button variant='light'  onClick={()=>{update(item._id,item.task,item.status,item.due_date,item.comp_date)}}><EditIcon style={{ color: 'green' }} /></Button>
                    <Button variant='light' onClick={()=>{deleteData(item._id)}} ><DeleteIcon style={{ color: 'red' }} /></Button>
                  </td>
                </tr>




              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default Component;