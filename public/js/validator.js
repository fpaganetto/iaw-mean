$("#formCamara").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 5
        },
        descripcion: {
            required: true,
            email:true
        },
        latitud: {
            required: true,
            minlength: 5
        },
        longitud: {
            required: true,
            minlength: 5,
            equalTo: "#password"
        }
    },
    //For custom messages
    messages: {
        uname:{
            required: "Enter a username",
            minlength: "Enter at least 5 characters"
        },
        curl: "Enter your website",
    },
    errorElement : 'input',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
 });