let clocks = [];
let timeSelect;
let colorButton;
let isYellow = true; // State variable to track the current background color

function setup() {
    let canvas = createCanvas(800, 1200);
    canvas.parent('sketch-container'); // Ensures the canvas is inside the 'sketch-container' div
    textAlign(CENTER, CENTER);
    noSmooth();

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

    let timeOffset = [0, 2, 4, 6, 8, 10, 12, 14, 16];

    // Creating the select dropdown for timezones
    timeSelect = createSelect();
    timeSelect.position(300, 750);
    timeSelect.parent('sketch-container');

    for (let i = 0; i < names.length; i++) {
        timeSelect.option(names[i]);
    }

    // Add a callback for when the dropdown value changes
    timeSelect.changed(timeSelection);

    let x = 400;
    let y = 450;
    clocks.push(new Clock(x, y, names[0], timeOffset[0]));

    // Set initial background color
    changeBackGroundColor('#f5f542'); // yellow

    // Create a button to change the background color
    colorButton = createButton('Change Color');
    colorButton.position(width/2, 800);
    colorButton.class('color-button');
    colorButton.mousePressed(toggleBackgroundColor); // Change to turquoise on button press
}

function draw() {
    background('#E24672');
    noStroke();
    textSize(55);
    fill('white');
    text('World Time Zones', width / 2, 150);

    for (let clock of clocks) {  // To update and display clocks 
        clock.update();
        clock.display();
    }
}

function timeSelection() {
    let nameSelected = timeSelect.selected();
    clocks[0].name = nameSelected;

    // Change background color when timezone is selected
    changeBackGroundColor('#5ae8e6'); // turquoise
}

//parameter.... this took so long and im still not happy with it -maddy
function changeBackGroundColor(hexColor) {
    document.body.style.backgroundColor = hexColor;
}

function toggleBackgroundColor() {
    if (isYellow) {
        changeBackGroundColor('#5ae8e6'); // Change to turquoise
    } else {
        changeBackGroundColor('#f5f542'); // Change to yellow
    }
    isYellow = !isYellow; // Toggle the state
}

class Clock {
    constructor(x, y, name) {
        this.x = x; // x position of the clock
        this.y = y; // Y position of the clock
        this.name = name; // Name of each clock
    }

    update() {
        // Update clock logic if needed
    }

    display() {
        fill(51);
        noStroke();
        ellipse(this.x, this.y, 400, 400);

        // Code for the minute ticks 
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

        //Name coordinates and font sizes
        noStroke();
        fill('white');
        textSize(18);
        text(this.name, this.x, this.y - 100);

        //To get the current time
        let s = second();
        let m = minute();
        let h = hour();

        //Formatted digital clock
        let formattedTime = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
        textSize(24);
        text(formattedTime, this.x, this.y + 120);

        //Calculated angles for the clock hands 
        let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
        let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
        let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;

        // The second hand 
        stroke('red');
        strokeWeight(2);
        line(this.x, this.y, this.x + cos(secondAngle) * 120, this.y + sin(secondAngle) * 120);

        // The minute hand 
        stroke(255);
        strokeWeight(3.75);
        line(this.x, this.y, this.x + cos(minuteAngle) * 140, this.y + sin(minuteAngle) * 140);

        // The hour hand 
        stroke(255);
        strokeWeight(6.5);
        line(this.x, this.y, this.x + cos(hourAngle) * 105, this.y + sin(hourAngle) * 100);
    }
}
// Eli Fenix, Maddy Leyva, Erin Lee
