// ========================================
// GOOGLE FORMS CONFIGURATION
// ========================================
// INSTRUÇÕES:
// 1. Substitua YOUR_FORM_ID pelo ID do seu Google Form
//    O ID está na URL do formulário: https://docs.google.com/forms/d/[SEU_ID_AQUI]/edit
//
// 2. Substitua cada 'entry.XXXXXXXXXX' pelo Entry ID correto do Google Forms
//    Para obter os Entry IDs, siga as instruções no arquivo: get-form-ids.html
//
// 3. Mantenha a mesma ordem dos campos no Google Forms conforme listado abaixo

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfo_paFek3JTiButMMt-z75Chz1Hjul8TYCN5WaH5Y06mu-ag/formResponse';

// Mapeamento dos campos do HTML para os campos do Google Forms
// Substitua os valores 'entry.XXXXXXXXXX' pelos Entry IDs corretos
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

const SECTIONS = ['personal', 'visitas', 'oracoes', 'paz'];
let currentSection = 0;

// Form Elements
const form = document.getElementById('contactForm');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorAlert = document.getElementById('errorAlert');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const progressBar = document.getElementById('progressBar');
const sectionIndicator = document.getElementById('sectionIndicator');

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
    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);

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
    const sections = document.querySelectorAll('.form-section');
    
    sections.forEach((section, index) => {
        section.classList.remove('active');
        if (index === currentSection) {
            section.classList.add('active');
        }
    });

    const progress = ((currentSection + 1) / SECTIONS.length) * 100;
    progressBar.style.width = progress + '%';

    // Update section indicator
    sectionIndicator.textContent = currentSection + 1;

    if (currentSection === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }

    if (currentSection === SECTIONS.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateCurrentSection() {
    const sectionName = SECTIONS[currentSection];

    switch (sectionName) {
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

    const emailField = document.getElementById('email');
    if (emailField) {
        const email = emailField.value.trim();
        if (!email) {
            showFieldError('email', 'Email é obrigatório');
            isValid = false;
        } else if (!validationPatterns.email.test(email)) {
            showFieldError('email', 'Email inválido');
            isValid = false;
        }
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
    }

    if (wantVisit && wantVisit.value === 'sim') {
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
    }

    if (hasPrayerRequest && hasPrayerRequest.value === 'sim') {
        const prayerRequest = document.getElementById('prayerRequest').value.trim();
        if (!prayerRequest) {
            showFieldError('prayerRequest', 'Campo obrigatório');
            isValid = false;
        } else if (prayerRequest.length < 10) {
            showFieldError('prayerRequest', 'Descreva melhor seu pedido de oração');
            isValid = false;
        }

        const prayerType = document.querySelector('input[name="prayerType"]:checked');
        if (!prayerType) {
            showFieldError('prayerType', 'Selecione um tipo de oração');
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
    }

    if (wantPeaceHouse && wantPeaceHouse.value === 'sim') {
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
        'hasPrayerRequest', 'prayerRequest', 'prayerType',
        'wantPeaceHouse', 'peaceHouseAddress', 'peaceHouseComplement',
        'peaceHouseBestDay', 'peaceHouseObservations', 'consent'
    ];
    fields.forEach(field => clearFieldError(field));
}

async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateConsentSection()) {
        return;
    }

    hideMessages();
    setLoadingState(true);

    try {
        await submitToGoogleForms();
        showSuccessMessage();
        form.reset();
        clearAllErrors();
        document.getElementById('visitAddressFields').style.display = 'none';
        document.getElementById('prayerRequestFields').style.display = 'none';
        goToSection(0);
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage();
    } finally {
        setLoadingState(false);
    }
}

async function submitToGoogleForms() {
    const formData = new FormData();

    const fieldsData = {
        name: document.getElementById('name')?.value.trim() || '',
        phone: document.getElementById('phone')?.value.trim() || '',
        wantVisit: document.querySelector('input[name="wantVisit"]:checked')?.value || '',
        visitAddress: document.getElementById('visitAddress')?.value.trim() || '',
        visitAddressComplement: document.getElementById('visitAddressComplement')?.value.trim() || '',
        visitBestDay: document.getElementById('visitBestDay')?.value.trim() || '',
        visitObservations: document.getElementById('visitObservations')?.value.trim() || '',
        hasPrayerRequest: document.querySelector('input[name="hasPrayerRequest"]:checked')?.value || '',
        prayerRequest: document.getElementById('prayerRequest')?.value.trim() || '',
        prayerType: document.querySelector('input[name="prayerType"]:checked')?.value || '',
        wantPeaceHouse: document.querySelector('input[name="wantPeaceHouse"]:checked')?.value || '',
        peaceHouseAddress: document.getElementById('peaceHouseAddress')?.value.trim() || '',
        peaceHouseComplement: document.getElementById('peaceHouseComplement')?.value.trim() || '',
        peaceHouseBestDay: document.getElementById('peaceHouseBestDay')?.value.trim() || '',
        peaceHouseObservations: document.getElementById('peaceHouseObservations')?.value.trim() || '',
    };

    for (const [fieldName, entryId] of Object.entries(FIELD_MAPPING)) {
        formData.append(entryId, fieldsData[fieldName]);
    }

    try {
        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
        });
        return true;
    } catch (error) {
        console.error('Submission error:', error);
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

function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

function showErrorMessage() {
    errorAlert.style.display = 'block';
    setTimeout(() => {
        errorAlert.style.display = 'none';
    }, 5000);
}

function hideMessages() {
    successMessage.style.display = 'none';
    errorAlert.style.display = 'none';
}

console.log('Form script with conditional visits and prayer sections loaded successfully');
