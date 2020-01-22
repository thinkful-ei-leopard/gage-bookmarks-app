# OVERVIEW
Bookmark Organizer is a tool for storing and sorting personal bookmarks.

# USER STORIES
-Users can add bookmarks to the list. Bookmarks must contain:
title,
url,
description,
rating.

-Currently stored bookmarks populate when the page is opened. Filtered in descending order. 
    In all screens under 400px, descriptions and editing buttons are condensed showing only title and rating. This can be toggled by clicking on the title bar. 
    
    All screens above 400px have a max height for the description but can be expanded to show all remaining text.

-Bookmarks can be edited, removed, or visited by clicking the corresponding icon underneath the description.
    In screens under 400px, this can be accessed after expanding the description by clicking the title bar.

-When the edit button is pressed, the edit bookmark page shows and automatically populates with the current values of those properties.

-Users can filter bookmarks by star ratings. If they select a filter that returns no results but the store is not empty, it will prompt the user to select a different filter.

-Empty lists are alerted by a prompt indicating that no bookmarks have been found, and to add one using the respective button.

