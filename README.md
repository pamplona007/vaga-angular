# VagaAngular

This project was made for a job interview. It is a series of simple tests to evaluate the candidate's knowledge of Angular.

## Tests specifications

### Test 1 - Table

The first test consisted of creating a table based on a csv file for products. The table should have the following features:

- Pagination
- Search
- Sort
- Column reordering
- Column hiding/showing
- Export to Excel

I've decided to use `@angular/material` for the table, since it is a very powerful tool and it is very easy to use. To make the columns reorderable, I _could_ have used the `cdkDrag` directive, but I decided to use the browser drag and drop api. The directive would've applied it's styles to the columns, which would not have the effect I wanted. Using the browser api, I could apply the styles I wanted to the columns while they're being dragged and the complexity of the code has not increased much, while reducing bundle size.

To import the table, I made a simple request to the static file and made a `csvToJs` function to transform the csv into a json object. Since the file had not headers, I've made a mapping of the columns to be used when hydrating the file.

For the export to excel, I've used `xlsx` to create the file and download it. It has helper fuctions to transform a json object into a worksheet, and made it much easier to create the file. Yet it has added a lot of bundle size, so in a next iteration I would like to try using a different library.


### Test 2 - Images

The second tests consisted of two groups of images, images can be added by clicking on the buttons at the bottom of each group. Other tasks were:

- Drag and drop images between groups
- Drag and drop images to reorder them
- Delete images
- Each group should have a maximum of 5 images
- The groups border and background colors can be changed
- All the data (colors and images) must be stored on local storage and retrieved when the page is reloaded

I decided to use `cdkDrag`, on this instance, the style added by the directive is a nice touch. I also decided to not use anything from `@angular/material` and instead style everything from scratch. Because of this, the images have a nice polaroid look with a random rotation when they're first loaded onto a group.

In this task, I ran into a technical problem with the drag and drop directive. I wanted the images to have a nice flex layout, where the images would occupy columns and wrap into rows as needed. The directive only provided me with two orientations, either horizontal or vertical. I've found another library that had the ability of multiple orientiations, yet it is quite a new library and isn't maitained often. I've decided to keep using `cdk` and leave the images on a single column.


### Test 3 - Panel

This task was to display a highlighted number that would increase every second. The rules were:

- The initial number must be a random number above one million
- Each second the number must be increased by a random number between 999,99 and 9999,99
- The last ten numbers must be displayed below the highlighted number
- An effect must be applied when the number changes
- After each 50 thousand, the number must be highlighted in a different style
- Also, the date and time from Brasilia must be displayed

For this task, I've decided to make everything the task asked for and something more. The effect when the number changes is the difference added to the number. It is displayed beside the highlighted number in green when the change is positive and in red when it is negative. To make the difference be negative, the user can change an offset value on an input beside the highlighted number. The offset value is added to the number every second. The offset value can be positive or negative. Also, besides the last numbers, the differences are also displayed below the highlighted number. Other than that, the task was pretty straight forward.


## Installation

Run `yarn` to install all dependencies.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

