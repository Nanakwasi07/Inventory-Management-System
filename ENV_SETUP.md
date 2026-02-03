# Environment Configuration Guide

This project uses environment variables for configuration. Follow the steps below to set up your local development environment.

## Frontend (.env)

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:3002/api
```

### Variables:
- `REACT_APP_API_URL`: Base URL for the Express backend API. Used by Axios for all API requests.

**Development:** `http://localhost:3002/api`  
**Production:** Your deployed API URL (e.g., `https://api.example.com/api`)

## Backend (.env)

Create a `.env` file in the `express_api/` directory with the following variables:

```env
PORT=3002
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
SALT=10
```

### Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3002` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT token generation | Use a strong random string in production |
| `SALT` | Bcrypt salt rounds for password hashing | `10` |

## Setup Instructions

### 1. Frontend Setup
```bash
# Copy the example file
cp .env.example .env

# Update .env with your API URL (if using non-localhost)
# REACT_APP_API_URL=your_api_url
```

### 2. Backend Setup
```bash
# Navigate to express_api directory
cd express_api

# Copy the example file
cp .env.example .env

# Update .env with your MongoDB connection string and JWT secret
# Ensure you update these for production:
# - MONGO_URI (your actual MongoDB cluster)
# - JWT_SECRET (strong random string)
```

### 3. Generate JWT Secret (Recommended for Production)
```bash
# Generate a secure random string (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Important Security Notes

- **Never commit `.env` files** - they are already in `.gitignore`
- **Use strong JWT secrets** - generate random strings for production
- **Keep MongoDB credentials secure** - use environment variables
- **Use `.env.example`** as a template for new team members
- **Rotate secrets regularly** in production environments

## Environment Variable Priority

Variables are loaded in this order (first found wins):
1. `.env` file in the respective directory
2. Environment variables set in the system/shell
3. Default values in code (if applicable)

## Troubleshooting

**API requests failing?**
- Check that `REACT_APP_API_URL` matches your backend `PORT`
- Ensure backend is running on the correct port
- Check CORS configuration in `express_api/config/cors.js`

**MongoDB connection errors?**
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network access settings
- Ensure IP whitelist includes your development machine

**JWT token errors?**
- Verify `JWT_SECRET` is set in backend `.env`
- Check that frontend is sending Authorization header
- Tokens expire after 7 days (see `user.model.js`)
