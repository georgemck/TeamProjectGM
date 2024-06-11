let clocks = [];




function setup() {
    createCanvas(800, 1200);
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


    let offsets = [-8, -6, -4, -2, 0, 2, 4, 6, 8];


    // Adjust the positions for your specific layout
    timezoneSelect = createSelect();
    timezoneSelect.position(CENTER, 750);


    for (let i = 0; i < names.length; i++) {
        timezoneSelect.option(names[i], offsets[i]);
    }
    timezoneSelect.changed(function () {
        updateClock(timezoneSelect.value(), timezoneSelect.selected());
    })



    let x = 400
    let y = 450
    clocks.push(new Clock(x, y, names[0], offsets[0]));


    // drop down menu


}


function draw() {
    background('#E24672');
    //Text
    noStroke();
    textSize(55);


    fill('white');
    text('World Time Zones', width / 2, 150);


    for (let clock of clocks) {  // To update and display clocks
        clock.update();
        clock.display();
    }


    // Group Project - Eli Fenix, Maddy Leyva, Erin Lee.
}


function updateClock(selectedName, selectedOffset) {
    clocks[0].name = selectedName;
    clocks[0].offset = parseInt(selectedOffset);
}


class Clock {
    constructor(x, y, name, offset) {
        this.x = x; // x position of the clock
        this.y = y; // Y position of the clock
        this.name = name; // Name of each clock
        this.offset = offset; // offset of each clock
    }


    update() {
        // Update clock logic if needed
    }


    display() {
        // The ellipses
        fill(51);
        noStroke();
        ellipse(this.x, this.y, 400, 400);




        //Code for the minute ticks
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




        //names of each time zone
        noStroke();
        fill('white');
        textSize(18);
        text(this.name, this.x, this.y - 100);


        //To get the current time, Have to Update for clocks
        //    let timeSet = hour() - (new Date().getTimezoneOffset() / 60);
        //    let h = (timeSet + this.offset + 24) % 24;

        // let currentTime = new Date().getTime() + (this.offset * 60 * 60 * 1000);
        // let timeZoneDate = new Date(currentTime);
        // let h = timeZoneDate.getHours();
        // let s = second();
        // let m = minute();
        let utc = new Date();
        let s = utc.getUTCSeconds();
        let m = utc.getUTCMinutes();
        let h = utc.getUTCHours() + this.offset;


        // let s = second();
        // let m = minute();

        
        //Adjust hours based on time zone offsets
        /*if(this.name === 'Los Angeles, USA-PST') h = (h - 8+24)%24;*/


        //I commented out the code above so it will be the current time on the computer, you can use it if you want or delete it when you code the correct times :0








        //Formatted digital clock
        let formattedTime = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
        textSize(24);
        text(formattedTime, this.x, this.y + 120);




        //The calculated angles for the clock hands
        //The HALF_PI is creating lines that are angled
        //The TWO_PI is creating a single line that is in the center
        let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
        let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
        let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;




        //The second hand
        stroke('red'); //color of the pointer
        strokeWeight(2);
        line(this.x, this.y, this.x + cos(secondAngle) * 120, this.y + sin(secondAngle) * 120);


        //The minute hand
        stroke(255); //color of the pointer
        strokeWeight(3.75);
        line(this.x, this.y, this.x + cos(minuteAngle) * 140, this.y + sin(minuteAngle) * 140);


        //The hour hand
        stroke(255); //the color of the pointer
        strokeWeight(6.5);
        line(this.x, this.y, this.x + cos(hourAngle) * 105, this.y + sin(hourAngle) * 100);


    }
}



