import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import logo from '../../assets/images/SVG/HN_customer.svg';

const firstNames = ['Aarav', 'Isha', 'Karan', 'Tanya', 'Rishi', 'Diya', 'Kabir', 'Anaya', 'Arjun', 'Meera'];
const lastNames = ['Sharma', 'Patel', 'Desai', 'Mehta', 'Rao', 'Kapoor', 'Joshi', 'Verma', 'Singh', 'Reddy'];
const rmList = ['Sameer Oak', 'Sanjay Jadhav', 'Meera Rao', 'Anil Sharma'];

const getRandomFullName = () => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
};

const getRandomDate = () => {
  const day = String(Math.floor(Math.random() * 28 + 1)).padStart(2, '0');
  const month = String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0');
  return `${day}/${month}/2024`;
};

const HNCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', rm: '', joiningDate: '', status: 'ACTIVE' });

  const username = "admin@mbank.com";
  const password = "2vXIzdUk0ZnBcQHIBi/qUwO4";


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true); // show loader
        const response = await fetch('http://114.143.169.62:8085/v1/accounts/listofstaff', {
          method: 'GET',
          headers: {
            Authorization: `Basic ${btoa(username + ':' + password)}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const fullList = Array.isArray(data) ? data : data?.data || [];
        const enriched = fullList.slice(0, 5).map((user, idx) => ({
          id: `C${11 + idx}`,
          name: getRandomFullName(),
          phone: user.email || 'N/A',
          rm: rmList[idx % rmList.length],
          joiningDate: getRandomDate(),
          status: idx % 2 === 0 ? 'ACTIVE' : 'BLOCK'
        }));
        setCustomers(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // hide loader
      }
    };
    fetchCustomers();
  }, []);

  const toggleModal = () => setModal(!modal);

  const handleChange = (e, field, idx) => {
    const updated = [...customers];
    updated[idx][field] = e.target.value;
    setCustomers(updated);
  };

  const handleEdit = (idx) => setEditingIndex(idx);
  const handleSave = () => setEditingIndex(null);
  const handleRemove = (idx) => {
    const updated = [...customers];
    updated.splice(idx, 1);
    setCustomers(updated);
  };

  const handleAddCustomer = () => {
    const trimmedName = newCustomer.name.trim();
    if (!trimmedName.includes(' ')) {
      alert('Please enter both first and last names (e.g., John Doe)');
      return;
    }

    const newId = `C${11 + customers.length}`;
    const newEntry = {
      id: newId,
      ...newCustomer
    };
    setCustomers([...customers, newEntry]);
    setNewCustomer({ name: '', phone: '', rm: '', joiningDate: '', status: 'ACTIVE' });
    toggleModal();
  };

  return (
    <div className="page-content bg-light" style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col lg={11}>
            <Card className="shadow-sm rounded border-0">
              <CardBody style={{ position: 'relative' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <img src={logo} alt="logo" width="30" />
                    <h5 className="fw-bold mb-0">HN Customer List</h5>
                  </div>
                  <Button color="success" onClick={toggleModal}>+ Add HN Customer</Button>
                </div>

                <Table responsive bordered hover className="text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Customer ID</th>
                      <th>Customer Name</th>
                      <th>Mobile Number</th>
                      <th>Relationship Manager</th>
                      <th>Joining Date</th>
                      <th>RM Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((cust, idx) => (
                      <tr key={idx}>
                        <td>{cust.id}</td>
                        <td>
                          {editingIndex === idx ? (
                            <Input value={cust.name} onChange={e => handleChange(e, 'name', idx)} />
                          ) : cust.name}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input value={cust.phone} onChange={e => handleChange(e, 'phone', idx)} />
                          ) : cust.phone}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input value={cust.rm} onChange={e => handleChange(e, 'rm', idx)} />
                          ) : cust.rm}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input type="date" value={cust.joiningDate} onChange={e => handleChange(e, 'joiningDate', idx)} />
                          ) : cust.joiningDate}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input type="select" value={cust.status} onChange={e => handleChange(e, 'status', idx)}>
                              <option>ACTIVE</option>
                              <option>BLOCKED</option>
                            </Input>
                          ) : (
                            <span className={`badge ${cust.status === 'ACTIVE' ? 'bg-info' : 'bg-danger'}`}>
                              {cust.status}
                            </span>
                          )}
                        </td>
                        <td className="text-nowrap">
                          <div className="d-flex gap-2 justify-content-center">
                            {editingIndex === idx ? (
                              <Button size="sm" color="success" onClick={handleSave}>Save</Button>
                            ) : (
                              <Button size="sm" color="warning" onClick={() => handleEdit(idx)}>Edit</Button>
                            )}
                            <Button size="sm" color="danger" onClick={() => handleRemove(idx)}>Remove</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* Spinner Overlay */}
                {loading && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    borderRadius: "8px"
                  }}>
                    <div className="spinner-border text-primary" role="status" style={{ width: "2.5rem", height: "2.5rem" }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Adding Customer */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Customer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>HN Customer Name</Label>
              <Input
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newCustomer.name}
                onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Mobile Number</Label>
              <Input
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newCustomer.phone}
                onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Relationship Manager</Label>
              <Input
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newCustomer.rm}
                onChange={e => setNewCustomer({ ...newCustomer, rm: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Joining Date</Label>
              <Input
                type="date"
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newCustomer.joiningDate}
                onChange={e => setNewCustomer({ ...newCustomer, joiningDate: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              <Input
                type="select"
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newCustomer.status}
                onChange={e => setNewCustomer({ ...newCustomer, status: e.target.value })}
              >
                <option>ACTIVE</option>
                <option>BLOCKED</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            style={{ marginRight: '15px' }}
            onClick={handleAddCustomer}
          >
            Add
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default HNCustomer;
