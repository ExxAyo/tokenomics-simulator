# Tokenomics Simulator

Simple browser tool for modeling token allocations, cliffs, linear vesting, and circulating supply over time.

Built with React 18, Vite 3, TypeScript 4, and Recharts 2 (2022 stack).

## Run locally

```bash
npm install
npm run dev
```

## Features

- Set total supply and TGE unlock percentage
- Configure allocation buckets with cliff and vesting duration
- View circulating vs locked supply chart
- Export monthly schedule as CSV
- Load example presets

## Assumptions

- Linear vesting after cliff
- TGE unlock applies to total supply, independent of allocation buckets
- Allocation percentages should sum to 100%

## License

MIT
