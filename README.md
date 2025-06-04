# MongoDB Bookstore Queries

This project contains a set of MongoDB queries for interacting with a bookstore database. The queries demonstrate various operations such as filtering, updating, deleting, sorting, indexing, aggregation, and performance analysis using `explain()`.

## 📁 Files

- `queries.js` — Contains MongoDB queries wrapped in an async function using the  `mongodb` Node.js driver.

## 🛠️ Requirements

- Node.js installed on your machine
- MongoDB installed and running locally or accessible via a connection URI
- A database named `plp_bookstore` with a collection named `books`
- `mongodb` Node.js driver

Install the MongoDB driver:

```bash
npm install mongodb
 then run
node queries.js
