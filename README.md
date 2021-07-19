# Fantasy Stock Trader 

_Web Based Fantasy Stock Trading Application_

_Use Fake Money To Test Your Stockmarket Skills Trading Shares of Your Favorite Companies_

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

To Use Locally or Accessing at Below Link
___
The search page can be used to search for tweets by either content or by username, using the corresponding button to search. When searching by username, input a valid Twitter username (omitting the "@" symbol), and Tweeter-Grabberer will return the most recent ten of that user's tweets. Users who have marked their accounts as "private" cannot be searched using Tweeter-Grabberer. To search by content, type a content that you would like to search (ie. World Series, PS5, Simpsons). The fifteen most popular tweets (as determined by the Twitter algorithm ) about that content will be displayed. The random page will allow the user to choose one of my five favorite Twitter users and will display a random tweet from that user's most recent ten tweets. 


![Login/Signup-Page ScreenShot]()

![Home-Page ScreenShot]()

![Trade-Page ScreenShot]()

![Portfolio-PageScreenShot]()

![Trade-Collapsed-PageScreenShot]()

![Portfolio-Collapsed-PageScreenShot]()

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