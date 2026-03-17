This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## How to run the app

First clone these two repositories (repo): -
1. FrontEnd : https://github.com/Hamidah95/tomei-fullstack
2. Backend : https://github.com/Hamidah95/tomei-fullstack-be

After cloning the repo run the following command for FrontEnd:-

```bash
# to install dependencies
npm install

# to run the app
npm run dev
```
For Backend run the following command:-

```bash
# to install dependencies
npm install

# to run the server
npm run start:dev
```
After running both frontEnd and backend, Open the link http://localhost:3000 on browser. The app should be running.

## Any assumptions / trade-offs

- MariaDb is being replace with sqlite (since there is an issue while installing MariaDb server)
- NextJs setup has been configured in your workstation
- NestJs setup has been configured in your workstation
- The app is running on development mode. Both FrontEnd and Backend need to run consequently for the application to work. 

## What you would improve with more time

- Persist tasks locally if no DB is used
- Small unit tests for backend or frontend
- Mark tasks as completed with a single click
- Run the project using Docker Compose

## Sample video

https://github.com/user-attachments/assets/a7f886eb-0f54-488f-8010-da8bc0f2567d


