import {
  Alert,
  Button,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  NumberInput,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getBestellungenData } from "../../redux/selectors/appState";
import { requestBestellungenDataFetch } from "../../redux/actions/app_state";
import PorscheImageForegroundLarge from "../../assets/images/porsche-model-largev2.png";
import "./style";
import { AlertCircle } from "tabler-icons-react";

const BestellungenPage = () => {
  const ref = useRef();
  const params = useParams("id");
  const navigate = useNavigate();
  const [bestellungsNummerParam, setBestellungsNummerParam] = useState(null);
  const dispatch = useDispatch();
  const bestellungsData = useSelector(getBestellungenData);
  const [bestellungsDataRequestFailed, setBestellungsDataRequestFailed] =
    useState();

  const [isDataLoading, setIsDataLoading] = useState();

  const handleBestellnummerSubmit = useCallback(() => {
    navigate(`../bestellungen/${ref.current.value}`, { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (bestellungsData === null || Object.keys(bestellungsData) == 0) {
      setBestellungsDataRequestFailed(true);
    } else {
      setBestellungsDataRequestFailed(false);
    }
    setIsDataLoading(false);
  }, [bestellungsData]);

  const handleDispatch = useCallback(
    (id) => {
      dispatch(requestBestellungenDataFetch({ bestellnummer: id }));
      setIsDataLoading(true);
    },
    [dispatch]
  );

  useEffect(() => {
    const param = params?.id;
    if (param === null || param === undefined) {
      setBestellungsNummerParam(null);
    } else {
      var parsedInt;
      try {
        parsedInt = parseInt(param);
        if (isNaN(parsedInt)) {
          throw new Error("Parse Error");
        }
        setBestellungsNummerParam(parsedInt);
        handleDispatch(parsedInt);
      } catch (error) {
        setBestellungsNummerParam(null);
      }
    }
  }, [params, handleDispatch]);

  return (
    <div className="wsb-page wbs-datenschutz-page">
      <Paper withBorder shadow="xl" p="xl" className="wsb-bestellungs-paper">
        <Title order={1}>Bestellung</Title>
        <Divider />
        <div className="wsb-bestellungs-paper__content">
          <Space h="md" />
          {isDataLoading ? (
            <LoadingOverlay visible={isDataLoading} />
          ) : (
            <>
              {bestellungsNummerParam === null ? (
                <>
                  <NumberInput
                    ref={ref}
                    defaultValue={18}
                    placeholder="Bestellnummer"
                    label="Bestellnummer"
                    required
                  />
                  <Space h="md" />
                  <Button onClick={handleBestellnummerSubmit}>
                    Bestellung suchen
                  </Button>
                </>
              ) : (
                <>
                  {bestellungsDataRequestFailed ? (
                    <Alert
                      icon={<AlertCircle size={16} />}
                      title="Oops!"
                      color="red"
                    >
                      Es scheint, als würde es diese Bestellung nicht geben.
                    </Alert>
                  ) : (
                    <>
                      <Group position="apart">
                        <Text>{`Bestellnummer: `}</Text>
                        <Text weight={700}>{bestellungsNummerParam}</Text>
                      </Group>
                      <Divider
                        my="md"
                        label="Kundendaten"
                        labelPosition="center"
                      />
                      <Group position="apart">
                        <Text>{`Kundenname: `}</Text>
                        <Text>{bestellungsData?.bestellung?.kundenname}</Text>
                      </Group>
                      <Divider
                        my="md"
                        label="KFZ Konfiguration"
                        labelPosition="center"
                      />
                      <Image
                        fit="contain"
                        src={PorscheImageForegroundLarge}
                      ></Image>
                      <Group position="apart">
                        <Text>
                          {bestellungsData?.kfzKonfiguration?.kfz?.name}
                        </Text>
                        <Text
                          weight={700}
                        >{`${bestellungsData?.kfzKonfiguration?.kfz?.grundpreis} €`}</Text>
                      </Group>
                      <Divider my="md" variant="dashed" />
                      {Object.keys(bestellungsData?.kfzKonfiguration).map(
                        (e, i) => {
                          if (
                            i != 0 &&
                            bestellungsData?.kfzKonfiguration?.[e]?.name
                          ) {
                            return (
                              <Group key={i} position="apart">
                                <Text>
                                  {bestellungsData?.kfzKonfiguration?.[e]?.name}
                                </Text>
                                <Text
                                  weight={700}
                                >{`${bestellungsData?.kfzKonfiguration?.[e]?.preis} €`}</Text>
                              </Group>
                            );
                          }
                        }
                      )}
                      <Space h="md" />
                      <Group position="apart">
                        <Text weight={700}>{`Summe: `}</Text>
                        <Text weight={700}>
                          {`${bestellungsData?.bestellung?.bestellsumme} €`}
                        </Text>
                      </Group>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default BestellungenPage;
