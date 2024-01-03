const express = require("express")
const app = express();
app.use(express.json())
const moviesJSON = require('./movies.json' )
const crypto = require("node:crypto") // to generate ids
const z = require("zod") // to validate data types

app.get("/", (req,res)=>{
    res.json( {message: "hola mundo"} )
})

// All the movies resources are identified with /movies
app.get("/movies", (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    const {genre} = req.query // We get the genre from the query
    if(genre){
        const filteredMovies = moviesJSON.filter(movie => movie.genre.includes(genre))
        return res.json(filteredMovies)
    }
    res.json(moviesJSON)
})

app.get("/movies/:id", (req,res)=>{ // ID is a dynamic segment (parameter)
    const {id} = req.params
    const movie = moviesJSON.find(movie => movie.id == id)
    if (movie) return res.json(movie)

    res.status(404).json({message: "movie not found"})
})
 
app.post("/movies", (req,res)=>{
    
/*   const movieSchema = z.object({
        title: z.string(),
        duration: z.number(),
        year: z.number().int().positive().min(1900).max(2024),
        director: z.string(),
        rate: z.number().min(0).max(10),
        poster: z.string(),

    })
        function validateMovie(object){
            return movieSchema.safeParse(Oobject)
        }
 */ 

    const { title, genre, year, director, duration, rate, poster } = req.body

    const newMovie = {
        id: crypto.randomUUID(),  // generates random id
        title,
        genre,
        year,
        director,
        duration,
        rate,
        poster
    }

    moviesJSON.push(newMovie)
    res.status(201).json(newMovie)
})


app.patch("/movies/:id", (req, res)=>{
    const {id} = req.params
    const movieIndex = moviesJSON.findIndex(movie=> movie.id == id) 

    if(movieIndex < 0) return res.status(404).json({message: "not found"})

    const movie = moviesJSON[movieIndex]
    const { title, genre, year, director, duration, rate } = req.body
    if (title) movie.title = title
    if (genre) movie.genre = genre
    if (year) movie.year = year
    if (director) movie.director = director
    if (duration) movie.duration = duration
    if (rate) movie.rate = rate

    res.json(moviesJSON[movieIndex])

    })








const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log("server listening on port 1234")
})

