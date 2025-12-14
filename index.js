const express = require('express');
const cors = require('cors');
const path = require('path'); // HTML ফাইল দেখানোর জন্য এটি নতুন যোগ করা হয়েছে
const app = express();

// Render-এর পোর্টের জন্য এটি জরুরি
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary Database
let employees = [
    { id: 1, name: "Abdur Rahim", position: "CEO & Founder", dept: "Management", salary: 150000 },
    { id: 2, name: "Tanvir Hasan", position: "Senior Developer", dept: "IT", salary: 80000 },
    { id: 3, name: "Sarah Kabir", position: "HR Manager", dept: "HR", salary: 60000 }
];

// ============================================
// 1. FRONTEND ROUTE (মেইন লিংকে সফটওয়্যার দেখানো)
// ============================================
app.get('/', (req, res) => {
    // এটি মেইন লিংকে index.html ফাইলটি পাঠিয়ে দেবে
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// 2. BACKEND API ROUTES (ডাটা আদান-প্রদান)
// ============================================

// সব এমপ্লয়ি দেখার API
app.get('/employees', (req, res) => {
    res.json(employees);
});

// নতুন এমপ্লয়ি যোগ করার API
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    newEmployee.id = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    employees.push(newEmployee);
    res.status(201).json({ message: "Employee added successfully!", employee: newEmployee });
});

// এমপ্লয়ি ডিলিট করার API
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.json({ message: "Employee deleted successfully!" });
});

// Server Start
app.listen(port, () => {
    console.log(`Abdur Rahim Academy Server running on port ${port}`);
});