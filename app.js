// Placeholder content
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes'); // استيراد مسارات الكورسات
const lessonRoutes = require('./routes/lessonRoutes'); // استيراد مسارات الدروس

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
.catch(err => console.error('MongoDB connection error:', err));
app.get('/', (req, res) => {
    res.send('review couress and leesson done ');
});

// استخدام مسارات الـ API
// أي طلب يبدأ بـ /api/courses هيروح لـ courseRoutes
app.use('/api/courses', courseRoutes);
// أي طلب يبدأ بـ /api/lessons هيروح لـ lessonRoutes
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
    console.log(`server is running  ${PORT}`);
});