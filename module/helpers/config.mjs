export const PROJECT_MOON = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
PROJECT_MOON.stats = {
  for: 'PROJECT_MOON.Stats.For.long',
  pru: 'PROJECT_MOON.Stats.Pru.long',
  jus: 'PROJECT_MOON.Stats.Jus.long',
  chm: 'PROJECT_MOON.Stats.Chm.long',
  ins: 'PROJECT_MOON.Stats.Ins.long',
  tmp: 'PROJECT_MOON.Stats.Tmp.long',
};

PROJECT_MOON.statAbbreviations = {
  for: 'PROJECT_MOON.Stats.For.abbr',
  pru: 'PROJECT_MOON.Stats.Pru.abbr',
  jus: 'PROJECT_MOON.Stats.Jus.abbr',
  chm: 'PROJECT_MOON.Stats.Chm.abbr',
  ins: 'PROJECT_MOON.Stats.Ins.abbr',
  tmp: 'PROJECT_MOON.Stats.Tmp.abbr',
};

PROJECT_MOON.systemRankRomanized = num => {
  if (num <= 0) {
    return "0";
  } else if (num >= 6) {
    return "EX";
  } else {
    return PROJECT_MOON._romanizeNumber(num);
  }
};

PROJECT_MOON._romanizeNumber = num => {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
