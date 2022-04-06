AFRAME.registerComponent('bowling-ball',{
init:function(){
 this.createBowls()
},
createBowls: function(){
 window.addEventListener('keydown',(e) => {
  if(e.key === 'f'){
     var bowlingBall = document.createElement('a-entity')
     bowlingBall.setAttribute('geometry',{
         primitive : 'sphere',
         radius : 0.1
     })
     bowlingBall.setAttribute('material','color','blue')
     
     var camera = document.querySelector('#camera').object3D
     var direction = new THREE.Vector3()

     camera.getWorldDirection(direction)

     bowlingBall.setAttribute('position',{x: 0, y : 1.75,z : 0})
     bowlingBall.setAttribute('velocity',direction.multiplyScalar(-5))
     bowlingBall.setAttribute('dynamic-body',{
         shape : 'sphere',
         mass : '0'
     })
     bowlingBall.addEventListener('collide',this.removeBall)

     var scene = document.querySelector('#scene');

     scene.appendChild(bowlingBall)
  }
 })

},
removeBall: function(e){

 console.log(e.detail.target.el)
 console.log(e.detail.body.el)

 var element = e.detail.target.el;
 var elementHit = e.detail.target.el;

 if(elementHit.includes('bowling-pin')){
    elementHit.setAttribute('material',{
        opacity : 1,
        transparent : 'true'
    })
 }

 var impact = new CANNON.Vec3(0,1,-15)
 var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'))

 element.body.applyIForce(impact,worldPoint)

 element.removeEventListener('collide',this.removeBall)

 var scene = document.querySelector('#scene')
 scene.removeChild(element)

}
})