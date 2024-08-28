import { jobs as Job } from "../models/job.js";
import User from "../models/user.js";

// Create a new job
export async function createJob(req, res, next) {
  const {
    title,
    description,
    location,
    salary,
    requirements,
    job_type,
    // companyId,
  } = req.body;

  try {
    if (!req.user || req.user.role !== "Employer") {
      return res
        .status(403)
        .json({ message: "Not authorized to create a job" });
    }

    const job = new Job({
      title,
      description,
      location,
      salary,
      requirements,
      job_type,
      // companyId,
      userId: req.user._id, // Save the logged-in user ID
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
}

// /Update Job details
export const updateJobDetails = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        company,
        location,
        salary,
        updatedAt: new Date().toISOString()
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// Get Jobs based on employer login
export const getEmployerJobs = async (req, res, next) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find jobs created by the logged-in employer
    const jobs = await Job.find({ userId: req.user._id }).select('title company description');

    // Retrieve the organization name from the user's information
    const user = await User.findById(req.user._id).select('organizationName');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Push the organization name into the response for each job
    const jobsWithOrganization = jobs.map(job => ({
      ...job._doc,
      organizationName: user.organizationName,
    }));

    res.status(200).json(jobsWithOrganization);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Fetch all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("userId", "-password");
    res.status(200).json(jobs);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
