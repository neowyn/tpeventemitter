function EventEmitter(){
	//Factory
	if(!(this instanceof EventEmitter)){
		return new EventEmitter();
	}
	this.events = {};
}

EventEmitter.prototype = {
	on : function(event, fonction){
		//Vérification de l'existence de l'event et si non, création de celui-ci
		if(!this.events.hasOwnProperty(event)){
			this.events[event] = [];
		}
		//Ajout de la fonction à l'event
		this.events[event].push(fonction);
		//Chaining
		return this;
	},
	off : function(event){
		//Vérification de la présence de l'event et si oui, suppression
		if(this.events.hasOwnProperty(event)){
			//"Ecraser" les evenements
			this.events[event]= [];
		}
		return this;
	},
	emit : function(event /*, args */){
		//Parcours de la liste des fonctions de l'évenement
		for(var i in this.events[event]){
			//Execution de la fonction en cours
			this.events[event][i].apply(this);
		}
		//Chaining
		return this;
	},
	once : function(event, fonction){
		//Vérification de l'existence de l'event et si non, création de celui-ci
		if(!this.events.hasOwnProperty(event)){
			this.events[event] = [];
		}
		//Création d'un objet EventEmitter "temporaire" afin d'y créer la fonction removeFonction
		var temp = this;
		var removeFonction = function(){
			//Suppression de la fonction ajoutée lorsqu'elle est emit
			temp.events[event].splice((temp.events[event].indexOf(removeFonction)-1),2);
		}
		//Ajout des deux nouvelles fonctions à l'event
		this.events[event].push(fonction);
		this.events[event].push(removeFonction);
	},
	times : function(event, nb, fonction){
		//Vérification de l'existence de l'event et si non, création de celui-ci
		if(!this.events.hasOwnProperty(event)){
			this.events[event] = [];
		}
		//Création d'un compteur
		var compt = 0;
		//Création d'un objet EventEmitter "temporaire" afin d'y créer la fonction removeFonction
		var temp = this;
		var removeFonction = function(){
			//Ajout de l'itération au compteur
			compt++;
			//Vérification d'égalité du compteur et du nombre passé en paramètres, si oui, la suppression s'effectue
			if(compt === nb){
				//Suppression de la fonction ajoutée lorsqu'elle est emit
				temp.events[event].splice((temp.events[event].indexOf(removeFonction)-1),2);	
			}
		}
		//Ajout des deux nouvelles fonctions à l'event
		this.events[event].push(fonction);
		this.events[event].push(removeFonction);
	},
};