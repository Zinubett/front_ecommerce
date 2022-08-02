import React, { useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import ShopItem from "../../components/ShopItem";
import { Footer } from "../../components/Footer";

const initialState: Store = {
  Designation: "",
  Listshop: [],
};

export default function Shops() {
  const [store, setStore] = React.useState<Store>(initialState);
  const [logo, setLogo] = React.useState<logoProps[]>([]);

  // const { designation } = useParams();
  const getShops = async () => {
    axios
      .get(`http://localhost:4000/franchise?designation=Cafee`)
      .then((response) => {
        setStore(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log({ error });
      });
  };
  useEffect(() => {
    // if (designation) {
    getShops();
    // }
  }, []);

  const getlogo = async () => {
    axios
      .get(`http://localhost:4000/logo?designation=Cafee`)
      .then((response) => {
        setLogo(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log({ error });
      });
  };
  useEffect(() => {
    // if (designation) {
    getlogo();
    // }
  }, []);

  // travail demandé: <>? -declarer le type de store - rederiction de home vers shops 3-comment appeller la fonction getShops()
  return (
    <>
      {logo.map((item: any) => (
        <Navbar logo={item.logo} />
      ))}{" "}
      <Container fluid="md">
        <h1>{store.Designation}</h1>
        <Row md={2} xs={1} lg={3}>
          {/* */}
          {store.Listshop.map((item: any) => (
            <Col key={item.shop_id} lg={4} sm={12} xl={4} xs={12} md={6}>
              <ShopItem {...item} />
            </Col>
          ))}
          {/* </Col> */}
        </Row>
      </Container>
      {logo.map((item: any) => (
        <Footer logo={item.logo} />
      ))}
    </>
  );
}
