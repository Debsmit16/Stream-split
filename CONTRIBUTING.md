# Contributing to StreamSplit

Thank you for your interest in contributing to StreamSplit! We welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version, etc.

### Suggesting Features

We love new ideas! To suggest a feature:
- Create an issue with the `enhancement` label
- Describe the feature and its benefits
- Explain how it fits with StreamSplit's goals
- Include mockups or examples if possible

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Debsmit16/Stream-split.git
   cd Stream-split
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation

4. **Test Your Changes**
   ```bash
   # Frontend
   cd packages/react-app
   npm run build
   npm run dev
   
   # Smart Contracts
   cd packages/hardhat
   npx hardhat test
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Link related issues

## 📝 Code Style Guidelines

### TypeScript/React
- Use TypeScript for type safety
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Solidity
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use natspec comments for functions
- Include comprehensive tests
- Follow security best practices

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain retro-futuristic theme
- Ensure accessibility (WCAG 2.1)

## 🧪 Testing

### Frontend Testing
```bash
cd packages/react-app
npm run build
npm run start
```

### Smart Contract Testing
```bash
cd packages/hardhat
npx hardhat test
npx hardhat coverage
```

### PWA Testing
```bash
npm run build
lighthouse http://localhost:3000 --view
```

## 📚 Documentation

When adding features:
- Update README.md if needed
- Update CHANGELOG.md
- Add inline code comments
- Update PWA_RESPONSIVE_GUIDE.md for UI changes

## 🔒 Security

If you discover a security vulnerability:
- **DO NOT** create a public issue
- Email the maintainers directly
- Provide detailed information
- Wait for acknowledgment before disclosure

## 🎨 Design Guidelines

### Retro-Futuristic Theme
- Use cyan (#00FFFF) and purple (#AC4BFF) as primary colors
- Maintain monospace fonts (Courier New, Monaco)
- Include retro effects (grid, scanlines, glow)
- Keep terminal-style UI elements
- Use corner brackets for decorative elements

### Responsive Design
- Mobile-first approach
- Test on multiple screen sizes
- Ensure 44px minimum touch targets
- Support landscape orientation

## 💡 Development Tips

### Local Development
```bash
# Start frontend dev server
cd packages/react-app
npm run dev

# Watch smart contract changes
cd packages/hardhat
npx hardhat watch compilation
```

### Environment Variables
Never commit `.env.local` or environment secrets!

### Git Workflow
- Keep commits small and focused
- Write descriptive commit messages
- Rebase before merging
- Squash commits if needed

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Credited in the CHANGELOG

## 📞 Questions?

- Open an issue for questions
- Check existing issues first
- Be respectful and patient

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Enforcement
Unacceptable behavior may result in temporary or permanent ban from the project.

---

Thank you for contributing to StreamSplit! 🚀

**Happy Coding!** 💻✨
