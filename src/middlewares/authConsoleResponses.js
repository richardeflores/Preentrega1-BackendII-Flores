export const loginResponse = (req, res, next) => {
    try {
        if (!req?.user) {
            console.log("Error: No se pudo ingresar el usuario");
            return;
        }
        console.log("Usuario Logueado:", req.user);
        console.log("Cookie:", req.cookies);
    } catch (error) {
        next(error);
    }
};

export const registerResponse = (req, res, next) => {
    try {
        if (!req?.user) {
            console.log("Error: No se pudo registrar el usuario");
            return;
        }
        console.log("Usuario Registrado:", req.user);
        console.log("Cookie:", req.cookies);
    } catch (error) {
        next(error);
    }
};