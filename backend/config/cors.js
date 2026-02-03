const corsOptions = {
    origin: ["http://localhost:3000", "https://cpen-421-inventory-ms.vercel.app", "https://inventory-management-system-gamma-six.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

module.exports = corsOptions;
