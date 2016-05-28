(function(Rezoomae){

	if (!Rezoomae) {
		console.log("Rezoomae not initialized.", "Include Rezoomae.js first.");
		return;
	}

	/**
	 * class that will hold the content for the current resume
	 */
	function Content(args) {
		args = args || {};
		this.meta = {
			title: args.title || "No Title Set",
			mainImage: args.mainImage || "",
			phone: args.phone || "No Phone Number Set"
		};
		this.content = args.content || [];
	}

	Content.prototype.setContent = function(args) {
		this.meta = {
			title: args.title || "No Title Set",
			mainImage: args.mainImage || "",
			phone: args.phone || "No Phone Number Set"
		};
		this.content = args.content || [];
	};

	Content.prototype.getTitle = function() {
		return this.meta.title;
	};

	Content.prototype.getMainImage = function() {
		return this.meta.mainImage;
	};

	Content.prototype.getHeadings = function() {
		return this.content.map(function(o){return Object.keys(o)[0];});
	};

	Content.prototype.contentList = function() {
		return this.content.map(function(o){
			return {
				title: Object.keys(o)[0],
				content: o[Object.keys(o)[0]]
			}
		});
	};

	Rezoomae.classes.Content = Content;

}(Rezoomae));
