// Fonction pour vérifier le pseudo hardcore
function validateHardcorePseudo(pseudo) {
    if (pseudo.length < 3) {
        return {
            isValid: false,
            message: "Le pseudo doit contenir au moins 3 caractères"
        };
    }
    return {
        isValid: true,
        message: "Pseudo valide"
    };
}

// Fonction pour vérifier le format de l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Format d'email invalide"
        };
    }
    return {
        isValid: true,
        message: "Email valide"
    };
}

// Fonction pour vérifier le mot de passe
function validatePassword(password) {
    if (password.length < 6) {
        return {
            isValid: false,
            message: "Le mot de passe doit contenir au moins 6 caractères"
        };
    }
    if (!/\d/.test(password)) {
        return {
            isValid: false,
            message: "Le mot de passe doit contenir au moins un chiffre"
        };
    }
    if (!/[a-zA-Z]/.test(password)) {
        return {
            isValid: false,
            message: "Le mot de passe doit contenir au moins une lettre"
        };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isValid: false,
            message: "Le mot de passe doit contenir au moins un symbole spécial"
        };
    }

    return {
        isValid: true,
        message: "Mot de passe valide"
    };
}

// Fonction pour vérifier que les mots de passe correspondent
function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: "Les mots de passe ne correspondent pas"
        };
    }
    return {
        isValid: true,
        message: "Les mots de passe correspondent"
    };
}

function validateForm(pseudo, email, password, confirmPassword) {
    const pseudoValidation = validateHardcorePseudo(pseudo);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);

    if (!pseudoValidation.isValid) {
        console.log(pseudoValidation.message);
        return false;
    }

    if (!emailValidation.isValid) {
        console.log(emailValidation.message);
        return false;
    }

    if (!passwordValidation.isValid) {
        console.log(passwordValidation.message);
        return false;
    }

    if (!passwordMatchValidation.isValid) {
        console.log(passwordMatchValidation.message);
        return false;
    }

    return true;
}

function passwordStrength(password) {
    if (password.length < 6) {
        return "faible";
    }

    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 6 && (hasNumber || hasSymbol)) {
        return "moyen";
    }

    if (password.length > 9 && hasNumber && hasSymbol) {
        return "fort";
    }

    return "faible";
}

function pseudoStrength(pseudo) {
    let strength = 0;

    if (pseudo.length >= 3) strength += 1;
    if (pseudo.length >= 6) strength += 1;
    if (pseudo.length >= 10) strength += 1;
    if (/[A-Z]/.test(pseudo)) strength += 1;
    if (/\d/.test(pseudo)) strength += 1; 

    return strength;
}

function updatePseudoStrengthBar(pseudo) {
    const strength = pseudoStrength(pseudo);
    const strengthBar = document.getElementById('pseudo-strength');
    const strengthText = document.getElementById('pseudo-strength-text');

    let percentage = (strength / 5) * 100;
    strengthBar.style.width = `${percentage}%`;

    if (strength <= 1) {
        strengthBar.style.backgroundColor = '#ff0000';
        strengthText.textContent = 'Force du pseudo : Faible';
    } else if (strength <= 3) {
        strengthBar.style.backgroundColor = '#ff9900';
        strengthText.textContent = 'Force du pseudo : Moyen';
    } else {
        strengthBar.style.backgroundColor = '#00cc00';
        strengthText.textContent = 'Force du pseudo : Fort';
    }
}

function updatePasswordStrengthBar(password) {
    const strength = passwordStrength(password);
    const strengthBar = document.getElementById('password-strength');
    const strengthText = document.getElementById('password-strength-text');

    switch(strength) {
        case "faible":
            strengthBar.style.width = "33%";
            strengthBar.style.backgroundColor = "#ff0000";
            strengthText.textContent = "Force du mot de passe : Faible";
            break;
        case "moyen":
            strengthBar.style.width = "66%";
            strengthBar.style.backgroundColor = "#ff9900";
            strengthText.textContent = "Force du mot de passe : Moyen";
            break;
        case "fort":
            strengthBar.style.width = "100%";
            strengthBar.style.backgroundColor = "#00cc00";
            strengthText.textContent = "Force du mot de passe : Fort";
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strength = passwordStrength(this.value);
            const strengthText = document.getElementById('password-strength-text');
            strengthText.textContent = `Force du mot de passe : ${strength}`;
        });
    }
});

// pour que la barre de force du pseudo soit en temps réel
document.getElementById('pseudo').addEventListener('input', function() {
    updatePseudoStrengthBar(this.value);
});

export { 
    validateHardcorePseudo, 
    validateEmail, 
    validatePassword, 
    validatePasswordMatch, 
    validateForm, 
    passwordStrength,
    pseudoStrength,
    updatePseudoStrengthBar,
    updatePasswordStrengthBar 
};

