-- Create the 'songs' table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    song_link VARCHAR(255) NOT NULL UNIQUE,
    song_name VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    song_length INTEGER NOT NULL,
    song_img VARCHAR(255) NOT NULL
);

-- Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(255),
    hashed_password VARCHAR(255) NOT NULL
);

-- Create the 'playlists' table
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INTEGER NOT NULL,
    img VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the 'saved_songs' table
CREATE TABLE saved_songs (
    song_id INTEGER NOT NULL,
    playlist_id INTEGER NOT NULL,
    PRIMARY KEY (song_id, playlist_id),
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
);

-- Create the 'timers' table
CREATE TABLE timers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    playlist_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    time INTEGER NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
