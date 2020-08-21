import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DroneEventListener, DroneService } from 'src/app/services/drone/drone.service';
import { DroneEvents } from 'src/app/services/drone/protocol/events.component';

// // Get the canvas element from the DOM
// const canvas = document.querySelector('#scene');
// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;
// // Store the 2D context
// const ctx = canvas.getContext('2d');

// if (window.devicePixelRatio > 1) {
//   canvas.width = canvas.clientWidth * 2;
//   canvas.height = canvas.clientHeight * 2;
//   ctx.scale(2, 2);
// }

/* ====================== */
/* ====== VARIABLES ===== */
/* ====================== */
// let width = 50//canvas.clientWidth; // Width of the canvas
// let height = 50// canvas.clientHeight; // Height of the canvas
// let rotation = 0; // Rotation of the globe
// let dots = []; // Every dots in an array

// /* ====================== */
// /* ====== CONSTANTS ===== */
// /* ====================== */
// /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
// const DOTS_AMOUNT = 100; // Amount of dots on the screen
// const DOT_RADIUS = 0.5; // Radius of the dots
// let GLOBE_RADIUS = width * 0.7; // Radius of the globe
// let GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
// let PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
// let PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
// let FIELD_OF_VIEW = width * 0.8;

const DOTS_AMOUNT = 100; // Amount of dots on the screen
let dots = []; // Every dots in an array
let lines = [];
let averageDot;
let rotation = 0; // Rotation of the globe
let offset = 0

class Line {

  x_a: any
  y_a: any
  z_a: any
  x_aProject: any
  y_aProject: any

  x_b: any
  y_b: any
  z_b: any
  aSizeProjection: any
  x_bProject: any
  y_bProject: any
  bSizeProjection: any
  
  color: string

  PROJECTION_CENTER_X
  PROJECTION_CENTER_Y
  GLOBE_CENTER_Z
  FIELD_OF_VIEW

  constructor(x_a, z_a, y_a, x_b, z_b, y_b, clientWidth, clientHeight, color: string = "black") {
    

    /* ====================== */
    /* ====== VARIABLES ===== */
    /* ====================== */
    let width = clientWidth * 1 // canvas.clientWidth; // Width of the canvas
    let height = clientHeight * 1 //canvas.clientHeight; // Height of the canvas

    /* ====================== */
    /* ====== CONSTANTS ===== */
    /* ====================== */
    /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
    
    let GLOBE_RADIUS = width * 0.35; // Radius of the globe
    // let GLOBE_RADIUS = width; // Radius of the globe
    this.GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
    // this.GLOBE_CENTER_Z = -height / 2; // Z value of the globe center
    this.PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
    this.PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
    // this.FIELD_OF_VIEW = width;
    this.FIELD_OF_VIEW = width * 0.5;


    this.x_a = x_a * GLOBE_RADIUS;
    this.y_a = y_a * GLOBE_RADIUS;
    this.z_a = z_a * GLOBE_RADIUS + this.GLOBE_CENTER_Z;
    
    this.x_b = x_b * GLOBE_RADIUS;
    this.y_b = y_b * GLOBE_RADIUS;
    this.z_b = z_b * GLOBE_RADIUS + this.GLOBE_CENTER_Z;
    

    this.x_aProject = 0;
    this.y_aProject = 0;
    this.aSizeProjection = 0;
    this.x_bProject = 0;
    this.y_bProject = 0;
    this.bSizeProjection = 0;

    this.color = color
  }
  // Do some math to project the 3D position into the 2D canvas
  project(sin, cos) {
    const rotX_a = cos * this.x_a + sin * (this.z_a - this.GLOBE_CENTER_Z);
    const rotZ_a = -sin * this.x_a + cos * (this.z_a - this.GLOBE_CENTER_Z) + this.GLOBE_CENTER_Z;
    this.aSizeProjection = this.FIELD_OF_VIEW / (this.FIELD_OF_VIEW - rotZ_a);
    this.x_aProject = (rotX_a * this.aSizeProjection) + this.PROJECTION_CENTER_X;
    this.y_aProject = (this.y_a * this.aSizeProjection) + this.PROJECTION_CENTER_Y;

    const rotX_b = cos * this.x_b + sin * (this.z_b - this.GLOBE_CENTER_Z);
    const rotZ_b = -sin * this.x_b + cos * (this.z_b - this.GLOBE_CENTER_Z) + this.GLOBE_CENTER_Z;
    this.bSizeProjection = this.FIELD_OF_VIEW / (this.FIELD_OF_VIEW - rotZ_b);
    this.x_bProject = (rotX_b * this.bSizeProjection) + this.PROJECTION_CENTER_X;
    this.y_bProject = (this.y_b * this.bSizeProjection) + this.PROJECTION_CENTER_Y;
  }
  // Draw the dot on the canvas
  draw(ctx, sin, cos) {
    // console.error("Going to color: " + this.color)
    this.project(sin, cos);

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(this.x_aProject, this.y_aProject);
    ctx.lineTo(this.x_bProject, this.y_bProject);
    ctx.strokeStyle = this.color
    ctx.stroke();
  }
}


