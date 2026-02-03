const corsOptions = {
    origin: ["http://localhost:3000", "https://cpen-421-inventory-ms.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

module.exports = corsOptions;
