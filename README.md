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

https://user-images.githubusercontent.com/112522559/215241819-8ef849e2-83fc-4d1b-8d16-83ddb4cacb28.mp4



## Screenshots

Screenshot of Main Page with a viewpoint greater than 1024px:
!["Screenshot of Main Page with a viewpoint greater than 1024px"](https://github.com/rebecca-kurtis/tweeter/blob/master/docs/Screenshot%202023-01-07%20at%205.50.27%20PM.png)

Screenshot of Main Page with a viewpoint less than 1024px:
!["Screenshot of Main Page with a viewpoint less than 1024px"](https://github.com/rebecca-kurtis/tweeter/blob/master/docs/Screenshot%202023-01-07%20at%205.50.39%20PM.png)

Screenshot of error occuring when trying to submit an empty tweet:
!["Screenshot of error occuring when trying to submit an empty tweet"](https://github.com/rebecca-kurtis/tweeter/blob/master/docs/Screenshot%202023-01-07%20at%205.51.31%20PM.png)
