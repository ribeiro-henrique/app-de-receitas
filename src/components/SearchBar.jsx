import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function SearchBar() {
  return (
    <Form>
      <InputGroup
        type="text"
        placeholder="Digite sua busca."
        data-testid="search-bar"
      />
      <Form.Group as={ Row } className="mb-3">
        <Form.Label>
          ingrediente
          <Col sm={ 10 }>
            <Form.Check
              type="radio"
              name="search-type"
              data-testid="ingredient-search-radio"
            />
          </Col>

        </Form.Label>
        <Form.Label>
          <Col sm={ 10 }>
            Nome
            <Form.Check
              type="radio"
              name="search-type"
              data-testid="name-search-radio"
            />
          </Col>

        </Form.Label>
        <Form.Label>
          Primeira letra
          <Col sm={ 10 }>
            <Form.Check
              type="radio"
              name="search-type"
              data-testid="first-letter-search-radio"
            />
          </Col>

        </Form.Label>

      </Form.Group>
      <Button
        data-testid="exec-search-btn"
        variant="danger"
      >
        Buscar

      </Button>
    </Form>
  );
}

export default SearchBar;
