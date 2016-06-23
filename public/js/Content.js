(function(Resume){
	"use strict";

	if (!Resume) {
		console.log("Resume not initialized.", "Include Resume.js first.");
		return;
	}

	function emptyPortfolio() {
		return {
			meta: {
				title: "",
				mainImagePath: "",
				phone: "",
				id: ""
			},
			content: []
		}
	}

	/**
	 * class that will hold the content for the current resume
	 */
	function Content(args) {
		this.portfolios = [];
		var that = this;
		
		if (!(args instanceof Array)) {
			args = [];
		}

		args.forEach(function(portfolio) {
			var newPortfolio = {};
			if (!portfolio.meta) { portfolio.meta = {}; }
			if (!portfolio.content) { portfolio.content = []; }
			newPortfolio.meta = {
				title: portfolio.meta.title || "",
				mainImagePath: portfolio.meta.mainImagePath || "",
				phone: portfolio.meta.phone || "",
				id: portfolio.meta.id || ""
			};
			newPortfolio.content = portfolio.content || [];

			that.portfolios.push(newPortfolio);
		});
	}

	Content.prototype.toString = function(id) {
		var obj = this.portfolios.find(function(p) {
			return p.meta.id === id;
		}) || emptyPortfolio();
		return JSON.stringify(obj);
	};

	/**
	 * @return a portfolio { meta: ... , content: ... }
	 */
	Content.prototype.findById = function(id) {
		return this.portfolios.find(function(p) {
			return p.meta.id === id;
		}) || emptyPortfolio();
	};

	/**
	 * Copies the content so that the angular won't overwrite it when the user changes it in the dashboard
	 */
	Content.prototype.getContent = function(id) {
		var copy = [];
		var content = this.findById(id).content;
		for (var i = 0; i < content.length; ++i) {
			copy.push(content[i]);
		}
		return copy;
	};

	/**
	 * Copies the meta obj's properties so that the angular won't overwrite it when the user changes it in the dashboard
	 */
	Content.prototype.getMeta = function(id) {
		var copy = {};
		var meta = this.findById(id).meta;
		for (var key in meta) {
			copy[key] = meta[key];
		}
		return copy;
	};

	// return only if there is only one portfolio
	// there will only be one portfolio loaded on the display page
	Content.prototype.getDisplayPortfolio = function() {
		return this.portfolios.length===1?this.portfolios[0]:emptyPortfolio();
	};

	Content.prototype.getHeadings = function(pid) {
		return this.findById(pid).content.map(function(cobj) {
			return cobj.title;
		});
	};

	Content.prototype.getIds = function() {
		return this.portfolios.map(function(p){
			return p.meta.id;
		});
	};

	Content.prototype.update = function(port) {
		var that = this;
		var updated = false;
		this.portfolios.some(function(p) {
			if (p.meta.id === port.meta.id) {
				console.log("updating");
				console.log(p);
				that.portfolios[that.portfolios.indexOf(p)] = port;
				updated = true;
			}
			return updated;
		});
		if (!updated) {
			console.log("inserting new portfolio: Content.update(...)");
			this.portfolios.push(port);
		}
	};

	Resume.classes.Content = Content;

}(Resume));
