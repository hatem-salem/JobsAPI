const express = require('express');
const router = express.Router();

const { getAllJobs, createJob, updateJob, getJob, deleteJob } = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);



module.exports = router