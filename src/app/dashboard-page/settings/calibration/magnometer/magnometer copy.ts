import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

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
let rotation = 0; // Rotation of the globe



class Dot {

  x: any
  y: any
  z: any
  xProject: any
  yProject: any
  sizeProjection: any

  PROJECTION_CENTER_X
  PROJECTION_CENTER_Y
  GLOBE_CENTER_Z
  FIELD_OF_VIEW

  DOT_RADIUS = 4; // Radius of the dots

  constructor(x, y, z, clientWidth, clientHeight) {
    

    /* ====================== */
    /* ====== VARIABLES ===== */
    /* ====================== */
    let width = clientWidth // canvas.clientWidth; // Width of the canvas
    let height = clientHeight //canvas.clientHeight; // Height of the canvas

    /* ====================== */
    /* ====== CONSTANTS ===== */
    /* ====================== */
    /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
    
    let GLOBE_RADIUS = width * 0.7; // Radius of the globe
    this.GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
    this.PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
    this.PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
    this.FIELD_OF_VIEW = width * 0.8;

    this.x = x * GLOBE_RADIUS;
    this.y = y * GLOBE_RADIUS;
    this.z = z * GLOBE_RADIUS + this.GLOBE_CENTER_Z;
    
    this.xProject = 0;
    this.yProject = 0;
    this.sizeProjection = 0;

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
    this.project(sin, cos);
    // ctx.fillRect(this.xProject - this.DOT_RADIUS, this.yProject - this.DOT_RADIUS, this.DOT_RADIUS * 2 * this.sizeProjection, this.DOT_RADIUS * 2 * this.sizeProjection);
    ctx.beginPath();
    ctx.arc(this.xProject, this.yProject, this.DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

let ctx: CanvasRenderingContext2D;


// // Populate the dots array with random dots
// createDots();

// // Render the scene
// window.requestAnimationFrame(render);

// @Component({
  // selector: 'magnometer',
  // templateUrl: './magnometer.html',
  // styleUrls: ['./magnometer.css']
// })
export class MagnometerView{// implements OnInit {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  static width
  static height

  constructor(public dialogRef: MatDialogRef<MagnometerView>) {

  }

  ngOnInit1(): void {
    ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngAfterViewInit1() {
    // const ctx = canvas.getContext('2d');

    MagnometerView.width = this.canvas.nativeElement.width
    MagnometerView.height = this.canvas.nativeElement.height

    if (window.devicePixelRatio > 1) {
      this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth * 2;
      this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight * 2;
      ctx.scale(2, 2);
    }
    
    // // Populate the dots array with random dots
    this.createDots();

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
      dots.push(new Dot(x, y, z, MagnometerView.width, MagnometerView.height));
    }
  }
  
  /* ====================== */
  /* ======== RENDER ====== */
  /* ====================== */
  static render(a) {
    // Clear the scene
    ctx.clearRect(0, 0, MagnometerView.width, MagnometerView.height);
    
    
    // Increase the globe rotation
    rotation = a * 0.0004;
    
    const sineRotation = Math.sin(rotation); // Sine of the rotation
    const cosineRotation = Math.cos(rotation); // Cosine of the rotation
    
    // Loop through the dots array and draw every dot
    for (var i = 0; i < dots.length; i++) {
      dots[i].draw(ctx, sineRotation, cosineRotation);
    }
    
    window.requestAnimationFrame(MagnometerView.render);
  }
  
}
