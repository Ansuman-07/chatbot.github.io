


document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-box");
    const userInput = document.querySelector(".border.border-gray-300");
    const sendButton = document.getElementById("send");
    const apiKey = 'AIzaSyA8ZYdjAuRa51czmjN_J8H7EMY6GLUtnTQ';  // Replace with your API key
    const cx = '0291db42da3f04b76'; // Replace with your Search Engine ID
    const clearConversationButton = document.getElementById("clear-conversation");

    clearConversationButton.addEventListener("click", function () {
        chatMessages.innerHTML = `
        
        <div class="bg-blue-600 text-gray-100 py-2 px-4 rounded-lg mb-2">
        Conversastion cleared...<br>
        Bot: Hello Visitor 😉 . How can I Help You ?
        </div>

        `; // Clear chat messages
    });

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value;

        // Display user's message on the right
        displayMessage("You: " + userMessage, "message self-end bg-green-200 text-gray-800 py-2 px-4 rounded-lg mb-2");

        // Call a function to fetch and display Google search results
        fetchGoogleSearch(userMessage);

        // Clear the input field
        userInput.value = "";
    });

    function displayMessage(message, className, isHTML = false) {
        const messageElement = document.createElement("div");
        if (isHTML) {
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        messageElement.setAttribute("class", className);
        chatMessages.appendChild(messageElement);
    }

    function fetchGoogleSearch(query) {
        // Encode the search query
        const encodedQuery = encodeURIComponent(query);

        // Make a request to the Google Custom Search API
        fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodedQuery}`)
            .then(response => response.json())
            .then(data => {
                // Handle the API response (data contains search results)
                const items = data.items;
                if (items && items.length > 0) {
                    const searchResult = items[0]; // Get the first search result

                    // Check if the result contains a link (formattedUrl)
                    const link = searchResult.link || '';

                    // Check if the result contains an image (pagemap.cse_thumbnail)
                    const image = searchResult.pagemap?.cse_thumbnail?.[0]?.src || '';

                    // Build the response message
                    let responseMessage = "ChatBot: " + searchResult.title;
                    if (link) {
                        responseMessage += ` <a href="${link}" target="_blank">[Link]</a>`;
                    }

                    if (image) {
                        responseMessage += `<br><img src="${image}" alt="Image">`;
                    }

                    displayMessage(responseMessage, "message bg-blue-200 text-gray-800 py-2 px-4 rounded-lg mb-2", true);
                } else {
                    displayMessage("ChatBot: No search results found.", "message bg-blue-200 text-gray-800 py-2 px-4 rounded-lg mb-2");
                }
            })
            .catch(error => {
                console.error(error);
                displayMessage("ChatBot: Oops! Something went wrong.", "message bg-blue-200 text-gray-800 py-2 px-4 rounded-lg mb-2");
            });
    }
});



