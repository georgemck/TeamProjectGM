let clocks = [];
let cosOffset = 0;
let sinOffset = 0;

function setup() {
    createCanvas(800, 1200);
    textAlign(CENTER, CENTER);
    textSize(60);
    noSmooth();
   
    let names = [
        'Los Angeles, USA-PST', // -8
        'Chicago, USA-CST',     // -6
        'La Paz, Bolivia-BOT',  // -4
        'Nuuk, Greenland-WGT',  // -2
        'London, England-GMT',  // 0
        'Johannesburg, South Africa-SAST', // +2
        'Muscat, Oman-GST',     // +4
        'New Delhi, India-IST', // +6
        'Beijing, China-CST'    // +8
    ];

    let offsets = [-8, -6, -4, -2, 0, 2, 4, 6, 8]; // Time zone offsets

    for (let i = 0; i < 9; i++) { // The code will be executed 9 times, each one for each ellipse 
        
        // Adjust the positions for your specific layout
        let x = 150 + (i % 3) * 250; // Horizontal offset for each column
        let y = 350 + Math.floor(i / 3) * 300; // Vertical offset for each row
        cosOffset = i + 20 / (i + 1);
        sinOffset = i + 20 / (i + 1);
        clocks.push(new Clock(x, y, names[i], offsets[i], cosOffset, sinOffset)); 
    }
}

function draw() {
    background('#E24672');
    
    // Text 
    noStroke();
    fill('white');
    text('World Time Zones', width / 2, 150);

    for (let clock of clocks) {  // To update and display clocks 
        clock.update();
        clock.display();
    }

    // Group Project - Eli Fenix, Maddy Leyva, Erin Lee.
}

class Clock {
    constructor(x, y, name, offset, cosOffset, sinOffset) {
        this.x = x; // x position of the clock
        this.y = y; // y position of the clock
        this.name = name; // Name of each clock
        this.offset = offset; // Time zone offset
        this.cosOffset = cosOffset;
        this.sinOffset = sinOffset;
    }
  
    update() {
        // Update clock logic if needed
    }
  
    display() {
        // The ellipses
        fill(51);
        noStroke();
        ellipse(this.x, this.y, 200, 200); 

        // Code for the minute ticks 
        for (let i = 0; i < 60; i++) {
            let angle = map(i, 0, 60, 0, TWO_PI) - HALF_PI;
            let x1 = this.x + cos(angle) * 92;
            let y1 = this.y + sin(angle) * 92;
            let x2 = this.x + cos(angle) * 99;
            let y2 = this.y + sin(angle) * 99;
            stroke(255);
            strokeWeight(2);
            line(x1, y1, x2, y2);
        }

        // Names of each time zone 
        noStroke();
        fill('white');
        textSize(18);
        text(this.name, this.x, this.y - 120);

        // Get the current time
        let s = second();
        let m = minute();
        let h = hour();

        // Adjust hours based on time zone offsets
        h = (h + this.offset + 24) % 24;

        // Formatted digital clock
        let formattedTime = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
        textSize(24);
        text(formattedTime, this.x, this.y + 120);

        // The calculated angles for the clock hands 
        let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI; 
        let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
        let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;

        // The second hand 
        stroke('red'); // color of the pointer
        strokeWeight(2);
        line(this.x, this.y, this.x + cos(secondAngle) * 75, this.y + sin(secondAngle) * 75);
   
        // The minute hand 
        stroke(255); // color of the pointer
        strokeWeight(4.5);
        line(this.x, this.y, this.x + cos(minuteAngle) * 60, this.y + sin(minuteAngle) * 60);
        
        // The hour hand 
        stroke(255); // color of the pointer
        strokeWeight(6.5);
        line(this.x, this.y, this.x + cos(hourAngle) * 50 - this.cosOffset, this.y + sin(hourAngle) * 50 - this.sinOffset);
    }
}
