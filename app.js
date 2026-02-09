const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const PORT = 3000;

// 1) Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 2) Motor de vistas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 3) Parciales
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// 4) Helper
hbs.registerHelper('priorityClass', function (priority) {
  if (priority === 'alta') return 'priority-high';
  if (priority === 'media') return 'priority-medium';
  return 'priority-low';
});

// Ruta /perfil
app.get('/perfil', (req, res) => {
  res.render('perfil', {
    nombre: 'Ana',
    profesion: 'Desarrolladora Web',
  });
});

// Ruta /dashboard
app.get('/dashboard', (req, res) => {
  const data = {
    user: {
      name: 'Carlos',
      isAdmin: true,
    },
    projects: [
      {
        name: 'API Gateway',
        isCompleted: false,
        tasks: [
          { description: 'Diseñar endpoints', priority: 'alta' },
          { description: 'Implementar JWT', priority: 'alta' },
          { description: 'Crear documentación', priority: 'media' },
        ],
      },
      {
        name: 'Refactor del Frontend',
        isCompleted: true,
        tasks: [
          { description: 'Migrar a React 18', priority: 'baja' },
          { description: 'Actualizar dependencias', priority: 'baja' },
        ],
      },
      {
        name: 'Base de Datos',
        isCompleted: false,
        tasks: [], // sin tareas para disparar el else
      },
    ],
  };

  res.render('dashboard', data);
});

// (Opcional) healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
