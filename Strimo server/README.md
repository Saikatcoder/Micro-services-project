# 🚀 Project architecture

This monorepo serves as the main entry point and controller for all microservices under a single gateway. It uses TypeScript, Express, and custom tooling to streamline development.

---

## 📁 Project Structure

```
microservice/
├── services/
│   └── gateway/            # Main gateway application
├── src/
│   ├── app.ts              # Configurations of concurrently running services
│   ├── servers.json        # List of all services
│   ├── install-all.ts      # Installs all services' dependencies
│   └── uninstall-all.ts    # Removes all services' node_modules
├── dist/                   # Compiled JavaScript
├── package.json
└── tsconfig.json
```

---

## 📦 Scripts

| Command | Description |
|--------|-------------|
| `npx cmp` | 🔧 Create a new service inside the `services/` folder. You will be prompted to enter a service name. |
| `npm run install-all` | 📦 Installs dependencies in all services by running. |
| `npm run uninstall-all` | ❌ Deletes `node_modules` from each service folder. |
| `npm run dev` | 🛠️ Runs the gateway in development mode using `ts-node-dev`. |

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Mongoose**
- **ts-node-dev**
- **CMP (Service Generator)**

---

## 🧪 Creating a New Service

To scaffold a new microservice:

```bash
npx cmp
```

👉 Then type the desired **service name** when prompted.  
📁 The new service will be generated automatically inside the `services/` folder.

---

## 🐳 Docker Compose

This project comes with built-in support for Redis and RabbitMQ using Docker Compose.

### `docker-compose.yml`

```yaml
version: '3.9'

services:
  redis:
    image: redis:7-alpine
    container_name: redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    restart: unless-stopped
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin

volumes:
  redis_data:
```

To start services:

```bash
docker-compose up -d
```

To stop services:

```bash
docker-compose down
```

---

## 📋 Prerequisites

- Node.js `v16+`
- npm
- Docker & Docker Compose

---

## 👨‍💻 Maintained by

**CodingOtt Systems**  
🔗 [www.codingott.com](https://www.codingott.com)  
🏷️ _Building career without degree_

---
