// adminDashboardMessages.js

// Wait for the DOM to load before executing script
document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.getElementById("messages-container");

  // Show loading message initially
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading";
  loadingDiv.textContent = "Loading messages...";
  messagesContainer.appendChild(loadingDiv);

  // Fetch messages from server API
  fetch("http://localhost:5000/contact")
    .then(response => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Clear loading message
      messagesContainer.innerHTML = "";

      // Check if there are any messages
      if (data.length === 0) {
        const noMsg = document.createElement("div");
        noMsg.className = "error";
        noMsg.textContent = "No messages found.";
        messagesContainer.appendChild(noMsg);
        return;
      }

      // Loop through each message and display it
      data.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message-card";

        // Format content
        const name = document.createElement("strong");
        name.textContent = msg.name;

        const email = document.createElement("span");
        email.style.color = "#333";
        email.textContent = ` (${msg.email})`;

        const message = document.createElement("p");
        message.textContent = msg.message;

        // Append elements
        div.appendChild(name);
        div.appendChild(email);
        div.appendChild(document.createElement("br"));
        div.appendChild(message);

        // Apply custom styles
        div.style.background = "#f9f9f9";
        div.style.padding = "15px";
        div.style.marginBottom = "10px";
        div.style.borderLeft = "4px solid #007bff";
        div.style.borderRadius = "8px";
        div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";

        messagesContainer.appendChild(div);
      });
    })
    .catch(error => {
      // On error, show error message
      messagesContainer.innerHTML = "";
      const errorDiv = document.createElement("div");
      errorDiv.className = "error";
      errorDiv.textContent = "Failed to load messages. Please try again.";
      messagesContainer.appendChild(errorDiv);
      console.error("Fetch error:", error);
    });
});

