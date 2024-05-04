const { serve } = require('@hono/node-server');
const { Hono } = require('hono');
const { cors } = require('hono/core');
const movier = require('movier');

const app = new Hono();

app.use("*",core());


app.get('/title/:id', async (c) => {
    const id = c.req.param("id")
    try {

        const response = await movier.getTitleDetailsByUrl(`https://www.imdb.com/title/${id}`);
        
        return c.json(response);
    } catch (error) {
        console.error(error);
        return c.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/person/:id',async (c) =>{
        const person_id = c.req.param("id");
        try{
        const response = await movier.getPersonDetailsByUrl(`https://www.imdb.com/name/nm${person_id}/`);
        return c.json(response);

        } catch(e){
           console.log(e);
           return c.status(500).json({ error : 'internal server Error'})
        }

});

app.fire();
