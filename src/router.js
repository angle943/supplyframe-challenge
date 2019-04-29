const express = require('express');
const axios = require('axios');
// const auth = require('./middleware/auth.js');
const router = new express.Router();

const baseURL = `https://api.hackaday.io`;

router.get('/', (req,res) => {
    res.redirect('/projects');
});

router.get('/projects', async (req,res) => {
    try {
        const apiResponse = await axios.get(`${baseURL}/v1/projects`, {
            params: {
                api_key: process.env.HACKADAY_API_KEY
            }
        });

        let projects = apiResponse.data.projects;
        for ( let i=0; i<projects.length; i++) {
            const userResponse = await axios.get(`${baseURL}/v1/users/${projects[i].owner_id}`, {
                params: {
                    api_key: process.env.HACKADAY_API_KEY
                }
            });
            projects[i]["screen_name"] = userResponse.data.screen_name;
            projects[i]["avatar"] = userResponse.data.image_url;
        }
        return res.render('index', {projects} );
    } catch (e) {
        res.status(500).send({error: e.message});
    }
});

router.get('/projects/:id', async (req,res) => {
    try {
        const projectId = req.params.id;
        const apiResponse = await axios.get(`${baseURL}/v1/projects/${projectId}`, {
            params: {
                api_key: process.env.HACKADAY_API_KEY
            }
        });

        let project = apiResponse.data;

        const user = await axios.get(`${baseURL}/v1/users/${project.owner_id}`, {
            params: {
                api_key: process.env.HACKADAY_API_KEY
            }
        });

        const tag = project.tags[0];
        let relatedProjects = await axios.get(`${baseURL}/v1/search/projects`, {
            params: {
                api_key: process.env.HACKADAY_API_KEY,
                search_term:tag
            }
        });
        relatedProjects = relatedProjects.data.projects.slice(0,9);
        return res.render('detail', {project, user: user.data, relatedProjects})

    } catch (e) {
        res.status(500).send({error: e.message});
    }
});


module.exports = router;