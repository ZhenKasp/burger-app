import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount () {
    this.props.initIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => { return sum + el }, 0);
    return sum > 0
  }

  purchaseHandler = () => this.setState({ purchasing: true });

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => this.props.history.push('/checkout');

  render () {
    const desabledInfo = {
      ...this.props.ingredients
    }
    for (let key in desabledInfo) {
      desabledInfo[key] = desabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={desabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
        price={this.props.totalPrice}
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purcaseContinue={this.purchaseContinueHandler}
      />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onIngredientAdded: name => dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: name => dispatch(burgerBuilderActions.removeIngredient(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
