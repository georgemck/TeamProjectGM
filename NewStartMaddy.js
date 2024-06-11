// Object containing image paths
const imageData = {
    image1: "images/0.png",
    image2: "images/1.png",
    image3: "images/2.png",
    image4: "images/3.png",
    image5: "images/4.png",
    image6: "images/5.png",
    image7: "images/6.png",
    image8: "images/7.png",
    image9: "images/8.png"
};

// Variable to track if we are displaying an image or a color background
let isImage = true;

// Variable to hold the currently displayed image
let currentImage;

// Index to track which image is currently being displayed
let currentImageIndex = 0;

// Array of image URLs from imageData
let imageUrls = Object.values(imageData);

// Arrays to hold clock objects and UI elements
let clocks = [];
let timeSelect;
let colorButton;

// Preload the initial image
function preload() {
    currentImage = loadImage(imageUrls[currentImageIndex]);
}

function setup() {
    let canvas = createCanvas(800, 1200);
    canvas.parent('sketch-container'); // Ensures the canvas is inside the 'sketch-container' div
    textAlign(CENTER, CENTER);
    noSmooth();

    // List of timezone names
    let names = [
        'Los Angeles, USA-PST', //-8
        'Chicago, USA-CST', //-6
        'La Paz, Bolivia-BOT', //-4
        'Nuuk, Greenland-WGT', //-2
        'London, England-GMT', //0
        'Johannesburg, South Africa-SAST', //+2
        'Muscat, Oman-GST', //+4
        'New Delhi, India-IST', //+6
        'Beijing, China-CST' //+8
    ];

    // Corresponding time offsets for the timezones
    let timeOffset = [-8, -6, -4, -2, 0, 2, 4, 6, 8];

    // Create a dropdown for selecting timezones
    timeSelect = createSelect();
    timeSelect.position(300, 750);
    timeSelect.parent('sketch-container');

    // Populate the dropdown with timezone options
    for (let i = 0; i < names.length; i++) {
        let ov = {
            'timeOffset': timeOffset[i],
            'name': names[i],
            'index': i
        }
        timeSelect.option(names[i], JSON.stringify(ov));
    }

    // Add a callback for when the dropdown value changes
    timeSelect.changed(timeSelection);

    // Create an initial clock object
    let x = 400;
    let y = 450;
    clocks.push(new Clock(x, y, names[0], timeOffset[0]));

    // Create a button to change the background image
    colorButton = createButton('Change Background');
    colorButton.position(width / 2 - colorButton.width / 2, 800);
    colorButton.class('color-button');
    colorButton.mousePressed(toggleBackground); // Change to the next image on button press
}

function draw() {
    // If an image is to be displayed
    if (isImage) {+
        background(220); // Light gray background for image display
        image(currentImage, 0, 0, width, height); // Display the current image
    } else {
        background('images/0.png/'); // Background color for clock display
    }

    // Display the title
    noStroke();
    textSize(55);
    fill('white');
    text('World Time Zones', width / 2, 150);

    // Update and display each clock
    for (let clock of clocks) {
        clock.update();
        clock.display();
    }
}

// Function to handle timezone selection change
function timeSelection(select) {

    let nameSelected = JSON.parse(this.selected()).name; // Get selected timezone name
    let offsetSelected = JSON.parse(this.selected()).timeOffset; // Get selected timezone offset
    
    clocks[0].name = nameSelected; // Update the clock name
    clocks[0].timeOffset = int(offsetSelected); // Update the clock time offset
    changeBackgroundImage(JSON.parse(this.selected()).index);
    
}

// Function to change the background image
function changeBackgroundImage(imageUrl) {
    currentImage = loadImage(`images/${imageUrl}.png`); // Load the new image
    isImage = true; // Update state to indicate image background
}

// Function to toggle the background between images
function toggleBackground() {
    if (isImage) {
        // If currently displaying an image, move to the next image in the array
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        changeBackgroundImage(imageUrls[currentImageIndex]);
    } else {
        // If not displaying an image, switch to image display mode
        isImage = true;
        changeBackgroundImage(imageUrls[currentImageIndex]);
    }
}

// Clock class to create and display clock objects
class Clock {
    constructor(x, y, name, timeOffset) {
        this.x = x; // x position of the clock
        this.y = y; // y position of the clock
        this.name = name; // Name of the timezone
        this.timeOffset = timeOffset; // Time offset from UTC
    }

    update() {
        // Update clock logic if needed (currently not used)
    }

    display() {
        // Draw the clock face
        fill(51);
        noStroke();
        ellipse(this.x, this.y, 400, 400);

        // Draw minute ticks
        for (let i = 0; i < 60; i++) {
            let angle = map(i, 0, 60, 0, TWO_PI) - HALF_PI;
            let x1 = this.x + 2 * cos(angle) * 92;
            let y1 = this.y + 2 * sin(angle) * 92;
            let x2 = this.x + 2 * cos(angle) * 99;
            let y2 = this.y + 2 * sin(angle) * 99;
            stroke(255);
            strokeWeight(2);
            line(x1, y1, x2, y2);
        }

        // Display the timezone name
        noStroke();
        fill('white');
        textSize(18);
        text(this.name, this.x, this.y - 100);

        // Get the current time in UTC
        let utc = new Date();
        let s = utc.getUTCSeconds();
        let m = utc.getUTCMinutes();
        let h = utc.getUTCHours() + this.timeOffset;

        // Format the digital clock time
        let formattedTime = nf(h % 24, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
        textSize(24);
        text(formattedTime, this.x, this.y + 120);

        // Calculate angles for the clock hands
        let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
        let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
        let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;

        // Draw the second hand
        stroke('red');
        strokeWeight(2);
        line(this.x, this.y, this.x + cos(secondAngle) * 120, this.y + sin(secondAngle) * 120);

        // Draw the minute hand
        stroke(255);
        strokeWeight(3.75);
        line(this.x, this.y, this.x + cos(minuteAngle) * 140, this.y + sin(minuteAngle) * 140);

        // Draw the hour hand
        stroke(255);
        strokeWeight(6.5);
        line(this.x, this.y, this.x + cos(hourAngle) * 105, this.y + sin(hourAngle) * 100);
    }
}
