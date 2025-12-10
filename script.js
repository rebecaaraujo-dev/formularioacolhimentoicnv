
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfo_paFek3JTiButMMt-z75Chz1Hjul8TYCN5WaH5Y06mu-ag/formResponse';

const FIELD_MAPPING = {
    name: 'entry.384572489',                    // Nome Completo
    phone: 'entry.1350948475',                   // Telefone
    wantVisit: 'entry.1279467557',               // Você deseja receber uma visita?
    visitAddress: 'entry.1122395530',            // Endereço para Visita
    visitAddressComplement: 'entry.1119608276',  // Complemento (Visita)
    visitBestDay: 'entry.97075287',            // Qual o melhor dia para visita?
    visitObservations: 'entry.1225243317',       // Observações (Visita)
    hasPrayerRequest: 'entry.921992178',        // Você tem um pedido de oração?
    prayerRequest: 'entry.1850420491',           // Qual é o seu pedido de oração?
    wantPeaceHouse: 'entry.2018735222',          // Você deseja receber Casa de Paz?
    peaceHouseAddress: 'entry.771694317',       // Endereço (Casa de Paz)
    peaceHouseComplement: 'entry.36234239',    // Complemento (Casa de Paz)
    peaceHouseBestDay: 'entry.1229720227',       // Melhor dia (Casa de Paz)
    peaceHouseObservations: 'entry.653825848',  // Observações (Casa de Paz)
};

const SECTIONS = ['consent', 'personal', 'visitas', 'oracoes', 'paz'];
let currentSection = 0;

const form = document.getElementById('contactForm');
const headerBtn = document.getElementById('headerBtn');
const sectionHeader = document.querySelector('.section-0-header');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const successPage = document.getElementById('successPage');
const resetFormBtn = document.getElementById('resetFormBtn');
const errorAlert = document.getElementById('errorAlert');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]*$/,
};

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateUI();
});

function setupEventListeners() {
    form.addEventListener('submit', handleFormSubmit);
    headerBtn.addEventListener('click', handleHeaderBtnClick);
    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
    resetFormBtn.addEventListener('click', handleResetForm);

    setupRealtimeValidation();
    setupVisitConditionalFields();
    setupPrayerConditionalFields();
    setupPeaceHouseConditionalFields();
}

function setupVisitConditionalFields() {
    const wantVisitYes = document.getElementById('wantVisitYes');
    const wantVisitNo = document.getElementById('wantVisitNo');
    const visitAddressFields = document.getElementById('visitAddressFields');

    const handleVisitChange = () => {
        if (wantVisitYes.checked) {
            visitAddressFields.style.display = 'block';
        } else {
            visitAddressFields.style.display = 'none';
        }
    };

    wantVisitYes.addEventListener('change', handleVisitChange);
    wantVisitNo.addEventListener('change', handleVisitChange);
}

function setupPrayerConditionalFields() {
    const hasPrayerRequestYes = document.getElementById('hasPrayerRequestYes');
    const hasPrayerRequestNo = document.getElementById('hasPrayerRequestNo');
    const prayerRequestFields = document.getElementById('prayerRequestFields');

    const handlePrayerChange = () => {
        if (hasPrayerRequestYes.checked) {
            prayerRequestFields.style.display = 'block';
        } else {
            prayerRequestFields.style.display = 'none';
        }
    };

    hasPrayerRequestYes.addEventListener('change', handlePrayerChange);
    hasPrayerRequestNo.addEventListener('change', handlePrayerChange);
}

function setupPeaceHouseConditionalFields() {
    const wantPeaceHouseYes = document.getElementById('wantPeaceHouseYes');
    const wantPeaceHouseNo = document.getElementById('wantPeaceHouseNo');
    const peaceHouseFields = document.getElementById('peaceHouseFields');

    const handlePeaceHouseChange = () => {
        if (wantPeaceHouseYes.checked) {
            peaceHouseFields.style.display = 'block';
        } else {
            peaceHouseFields.style.display = 'none';
        }
    };

    wantPeaceHouseYes.addEventListener('change', handlePeaceHouseChange);
    wantPeaceHouseNo.addEventListener('change', handlePeaceHouseChange);
}

function setupRealtimeValidation() {
    const fields = [
        'name', 'phone', 'visitAddress', 'visitAddressComplement',
        'visitBestDay', 'visitObservations', 'prayerRequest',
        'peaceHouseAddress', 'peaceHouseComplement', 'peaceHouseBestDay', 'peaceHouseObservations'
    ];

    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    clearFieldError(fieldName);
                }
            });
        }
    });
}

function handleNextClick() {
    if (validateCurrentSection()) {
        if (currentSection < SECTIONS.length - 1) {
            goToSection(currentSection + 1);
        } else {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        }
    }
}

function handleHeaderBtnClick() {
    if (validateCurrentSection()) {
        goToSection(1);
    }
}

function handlePrevClick() {
    if (currentSection > 0) {
        goToSection(currentSection - 1);
    }
}

function goToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= SECTIONS.length) return;

    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.querySelector(`.form-section[data-section="${SECTIONS[sectionIndex]}"]`);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    currentSection = sectionIndex;
    updateUI();
}

function updateUI() {
    // Update form sections - only show the active one
    document.querySelectorAll('.form-section').forEach((section, index) => {
        section.classList.remove('active');
        if (index === currentSection) {
            section.classList.add('active');
        }
    });

    // Hide/show header and form based on current section
    if (currentSection === 0) {
        // Show header, hide form
        sectionHeader.style.display = 'block';
        form.classList.remove('active');
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    } else {
        // Regular form sections
        sectionHeader.style.display = 'none';
        form.classList.add('active');
        prevBtn.style.display = 'flex';
        
        // Show Próximo button for sections 1-3, Enviar button for section 4
        if (currentSection === SECTIONS.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateCurrentSection() {
    const sectionName = SECTIONS[currentSection];

    switch (sectionName) {
        case 'consent':
            return validateConsentSection();
        case 'personal':
            return validatePersonalSection();
        case 'visitas':
            return validateVisitasSection();
        case 'oracoes':
            return validateOracoesSection();
        case 'paz':
            return validatePazSection();
        default:
            return true;
    }
}

function validatePersonalSection() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    if (!name) {
        showFieldError('name', 'Nome é obrigatório');
        isValid = false;
    } else if (name.length < 3) {
        showFieldError('name', 'Nome deve ter pelo menos 3 caracteres');
        isValid = false;
    }

    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
        showFieldError('phone', 'Telefone é obrigatório');
        isValid = false;
    } else if (!validationPatterns.phone.test(phone)) {
        showFieldError('phone', 'Telefone inválido');
        isValid = false;
    }

    return isValid;
}

function validateVisitasSection() {
    let isValid = true;

    const wantVisit = document.querySelector('input[name="wantVisit"]:checked');
    if (!wantVisit) {
        showFieldError('wantVisit', 'Selecione uma opção');
        isValid = false;
        return isValid;
    }

    // If user selected "nao" (no), section is valid - team can still contact them
    if (wantVisit.value === 'nao') {
        return true;
    }

    // Only validate conditional fields if user selected "sim" (yes)
    if (wantVisit.value === 'sim') {
        const visitAddress = document.getElementById('visitAddress').value.trim();
        if (!visitAddress) {
            showFieldError('visitAddress', 'Endereço é obrigatório');
            isValid = false;
        }

        const visitBestDay = document.getElementById('visitBestDay').value.trim();
        if (!visitBestDay) {
            showFieldError('visitBestDay', 'Campo obrigatório');
            isValid = false;
        }
    }

    return isValid;
}

function validateOracoesSection() {
    let isValid = true;

    const hasPrayerRequest = document.querySelector('input[name="hasPrayerRequest"]:checked');
    if (!hasPrayerRequest) {
        showFieldError('hasPrayerRequest', 'Selecione uma opção');
        isValid = false;
        return isValid;
    }

    // If user selected "nao" (no), section is valid - team can still contact them
    if (hasPrayerRequest.value === 'nao') {
        return true;
    }

    // Only validate conditional fields if user selected "sim" (yes)
    if (hasPrayerRequest.value === 'sim') {
        const prayerRequest = document.getElementById('prayerRequest').value.trim();
        if (!prayerRequest) {
            showFieldError('prayerRequest', 'Campo obrigatório');
            isValid = false;
        } else if (prayerRequest.length < 10) {
            showFieldError('prayerRequest', 'Descreva melhor seu pedido de oração');
            isValid = false;
        }
    }

    return isValid;
}

function validatePazSection() {
    let isValid = true;

    const wantPeaceHouse = document.querySelector('input[name="wantPeaceHouse"]:checked');
    if (!wantPeaceHouse) {
        showFieldError('wantPeaceHouse', 'Selecione uma opção');
        isValid = false;
        return isValid;
    }

    // If user selected "nao" (no), section is valid - team can still contact them
    if (wantPeaceHouse.value === 'nao') {
        return true;
    }

    // Only validate conditional fields if user selected "sim" (yes)
    if (wantPeaceHouse.value === 'sim') {
        const peaceHouseAddress = document.getElementById('peaceHouseAddress').value.trim();
        if (!peaceHouseAddress) {
            showFieldError('peaceHouseAddress', 'Campo obrigatório');
            isValid = false;
        }

        const peaceHouseBestDay = document.getElementById('peaceHouseBestDay').value.trim();
        if (!peaceHouseBestDay) {
            showFieldError('peaceHouseBestDay', 'Campo obrigatório');
            isValid = false;
        }
    }

    return isValid;
}

function validateConsentSection() {
    const consent = document.getElementById('consent').checked;
    if (!consent) {
        showFieldError('consent', 'Você deve concordar com o tratamento dos dados');
        return false;
    }
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');

    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');

    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

function clearAllErrors() {
    const fields = [
        'name', 'phone', 'wantVisit', 'visitAddress',
        'visitAddressComplement', 'visitBestDay', 'visitObservations',
        'hasPrayerRequest', 'prayerRequest',
        'wantPeaceHouse', 'peaceHouseAddress', 'peaceHouseComplement',
        'peaceHouseBestDay', 'peaceHouseObservations', 'consent'
    ];
    fields.forEach(field => clearFieldError(field));
}

async function handleFormSubmit(e) {
    e.preventDefault();

    hideMessages();
    setLoadingState(true);

    try {
        await submitToGoogleForms();
        form.reset();
        clearAllErrors();
        document.getElementById('visitAddressFields').style.display = 'none';
        document.getElementById('prayerRequestFields').style.display = 'none';
        document.getElementById('peaceHouseFields').style.display = 'none';
        // Show success page
        showSuccessPage();
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage();
    } finally {
        setLoadingState(false);
    }
}

async function submitToGoogleForms() {
    // Get radio button values
    const wantVisitValue = document.querySelector('input[name="wantVisit"]:checked')?.value || '';
    const hasPrayerRequestValue = document.querySelector('input[name="hasPrayerRequest"]:checked')?.value || '';
    const wantPeaceHouseValue = document.querySelector('input[name="wantPeaceHouse"]:checked')?.value || '';

    // Helper function to convert sim/nao to proper form values with accents
    const convertToFormValue = (value) => {
        if (value === 'sim') return 'Sim';
        if (value === 'nao') return 'Não';
        return '';
    };

    const fieldsData = {
        name: document.getElementById('name')?.value.trim() || '',
        phone: document.getElementById('phone')?.value.trim() || '',
        wantVisit: convertToFormValue(wantVisitValue),
        // Only include visit fields if user selected "sim"
        visitAddress: wantVisitValue === 'sim' ? (document.getElementById('visitAddress')?.value.trim() || '') : '',
        visitAddressComplement: wantVisitValue === 'sim' ? (document.getElementById('visitAddressComplement')?.value.trim() || '') : '',
        visitBestDay: wantVisitValue === 'sim' ? (document.getElementById('visitBestDay')?.value.trim() || '') : '',
        visitObservations: wantVisitValue === 'sim' ? (document.getElementById('visitObservations')?.value.trim() || '') : '',
        hasPrayerRequest: convertToFormValue(hasPrayerRequestValue),
        // Only include prayer request field if user selected "sim"
        prayerRequest: hasPrayerRequestValue === 'sim' ? (document.getElementById('prayerRequest')?.value.trim() || '') : '',
        wantPeaceHouse: convertToFormValue(wantPeaceHouseValue),
        // Only include peace house fields if user selected "sim"
        peaceHouseAddress: wantPeaceHouseValue === 'sim' ? (document.getElementById('peaceHouseAddress')?.value.trim() || '') : '',
        peaceHouseComplement: wantPeaceHouseValue === 'sim' ? (document.getElementById('peaceHouseComplement')?.value.trim() || '') : '',
        peaceHouseBestDay: wantPeaceHouseValue === 'sim' ? (document.getElementById('peaceHouseBestDay')?.value.trim() || '') : '',
        peaceHouseObservations: wantPeaceHouseValue === 'sim' ? (document.getElementById('peaceHouseObservations')?.value.trim() || '') : '',
    };

    // Log detailed debugging info
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Form data being sent:', fieldsData);
    console.log('Google Form URL:', GOOGLE_FORM_URL);
    
    // Log each field individually
    for (const [fieldName, entryId] of Object.entries(FIELD_MAPPING)) {
        const value = fieldsData[fieldName];
        console.log(`${fieldName} (${entryId}): "${value}"`);
    }

    // Create URLSearchParams for submission - this is the correct format for Google Forms
    const params = new URLSearchParams();
    
    // Add all fields to the params
    for (const [fieldName, entryId] of Object.entries(FIELD_MAPPING)) {
        const value = fieldsData[fieldName];
        if (value) {  // Only add non-empty values
            params.append(entryId, value);
        }
    }

    console.log('URLSearchParams being sent:', params.toString());

    try {
        // Submit using fetch with no-cors mode to avoid CORS issues with Google Forms
        const response = await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: params.toString(),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        console.log('Form submission request sent to Google Forms');
        // Note: With no-cors mode, we can't verify the response, but the form should be submitted
        return true;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}

function setLoadingState(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
        submitText.style.display = 'none';
        submitSpinner.style.display = 'inline-block';
    } else {
        submitText.style.display = 'inline';
        submitSpinner.style.display = 'none';
    }
}

function showSuccessPage() {
    form.style.display = 'none';
    sectionHeader.style.display = 'none';
    successPage.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showErrorMessage() {
    errorAlert.style.display = 'block';
    setTimeout(() => {
        errorAlert.style.display = 'none';
    }, 5000);
}

function hideMessages() {
    errorAlert.style.display = 'none';
}

function handleResetForm() {
    form.style.display = 'block';
    successPage.style.display = 'none';
    sectionHeader.style.display = 'block';
    currentSection = 0;
    updateUI();
}

console.log('Form script with conditional visits and prayer sections loaded successfully');
