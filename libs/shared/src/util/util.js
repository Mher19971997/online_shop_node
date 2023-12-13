const moment = require('moment');

class Util {

  static toJSON(val) {
    return val?.toJSON() || null;
  }
  
  calcLastTime = (date, after = 60) => {
    const last = moment().utc().unix() - moment(date).utc().unix();
    if (last < after) {
      return after - last;
    }
  };
}

module.exports = new Util();
