import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CarConfiguratorInfo from "../../components/car_configurator_info";
import CarConfiguratorMenu from "../../components/car_configurator_menu";
import PorscheImageForegroundLarge from "../../assets/images/porsche-model-largev2.png";
import { AlertCircle, At } from "tabler-icons-react";
import {
  requestCarTypesDataFetch,
  requestCarConfigtypesDataFetch,
} from "../../redux/actions/app_state";
import "./style";
import {
  Alert,
  Button,
  Image,
  Modal,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useLocation } from "react-router";

const CarConfiguratorPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOrderModalOpen, setIsorderModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  console.log(location, window.location);

  useEffect(() => {
    dispatch(requestCarConfigtypesDataFetch());
    dispatch(requestCarTypesDataFetch());
  }, [dispatch]);

  return (
    <div className="wsb-page wbs-carconfigurator-page">
      <div className="wbs-carconfigurator-page__backdrop">
        {/* <Image
          className="wbs-carconfigurator-page__backdrop__img"
          fit="contain"
          height="100%"
          src="https://static.vecteezy.com/system/resources/previews/002/176/556/large_2x/white-with-gray-panoramic-studio-background-with-white-glow-vector.jpg"
        ></Image> */}
        <Image
          className="wbs-carconfigurator-page__backdrop__img"
          fit="contain"
          src={PorscheImageForegroundLarge}
        ></Image>
      </div>
      <CarConfiguratorInfo />
      <CarConfiguratorMenu
        onOrderAccepted={() => {
          setIsorderModalOpen(true);
          setOrderNumber(Math.floor(Math.random() * 9999999));
        }}
      />
      <Modal
        opened={isOrderModalOpen}
        onClose={() => setIsorderModalOpen(false)}
        size="lg"
        title="Bestellung abschließen"
      >
        <TextInput placeholder="Vorname" label="Vorname" required />
        <TextInput placeholder="Nachname" label="Nachname" required />
        <TextInput
          placeholder="E-Mail"
          label="E-Mail"
          required
          icon={<At size={14} />}
        />
        <Space h="md" />
        <Text size="700">{`Bestellnummer: ${orderNumber}`}</Text>
        <Alert
          icon={<AlertCircle size={16} />}
          title="Fast geschafft!"
          color="yellow"
        >
          Nachdem sie Ihre Bestellung abgeschlossen haben, können sie die
          Bestellung unter dem folgenden Link mit Ihrer Bestellnummer einsehen:{" "}
          <a
            href={`${window.location.origin}/bestellungen/${orderNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {orderNumber}
          </a>
        </Alert>
        <Space h="md" />
        <Button>Bestellung abschließen</Button>
      </Modal>
    </div>
  );
};

export default CarConfiguratorPage;
