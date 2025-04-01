/**
 * Console styling and logging utilities
 */

// Console styling
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

// Logger for consistent output
const logger = {
  info: (msg) => console.log(`${COLORS.fg.cyan}[INFO]${COLORS.reset} ${msg}`),
  success: (msg) => console.log(`${COLORS.fg.green}[SUCCESS]${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.fg.yellow}[WARNING]${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.fg.red}[ERROR]${COLORS.reset} ${msg}`),
  step: (msg) => console.log(`\n${COLORS.fg.blue}${COLORS.bright}===${COLORS.reset} ${msg} ${COLORS.fg.blue}${COLORS.bright}===${COLORS.reset}\n`),
};

// Create a divider line
const divider = () => console.log('\n' + '-'.repeat(50) + '\n');

// Create a formatted header
const header = (msg) => {
  const line = '='.repeat(msg.length + 8);
  console.log(`\n${COLORS.fg.magenta}${line}${COLORS.reset}`);
  console.log(`${COLORS.fg.magenta}===  ${COLORS.bright}${msg}${COLORS.reset}${COLORS.fg.magenta}  ===${COLORS.reset}`);
  console.log(`${COLORS.fg.magenta}${line}${COLORS.reset}\n`);
};

module.exports = {
  COLORS,
  logger,
  divider,
  header
};
