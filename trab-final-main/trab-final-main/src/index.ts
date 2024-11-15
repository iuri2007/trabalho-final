import express, { RequestHandler } from 'express'
import { randomUUID } from 'crypto'
import { connect } from './database';

const port = 3000
const app = express()

const logged: any = {}

app.use(express.json())
app.use(express.static(__dirname + '/../public'))

//Página index 
app.post("/login", async (req, res) => {
    const { login, senha } = req.body
    const db = await connect()
    const user = await db.get(`SELECT * FROM users WHERE email = ? AND senha = ? LIMIT 1`, [login, senha])
    
    if (!user){
      res.status(401).json({ error: "Usuário ou senha inválidos" })
      return 
    }

    const token = randomUUID()
    logged[token] = user
    res.json({ token })
    return 
})

// página cadastro
app.get('/users', async (req, res) => {
  const db = await connect()
  const users = await db.all('SELECT * FROM users')
  res.json(users)
})

app.post('/users', async (req, res) => {
  const db = await connect()
  const { nome, email, senha } = req.body
  const result = await db.run('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID])
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const db = await connect()
  const { name, email } = req.body
  const { id } = req.params
  await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id])
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM users WHERE id = ?', [id])
  res.json({ message: 'User deleted' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// Página livro
app.get('/livro', async (req, res) => {
  const db = await connect()
  const livros = await db.all('SELECT * FROM livros')
  res.json(livros)
})

app.post('/livro', async (req, res) => {
  const db = await connect()
  const { titulo, publicacao, genero, isbn } = req.body
  const result = await db.run('INSERT INTO livros (titulo, publicacao, genero, isbn) VALUES (?, ?, ?, ?)', [titulo, publicacao, genero, isbn])
  const livro = await db.get('SELECT * FROM livros WHERE id = ?', [result.lastID])
  res.json(livro)
})

app.put('/livro/:id', async (req, res) => {
  const db = await connect()
  const { titulo, publicacao, genero, isbn } = req.body
  const { id } = req.params
  await db.run('UPDATE livros SET titulo = ?, publicacao = ?, genero = ?, isbn = ? WHERE id = ?', [titulo, publicacao, genero, isbn, id])
  const livro = await db.get('SELECT * FROM livros WHERE id = ?', [id])
  res.json(livro)
})

app.delete('/livro/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM livro WHERE id = ?', [id])
  res.json({ message: 'livro deletado' })
})

//página autor

app.get('/autor', async (req, res) => {
  const db = await connect()
  const autores = await db.all('SELECT * FROM autores')
  res.json(autores)
})

app.post('/autor', async (req, res) => {
  const db = await connect()
  const { nomeautor, nacionalidade, biografia } = req.body
  const result = await db.run('INSERT INTO autores (nomeautor, nacionalidade, biografia) VALUES (?, ?, ?)', [nomeautor, nacionalidade, biografia])
  const autores = await db.get('SELECT * FROM autores WHERE id = ?', [result.lastID])
  res.json(autores)
})

app.put('/autor/:id', async (req, res) => {
  const db = await connect()
  const { nomeautor, nacionalidade, biografia } = req.body
  const { id } = req.params
  await db.run('UPDATE autores SET nomeautor = ?, nacionalidade = ?, biografia = ?', [nomeautor, nacionalidade, biografia, id])
  const autores = await db.get('SELECT * FROM autores WHERE id = ?', [id])
  res.json(autores)
})

app.delete('/autor/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM autores WHERE id = ?', [id])
  res.json({ message: 'autores deletado' })
})

//Página Editora

app.get('/editora', async (req, res) => {
  const db = await connect()
  const editoras = await db.all('SELECT * FROM editoras')
  res.json(editoras)
})

app.post('/editora', async (req, res) => {
  const db = await connect()
  const { nomeeditora, endereco, cnpj } = req.body
  const result = await db.run('INSERT INTO editoras (nomeeditora, endereco, cnpj) VALUES (?, ?, ?)', [nomeeditora, endereco, cnpj])
  const editoras = await db.get('SELECT * FROM editoras WHERE id = ?', [result.lastID])
  res.json(editoras)
})

app.put('/autor/:id', async (req, res) => {
  const db = await connect()
  const { nomeautor, nacionalidade, biografia } = req.body
  const { id } = req.params
  await db.run('UPDATE autores SET nomeautor = ?, nacionalidade = ?, biografia = ?', [nomeautor, nacionalidade, biografia, id])
  const autores = await db.get('SELECT * FROM autores WHERE id = ?', [id])
  res.json(autores)
})

app.delete('/autor/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM autores WHERE id = ?', [id])
  res.json({ message: 'autores deletado' })
})