class Dot {

  x: any
  y: any
  z: any
  xProject: any
  yProject: any
  sizeProjection: any

  color: string

  PROJECTION_CENTER_X
  PROJECTION_CENTER_Y
  GLOBE_CENTER_Z
  FIELD_OF_VIEW

  DOT_RADIUS = 3; // Radius of the dots

  constructor(x, z, y, clientWidth, clientHeight, color: string = "black") {
    

    /* ====================== */
    /* ====== VARIABLES ===== */
    /* ====================== */
    let width = clientWidth * 1 // canvas.clientWidth; // Width of the canvas
    let height = clientHeight * 1 //canvas.clientHeight; // Height of the canvas

    /* ====================== */
    /* ====== CONSTANTS ===== */
    /* ====================== */
    /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
    
    let GLOBE_RADIUS = width * 0.35; // Radius of the globe
    // let GLOBE_RADIUS = width; // Radius of the globe
    this.GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
    // this.GLOBE_CENTER_Z = -height / 2; // Z value of the globe center
    this.PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
    this.PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
    // this.FIELD_OF_VIEW = width;
    this.FIELD_OF_VIEW = width * 0.5;


    this.x = x * GLOBE_RADIUS;
    this.y = y * GLOBE_RADIUS;
    this.z = z * GLOBE_RADIUS + this.GLOBE_CENTER_Z;
    
    this.xProject = 0;
    this.yProject = 0;
    this.sizeProjection = 0;

    this.color = color
  }
  // Do some math to project the 3D position into the 2D canvas
  project(sin, cos) {
    const rotX = cos * this.x + sin * (this.z - this.GLOBE_CENTER_Z);
    const rotZ = -sin * this.x + cos * (this.z - this.GLOBE_CENTER_Z) + this.GLOBE_CENTER_Z;
    this.sizeProjection = this.FIELD_OF_VIEW / (this.FIELD_OF_VIEW - rotZ);
    this.xProject = (rotX * this.sizeProjection) + this.PROJECTION_CENTER_X;
    this.yProject = (this.y * this.sizeProjection) + this.PROJECTION_CENTER_Y;
  }
  // Draw the dot on the canvas
  draw(ctx, sin, cos) {
    // console.error("Going to color: " + this.color)
    this.project(sin, cos);
    // ctx.fillRect(this.xProject - this.DOT_RADIUS, this.yProject - this.DOT_RADIUS, this.DOT_RADIUS * 2 * this.sizeProjection, this.DOT_RADIUS * 2 * this.sizeProjection);
    ctx.beginPath();
    ctx.arc(this.xProject, this.yProject, this.DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
    ctx.strokeStyle = this.color
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
  }
}

let ctx: CanvasRenderingContext2D;


// // Populate the dots array with random dots
// createDots();

// // Render the scene
// window.requestAnimationFrame(render);

@Component({
  selector: 'magnometer',
  templateUrl: './magnometer.html',
  styleUrls: ['./magnometer.css']
})
export class MagnometerView implements OnInit, DroneEventListener {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  static width
  static height
  static factor = 1

  offsetX: number = 0
  offsetY: number = 0
  offsetZ: number = 0

