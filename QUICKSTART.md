# 🚀 Quick Start Guide

Get the Slooze Commodities Management System running in 3 minutes!

## ⚡ Fastest Way to Start

### Step 1: Install Dependencies (1 min)
```bash
cd slooze-commodities
npm install
```

### Step 2: Run Development Server (30 sec)
```bash
npm run dev
```

### Step 3: Open Browser (30 sec)
Go to: **http://localhost:3000**

## 🔐 Login Credentials

**Manager Account** (Full Access):
```
Email: manager@slooze.com
Password: manager123
```

**Store Keeper Account** (Products Only):
```
Email: keeper@slooze.com
Password: keeper123
```

## ✅ What You'll See

### As Manager:
1. ✨ Login Page → Enter credentials
2. 📊 Dashboard → Statistics & insights
3. 📦 Products → Full inventory with add/edit
4. 🌓 Theme Toggle → Light/Dark mode

### As Store Keeper:
1. ✨ Login Page → Enter credentials
2. 📦 Products → Inventory with add/edit
3. 🚫 Dashboard → Access denied (try it!)
4. 🌓 Theme Toggle → Light/Dark mode

## 🎯 Features to Test

- [ ] Login with both account types
- [ ] View the dashboard (manager only)
- [ ] Search for products
- [ ] Filter by stock status
- [ ] Add a new product
- [ ] Edit an existing product
- [ ] Toggle light/dark mode
- [ ] Try accessing dashboard as store keeper
- [ ] View on mobile (resize browser)

## 📁 Project Files

```
slooze-commodities/
├── README.md          ← Full documentation
├── SUBMISSION.md      ← Feature breakdown
├── DEPLOYMENT.md      ← Hosting guide
├── package.json       ← Dependencies
└── app/              ← Application code
```

## 🆘 Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
npm run dev -- -p 3001
```

### Dependencies Won't Install?
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Build Errors?
```bash
# Check Node version (need 18+)
node --version

# Update npm
npm install -g npm@latest
```

## 🌐 Deploy Now (Optional)

### Vercel (Easiest):
```bash
npm install -g vercel
vercel
```

### Or deploy manually:
1. Push to GitHub
2. Connect to Vercel/Netlify
3. Auto-deploy! 🎉

## 📚 Need More Info?

- **README.md** - Complete setup & features
- **SUBMISSION.md** - Feature breakdown & scoring
- **DEPLOYMENT.md** - Hosting instructions

## 🎨 Screenshots

### Login Page
Beautiful, modern authentication with demo credentials displayed

### Dashboard (Manager Only)
- Total products, in-stock, low-stock, out-of-stock stats
- Total inventory value
- Top categories
- Key insights

### Products Page
- Searchable, filterable product table
- Add/Edit functionality
- Status badges
- Responsive design

### Light/Dark Mode
Seamless theme switching with persistent preferences

---

## 🎉 That's It!

You're ready to explore the Slooze Commodities Management System!

**Questions?** Check the comprehensive README.md

**Happy Testing!** 🚀
