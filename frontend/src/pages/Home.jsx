// src/pages/HomePage.jsx
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white p-12 text-center">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="mt-4 text-xl">Browse thousands of job listings, and apply today!</p>
      </section>

      {/* Job Search Bar */}
      <section className="p-8 text-center">
        <input
          type="text"
          placeholder="Search for jobs, skills, or companies"
          className="w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button className="ml-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Search
        </button>
      </section>

      {/* Featured Jobs */}
      <section className="p-8">
        <h2 className="text-3xl font-semibold text-center">Featured Jobs</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Frontend Developer</h3>
            <p className="mt-2">Location: Remote</p>
            <p className="mt-2">Salary: $80,000 - $100,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Backend Developer</h3>
            <p className="mt-2">Location: San Francisco, CA</p>
            <p className="mt-2">Salary: $100,000 - $120,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">UI/UX Designer</h3>
            <p className="mt-2">Location: New York, NY</p>
            <p className="mt-2">Salary: $70,000 - $90,000</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
