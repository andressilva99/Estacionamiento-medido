const user = {
    idUser: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    razonSocial: "",
    userName: "",
    email: "",
    numberPhone: "",
    phoneCompany: {
        idPhoneCompany: undefined,
        name: "",
    },
    typeDocument: {
        idTypeDocument: undefined,
        name: "",
    },
    vehicles: [],
    token: "",
    balance: "",
    password: "",
    tickets: [],
    tokenNotification: undefined,
    enableParking: true,
};

export default {
    user,
};
