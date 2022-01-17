import { useState, useReducer,useContext } from 'react';
import setAuth from './connectUser';
import { verifyInp } from '../inputsHandle';
import Load from '../API_indicators/spinner';
import ErrorIndicator from '../API_indicators/Alert';
import { Form, Button } from 'react-bootstrap';
import {SetUserContext} from '../../App'


export default function HandleUser({ action}) {
    const setUser=useContext(SetUserContext)
    const [inputs, dispatch] = useReducer(verifyInp, { Valid: true });
    const [Err, seterr] = useState(null);
    const [loading, setLoading] = useState(false);

    function loginUpSubmit(e) {
        e.preventDefault();
        if (!inputs.Valid) {
            const userFormData={ email: inputs.email, password: inputs.password }
            setLoading(true);
            setAuth(action,userFormData,setUser, setLoading, seterr);
        }
    }
    function inputsHandle(e) {
        const { value, name } = e.target;
        return dispatch({ value: value, type: name,login:action});
    }
    return (
        <div>
    <Form onSubmit={loginUpSubmit} onChange={inputsHandle}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control  type="email" name='email' placeholder="Enter email" />
            <Form.Text className="text-muted">
        We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control autoComplete='cuurent-password' type="password" name='password' placeholder="Password" />
        </Form.Group>
        {action?null:<Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control autoComplete='cuurent-password' type="password" name='confirmPassword' placeholder="confirmPassword" />
        </Form.Group>}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Button disabled={inputs.Valid} variant="primary" type="submit">
            {action?"Login":"Register"}
        </Button>
        {loading ? <Load /> : null}
        {Err ? <ErrorIndicator message={Err.data.error.message} /> : null}
    </Form>
        </div>
    );
}
