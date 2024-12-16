const showAlert = (texto) => {
	Swal.fire({
		position: "top-end",
		title: texto,
		showConfirmButton: false,
		timer: 800,
	});
};
/// CARRITO
const cartElement = document.querySelector("#imgCarro");
const cartID = cartElement.getAttribute("data-cart-id");

document.addEventListener("DOMContentLoaded", () => {
	const btnsAddProduct = document.querySelectorAll(".btn-addProductToCart");

	btnsAddProduct.forEach((button) => {
		button.addEventListener("click", async () => {
			console.log("boton apretado");
			const productID = button.getAttribute("data-product-id");

			if (!productID) {
				showAlert("No se encuentra el productID");
				return;
			}
			if (!cartID) {
				showAlert("No se encuentra el cartID");
				return;
			}
			try {
				const response = await fetch(
					`http://localhost:8080/api/carts/${cartID}/product/${productID}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ productId: productID }),
					}
				);
				if (response.ok) {
					showAlert("Producto agregado al carrito");
				} else {
					const error = await response.text();
					showAlert("Error al agregar el producto al carrito");
				}
			} catch (error) {
				console.error("Error:", error);
				showAlert(
					"Hubo un error en la solicitud, intente nuevamente mas tarde."
				);
			}
		});
	});
});

cartElement.addEventListener("click", async () => {
	try {
		window.location.href = `http://localhost:8080/cart/${cartID}`;
	} catch (error) {
		showAlert("hubo un problema");
	}
});
