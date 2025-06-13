import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync(':memory:')

db.exec(`
    CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNiQUE,
    password TEXT 
    )
    
    
    `)




export default db
