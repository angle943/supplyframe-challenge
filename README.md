How to get started:

cd into root
mkdir config
cd config
touch dev.env

Inside dev.env, put in the following lines with your api keys from dev.hackaday.io (Dont Put in the curly braces)

PORT=3000
HACKADAY_ID={{optional}}
HACKADAY_API_KEY={{required}}
HACKADAY_SECRET={{optional}

then cd back into root, then type "npm start"