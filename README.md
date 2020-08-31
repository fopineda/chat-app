# chat-app
 chat-app is a chatting application built with Node v3 and Socket Programming. It allows users to chat with one another in a fun chat room. The application provides a join page at the beginning, which requires a display name and a room name. Display name is the chat name that is associated with your user. The room name serves as the object that defines your room. It helps to think of it as a password for your room. In order for users to join the same chat rooms, they must have identical room names.
 


  ## Key Items
  - [Sockets](https://socket.io/)
  - [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
  - [Moment.js](https://momentjs.com/) (added through CDN)
  - [Mustache.js](https://mustache.github.io/) (added through CDN)


## Installation
_I'm assuming you have downloaded Node and npm onto your computer. If not, then download Node and npm [here](https://nodejs.org/en/download/). By downloading the node version for your computer, both node and npm command should be useable through your terminal/prompt._

_Windows: https://treehouse.github.io/installation-guides/windows/node-windows.html_

_Mac: https://treehouse.github.io/installation-guides/mac/node-mac.html_

__Node rocks 💚 !__


1. Clone chat-app github repo
    ```bash
    git clone https://github.com/fopineda/chat-app.git
    ```
2. Enter the chat-app directory
    ```bash
    cd chat-app
    ```
3. Install node modules/dependencies
    ```bash
    npm install
    ```
4. Run your chat app 🙃
    ```bash
    npm start
    ```
5. If no errors came up, then the app should be running on your local machine (computer). Go to http://localhost:3000/ on your browser.


_Note: If you want to run the app in dev mode, then run "npm run dev" instead of "npm start" for step 4. Dev mode is just normal mode with nodemon activated._


## Demo
Link: https://pineda-chat-app.herokuapp.com/

![Menu](https://github.com/fopineda/chat-app/blob/master/readme-images/menu.png?raw=true)

![chat-room](https://github.com/fopineda/chat-app/blob/master/readme-images/chat-room.png?raw=true)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
