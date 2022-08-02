import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ImCoinEuro } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { TbPaperBag } from "react-icons/tb";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Cb } from "./Cb";
import { Cf } from "./Cf";
import { Euro } from "./Euro";
import { Col, Card } from "react-bootstrap";

export default function ShopItem({
  shop_id,
  designation,
  adresse,
  tel,
  image,
  couleur,
  logo,
}: ShopItemProps) {
  const [horaire, setHoraire] = React.useState<any>([]);
  const [ouvert, setOuvert] = React.useState<boolean>(false);

  const getHoraire = async (designation: string) => {
    const showdate = new Date();
    const days = showdate.getDay();
    const day: string = `${days}`;

    axios
      .get(
        `http://localhost:4000/horaire?jour=${day}&designation=${designation}`
      )
      .then((response) => {
        setHoraire(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log({ error });
      });
  };

  const isOpen = () => {
    const showdate = new Date();
    const moment = require("moment");
    let myDate;
    myDate = moment().format("d MM YYYY , h:mm");
    var date = moment().format("d MM YYYY");

    const heur = showdate.getHours();
    const hours = `${heur}`;
    const menite = showdate.getMinutes();
    const menites = `${menite}`;
    const len = horaire.debut || [];
    for (let i = 0; i <= len.length - 1; i++) {
      const start: number = Number(len[i].replace(":", ""));
      console.log(start);

      const end: number = Number(horaire.fin[i].replace(":", ""));
      console.log(end);

      if (Number(`${menites}`) < 10) {
        if (start > end) {
          const h: number = Number([`${hours}`.concat(`0${menites}`)]);

          if (h >= end && h >= start) {
            let tdDate = `${date}`.concat(`-${len[i]}`);
            date = moment().format("d MM YYYY") + 1;
            let tmDate = `${date}`.concat(`-${horaire.fin[i]}`);
            var tmoDate = new Date(`${tmDate}`);
            var tdoDate = new Date(tdDate);
            console.log("tmodate:", tmoDate);
            if (tdDate <= myDate && myDate <= tmDate) {
              setOuvert(true);
            }
          }
        }
        const h: number = Number([`${hours}`.concat(`0${menites}`)]);
        console.log(h);
      } else {
        const h: number = Number([`${hours}`.concat(`${menites}`)]);
        console.log(h);
        if (start > end) {
          if (h >= end && h >= start) {
            let tdDate = `${date}`.concat(`-${len[i]}`);
            date = moment().format("d MM YYYY") + 1;
            let tmDate = `${date}`.concat(`-${horaire.fin[i]}`);
            var tmoDate = new Date(`${tmDate}`);
            var tdoDate = new Date(tdDate);
            console.log("tmodate:", tmoDate);
            if (tdDate <= myDate && myDate <= tmDate) {
              setOuvert(true);
            }
          }
        }
        if (start <= h && h <= end) {
          setOuvert(true);
        }
      }
    }
  };

  console.log(ouvert);
  useEffect(() => {
    getHoraire(designation);
  }, [designation]);
  useEffect(() => {
    if (horaire) {
      isOpen();
    }
  }, [horaire]);

  return (
    <React.Fragment>
      <Card
        style={{ width: "100%", borderColor: `${couleur}` }}
        className="m-2"
      >
        <Card.Img
          variant="top"
          src={image}
          height="250px"
          width="100%"
          style={{ objectFit: "contain" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="d-flex justify-content-space-between align-items-baseline  mb-4"
            style={{ width: "100%" }}
          >
            <span className="fs-2 " style={{ color: `${couleur}` }}>
              {designation},
            </span>
            <span className="fs-2 " style={{ width: "auto" }}>
              {ouvert ? (
                <div
                  style={{ color: "green" }}
                  className=" fs-2 ml-4 text-align-last"
                >
                  Ouvert
                </div>
              ) : (
                <div
                  style={{ color: "red" }}
                  className="fs-2 ml-4 text-align-last"
                >
                  Fermé
                </div>
              )}
            </span>
          </Card.Title>
          <Card.Subtitle className="mb-2 fs-5 tex-mutest">
            <span className="ms-2 tex-mutest">{adresse}</span>, {tel}
          </Card.Subtitle>
          <Card.Text>
            <IconContext.Provider
              value={{ size: "2em", className: "m-2", color: `${couleur}` }}
            >
              <div className="d-flex justify-content-space-between align-items-baseline ">
                <TbPaperBag />
                <MdDeliveryDining />

                <BiDish />
              </div>
              <div className=" ">
                <ImCoinEuro />

                <BsFillCreditCardFill />
                <BsFillCreditCard2FrontFill />
              </div>
            </IconContext.Provider>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
