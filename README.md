# Project-3- Unidenified Falling Objects 

## Welcome to Unidentified Falling Objects, a website dedicated to documenting strange objects that fall from the sky. We are a community of skywatchers, scientists, UFO believers and enthusiasts who are passionate about exploring this phenomenon.

![nasa-meteor_wide-26b748f4b6c8eefb961167c0f8e4c715fcf9dbd9](https://user-images.githubusercontent.com/120348065/233500067-8439f6a3-d5a7-46ec-a524-404e4b06269e.jpg)


# Are we alone in the universe? 
## Our desire to answer this question stems from the frequency and consistency of UFO sightings around the world which suggest otherwise. Could the surge in recent UFO sightings be attributed to advanced military technology or alien spacecraft? The lines between science fiction and reality continue to blur as more evidence emerges. In our website, we explore sightings of all comestic phenomenon from the sky. 

## Project Ideation
- Upon initial creation of the project, we were curious to see if there datasets available out there involving UFO sightings and meteorite data. We were interested in creating a heat map as well as graphs that showed the frequency of reports as well as how far the reports were from military bases. 

## Data Fetching and Clean Up
- To answer these questions, we sought out datasets that include information regarding UFO sightings, meteorite and fireball/bolide reports, as well as well as military base data. Data sets were cleaned up utilizing Jupyter notebook and converted from CSV file to GeoJSON, to be used later on the website.
- Data was pulled from the websites under our 'References' section. 
- For the Fireball Data in specific, latitude and longitude was set to geodetic degress and had to be converted before being narrowed to reports within the US only. The following [website](https://lweb.cfa.harvard.edu/space_geodesy/ATLAS/cme_convert.html) was utilized as a resource for calculations from geodetic degrees of latitude and longitude to map coordinates.

## Data Analysis


<img width="759" alt="Screen Shot 2023-04-24 at 7 52 49 PM" src="https://user-images.githubusercontent.com/120348065/234139729-7bd40d30-ae58-423e-9cab-a7ed2854cf3d.png">

- The graph above shows that there are significantly more UFO sightings than meteorite sightings. It increases significantly from the 1960's to the 2000's. We suspected the reason behind the increase of the sightings was because of development of technology, cameras are more advanced as time passes. 

![screenshot_2023-04-20_at_6 48 34_pm](https://user-images.githubusercontent.com/120348065/234139232-83db95b2-b82d-4967-bc2c-b2b4aac6a3cc.png)

-

## Bases and Sightings Map
 - Using D3.json each dataset was read in and all points were mapped according to their coordinates.
 - Each point is made to be able to be clicked upon to get information of the name of the military base or name of the sighting
 - Each group (bases, UFO sightings, and meteor sightings) has an option to toggle on or off, depending on which layers the user wants to be displayed

## Documentation


# References:

- [UFO Sightings Dataset](https://www.kaggle.com/datasets/NUFORC/ufo-sightings)  
- [Meteorite Landings Dataset](https://catalog.data.gov/dataset/meteorite-landings) 
- [Military Bases Dataset](https://public.opendatasoft.com/explore/dataset/military-bases/table/) 
- [Fireball & Bolid Dataset](https://cneos.jpl.nasa.gov/fireballs/) 
- [Calculation of Map Coordinates for Fireball Data](https://lweb.cfa.harvard.edu/space_geodesy/ATLAS/cme_convert.html) 
- [Javascript Library](https://codepen.io/chrisgannon/pen/oqrKNE)  
