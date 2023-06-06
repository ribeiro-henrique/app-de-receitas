import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { searchByI, searchByL, searchByN } from '../services/FoodApi';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  console.log(searchValue);

  const handleFetch = () => {
    if (inputValue === 'ingrediente') {
      searchByI(searchValue);
    }
    if (inputValue === 'nome') {
      searchByN(searchValue);
    }
    if (inputValue === 'primeira-letra') {
      if (searchValue.length === 1) {
        searchByL(searchValue);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleValue = ({ target }) => {
    setInputValue(target.value);
  };

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Digite sua busca."
          data-testid="search-input"
          value={ searchValue }
          onChange={ (event) => setSearchValue(event.target.value) }
        />
      </InputGroup>

      <Form.Group as={ Row } className="mb-3">
        <Form.Label>
          Ingredient
          <Col sm={ 10 }>
            <Form.Check
              type="radio"
              name="search-type"
              data-testid="ingredient-search-radio"
              value="ingrediente"
              onClick={ handleValue }
            />
          </Col>

        </Form.Label>
        <Form.Label>
          <Col sm={ 10 }>
            Name
            <Form.Check
              type="radio"
              name="search-type"
              data-testid="name-search-radio"
              value="nome"
              onClick={ handleValue }
            />
          </Col>

        </Form.Label>
        <Form.Label>
          First letter
          <Col sm={ 10 }>
            <Form.Check
              type="radio"
              name="search-type"
              data-testid="first-letter-search-radio"
              value="primeira-letra"
              onClick={ handleValue }
            />
          </Col>

        </Form.Label>

      </Form.Group>
      <Button
        data-testid="exec-search-btn"
        variant="danger"
        onClick={ handleFetch }
      >
        Buscar

      </Button>
    </Form>
  );
}

export default SearchBar;
