const os = require('os');
const sql = require('mssql');

// Find the network interface with a non-internal and non-loopback address
let ipAddress = '';
const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces).some((iface) => {
  const info = networkInterfaces[iface];
  const externalAddress = info.find((addr) => !addr.internal && addr.family === 'IPv4');
  if (externalAddress) {
    ipAddress = externalAddress.address;
    return true; // Stop iteration once a suitable interface is found
  }
  return false;
});

const config = {
  user: 'Jarred',
  server: ipAddress,
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
