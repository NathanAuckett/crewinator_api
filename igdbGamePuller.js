require('dotenv').config();
const axios = require('axios');

const connection = require('./dbConnect');
const mysql = require('mysql2');

let accessToken = '';

async function getAuth(){
    let response = await axios.post("https://id.twitch.tv/oauth2/token",{
        "client_id": process.env.IGDB_CLIENT_ID,
        "client_secret": process.env.IGDB_SECRET,
        "grant_type": "client_credentials"
    });

    console.log(response.data);

    accessToken = response.data.access_token;
    console.log(accessToken);
}

async function getGames(offset){
    response = await axios.post("https://api.igdb.com/v4/games",
        `
        fields name, cover;
        where rating > 50 & first_release_date > 1420070400;
        sort first_release_date desc;
        limit 500;
        offset: 2500;
        `,
        {
            headers:{
                'Client-ID': process.env.IGDB_CLIENT_ID,
                'Authorization': `Bearer ${accessToken}`,
                "Accept-Encoding": "gzip,deflate,compress"
            }
        }
    );

    const games = response.data;
    console.log(games);
    
    for (game of games){
        try{
            response = await axios.post("https://api.igdb.com/v4/covers/",
                `fields url; where game = ${game.id};`,
                {
                    headers:{
                        'Client-ID': process.env.IGDB_CLIENT_ID,
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            
            console.log(response.data);

            game.image_url = response.data[0]?.url || "";
            
            const formattedGame = {
                title: game.name,
                image_url: game.image_url,
                is_igdb_game: 1,
                creation_date: new Date(),
                last_update: new Date()
            }

            console.log(formattedGame);

            const sql = mysql.format(`INSERT INTO games SET ?`, formattedGame);

            connection.query(sql,  (err, result) => {
                if (err) throw err;
            });
        }
        catch (err){
            console.log(err);
        }
    }
}


async function doIt(){
    await getAuth();
    await getGames(1);
}

doIt();

module.exports = {
    getAuth,
    getGames
}