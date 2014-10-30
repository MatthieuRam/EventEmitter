// Matthieu Rambaud

// Fonction constructeur

function EventEmitter(){

	//HashMap [event->[fn1,fn2,...]]

	this.callbacks={};
	this.tab_mul = {};

}

EventEmitter.prototype={

// Ecoute sur un evenement

on: function(eventName,fn){
	if(!this.callbacks.hasOwnProperty(eventName)){
		this.callbacks[eventName] = [];
	}
	this.callbacks[eventName].push(fn);
	},

//Ecoute une seule fois sur un événement
once: function(eventName,fn){
	if(!this.callbacks.hasOwnProperty(eventName)){
		this.callbacks[eventName] = [];
	}
	this.callbacks[eventName].push(fn);
	this.tab_mul[eventName] = 1;
	},
	
//Ecoute un nombre défini de fois sur un événement
times: function(eventName,nb, fn){
	if(!this.callbacks.hasOwnProperty(eventName)){
		this.callbacks[eventName] = [];
	}
	this.callbacks[eventName].push(fn);
	this.tab_mul[eventName] = nb;
	},

//Supprime l'écoute sur un ou des événements

off: function(eventName){
	if(typeof eventName === "undefined"){
		this.callbacks = {};
	}

	delete this.callbacks[eventName];
	delete this.tab_mul[eventName];
},

// Emet un événement

emit: function(eventName /*,args*/){
	if(!this.callbacks.hasOwnProperty(eventName)){
		return;
	}
	if(this.tab_mul.hasOwnProperty(eventName)){
		if(this.tab_mul[eventName] == 0){
			console.log("Impossible d'ecouter une autre fois");
			return;
		}
		else {this.tab_mul[eventName] = this.tab_mul[eventName] - 1;}
	}
	
	var args = Array.prototype.slice.call(arguments,1);
	var funcs = this.callbacks[eventName];
	funcs.forEach(function(func){
		func.apply(null, args);
	});
}

};

var em = new EventEmitter();

em.on("event1",	console.log.bind(console));

em.emit("event1","hello world");

em.off();

em.emit("event1","hello world");

em.once("event", function(){console.log("Une seule emission possible");});

em.emit("event");

em.emit("event");

var fn = console.log.bind(console);

em.times("event2", 2, fn);

em.emit("event2", "Encore une emission dispo");

em.emit("event2", "Derniere emission");

em.emit("event2");
