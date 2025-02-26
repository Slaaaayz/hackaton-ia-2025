document.addEventListener('DOMContentLoaded', () => {
    const flashlight = document.querySelector('.flashlight');
    const container = document.querySelector('.flashlight-container');
    const body = document.body;
    
    // Créer le ciel étoilé
    const starrySky = document.createElement('div');
    starrySky.className = 'starry-sky';
    document.body.appendChild(starrySky);
    
    // Ajouter les instructions
    const instructions = document.createElement('div');
    instructions.className = 'instructions';
    instructions.textContent = 'Cliquez pour allumer/éteindre la lampe';
    document.body.appendChild(instructions);
    
    // Créer l'effet de curseur lampe torche
    const cursorLight = document.createElement('div');
    cursorLight.className = 'cursor-light';
    document.body.appendChild(cursorLight);
    
    // État de la lampe
    let isLightOn = true;
    
    // Fonction pour mettre à jour la position de la lampe torche
    function updateFlashlightPosition(e) {
        if (!isLightOn) return;
        
        const x = e.clientX;
        const y = e.clientY;
        
        // Mettre à jour la position de la lampe principale avec un léger délai
        requestAnimationFrame(() => {
            flashlight.style.left = `${x}px`;
            flashlight.style.top = `${y}px`;
        });
        
        // Mettre à jour la position du curseur lumineux immédiatement
        cursorLight.style.left = `${x}px`;
        cursorLight.style.top = `${y}px`;
        
        // Vérifier quels éléments sont sous la lampe torche
        const elements = document.elementsFromPoint(x, y);
        
        // Réinitialiser l'opacité de tous les éléments avec une transition douce
        document.querySelectorAll('section, header, footer, h1, h2, h3, p, .grid-item, .story').forEach(el => {
            el.style.transition = 'opacity 0.2s ease';
            el.style.opacity = '0.08';
        });
        
        // Augmenter l'opacité des éléments sous la lampe avec une transition plus rapide
        elements.forEach(el => {
            el.style.transition = 'opacity 0.15s ease';
            el.style.opacity = '1';
            
            // Vérifier les éléments parents avec une opacité légèrement réduite
            const parents = [
                el.closest('section'),
                el.closest('header'),
                el.closest('footer'),
                el.closest('.grid-item'),
                el.closest('.story')
            ].filter(Boolean);
            
            parents.forEach(parent => {
                parent.style.transition = 'opacity 0.15s ease';
                parent.style.opacity = '0.95';
            });
            
            // Vérifier les éléments enfants
            el.querySelectorAll('h1, h2, h3, p').forEach(child => {
                child.style.transition = 'opacity 0.15s ease';
                child.style.opacity = '1';
            });
        });
    }
    
    // Fonction pour allumer/éteindre la lampe
    function toggleLight() {
        isLightOn = !isLightOn;
        
        if (isLightOn) {
            // Allumer la lampe
            flashlight.style.opacity = '1';
            cursorLight.style.opacity = '1';
            starrySky.classList.remove('visible');
            body.classList.remove('lights-on');
            body.style.cursor = 'none';
            
            setTimeout(() => {
                // Rendre tous les éléments plus sombres par défaut
                document.querySelectorAll('section, header, footer, h1, h2, h3, p, .grid-item, .story').forEach(el => {
                    el.style.opacity = '0.1';
                });
                
                // Le titre et le footer restent un peu plus visibles mais moins qu'avant
                document.querySelector('h1').style.opacity = '0.4';
                document.querySelector('footer').style.opacity = '0.2';
                
                document.addEventListener('mousemove', updateFlashlightPosition);
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: window.innerWidth / 2,
                    clientY: window.innerHeight / 2
                });
                document.dispatchEvent(mouseEvent);
            }, 100);
            
            instructions.textContent = 'Cliquez pour éteindre la lampe et voir les étoiles';
        } else {
            // Éteindre la lampe
            flashlight.style.opacity = '0';
            cursorLight.style.opacity = '0';
            body.style.cursor = 'auto'; // Restaurer le curseur standard
            
            // Désactiver le suivi de la souris
            document.removeEventListener('mousemove', updateFlashlightPosition);
            
            // Rendre tout le contenu visible immédiatement
            document.querySelectorAll('section, header, footer').forEach(el => {
                el.style.opacity = '1';
                el.style.transition = 'opacity 0.8s ease';
            });
            
            // Activer le ciel étoilé et le mode "lights-on"
            setTimeout(() => {
                starrySky.classList.add('visible');
                body.classList.add('lights-on');
            }, 50);
            
            instructions.textContent = 'Cliquez pour allumer la lampe';
            
            // Supprimer les animations lors de l'extinction
            document.querySelectorAll('.illuminated').forEach(el => {
                el.classList.remove('illuminated');
            });
        }
    }
    
    // Écouteur d'événement pour le mouvement de la souris
    document.addEventListener('mousemove', updateFlashlightPosition);
    
    // Écouteur d'événement pour le clic (allumer/éteindre)
    document.addEventListener('click', toggleLight);
    
    // Ajuster la taille de la lampe torche
    function adjustFlashlightSize() {
        const width = window.innerWidth;
        if (width < 768) {
            flashlight.style.width = '400px';
            flashlight.style.height = '400px';
            cursorLight.style.width = '120px';  // Version légèrement plus petite pour mobile
            cursorLight.style.height = '120px';
        } else {
            flashlight.style.width = '600px';
            flashlight.style.height = '600px';
            cursorLight.style.width = '150px';  // Environ 15cm
            cursorLight.style.height = '150px';
        }
    }
    
    // Appeler la fonction au chargement et au redimensionnement
    window.addEventListener('resize', adjustFlashlightSize);
    adjustFlashlightSize();
    
    // Animation d'apparition progressive au chargement
    setTimeout(() => {
        document.body.style.transition = 'background-color 1.5s ease';
        document.body.style.backgroundColor = '#000';
        body.style.cursor = 'none'; // Cacher le curseur standard au chargement
        
        // Initialiser les instructions
        instructions.textContent = 'Cliquez pour éteindre la lampe et voir les étoiles';
    }, 500);
}); 