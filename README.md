# Crewinator API

## Requirements
- MySQL
    - MySQL Workbench recommended
- NodeJS


## Running the api
### 1. Clone the repos
1. Clone this repo into a location of your choice

### 2. Prep the database
1. Open MySQL workbench and open an SQL editor
2. Run the Database creation SQL found [here](DBCreate.sql) to create the database and tables.

### 3. Prep the API
1. Open a command console window and cd into the crewinator_api directory.
2. Run 'npm install' - This will install all dependencies for the api to function.
3. In the root directory of the crewinator_api folder, create a new file named '.env' and open it for editing.
4. Paste the following content into the .env file
```
API_PORT = 4000

DB_NAME = crewinator
DB_USER = YOUR_MYSQL_USERNAME
DB_PASSWORD = YOUR_MYSQL_PASSWORD
DB_HOST = 127.0.0.1
DB_PORT = 3306
JWT_KEY = J932^fXSPwZwWruNNmd2nj%QE^eNsPv4diJUpBS85LNbf8*rFvikHBNJdXHKUoin68T^z%aMhLBRN%Rh4o9&qaR&HbRNX&q!6kGv@TiL75x3Nr2kBqgTnMwGBBQoGC

IGDB_CLIENT_ID = YOUR_IGDB_CLIENT_ID
IGDB_SECRET = YOUR_IGDB_SECRET
```
5. Replace the values with your own. For example set 'DB_USER' and 'DB_PASSWORD' to your own. Ensure the 'DB_HOST' and 'DB_PORT' are correct. Default port value should work fine.
    - Note: The IGDB values are only required for using igdbGamePuller.js. The api does not rely on this and can function without it.

### 4. Start the API
1. In a command console, CD into the crewinator_api directory and enter 'npm start' to start the api.
    - You should see 'Listening on port YOUR_PORT'