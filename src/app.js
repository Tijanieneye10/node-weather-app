// to channel to public folder we need path function
const path = require('path')
const express = require('express')

// To use Partial so we include some pages like HEADER, FOOTER IN ANOTHER PAGE THERE IS TO REQUIRE
//HSB
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// To enable us get the file directory we can use either __dirname or __filename

const publicDirPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

// To make use of the express in rendering view
const app = express()

// for heroku to understand our port
const port = process.env.PORT || 3000

// to change from default handlebars view to another folder
const viewPath = path.join(__dirname, '../templates/views')

//  To use the hbs (Handlebars in rendering a dynamic view) 
/*
To use the handlebars we create a views folder in our directory 
where we save file in .hbs extension by using the below function
app.set('view engine', 'hbs')

but if we want to set our folder in taking the file the function below is used
app.set('views', viewPath)


*/
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicDirPath))


// * the hbs file cant be access so we need to set a route
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Usman Tijani'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        desc: 'We are known for quality',
        title: 'About Page'
    })
})

app.get('/help', (req, res)=>{
    res.send({
        name: 'Tijani Usman',
        age: 25
    })
})



app.get('/weather', (req, res)=>{
    
    if(!req.query.address)
    {
        return res.send({
            error:'Address must be provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, place_name} = {})=>{

        if(error)
        {
          return res.send({error})
        }

    forecast(latitude,longitude, (error, forecastData)=>{

        if(error){
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            address: req.query.address,
            place_name
           
        })

    })

    })
})



// For the particular page error
app.get('/about/*', (req, res)=>{
    res.render('error',{
        error: 'The about articles cant be found'
    })
})


// to redirect to error_404 when page not exists (Generic)
app.get('*', (req, res)=>{
    res.render('error', {
        error: 'This page is not found'
    })
})



app.listen(port, () =>{
    console.log('Server is on on port 3000')
})