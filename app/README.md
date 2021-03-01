# Development Environment Instruction

## Steps
1. Navigate to the 'UpNext/app/' directory
2. Run the command `npm run dev` to start the frontend and backend services. These services are hosted at http://localhost:3000 and http://localhost:9000, respectively. This uses Docker Compose behind the scenes. Open the frontend service in a web browser to see the React App.
3. Make changes to the code and save. The changes will automatically be applied within the containers and the appropriate server will be refreshed.
4. When done, navigate to the 'UpNext/app' directory and run `npm run stop-dev` to stop the containers.

## Prerequisites
### `Install Docker`

https://docs.docker.com/engine/install/

### `Install NodeJS/npm`

1. Download and install from https://nodejs.org/en/download/
2. If on Windows, restart computer for `npm` command to be callable in the terminal

### `Clone/Pull the GitHub Repo`
Clone or pull our project's GitHub repository: `git clone https://github.com/giangpro93/UpNext.git`