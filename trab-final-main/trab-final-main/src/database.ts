import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'

let instance: Database | null = null

export async function connect() {
  if (instance) 
    return instance

  const db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database
  })
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      senha TEXT
    );
    
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      publicacao INTEGER,
      genero TEXT,
      isbn TEXT,
      autor_id INTEGER,
      editora_id INTEGER,
      FOREIGN KEY (autor_id) REFERENCES autores(id),
      FOREIGN KEY (editora_id) REFERENCES editoras(id)
    );

    CREATE TABLE IF NOT EXISTS autores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeautor  TEXT,
      nacionalidade  TEXT,
      biografia  TEXT 
    );

    CREATE TABLE IF NOT EXISTS editoras  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeeditora  TEXT,
      endereco  TEXT,
      cnpj  TEXT 
    );
  `)
  return instance = db
}