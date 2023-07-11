import loggedUser from "../objects/user";
import constants from "../constants/constants";

export const sendTokenNotification = async () => {
    console.log(loggedUser.user.idUser);
    console.log(loggedUser.user.token)

    await constants
        .AXIOS_INST({
            method: "post",
            url: "usuario/registrar/registrarToken",
            headers: {
                Authorization: `bearer ${loggedUser.user.token}`,
            },
            data: {
                device: {
                    token: loggedUser.user.tokenNotification,
                    idUsuario: loggedUser.user.idUser,
                },
            },
        })
        .then(() => {
            console.log("Token registrado");
        })
        .catch((error) => {
            console.error("No se registró el token");
            console.error(error);
        });
};
