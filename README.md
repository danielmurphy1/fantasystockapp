# Fantasy Stock Trader 

_Web Based Fantasy Stock Trading Application_

Use Fake Money To Test Your Stock Market Skills Trading Shares of Your Favorite Companies

Start Trading Today! [Link to Application]() 


## Instructions

To Download and Run Locally

I. Clone SQL Databse Schema

1. Download PosgreSQL/PGAdmin 
2. Run the databse creation script in the `db.sql` file in the `database` directory

II. Install Files to Run Locally

1. Clone code locally from GitHub
2. CD into application/root directory
3. Run `npm i` in root directory
4. Run `npm i --prefix client` in root directory
5. Rename `.env_sample` to `.env` file and replace API keys and the JSON Web Token secret key with your own. You can reach IEX API [here](https://iexcloud.io/) and JSON Web Token [here](https://jwt.io/)
6. Run `npm run dev` in root directory to start server
7. Open browser at `http://localhost:3000/`

###### Login/Signup Page
![Login/Signup-Page ScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/loginANDregister.JPG)

###### Home/Welcome Page
![Home-Page ScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/welcome-home.JPG)

###### Trade Page
![Trade-Page ScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/trade1.JPG)

![Trade-Page ScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/trade2.JPG)

###### Portfolio Page
![Portfolio-PageScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/porfolio.JPG)

##### Responsive

###### Trade Page Collapsed
![Trade-Collapsed-PageScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/trade-collapsed1.JPG)
![Trade-Collapsed-PageScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/trade-collapsed2.JPG)
![Trade-Collapsed-PageScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/trade-collapsed3.JPG)

###### Portfolio Page Collapsed
![Portfolio-Collapsed-PageScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/portfolio-collapsed1.JPG)
![Portfolio-Collapsed-PageScreenShot](https://github.com/danielmurphy1/fanstasystockapp/blob/main/images/portfolio-collapsed2.JPG)

## Technologies/Design

#### Technology Stack

- HTML, CSS, JavaScript - Front End Stack
- React - Front End Framework
- Node.js and Express.js - Backend Stack and Internal API
- PostgreSQL - Database
- IEX Cloud API - RESTAPI
- Heroku - Hosting platform for both the web server and database

#### Other Tools

- Google Charts to graphically display stock and portfolio information
- dbdiagram.io to design databse schema [Diagram] ()
- JSON Web Token for user authentication and authorization




### Summary



### Author

- Dan Murphy, Full-Stack Developer, https://www.linkedin.com/in/daniel-murphy-055/