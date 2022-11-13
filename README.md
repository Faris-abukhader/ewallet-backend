<p align="center">
<img src="https://user-images.githubusercontent.com/70070951/201531385-e00d7c48-d4b4-47dd-8a11-afdbcac80ccd.png" width="400" height="200">
</p>

<p align="center">
 front-end part <a href="https://github.com/Faris-abukhader/spendee">from here</>
</p>


## 🚩 Table of Contents

- [Introduction](#--introduction)
- [Installation](#--installation)
- [Development setup](#--development-setup)
- [Project structure](#--project-structure)
- [Features](#--features)
- [Packages](#-packages)
- [License](#-license)




## <img src="https://cdn-icons-png.flaticon.com/512/1436/1436664.png" width="25" height="25" style="padding-right:15px">  Introduction 

<p>
Manage all your money with ease from one place with Ewallet. Track your income and expenses, analyze your financial habits and stick to your budgets.
<br/>
This API gonna cover the authentication part , which includes SignIn, JWT , SignUp , email verification.
<br/>
User can create transations with two types expenses and income , also can create budgets for fixed time , for specific cateogries or all categories.
</br>
</p>


## <img src="https://cdn-icons-png.flaticon.com/512/814/814848.png" width="25" height="25" style="padding-right:15px">  Installation 


### 🔘 Cloning repository
1. On GitHub.com, navigate to the main page of the repository.
2. Above the list of files, click  Code.
3. Copy the URL for the repository.
4. Open Terminal.
5. Change the current working directory to the location where you want the cloned directory.
6. Type git clone, and then paste the URL you copied earlier.
```
git clone github.com/Faris-abukhader/we-work-backend
```
Press Enter to create your local clone
```
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `we-work-backend`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```
<br/>


## <img src="https://cdn-icons-png.flaticon.com/512/814/814848.png" width="25" height="25" style="padding-right:15px">  Development setup

To set up this project you need to download NodeJs in your machine or if you have it make sure you have the latest version of it.

### 🔘 Checking up Node version
```
node -v
```

### 🔘 Downloading Node

> for Windows  


Download the windows installer from [NodeJs offical website](https://nodejs.org/en/download/) make sure you have download the latest version of NodeJs.
<br/>


> for Mac
- You can download NodeJs using brew CLI
```
brew install node
```
- You can download NodeJs mac version through [the offical website](https://nodejs.org/en/download/)
<br/>
<hr/>


### 🔘 Downloading the packages

Go to project direct where  <package.json> is exist and type in terminal :
```
npm install 
```
Now you need to create DB server connection , after you create it , create .gitignore file and type :
```
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://<USERNAME>:<YOUR_PASSWORD>@localhost:3306/<DB_NAME>?schema=public"

```
Now you need to step up Prisma ORM , type in your terminal :
```
cd prisma 
prisma generate
```

To run the project just type down in terminal :
```
npm run dev
```

<br/>
<hr/>


## <img src="https://cdn-icons-png.flaticon.com/512/535/535471.png" width="25" height="25" style="padding-right:15px">  Project structure  

```
📦ewallet-backend-main
 ┣ 📂emailConfiguration
 ┃ ┗ 📜emailConfiguration.js
 ┣ 📂middleware
 ┃ ┣ 📜adminMiddleware.js
 ┃ ┗ 📜middleware.js
 ┣ 📂prisma
 ┃ ┣ 📂prisma
 ┃ ┃ ┗ 📜schema.prisma
 ┃ ┗ 📜.gitignore
 ┣ 📂public
 ┃ ┗ 📜messageTemplate.html
 ┣ 📂routes
 ┃ ┣ 📜budget.js
 ┃ ┣ 📜customTransactionCatogery.js
 ┃ ┣ 📜password.js
 ┃ ┣ 📜transaction.js
 ┃ ┣ 📜transactionCatogery.js
 ┃ ┗ 📜user.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜app.js
 ┣ 📜ewallet diagram.png
 ┗ 📜package.json
 ```


## <img src="https://cdn-icons-png.flaticon.com/512/535/535471.png" width="25" height="25" style="padding-right:15px">  Features  

- Simple rest API doc , generated using swagger library , you can check that out at :
```
http://localhost:4500/doc
```
- Authentications , authorizations are all implemented with differents layers , check Prevalidation folder .
- Credentials is all well encoded before it saves to DB.
- Custom implementation of verify account by email 



## 📦 Packages

| Name | Description |
| --- | --- |
| [`@prisma/client`](https://github.com/prisma/prisma) | Next-generation ORM for Node.js & TypeScript | PostgreSQL, MySQL server |
| [`prisma`](https://github.com/prisma/prisma) | Next-generation ORM for Node.js & TypeScript | PostgreSQL, MySQL server |
| [`bcrypt`](https://www.npmjs.com/package/bcrypt) | A library to help you hash passwords |
| [`handlebars`](https://www.npmjs.com/package/handlebars) | A Handlebars view engine for Express which doesn't suck |
| [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) | JSON Web Token implementation (symmetric and asymmetric) |
| [`nodemailer`](https://github.com/nodemailer/nodemailer) | Easy as cake e-mail sending from your Node.js applications |
| [`nodemon`](https://github.com/remy/nodemon) | Simple monitor script for use during development of a Node.js app |
| [`body-parser`](https://www.npmjs.com/package/body-parser) | Node.js body parsing middleware.|
| [`cors`](https://www.npmjs.com/package/cors) | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.|
| [`bcrypt`](https://www.npmjs.com/package/bcrypt) | A library to help you hash passwords.|
| [`dotenv`](https://www.npmjs.com/package/dotenv) | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.|
| [`express`](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist web framework for Node.js.|
| [`swagger-jsdoc`](https://www.npmjs.com/package/swagger-jsdoc) | This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.|
| [`swagger-ui-express`](https://www.npmjs.com/package/swagger-ui-express) | This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file.|



## 📜 License

This software is licensed under the [MIT](https://github.com/Faris-abukhader/we-work-backend/blob/master/LICENSE) © [FaRiS](https://github.com/Faris-abukhader).
