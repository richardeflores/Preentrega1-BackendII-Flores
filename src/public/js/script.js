const logoutButton = document.getElementById("logoutButton");

const logout = async () => {
    try {
        const response = await fetch("/api/sessions/logout", {
            method: "DELETE",
        });

        if (!response.ok) {
            alert("No existe ninguna sesion");
        } else {
            alert("Sesión cerrada correctamente");
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

logoutButton.addEventListener("click", logout);
