DROP TABLE IF EXISTS compressed_urls;

CREATE TABLE compressed_urls (
    id TEXT PRIMARY KEY,
    full_url TEXT NOT NULL
);
