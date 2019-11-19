import React, { useState } from 'react';
import './App.css';

function App() {
  const [shippingMethods] = useState([
    {
      "label": "Free Shipping",
      "detail": "Arrives in about 2 to 4 weeks",
      "amount": "0.00",
      "identifier": "FreeShip"
    },
    {
      "label": "Standard",
      "detail": "OCT 31 - NOV 8",
      "amount": "2.00",
      "identifier": "Standard"
    },
    {
      "label": "Express Shipping",
      "detail": "Arrives in 1 to 2 days",
      "amount": "5.00",
      "identifier": "Express"
    },
  ])

  const beginPayment = () => {
    if (window.ApplePaySession) {
      const subTotal = 2
      const estimatedTax = 2
      let shippingAmount = 0
      const total = {label: 'pottery barn teen', amount: (subTotal + shippingAmount + estimatedTax).toString()}

      let lineItems = [
        {
          "label": "Subtotal",
          "type": "final",
          "amount": subTotal
        },
        {
            "label": "Shipping",
            "amount": shippingAmount,
            "type": "final"
        },
        {
            "label": "Estimated Tax",
            "amount": estimatedTax,
            "type": "final"
        }
      ]

      let paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities: ['supports3DS'],
        shippingMethods,
        shippingType: "shipping",
        lineItems,
        total,
        requiredShippingContactFields: ["name", "postalAddress" ],
      }
    
      const session = new window.ApplePaySession(6, paymentRequest)

      session.onshippingmethodselected = event => {
        let newShippingAmount

        if (event.shippingMethod.identifier === "Standard") {
          newShippingAmount = 2
        } else if (event.shippingMethod.identifier === "Express") {
          newShippingAmount = 5
        } else {
          newShippingAmount = 0
        }

        const total = {label: 'pottery barn teen', amount: (subTotal + newShippingAmount + estimatedTax).toString()}
        const lineItems = [
          {
            "label": "Subtotal",
            "type": "final",
            "amount": subTotal
          },
          {
              "label": "Shipping",
              "amount": newShippingAmount,
              "type": "final"
          },
          {
              "label": "Estimated Tax",
              "amount": estimatedTax,
              "type": "final"
          }
        ]

        const update = { newTotal: total, newLineItems: lineItems}

        session.completeShippingMethodSelection(update)
      };

      session.begin()    
    }
  }

  const renderBtn = () => {
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
        return <div onClick={() => beginPayment()} className="apple-pay-button-with-text apple-pay-button-black"></div>
    } else {
      return <div>apple pay not supported</div>
    }
  }
  
  return (
    <div className="App">
      <h1>Apple Pay POC</h1>
      {renderBtn()}
    </div>
  );
}

export default App;
