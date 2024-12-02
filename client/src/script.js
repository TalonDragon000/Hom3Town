document.addEventListener('DOMContentLoaded', () => {
    const assetButtonsContainer = document.querySelector('.asset-container');
    const tabs = document.querySelectorAll('.tab');
    
    const frameTags = {
        male: [0, 1, 2, 6, 7, 8, 12, 13, 14, 15, 24, 26, 28, 29, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 88, 89, 90, 91, 96, 97, 98, 99, 104, 105, 106, 107, 112, 113, 114, 115, 120, 121, 122, 123],
        female: [3, 4, 5, 9, 10, 11, 16, 17, 18, 19, 20, 25, 27, 30, 20, 64, 65, 66, 67, 68, 69, 70, 71, 84, 85, 86, 87, 92, 93, 94, 95, 100, 101, 102, 103, 108, 109, 110, 111, 116, 117, 118, 119, 124, 125, 126, 127],
        unisex: [21, 22, 68, 69, 70, 71],
        body: [0, 1, 2, 3, 4, 5],
        eyes: [6, 7, 8, 9, 10, 11],
        brows: [12, 13, 14, 15, 16, 17, 18, 19],
        mouth: [21, 22],
        underwear: [24, 25],
        shoes: [26, 27],
        bottom: [29],
        top: [28, 30],
        facialHair: [20, 36, 37, 38, 39, 40, 41, 42, 43, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
        facialHair2: [44, 45, 46, 47],
        hair: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127]
    };

    let selectedFrames = {
        body: 0,
        eyes: null,
        brows: null,
        mouth: null,
        underwear: null,
        shoes: null,
        bottom: null,
        top: null,
        facialHair: null,
        facialHair2: null,
        hair: null
    };
    let selectedGender = null;

    function calculateBackgroundPosition(frameId) {
        const frameWidth = 64;
        const framesPerRow = 12;
        
        const row = Math.floor(frameId / framesPerRow);
        const col = frameId % framesPerRow;
        
        const xOffset = -(col * frameWidth);
        const yOffset = -(row * 128);
        
        return `${xOffset}px ${yOffset}px`;
    }

    function createAssetButtons(category) {
        if (!assetButtonsContainer) return;
        
        assetButtonsContainer.innerHTML = '';
        
        if (frameTags[category]) {
            frameTags[category].forEach(frameId => {
                if (isBlankFrame(frameId)) return;
                
                if (selectedGender && category !== 'body') {
                    if (selectedGender === 'male' && !isFrameAllowedForMale(frameId)) return;
                    if (selectedGender === 'female' && !isFrameAllowedForFemale(frameId)) return;
                }
                
                const button = document.createElement('div');
                button.className = 'asset-btn';
                if (isFrameSelected(frameId, category)) {
                    button.classList.add('selected');
                }
                button.dataset.frameId = frameId;
                button.dataset.category = category;
                
                button.style.backgroundImage = 'var(--starter-sprite)';
                button.style.backgroundPosition = calculateBackgroundPosition(frameId);
                
                const frameIdDisplay = document.createElement('div');
                frameIdDisplay.className = 'frame-id-display';
                frameIdDisplay.innerText = `ID: ${frameId}`;
                
                button.appendChild(frameIdDisplay);
                button.addEventListener('click', () => handleFrameSelection(frameId, category, button));
                
                assetButtonsContainer.appendChild(button);
            });
        }
    }

    function isBlankFrame(frameId) {
        const blankFrames = [23, 31, 32, 33, 34, 35];
        return blankFrames.includes(frameId);
    }

    function handleFrameSelection(frameId, category) {
        console.log(`Handling selection: ${category} frame ${frameId}`);
        
        if (category === 'body') {
            // Reset all when body changes
            selectedFrames = {
                body: frameId,
                eyes: null,
                brows: null,
                mouth: null,
                underwear: null,
                shoes: null,
                bottom: null,
                top: null,
                facialHair: null,
                facialHair2: null,
                hair: null
            };
            selectedGender = determineGender(frameId);
        } else {
            // Handle all other categories directly
            selectedFrames[category] = frameId;
        }
        
        console.log('Selected frames after update:', selectedFrames);
        updatePreview();
        updateButtonStates();
    }

    function determineGender(frameId) {
        if (frameTags.male.includes(frameId)) return 'male';
        if (frameTags.unisex.includes(frameId)) return 'unisex';
        return 'female';
    }

    function isFrameAllowedForMale(frameId) {
        return frameTags.male.includes(frameId) || frameTags.unisex.includes(frameId);
    }

    function isFrameAllowedForFemale(frameId) {
        return !frameTags.male.includes(frameId) || frameTags.unisex.includes(frameId);
    }

    function isFrameSelected(frameId, category) {
        if (category === 'clothes') {
            return selectedFrames.clothes.includes(frameId);
        }
        return selectedFrames[category] === frameId;
    }

    function updatePreview() {
        const layerOrder = ['body', 'eyes', 'brows', 'mouth', 'underwear', 'shoes', 'bottom', 'top', 'facialHair', 'facialHair2', 'hair'];
        
        // Reset all layers first
        layerOrder.forEach(layer => {
            const previewLayer = document.getElementById(`preview-${layer}`);
            if (previewLayer) {
                previewLayer.style.display = 'none';
                previewLayer.style.backgroundImage = 'none';
                previewLayer.style.backgroundPosition = '';
            }
        });

        // If no body selected, return after reset
        if (selectedFrames.body === null) {
            console.log('No body selected - preview cleared');
            return;
        }
        
        // Update layers
        layerOrder.forEach(layer => {
            const frameId = selectedFrames[layer];
            if (frameId !== null) {
                const previewLayer = document.getElementById(`preview-${layer}`);
                if (previewLayer) {
                    previewLayer.style.display = 'block';
                    previewLayer.style.backgroundImage = 'var(--starter-sprite)';
                    previewLayer.style.backgroundPosition = calculateBackgroundPosition(frameId);
                }
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            createAssetButtons(category);
        });
    });

    createAssetButtons('body');

    document.getElementById('clear-all-btn').addEventListener('click', () => {
        selectedFrames = {
            body: null,
            eyes: null,
            brows: null,
            mouth: null,
            underwear: null,
            shoes: null,
            bottom: null,
            top: null,
            facialHair: null,
            facialHair2: null,
            hair: null
        };
        selectedGender = determineGender(0);
        updatePreview();
        updateButtonStates();
        createAssetButtons('body');
    });

    updatePreview();

    function updateButtonStates() {
        const buttons = document.querySelectorAll('.asset-btn');
        buttons.forEach(button => {
            const frameId = parseInt(button.dataset.frameId);
            const category = button.dataset.category;
            
            // Remove any existing selected class
            button.classList.remove('selected');
            
            // Add selected class if this frame is currently selected
            if (isFrameSelected(frameId, category)) {
                button.classList.add('selected');
            }
        });
    }
});
