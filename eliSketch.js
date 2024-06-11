let clocks = [];
let cosOffset = 0;
let sinOffset = 0;
let images = []; // Array to store images

function preload() {
    // Load images from the 'images' folder
    for (let i = 0; i < 9; i++) {
        let imgPath = `images/image${i}.png`;
        console.log(`Loading image: ${imgPath}`);
        images[i] = loadImage(imgPath,
            () => console.log(`Image loaded: ${imgPath}`),
            () => console.log(`Failed to load image: ${imgPath}`)
        );
    }
}

function setup() {
    createCanvas(800, 1200);
    textAlign(CENTER, CENTER);
    noSmooth();

    let names = [
        'Johannesburg, South Africa-SAST',
        'Muscat, Oman-GST',
        'New Delhi, India-IST',
        'Beijing, China-CST',
        'Los Angeles, USA-PST',
        'Chicago, USA-CST',
        'La Paz, Bolivia-BOT',
        'Nuuk, Greenland-WGT',
        'London, England-GMT'
    ];

    let offsets = [9, 11, 12, 15, 0, 2, 3, 6, 8];

    let additionalTexts = [
        'The largest city in South Africa.',
        'The capital of Oman.',
        'The capital of India.',
        'The capital of China.',
        'Known for its film industry.',
        'Famous for its architecture.',
        'The highest capital city in the world.',
        'The capital of Greenland.',
        'The capital of the United Kingdom.'
    ];

    for (let i = 0; i < 9; i++) {
        let x = 150 + (i % 3) * 250;
        let y = 350 + Math.floor(i / 3) * 300;
        cosOffset = i + 20 / (i + 1);
        sinOffset = i + 20 / (i + 1);
        clocks.push(new Clock(x, y, names[i], offsets[i], cosOffset, sinOffset, images[i], additionalTexts[i]));
    }
}

function draw() {
    textSize(60);
    background('#E24672');

    noStroke();
    fill('white');
    text('World Time Zones', width / 2, 170);

    for (let clock of clocks) {
        clock.update();
        clock.display();
        if (clock.isMouseOver()) {
            clock.displayImageAndText();
        }
    }
}

class Clock {
    constructor(x, y, name, offset, cosOffset, sinOffset, img, additionalText) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.offset = offset;
        this.cosOffset = cosOffset;
        this.sinOffset = sinOffset;
        this.img = img; // Store the image
        this.additionalText = additionalText; // Store the additional text
    }

    update() {
        // Update clock logic if needed
    }

    display() {
        fill(51);
        noStroke();
        ellipse(this.x, this.y, 200, 200);

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

        noStroke();
        fill('white');
        textSize(18);
        text(this.name, this.x, this.y - -150);

        let s = second();
        let m = minute();
        let h = hour();

        h = (h + this.offset + 24) % 24;

        let formattedTime = nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
        textSize(24);
        text(formattedTime, this.x, this.y + 120);

        let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
        let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
        let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;

        stroke('red');
        strokeWeight(2);
        line(this.x, this.y, this.x + cos(secondAngle) * 75, this.y + sin(secondAngle) * 75);

        stroke(255);
        strokeWeight(4.5);
        line(this.x, this.y, this.x + cos(minuteAngle) * 60, this.y + sin(minuteAngle) * 60);

        stroke(255);
        strokeWeight(6.5);
        line(this.x, this.y, this.x + cos(hourAngle) * 50 - this.cosOffset, this.y + sin(hourAngle) * 50 - this.sinOffset);
    }

    isMouseOver() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < 100; // Check if the mouse is within the ellipse
    }

    displayImageAndText() {
        // Display the image with rounded corners and a subtle shadow
        noFill();
        stroke(255);
        strokeWeight(4);

        image(this.img, this.x - 100, this.y - 300, 200, 200); // Adjust position and size as needed

        // Draw the white background box with rounded corners and a subtle shadow
        fill('white');
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y - 370, 320, 40, 20);

        // Display the additional text in black
        fill('black');
        textSize(20);
        text(this.additionalText, this.x, this.y - 370);
    }
}
