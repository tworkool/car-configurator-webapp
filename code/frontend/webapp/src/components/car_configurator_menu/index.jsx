import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCarConfigTypesData,
  getCarTypesData,
} from "../../redux/selectors/appState";
import {
  Title,
  Accordion,
  Skeleton,
  Card,
  Button,
  Text,
  Group,
  Alert,
  Badge,
  Stack,
  Space,
  Paper,
  Divider,
} from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useClickOutside } from "@mantine/hooks";
import "./style";

const CarConfiguratorMenu = (props) => {
  const { onOrderAccepted = () => {} } = props;
  const carConfigTypes = useSelector(getCarConfigTypesData);
  //const carTypes = useSelector(getCarTypesData);
  const [alteredCarConfigTypesData, setAlteredCarConfigTypesData] =
    useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const ref = useClickOutside(() => setIsExpanded(false));
  const [selectedItems, setSelectedItems] = useState({});

  const handleExpanderClicked = useCallback(() => {
    setIsExpanded((old) => !old);
  }, [setIsExpanded]);

  const handleOrderAcceptedButton = useCallback(() => {
    setIsExpanded(false);
    onOrderAccepted();
  }, [onOrderAccepted]);

  useEffect(() => {
    if (carConfigTypes !== null) {
      setIsLoadingData(false);
      var newSelectedItems = {};
      const newCarConfigTypesData = [...carConfigTypes];
      for (const e of newCarConfigTypesData) {
        const defaultItem = {
          beschreibung: "",
          name: "Keine Auswahl",
          preis: 0,
          id: -1337,
        };
        e.typeValue.unshift(defaultItem);
        newSelectedItems = {
          ...newSelectedItems,
          [e.typeInfo.name]: defaultItem,
        };
      }
      setAlteredCarConfigTypesData(newCarConfigTypesData);
      setSelectedItems(newSelectedItems);
    } else {
      setAlteredCarConfigTypesData(carConfigTypes);
      setSelectedItems({});
    }
  }, [carConfigTypes]);

  const handleSelectionChange = useCallback((category, item) => {
    setSelectedItems((old) => ({
      ...old,
      [category]: item,
    }));
  }, []);

  return (
    <div
      ref={ref}
      className={`wbs-car-configuration-menu ${
        isExpanded ? "wbs-car-configuration-menu--expanded" : ""
      }`}
    >
      <button
        className="wbs-car-configuration-menu__extender-button"
        type="button"
        onClick={handleExpanderClicked}
      ></button>
      <div className="wbs-car-configuration-menu__backdrop-bar" />
      <div className="wbs-car-configuration-menu__content-wrapper">
        <div className="wbs-car-configuration-menu__content">
          <Title order={3} className="m-t-l">
            Konfigurationsoptionen
          </Title>
          <Divider
            my="md"
            label="Optionen konfigurieren"
            labelPosition="right"
          />
          <Skeleton radius="sm" visible={isLoadingData}>
            {alteredCarConfigTypesData == null ? (
              <Alert icon={<AlertCircle size={16} />} title="Oops!" color="red">
                The data could not be loaded correctly. Please try to reload the
                page!
              </Alert>
            ) : (
              <Accordion offsetIcon={false}>
                {alteredCarConfigTypesData.map((e, i) => {
                  const categoryPrice =
                    selectedItems?.[e.typeInfo.name]?.["preis"];
                  return (
                    <Accordion.Item
                      key={i}
                      label={`${e.typeInfo.name} ${
                        categoryPrice ? ` ( + ${categoryPrice}€ )` : ""
                      }`}
                    >
                      <div className="m-b-l">{e.typeInfo.beschreibung}</div>
                      {e.typeValue.map((ee, ii) => {
                        const isItemSelected =
                          selectedItems?.[e.typeInfo.name]?.["id"] == ee.id;
                        return (
                          <Card
                            className={`wbs-car-configuration-menu__item-card ${
                              isItemSelected
                                ? "wbs-car-configuration-menu__item-card--selected"
                                : ""
                            } m-b-l`}
                            key={ii}
                            shadow="sm"
                            p="lg"
                            onClick={() => {
                              handleSelectionChange(e.typeInfo.name, ee);
                            }}
                          >
                            {isItemSelected && (
                              <Badge className="m-b-m" radius="sm">
                                Ausgewählt
                              </Badge>
                            )}
                            <Group position="apart">
                              <Text weight={700}>{ee.name}</Text>
                              <Text weight={700}>{`${ee.preis} €`}</Text>
                            </Group>
                            <Text>{ee.beschreibung}</Text>
                          </Card>
                        );
                      })}
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            )}
          </Skeleton>
          <Divider
            my="md"
            label="Zusammenfassung und Bestellung"
            labelPosition="right"
          />
          <Paper shadow="md" radius="xs" p="md" withBorder>
            <Title order={4}>Zusammenfassung</Title>
            <Space h="md" />
            <Stack spacing="xs">
              {Object.keys(selectedItems).map((k, i) => {
                const itemName = `${k} / ${selectedItems[k]["name"]}`;
                const itemPrice = selectedItems[k]["preis"];
                return (
                  <React.Fragment key={i}>
                    <Group position="apart">
                      <Text>{itemName}</Text>
                      <Text weight={700} color="green">{`${itemPrice} €`}</Text>
                    </Group>
                    <Divider
                      my="xs"
                      variant={
                        Object.keys(selectedItems).length - 1 == i
                          ? "solid"
                          : "dashed"
                      }
                    />
                  </React.Fragment>
                );
              })}
              <Group position="apart">
                <Text weight={700}>Gesamtsumme Konfiguration</Text>
                <Text weight={700} color="green">
                  {`${Object.keys(selectedItems).reduce(
                    (p, c) => p + selectedItems[c].preis,
                    0
                  )} €`}
                </Text>
              </Group>
            </Stack>
            <Space h="lg" />
            <Button
              disabled={isLoadingData}
              onClick={handleOrderAcceptedButton}
            >
              Bestätigen und Weiter
            </Button>
          </Paper>
          <Space h="md" />
        </div>
      </div>
    </div>
  );
};

export default CarConfiguratorMenu;
