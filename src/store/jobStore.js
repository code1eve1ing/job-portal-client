import { create } from "zustand";

const jobStore = create((set) => ({
    jobs: [],
    setJobs: (jobs) => set(() => ({ jobs: jobs })),
    addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
    removeJob: (jobId) => set((state) => {
        const jobs = state.jobs.filter(job => job._id !== jobId);
        return { jobs: jobs }
    }),
    resetJobs: () => set(() => ({ jobs: [] }))
}));

export default jobStore;