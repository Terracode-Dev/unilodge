// BlogPage.js
import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';
// import image1 from './images/image1.jpg';
// import image2 from './images/image2.jpg';

const BlogPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const blogs = [
    {
      id: 1,
      title: 'First Blog Post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      author: 'John Doe',
      date: 'April 1, 2024',
      //image: image1
    },
    {
      id: 2,
      title: 'Second Blog Post',
      content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames...',
      author: 'Jane Smith',
      date: 'April 2, 2024',
      //image: image2
    }
  ];

  return (
    <div className="blog-page">
      <h1 className="text-3xl font-bold text-center my-8 text-white">Welcome to our Blog!</h1>
      <div className="flex flex-wrap justify-center">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            date={blog.date}
            //image={blog.image}
            onClick={() => handleCardClick(blog)}
          />
        ))}
      </div>
      {showModal && selectedBlog && (
        <BlogModal
          title={selectedBlog.title}
          content={selectedBlog.content}
          author={selectedBlog.author}
          date={selectedBlog.date}
          // image={selectedBlog.image}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BlogPage;
