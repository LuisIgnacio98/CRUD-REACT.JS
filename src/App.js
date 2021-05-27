import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const personajes = [
    {
      id: 0,
      name: "Luis Mateo",
      age: "15",
      telephone: "8095815636",
    },
    {
      id: 1,
      name: "Claudia Mateo",
      age: "23",
      telephone: "8495601023",
    },
    {
      id: 2,
      name: "Gina Gomez",
      age: "44",
      telephone: "8495601023",
    },
  ];
  const [data, setData] = useState(personajes);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    telephone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const OpenEditModal = (person) => {
    setModalEditar(true);
    setForm(person);
  };

  const insert = () => {
    var newPerson = { ...form };
    newPerson.id = personajes.length + 1;
    var listPerson = data;
    listPerson.push(newPerson);
    setData(listPerson);
    setModalInsertar(false);
  };

  const edit = (dato) => {
    var cont = 0;
    var listPerson = data;
    listPerson.forEach((person, key) => {
      if (dato.id === person.id) {
        listPerson[cont].name = dato.name;
        listPerson[cont].age = dato.age;
        listPerson[cont].telephone = dato.telephone;
      }
      cont++;
    });
    setData(listPerson);
    setModalEditar(false);
  };

  const deletePerson = (id) => {
    var option = window.confirm("En verdad quieres eliminar?");
    if (option) {
      const listPerson = data.filter((item) => item.id !== id);
      setData(listPerson);
    }
  };
  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={() => setModalInsertar(true)}>
          Nuevo Personaje
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Telephone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <div>
                <strong>Empty</strong>
              </div>
            ) : (
              data.map((element, key) => (
                <tr key={key}>
                  {console.log(key)}
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.age}</td>
                  <td>{element.telephone}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => OpenEditModal(element)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => deletePerson(element.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      {/*Insert's Modal*/}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insert New Person</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>ID: </label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={personajes.length}
            />
          </FormGroup>
          <FormGroup>
            <label>Name: </label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Age: </label>
            <input
              className="form-control"
              name="age"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Telephone: </label>
            <input
              className="form-control"
              name="telephone"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => insert()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => setModalInsertar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/*Edit's Modal*/}
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Edit Person</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>ID: </label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>
          <FormGroup>
            <label>Name: </label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChange}
              value={form.name}
            />
          </FormGroup>
          <FormGroup>
            <label>Age: </label>
            <input
              className="form-control"
              name="age"
              type="text"
              onChange={handleChange}
              value={form.age}
            />
          </FormGroup>
          <FormGroup>
            <label>Telephone: </label>
            <input
              className="form-control"
              name="telephone"
              type="text"
              onChange={handleChange}
              value={form.telephone}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => edit(form)}>
            Edit
          </Button>
          <Button color="danger" onClick={() => setModalEditar(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
