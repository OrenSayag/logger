import chalk from 'chalk';

type LogOutput = {
  console?: boolean;
  file?: {
    logsDir: string;
  };
};

type Input = {
  message: unknown;
  output: LogOutput;
  logType?: LogType;
};

const colorPalette = {
  VERBOSE: chalk.cyan,
  ERROR: chalk.redBright,
  INFO: chalk.yellow,
  SUCCESS: chalk.green,
} as const;

const colorPaletteBrowser = {
  VERBOSE: '#00FFFF',
  ERROR: '#ff000d',
  INFO: '#FFFF00',
  SUCCESS: '#00FF00',
} as const;

type LogType = keyof typeof colorPalette;

export const log = ({ message, output, logType = 'VERBOSE' }: Input) => {
  function _log({ message }: { message: unknown }) {
    if (output.console) {

      const isBrowser = typeof window !== 'undefined';


      if (typeof message === 'string') {
        if(isBrowser) {
          console.log(`%c${message}`, `color: #${colorPaletteBrowser[logType]};`);
          return;
        }
        console.log(colorPalette[logType](message));
      } else {
        if(isBrowser) {
          console.log(`%c${JSON.stringify(message, null, 2)}`, `color: #${colorPaletteBrowser[logType]};`);
          return;
        }
        console.log(colorPalette[logType](JSON.stringify(message, null, 2)));
      }
    }
  }

  logTimestamp();
  logMessage();

  function logTimestamp() {
    _log({ message: new Date().toISOString() });
  }
  function logMessage() {
    _log({ message });
  }
};

export const consoleLog = (input: Omit<Input, 'output'>) => {
  log({
    ...input,
    output: {
      console: true,
    },
  });
};
