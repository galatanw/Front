import { Alert } from 'react-bootstrap'


export default function ErrorIndicator({message}) {
    return (
        <Alert variant={'danger '}>
         Hey!Error accured: {message} </Alert>
    )
}
