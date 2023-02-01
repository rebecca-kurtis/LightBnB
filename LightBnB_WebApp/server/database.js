const { Pool } = require('pg');

const pool = new Pool({
  user: 'rebeccakurtis',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect();

module.exports = {
  /// Users
  getUserWithEmail: function(email) {
    return pool.query('SELECT * FROM users WHERE email = $1;', [email])
      .then((response) => {
        return response.rows[0];
      });
  },
  getUserWithId: function(id) {
    return pool.query('SELECT * FROM users WHERE id = $1;', [id])
      .then((response) => {
        return response.rows[0];
      });
  },
  addUser: function(user) {
    return pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.password])
      .then((response) => {
        return response.rows[0];
      });
  },
  /// Reservations
  getAllReservations: function(guest_id, limit = 10) {
    return pool.query(
      `SELECT reservations.id, reservations.start_date, reservations.end_date,
      properties.*, AVG(property_reviews.rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`, [guest_id, limit])
      .then((response) => {
        return response.rows;
      });
  },
  /// Properties
  getAllProperties: function(options, limit = 10) {
    const queryParams = [];
    let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    GROUP BY properties.id
    `;
  
    //owner_id
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `HAVING owner_id = $${queryParams.length}`;
    }

    //if only city is filled out
    if (options.city && options.minimum_rating === '' && options.minimum_price_per_night  === '' && options.maximum_price_per_night === '') {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
    }

    //if only minimum price is filled out
    if (options.minimum_price_per_night && options.maximum_price_per_night === '' && options.city === '' && options.minimum_rating === '') {
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `HAVING cost_per_night >= $${queryParams.length}`;
    }
  
    //if only maximum price is filled out
    if (options.maximum_price_per_night && options.minimum_price_per_night  === '' && options.city === '' && options.minimum_rating === '') {
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += `HAVING cost_per_night <= $${queryParams.length}`;
    }
  
    //if only minimum rating is filled out
    if (options.minimum_rating && options.city === '' && options.minimum_price_per_night  === '' && options.maximum_price_per_night === '') {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
    }
  
    //if min and max prices are only two filled out
    if (options.minimum_price_per_night && options.maximum_price_per_night && options.city === '' && options.minimum_rating === '') {
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `HAVING cost_per_night >= $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
  
    //if city and minimum rating are filled out
    if (options.city && options.minimum_rating && options.minimum_price_per_night === '' && options.maximum_price_per_night === '') {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.minimum_rating}`);
      queryString += `AND AVG(property_reviews.rating) >= $${queryParams.length}`;
    }

    //if city and minimum/max cost are filled out
    if (options.city && options.minimum_rating === '' && options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `AND cost_per_night >= $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
  
    //if min/max cost and min rating are filled out
    if (options.city === '' && options.minimum_rating && options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `AND cost_per_night >= $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
  
    //if city and min cost are filled out
    if (options.city && options.minimum_rating === '' && options.minimum_price_per_night && options.maximum_price_per_night === '') {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `AND cost_per_night >= $${queryParams.length}`;
    }
  
    //if city and max cost are filled out
    if (options.city && options.minimum_rating === '' && options.minimum_price_per_night === '' && options.maximum_price_per_night) {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
  
    //if city, min cost, and min rating are filled out
    if (options.city && options.minimum_rating && options.minimum_price_per_night && options.maximum_price_per_night === '') {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `AND cost_per_night >= $${queryParams.length}`;
      queryParams.push(`${options.minimum_rating}`);
      queryString += `AND AVG(property_reviews.rating) >= $${queryParams.length}`;
    }
  
    //if city, max cost, and min rating are filled out
    if (options.city && options.minimum_rating && options.minimum_price_per_night === '' && options.maximum_price_per_night) {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
      queryParams.push(`${options.minimum_rating}`);
      queryString += `AND AVG(property_reviews.rating) >= $${queryParams.length}`;
    }
  
    // if min cost and min rating are filled out
    if (options.city === '' && options.minimum_rating && options.minimum_price_per_night && options.maximum_price_per_night === '') {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `AND cost_per_night >= $${queryParams.length}`;
    }
  
    //if max cost and min rating are filled out
    if (options.city === '' && options.minimum_rating && options.minimum_price_per_night  === '' && options.maximum_price_per_night) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
  
    // if all search fields are filled out
    if (options.city && options.minimum_rating && options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(`%${options.city}%`);
      queryString += `HAVING city LIKE $${queryParams.length}`;
      queryParams.push(`${options.minimum_rating}`);
      queryString += `AND AVG(property_reviews.rating) >= $${queryParams.length}`;
      queryParams.push(`${options.minimum_price_per_night}00`);
      queryString += `AND cost_per_night >= $${queryParams.length}`;
      queryParams.push(`${options.maximum_price_per_night}00`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
  
    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  
    return pool
      .query(queryString, queryParams)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  addProperty: function(property) {
    return pool.query('INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *', [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code])
      .then((response) => {
        return response.rows[0];
      });
  }
};