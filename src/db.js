import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync(':memory:')

db.exec(`
    CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNiQUE,
    password TEXT 
    )
    
    
    `)
db.exec(`
    CREATE TABLE Score(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    gamesPlayed INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES Users(id)
    )
    `)



export default db
