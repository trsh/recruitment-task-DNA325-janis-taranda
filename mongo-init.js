db.createUser(
  {
      user: "ipadmin",
      pwd: "ipadminpassword",
      roles: [
          {
              role: "readWrite",
              db: "ip"
          }
      ]
  }
);