import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarConfiguratorInfo from "../../components/car_configurator_info";
import CarConfiguratorMenu from "../../components/car_configurator_menu";
import PorscheImageForegroundLarge from "../../assets/images/porsche-model-largev2.png";
import { AlertCircle, At, Check } from "tabler-icons-react";
import { getBestellungenPostData } from "../../redux/selectors/appState";
import {
  requestCarTypesDataFetch,
  requestCarConfigtypesDataFetch,
  requestBestellungenDataPost,
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

const CarConfiguratorPage = () => {
  const bestellungenPostData = useSelector(getBestellungenPostData);
  const txtVornameRef = useRef();
  const txtNachnameRef = useRef();
  const dispatch = useDispatch();
  const [isOrderModalOpen, setIsorderModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [isPostSuccessful, setIsPostSuccessful] = useState(false);
  const [orderOptions, setOrderOptions] = useState({
    KFZKonfiguration: {
      id: 1, // doesnt matter
      kfz_id: null,
      motorleistung_id: null,
      felgen_id: null,
      lackierung_id: null,
    },
    bestellnummer: 999,
    kundenname: "",
  });

  useEffect(() => {
    dispatch(requestCarConfigtypesDataFetch());
    dispatch(requestCarTypesDataFetch());
  }, [dispatch]);

  useEffect(() => {
    setIsPostSuccessful(!!bestellungenPostData);
  }, [bestellungenPostData]);

  const handleOrderSubmit = useCallback(() => {
    const kundenName =
      `${txtVornameRef.current.value} ${txtNachnameRef.current.value}`.trim();
    setOrderOptions((old) => {
      const newState = {
        ...old,
        bestellnummer: orderNumber,
        kundenname: kundenName,
      };
      dispatch(requestBestellungenDataPost({ data: newState }));
      return newState;
    });
  }, [orderNumber, dispatch]);

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
        onOrderAccepted={(items) => {
          setOrderOptions((old) => ({
            ...old,
            KFZKonfiguration: {
              id: 1,
              kfz_id: 1,
              ...Object.keys(items).reduce(
                (p, c) => ({
                  ...p,
                  [`${c.toLowerCase()}_id`]:
                    items[c]?.id == -1337 ? null : items[c].id,
                }),
                {}
              ),
            },
          }));
          setIsorderModalOpen(true);
          setIsPostSuccessful(false);
          setOrderNumber(Math.floor(Math.random() * 9999999));
        }}
      />
      <Modal
        opened={isOrderModalOpen}
        onClose={() => setIsorderModalOpen(false)}
        size="lg"
        title="Bestellung abschließen"
      >
        <TextInput
          ref={txtVornameRef}
          placeholder="Vorname"
          label="Vorname"
          required
        />
        <TextInput
          ref={txtNachnameRef}
          placeholder="Nachname"
          label="Nachname"
          required
        />
        <TextInput
          placeholder="E-Mail"
          label="E-Mail"
          required
          icon={<At size={14} />}
        />
        <Space h="md" />
        <Text size="700">{`Bestellnummer: ${orderNumber}`}</Text>
        {!isPostSuccessful && (
          <>
            <Alert
              icon={<AlertCircle size={16} />}
              title="Fast geschafft!"
              color="yellow"
            >
              Nachdem sie Ihre Bestellung abgeschlossen haben, können sie die
              Bestellung unter dem folgenden Link mit Ihrer Bestellnummer
              einsehen:{" "}
              <a
                href={`${window.location.origin}/bestellungen/${orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {orderNumber}
              </a>
            </Alert>
            <Space h="md" />
            <Button onClick={handleOrderSubmit}>Bestellung abschließen</Button>
          </>
        )}
        {isPostSuccessful && (
          <>
            <Space h="md" />
            <Alert
              icon={<Check size={20} />}
              title="Bestellung wurde erfolgreich abgeschlossen"
              color="green"
              variant="filled"
            >
              Ihre Bestellung ist erfolgreich bei uns eingegangen. Unter dem
              folgenden Link können sie Ihre Bestellung einsehen:{" "}
              <a
                href={`${window.location.origin}/bestellungen/${orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {orderNumber}
              </a>
            </Alert>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CarConfiguratorPage;
