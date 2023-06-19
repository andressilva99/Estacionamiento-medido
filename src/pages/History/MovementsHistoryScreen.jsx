import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
    Button,
    Flex,
    HStack,
    NativeBaseProvider,
    Select,
    Spacer,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import InputDate from "../../components/InputDate";
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import loggedUser from "../../objects/user";
import HeaderPage from "../../components/HeaderPage";
import constants from "../../constants/constants";

const { height } = Dimensions.get("screen");

const MovementsHistoryScreen = ({ navigation }) => {
    const [dateInitial, setDateInitial] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [patentSelected, setPatentSelected] = useState();
    const [consult, setConsult] = useState(false);

    const [listMovements, setListMovements] = useState([]);

    // const response = {
    //     data: {
    //         mensaje: [
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //             {
    //                 fecha: "2023-11-25T00:00:00.000Z",
    //                 debito: "500",
    //                 credito: "0",
    //                 saldo: "150",
    //             },
    //         ],
    //     },
    // };

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    const SearchHistory = async () => {
        const config = {
            headers: {
                Authorization: `bearer ${loggedUser.user.token}`,
            },
        };

        const yearInitial = dateInitial.getFullYear();
        const monthInitial = String(dateInitial.getMonth() + 1).padStart(
            2,
            "0"
        );
        const dayInitial = String(dateInitial.getDate()).padStart(2, "0");
        const formattedDateInitial = `${yearInitial}-${monthInitial}-${dayInitial}`;

        const yearEnd = dateEnd.getFullYear();
        const monthEnd = String(dateEnd.getMonth() + 1).padStart(2, "0");
        const dayEnd = String(dateEnd.getDate()).padStart(2, "0");
        const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}`;

        const see = {
            historial: {
                fechaInicio: formattedDateInitial,
                fechaFin: formattedDateEnd,
                idVehiculo: patentSelected,
                idUsuario: loggedUser.user.idUser,
            },
        };

        await constants.AXIOS_INST.get("historial/movimientos", config, see)
            .then((resp) => {
                completeListMovements(resp);
                setConsult(!consult);
            })
            .catch((error) => {
                alert(error.response.data.mensaje);
            });
    };

    const completeListMovements = (response) => {
        const list = [];
        response.data.mensaje.forEach((movement) => {
            const dateString = movement.fecha;
            const dateObject = new Date(dateString);
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            list.push({
                date: formattedDate,
                debit: movement.debito,
                credit: movement.credito,
                amount: movement.saldo,
            });
        });
        setListMovements(list);
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <VStack
                height={height}
                alignItems={"center"}
                style={styles.backgroundContainer}
                space="sm"
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <HStack alignItems="flex-start" minW="85%">
                    <Text>Movimientos</Text>
                </HStack>
                {consult ? (
                    <>
                        <VStack space="sm">
                            <HStack minW="85%">
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerLeft,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Fecha
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerCenter,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Débito
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerCenter,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Crédito
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerRight,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Saldo
                                    </Text>
                                </Stack>
                            </HStack>
                            <ScrollView style={styles.scrollView}>
                                <VStack space="sm">
                                    {listMovements.map((movement, index) => (
                                        <HStack minW="85%" key={index}>
                                            <Stack
                                                style={[
                                                    styles.tableContainer,
                                                    styles.tableContainerLeft,
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.textTableItems
                                                    }
                                                >
                                                    {movement.date}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                style={[
                                                    styles.tableContainer,
                                                    styles.tableContainerCenter,
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.textTableItems
                                                    }
                                                >
                                                    {movement.debit}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                style={[
                                                    styles.tableContainer,
                                                    styles.tableContainerCenter,
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.textTableItems
                                                    }
                                                >
                                                    {movement.credit}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                style={[
                                                    styles.tableContainer,
                                                    styles.tableContainerRight,
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.textTableItems
                                                    }
                                                >
                                                    {movement.amount}
                                                </Text>
                                            </Stack>
                                        </HStack>
                                    ))}
                                </VStack>
                            </ScrollView>
                            <Button
                                style={styles.button}
                                onPress={() => setConsult(!consult)}
                            >
                                <Text style={styles.textButton}>
                                    Volver a consultar
                                </Text>
                            </Button>
                        </VStack>
                    </>
                ) : (
                    <>
                        <HStack maxW="85%">
                            <InputDate
                                text="Desde"
                                setDateSent={setDateInitial}
                            ></InputDate>
                        </HStack>
                        <HStack maxW="85%">
                            <InputDate
                                text="Hasta"
                                setDateSent={setDateEnd}
                            ></InputDate>
                        </HStack>
                        <HStack style={styles.containerVehicle}>
                            <FontAwesome5 name="car" style={styles.icon} />
                            <Text style={styles.text}>Móvil</Text>
                            <Spacer></Spacer>
                            <FontAwesome
                                name="chevron-down"
                                style={styles.icon}
                            />
                        </HStack>
                        <Stack style={styles.select}>
                            <Select
                                borderWidth={0}
                                selectedValue={patentSelected}
                                style={styles.text}
                                marginLeft="10%"
                                onValueChange={setPatentSelected}
                            >
                                {loggedUser.user.vehicles.map((vehicle) => (
                                    <Select.Item
                                        key={vehicle.idVehicle}
                                        label={vehicle.patent}
                                        value={vehicle.idVehicle}
                                    ></Select.Item>
                                ))}
                            </Select>
                        </Stack>
                        <Button style={styles.button} onPress={SearchHistory}>
                            <Text style={styles.textButton}>Consultar</Text>
                        </Button>
                    </>
                )}
            </VStack>
        </NativeBaseProvider>
    );
};

export default MovementsHistoryScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerVehicle: {
        minWidth: "85%",
        backgroundColor: "#7bb6de",
        borderWidth: 1,
        borderColor: "#dadadc",
        borderRadius: 30,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
    },
    text: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "white",
        paddingLeft: "10@ms",
    },
    icon: {
        color: "white",
        fontSize: "24@ms",
    },
    select: {
        minWidth: "85%",
        backgroundColor: "#bbbcc0",
        borderWidth: 1,
        borderColor: "#dadadc",
        borderRadius: 30,
        minHeight: "6%",
    },
    button: {
        minWidth: "85%",
        backgroundColor: "#c4e5f6",
        borderWidth: 1,
        borderColor: "#dadadc",
        borderRadius: 30,
        minHeight: "6%",
    },
    textButton: {
        color: "#1290c0",
        fontSize: "19@ms",
        fontWeight: "bold",
    },
    tableContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderColor: "#d3d3d3",
        paddingVertical: "3%",
    },
    tableContainerCenter: {
        borderRadius: 0,
        borderWidth: 1,
        borderRightWidth: 0,
    },
    tableContainerLeft: {
        borderWidth: 1,
        borderRadius: 0,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderRightWidth: 0,
    },
    tableContainerRight: {
        borderWidth: 1,
        borderRadius: 0,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
    },
    textTableHeader: {
        fontSize: "16@ms",
        fontWeight: "bold",
        color: "#3f60af",
    },
    textTableItems: {
        fontSize: "13@ms",
        color: "#4c5564",
    },
    scrollView: {
        maxHeight: "68%",
    },
});
