const sql = require('mssql');

const config = {
  user: 'Jarred-PC\Jarred',
  server: 'Jarred-PC',
  database: 'Registration',
  options: {
    encrypt: true, // For Azure users
  },
};

// Create a connection pool
sql.connect(config)
  .then(() => {
    // Define the query to create the users table
    const query = `
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
      BEGIN
        CREATE TABLE users (
          id INT PRIMARY KEY IDENTITY,
          name NVARCHAR(255),
          email NVARCHAR(255),
          password NVARCHAR(255)
        )
      END
    `;

    // Execute the query
    return new sql.Request().query(query);
  })
  .then(() => {
    console.log('Table created or verified successfully');
  })
  .catch((err) => {
    console.error('Error executing query:', err);
  })
  .finally(() => {
    // Close the connection pool after the query is executed
    sql.close();
  });
