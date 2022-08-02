import React, { useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Container } from "react-bootstrap";
import { Navbar } from "../../components/Navbar";
import FranchiseItem from "../../components/FranchiseItem";

export default function Franchise() {
  const [franchise, setFranchise] = React.useState<FranchiseProps[]>([]);

  const getFranchise = async () => {
    axios
      .get("http://localhost:4000/allfranchise")
      .then((response) => {
        setFranchise(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log({ error });
      });
  };
  useEffect(() => {
    getFranchise();
  }, []);

  return (
    <>
      <Navbar logo="/images/franchise.png" />
      <Container fluid="md">
        <Row md={2} xs={1} lg={3}>
          {franchise?.map((item: any) => (
            <>
              <Col key={item.iuud} lg={4} sm={12} xl={4} xs={12} md={6}>
                <FranchiseItem {...item} />
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </>
  );
}
