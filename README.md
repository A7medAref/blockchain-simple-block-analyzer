# Blockchain RPC Application

A simple NestJS application that connects to an Ethereum RPC endpoint to fetch and analyze blockchain blocks.

## Features

- Fetch blockchain blocks (latest or by block number)
- Analyze transactions: count total, group by sender/receiver addresses
- Health check endpoint
- Comprehensive error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables (optional):
```bash
ETH_RPC_URL=https://your-rpc-endpoint.com
```

If not provided, defaults to a public Ethereum RPC endpoint.

## Running the app

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

## API Endpoints

### GET /block?blockNumber=12345678
Fetches and analyzes a specific block. If `blockNumber` is not provided, fetches the latest block.

**Response:**
```json
{
  "blockNumber": "0x...",
  "blockHash": "0x...",
  "totalTransactions": 150,
  "senders": {
    "0x...": 5,
    "0x...": 3
  },
  "receivers": {
    "0x...": 10,
    "0x...": 7
  }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

