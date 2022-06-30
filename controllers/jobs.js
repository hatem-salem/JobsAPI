const Job = require('../models/job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const getAllJobs = async(req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
}
const getJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No Job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
}
const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
}
const updateJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId }, body: { company, position } } = req;
    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty');
    }
    const job = await Job.findOneAndUpdate({ createdBy: userId, _id: jobId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`No Job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
}
const deleteJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`No Job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
}
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}