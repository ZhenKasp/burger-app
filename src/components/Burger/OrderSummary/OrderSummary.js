import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingredienSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}></span>{igKey}: {props.ingredients[igKey]}
                </li>
            );
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredienSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )

};

export default orderSummary;