# LightBnB Project

A simple multi-page Airbnb clone that uses server-side Javascript to display the information from queries to web pages via SQL queries.


## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Open the LightBnB_WebApp directory and run `npm install` to confirm all dependencies have been installed. 
3. In the same directory, start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in your browser.

## Updating your database
1. Create a new database in psql with `CREATE DATABASE lighbnb` and connect to the database using `\c lightbnb`
2. Once connected run `\i migrations/01_schema.sql` to create all tables (make sure that the DROP statements at the top of the file are not commented out). Use `\dt` to confirm that the tables have been created.
3. To fill the tables with the correct data, run `\i seeds/02_seeds.sql`. It is always good to run a test query to confirm that the data has been inserted properly.
4. You are ready to use the LighBnB webpage!

## Dependencies

- Bcrypt
- Body-parser
- Cookie-session
- Express
- Nodemon
- pg

## How to use LightBnB Webpage
https://user-images.githubusercontent.com/112522559/215241819-8ef849e2-83fc-4d1b-8d16-83ddb4cacb28.mp4



## Screenshots

Screenshot of Entity Relationship Diagram:
!["Screenshot of Entity Relationship Diagram"](https://github.com/rebecca-kurtis/LightBnB/blob/main/docs/Screenshot%202023-01-27%20at%208.36.08%20PM.png)

Screenshot of Home Page with all properties:
!["Screenshot of Home Page with all properties"](https://github.com/rebecca-kurtis/LightBnB/blob/main/docs/Screenshot%202023-01-27%20at%208.01.45%20PM.png)

Screenshot of logged in user's listings:
!["Screenshot of logged in user's listings:"](https://github.com/rebecca-kurtis/LightBnB/blob/main/docs/Screenshot%202023-01-27%20at%208.02.09%20PM.png)
