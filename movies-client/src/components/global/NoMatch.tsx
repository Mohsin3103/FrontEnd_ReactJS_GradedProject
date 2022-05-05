import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

const NoMatch = () => {
    return (
        <Container>
            <h1>404 NOT FOUND</h1>
            <Image fluid={true} src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png" alt="Resource Not Found"/>
        </Container>
    );
};

export default NoMatch;