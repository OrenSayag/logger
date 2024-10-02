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

type LogType = keyof typeof colorPalette;

export const log = ({ message, output, logType = 'VERBOSE' }: Input) => {
  function _log({ message }: { message: unknown }) {
    if (output.console) {
      if (typeof message === 'string') {
        console.log(colorPalette[logType](message));
      } else {
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
