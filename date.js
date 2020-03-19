Object.defineProperty(Date.prototype,"diff",{
	writable: false, configurable: false, enumerable: true,

	/**
	 * Returns the difference between two Date objects.
	 * @param {Date} The date to compare to.
	 * @return {Object}
	 * @throws {TypeError}
	 */
	value: function(date) {
		if (date instanceof Date){
			var ms = this-date;
			var diff = {};

			for ( diff.years = 0; ms>=31536000000; diff.years++, ms -= 31536000000);
			for ( diff.months = 0; ms>=2628000000; diff.months++, ms -= 2628000000);
			for ( diff.days = 0; ms>=86400000; diff.days++, ms -= 86400000);
			for ( diff.hours = 0; ms>=3600000; diff.hours++, ms -= 3600000);
			for ( diff.minutes = 0; ms>=60000; diff.minutes++, ms -= 60000);
			for ( diff.seconds = 0; ms>=1000; diff.seconds++, ms -= 1000);
			diff.milliseconds = ms;

			return diff;
		}

		throw new TypeError("invalid date");
	}
});