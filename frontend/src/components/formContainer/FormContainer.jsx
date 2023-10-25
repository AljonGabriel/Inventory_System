import {Container, Row, Col} from "react-bootstrap";

function FormContainer({children}) {
  return (
    <>
      <Container>
        <Row className='justify-content-md-center mt-5 '>
          <Col xs={12} lg={6} className='p-5'>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormContainer;
