# 🕌 Tawhid Space - Backend API

> Islamic Spiritual Wellness Platform - RESTful API built with Node.js, TypeScript, Express, and PostgreSQL

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+ (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Create database:
```bash
createdb tawhid_space_dev
```

4. Run migrations:
```bash
npm run migrate
```

5. Start development server:
```bash
npm run dev
```

Server runs on http://localhost:3000

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database
- `npm run lint` - Lint code
- `npm run format` - Format code

## 📁 Project Structure

See PROJECT_STRUCTURE.md for detailed folder structure.

## 📖 API Documentation

- Base URL: `http://localhost:3000/api/v1`
- Swagger Docs: `http://localhost:3000/api/v1/docs`

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:unit     # Unit tests only
npm run test:integration  # Integration tests only
```

## 📄 License

MIT

---

**Built with ❤️ by Tawhid Space Team**
