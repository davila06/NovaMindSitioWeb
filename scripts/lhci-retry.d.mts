export interface LhciResult {
  status: number;
  output: string;
}

export function runLhciWithRetry(
  runAttempt: () => Promise<LhciResult>,
  onRetry?: (attempt: number) => void,
): Promise<LhciResult>;

export function collectLhciUrlsWithRetry(
  urls: string[],
  collectUrl: (url: string, additive: boolean) => Promise<LhciResult>,
  onRetry?: (url: string, attempt: number) => void,
): Promise<LhciResult>;
