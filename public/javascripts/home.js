function validateRegisterForm() {
    if($('#pwd').val()!=$('#repwd').val()){
       document.getElementById('register-password-error-message').style.display = 'block';
       return false;
   }
    else{
   return true;
    }
}
