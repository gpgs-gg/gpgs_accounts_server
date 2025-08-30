
// api/index.js
// require('dotenv').config();
// const express = require('express');
// const serverless = require('serverless-http');
// const cors = require('cors');

// const sheetRoutes = requir./routes/sheetRoutestes');
// const propertiesSheetRoutes = requir./routes/propertiesSheetRoutestes');
// const propertySheetRoutes = requir./routes/propertySheetRoutestes');
// const employeesRoutes = requir./routes/employeesRoutestes');

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api', sheetRoutes);
// app.use('/api', propertiesSheetRoutes);
// app.use('/api', propertySheetRoutes);
// app.use('/api', employeesRoutes);


// module.exports = app;
// module.exports.handler = serverless(app);



require('dotenv').config();
const express = require('express');
const cors = require('cors');

const dueAmountsRoutes = require('./routes/dueAmountsRoutes');
const propertySheetRoutes = require('./routes/propertySheetRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/', dueAmountsRoutes);
app.use('/', propertySheetRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
