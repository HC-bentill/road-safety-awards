import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './Login.css'
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


function Login () {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ password, setPassword ] = useState( "" );
    const [disable, setDisable] = useState(false);


    const handleSubmit = async e => {
        e.preventDefault();

        // 2 params, string, object
        axios
        .post('https://drifan-take-home-assignment.herokuapp.com/api/auth/login', {
          phone: phoneNumber,
          password: password
        },
        )
        .then(response => {
          // Handle success.
          console.log( "message :", response )

          //disable button after submit
           setDisable(true)

          const message = response.data.success;

          // if else statement to handle response to user
          if ( message ) {
            swal({
              title: "Success",
              text: `${response.data.message}!`,
              icon: "success",
            } );
          } else {
            swal({
              title: "Oops !",
              text: `${response.data.message}!`,
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
            text: "An Error Occured",
            icon: "error",
          });
          console.log( 'An error occurred:', error );
        });
    
    }
    
  return (
      <div className='login_container'>
          <h3 className='pt-5'>Welcome to Ghana Driver <br></br>& Road Safety Awards 2022</h3>
          <Form className='p-4 w-100' onSubmit={handleSubmit} formNoValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                  <input
                      className='form-control'
                      type="text"
                      placeholder="Enter phone number"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber( e.target.value )}
                      required
                  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                  <input
                      className='form-control'
                      type="password"
                      placeholder="Password"
                      id="phone"
                      name="phone"
                      value={password}
                      onChange={e => setPassword( e.target.value )}
                      required
                  />
            </Form.Group>
            <Button className="mt-4 mb-4"  disabled={disable} style={{width: "100%", background:"#383082"}} type="submit">
                Log in
            </Button>
            <Form.Group className="text-center" controlId="">
                <Form.Text className="text-muted">
                    <Link style={{textDecoration:"none", color:"#383082"}} to="/forgotten-password">Forgoten Password ?</Link>
                </Form.Text>
            </Form.Group>              
        </Form>
      </div>
  )
}

export default Login