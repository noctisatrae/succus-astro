# Welcome to the new web-version of succus!
```
src/
├── components
│   ├── Address.tsx
│   ├── Chat.svelte
│   ├── index.ts
│   ├── Landing.svelte
│   ├── Main.svelte
│   ├── Navbar.astro
│   └── Wallet.tsx
├── db
│   └── index.ts
├── env.d.ts
├── hooks
│   ├── index.ts
│   └── useLookupAddress.ts
├── layouts
│   └── Layout.astro
├── pages
│   ├── inbox.astro
│   └── index.astro
├── stores
│   ├── ethAddress.ts
│   ├── index.ts
│   └── isConnected.ts
└── web3
    ├── ensLookup.ts
    ├── index.ts
    └── shortenAddress.ts

7 directories, 20 files
```
```json
    "paths": {
      "$":["src/components"],
      "@'":["src/layouts"],
      "#": ["src/hooks"],
      "&":["src/web3"],
      "%": ["src/stores"],
      "db": ["src/db"]
    }
```