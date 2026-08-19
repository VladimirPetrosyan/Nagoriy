FROM node:20-alpine

WORKDIR /app
COPY server.js .

ENV PORT=3001
EXPOSE 3001

# No npm install needed — server.js has zero dependencies (see server.js
# comment for why).
CMD ["node", "server.js"]
