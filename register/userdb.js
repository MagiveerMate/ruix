const sql = require('msnodesqlv8');

const connection = {
  server: 'Jarred-PC',
  database: 'Registration',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true, // Use Windows authentication
  },
};

// Create a connection pool
const connectionString = `Driver={SQL Server Native Client 11.0};Server=${connection.server};Database=${connection.database};Trusted_Connection=yes;`;

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

// Execute the query using the connection string
sql.queryRaw(connectionString, query, (err) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log('Table created or verified successfully');
  }
});
