# Fantasy Stock Trader 

_Web Based Fantasy Stock Trading Application_

Use Fake Money To Test Your Stock Market Skills Trading Shares of Your Favorite Companies

Start Trading Today! [Link to Application](https://fantasy-stocks-app.onrender.com) 


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
5. Rename `.env_sample` to `.env` file and replace API key(PRODUCTION_TOKEN) and the JSON Web Token secret key(TOKEN_SECRET_KEY) with your own. You can reach TwelveData API [here](https://twelvedata.com/) and JSON Web Token [here](https://jwt.io/)
6. Uncomment lines 31-47 and comment out lines 49-53 in `server.js`
7. Uncomment lines 3-22 and comment out lines 26-35 in `pool.js`
8. Change line 11 of the root directory `package.json` to read `"client": "npm run watch --prefix client"`
9. Run `npm run dev` in root directory to start server
10. Open browser at `http://localhost:5000/`

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
- Boostrap/React Bootrap - CSS Framework
- Node.js and Express.js - Backend Stack and Internal API
- PostgreSQL - Database
- TwelveData API - RESTAPI
- Render - Hosting platform for both the React-add and the Node web server 
- ElephantSQL - Hosting platform for the database.

#### Other Tools

- Google Charts to graphically display stock and portfolio information
- dbdiagram.io to design databse schema ![Diagram](https://github.com/danielmurphy1/fantasystockapp/blob/main/images/dbmockup.JPG)
- JSON Web Token for user authentication and authorization




### Summary

This application is the second full-stack application I have created and the first one that has full CRUD operations with an external databse. The backend is designed to handle the internal API route requests from the client, pass those along to a handler, which passes those to a service to make the external database requests. 

To create this application, I had to learn some new technologies. I learned SQL/PostgreSQL for the external database. This was also the first application in which I implemented authentication/authorization, so I learned how to utilize JSON Webtoken to handle that. Additionally, this project allowed me to continue learning and get more experience working with Nodejs/Express and consuming external APIs. 

This project certainly pushed me to hone my skills as a self-taught devloper. Thinking and working through problems was a major theme of this project. I got more experience reading documentation and searching for solutions to problems in order to get the application created and deployed. This was an extremely rewarding experience, and I look forward to taking the skills that I learned and honed on this project to others in the future. 

#### Update

I revisited this application after needing to find a new hosting site, due to Heroku no longer offering their free tier. After some reading, I chose Render for the new hosting platform. However, I also found out that IEX Cloud (the previous Stock Data API that I used), also recently changed their payment model. Their model no longer was an affordable option, so I found Twelve Data API. I had to make a few changes to the code. I can say that these changes were pretty simple for me to make with my current experience; however I KNOW that if I had to make these changes before around 9 months ago, it would have taken me much longer. At this point I was really able to see the growth that I have acheived as a developer and the progress I have made. 

Secondly, it took me a little bit to get the appication deployed to Render. Lots of Googling, some forum reading, some video watching, and some tinkering under the hood, and I was up and running on Render. That was another moment where I realized how much I have grown as a developer. I really was able to keep at it and ask the right questions I needed to come to the answer. Getting this application up and running again was really a good exercise for me and has helped me to realize the journey I have taken.

### Author

- Dan Murphy, Full-Stack Developer, https://www.linkedin.com/in/daniel-murphy-055/