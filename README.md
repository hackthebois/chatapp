# Chirp

Chirp is a Discord clone that allows users to communicate with each other through channels. It leverages the Drizzle, Clerk, and WebSockets technologies to provide a seamless and interactive chat experience.

## Features

- **Channels:** Create and join different channels to communicate with specific groups of people.
- **Real-time Messaging:** Enjoy instant messaging with real-time updates using WebSockets.
- **User Authentication:** Authenticate users using Clerk, ensuring secure access to the application.
- **Chat History:** Retrieve and display chat history for each channel, allowing users to catch up on conversations.
- **User Profiles:** Customize user profiles with avatars, usernames, and other optional information.

## Technologies Used

Chirp is built using the following technologies:

- **Drizzle:** TypeScript ORM for SQL databases designed with maximum type safety in mind.
- **Clerk:** An authentication and user management service that simplifies the process of adding user accounts and security to your application.
- **WebSockets:** A communication protocol that enables real-time bidirectional communication between clients and servers.

## Installation

To run Chirp locally, follow these steps:

1. Clone the repository:

git clone https://github.com/hackthebois/chirp.git

2. Navigate to the project directory:

cd chirp

3. Install the dependencies:

npm install

4. Configure environment variables:
   - Create a .env file and update the necessary configuration values.

5. Start the application:

npm run start on the client and server

6. Open your browser and visit http://localhost:3000 to access Chirp.

## Acknowledgments

We would like to express our gratitude to the following projects and their contributors:

- Drizzle: https://github.com/drizzle-team/drizzle-orm
- Clerk: https://clerk.com/
- WebSockets: https://github.com/fastify/fastify-websocket

Their excellent work and documentation have been invaluable in the development of Chirp.
