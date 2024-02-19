import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'


type Props = {
    setOpen:((open:boolean)=>void)
    data:any
}

const CheckOutForm = ({setOpen,data}: Props) => {

    const stripe=useStripe()
    const elements=useElements()
    const [message, setMessage] = useState<any>('')
     const[createOrder,{data:orderData,error}]=useCreateOrderMutation()
     const [loadUser, setLoadUser] = useState(false)
     const {}=useLoadUserQuery({skip:loadUser?false:true})
     const [isLoading, setIsLoading] = useState(false)
     const handleSubmit = async (e:any) => {
     }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <LinkAuthenticationElement id="link-authentication-element"
      // Access the email value like so:
      // onChange={(event) => {
      //  setEmail(event.value.email);
      // }}
      //
      // Prefill the email field like so:
      // options={{defaultValues: {email: 'foo@bar.com'}}}
      />
    <PaymentElement id="payment-element" />
    <button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text">
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </span>
    </button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
  </form>
  )
}

export default CheckOutForm