"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCalendar, HiTag } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const BlogModal = ({ blog, isOpen, onClose }) => {
  if (!blog) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="my-6">
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            className="rounded-lg border border-gray-300 dark:border-gray-700 text-sm"
            customStyle={{
              padding: '1.5rem',
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.5',
              backgroundColor: '#1a1a1a',
              color: '#f8f8f2',
              border: 'none'
            }}
            codeTagProps={{
              style: {
                backgroundColor: 'transparent',
                color: 'inherit'
              }
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-6 mt-12 text-gray-900 dark:text-white leading-tight border-b border-gray-200 dark:border-gray-700 pb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white leading-tight">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start">
        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-400 bg-orange-50 dark:bg-orange-900/20 pl-6 py-4 my-6 italic text-gray-700 dark:text-gray-300 rounded-r">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{children}</td>
    )
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-5xl w-full max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-8 py-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-md text-sm font-medium">
                      {blog.category}
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <HiCalendar className="w-4 h-4 mr-2" />
                      {formatDate(blog.date)}
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                    {blog.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-sm border border-gray-200 dark:border-gray-700"
                      >
                        <HiTag className="w-3 h-3 mr-1.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                >
                  <HiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 160px)' }}>
              <div className="max-w-none">
                <ReactMarkdown components={components}>
                  {blog.content}
                </ReactMarkdown>
              </div>
              
              {/* Footer content within scrollable area */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Published {formatDate(blog.date)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;