  constructor(public dialogRef: MatDialogRef<MagnometerView>,
    private droneService: DroneService) {
    this.droneService.addEventListener(this);
  }

  ngOnInit(): void {
    ctx = this.canvas.nativeElement.getContext('2d');
    dots.length = 0;
  }

  ngAfterViewInit() {
    // const ctx = canvas.getContext('2d');

    MagnometerView.width = this.canvas.nativeElement.width / MagnometerView.factor
    MagnometerView.height = this.canvas.nativeElement.height / MagnometerView.factor

    // if (window.devicePixelRatio > 1) {
      // MagnometerView.width *= 2
      // MagnometerView.height *= 2
      this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth * 2;
      this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight * 2;
      ctx.scale(2, 2);

      console.warn("device pixel ratio > 1")
    // }
    
    
    // // Populate the dots array with random dots
    // this.createDots();

    // Adding exist
    lines.push(this.createAxis(-1, 0, 0, 1, 0, 0, MagnometerView.width, MagnometerView.height, "blue"))
    lines.push(this.createAxis(0, -1, 0, 0, 1, 0, MagnometerView.width, MagnometerView.height, "blue"))
    lines.push(this.createAxis(0, 0, -1, 0, 0, 1, MagnometerView.width, MagnometerView.height, "blue"))
    
    lines.push(this.createAxis(-1, 0, 0, 0.001, 0, 0, MagnometerView.width, MagnometerView.height, "red"))
    lines.push(this.createAxis(0, -1, 0, 0, 0.001, 0, MagnometerView.width, MagnometerView.height, "red"))
    lines.push(this.createAxis(0, 0, -1, 0, 0, 0.001, MagnometerView.width, MagnometerView.height, "red"))
    
    // Adding average dot
    averageDot = this.createDot(0,0,0,MagnometerView.width, MagnometerView.height, "green")

    // // Render the scene
    window.requestAnimationFrame(MagnometerView.render);

    
  }
  
  animate(): void {}

  createDots() {
    // Empty the array of dots
    dots.length = 0;
    
    // Create a new dot based on the amount needed
    for (let i = 0; i < DOTS_AMOUNT; i++) {
      const theta = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
      const phi = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]
      
      // Calculate the [x, y, z] coordinates of the dot along the globe
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      this.createDot(x, y, z, MagnometerView.width, MagnometerView.height)
      // dots.push(new Dot(x, y, z, MagnometerView.width, MagnometerView.height));
    }
  }

  maxRadius: number = 1;

  createDot(x: number, y: number, z: number, width: number, height: number, color: string = "black") {
    const radius = Math.sqrt(x*x + y*y + z*z);
    if (radius > this.maxRadius)
      this.maxRadius = radius;

    // const phi = Math.atan(y/x)
    const phi = Math.atan2(y, x)
    let theta = radius == 0 ? 0 : Math.acos(-z/radius)

    theta = theta + offset

    console.log("phi:" + phi*57.2957795 + " theta:" + theta*57.2957795 + " radius:" + radius + " color:" + color);

    const r = radius
    // const r = 1
    // Calculate the [x, y, z] coordinates of the dot along the globe
    const x_nrml = r/this.maxRadius * Math.cos(phi) * Math.sin(theta);
    const y_nrml = r/this.maxRadius * Math.sin(phi) * Math.sin(theta);
    const z_nrml = r/this.maxRadius * Math.cos(theta);

    console.log("new coord x:" + x_nrml + " y:" + y_nrml + " z:" + z_nrml);

    return new Dot(x_nrml, y_nrml, z_nrml, width, height, color);
  }

