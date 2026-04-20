const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const JWT_SECRET = process.env.JWT_SECRET || 'huellas-de-la-pola-secret';

app.use(cors({ origin: ['http://localhost:1234', 'http://127.0.0.1:1234'], credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, '.')));

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, '[]', 'utf8');
  }

  try {
    await fs.access(RESERVATIONS_FILE);
  } catch {
    await fs.writeFile(RESERVATIONS_FILE, '[]', 'utf8');
  }
}

async function readJson(file) {
  const content = await fs.readFile(file, 'utf8');
  return JSON.parse(content || '[]');
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
}

async function getUserFromToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const users = await readJson(USERS_FILE);
    return users.find((user) => user.id === payload.id) || null;
  } catch {
    return null;
  }
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios.' });
  }

  const users = await readJson(USERS_FILE);
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: 'Ya existe una cuenta con este correo.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeJson(USERS_FILE, users);

  const token = createToken(newUser);
  return res.status(201).json({ message: 'Usuario registrado correctamente.', token });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
  }

  const users = await readJson(USERS_FILE);
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }

  const token = createToken(user);
  return res.json({ message: 'Inicio de sesión correcto.', token, name: user.name, email: user.email });
});

app.post('/api/reservations', async (req, res) => {
  const { name, email, phone, roomType, checkIn, checkOut, guests, message } = req.body;
  if (!name || !email || !phone || !roomType || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben completarse.' });
  }

  const reservations = await readJson(RESERVATIONS_FILE);
  const reservation = {
    id: `res-${Date.now()}`,
    name,
    email,
    phone,
    roomType,
    checkIn,
    checkOut,
    guests,
    message: message || '',
    createdAt: new Date().toISOString(),
    status: 'pendiente',
  };

  reservations.push(reservation);
  await writeJson(RESERVATIONS_FILE, reservations);

  return res.status(201).json({ message: 'Reserva recibida correctamente.', reservation });
});

app.get('/api/me', async (req, res) => {
  const user = await getUserFromToken(req);
  if (!user) return res.status(401).json({ message: 'No autorizado.' });
  return res.json({ name: user.name, email: user.email });
});

app.get('/api/rooms', (req, res) => {
  return res.json([
    { id: 'cielo', name: 'Habitación Cielo', description: 'Serena y acogedora, ideal para descansar.', pricePerNight: 120 },
    { id: 'amaranto', name: 'Habitación Amaranto', description: 'Ambiente cálido y elegante para parejas.', pricePerNight: 140 },
    { id: 'esmeralda', name: 'Habitación Esmeralda', description: 'Moderna y premium con vistas especiales.', pricePerNight: 160 },
  ]);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada.' });
});

ensureDataFiles().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor de Huellas de la Pola escuchando en http://localhost:${PORT}`);
  });
});
