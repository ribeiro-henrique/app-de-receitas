import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import context from '../context/myContext';
import { drinkFirts, drinkIngre, drinkName } from '../services/DrinksApi';
import { searchByI, searchByL, searchByN } from '../services/FoodApi';

function SearchBar() {
  const { foods, setFoods } = useContext(context);
  console.log(foods);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();

  // 14 vamos renderizar com base no lenght do foods
  // o requisito quer as 12 primeiras

  useEffect(() => {
    if (foods === undefined || foods === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [foods]);

  useEffect(() => {
    if (foods && foods.length === 1) {
      console.log(foods);
      const { pathname } = history.location;
      const id = foods[0].idMeal || foods[0].idDrink; // vamos precisar disso
      history.push(`${pathname}/${id}`);
    }
  }, [foods, history]);

  const handleFetch = async () => {
    if (inputValue === 'ingrediente') {
      if (history.location.pathname === '/drinks') {
        const result = await drinkIngre(searchValue);
        setFoods(result);
      } else {
        const result = await searchByI(searchValue);
        setFoods(result);
      }
    } else if (inputValue === 'nome') {
      if (history.location.pathname === '/drinks') {
        const result = await drinkName(searchValue);
        setFoods(result);
      } else {
        const result = await searchByN(searchValue);
        setFoods(result);
      }
    } else if (inputValue === 'primeira-letra' && searchValue.length === 1) {
      if (history.location.pathname === '/drinks') {
        const result = await drinkFirts(searchValue);
        setFoods(result);
      } else {
        const result = await searchByL(searchValue);
        setFoods(result);
      }
    } else {
      global.alert('Your search must have only 1 (one) character');
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