  createAxis(x_a: number, y_a: number, z_a: number, x_b: number, y_b: number, z_b: number, width: number, height: number, color: string = "black") {
    const aDist = Math.sqrt(x_a*x_a + y_a*y_a + z_a*z_a);
    // const phi = Math.atan(y/x)
    const phi_a = Math.atan2(y_a, x_a)
    let theta_a = aDist == 0 ? 0 : Math.acos(-z_a/aDist)

    const bDist = Math.sqrt(x_b*x_b + y_b*y_b + z_b*z_b);
    const phi_b = Math.atan2(y_b, x_b)
    let theta_b = bDist == 0 ? 0 : Math.acos(-z_b/bDist)

    theta_a = theta_a + offset
    theta_b = theta_b + offset
    // console.log("phi:" + phi*57.2957795 + " theta:" + theta*57.2957795 + " radius:" + radius + " color:" + color);

    // Calculate the [x, y, z] coordinates of the dot along the globe
    const x_a_nrml = aDist * Math.cos(phi_a) * Math.sin(theta_a);
    const y_a_nrml = aDist * Math.sin(phi_a) * Math.sin(theta_a);
    const z_a_nrml = aDist * Math.cos(theta_a);

    // Calculate the [x, y, z] coordinates of the dot along the globe
    const x_b_nrml = bDist * Math.cos(phi_b) * Math.sin(theta_b);
    const y_b_nrml = bDist * Math.sin(phi_b) * Math.sin(theta_b);
    const z_b_nrml = bDist * Math.cos(theta_b);

    // console.log("new coord x:" + x_nrml + " y:" + y_nrml + " z:" + z_nrml);

    // lines.push(new Line(x_a_nrml, y_a_nrml, z_a_nrml, x_b_nrml, y_b_nrml, z_b_nrml, width, height, color));
    return new Line(x_a_nrml, y_a_nrml, z_a_nrml, x_b_nrml, y_b_nrml, z_b_nrml, width, height, color)
  }
  
  /* ====================== */
  /* ======== RENDER ====== */
  /* ====================== */
  static render(a) {
    // Clear the scene
    ctx.clearRect(0, 0, MagnometerView.width * MagnometerView.factor, MagnometerView.height * MagnometerView.factor);
    
    
    // Increase the globe rotation
    rotation = a * 0.0004;
    // rotation = a * 0.5
    
    const sineRotation = Math.sin(rotation); // Sine of the rotation
    const cosineRotation = Math.cos(rotation); // Cosine of the rotation
    
    // Loop through the lines array and draw every dot
    for (var i = 0; i < lines.length; i++) {
      lines[i].draw(ctx, sineRotation, cosineRotation);
    }

    // Loop through the dots array and draw every dot
    for (var i = 0; i < dots.length; i++) {
      dots[i].draw(ctx, sineRotation, cosineRotation);
    }

    averageDot.draw(ctx, sineRotation, cosineRotation);
    
    window.requestAnimationFrame(MagnometerView.render);
  }

  onDroneEvent(event: any) {
    if (!Object.values(DroneEvents).includes(event.id)) {
      console.log("Unknown " + event)
      return
    }
    
    switch (event.id) {
      case DroneEvents.MAGNETOMETER:
        console.log(event.data)
        dots.push(this.createDot(event.data.x, event.data.y, event.data.z, MagnometerView.width, MagnometerView.height))
        if (dots.length > DOTS_AMOUNT)
          dots.shift()
        break;
      case DroneEvents.EXT_CALIB_MAGNETOMETER_START:
        console.log("Start compass calibration - " + event.data)
        averageDot = this.createDot(event.data.x, event.data.y, event.data.z, MagnometerView.width, MagnometerView.height, "green")
        this.offsetX = event.data.x
        this.offsetY = event.data.y
        this.offsetZ = event.data.z
        break;
      case DroneEvents.EXT_CALIB_MAGNETOMETER_FINISH:
        console.log("Finish compass calibration - " + event.data)
        averageDot = this.createDot(event.data.x, event.data.y, event.data.z, MagnometerView.width, MagnometerView.height, "green")
        this.offsetX = event.data.x
        this.offsetY = event.data.y
        this.offsetZ = event.data.z
        break;
    }
  }

  add(x: any, y: any, z: any) {
    console.log("x:" + x + " y:" + y + " z:" + z)
    dots.push(this.createDot(x, y, z, MagnometerView.width, MagnometerView.height))
  }

  close() {
    this.droneService.stopMagnometerCalibrate(data => console.log(data))
    this.droneService.removeEventListener(this)
    this.dialogRef.close()
  }

  start() {
    this.droneService.startMagnometerCalibrate(data => console.log(data))
  }

  stop() {
    this.droneService.stopMagnometerCalibrate(data => console.log(data))
  }
  
}
