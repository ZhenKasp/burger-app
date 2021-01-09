import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: "Fastest"},
            {value: 'cheapest', displayValue: "Cheapest"}
          ]
        },
        value: ''
      },
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    Object.entries(this.state.orderForm).forEach(([key, value]) => {
      formData[key] = value.value;
    });

    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }

    axios.post('/orders.json', order)
      .then(res => {
        this.props.history.push('/');
        this.setState({ loading: false });
      })
      .catch(err => this.setState({ loading: false }))
  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedForm[inputId]};
    updatedFormElement.value = event.target.value;
    updatedForm[inputId] = updatedFormElement;

    this.setState({ orderForm: updatedForm });
  }

  render() {
    const formElementsArray = Object.entries(this.state.orderForm).map(([key, value]) => (
      {id: key, config: value}
    ))
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            inputType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            key={formElement.id}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}
          />
        ))}

        <Button btnType='Success'>ORDER</Button>
      </form>
    )

    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
