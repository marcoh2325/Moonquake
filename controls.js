import * as THREE from 'three';
import { Quaternion } from 'three';
import { input } from './Input.js';
var moveDir;
function moveAtronaut(astronaut, cameraEuler) {
    moveDir = new THREE.Vector3(input.horizontal, 0, input.vertical);
    if (moveDir.length() >= 0.1) {
        /*
        var angle = Math.atan2(-moveDir.x, moveDir.z) + Math.atan2(cameraEuler.x, cameraEuler.z);
        var firstMat = new THREE.Matrix4();
        firstMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), angle);
        var angleY = -Math.asin(cameraEuler.y);
        var secondMat = new THREE.Matrix4();
        secondMat.makeRotationAxis(new THREE.Vector3(1, 0, 0), angleY);
        firstMat.multiply(secondMat);
        var initQuat = new THREE.Quaternion();
        initQuat.setFromRotationMatrix(firstMat);
        var finalQuat = new THREE.Quaternion();
        finalQuat.slerpQuaternions(astronaut.quaternion, initQuat, 0.05);*/
        astronaut.quaternion.copy(getAstroQuat(moveDir, cameraEuler, astronaut));
        astronaut.children.forEach(element => {
            if (element.name === "thruster" && element.children[1] != null) {
                element.children[1].visible = true;
            }
        });
        //

    }else{
        astronaut.children.forEach(element => {
            if (element.name === "thruster" && element.children[1] != null) {
                element.children[1].visible = false;
            }
        });
    }
}
function getAstroQuat(moveDir, cameraEuler, astronaut) {
    var angle = Math.atan2(-moveDir.x, moveDir.z) + Math.atan2(cameraEuler.x, cameraEuler.z);
    var firstMat = new THREE.Matrix4();
    firstMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), angle);
    var angleY = -Math.asin(cameraEuler.y);
    var secondMat = new THREE.Matrix4();
    secondMat.makeRotationAxis(new THREE.Vector3(1, 0, 0), angleY);
    firstMat.multiply(secondMat);
    var initQuat = new THREE.Quaternion();
    initQuat.setFromRotationMatrix(firstMat);
    var finalQuat = new THREE.Quaternion();
    finalQuat.slerpQuaternions(astronaut.quaternion, initQuat, 0.05);
    var newForward = new THREE.Vector3(0, 0, 1);
    newForward.applyQuaternion(initQuat);
    moveDir.copy(astronaut.position);
    newForward.multiplyScalar(0.01);
    moveDir.add(newForward)
    astronaut.position.x = moveDir.x;
    astronaut.position.y = moveDir.y;
    astronaut.position.z = moveDir.z;
    return finalQuat;
}
function getRocketQuat(moveDir, cameraEuler, astronaut) {
    var angle = Math.atan2(-moveDir.x, moveDir.z) + Math.atan2(cameraEuler.x, cameraEuler.z);
    var firstMat = new THREE.Matrix4();
    firstMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), angle);
    var angleY = -Math.asin(cameraEuler.y);
    var secondMat = new THREE.Matrix4();
    secondMat.makeRotationAxis(new THREE.Vector3(1, 0, 0), angleY);
    firstMat.multiply(secondMat);
    var initQuat = new THREE.Quaternion();
    initQuat.setFromRotationMatrix(firstMat);
    var finalQuat = new THREE.Quaternion();
    finalQuat.slerpQuaternions(astronaut.quaternion, initQuat, 0.05);
    return finalQuat;
}
export { moveAtronaut };