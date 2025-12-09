import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { createPublicClient, http, Block } from "viem";
import { mainnet } from "viem/chains";
import { BlockNotFoundError } from "viem";
import { configEnv } from "src/libs/config/config-env";
import { BlockAnalysisResult } from "./types/block-analysis-results.type";
import { isDefined } from "class-validator";

@Injectable()
export class BlockService {
  private readonly client = createPublicClient({
    chain: mainnet,
    transport: http(configEnv.ethRpcUrl),
  });

  private async getBlockData(
    blockNumber?: number
  ): Promise<Block<bigint, true>> {
    try {
      const block = await this.client.getBlock({
        blockNumber: isDefined(blockNumber) ? BigInt(blockNumber) : undefined,
        includeTransactions: true,
      });

      if (!block) {
        throw new NotFoundException(`Block ${blockNumber} does not exist`);
      }

      return block;
    } catch (error) {
      if (error instanceof BlockNotFoundError) {
        throw new NotFoundException(`Block ${blockNumber} does not exist`);
      }

      throw new InternalServerErrorException(
        "Something went wrong while getting the block"
      );
    }
  }

  async getBlockAnalysis(blockNumber?: number): Promise<BlockAnalysisResult> {
    const block = await this.getBlockData(blockNumber);

    return this.processBlock(block);
  }

  private processBlock(block: Block<bigint, true>): BlockAnalysisResult {
    const transactions = block.transactions;

    const senders: Record<string, number> = {};
    const receivers: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.from) {
        const fromAddress = tx.from.toLowerCase();
        senders[fromAddress] = (senders[fromAddress] ?? 0) + 1;
      }

      if (tx.to) {
        const toAddress = tx.to.toLowerCase();
        receivers[toAddress] = (receivers[toAddress] ?? 0) + 1;
      }
    });

    return {
      blockNumber: block.number.toString(),
      blockHash: block.hash,
      totalTransactions: transactions.length,
      senders,
      receivers,
    };
  }
}
