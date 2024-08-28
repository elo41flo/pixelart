// Sélection des éléments du DOM
const pixelCanvas = document.getElementById('pixelCanvas');
const colorPicker = document.getElementById('colorPicker');
const resetButton = document.getElementById('resetButton');
const saveButton = document.getElementById('saveButton');

// Fonction pour créer la grille de pixels
function createGrid(size) {
    // Vider la grille si elle existe déjà
    pixelCanvas.innerHTML = '';

    // Créer la grille de `size` x `size`
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

        // Ajouter un événement au clic pour colorier ou effacer le pixel
        pixel.addEventListener('click', function() {
            if (pixel.style.backgroundColor === colorPicker.value) {
                // Si le pixel est déjà de la couleur sélectionnée, le réinitialiser à blanc
                pixel.style.backgroundColor = 'white';
            } else {
                // Sinon, colorier le pixel avec la couleur choisie
                pixel.style.backgroundColor = colorPicker.value;
            }
        });

        // Ajouter le pixel au canvas
        pixelCanvas.appendChild(pixel);
    }
}

// Fonction pour réinitialiser toute la grille
function resetGrid() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white'; // Réinitialiser chaque pixel à blanc
    });
}

// Fonction pour enregistrer la grille en PDF
function saveAsPDF() {
    // Utiliser html2canvas pour capturer le contenu du pixelCanvas
    html2canvas(pixelCanvas).then(canvas => {
        const imgData = canvas.toDataURL('image/png');  // Convertir le canvas en image

        // Créer un PDF à l'aide de jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        // Ajouter l'image au PDF
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

        // Télécharger le PDF
        pdf.save('pixel-art.pdf');
    });
}

// Ajouter des événements aux boutons
resetButton.addEventListener('click', resetGrid);
saveButton.addEventListener('click', saveAsPDF);

// Initialiser la grille de 16x16 pixels
createGrid(16);

