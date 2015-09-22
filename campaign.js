/**
 * Created by Kelsie on 9/22/2015.
 */

function currencyToNum(currencyString) {
  return Number(currencyString.replace(/[^0-9\.]+/g,""));
}

// console.log(currencyToNum("$123.45") + currencyToNum("$20.00"));  // prints 143.45

function groupByParty(data) {
  return _.groupBy(data, "Party");
}

// console.log(groupByParty(campaignContributions));

function addAmount(memo, record) {
  return memo + currencyToNum(record["Amount"]);
}

function contributionsByParty (data) {
  return _.mapObject(
      groupByParty(data),
        function(records) {
          return _.reduce(records, addAmount, 0);
        });
}

// console.log(contributionsByParty(campaignContributions));

function partyContributionObjects(data) {
  var contributions = contributionsByParty(data);
  return _.map(_.keys(contributions),
    function(key){
      return {name: key, amount: contributions[key]};
  });
}

function maxContributionsToParty(data) {
  return _.max(partyContributionObjects(data), function(record) {return record.amount;});
}

console.log(maxContributionsToParty(campaignContributions));