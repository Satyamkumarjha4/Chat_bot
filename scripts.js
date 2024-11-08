function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
  
    if (message === '') return;
  
    addMessage(message, 'user');
  
    // Send the message to the backend
    fetchBackendResponse(message)
      .then(response => {
        addMessage(response, 'bot');
      })
      .catch(error => {
        console.error('Error:', error);
        addMessage("Oops! Something went wrong.", 'bot');
      });
  
    messageInput.value = '';
  }
  
  function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}-message`;
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
  }
  
  function fetchBackendResponse(message) {
    return fetch('http://127.0.0.1:5000/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => data.response)
    .catch(error => {
      console.error('Error:', error);
      return "Oops! Something went wrong.";
    });
  }