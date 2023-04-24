# Project-3- Unidenified Falling Objects 

## Welcome to Unidentified Falling Objects, a website dedicated to documenting strange objects that fall from the sky. We are a community of skywatchers, scientists, UFO believers and enthusiasts who are passionate about exploring this phenomenon.

![nasa-meteor_wide-26b748f4b6c8eefb961167c0f8e4c715fcf9dbd9](https://user-images.githubusercontent.com/120348065/233500067-8439f6a3-d5a7-46ec-a524-404e4b06269e.jpg)


## Are we alone in the universe? 
### Our desire to answer this question stems from the frequency and consistency of UFO sightings around the world which suggest otherwise. Could the surge in recent UFO sightings be attributed to advanced military technology or alien spacecraft? The lines between science fiction and reality continue to blur as more evidence emerges. In our website, we explore sightings of all comestic phenomenon from the sky. 

## Project Ideation
- Upon initial creation of the project, we were curious to see if there datasets available out there involving UFO sightings and meteorite data. We were interested in creating a heat map as well as graphs that showed the frequency of reports as well as how far the reports were from military bases. 

## Data Fetching and Clean Up
- To answer these questions, we sought out datasets that include information regarding UFO sightings, meteorite and fireball/bolide reports, as well as well as military base data. Data sets were cleaned up utilizing Jupyter notebook and converted from CSV file to GeoJSON, to be used later on the website.
- Data was pulled from the websites under our 'References' section. 
- For the Fireball Data in specific, latitude and longitude was set to geodetic degress and had to be converted before being narrowed to reports within the US only. The following website was utilized as a resource for calculations from geodetic degrees of latitude and longitude to map coordinates: https://lweb.cfa.harvard.edu/space_geodesy/ATLAS/cme_convert.html


![screenshot_2023-04-20_at_6 48 41_pm_720](https://user-images.githubusercontent.com/120348065/233878374-545372b3-0595-495a-a560-13edf250d086.png)

### The graph above shows that there are significantly more UFO sightings than meteorite sightings. Especially

# References:

https://www.kaggle.com/datasets/NUFORC/ufo-sightings
https://cneos.jpl.nasa.gov/fireballs/
