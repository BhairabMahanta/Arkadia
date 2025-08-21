# 🤝 Contributing to Arkadia

**Welcome to Arkadia - GSSOC 2025! 🎮**

Thank you for your interest in contributing to Arkadia, the open source gaming community platform! Whether you're a beginner taking your first steps in open source or an experienced developer, we have exciting opportunities for you to learn, build, and make a real impact.

## 🌟 About Arkadia & GSSOC 2025

Arkadia is part of **GirlScript Summer of Code 2025**, designed to provide hands-on learning experiences in modern web development, game development, and community building. We're building the future of online gaming communities by creating an integrated platform where developers collaborate to build, share, and play games together.

**What makes us special:**
- 🎮 **Real Impact**: Your contributions will be used by actual gaming communities
- 📚 **Learning-First**: Every task is designed to teach you something new
- 🤝 **Mentorship**: Get guidance from experienced developers
- 🏆 **Portfolio-Worthy**: Build impressive features you can showcase

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)
- **Discord Account** - For testing bot features
- **Basic knowledge** of JavaScript/TypeScript (we'll help you learn!)

### 2. Fork & Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/Arkadia.git
cd Arkadia

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/Arkadia.git
```

### 3. Setup Development Environment
```bash
# Install dependencies
pnpm install

# Copy environment files
cp packages/backend/.env.example packages/backend/.env
cp packages/bot/.env.example packages/bot/.env
cp packages/frontend/.env.example packages/frontend/.env

# Add your Discord bot credentials (ask mentors for help!)
# Edit the .env files with your bot token and IDs
```

### 4. Start Development
```bash
# Start all services
pnpm dev

# Or start individual packages:
pnpm --filter frontend dev    # Web dashboard
pnpm --filter backend dev     # API server
pnpm --filter bot dev         # Discord bot
```

### 5. Verify Setup
- **Frontend**: Visit http://localhost:5173
- **Backend**: Visit http://localhost:3001/health
- **Discord Bot**: Type `/ping` in your test server

## 🎯 How to Contribute

### 🔍 Finding Issues to Work On

We organize issues by skill level and type:

**🟢 Perfect for Beginners:**
- `good-first-issue` - Simple tasks to get you started
- `documentation` - Help improve our docs
- `ui-component` - Create React components
- `discord-command` - Simple bot commands

**🟡 Ready for More Challenge:**
- `help-wanted` - Features needing implementation
- `game-development` - Build new games
- `api-endpoint` - Backend development
- `real-time-feature` - WebSocket implementations

**🔴 For Advanced Contributors:**
- `architecture` - System design improvements
- `performance` - Optimization challenges
- `ai-integration` - Machine learning features
- `cross-platform` - Complex integrations

### 📋 Issue Labels Guide

| Label | Description | Skill Level | Time Estimate |
|-------|-------------|-------------|---------------|
| `good-first-issue` | Perfect for newcomers | Beginner | 2-4 hours |
| `documentation` | Improve docs/guides | Any | 1-3 hours |
| `ui-component` | React component work | Beginner-Intermediate | 3-6 hours |
| `game-logic` | Implement game rules | Intermediate | 4-8 hours |
| `api-development` | Backend endpoints | Intermediate | 4-10 hours |
| `real-time` | WebSocket features | Advanced | 8-15 hours |
| `performance` | Optimization work | Advanced | 10-20 hours |

## 🛠️ Development Guidelines

### Code Style & Standards

**TypeScript/JavaScript:**
- **ESLint** configuration is provided - follow the rules
- **Naming**: Use `camelCase` for variables, `PascalCase` for components
- **Comments**: Write clear, helpful comments for complex logic
- **Error Handling**: Always handle errors gracefully

**React Components:**
```typescript
// ✅ Good
interface GameCardProps {
  title: string;
  playerCount: number;
  onJoin: () => void;
}

export const GameCard: React.FC = ({ title, playerCount, onJoin }) => {
  return (
    
      {title}
      {playerCount} players
      
        Join Game
      
    
  );
};
```

**Discord Bot Commands:**
```typescript
// ✅ Good
export const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Start a trivia game'),
  
  async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction) {
    try {
      // Game logic here
      await interaction.reply('🧠 Trivia game started!');
    } catch (error) {
      console.error('Trivia command error:', error);
      await interaction.reply({ 
        content: '❌ Failed to start trivia game!', 
        ephemeral: true 
      });
    }
  }
};
```

**API Endpoints:**
```typescript
// ✅ Good
app.post('/api/games/:gameId/join', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { userId } = req.body;
    
    // Validation
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    
    // Business logic
    const result = await gameService.joinGame(gameId, userId);
    
    // Success response
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Join game error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Git Workflow

**Branch Naming:**
```bash
# Feature branches
git checkout -b feature/trivia-game-ui
git checkout -b feature/tournament-brackets

# Bug fixes
git checkout -b fix/discord-command-error
git checkout -b fix/leaderboard-sorting

# Documentation
git checkout -b docs/api-endpoints
git checkout -b docs/setup-guide
```

**Commit Messages:**
```bash
# Good commit messages
git commit -m "feat: add trivia game component with timer"
git commit -m "fix: resolve Discord bot command cooldown issue"
git commit -m "docs: update API documentation for games endpoint"
git commit -m "style: improve game card responsive design"
git commit -m "test: add unit tests for tournament bracket logic"
```

## 🔄 Pull Request Process

### Before You Submit

**✅ Checklist:**
- [ ] Code follows our style guidelines
- [ ] All existing tests pass
- [ ] Added tests for new features (if applicable)
- [ ] Updated documentation for changes
- [ ] Tested locally (frontend, backend, bot)
- [ ] No merge conflicts with main branch

### PR Template

When creating a PR, use this template:

```markdown
## 🎯 What does this PR do?
Brief description of the changes and which issue it fixes.

## 🔗 Related Issue
Closes #123

## 📋 Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📚 Documentation update
- [ ] 🎨 Code style/formatting
- [ ] ♻️ Code refactoring
- [ ] ✅ Test addition/update

## 🧪 How Has This Been Tested?
- [ ] Tested locally
- [ ] Frontend loads without errors
- [ ] Backend API responds correctly
- [ ] Discord bot commands work
- [ ] All existing tests pass

## 📸 Screenshots (if applicable)
Add screenshots of UI changes

## 📝 Additional Notes
Any additional information for reviewers
```

### Review Process

1. **Automated Checks**: GitHub Actions will run tests and linting
2. **Peer Review**: Another contributor will review your code
3. **Mentor Review**: A mentor will provide final approval
4. **Merge**: Your code gets merged into main branch! 🎉

## 🎮 Game Development Guidelines

### Adding New Games

**1. Use the Template System:**
```bash
# Copy game template
cp -r packages/frontend/src/games/template packages/frontend/src/games/your-game
cp -r packages/backend/src/games/template packages/backend/src/games/your-game
cp -r packages/bot/src/games/template packages/bot/src/games/your-game
```

**2. Game Structure Requirements:**
- **Frontend**: React component with game UI
- **Backend**: API endpoints for game logic
- **Bot**: Discord commands for game interaction
- **Real-time**: WebSocket events for multiplayer features

**3. Game Categories:**
- **🧠 Puzzle Games**: Trivia, word games, sudoku
- **🎯 Action Games**: Reaction-based, timing games
- **🤝 Social Games**: Party games, icebreakers
- **🏆 Competitive Games**: Tournaments, leaderboards

### Game Quality Standards

**✅ Must Have:**
- Clear game rules and instructions
- Error handling for edge cases
- Responsive design for mobile
- Accessibility features (keyboard navigation, screen readers)
- Multi-language support ready

**🌟 Nice to Have:**
- Animations and visual effects
- Sound effects and music
- AI opponents for single-player
- Statistics and achievement tracking
- Tournament integration

## 🏗️ Project Structure & Isolation System

### 📂 Understanding Our Modular Architecture

Arkadia uses a **complete isolation system** to ensure contributors never conflict with each other's work. Each game is a self-contained module across all packages.

### 🎮 Game Module Structure

**Every new game follows this isolated pattern:**

```
Arkadia/
├── packages/
│   ├── frontend/src/games/
│   │   ├── trivia/           # Trivia game (complete isolation)
│   │   ├── tic-tac-toe/      # Tic-tac-toe game (complete isolation)
│   │   ├── your-new-game/    # Your game goes here
│   │   └── template/         # Copy this to start new games
│   ├── backend/src/games/
│   │   ├── trivia/           # Trivia API endpoints
│   │   ├── tic-tac-toe/      # Tic-tac-toe API endpoints  
│   │   ├── your-new-game/    # Your API endpoints go here
│   │   └── template/         # Copy this to start new games
│   └── bot/src/games/
│       ├── trivia/           # Trivia Discord commands
│       ├── tic-tac-toe/      # Tic-tac-toe Discord commands
│       ├── your-new-game/    # Your Discord commands go here
│       └── template/         # Copy this to start new games
```

### 🛡️ Zero Conflict Development

**✅ What This Means for You:**
- **Work independently** - Your game folder is completely yours
- **No merge conflicts** - You'll never touch another contributor's game code
- **Safe experimentation** - Break your own game without affecting others
- **Easy collaboration** - Multiple people can work on different games simultaneously

### 🔧 Adding a New Game - Step by Step

**1. Choose Your Game Name**
```bash
# Use kebab-case for consistency
# ✅ Good: word-chain, racing-game, memory-match
# ❌ Bad: WordChain, racing_game, Memory Match
```

**2. Copy Template to All Packages**
```bash
# Frontend component
cp -r packages/frontend/src/games/template packages/frontend/src/games/your-game-name

# Backend API
cp -r packages/backend/src/games/template packages/backend/src/games/your-game-name

# Discord bot commands  
cp -r packages/bot/src/games/template packages/bot/src/games/your-game-name
```

**3. Automatic Registration**
Once you create your game folders, they're automatically:
- **API Routes**: Available at `/api/games/your-game-name/*`
- **Frontend Routes**: Available at `/games/your-game-name`
- **Discord Commands**: Available as `/your-game-name *`
- **WebSocket Namespace**: Available at `/your-game-name`

### 📋 Individual Game Structure

**Each game module contains:**

```
your-game-name/
├── frontend/src/games/your-game-name/
│   ├── components/           # React components for your game
│   ├── hooks/               # Custom hooks for game logic
│   ├── pages/               # Game pages and routes
│   ├── services/            # API calls specific to your game
│   └── types.ts             # TypeScript types for your game
├── backend/src/games/your-game-name/
│   ├── routes.ts            # Your API endpoints
│   ├── models.ts            # Database models for your game
│   ├── services.ts          # Business logic for your game
│   ├── websockets.ts        # Real-time features for your game
│   └── utils.ts             # Utility functions for your game
└── bot/src/games/your-game-name/
    ├── commands/            # Discord slash commands
    ├── events/              # Discord event handlers
    ├── utils.ts             # Bot utility functions
    └── types.ts             # Bot-specific types
```

### 🚀 Development Workflow

**Starting a New Game:**
1. **Pick an issue** labeled with `new-game` or `game-development`
2. **Copy the template** for all three packages
3. **Rename everything** from "template" to your game name
4. **Start coding** - you own this entire module!
5. **Test independently** - your game won't affect others

**Working on Existing Games:**
1. **Find game-specific issues** labeled with the game name
2. **Navigate to that game's folder** only
3. **Make your changes** within that isolated module
4. **Test your specific game** without worrying about others

### 🔒 Isolation Benefits

**🛡️ For Contributors:**
- **No accidental conflicts** with other contributors
- **Safe to experiment** and make mistakes
- **Focus on your game** without understanding the entire codebase
- **Easy testing** - only your game is affected by changes

**🏗️ For the Project:**
- **Parallel development** - multiple games can be developed simultaneously
- **Modular codebase** - easier to maintain and debug
- **Scalable architecture** - can support unlimited games
- **Clean separation** - each game is a complete feature

### ⚠️ Important Rules

**✅ DO:**
- Work only in your assigned game folder
- Copy the template for new games
- Follow the naming conventions
- Test your game thoroughly
- Update your game's documentation

**❌ DON'T:**
- Modify other contributors' game folders
- Change core system files without discussion
- Break the naming conventions
- Add dependencies that affect other games
- Touch the template folder (it's for copying only)

### 🔍 Finding Your Way Around

**If you're working on the "racing" game:**
```bash
# Your files are ONLY in these locations:
packages/frontend/src/games/racing/
packages/backend/src/games/racing/
packages/bot/src/games/racing/

# You can safely ignore everything else!
```

**If you're working on "trivia" improvements:**
```bash
# Your files are ONLY in these locations:
packages/frontend/src/games/trivia/
packages/backend/src/games/trivia/
packages/bot/src/games/trivia/

# Other games don't affect you at all!
```

### 🎯 Quick Reference

**Need to add a feature to your game?**
- Frontend UI → `packages/frontend/src/games/your-game/`
- API endpoint → `packages/backend/src/games/your-game/routes.ts`
- Discord command → `packages/bot/src/games/your-game/commands/`
- Real-time feature → `packages/backend/src/games/your-game/websockets.ts`

**Need help with your specific game?**
- Look for issues tagged with your game name
- Ask in Discord with `#your-game-name` channel
- Check the template folder for examples
- Review similar completed games for patterns

## 🏆 Recognition & Rewards

### Contributor Levels

**🌱 Sprout (0-2 PRs)**
- Welcome to the community!
- Get your first PR merged
- Listed in CONTRIBUTORS.md

**🌿 Leaf (3-5 PRs)**
- Regular contributor badge
- Access to advanced issues
- Invited to contributor calls

**🌳 Tree (6-10 PRs)**
- Trusted contributor status
- Code review privileges
- Mentor new contributors

**🏆 Forest Guardian (10+ PRs)**
- Core contributor recognition
- Direct collaboration with maintainers
- Influence on project roadmap

### GSSOC 2025 Benefits

- **Certificate**: Official GSSOC completion certificate
- **Swag**: Exclusive merchandise for active contributors
- **Networking**: Connect with industry professionals
- **Portfolio**: Impressive project to showcase in interviews
- **References**: Recommendation letters from mentors
- **Skills**: Hands-on experience with modern tech stack

## 🆘 Getting Help

### 📞 Where to Ask Questions

**🐛 Bug Reports & Feature Requests**
- Create a GitHub Issue with detailed description
- Use appropriate labels and templates
- Include screenshots and error messages

**💬 General Questions**
- Join our Discord community server
- Use the `#general-help` channel
- Tag mentors with `@mentor` if needed

**🤝 Mentorship**
- Schedule 1-on-1 sessions with mentors
- Ask for code reviews and feedback
- Get guidance on career development

**📚 Documentation**
- Check existing documentation first
- Search closed issues for similar problems
- Read the setup guides and API docs

### 🕐 Response Times

- **GitHub Issues**: 24-48 hours
- **Discord Questions**: 2-6 hours during active hours
- **PR Reviews**: 2-3 days maximum
- **Urgent Issues**: Tag with `urgent` label

## 📝 Documentation Standards

### Code Documentation

**✅ Always Document:**
- Complex algorithms and business logic
- API endpoints with parameters and responses
- React component props and usage examples
- Discord bot commands and their functionality

**Example:**
```typescript
/**
 * Calculates tournament bracket pairings using single-elimination format
 * @param participants - Array of player objects with id and name
 * @param seedRandom - Whether to randomize initial seeding
 * @returns Bracket structure with match pairings
 */
export function generateBracket(
  participants: Player[], 
  seedRandom: boolean = false
): TournamentBracket {
  // Implementation here
}
```

### README Updates

When adding new features:
- Update the main README.md with new capabilities
- Add setup instructions for any new dependencies
- Include usage examples and screenshots
- Update the tech stack section if needed

## 🌈 Community Guidelines

### 🤝 Be Welcoming & Inclusive

- **Welcome newcomers** - Remember, everyone was a beginner once
- **Use inclusive language** - Avoid assumptions about gender, race, background
- **Be patient** - Help others learn instead of just providing answers
- **Celebrate achievements** - Recognize contributions big and small

### 💬 Communication Guidelines

**✅ Good Communication:**
- Ask specific questions with context
- Provide detailed bug reports
- Give constructive feedback
- Share knowledge and resources

**❌ Avoid:**
- Off-topic discussions in work channels
- Demanding immediate help
- Criticizing without offering solutions
- Sharing inappropriate content

### 🏆 Recognition Culture

- **Give credit** where it's due
- **Mention contributors** in PR descriptions
- **Thank reviewers** for their time
- **Share your wins** with the community

## 🔒 Security & Privacy

### 🛡️ Security Best Practices

**Code Security:**
- Never commit API keys, tokens, or passwords
- Use environment variables for sensitive data
- Validate all user inputs
- Follow OWASP security guidelines

**Bot Security:**
- Keep bot tokens secure and rotated
- Implement proper permission checks
- Rate limit commands to prevent spam
- Log security-related events

### 📊 Data Privacy

- Collect only necessary user data
- Follow GDPR guidelines for EU users
- Provide clear privacy policies
- Allow users to delete their data

## 🎉 Final Notes

### 🚀 Ready to Start?

1. **Join our Discord community** - Get connected with other contributors
2. **Read the setup guide** - Get your development environment ready  
3. **Pick your first issue** - Look for `good-first-issue` labels
4. **Ask questions** - Don't hesitate to seek help
5. **Start coding** - Make your first contribution!

### 💡 Remember

- **Learning is the goal** - Don't worry about making mistakes
- **Community first** - Help others and ask for help when needed
- **Quality over quantity** - Focus on doing good work, not just more work
- **Have fun** - Enjoy building something amazing with fellow developers!

**Welcome to Arkadia! Let's build the future of gaming communities together! 🎮✨**

**Questions?** Reach out to our mentors or join the discussion in our community channels. We're here to help you succeed!

*This document is living and evolving. If you have suggestions for improvements, please open an issue or submit a PR!*
