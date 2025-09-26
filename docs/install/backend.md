
```
mkdir backend
cd backend
npm init --yes
npm pkg set type="module"
npm install @apollo/server graphql
```

```
mkdir src
touch src/index.ts
npm install --save-dev typescript @types/node
touch tsconfig.json
```

Then followed the insturction in https://www.apollographql.com/docs/apollo-server/getting-started to setup basic working app 

```
npm start
```