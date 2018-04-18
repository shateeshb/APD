const express = require('express');
const Congress = require( 'propublica-congress-node' );
const apiKey = 'kKAb1hU4oGSoUjqN5P3NJVUhd0PDWV0r4PizmlGe';
const client = new Congress( apiKey );

const router = express.Router();

router.get('/:id', (req, res) => {
  client.memberBioAndRoles({
  	memberId: req.params.id
  }).then((politician) => {
  	//res.json(politician);
  	let congressp =  {
  		member_id: politician.results[0].member_id,
  		first_name: politician.results[0].first_name,
  		last_name: politician.results[0].last_name,
  		gender: politician.results[0].gender
  	};
  	//res.json(congressp);
  	let congressrole = {
  		title: politician.results[0].roles[0].title,
  		party: politician.results[0].roles[0].party,
  		district: politician.results[0].roles[0].district

  	}
  	res.render('politicians/single', {politician: congressp, role: congressrole});
  }).catch((err) => {
  		console.log(err);
  		res.render('/');
  })
});

module.exports = router;