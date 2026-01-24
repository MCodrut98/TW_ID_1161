# Deployment Guide

## Prerequisites
- Node.js v14+
- MongoDB Atlas account (or self-hosted MongoDB)
- IGDB API credentials
- Hosting platform (Heroku, AWS, DigitalOcean, etc.)

## Environment Variables for Production

Create a `.env` file with:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
IGDB_CLIENT_ID=your_igdb_client_id
IGDB_ACCESS_TOKEN=your_igdb_access_token
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=your_production_frontend_url
```

## Heroku Deployment

### 1. Install Heroku CLI
Download from https://devcenter.heroku.com/articles/heroku-cli

### 2. Create Heroku App
```bash
heroku create your-app-name
```

### 3. Add MongoDB Atlas
Set up MongoDB Atlas cluster and get connection string

### 4. Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set IGDB_CLIENT_ID=your_client_id
heroku config:set IGDB_ACCESS_TOKEN=your_access_token
heroku config:set JWT_SECRET=your_secret
heroku config:set CORS_ORIGIN=your_frontend_url
```

### 5. Deploy
```bash
git push heroku main
```

## AWS EC2 Deployment

### 1. Launch EC2 Instance
- Select Ubuntu 20.04 LTS
- Configure security groups (allow ports 80, 443, 5000)

### 2. Connect and Install
```bash
sudo apt update
sudo apt install nodejs npm mongodb-org
```

### 3. Clone and Deploy
```bash
git clone your-repo-url
cd tournament-manager
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 4. Start Services
```bash
# Backend
pm2 start "npm run dev" --name "tournament-api"

# Frontend (built for production)
npm run build
pm2 serve --spa
```

## DigitalOcean App Platform

### 1. Connect Repository
- Push code to GitHub

### 2. Create App
- In DigitalOcean, create new App
- Connect GitHub repository
- Set up build commands

### 3. Environment Variables
- Add all required environment variables in App Platform settings

### 4. Deploy
- Click Deploy

## SSL/HTTPS Setup

Use Let's Encrypt with Certbot:

```bash
sudo certbot certonly --standalone -d your-domain.com
sudo certbot renew --dry-run
```

## Database Backup

### MongoDB Atlas
- Automated backups enabled by default
- Download snapshots from console

### Manual Backup
```bash
mongodump --uri "mongodb+srv://user:password@cluster.mongodb.net/database" --out ./backup
```

## Monitoring

### PM2 Monitoring
```bash
pm2 install pm2-auto-pull
pm2 start "npm run dev" --name "tournament-api"
pm2 monit
```

### Health Checks
Add endpoint to backend:
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});
```

## Load Balancing

For high traffic, use nginx:

```nginx
upstream tournament_api {
  server localhost:5000;
  server localhost:5001;
}

server {
  listen 80;
  server_name your-domain.com;

  location /api {
    proxy_pass http://tournament_api;
  }

  location / {
    proxy_pass http://frontend_server;
  }
}
```

## Scaling

### Horizontal Scaling
- Run multiple backend instances
- Use load balancer (nginx, HAProxy)
- Separate database server

### Caching
- Implement Redis for session storage
- Cache IGDB API responses
- Use CDN for static frontend assets

## Security Checklist

- [ ] Environment variables configured
- [ ] MongoDB authentication enabled
- [ ] HTTPS/SSL enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation added
- [ ] SQL injection prevention (using MongoDB)
- [ ] CSRF protection
- [ ] Security headers configured
- [ ] Regular backups scheduled
- [ ] Monitoring and logging enabled
- [ ] Update dependencies regularly

## Performance Optimization

### Backend
- Enable gzip compression
- Implement database indexing
- Use connection pooling
- Cache API responses

### Frontend
- Use production build
- Code splitting
- Lazy loading
- Image optimization
- CDN delivery

## Troubleshooting

**502 Bad Gateway**
- Check if backend is running
- Verify proxy settings
- Check logs

**Slow Response Times**
- Check database performance
- Review API rate limits
- Monitor server resources

**Connection Issues**
- Verify CORS settings
- Check firewall rules
- Review environment variables
