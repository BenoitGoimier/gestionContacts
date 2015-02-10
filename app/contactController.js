(function() {
	angular.module('contactApp').controller('ContactController', [ '$scope', function($scope){

		this.edit = 0;
		this.operation = '';
		this.contact = [];
		this.contacts = [
			{
				nom: 'ZUCKERBERG',
				prenom: 'Mark',
				email: 'mark@facebook.com'
			},
			{
				nom: 'GATES',
				prenom: 'Bill',
				email: 'bill@microsoft.com'
			},
			{
				nom: 'JOBS',
				prenom: 'Steeve',
				email: 'steeve@apple.com'
			},
			{
				nom: 'JOBS',
				prenom: 'Steeve',
				email: 'steeve@apple.com'
			}
		];
		this.contactsFil = [];

		this.toUpdate = function(contact) {
			this.edit = 1;
			this.contact = contact;
			this.operation = 'modification';
			$scope.nom = contact.nom;
			$scope.prenom = contact.prenom;
			$scope.email= contact.email;
		};

		this.toAdd = function() {
			this.edit = 1;
			this.operation = 'ajout';
			$scope.nom = '';
			$scope.prenom = '';
			$scope.email = '';
		};

		this.cancel = function() {
			this.edit = 0;
			$scope.nom = '';
			$scope.prenom = '';
			$scope.email = '';
		};

		this.add = function() {
			this.tmpContact = [
				{
					nom: '',
					prenom: '',
					email: ''
				}
			];

			if (this.operation == 'ajout') {
				this.tmpContact.nom = $scope.nom;
				this.tmpContact.prenom = $scope.prenom;
				this.tmpContact.email = $scope.email;
				this.contacts.push(this.tmpContact);
			} else {
				for (var i = 0; i < this.contacts.length; i++) {
					if (this.contacts[i] === this.contact){
						this.contacts[i].nom = $scope.nom;
						this.contacts[i].prenom = $scope.prenom;
						this.contacts[i].email = $scope.email;
					}
				}
			}

			this.edit = !this.edit;
			$scope.nom = '';
			$scope.prenom = '';
			$scope.email = '';
		};

		this.delete = function(contact) {
			for (var i = 0; i < this.contacts.length; i++) {
				if (this.contacts[i] === contact){
					this.contacts.splice(i, 1);
				}
			}
		};

		this.filtre = function() {
			for (var i = 0; i < this.contactsFil.length; i++) {
				this.contacts.push(this.contactsFil[i]);
			}

			this.contactsFil = [];

			if ($scope.filtreNom) {
				this.regexNom = new RegExp($scope.filtreNom, 'i');
			}
			if ($scope.filtrePrenom) {
				this.regexPrenom = new RegExp($scope.filtrePrenom, 'i');
			}
			if ($scope.filtreEmail) {
				this.regexEmail = new RegExp($scope.filtreEmail, 'i');
			}

			for (var i = 0; i < this.contacts.length; i++) {
				if ($scope.filtreNom && !$scope.filtrePrenom && !$scope.filtreEmail) {
					if ((this.contacts[i].nom.search(this.regexNom) == -1)) {
						this.contactsFil.push(this.contacts[i]);
					}
				} else if (!$scope.filtreNom && $scope.filtrePrenom && !$scope.filtreEmail) {
					if (this.contacts[i].prenom.search(this.regexPrenom) == -1) {
						this.contactsFil.push(this.contacts[i]);
					}
				} else if (!$scope.filtreNom && !$scope.filtrePrenom && $scope.filtreEmail) {
					if (this.contacts[i].email.search(this.regexEmail) == -1) {
						this.contactsFil.push(this.contacts[i]);
					}
				} else if ($scope.filtreNom && $scope.filtrePrenom && !$scope.filtreEmail) {
					if ((this.contacts[i].nom.search(this.regexNom) == -1)
						|| (this.contacts[i].prenom.search(this.regexPrenom) == -1)) {
						this.contactsFil.push(this.contacts[i]);
					}
				} else if ($scope.filtreNom && !$scope.filtrePrenom && $scope.filtreEmail) {
					if ((this.contacts[i].nom.search(this.regexNom) == -1)
						|| (this.contacts[i].email.search(this.regexEmail) == -1)) {
						this.contactsFil.push(this.contacts[i]);
					}
				} else if (!$scope.filtreNom && $scope.filtrePrenom && $scope.filtreEmail) {
					if ((this.contacts[i].prenom.search(this.regexPrenom) == -1)
						|| (this.contacts[i].email.search(this.regexEmail) == -1)) {
						this.contactsFil.push(this.contacts[i]);
					}
				} else if ($scope.filtreNom && $scope.filtrePrenom && $scope.filtreEmail) {
					if ((this.contacts[i].nom.search(this.regexNom) == -1)
						|| (this.contacts[i].prenom.search(this.regexPrenom) == -1)
						|| (this.contacts[i].email.search(this.regexEmail) == -1)) {
						this.contactsFil.push(this.contacts[i]);
					}
				}
			}

			for (var j = 0; j < this.contactsFil.length; j++) {
				for (var i = 0; i < this.contacts.length; i++) {
					if (this.contacts[i] == this.contactsFil[j]) {
						this.contacts.splice(i, 1);
					}
				}
			}
		};

		this.countContacts = function() {
			return this.contacts.length;
		};
	}]);
})();