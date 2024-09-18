import pkg from 'pg';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const { Client } = pkg;

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "user_auth_db",
    password: "123456",
    port: 5432,
});

await db.connect();

// Function to create the notes table if it doesn't exist
const ensureNotesTableExists = async (userId) => {
    const query = `
        CREATE TABLE IF NOT EXISTS notes_${userId} (
            note_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await db.query(query);
        console.log(`Notes table for user ${userId} ensured.`);
    } catch (err) {
        console.error('Error ensuring notes table:', err);
    }
};

const registerUser = async (name, email, password) => {
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await db.query(checkUserQuery, values);

    if (result.rows.length > 0) {
        console.log('User already registered.');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;
    const insertValues = [name, email, hashedPassword];
    const userResult = await db.query(insertUserQuery, insertValues);
    const userId = userResult.rows[0].id;

    console.log(`User ${name} registered successfully with ID ${userId}.`);
    await ensureNotesTableExists(userId);
};

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).send('User already registered');
        }

        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).send('Invalid email or password');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.rows[0].id }, 'your_jwt_secret');
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

app.get('/notes', async (req, res) => {
    const token = req.headers['authorization'];
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const notes = await db.query(`SELECT * FROM notes_${decoded.id}`);
        res.status(200).json(notes.rows);
    } catch (error) {
        res.status(401).send('Invalid token');
    }
});

app.post('/notes', async (req, res) => {
    const token = req.headers['authorization'];
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const { title, content } = req.body;

        await ensureNotesTableExists(decoded.id); // Ensure table exists before inserting
        await db.query(`INSERT INTO notes_${decoded.id} (title, content) VALUES ($1, $2)`, [title, content]);
        res.status(201).send('Note added');
    } catch (error) {
        res.status(401).send('Invalid token');
    }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
