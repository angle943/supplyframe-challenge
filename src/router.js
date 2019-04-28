const express = require('express');
const axios = require('axios');
const faker = require('faker');
const auth = require('./middleware/auth.js');
const router = new express.Router();

const baseURL = `https://api.hackaday.io`;
// router.get('/', auth, async (req,res) => {
//     try{
//         const apiResponse = await axios.get(`${baseURL}/v1/projects`, {
//             params: {
//                 api_key: process.env.HACKADAY_API_KEY
//             }
//         });
//         const projects = apiResponse.data.projects;
//         const firstProject = projects[0];
//         console.log(JSON.stringify(firstProject));
//         return res.render('index', {projects} );
//     } catch (e) {
//         res.status(500).send({error: e.message })
//     }
    
// });

router.get('/', (req,res) => {
    res.redirect('/projects');
});

router.get('/projects', async (req,res) => {
    try {
        // const apiResponse = await axios.get(`${baseURL}/v1/projects`, {
        //     params: {
        //         api_key: process.env.HACKADAY_API_KEY
        //     }
        // });

        // implementing faker
        let apiResponse = { data: { projects: [] } };
        for ( let i=0; i<50; i++) {
            const newData = {
                name: faker.name.title(),
                image_url: faker.image.image(),
                screen_name: faker.name.firstName(),
                avatar: faker.image.avatar(),
                summary: faker.lorem.sentence()
            }
            apiResponse.data.projects.push(newData);
        }

        let projects = apiResponse.data.projects;
        // for ( let i=0; i<projects.length; i++) {
        //     const userResponse = await axios.get(`${baseURL}/v1/users/${projects[i].owner_id}`, {
        //         params: {
        //             api_key: process.env.HACKADAY_API_KEY
        //         }
        //     });
        //     projects[i]["screen_name"] = userResponse.data.screen_name;
        //     projects[i]["avatar"] = userResponse.data.image_url;
        // }
        return res.render('index', {projects} );
    } catch (e) {
        res.status(500).send({error: e.message});
    }
});


module.exports = router;