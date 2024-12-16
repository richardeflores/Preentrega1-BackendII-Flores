// primero crear instancia de socket.io
const socket = io();

// escuchar evento "products" de app.js y recibir array
socket.on("products", (data) => {
  renderProducts(data);
});

const renderProducts = (products) => {
  //traer el div container de realtimeproducts.handlebars
  const containerProducts = document.getElementById("containerProducts");

  // vaciamosd para que al eliminar productos y renderizar no se repitan
  containerProducts.innerHTML = "";

  // para cada producto creamos un div llamado card en el cual se vera representado cada producto con sus caracteristicas
  products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>ID: ${item._id}</p>
                    <p>Stock: ${item.stock}</p>
                    <button class="increment-btn">+</button><button class="decrement-btn"> - </button>
                    <p>${item.price}</p>
                    <button class="delete">eliminar</button>`;

    containerProducts.appendChild(card);

    card.querySelector(".increment-btn").addEventListener("click", () => {
      item.stock++;
      updateProduct(item._id, item.stock);
    });
    card.querySelector(".decrement-btn").addEventListener("click", () => {
      if (item.stock > 0) {
        item.stock--;
      } else {
        console.log("no se puede bajar mas");
      }
      updateProduct(item._id, item.stock);
    });
    card.querySelector(".delete").addEventListener("click", () => {
      deleteProduct(item._id);
    });
  });
};

const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};
const updateProduct = (id, stock) => {
  socket.emit("updateProduct", { id, stock });
};

//////////////////////////////
//////// SWEAT ALERT /////////
//////////////////////////////

const addProductWthBtn = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agregar producto",
    html: `
    <input id="add-input-title" class="swal2-input" placeholder="Titulo">
    <input id="add-input-description" class="swal2-input" placeholder="Descripción">
    <input id="add-input-price" class="swal2-input" type="number" min="1" placeholder= "Precio">
    <input id="add-input-img" class="swal2-input" placeholder="Imagen url" >
    <input id="add-input-code" class="swal2-input" placeholder="Codigo" >
    <input id="add-input-stock" class="swal2-input" type="number" min="0"  placeholder="Stock" >
    <select id="add-input-category" class="swal2-input">
      <option value="Aritos" disabled selected>Aritos</option>
      <option value="Collares">Collares</option>
      <option value="Pulseras">Pulseras</option>
    </select> 
    `,
    focusConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("add-input-title").value;
      const description = document.getElementById(
        "add-input-description"
      ).value;
      const price = parseInt(document.getElementById("add-input-price").value);
      const img = document.getElementById("add-input-img").value;
      const code = document.getElementById("add-input-code").value;
      const stock = parseInt(document.getElementById("add-input-stock").value);
      const category = document.getElementById("add-input-category").value;
      return { title, description, price, img, code, stock, category };
    },
  });

  if (formValues) {
    // Enviar los datos a la función que maneja el socket
    addProduct(formValues);
  }
};
const addProduct = (productData) => {
  socket.emit("addProduct", productData);
};

document.querySelector("#addProductBtn").addEventListener("click", () => {
  addProductWthBtn();
});
