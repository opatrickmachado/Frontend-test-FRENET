document.getElementById("user-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("https://frontend-test.frenet.de/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar usuário.");
    }
  });

  document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("search-email").value;
  
    try {
      const response = await fetch(`https://frontend-test.frenet.de/v1/users?email=${email}`);
  
      if (response.ok) {
        const user = await response.json();
        document.getElementById("user-info").innerHTML = `
          <h2>${user.name}</h2>
          <p>Email: ${user.email}</p>
          <!-- Adicione outros campos do usuário aqui -->
        `;
      } else {
        alert("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao buscar usuário.");
    }
  });
  document.getElementById("update-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const id = document.getElementById("update-id").value;
    const name = document.getElementById("update-name").value;
    const email = document.getElementById("update-email").value;
    const password = document.getElementById("update-password").value;
  
    try {
      const response = await fetch(`https://frontend-test.frenet.de/v1/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (response.ok) {
        alert("Usuário atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar usuário.");
    }
  });
  document.getElementById("delete-user").addEventListener("click", async () => {
    const id = document.getElementById("update-id").value;
  
    try {
      const response = await fetch(`https://frontend-test.frenet.de/v1/users/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Usuário excluído com sucesso!");
      } else {
        alert("Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir usuário.");
    }
  });
  const shippingForm = document.getElementById('shipping-form');
const shippingResult = document.getElementById('shipping-result');

shippingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const weight = document.getElementById('weight').value;
  const length = document.getElementById('length').value;
  const height = document.getElementById('height').value;
  const width = document.getElementById('width').value;

  const url = `https://api.frenet.com.br/shipping/quote?SellerCEP=${origin}&RecipientCEP=${destination}&Weight=${weight}&Length=${length}&Height=${height}&Width=${width}`;

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'token': 'SEU_TOKEN_DE_AUTORIZACAO_DA_API_DA_FRENET'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.ShippingSevices && data.ShippingSevices.length > 0) {
      const bestService = data.ShippingSevices[0];
      shippingResult.innerHTML = `O melhor serviço de frete é ${bestService.ServiceDescription} por R$ ${bestService.ShippingPrice}`;
    } else {
      shippingResult.innerHTML = 'Não foi possível calcular o frete.';
    }
  })
  .catch(error => {
    console.error(error);
    shippingResult.innerHTML = 'Ocorreu um erro ao calcular o frete.';
  });
});

      