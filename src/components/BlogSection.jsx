"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiCalendar, HiClock, HiTag, HiArrowRight } from "react-icons/hi";
import { getAllBlogs } from "@/data/blogs";
import BlogModal from "./BlogModal";

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getAllBlogs();
        setBlogs(blogData);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeBlog = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };
  
  const categories = ["All", ...new Set(blogs.map(blog => blog.category))];
  
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading blog posts from Google Drive...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Technical Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights from building scalable systems and solving complex engineering challenges
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-stone-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-stone-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid - Show only first 3 blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(0, 3).map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-gray-200 dark:border-stone-700 overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Blog Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>

                </div>

                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {blog.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center px-2 py-1 bg-gray-100 dark:bg-stone-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                    >
                      <HiTag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-stone-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                      +{blog.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-stone-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <HiCalendar className="w-4 h-4 mr-1" />
                    {formatDate(blog.date)}
                  </div>
                  <button 
                    onClick={() => openBlog(blog)}
                    className="flex items-center text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-300 group"
                  >
                    Read More
                    <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Blogs Button */}
        {blogs.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              View All {blogs.length} Blog Posts
              <HiArrowRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-teal-200 dark:border-teal-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Want to discuss these topics?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I&apos;m always excited to talk about software engineering, architecture patterns, and lessons learned from building scalable systems.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Let&apos;s Connect
              <HiArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Blog Modal */}
      <BlogModal 
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={closeBlog}
      />
    </section>
  );
};

export default BlogSection;