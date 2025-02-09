# 🚀 FastPath - Because Life's Too Short for Slow Frameworks!

## What's This All About?
FastPath is like that friend who always knows where they're going - a super lightweight, blazingly quick Node.js web framework that doesn't get lost in the middleware maze! 

## 🎯 Features
* 🪶 Lighter than a feather wearing a diet belt
* 🏃‍♂️ Faster than your cat running from a cucumber
* 🎮 Router so simple, your grandma could use it
* 🎭 Middleware support (because we're fancy like that)
* 🎪 Parameter handling that juggles your :params like a pro

## 🚀 Quick Start

```javascript
const fastpath = require('fastpath');
const app = fastpath();

app.get('/', (req, res) => {
  res.json({ message: "I'm faster than your coffee break!" });
});

app.listen(3000, () => {
  console.log('Server is running! (Probably faster than Usain Bolt)');
});
```

## 🛠️ Installation
```bash
npm install fastpath
```
(Just kidding, we're not on npm yet, but we're working on it! 😉)

## 🎮 API Examples

### Basic Route
```javascript
app.get('/hello', (req, res) => {
  res.send('Hello, Speed Demon! 🏎️');
});
```

### Route Parameters
```javascript
app.get('/users/:id', (req, res) => {
  res.json({ message: `Found user ${req.params.id}! That was easy!` });
});
```

### Error Handling
```javascript
app.error((err, req, res) => {
  res.status(500).json({ 
    error: err.message,
    note: "Don't panic! Even rockets malfunction sometimes! 🚀"
  });
});
```

## ⚠️ Warning
This framework is so fast, it might cause temporal displacement. We're not responsible for any accidental time travel.

## 📜 License
MIT - Because sharing is caring! ❤️

## 🤓 Contributing
Found a bug? Want to add a feature? Know how to make it even faster (is that even possible)? 
PRs are welcome! Just make sure your code runs faster than a caffeinated cheetah! 

---
Made with ❤️ and probably too much ☕
