# Quick Environment Setup Reference

## Files Created:

### Frontend
- `.env` - React environment variables (add to root directory)
- `.env.example` - Template for team members

### Backend
- `express_api/.env` - Express API environment variables
- `express_api/.env.example` - Template for team members

### Documentation
- `ENV_SETUP.md` - Complete setup guide

## Quick Start:

### For Local Development:

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:3002/api
```

**Backend (express_api/.env):**
```env
PORT=3002
MONGO_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/inventory_db?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
SALT=10
```

## How It's Integrated:

### Frontend Integration:
✅ `src/utils/api.js` already uses `process.env.REACT_APP_API_URL`
- Automatically picks up from `.env` file
- Defaults to `http://localhost:3001/api` if not set (now updated to 3002)

### Backend Integration:
✅ `express_api/app.js` loads dotenv at startup
✅ `express_api/models/user.model.js` uses `process.env.JWT_SECRET`
✅ `express_api/config/database.js` uses `process.env.MONGO_URI` and `PORT`
✅ User service uses `process.env.SALT` for password hashing

## Production Deployment:

Set these environment variables in your hosting platform (Vercel, Heroku, etc.):

**Frontend (Vercel):**
- `REACT_APP_API_URL` = Your production API URL

**Backend:**
- `PORT` = Port your provider assigns
- `MONGO_URI` = Production MongoDB URI
- `JWT_SECRET` = Strong random string (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `SALT` = 10 (or higher for more security)
