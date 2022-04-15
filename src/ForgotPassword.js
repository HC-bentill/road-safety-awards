import React, { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { Button, Form } from 'react-bootstrap';
import './forgotpassword.css'
import { Link } from 'react-router-dom';

function ForgotPassword () {
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    // 2 params, string, object
    axios
    .post('https://drifan-take-home-assignment.herokuapp.com/api/auth/reset/email', {
      email: email,
    },
    )
    .then(response => {
      // Handle success.
      console.log( "message :", response )

      const message = response.data.success;

      //disable button after submit
      setDisable(true)

      // if else statement to handle response to user
      if ( message ) {
        swal({
          title: "Success",
          text: `${response.data.message}`,
          icon: "success",
        } );
      } else {
        swal({
          title: "Oops !",
          text: `${response.data.message}`,
          icon: "error",
        } );
        //enable button if error occurs
        setDisable(false)

      }
    })
    .catch(error => {
      // Handle error.
      swal({
        title: "Oops !",
        text: "An Error Occured ",
        icon: "error",
      });
      console.log( 'An error occurred:', error );
    });

}

  return (
    <div className='container'>
        <h3 className='pt-5'>Forgot Password</h3>
          <Form className='p-4 w-100' onSubmit={handleSubmit} formNoValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                  <input
                      className='form-control'
                      type="email"
                      placeholder="Enter Email"
                      id="emmail"
                      name="emmail"
                      value={email}
                      onChange={e => setEmail( e.target.value )}
                      required
                  />
            </Form.Group>
            <Button className="mt-4 mb-4" disabled={disable} style={{width:"100%", background:"#383082"}} type="submit">
                Submit
            </Button>
            <Form.Group className="text-center" controlId="">
                <Form.Text className="text-muted">
                    <Link style={{textDecoration:"none", color:"#383082"}} to="/">Return to Home Screen</Link>
                </Form.Text>
            </Form.Group>              
        </Form>
    </div>
  )
}

export default ForgotPassword