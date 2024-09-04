// src/index.ts
import app from './app';
import connectDB from './config/db.config';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();  // Connect to the database
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer().catch(err => {
    console.error(`Failed to start server: ${err.message}`);
});
