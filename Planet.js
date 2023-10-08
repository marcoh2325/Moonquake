import * as THREE from 'three';
export class Planet{
    constructor (textures, size, shine)
    {
        this.geometry = new THREE.SphereGeometry( size, 64, 32 );
        this.tex = new THREE.TextureLoader().load(textures[0]);
        this.tex.wrapS = THREE.RepeatWrapping;
        this.tex.wrapT = THREE.RepeatWrapping;
        this.height = new THREE.TextureLoader().load(textures[1]);
        this.height.wrapS = THREE.RepeatWrapping;
        this.height.wrapT = THREE.RepeatWrapping;
        this.normal = new THREE.TextureLoader().load(textures[2]);
        this.normal.wrapS = THREE.RepeatWrapping;
        this.normal.wrapT = THREE.RepeatWrapping;
        this.default = true;
        this.impactos = new THREE.TextureLoader().load(textures[3]);
        this.height.repeat.set( 1, 1 );
        this.tex.repeat.set( 1, 1 );
        this.normal.repeat.set( 1, 1 );
        this.material = new THREE.MeshPhysicalMaterial( {map:this.tex,normalMap:this.normal,roughness:1,emissiveIntensity:0.1,reflectivity:0} );
        this.obj = new THREE.Mesh( this.geometry, this.material );
        this.obj.scale.set(0.1,0.1,0.1);
        //this.obj.visible=false;
        this.orbit = new THREE.Group();
        this.orbit.add(this.obj);
    }
    switchTex(point,ambient){
        if (this.default){
            this.material.map = this.impactos;
            this.material.emissiveMap = this.impactos;
            this.material.emissiveIntensity = 10;

            this.default = false;
            this.material.needsUpdate = true;
            this.obj.material = this.material;
            ambient.intensity = 10;
            point.intensity = 0;
        }else{
            this.material.map = this.tex;
            this.default = true;
            this.material.emissiveMap = null;
            this.material.emissiveIntensity = 0;
            this.material.needsUpdate = true;
            this.obj.material = this.material;
            ambient.intensity = 0.2;
            point.intensity = 6000;
        }
    }
    createRing(texture,alpha){
        var plane = new THREE.PlaneGeometry();
        var t = new THREE.TextureLoader().load(texture);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.repeat.set( 1, 1 );
        var a = new THREE.TextureLoader().load(alpha);
        a.wrapS = THREE.RepeatWrapping;
        a.wrapT = THREE.RepeatWrapping;
        a.repeat.set( 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xfff6cc,lightMap:t,lightMapIntensity:1,alphaMap:a } );
        m.side = THREE.DoubleSide;
        m.transparent = true;
        var ring = new THREE.Mesh( plane, m );
        ring.scale.set(34,34);
        ring.rotation.x += THREE.MathUtils.DEG2RAD * 85;
        this.obj.add(ring);
    }
}