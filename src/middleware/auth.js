const axios = require('axios');
const chalk = require('chalk');

const baseURL = `https://hackaday.io`;
const auth = async (req,res,next) => {
    try {
        // No authorization code and no code
        if ( !req.query["code"] && !req.header('Authorization') ) {
            return res.redirect(`${baseURL}/authorize?client_id=${process.env.HACKADAY_ID}&state=<optional>&response_type=code`);
        }
        // got code but no authorization yet
        if ( !req.header('Authorization') ) {
            const authCode = req.query.code;
            const resForToken = await axios.get(`${baseURL}/access_token`, {
                params: {
                    client_id: process.env.HACKADAY_ID,
                    client_secret: process.env.HACKADAY_SECRET,
                    code: authCode,
                    grant_type: 'authorization_code'
                }
            });
            console.log(resForToken);
            if ( resForToken.data["access_token"] ){
                const authToken = resForToken.data.access_token;
                res.setHeader('Authorization', `token ${authToken}`);
                next();
            } else {
                res.status(417).send({error: "Could not get token from API"});
            }
        }
    } catch (e) {
        console.log(chalk.red("Error",e));
        res.status(401).send({error: 'Please authenticate'});
    }
}

module.exports = auth;