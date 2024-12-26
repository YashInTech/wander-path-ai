# WanderPathAI
AI-powered trip planner that generates personalized itineraries using Gemini AI. Built with React.js for the frontend, Firebase for backend services, and Google Maps API for location features. This app helps users plan trips with custom recommendations for hotels, activities, and daily itineraries.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Setup

To get started with the project, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/YashInTech/WanderPathAI.git
cd WanderPathAI
```

### 2. Install Dependencies
Install all the dependencies listed in package.json by running:

```bash
npm install
```

This will download all the necessary packages, including libraries and tools required to run the project.

### 3. Run npx Commands for Setup
Some features of this project require the use of npx to install and configure components dynamically. After setting up the project, you may need to run specific npx commands to add functionality or components to your project. These commands do not require you to install anything globally — npx will automatically download and run the necessary packages.

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
```
This command will automatically add the components to the project, and you’ll be able to use it right away.

### 4. Run the Development Server
Once everything is set up, start the development server with:

```bash
npm run dev
```
Visit http://localhost:5173 to see your project in action!

Notes:
If you encounter any issues with npx, ensure that you have a stable internet connection, as npx fetches the latest version of the required tools or components from the npm registry.
The npx commands are designed to make the setup process easier by installing packages on the fly, without requiring global installation or manual steps.
Make sure to run the appropriate npx commands for any additional components or tools your project needs.
Additional Information
React: The frontend is built using React.js.
Firebase: Used for backend services like authentication, database, and hosting.
Google Maps API: Integrated for location-based services like viewing destinations and generating routes.
Gemini AI: Powers the itinerary recommendations and trip planning.
Feel free to reach out if you have any issues or questions!