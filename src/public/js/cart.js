const btnVaciar = document.getElementById("btn-vaciar");
const cartID = btnVaciar.getAttribute("data-cart-id");

btnVaciar.addEventListener("click", async () => {
	const response = fetch(`http://localhost:8080/api/carts/empty/${cartID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
	}
});

//  Boton comprar   //

const btnComprar = document.getElementById("btn-purchase");
btnComprar.addEventListener("click", async () => {
	const response = fetch(`http://localhost:8080/api/carts/${cartID}/purchase`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
	});
});
