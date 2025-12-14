// index.js - Backend Logic for Abdur Rahim Academy of Creation
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary Database (In-Memory Array)
let employees = [
    { id: 1, name: "Abdur Rahim", position: "CEO & Founder", dept: "Management", salary: 150000 },
    { id: 2, name: "Tanvir Hasan", position: "Senior Developer", dept: "IT", salary: 80000 },
    { id: 3, name: "Sarah Kabir", position: "HR Manager", dept: "HR", salary: 60000 }
];

// 1. সব এমপ্লয়ি দেখার API
app.get('/employees', (req, res) => {
    res.json(employees);
});

// 2. নতুন এমপ্লয়ি যোগ করার API
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    newEmployee.id = employees.length + 1; // Auto ID generation
    employees.push(newEmployee);
    res.status(201).json({ message: "Employee added successfully!", employee: newEmployee });
});

// 3. এমপ্লয়ি ডিলিট করার API
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.json({ message: "Employee deleted successfully!" });
});

// Server Start
app.listen(port, () => {
    console.log(`Abdur Rahim Academy Server running at http://localhost:${port}`);
});