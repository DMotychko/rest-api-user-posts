# **REST API User Posts**
#### This is an API for managing users and posts, built with Express.js and TypeScript.

# Installation and Setup

#### 1. Clone the Repository
   ```sh
   git clone https://github.com/DMotychko/rest-api-user-posts.git
   cd rest-api-user-posts
   ```
#### 2. Install Dependencies
   ```sh
   npm install
   ```
#### 3. Configure Environment Variables
   Create a .env file in the root of the project and add the necessary environment variables.
   ```sh
   cp .env.example .env
   ```
#### 4. Run in Development Mode
To start the application in development mode, use the following command:
   ```sh
   npm run start:dev
   ```
This command will:

Remove the dist folder (rimraf dist),
Compile TypeScript code (tsc-watch),
Run the server using nodemon (ts-node src/main.ts).

# API Usage
#### API documentation is available via Swagger:
http://localhost:3000/docs

# Technologies

**Node.js + Express.js**

**TypeScript**

**MongoDB (Mongoose)**

**JWT for authentication**

**Swagger for documentation**

**bcrypt for password hashing**

**Joi for data validation**