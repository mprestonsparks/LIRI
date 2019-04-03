# [LIRI]
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)



&nbsp; **Purpose** </br>
&nbsp; A simple Node.js application which makes requests to various APIs using the command line interface   </br></br>

&nbsp; **What it does** </br>
&nbsp; From the command line, begin by entering "node liri.js" followed by one of four commands </br>
&nbsp; "concert-this" followed by a musician's name returns info on their next concert  </br>
&nbsp; "spotify-this-song" followed by a song name returns info on that song, including a link to play to song  </br>
&nbsp; "movie-this" followed by a movie name returns info about that movie  </br>
&nbsp; "do-what-it-says" by itself, which executes the command and query found in random.txt  </br></br>

&nbsp; **Challenges**
</br>&nbsp; `` Issue: Access data on the Spotify, Bands in Town, and OMDB APIs ``
</br>&nbsp; `` Solution: Used Axios to pass requests and receive response data ``
</br>
</br>&nbsp; `` Issue: Determine which API to use based on the command entered  ``
</br>&nbsp; `` Solution: Used a switch statement to run API-specfic function based on the command entered  ``
</br>
</br>&nbsp; `` Issue: Read the data in random.txt and execute the command and query it contains ``
</br>&nbsp; `` Solution: Use the "File System" node API to access the content and pass it into the main function "userRequest(command,userQuery)" as parameters   ``
</br>

**Technology Used** </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node.js, Axios (Node API), FS (Node API), </br>


[LIRI]: <https://mprestonsparks.github.io/LIRI/>

