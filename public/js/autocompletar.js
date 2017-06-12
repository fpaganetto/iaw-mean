function actualizarAutocompletar(elementos){
	e = elementos;
	var datos = {};
	for (i=0; i<elementos.length; i++){
		datos[elementos[i].nombre] = null
	}
	$('input.autocomplete').autocomplete({
		data: datos,
		/*{
		  "Apple": null,
		  "Microsoft": null,
		  "Google": 'http://placehold.it/250x250'
		},*/
		limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
		onAutocomplete: function(val) {
		  // Callback function when value is autcompleted.
		},
		minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
	});
}