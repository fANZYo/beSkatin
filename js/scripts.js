$(document).ready(function(){
	$('.group .cta').on('click', function(event){
		ga('send', 'event', 'CTA', 'click', 'group', 1);
	});
	$('.private .cta').on('click', function(event){
		ga('send', 'event', 'CTA', 'click', 'private', 1);
	});
	$('input[type=submit]').on('click', function(event){
		ga('send', 'event', 'CTA', 'click', 'converted', 1);
	});
	$('input[type=radio]').on('click', checked);

	if(location.pathname.substring(1) === "contact.html"){
		var params = {};

		if (location.search) {
			 var parts = location.search.substring(1).split('&');

			 for (var i = 0; i < parts.length; i++) {
				  var nv = parts[i].split('=');
				  if (!nv[0]) continue;
				  params[nv[0]] = nv[1] || true;
			 }
		}

		if(params.id == 1){
			$("input").removeAttr("checked");
			$("input[value=group]").attr("checked", "checked");
		}
		if(params.id == 2){
			$("input").removeAttr("checked");
			$("input[value=private]").attr("checked", "checked");
		}
		if(params.id == 3){
			$("input").removeAttr("checked");
			$("input[value=workshop]").attr("checked", "checked");
		}
		if(params.id == 4){
			$("input").removeAttr("checked");
			$("input[value=other]").attr("checked", "checked");
		}

		checked();
	}

});

var checked = function (){

	var group = "9A5V7EQREFQDJ";
	var private = "L2N3ZF3KD9YGA";
	var workshop = "KX36ZHQLWSX4C";

	if($("input[value=private]:checked")[0]){
		$(".slidelist").removeClass("hidden");
		$("input[name=hosted_button_id]").attr("value", private);
	}else if($("input[value=workshop]:checked")[0]){
		$(".workshoplist").removeClass("hidden");
		$("input[name=hosted_button_id]").attr("value", workshop);
	}else{
		$(".slidelist").addClass("hidden");
		$(".workshoplist").addClass("hidden");

		if($("input[value=group]:checked")[0]){
			$("input[name=hosted_button_id]").attr("value", group);
		}else {
			$("form").attr("action", "email.php");
		}
	}
};
