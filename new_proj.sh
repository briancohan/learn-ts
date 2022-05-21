mkdir $1
cp tsconfig.json $1
cp tslint.json $1
cd $1
mkdir src dist
touch src/index.ts
touch dist/index.js
npm init -y
npm install --save-dev typescript tslint @types/node
