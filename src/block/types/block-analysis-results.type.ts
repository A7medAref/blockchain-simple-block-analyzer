export type BlockAnalysisResult = {
  blockNumber: string;
  blockHash: string;
  totalTransactions: number;
  senders: Record<string, number>;
  receivers: Record<string, number>;
};