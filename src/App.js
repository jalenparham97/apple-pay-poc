import React from 'react';
import './App.css';

function App() {
  const beginPayment = () => {
    if (window.ApplePaySession) {
      let paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities: ['supports3DS'],
        shippingMethods: [
          {
            "label": "Free Shipping",
            "detail": "Arrives in 5 to 7 days",
            "amount": "0.00",
            "identifier": "FreeShip"
          },
          {
            "label": "Express Shipping",
            "detail": "Arrives in 1 to 2 days",
            "amount": "5.00",
            "identifier": "Express"
          },
        ],
        shippingType: "shipping",
        total: { label: 'Me my money', amount: '1.99'},
        requiredShippingContactFields: ["name", "postalAddress" ],
      }
    
      const session = new window.ApplePaySession(6, paymentRequest);
      session.begin()    
    }
  }

  const renderBtn = () => {
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
        return <div onClick={() => beginPayment()} className="apple-pay-button apple-pay-button-black"></div>
    } else {
      return <div>apple pay not supported</div>
    }
  }
  
  return (
    <div className="App">
      <h1>Hello World</h1>
      {renderBtn()}
    </div>
  );
}

export default App;
