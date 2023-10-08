import * as THREE from 'three';
export class Stars{
    constructor(){
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(4000), 3)
        );
        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.3,
            sizeAttenuation: true
        })
        this.particles = new THREE.Points(this.geometry, this.particlesMaterial)
    }
}
function getRandomParticelPos(particleCount){
    const arr = new Float32Array(particleCount * 3);
    let theta = 0; let phi = 0;

    for (let i = 0; i < particleCount/3; i+=3) {
        theta = 2 * Math.PI * Math.random();
        phi = Math.acos(2 * Math.random() - 1);
        arr[i] = 100 * Math.cos(theta) * Math.sin(phi);
        arr[i+1] = 100 * Math.sin(theta) * Math.sin(phi);
        arr[i+2] = 100 * Math.cos(phi);
      //arr[i] = (Math.random() - 0.5) * 1000;
    }
    return arr;
  };