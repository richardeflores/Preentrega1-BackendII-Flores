document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.status === 200) {
            console.log("Usuario ingresado con éxito:", result);
        } else if (result.status === 401) {
            console.error("Error al ingresar el usuario:", result.message);
            alert("Email o contraseña incorrectos");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        } else {
            console.error("Error al ingresar el usuario:", result.message);
            alert("Error al ingresar el usuario:", result.message);
        }
    } catch (error) {
        console.error("Error al enviar datos:", error);
    }
});
