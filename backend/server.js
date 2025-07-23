const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const leadRoutes = require('./routes/leadRoutes');
const aiRoutes = require('./routes/aiRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/leadsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/leads', leadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/reports', reportRoutes);

app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
});
