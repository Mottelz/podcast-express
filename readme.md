# Midterm

## How to Setup the Project
1. Make sure yarn is installed by typing `yarn --version`. If yarn is there, to go step 3. 
2. Install yarn by running `npm i -g yarn`.
3. Get the dependancies running `yarn install`.
4. Run `yarn dev` to start the project.
5. Go to `http://localhost:3000/api/init` in any browser to intialize the database.

## What you need to do
In this midterm you will need to do three things:
1. In the podcast router, create a `/` route that renders the `podcasts.eta`.
2. In the podcast router, create a `/podcast/:id/episodes` route that renders the `episodelist.eta`.
3. Create an error handling function to handle any internal server errors that might occur.

## What the Templates Expect
This is a list of the templates and objects that they need.

| Template Name | Data Needed |
| --- | --- |
| `episodelist` | `{ title: "Title", podcast: podcast, episodes: episodes }` |  
| `podcasts` | `{ title: "Title", podcasts: podcasts }` |  

## What the Database Functions Do
These are all the functions for the database, what they expect and what they return.

**NOTE: You will not need most of these.**

| Function Name | Input | Output | Function |
| --- | --- | --- | --- |
| `initDB()` | N/A | N/A | Create the database and fill it with data. |
| `getAllPodcasts()` | N/A | Array of podcasts. | Get all the podcasts. |
| `getPodcastById(id)` | Podcast ID | The podcast if found, orotherwise `null`. | Get the podcast. |
| `getPodcastByTitle(title)` | Podcast title | The podcast if found, otherwise `null`. | Get first podcast with a matching title. |
| `addPodcast(title, author, summary)` | Podcast title, author, summary | N/A | Adds a podcast. |
| `getEpisodeById(id)` | Episode ID | The episode if found, otherwise `null`. | Get one episode. |
| `getEpisodesByPid(pid)` | Podcast ID | Array of episodes. | Get all episodes for podcast with given id. |
| `addEpisodesToPodcast(pid, episodes)` | Podcast ID, Array of episodes | N/A | Add an array of episodes to the podcast. |
