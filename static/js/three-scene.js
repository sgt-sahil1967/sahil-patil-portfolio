// Three.js Scene Setup
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    const container = canvas.parentElement;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create floating geometric shapes
    createFloatingShapes();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    // Start animation loop
    animate();
}

function createFloatingShapes() {
    const geometries = [
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        new THREE.SphereGeometry(0.1, 8, 6),
        new THREE.ConeGeometry(0.1, 0.3, 6),
        new THREE.OctahedronGeometry(0.15),
        new THREE.TetrahedronGeometry(0.2)
    ];
    
    const materials = [
        new THREE.MeshBasicMaterial({ 
            color: 0xffd700, 
            transparent: true, 
            opacity: 0.7,
            wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
            color: 0xd4a574, 
            transparent: true, 
            opacity: 0.6,
            wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.4,
            wireframe: true 
        })
    ];
    
    particles = [];
    
    // Create 50 floating shapes
    for (let i = 0; i < 50; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        // Random position
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        
        // Random scale
        const scale = Math.random() * 0.5 + 0.5;
        mesh.scale.setScalar(scale);
        
        // Store initial position and random properties
        mesh.userData = {
            initialX: mesh.position.x,
            initialY: mesh.position.y,
            initialZ: mesh.position.z,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(mesh);
        particles.push(mesh);
    }
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    const canvas = document.getElementById('three-canvas');
    const container = canvas.parentElement;
    
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate particles
    particles.forEach((particle, index) => {
        // Rotation animation
        particle.rotation.x += particle.userData.rotationSpeed.x;
        particle.rotation.y += particle.userData.rotationSpeed.y;
        particle.rotation.z += particle.userData.rotationSpeed.z;
        
        // Floating animation
        particle.position.y = particle.userData.initialY + 
            Math.sin(time * particle.userData.floatSpeed + particle.userData.floatOffset) * 2;
        
        // Mouse interaction
        const distance = Math.sqrt(
            Math.pow(particle.position.x - mouseX * 5, 2) + 
            Math.pow(particle.position.y - mouseY * 5, 2)
        );
        
        if (distance < 3) {
            particle.position.x += (mouseX * 5 - particle.position.x) * 0.02;
            particle.position.z += Math.sin(time + index) * 0.5;
        } else {
            particle.position.x += (particle.userData.initialX - particle.position.x) * 0.02;
            particle.position.z += (particle.userData.initialZ - particle.position.z) * 0.02;
        }
    });
    
    // Camera subtle movement
    camera.position.x = mouseX * 0.5;
    camera.position.y = mouseY * 0.5;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Initialize Three.js when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure canvas is ready
    setTimeout(initThreeJS, 100);
});
