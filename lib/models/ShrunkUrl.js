const pool = require('../utils/pool');

module.exports = class ShrunkUrl {
    id;
    longUrl;

    constructor(row) {
      this.id = row.id;
      this.longUrl = row.full_url;
    }

    static async insert(url) {
      const { rows } = await pool.query(
        'INSERT INTO compressed_urls (id, full_url) VALUES ($1, $2) RETURNING *', [url.id, url.longUrl]
      );
      return new ShrunkUrl(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM compressed_urls'
      );
      return rows.map(url => new ShrunkUrl(url));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM compressed_urls WHERE id=$1', [id]
      );
      
      if(!rows[0]) throw new Error(`Unable to find shorten url with id of ${id}`);

      return new ShrunkUrl(rows[0]);
    }  
};
