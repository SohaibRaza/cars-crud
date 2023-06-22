# Blog App Backend

## Note

I built this app using `Nest.js` which is a wrapper around `Express.js`. It enforces best programming practices like  modular architecture and dependency injection. It also provides powerful CLI that makes it easy to create large-scale, enterprise-grade applications.

---

> Read setup instructions below
---

## Installation

```bash
npm install
```

## Add `.env`

> Check `.env.example` for reference

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seeding the MongoDB

To seed the MongoDB with dummy data run following command.

```shell
npm run seed
```

## Project Structure

```
Project Structure
├── src
│   ├── common                        # Shared resources
│   │   ├── helpers                   
│   ├── decorators
│   ├── guards                        # Global Auth Guards
│   ├── scripts
│   │   ├── seed.ts                   # MongoDB seed script
│   ├── modules
│   │   ├── auth                        # Authentication module
│   │   │   ├── dto                     # DTOs for authentication
│   │   │   └── auth.module.ts          # Authentication module definition
│   │   ├── comments                    # Comments module
│   │   │   ├── dto                     # DTOs for comments
│   │   │   ├── comments.controller.ts  # Comment controllers
│   │   │   ├── comments.model.ts       # Mongoose model for comments
│   │   │   ├── comments.service.ts     # Comment services
│   │   │   └── comments.module.ts      # Comments module definition
│   │   ├── posts                       # Posts module
│   │   │   ├── dto                     # DTOs for posts
│   │   │   ├── posts.controller.ts     # Post controllers
│   │   │   ├── posts.model.ts          # Mongoose model for posts
│   │   │   ├── posts.service.ts        # Post services
│   │   │   └── posts.module.ts         # Posts module definition
│   │   ├── users                       # Users module
│   │   │   ├── dto                     # DTOs for users
│   │   │   ├── users.controller.ts     # User controller
│   │   │   ├── users.model.ts          # Mongoose model for users
│   │   │   ├── users.service.ts        # User services
│   │   │   └── users.module.ts         # Users module definition
│   ├── app.module.ts             # Main application module
│   ├── swagger.ts                # Swagger API docs config
│   └── main.ts                   # Entry point for the application
└── nest-cli.json                 # Nest.js CLI configuration file

```
