document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.getElementById('loginForm')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')
    const confirmPasswordError = document.getElementById('confirmPasswordError')
    const showHideButton = document.getElementById('showHide')

    loginForm.addEventListener('submit', function(event){
        event.preventDefault()
        validateForm()
    })

    emailInput.addEventListener('blur', function(){
        validateEmail()
    }) // blur es cuando salimos del input

    emailInput.addEventListener('change', function(){
        clearError(emailError)
    }) // change es cuando cambia el valor del elemento

    passwordInput.addEventListener('change', function(){
        clearError(passwordError)
    })
    confirmPasswordInput.addEventListener('change', function(){
        clearError(confirmPasswordError)
    })
    showHideButton.addEventListener('click', function(){
        if(passwordInput.type == 'password'){
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        }
        else{
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
        
    })

    function validateForm(){
        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        const passwordMatch = validatePasswordMatch()
        
        if(isValidEmail && isValidPassword && passwordMatch)
            saveToLocalStorage()
    }

    function validateEmail(){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        const emailValue = emailInput.value.trim()

        if(!regex.test(emailValue)){
            showError(emailError, 'El email ingresado no es válido')
            return false
        }

        return true
    }

    function validatePassword(){
        const passwordValue = passwordInput.value.trim()

        if(passwordValue.length < 6){
            showError(passwordError, 'La contraseña debe tener más de 6 caracteres')
            return false
        }

        return true
    }

    function validatePasswordMatch(){
        const passwordValue = passwordInput.value.trim()
        const confirmPasswordValue = confirmPasswordInput.value.trim()

        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, 'Las contraseñas no coinciden')
            return false
        }

        return true
    }

    function showError(element, message){
        element.innerHTML = message
        element.style.display = 'block'
    }

    function clearError(element){
        element.innerHTML = ''
        element.style.display = 'none'
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value.trim()
        localStorage.setItem('email', emailValue)
        const body = bodyBuilderJSON()
        console.log(body)
    }

    function bodyBuilderJSON(){
        return{
            'email': emailInput.value,
            'password': passwordInput.value
        }
    }
    
})