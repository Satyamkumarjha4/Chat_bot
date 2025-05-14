from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Initialize the Llama model using the ChatGroq library
try:
    llm = ChatGroq(
        model="llama3-8b-8192",
        groq_api_key="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",
        temperature=0.7,  # Adjust the creativity level as needed
        timeout=30,
        max_retries=2
    )
except Exception as e:
    print(f"An error occurred while initializing the model: {e}")
    exit(1)  # Stop if the model initialization fails

# Function to generate response from the Llama model
def get_llama_response(user_message):
    try:
        response = llm.invoke(user_message)  # Directly call the Llama model
        return response.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return "Error: Unable to get a response from the Llama API."

@app.route("/send_message", methods=["POST"])
def send_message():
    data = request.get_json()
    user_message = data.get("message")
    
    if not user_message:
        return jsonify({"response": "No message provided"}), 400
    
    bot_response = get_llama_response(user_message)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(host=0.0.0.0, port=5000, debug=True)
