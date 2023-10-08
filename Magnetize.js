import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
var lastPoint = new THREE.Vector3(0,9,0);

function Magnetize(objeto, superficie, newRot) {
    var dir = new THREE.Vector3(0, 0, 0);
    dir.copy(objeto.children[2].localToWorld(objeto.children[2].position.clone()));
    var origin = objeto.children[1].localToWorld(objeto.children[1].position.clone());
    dir.sub(origin);
    dir.normalize();
    var right = new THREE.Vector3(-1, 0, 0);
    raycaster.set(origin, dir);
    raycaster.near = 0.01;
    raycaster.far = 3;
    var result = raycaster.intersectObject(superficie);
    if (result.length > 0) {

        objeto.position.copy(result[0].point.clone());
        rotateAround(objeto, result[0].point);
        right.applyQuaternion(objeto.quaternion);
        var cross = right.clone().cross(result[0].normal);
        var lookMat = new THREE.Matrix4();
        lookMat.lookAt(new THREE.Vector3(0, 0, 0), cross, result[0].normal);
        var eu = new THREE.Euler(0, 0, 0);
        eu.setFromRotationMatrix(lookMat);
        objeto.rotation.x = eu.x;
        objeto.rotation.z = eu.z;
        objeto.rotation.y = eu.y;
        objeto.rotateY(newRot);
        lastPoint.copy(objeto.position.clone());
    }else{
    }
}
function rotateAround(objeto, anchorPoint) {
    let moveDir = new THREE.Vector3(
        anchorPoint.x - objeto.position.x,
        anchorPoint.y - objeto.position.y,
        anchorPoint.z - objeto.position.z
    );
    moveDir.normalize();
    objeto.translateOnAxis(moveDir, 0);
    objeto.rotateX(moveDir.x);
    objeto.rotateZ(moveDir.z);
    moveDir.multiplyScalar(-1);
    objeto.translateOnAxis(moveDir, 0);
}
export {Magnetize};