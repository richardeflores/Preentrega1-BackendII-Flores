/**
 * Calcula la edad del usuario
 * @param {Date} userDOB - Recibe la fecha de nacimiento del usuario
 * @return {Number} - Retorna la edad de el usuario actual
 */
const calculateUserAge = (userDOB) => {
    const userDayOfBirth = new Date(userDOB).getDate();
    const userMonthOfBirth = new Date(userDOB).getMonth();
    const userYearOfBirth = new Date(userDOB).getFullYear();
    const actualDay = new Date().getDate();
    const actualMonth = new Date().getMonth();
    const acutalYear = new Date().getFullYear();
    const userAge = acutalYear - userYearOfBirth;
    if ((actualMonth < userMonthOfBirth) || ((actualMonth == userMonthOfBirth) && (actualDay < userDayOfBirth))) {
        userAge--;
    }

    return userAge;
}

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        age: calculateUserAge(document.getElementById("dateOfBirth").value),
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value
    };

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.status === 409) {
            alert("El usuario que intentas registrar ya existe");
            console.log("Error: El usuario que intentas registrar ya existe");
            window.location.href = '/login';
        } else 
        if ((result.status === 201) || (result.status === 200)) {
            console.log('Usuario registrado con éxito:', result);
            window.location.href = '/';
        } else {
            console.error('Error en el registro:', result.message);
            alert("Error: " + result.message)
        }
    } catch (error) {
        console.error('Error al enviar datos:', error);
    }
});