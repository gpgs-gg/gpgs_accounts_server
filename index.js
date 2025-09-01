require('dotenv').config();
const express = require('express');
const cors = require('cors');

const dueAmountsRoutes = require('./routes/dueAmountsRoutes');
const propertySheetRoutes = require('./routes/propertySheetRoutes');
const rnrSheetRoutes = require('./routes/rnrSheetRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/', dueAmountsRoutes);
app.use('/', propertySheetRoutes);
app.use('/', rnrSheetRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});