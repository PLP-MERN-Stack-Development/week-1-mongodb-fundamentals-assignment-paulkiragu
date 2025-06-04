const { MongoClient } = require("mongodb");

async function runQueries() {
  const uri = "mongodb://localhost:27017"; // Replace with your connection string if different
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // books with specific genre
    books.find({ genre: "Fiction" });

    // books published after 1920
    books.find({ published_year: { $gt: 1920 } });

    // books by a specific author
    books.find({ author: "Paulo Coelho" });

    // update the price of the book pride and prejudice
    books.updateOne(
      { title: "Pride and Prejudice" },
      { $set: { price: 10 } }
    );

    // delete a book by the title Withering Heights
    books.deleteOne({ title: "Wuthering Heights" });

    // books in_stock and published after 2010
    books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    });

    // using projection to return only title, author, and price only
    books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

    // sorting books by price in ascending order
    books.find().sort({ price: 1 });

    // sorting books by price in descending order
    books.find().sort({ price: -1 });

    // pagination
    const pageNumber = 1; // example value
    books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
      .skip(5 * (pageNumber - 1))
      .limit(5);

    // average price of books by genre
    books.aggregate([
      {
        $group: {
          _id: "$genre",
          averagePrice: { $avg: "$price" }
        }
      }
    ]);

    // author with the most books
    books.aggregate([
      {
        $group: {
          _id: "$author",
          totalBooks: { $sum: 1 }
        }
      },
      {
        $sort: { totalBooks: -1 }
      },
      {
        $limit: 1
      }
    ]);

    // groups books by publication decade and count them
    books.aggregate([
      {
        $project: {
          decade: {
            $concat: [
              {
                $toString: {
                  $multiply: [
                    { $floor: { $divide: ["$published_year", 10] } },
                    10
                  ]
                }
              },
              "s"
            ]
          }
        }
      },
      {
        $group: {
          _id: "$decade",
          totalBooks: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // creating an index on the title field
    books.createIndex({ title: 1 });

    // creating a compound index on author and published_year
    books.createIndex({ author: 1, published_year: -1 });

    // using explain() to analyze a query
    books.find({ title: "Book Title" }).explain("executionStats");

  } catch (err) {
    console.error("Error running queries:", err);
  } finally {
    await client.close();
  }
}

runQueries();
