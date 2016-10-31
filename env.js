var env = module.exports = {};

env.leafletToken = function() {
    return process.env.leafletToken;
};

env.leafletID = function() {
    return process.env.leafletID;
};

env.NODE_ENV = function() {
    return process.env.NODE_ENV;
};

env.database = function() {
  if (env.NODE_ENV() !== "dev"){
      return process.env.HEROKU_POSTGRESQL_ROSE_URL;
  } else {
      return config = {
          host: 'localhost',
          port: 5432,
          password: '',
          database: 'nys_history',
          multipleStatements: true,
          max: 10,
          idleTimeoutMills: 300000
      };
  }
};

module.exports
