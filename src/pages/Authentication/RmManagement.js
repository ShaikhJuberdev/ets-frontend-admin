import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, CardBody, Table, Button, Modal,
  ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label
} from 'reactstrap';
import logo from "../../assets/images/SVG/RM.svg";

const getRandomId = () => Math.floor(100 + Math.random() * 900);

const RmManagement = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    joiningDate: '',
    status: 'ACTIVE'
  });

  const username = "admin@mbank.com";
  const password = "2vXIzdUk0ZnBcQHIBi/qUwO4";//"ESc1soRUuV9luiltCMmU/HCm";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://114.143.169.62:8085/v1/accounts/listofuser',
          {
            method: 'GET',
            headers: {
              Authorization: `Basic ${btoa(username + ":" + password)}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const data = await response.json();
        const formattedUsers = (Array.isArray(data) ? data.slice(0, 8) : []).map((email) => {
          const name = email.split('@')[0];
          return {
            id: getRandomId(),
            name,
            email,
            joiningDate: formatDate(new Date()),
            status: 'ACTIVE'
          };
        });
        setUsers(formattedUsers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleModal = () => setModal(!modal);

  const handleAddUser = () => {
    const newEntry = {
      id: getRandomId(),
      name: newUser.name,
      email: newUser.email,
      joiningDate: formatDate(new Date(newUser.joiningDate)),
      status: newUser.status
    };
    setUsers([...users, newEntry]);
    setNewUser({ name: '', email: '', joiningDate: '', status: 'ACTIVE' });
    toggleModal();
  };

  const handleEdit = (index) => setEditingIndex(index);
  const handleSave = () => setEditingIndex(null);
  const handleRemove = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  const handleChange = (e, field, index) => {
    const updated = [...users];
    updated[index][field] = e.target.value;
    setUsers(updated);
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
                    <h5 className="fw-bold mb-0">Relationship Managers List</h5>
                  </div>
                  <Button color="success" onClick={toggleModal}>+ Add RM</Button>
                </div>

                <Table responsive bordered hover className="text-center">
                  <thead className="table-light">
                    <tr>
                      <th>RM ID</th>
                      <th>RM Name</th>
                      <th>Email ID</th>
                      <th>Joining Date</th>
                      <th>RM Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx}>
                        <td>{user.id}</td>
                        <td>
                          {editingIndex === idx ? (
                            <Input className="editable-cell-121" value={user.name} onChange={e => handleChange(e, 'name', idx)} />
                          ) : user.name}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input className="editable-cell-121" value={user.email} onChange={e => handleChange(e, 'email', idx)} />
                          ) : (
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          )}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input className="editable-cell-121" value={user.joiningDate} onChange={e => handleChange(e, 'joiningDate', idx)} />
                          ) : user.joiningDate}
                        </td>
                        <td>
                          {editingIndex === idx ? (
                            <Input type="select" value={user.status} onChange={e => handleChange(e, 'status', idx)}>
                              <option>ACTIVE</option>
                              <option>BLOCKED</option>
                            </Input>
                          ) : (
                            <span className={`badge ${user.status === 'ACTIVE' ? 'bg-info' : 'bg-danger'}`}>
                              {user.status}
                            </span>
                          )}
                        </td>
                        <td className="text-nowrap">
                          <div className="action-buttons-121 d-flex gap-2">
                            {editingIndex === idx ? (
                              <Button size="sm" color="success" onClick={() => handleSave(idx)}>Save</Button>
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

      {/* Add RM Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Relationship Manager</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>RM Name</Label>
              <Input
                type="text"
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter RM name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email ID</Label>
              <Input
                type="email"
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email"
              />
            </FormGroup>
            <FormGroup>
              <Label>Joining Date</Label>
              <Input
                type="date"
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newUser.joiningDate}
                onChange={(e) => setNewUser({ ...newUser, joiningDate: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              <Input
                type="select"
                style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#000' }}
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
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
            onClick={handleAddUser}
          >
            Add
          </Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RmManagement;
