# Watchparty Monorepo

This project facilitates synchronized media playback, allowing users to watch videos together in real-time.

**Disclaimer: This project is currently under active development and is not yet feature-complete or stable.**

## Project Components

-   **Server (`packages/server`)**: The backend application for managing synchronized playback sessions. [View Server README](packages/server/README.md)
-   **Userscript (`packages/userscript`)**: A browser userscript that integrates Watchparty functionality into supported media platforms. [View Userscript README](packages/userscript/README.md)

## Userscript Installation

To use the Watchparty Userscript, you need a userscript manager installed in your browser, such as [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Tampermonkey](https://www.tampermonkey.net/).

Once a manager is installed, click the link below to install the userscript:

### [Install Watchparty Userscript (Raw File)](https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME/main/packages/userscript/dist/watchparty.prod.user.js)

*(Please replace `YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME` in the link with the actual GitHub username and repository name for this project.)*

## For Developers

This project is structured as a monorepo using npm workspaces.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Build Projects:**
    -   Build the server:
        ```bash
        npm run build:server
        ```
    -   Build the userscript:
        ```bash
        npm run build:userscript
        ```

3.  **Run Development Servers:**
    -   Start the server in development mode:
        ```bash
        npm run dev:server
        ```
    -   Start the userscript in development mode (with live reload):
        ```bash
        npm run dev:userscript
        ```

4.  **Start Production Server:**
    ```bash
    npm run start:server
    ```
