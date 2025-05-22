// Admin dashboard fetch messages

document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.getElementById("messages-container");

  fetch("http://localhost:5000/contact")
    .then(res => res.json())
    .then(data => {
      messagesContainer.innerHTML = "";
      data.forEach(msg => {
        const div = document.createElement("div");
        div.innerHTML = <strong>${msg.name}</strong> (${msg.email}): <p>${msg.message}</p>;
        div.style.marginBottom = "1rem";
        div.style.padding = "1rem";
        div.style.background = "#f0f0f0";
        div.style.borderRadius = "10px";
        messagesContainer.appendChild(div);
      });
    })
    .catch(() => {
      messagesContainer.innerText = "Failed to load messages.";
    });
});
